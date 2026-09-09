// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import {readFileSync} from 'node:fs';

const sdkVersionsPath = new URL('./sdk_versions.json', import.meta.url);
let sdkVersions = [];
try {
  sdkVersions = JSON.parse(readFileSync(sdkVersionsPath, 'utf8'));
} catch {
  // DocsBuilder output is optional until the first SDK synchronization.
}
const sdkVersionConfig = Object.fromEntries(
  sdkVersions.map(version => [version, {label: version, path: version}]),
);

function linkVpIIDocumentationToSdk(items) {
  return items.map(item => {
    if (item.type === 'category' && item.label === 'VP II Documentation') {
      return {
        type: 'link',
        label: item.label,
        href: `/vp2-docs/${sdkVersions[0]}/`,
      };
    }

    return item.type === 'category'
      ? {...item, items: linkVpIIDocumentationToSdk(item.items)}
      : item;
  });
}

// Replace these placeholders through environment variables when the Algolia
// DocSearch index is ready. Only a search-only API key should be exposed here.
const algoliaConfig = {
  appId: process.env.ALGOLIA_APP_ID || 'YOUR_APP_ID',
  apiKey: process.env.ALGOLIA_SEARCH_API_KEY || 'YOUR_SEARCH_ONLY_API_KEY',
  indexName: process.env.ALGOLIA_INDEX_NAME || 'YOUR_INDEX_NAME',
  contextualSearch: true,
};

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KAYA Vision Knowledge Base',
  tagline: 'Frame grabbers, cameras, range extenders, and Vision Point',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://sar-vision.github.io',
  baseUrl: '/sar-knowledgebase-public/',
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'SAR-Vision',
  projectName: 'sar-knowledgebase-public',

  onBrokenLinks: 'throw',

  // DocsBuilder emits SDK content as plain Markdown. Detecting the format by
  // extension prevents braces in .md prose from being parsed as MDX/JavaScript,
  // while the migrated knowledge-base .mdx files keep their JSX support.
  markdown: {
    format: 'detect',
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          sidebarItemsGenerator: async ({defaultSidebarItemsGenerator, ...args}) =>
            linkVpIIDocumentationToSdk(await defaultSidebarItemsGenerator(args)),
          // Serve the knowledge base directly from the site root. There is no
          // separate landing/title page.
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins:
    sdkVersions.length > 0
      ? [
          [
            '@docusaurus/plugin-content-docs',
            {
              id: 'sdk',
              path: 'sdk_docs',
              routeBasePath: 'vp2-docs',
              sidebarPath: './sidebarsSdk.js',
              includeCurrentVersion: false,
              lastVersion: sdkVersions[0],
              versions: sdkVersionConfig,
            },
          ],
        ]
      : [],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: false,
      },
      navbar: {
        logo: {
          alt: 'KAYA Vision',
          src: 'img/kaya-vision-logo-white.webp',
          srcDark: 'img/kaya-vision-logo-white.webp',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'knowledgeBaseSidebar',
            position: 'left',
            label: 'Knowledge Base',
          },
          ...(sdkVersions.length > 0
            ? [
                {
                  type: 'docSidebar',
                  docsPluginId: 'sdk',
                  sidebarId: 'sdkSidebar',
                  label: 'VP II Docs',
                  position: 'left',
                },
                {
                  type: 'docsVersionDropdown',
                  docsPluginId: 'sdk',
                  position: 'right',
                },
              ]
            : []),
          {type: 'search', position: 'right'},
          {href: 'https://kaya.vision', label: 'KAYA Vision', position: 'right'},
        ],
      },
      algolia: algoliaConfig,
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Knowledge Base', to: '/'},
            ],
          },
          {title: 'Company', items: [{label: 'KAYA Vision', href: 'https://kaya.vision'}]},
        ],
        copyright: `KAYA Vision © ${new Date().getFullYear()}. All Rights Reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
