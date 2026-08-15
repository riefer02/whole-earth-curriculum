import { ui } from '../i18n';

// Build `key:value` Pagefind filter values for content pages. Values are kept
// human-readable but sortable (grades are zero-padded so "Grade 02" < "Grade 10").

export function gradeValue(grade: number): string {
  // Zero-padded so filters sort numerically; Kindergarten gets the "00" slot
  // (matching the taxonomy's gg code) so it sorts first.
  if (grade === 0) return 'Grade 00 \u2014 Kindergarten';
  return `${ui.common.gradePrefix} ${String(grade).padStart(2, '0')}`;
}

export function pillarValue(id: string): string {
  return ui.pillarTitles[id] ?? id;
}
