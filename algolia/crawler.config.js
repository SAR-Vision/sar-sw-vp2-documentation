// Paste into the Algolia Crawler Editor, not docusaurus.config.js.
// Restore the crawler's existing indexing key only in the Algolia dashboard.
new Crawler({
  appId: "M5LYZ612BL",
  apiKey: "REPLACE_IN_ALGOLIA_DASHBOARD_ONLY",
  indexPrefix: "",
  rateLimit: 8,
  maxUrls: 1000,
  maxDepth: 10,
  schedule: "on the 22 day of the month",
  startUrls: ["https://sar-vision.github.io/sar-sw-vp2-documentation/"],
  sitemaps: ["https://sar-vision.github.io/sar-sw-vp2-documentation/sitemap.xml"],
  discoveryPatterns: ["https://sar-vision.github.io/sar-sw-vp2-documentation/**"],
  exclusionPatterns: [
    "https://sar-vision.github.io/sar-sw-vp2-documentation/downloads/**",
    "https://sar-vision.github.io/sar-sw-vp2-documentation/assets/**",
    "https://sar-vision.github.io/sar-sw-vp2-documentation/search/**",
  ],
  renderJavaScript: false,
  saveBackup: false,
  ignoreQueryParams: ["source", "utm_*"],
  actions: [{
    indexName: "sar_vision_github_io_m5lyz612bl_docsearch",
    pathsToMatch: ["https://sar-vision.github.io/sar-sw-vp2-documentation/**"],
    recordExtractor: ({ url, $ }) => {
      const article = $("article").first().clone();
      if (!article.length) return [];
      article.find("script, style, button, .hash-link").remove();
      article.find("br").replaceWith(" ");
      article.find(".token-line").append(" ");
      const clean = (text) => text.replace(/\s+/g, " ").trim();
      const metadata = (name) => $("meta[name='docsearch:" + name + "']").attr("content");
      const language = metadata("language") || $("html").attr("lang") || "en";
      const version = metadata("version") || "current";
      const docusaurusTag = metadata("docusaurus_tag") || "default";
      const pageUrl = String(url).split("#")[0].split("?")[0];
      const hierarchy = {
        lvl0: "Vision Point II Documentation",
        lvl1: clean(article.find("h1").first().text()) || clean($("title").text()),
        lvl2: null, lvl3: null, lvl4: null, lvl5: null, lvl6: null,
      };
      const records = [];
      let anchor = "";
      let content = "";
      let contentBytes = 0;
      // Count UTF-8 bytes without relying on Node-specific crawler globals.
      const bytes = (text) => encodeURIComponent(text).replace(/%[0-9A-F]{2}/gi, "x").length;
      const flush = () => {
        if (!content.trim()) return;
        const targetUrl = pageUrl + (anchor ? "#" + encodeURIComponent(anchor) : "");
        const record = {
          objectID: pageUrl + "::" + records.length,
          url: targetUrl,
          url_without_anchor: pageUrl,
          anchor: anchor || null,
          hierarchy: { ...hierarchy },
          content: content.trim(),
          type: "content",
          language,
          lang: language,
          version,
          docusaurus_tag: docusaurusTag,
          weight: { pageRank: 0, level: 0, position: records.length },
        };
        if (bytes(JSON.stringify(record)) > 9000) {
          throw new Error("Search record exceeds 9,000 bytes: " + targetUrl);
        }
        records.push(record);
        content = "";
        contentBytes = 0;
      };
      const append = (text) => {
        // Keep words together unless a single token exceeds the budget.
        for (const token of (clean(text) + " ").match(/\S+\s*/g) || []) {
          const tokenBytes = bytes(JSON.stringify(token)) - 2;
          if (contentBytes + tokenBytes > 5000) flush();
          if (tokenBytes <= 5000) {
            content += token;
            contentBytes += tokenBytes;
          } else {
            for (const character of token) {
              const characterBytes = bytes(JSON.stringify(character)) - 2;
              if (contentBytes + characterBytes > 5000) flush();
              content += character;
              contentBytes += characterBytes;
            }
          }
        }
      };
      // The API guide has over 1,000 h6 headings. Keep them searchable as
      // content under h1-h5 sections instead of exceeding 750 records per page.
      const blocks = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "pre", "tr", "dt", "dd", "figcaption"]);
      const visit = (element) => {
        if (element.type === "text") {
          append(element.data);
          return;
        }
        const node = $(element);
        const tag = (element.name || "").toLowerCase();
        if (!blocks.has(tag)) {
          for (const child of element.children || []) visit(child);
          return;
        }
        const text = tag === "tr"
          ? node.children("th, td").toArray().map((cell) => clean($(cell).text())).join(" | ")
          : clean(node.text());
        if (!text) return;
        if (/^h[1-5]$/.test(tag)) {
          flush();
          const level = Number(tag.slice(1));
          hierarchy["lvl" + level] = text;
          for (let deeper = level + 1; deeper <= 6; deeper++) hierarchy["lvl" + deeper] = null;
          anchor = node.attr("id") || "";
        }
        append(text);
      };
      for (const element of article[0].children || []) visit(element);
      flush();
      if (records.length > 750) {
        throw new Error("Split this documentation page into smaller pages; it produces " + records.length + " search records: " + pageUrl);
      }
      return records;
    },
  }],
  initialIndexSettings: {
    sar_vision_github_io_m5lyz612bl_docsearch: {
      searchableAttributes: [
        "unordered(hierarchy.lvl0)", "unordered(hierarchy.lvl1)",
        "unordered(hierarchy.lvl2)", "unordered(hierarchy.lvl3)",
        "unordered(hierarchy.lvl4)", "unordered(hierarchy.lvl5)",
        "unordered(hierarchy.lvl6)", "content",
      ],
      attributesForFaceting: ["type", "lang", "language", "version", "docusaurus_tag"],
      attributesToRetrieve: ["hierarchy", "content", "anchor", "url", "url_without_anchor", "type"],
      attributesToHighlight: ["hierarchy", "content"],
      attributesToSnippet: ["content:20"],
      customRanking: ["desc(weight.pageRank)", "desc(weight.level)", "asc(weight.position)"],
      distinct: true,
      attributeForDistinct: "url",
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: "</span>",
      separatorsToIndex: "_",
    },
  },
});
