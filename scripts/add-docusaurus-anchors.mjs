import fs from 'node:fs/promises';
import path from 'node:path';
import * as cheerio from 'cheerio';
import {
  addDocusaurusHeadingAnchors,
  legacyAnchorAliasesByRoute,
} from './lib/heading-anchors.mjs';

const docsDirectory = path.join(process.cwd(), 'docs');
const htmlExportPattern = /export const xwikiHtml = (.+);\r?\n/;
const tocExportPattern = /export const toc = (.+);\r?\n/;
const slugPattern = /^slug:\s*(.+)$/m;
const componentImport = "import XWikiContent from '@site/src/components/XWikiContent';";
const rawContentPattern = /<div className="xwiki-content" dangerouslySetInnerHTML=\{\{__html: xwikiHtml\}\} \/>/;
const componentContent = '<XWikiContent html={xwikiHtml} anchorIds={toc.map(item => item.id)} />';

async function findMdxFiles(directory) {
  const entries = await fs.readdir(directory, {withFileTypes: true});
  const nested = await Promise.all(
    entries.map(entry => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory()
        ? findMdxFiles(target)
        : Promise.resolve(entry.name.endsWith('.mdx') ? [target] : []);
    }),
  );
  return nested.flat();
}

let changedPages = 0;
let enhancedHeadings = 0;
let legacyAliases = 0;
let navigationAnchors = 0;
let tocItems = 0;

for (const file of await findMdxFiles(docsDirectory)) {
  const source = await fs.readFile(file, 'utf8');
  const match = source.match(htmlExportPattern);
  const slugMatch = source.match(slugPattern);
  if (!match || !slugMatch) continue;

  const $ = cheerio.load(JSON.parse(match[1]), {decodeEntities: false}, false);
  const route = slugMatch[1].trim().replace(/\/$/, '') || '/';
  const result = addDocusaurusHeadingAnchors(
    $,
    legacyAnchorAliasesByRoute.get(route),
    {includeNavigationAnchors: route === '/'},
  );
  let updated = source;
  if (
    result.enhanced > 0 ||
    result.legacyAliases > 0 ||
    result.navigationAnchors > 0
  ) {
    const encoded = JSON.stringify($.html().trim()).replaceAll('<', '\\u003c');
    updated = updated.replace(
      htmlExportPattern,
      `export const xwikiHtml = ${encoded};\n`,
    );
  }

  const tocExport = `export const toc = ${JSON.stringify(result.toc)};\n`;
  updated = tocExportPattern.test(updated)
    ? updated.replace(tocExportPattern, tocExport)
    : updated.replace(htmlExportPattern, match => `${match}\n${tocExport}`);
  updated = updated.replace(
    /(export const xwikiHtml = .+;\r?\n)(export const toc = )/,
    '$1\n$2',
  );
  if (!updated.includes(componentImport)) {
    updated = updated.replace(
      /export const xwikiHtml = /,
      `${componentImport}\n\nexport const xwikiHtml = `,
    );
  }
  updated = updated.replace(rawContentPattern, componentContent);
  if (updated === source) continue;

  await fs.writeFile(file, updated, 'utf8');

  changedPages += 1;
  enhancedHeadings += result.enhanced;
  legacyAliases += result.legacyAliases;
  navigationAnchors += result.navigationAnchors;
  tocItems += result.toc.length;
}

console.log(
  `Updated ${changedPages} pages: ${enhancedHeadings} heading anchors, ${navigationAnchors} navigation anchors, ${legacyAliases} legacy aliases, and ${tocItems} table-of-contents items.`,
);
