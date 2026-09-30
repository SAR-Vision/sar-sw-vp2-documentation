import {writeFile} from 'node:fs/promises';
import path from 'node:path';

function text(value) {
  return String(value).replace(/\s+/g, ' ').trim()
    .replace(/([\\\[\]*_`])/g, '\\$1');
}

/** Generate an agent index from published docs metadata, not source filenames. */
export default function aiSitemap({siteConfig}) {
  const siteRoot = new URL(siteConfig.baseUrl, siteConfig.url);
  const indexUrl = new URL('llms.txt', siteRoot).href;
  let sections = new Map();

  return {
    name: 'ai-sitemap',

    allContentLoaded({allContent}) {
      sections = new Map();
      const seen = new Set();
      const content = allContent['docusaurus-plugin-content-docs']?.default;
      for (const version of content?.loadedVersions ?? []) {
        for (const doc of version.docs) {
          if (doc.draft || doc.unlisted) continue;
          const url = new URL(doc.permalink, siteConfig.url);
          if (siteConfig.trailingSlash === true && !url.pathname.endsWith('/')) {
            url.pathname += '/';
          }
          if (seen.has(url.href)) continue;
          seen.add(url.href);
          const section = `VP II Documentation — ${version.versionName}`;
          const entries = sections.get(section) ?? [];
          entries.push({
            title: doc.title,
            url: url.href,
            description: doc.frontMatter.description,
          });
          sections.set(section, entries);
        }
      }
    },

    injectHtmlTags() {
      return {
        headTags: [{
          tagName: 'link',
          attributes: {rel: 'describedby', type: 'text/plain', href: indexUrl},
        }],
      };
    },

    async postBuild({outDir}) {
      const lines = [
        `# ${text(siteConfig.title)}`,
        '',
        '> Versioned documentation for the Vision Point II SDK, applications, installation, migration, and API.',
        '',
        'This index links to published HTML articles. Follow the relevant links for complete instructions, tables, code examples, and images.',
        'Choose the VP II documentation version that matches the installed SDK.',
        '',
        '## Site navigation',
        '',
        `- [Documentation home](${siteRoot.href}): Latest VP II documentation.`,
        `- [XML sitemap](${new URL('sitemap.xml', siteRoot).href}): Machine-readable list of public site routes.`,
      ];
      const orderedSections = [...sections].sort(([a], [b]) => a.localeCompare(b, 'en'));
      for (const [section, entries] of orderedSections) {
        lines.push('', `## ${text(section)}`, '');
        entries.sort((a, b) => a.title.localeCompare(b.title, 'en') || a.url.localeCompare(b.url, 'en'));
        for (const entry of entries) {
          const description = entry.description ? `: ${text(entry.description)}` : '';
          lines.push(`- [${text(entry.title)}](${entry.url})${description}`);
        }
      }
      await writeFile(path.join(outDir, 'llms.txt'), `${lines.join('\n')}\n`, 'utf8');
    },
  };
}
