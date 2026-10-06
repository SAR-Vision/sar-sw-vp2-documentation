# sar-sw-vp2-documentation

Versioned Vision Point II (VP2) documentation, published at
https://sar-vision.github.io/sar-sw-vp2-documentation/.

The home page opens the latest published VP2 documentation. The navbar provides
a version selector, search, and the theme toggle.

## Local development

Use Node.js 22 and npm:

```sh
npm ci
npm start
```

The local site uses the same `/sar-sw-vp2-documentation/` base path as production.
To preview a production build:

```sh
npm run build
npm run serve
```

Open http://localhost:3000/sar-sw-vp2-documentation/.

## VP2 documentation versions

The site uses the default Docusaurus docs plugin and directory structure:

- `docs/` contains the current documentation sources and their image assets.
- `sidebars.js` defines the current `docsSidebar` navigation.
- `versioned_docs/version-<version>/` contains each published release snapshot.
- `versioned_sidebars/` contains the matching release sidebars.
- `versions.json` lists published releases, with the latest version first.

The site publishes release snapshots; current sources are excluded until a
release is created. Edit or generate new content in `docs/`, then snapshot a new
release with `npm run docusaurus -- docs:version <version>`. To correct an
existing release, update its files in `versioned_docs/` and matching sidebar.
DocsBuilder exports must target these standard paths and use `docsSidebar`.
Downloadable PDFs remain in `static/downloads/sdk/`.

DocsBuilder's standalone `[Download PDF](/downloads/sdk/File name.pdf)` links
work even when filenames contain spaces. The local Remark plugin in
`plugins/pdf-links/index.mjs` repairs these links before Docusaurus resolves the
PDF assets, for both local development and production builds across all docs
versions. Existing encoded links and code examples are preserved. Keep each PDF
in `static/downloads/sdk/` with the filename used in the link. If changing the
exporter, prefer emitting valid Markdown URLs with spaces encoded as `%20`.

Published versions use `/<version>/` beneath the site's base path, for example
`/sar-sw-vp2-documentation/2026.2.0/`. The home page follows the latest published
version automatically.

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
baseUrl: '/sar-sw-vp2-documentation/',
organizationName: 'SAR-Vision',
projectName: 'sar-sw-vp2-documentation',
trailingSlash: true,
```

Fonts are bundled from `static/fonts` so they also work under the repository
path.

## Search configuration

When the Algolia DocSearch index is ready, set repository Actions variables
`ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_API_KEY`, and `ALGOLIA_INDEX_NAME`, then rerun
the workflow. Use only a public search-only API key: these values are included
in the browser bundle. Configure the index crawler for the published Pages URL.
Until these values are configured, search still uses placeholder credentials.

## AI agent discovery

Each production build automatically generates:

- `llms.txt`: a Markdown navigation index of published articles, grouped by
  VP II documentation version. Links lead to HTML
  articles; this is an index, not a full-text export.
- `sitemap.xml`: the existing Docusaurus XML sitemap for crawlers.

Published index: https://sar-vision.github.io/sar-sw-vp2-documentation/llms.txt

The local plugin in `plugins/ai-sitemap/index.mjs` uses Docusaurus document
metadata so URLs follow `baseUrl`, version paths, and slugs. Draft and unlisted
documents are omitted. Every built HTML page includes a `rel="describedby"`
link to the index. The GitHub Pages workflow deploys it with the rest of `build/`.
No manual updates or extra workflow steps are needed when articles are added.

Preview with `npm run build` and `npm run serve`; the generated file is available
under `/sar-sw-vp2-documentation/llms.txt`. It is generated for production builds,
not by `npm start`. This follows the navigation format proposed at
https://llmstxt.org/; agent support varies.
