/**
 * Recover standalone PDF links emitted by DocsBuilder with unencoded spaces.
 * Run before Docusaurus resolves Markdown links to bundled static assets.
 */
export default function pdfLinks() {
  return (tree, file) => {
    const source = String(file.value);

    function visit(node) {
      if (node.type === 'paragraph' && node.children?.length === 1) {
        const text = node.children[0];
        if (text.type === 'text') {
          const match = /^\[Download PDF\]\((\/downloads\/sdk\/[^<>\r\n]+\.pdf)\)$/.exec(text.value);
          // Compare source text so intentionally escaped Markdown stays literal.
          const start = text.position?.start.offset;
          const end = text.position?.end.offset;
          if (match && match[1].includes(' ') && start !== undefined &&
              end !== undefined && source.slice(start, end) === text.value) {
            node.children = [{
              type: 'link',
              url: match[1].replaceAll(' ', '%20'),
              title: null,
              children: [{type: 'text', value: 'Download PDF'}],
              position: text.position,
            }];
          }
        }
      }
      for (const child of node.children ?? []) visit(child);
    }

    visit(tree);
  };
}
