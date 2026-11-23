import type { CollectionEntry } from 'astro:content';

// Grouping helpers over the content collections. Kept here (rather than inline)
// so ordering rules live in one place.

export function lessonsByUnit(
  lessons: CollectionEntry<'lessons'>[],
): Map<string, CollectionEntry<'lessons'>[]> {
  const map = new Map<string, CollectionEntry<'lessons'>[]>();
  for (const l of lessons) {
    const unitId = l.data.unit;
    if (!unitId) continue;
    const list = map.get(unitId) ?? [];
    list.push(l);
    map.set(unitId, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) => {
      const sa = a.data.sequence_in_unit ?? Number.MAX_SAFE_INTEGER;
      const sb = b.data.sequence_in_unit ?? Number.MAX_SAFE_INTEGER;
      if (sa !== sb) return sa - sb;
      return (a.data.id ?? '').localeCompare(b.data.id ?? '');
    });
  }
  return map;
}

export function scopeByGrade(
  scopes: CollectionEntry<'scopes'>[],
): Map<number, CollectionEntry<'scopes'>> {
  const map = new Map<number, CollectionEntry<'scopes'>>();
  for (const s of scopes) {
    if (s.data.grade !== undefined) map.set(s.data.grade, s);
  }
  return map;
}

/**
 * First real paragraph of a markdown body. Unit files open with
 * `# Unit N — Title` then `## Overview`, so the page lede is derived from the
 * overview paragraph instead of requiring a `summary` field on every unit.
 */
export function firstParagraph(body: string | undefined): string | undefined {
  if (!body) return undefined;
  for (const block of body.replace(/\r\n/g, '\n').split(/\n\s*\n/)) {
    const text = block.trim();
    if (!text) continue;
    if (/^(#|>|\||---|```|[-*+]\s|\d+\.\s)/.test(text)) continue;
    if (text.length < 80) continue;
    const clean = text
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/\*\*|__/g, '')
      .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/g, '$1$2')
      .replace(/\s+/g, ' ')
      .trim();
    // A page lede is a lead-in, not the whole overview: keep two sentences.
    const [first, second] = clean.split(/(?<=[.!?])\s+/);
    return second ? `${first} ${second}` : first;
  }
  return undefined;
}
