// Active locale. To add a language: create `fr.ts` (etc.) mirroring the `UI`
// shape in `en.ts`, then switch the import here based on the active locale
// (e.g. via Astro's i18n routing or a build-time env var). Templates import
// `ui` from here and never hardcode user-facing strings.
import en from './en';

export type { UI } from './en';
export const ui = en;
