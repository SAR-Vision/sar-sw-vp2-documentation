import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import * as cheerio from 'cheerio';
import {
  addDocusaurusHeadingAnchors,
  legacyAnchorAliasesByRoute,
} from './lib/heading-anchors.mjs';

const ORIGIN = 'https://kb.kaya.vision';
const API = `${ORIGIN}/rest/wikis/kb/pages?media=json&number=1000`;
const ROOT = process.cwd();
const DOCS = path.join(ROOT, 'docs');
const ASSETS = path.join(ROOT, 'static', 'kb-assets');

const allowed = [
  'Main.WebHome',
  'Main.Glossary.',
  'Main.Known_Issues.',
  'Main.Documentation index.',
  'Main.IP_Core.',
  'Main.Archive.',
  'Main.KAYA_Hardware.',
  'Main.Vision Point Software Suite.',
];

const positions = new Map([
  ['', 1],
  ['glossary', 2],
  ['known-issues', 3],
  ['kaya-hardware', 4],
  ['vision-point-software-suite', 5],
  ['ip-core', 6],
  ['documentation-index', 7],
  ['archive', 8],
  ['kaya-hardware/cameras', 1],
  ['kaya-hardware/frame-grabbers', 2],
  ['kaya-hardware/range-extenders', 3],
  ['kaya-hardware/troubleshooting-guide', 4],
  ['vision-point-software-suite/api-samples', 1],
  ['vision-point-software-suite/vision-point-ii', 2],
  ['vision-point-software-suite/triggers', 3],
  ['vision-point-software-suite/logs', 4],
  ['vision-point-software-suite/kaya-service', 5],
  ['vision-point-software-suite/how-to', 6],
]);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchRetry(url, options = {}, attempts = 4) {
  let error;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {Accept: '*/*', 'User-Agent': 'KAYA-KB-Docusaurus-Migrator/1.0', ...options.headers},
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return response;
    } catch (current) {
      error = current;
      if (attempt < attempts) await sleep(500 * attempt);
    }
  }
  throw new Error(`Unable to fetch ${url}: ${error.message}`);
}

function slugify(value) {
  return decodeURIComponent(value)
    .replace(/\\\./g, '.')
    .replace(/#/g, '-sharp')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-zA-Z0-9.#-]+/g, '-')
    .replace(/\.+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase() || 'page';
}

function sourceSegments(page) {
  const url = new URL(page.xwikiRelativeUrl);
  const marker = '/wiki/kb/view/Main/';
  if (!url.pathname.startsWith(marker)) return [];
  return url.pathname.slice(marker.length).split('/').filter(Boolean).map(decodeURIComponent);
}

function pageTitle(page, segments) {
  if (segments.length === 0) return 'Knowledge base';
  const raw = (page.title || page.rawTitle || '').trim();
  if (raw && !raw.startsWith('$services.') && !raw.startsWith('#')) return raw;
  const fallback = segments.at(-1) || 'Knowledge base';
  return fallback.replaceAll('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
}

function frontMatter(title, route, position) {
  const safeTitle = title.replaceAll('\\', '\\\\').replaceAll('"', '\\"');
  const lines = ['---', `title: "${safeTitle}"`, `slug: ${route}`];
  if (position) lines.push(`sidebar_position: ${position}`);
  lines.push('---', '');
  return lines.join('\n');
}

function normalizeViewKey(input) {
  const url = new URL(input, ORIGIN);
  return decodeURIComponent(url.pathname).replace(/\/+$/, '').toLowerCase();
}

function safeAssetName(url, fallback = 'attachment') {
  let filename = decodeURIComponent(new URL(url).pathname.split('/').pop() || fallback);
  filename = filename.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-').replace(/\s+/g, '-');
  if (!filename || filename === '-') filename = fallback;
  return filename;
}

async function localizeAsset(assetUrl, docSlug, usedNames) {
  const parsed = new URL(assetUrl, ORIGIN);
  if (!/\/(?:download|attach)\//i.test(parsed.pathname)) return undefined;
  let filename = safeAssetName(parsed.href);
  const baseKey = `${docSlug}/${filename}`.toLowerCase();
  if (usedNames.has(baseKey) && usedNames.get(baseKey) !== parsed.href) {
    const ext = path.extname(filename);
    filename = `${path.basename(filename, ext)}-${crypto.createHash('sha1').update(parsed.href).digest('hex').slice(0, 8)}${ext}`;
  }
  usedNames.set(`${docSlug}/${filename}`.toLowerCase(), parsed.href);
  const relative = path.posix.join(docSlug || 'home', filename);
  const destination = path.join(ASSETS, ...relative.split('/'));
  await fs.mkdir(path.dirname(destination), {recursive: true});
  try {
    const response = await fetchRetry(parsed.href);
    await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
    return `/kb-assets/${relative.split('/').map(encodeURIComponent).join('/')}`;
  } catch (error) {
    console.warn(`Attachment unavailable in source (${error.message})`);
    return false;
  }
}

async function transformHtml(html, page, routeByView, usedNames) {
  const $ = cheerio.load(html, {decodeEntities: false}, false);
  $('script, style, form, input, button, textarea, select').remove();

  // XWiki's Glossary table contains a third column made entirely of non-breaking
  // spaces. Remove only fully empty trailing columns so meaningful cells are
  // never affected and the fix survives future migrations.
  if (page.fullName === 'Main.Glossary.WebHome') {
    $('table').each((_, table) => {
      const rows = $(table).find('tr').toArray();
      let columnCount = Math.max(0, ...rows.map(row => $(row).children('th, td').length));
      while (columnCount > 0) {
        const trailingColumnIsEmpty = rows.every(row => {
          const cells = $(row).children('th, td').toArray();
          const cell = cells[columnCount - 1];
          return !cell || $(cell).text().replace(/\u00a0/g, ' ').trim() === '';
        });
        if (!trailingColumnIsEmpty) break;
        for (const row of rows) {
          const cells = $(row).children('th, td').toArray();
          if (cells[columnCount - 1]) $(cells[columnCount - 1]).remove();
        }
        columnCount -= 1;
      }
    });
  }

  $('a, img, source, video').each((_, element) => {
    for (const attribute of ['href', 'src', 'poster']) {
      const value = $(element).attr(attribute);
      if (value) $(element).attr(`data-migrate-${attribute}`, value);
    }
  });

  const elements = $('a, img, source, video').toArray();
  for (const element of elements) {
    for (const attribute of ['href', 'src', 'poster']) {
      const value = $(element).attr(`data-migrate-${attribute}`);
      if (!value) continue;
      $(element).removeAttr(`data-migrate-${attribute}`);
      if (/^(?:data:|mailto:|tel:|#)/i.test(value)) continue;
      let absolute;
      try { absolute = new URL(value, page.xwikiRelativeUrl); } catch { continue; }
      const localized = await localizeAsset(absolute.href, page.docSlug, usedNames);
      if (typeof localized === 'string') {
        $(element).attr(attribute, localized);
        continue;
      }
      if (localized === false) {
        if (element.tagName === 'img' && attribute === 'src') {
          const name = safeAssetName(absolute.href, 'image');
          $(element).replaceWith(`<span class="warningmessage">Image unavailable in the XWiki source: ${name}</span>`);
        } else {
          $(element).attr(attribute, absolute.href);
        }
        continue;
      }
      const route = routeByView.get(normalizeViewKey(absolute.href));
      if (route) {
        $(element).attr(attribute, route + absolute.hash);
      } else if (absolute.origin === ORIGIN) {
        $(element).attr(attribute, absolute.href);
      }
    }
  }

  $('a[href]').each((_, element) => {
    const href = $(element).attr('href');
    if (/^https?:\/\//i.test(href || '')) $(element).attr('target', '_blank').attr('rel', 'noopener noreferrer');
  });
  $('img').each((_, element) => {
    if (!$(element).attr('alt')) $(element).attr('alt', 'Knowledge base illustration');
    $(element).attr('loading', 'lazy');
  });
  const {toc} = addDocusaurusHeadingAnchors(
    $,
    legacyAnchorAliasesByRoute.get(page.route),
    {includeNavigationAnchors: page.route === '/'},
  );
  return {html: $.html().trim(), toc};
}

async function inventory() {
  const pages = [];
  for (let start = 0; ; start += 1000) {
    const payload = await (await fetchRetry(`${API}&start=${start}`)).json();
    const batch = payload.pageSummaries || [];
    pages.push(...batch);
    if (batch.length < 1000) break;
  }
  const chosen = new Map();
  for (const page of pages) {
    if (!allowed.some(prefix => page.fullName === prefix || page.fullName.startsWith(prefix))) continue;
    if (page.name === 'WebPreferences') continue;
    const current = chosen.get(page.fullName);
    const title = (page.title || '').trim();
    const score = (page.translations?.default === 'en' ? 4 : 0) + (title && !title.startsWith('$') ? 2 : 0) + (page.parent ? 1 : 0);
    if (!current || score > current.score) chosen.set(page.fullName, {page, score});
  }
  return [...chosen.values()].map(item => item.page);
}

async function main() {
  const pages = await inventory();
  for (const page of pages) {
    page.segments = sourceSegments(page).map(slugify);
    page.docSlug = page.segments.join('/');
    page.slug = page.segments.length ? `/${page.docSlug}` : '/';
    page.route = page.segments.length ? `/${page.docSlug}` : '/';
    page.displayTitle = pageTitle(page, sourceSegments(page));
  }

  const hasChildren = new Set();
  for (const page of pages) {
    for (let length = 1; length < page.segments.length; length += 1) {
      hasChildren.add(page.segments.slice(0, length).join('/'));
    }
  }

  const routeByView = new Map(pages.map(page => [normalizeViewKey(page.xwikiRelativeUrl), page.route]));
  for (const [source, route] of [...routeByView]) {
    if (source.includes('/main/vision point software suite/')) {
      routeByView.set(source.replace('/main/vision point software suite/', '/main/vision_point/'), route);
    }
  }
  const usedNames = new Map();
  await fs.rm(DOCS, {recursive: true, force: true});
  await fs.rm(ASSETS, {recursive: true, force: true});
  await fs.mkdir(DOCS, {recursive: true});
  await fs.mkdir(ASSETS, {recursive: true});

  let migrated = 0;
  for (const page of pages.sort((a, b) => a.docSlug.localeCompare(b.docSlug))) {
    const source = page.xwikiRelativeUrl.replace('/view/', '/get/');
    let html;
    try {
      html = await (await fetchRetry(`${source}${source.includes('?') ? '&' : '?'}xpage=plain&language=en`)).text();
    } catch (error) {
      console.warn(`Skipped ${page.fullName}: ${error.message}`);
      continue;
    }
    const transformed = await transformHtml(html, page, routeByView, usedNames);
    const body = transformed.html;
    const isRoot = page.segments.length === 0;
    const isCategory = hasChildren.has(page.docSlug);
    const relativeFile = isRoot
      ? 'index.mdx'
      : isCategory
        ? path.posix.join(page.docSlug, 'index.mdx')
        : `${page.docSlug}.mdx`;
    const destination = path.join(DOCS, ...relativeFile.split('/'));
    await fs.mkdir(path.dirname(destination), {recursive: true});
    const variable = JSON.stringify(body).replace(/</g, '\\u003c');
    const toc = JSON.stringify(transformed.toc);
    const content = `${frontMatter(page.displayTitle, page.slug, positions.get(page.docSlug))}import XWikiContent from '@site/src/components/XWikiContent';\n\nexport const xwikiHtml = ${variable};\n\nexport const toc = ${toc};\n\n<XWikiContent html={xwikiHtml} anchorIds={toc.map(item => item.id)} />\n`;
    await fs.writeFile(destination, content, 'utf8');

    if (isCategory) {
      const category = {
        label: page.displayTitle,
        position: positions.get(page.docSlug) || undefined,
        link: {type: 'doc', id: `${page.docSlug}/index`},
      };
      await fs.writeFile(path.join(path.dirname(destination), '_category_.json'), `${JSON.stringify(category, null, 2)}\n`, 'utf8');
    }
    migrated += 1;
    console.log(`${String(migrated).padStart(2, '0')} ${page.route}`);
  }
  console.log(`Migrated ${migrated} pages and ${usedNames.size} attachment references.`);
}

await main();
