// Docs helpers. Reference docs have no frontmatter, so titles are derived from
// their first `# ` heading.

export function docTitle(markdown: string | undefined, fallback: string): string {
  if (!markdown) return fallback;
  const m = markdown.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

// Canonical order of the reference documents (mirrors AGENTS.md §2).
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
];

// Docs kept in the repo but not rendered on the public site — internal
// working/planning documents, not user-facing reference material.
export const INTERNAL_DOCS = new Set(['audiences', 'messaging']);
