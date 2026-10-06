// Run after npm run build: node algolia/verify-crawler.cjs
// Uses the Cheerio dependency included with Docusaurus.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
const cheerio = require('cheerio');

let config;
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'crawler.config.js'), 'utf8'), {
  Crawler: function(value) { config = value; },
});
const extract = config.actions[0].recordExtractor;
const build = path.join(__dirname, '..', 'build');
const rows = [];
const ids = new Set();
let largestRecordBytes = 0;
const words = text => new Set(text.match(/[\p{L}\p{N}_]+/gu) || []);

for (const file of fs.readdirSync(build, {recursive: true}).filter(p => p.endsWith('index.html'))) {
  const $ = cheerio.load(fs.readFileSync(path.join(build, file), 'utf8'));
  const url = new URL(config.startUrls[0] + file.replaceAll('\\', '/').replace(/index\.html$/, ''));
  const records = extract({url, $});
  if (!$('article').length) {
    assert.equal(records.length, 0);
    continue;
  }
  assert(records.length > 0 && records.length <= 750, file);
  const anchors = new Set($('[id]').toArray().map(e => e.attribs.id));
  for (const record of records) {
    const size = Buffer.byteLength(JSON.stringify(record));
    largestRecordBytes = Math.max(largestRecordBytes, size);
    assert(size <= 9000, file);
    assert(record.hierarchy.lvl1 && record.type === 'content', file);
    for (const field of ['language', 'version', 'docusaurus_tag']) {
      const expected = $('meta[name="docsearch:' + field + '"]').attr('content');
      if (expected) assert.equal(record[field], expected, file);
    }
    assert(!ids.has(record.objectID), 'Duplicate objectID');
    ids.add(record.objectID);
    assert(!record.anchor || anchors.has(record.anchor), 'Missing section anchor: ' + record.url);
  }
  // Independently gather every article text node to catch omitted content,
  // missing table columns, and code lines accidentally merged into one token.
  const article = $('article').clone();
  article.find('script, style, button, .hash-link').remove();
  const sourceText = [];
  function collect(node) {
    if (node.type === 'text') sourceText.push(node.data);
    for (const child of node.children || []) collect(child);
  }
  collect(article[0]);
  const expected = words(sourceText.join(' '));
  const combined = records.map(record => record.content).join(' ');
  // Inline formatting can divide a word into multiple source text nodes.
  const missing = [...expected].filter(word => !combined.includes(word));
  assert.equal(missing.length, 0, JSON.stringify({file, missing: missing.slice(0, 20)}));
  rows.push({file, records: records.length});
}
assert(rows.length > 0, 'Build the site before checking the extractor.');

// A single long Unicode token must be split without dropping characters.
const longToken = 'GPU_' + '😀'.repeat(6000);
const $ = cheerio.load('<html lang="en"><head><meta name="docsearch:version" content="future">' +
  '<meta name="docsearch:docusaurus_tag" content="docs-default-future"></head>' +
  '<body><article><h1>Unicode test</h1><h2 id="section">Section</h2><p>' + longToken + '</p></article></body></html>');
const records = extract({url: new URL('https://example.com/future/'), $});
assert(records.every(record => Buffer.byteLength(JSON.stringify(record)) <= 9000));
assert(records.every(record => record.version === 'future' && record.docusaurus_tag === 'docs-default-future'));
assert(records.map(record => record.content).join('').includes(longToken), 'Lost long-token content');

const codePage = cheerio.load('<article><h1>Code</h1><pre><code>' +
  '<div class="token-line">KY_DISABLE_WARNING_PUSH<br></div>' +
  '<div class="token-line">KY_DISABLE_WARNING_POP<br></div>' +
  '</code></pre><div><strong>Important</strong></div>' +
  '<table><tr><td>First</td><td>Middle</td><td>Last</td></tr></table></article>');
const codeRecords = extract({url: new URL('https://example.com/code/'), $: codePage});
const codeText = codeRecords.map(record => record.content).join(' ');
assert(codeText.includes('KY_DISABLE_WARNING_PUSH KY_DISABLE_WARNING_POP'));
assert(codeText.includes('Important') && codeText.includes('First | Middle | Last'));

console.log(JSON.stringify({
  pages: rows.length,
  records: rows.reduce((total, row) => total + row.records, 0),
  largestRecordBytes,
  largestPages: rows.sort((a, b) => b.records - a.records).slice(0, 4),
}, null, 2));
console.log('Passed: article word coverage, record sizes/counts, anchors, unique IDs, version filters, and Unicode splitting.');
