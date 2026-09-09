import React from 'react';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

export default function XWikiContent({html, anchorIds = []}) {
  const brokenLinks = useBrokenLinks();
  const {withBaseUrl} = useBaseUrlUtils();
  for (const id of anchorIds) brokenLinks.collectAnchor(id);

  // Keep native table layout while letting wide tables scroll independently.
  const responsiveHtml = html
    // Raw imported HTML bypasses Docusaurus Link/Image handling.
    .replace(/\b(href|src|poster)=(['"])(\/(?!\/)[^'"]*)\2/gi,
      (_, attribute, quote, url) =>
        `${attribute}=${quote}${withBaseUrl(url)}${quote}`)
    .replace(/<table\b/gi, '<div class="xwiki-table-scroll"><table')
    .replace(/<\/table>/gi, '</table></div>');

  return (
    <div
      className="xwiki-content"
      dangerouslySetInnerHTML={{__html: responsiveHtml}}
    />
  );
}
