import {createSlugger} from '@docusaurus/utils';

const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6';

export const legacyAnchorAliasesByRoute = new Map([
  [
    '/vision-point-software-suite/logs',
    [{id: 'HVisionPointlogs'}],
  ],
  [
    '/kaya-hardware/frame-grabbers/features-and-parameters',
    [{id: 'K3'}],
  ],
  [
    '/kaya-hardware/frame-grabbers',
    [{id: 'Max', targetId: 'max'}],
  ],
]);

function editDistance(left, right) {
  const previous = Array.from({length: right.length + 1}, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length];
}

function headingText($, heading) {
  const copy = $(heading).clone();
  copy.find('a.hash-link').remove();
  copy.find('img').each((_, image) => {
    $(image).replaceWith($(image).attr('alt') || '');
  });
  return copy.text().replaceAll('\u200b', '').trim();
}

/**
 * Give headings imported as raw XWiki HTML the same anchors as native
 * Docusaurus headings while retaining every legacy XWiki fragment target.
 */
export function addDocusaurusHeadingAnchors(
  $,
  extraAliases = [],
  {includeNavigationAnchors = false} = {},
) {
  const slugger = createSlugger();
  let enhanced = 0;
  let legacyAliases = 0;
  let navigationAnchors = 0;
  const headings = [];
  const toc = [];

  $(HEADING_SELECTOR).each((_, heading) => {
    const element = $(heading);
    const text = headingText($, heading);
    const slug = slugger.slug(text || 'section');
    const legacyId = element.attr('data-xwiki-heading-id') || element.attr('id');
    headings.push({element, legacyId});
    const level = Number(heading.tagName.slice(1));
    if (level >= 2) {
      toc.push({
        value: $('<span>').text(text || legacyId || slug).html(),
        id: slug,
        level,
      });
    }

    // This makes the transform safe to run repeatedly on already migrated docs.
    if (element.children('a.hash-link').length > 0) return;

    if (legacyId && legacyId !== slug) {
      element.before(
        $('<span>')
          .attr('id', legacyId)
          .attr('class', 'xwiki-anchor-alias')
          .attr('aria-hidden', 'true'),
      );
      element.attr('data-xwiki-heading-id', legacyId);
      legacyAliases += 1;
    }

    element.attr('id', slug).addClass('anchor');
    const label = text || legacyId || slug;
    const title = `Direct link to ${label}`;
    element.append(
      $('<a>')
        .attr('href', `#${slug}`)
        .attr('class', 'hash-link')
        .attr('aria-label', title)
        .attr('title', title)
        .attr('translate', 'no')
        .text('\u200b'),
    );
    enhanced += 1;
  });

  // A small number of XWiki pages contain typoed table-of-contents fragments.
  // Retain those URLs when they differ by one character from exactly one known
  // legacy heading ID. This repairs the link without discarding either spelling.
  const ids = new Set($('[id]').toArray().map(element => $(element).attr('id')));
  $('a[href^="#"]').each((_, link) => {
    const href = $(link).attr('href');
    let fragment;
    try {
      fragment = decodeURIComponent(href.slice(1));
    } catch {
      return;
    }
    if (!fragment || ids.has(fragment)) return;

    const matches = headings.filter(
      heading => heading.legacyId && editDistance(fragment, heading.legacyId) === 1,
    );
    if (matches.length !== 1) return;

    matches[0].element.before(
      $('<span>')
        .attr('id', fragment)
        .attr('class', 'xwiki-anchor-alias')
        .attr('aria-hidden', 'true'),
    );
    ids.add(fragment);
    legacyAliases += 1;
  });

  for (const alias of extraAliases) {
    if (ids.has(alias.id)) continue;
    const target = alias.targetId
      ? $(`[id="${alias.targetId}"]`).first()
      : $.root().children().first();
    if (target.length === 0) continue;
    target.before(
      $('<span>')
        .attr('id', alias.id)
        .attr('class', 'xwiki-anchor-alias')
        .attr('aria-hidden', 'true'),
    );
    ids.add(alias.id);
    legacyAliases += 1;
  }

  if (includeNavigationAnchors) {
    const navigationSlugger = createSlugger();
    $('ul').first().children('li').each((_, item) => {
      const element = $(item);
      const directLink = element.children('span.wikilink').find('a').first();
      const directText = element
        .contents()
        .filter((_, node) => node.type === 'text')
        .toArray()
        .map(node => $(node).text())
        .join(' ')
        .trim();
      const label = directLink.text().trim() || directText;
      if (!label) return;

      const id = element.attr('data-docusaurus-navigation-id') || navigationSlugger.slug(label);
      toc.push({value: $('<span>').text(label).html(), id, level: 2});
      if (element.attr('data-docusaurus-navigation-id')) return;

      element
        .attr('id', id)
        .attr('data-docusaurus-navigation-id', id)
        .addClass('anchor');
      const title = `Direct link to ${label}`;
      const hashLink = $('<a>')
        .attr('href', `#${id}`)
        .attr('class', 'hash-link')
        .attr('aria-label', title)
        .attr('title', title)
        .attr('translate', 'no')
        .text('\u200b');
      const childList = element.children('ul').first();
      if (childList.length > 0) hashLink.insertBefore(childList);
      else element.append(hashLink);
      navigationAnchors += 1;
    });
  }

  return {enhanced, legacyAliases, navigationAnchors, toc};
}
