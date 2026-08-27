// SEO meta-text and structured-data helpers shared across page templates.

const MAX_DESC = 155;

/**
 * Normalize and truncate text to a search-friendly meta-description length,
 * cutting at a word boundary and appending an ellipsis when truncated.
 */
export function metaDescription(
  text: string | undefined,
  max = MAX_DESC,
): string | undefined {
  if (!text) return undefined;
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean) return undefined;
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  const end = lastSpace > max * 0.6 ? lastSpace : max;
  return `${clean.slice(0, end).replace(/[,\s]+$/, '')}…`;
}

export interface Crumb {
  label?: string;
  href?: string;
  id?: string;
}

/**
 * BreadcrumbList JSON-LD mirroring the visible breadcrumb trail on a page.
 * The final crumb (no `href`) resolves to the current page URL.
 */
export function breadcrumbJsonLd(
  crumbs: Crumb[],
  pageUrl: string,
): Record<string, unknown> {
  const itemListElement = crumbs
    .filter((c) => c.label || c.id)
    .map((c, i) => {
      const isLast = i === crumbs.length - 1;
      const href = isLast
        ? pageUrl
        : c.href
          ? new URL(c.href, pageUrl).toString()
          : undefined;
      const item: Record<string, unknown> = {
        '@type': 'ListItem',
        position: i + 1,
        name: c.label ?? c.id ?? '',
      };
      if (href) item.item = href;
      return item;
    });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

/**
 * Normalize a frontmatter `last_updated` (string | Date | number) to ISO 8601.
 */
export function toIsoDate(
  value: string | Date | number | undefined | null,
): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const d =
    value instanceof Date
      ? value
      : new Date(typeof value === 'number' ? value : String(value));
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}
