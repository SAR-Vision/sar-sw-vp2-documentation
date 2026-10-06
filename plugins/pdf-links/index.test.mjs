import assert from 'node:assert/strict';
import test from 'node:test';
import {evaluate} from '@mdx-js/mdx';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import * as runtime from 'react/jsx-runtime';
import pdfLinks from './index.mjs';

async function render(markdown, enabled = true, format = 'md') {
  const {default: Content} = await evaluate(markdown, {
    ...runtime,
    format,
    remarkPlugins: enabled ? [pdfLinks] : [],
  });
  return renderToStaticMarkup(createElement(Content));
}

const rawLink = '[Download PDF](/downloads/sdk/New Guide 2027.1.pdf)';

test('new exports render clickable PDF links in Markdown and MDX', async () => {
  for (const format of ['md', 'mdx']) {
    const html = await render(rawLink, true, format);
    assert.match(html, /<a href="\/downloads\/sdk\/New%20Guide%202027\.1\.pdf">Download PDF<\/a>/);
    assert.doesNotMatch(await render(rawLink, false, format), /<a /);
  }
});

test('multiple links and filenames with parentheses or existing escapes work', async () => {
  const markdown = `${rawLink}\n\n[Download PDF](/downloads/sdk/New%20Guide (Rev 2).pdf)`;
  const html = await render(markdown);
  assert.equal((html.match(/<a /g) ?? []).length, 2);
  assert.match(html, /href="\/downloads\/sdk\/New%20Guide%20\(Rev%202\)\.pdf"/);
  assert.doesNotMatch(html, /%2520/);
});

test('valid links, code examples, escaped text, and unrelated links stay unchanged', async () => {
  const examples = [
    rawLink.replaceAll('New Guide ', 'New%20Guide%20'),
    '[Download PDF](</downloads/sdk/New Guide 2027.1.pdf>)',
    '[Download PDF](/downloads/sdk/Guide.pdf "PDF title")',
    `\`\`\`md\n${rawLink}\n\`\`\``,
    `~~~md\n${rawLink}\n~~~`,
    `    ${rawLink}`,
    `\`${rawLink}\``,
    String.raw`\[Download PDF\](/downloads/sdk/New Guide 2027.1.pdf)`,
    '<!--\n' + rawLink + '\n-->',
    '[Download PDF](https://example.com/New Guide.pdf)',
    '[Download PDF](/other/New Guide.pdf)',
  ];
  for (const markdown of examples) {
    assert.equal(await render(markdown), await render(markdown, false), markdown);
  }
});
