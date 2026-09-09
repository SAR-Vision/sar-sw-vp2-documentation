# sar-knowledgebase-public

Docusaurus knowledge base, published at
https://sar-vision.github.io/sar-knowledgebase-public/.

## Local development

Use Node.js 22 and npm:

```sh
npm ci
npm start
```

The local site uses the same `/sar-knowledgebase-public/` base path as production.
To preview a production build:

```sh
npm run build
npm run serve
```

Open http://localhost:3000/sar-knowledgebase-public/.

## GitHub Pages

1. In the repository's **Settings → Pages → Build and deployment**, select
   **GitHub Actions** as the source.
2. Commit and push the site source, `package-lock.json`, and
   `.github/workflows/deploy-pages.yml` to `main`.
3. Open **Actions → Build and deploy documentation** to follow the deployment.

The workflow installs dependencies with `npm ci`, builds with `npm run build`,
uploads `build/`, and deploys it with the GitHub Pages actions. Pull requests to
`main` only build; pushes to `main` and manual runs on `main` deploy after a
successful build. No personal access token or `gh-pages` branch is required.
Generated `build/`, `.docusaurus/`, and `node_modules/` are ignored by Git.

The deployment settings in `docusaurus.config.js` are:

```js
url: 'https://sar-vision.github.io',
baseUrl: '/sar-knowledgebase-public/',
organizationName: 'SAR-Vision',
projectName: 'sar-knowledgebase-public',
trailingSlash: true,
```

Imported HTML links and images use the configured base path through
`XWikiContent`. Fonts are bundled from `static/fonts` so they also work under
the repository path.

## Search configuration

When the Algolia DocSearch index is ready, set repository Actions variables
`ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_API_KEY`, and `ALGOLIA_INDEX_NAME`, then rerun
the workflow. Use only a public search-only API key: these values are included
in the browser bundle. Configure the index crawler for the published Pages URL.
Until these values are configured, search still uses placeholder credentials.

## AI agent discovery

Each production build automatically generates:

- `llms.txt`: a Markdown navigation index of published articles, grouped by
  knowledge-base topic and VP II documentation version. Links lead to HTML
  articles; this is an index, not a full-text export.
- `sitemap.xml`: the existing Docusaurus XML sitemap for crawlers.

Published index: https://sar-vision.github.io/sar-knowledgebase-public/llms.txt

The local plugin in `plugins/ai-sitemap/index.mjs` uses Docusaurus document
metadata so URLs follow `baseUrl`, version paths, and slugs. Draft and unlisted
documents are omitted. Every built HTML page includes a `rel="describedby"`
link to the index. The GitHub Pages workflow deploys it with the rest of `build/`.
No manual updates or extra workflow steps are needed when articles are added.

Preview with `npm run build` and `npm run serve`; the generated file is available
under `/sar-knowledgebase-public/llms.txt`. It is generated for production builds,
not by `npm start`. This follows the navigation format proposed at
https://llmstxt.org/; agent support varies.
