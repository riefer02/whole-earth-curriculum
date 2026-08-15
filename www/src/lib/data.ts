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
