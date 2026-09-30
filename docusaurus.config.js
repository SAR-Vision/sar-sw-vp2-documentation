// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import {readFileSync} from 'node:fs';
import aiSitemap from './plugins/ai-sitemap/index.mjs';

const versionsPath = new URL('./versions.json', import.meta.url);
const versions = JSON.parse(readFileSync(versionsPath, 'utf8'));
const versionConfig = Object.fromEntries(
  versions.map(version => [version, {label: version, path: version}]),
);

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
  title: 'Vision Point II Documentation',
  tagline: 'Versioned documentation for the Vision Point II SDK',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://sar-vision.github.io',
  baseUrl: '/sar-sw-vp2-documentation/',
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'SAR-Vision',
  projectName: 'sar-sw-vp2-documentation',

  onBrokenLinks: 'throw',

  // DocsBuilder emits SDK content as plain Markdown. Detecting the format by
  // extension prevents braces in .md prose from being parsed as MDX/JavaScript.
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
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          includeCurrentVersion: false,
          lastVersion: versions[0],
          versions: versionConfig,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [aiSitemap],

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
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {type: 'search', position: 'right'},
        ],
      },
      algolia: algoliaConfig,
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Documentation', to: '/'},
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
