// Docs helpers. Reference docs have no frontmatter, so titles are derived from
// their first `# ` heading.

export function docTitle(markdown: string | undefined, fallback: string): string {
  if (!markdown) return fallback;
  const m = markdown.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

// First prose paragraph after the first heading — used as a meta description.
export function docDescription(markdown: string | undefined): string | undefined {
  if (!markdown) return undefined;
  const body = markdown.replace(/^---[\s\S]*?---\n?/, '');
  let seenHeading = false;
  for (const block of body.split(/\n\s*\n/)) {
    const t = block.trim();
    if (!t) continue;
    if (/^#+\s/.test(t)) {
      seenHeading = true;
      continue;
    }
    if (!seenHeading) continue;
    const line = t
      .split('\n')
      .map((l) => l.trim())
      .find((l) => l && !/^[#>|!]/.test(l));
    if (!line) continue;
    return line
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/\*\*/g, '')
      .replace(/`/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return undefined;
}

// Canonical references first (mirrors AGENTS.md §2), then public operational docs.
export const DOC_ORDER = [
  'vision',
  'philosophy',
  'taxonomy',
  'schema',
  'architecture',
  'roadmap',
  'development',
  'facilitation',
  'contexts',
  'assessment',
  'art-style',
  'glossary',
  'budget',
  'privacy',
];

// Docs kept in the repo but not rendered on the public site — internal
// working/planning documents, not user-facing reference material.
export const INTERNAL_DOCS = new Set(['audiences', 'messaging']);
