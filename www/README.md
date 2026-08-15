# NWO-EDU Website (`www/`)

A static website for **New World Order Education**, rendered from the repository's
content source of truth (`curriculum/` and `docs/`). It reads content directly via
Astro content collections — nothing is copied or forked.

## Stack

- **Astro 7** (static output, zero client JS by default)
- Content collections with `glob()` loaders pointing at `../curriculum` and `../docs`
- Lenient Zod schemas that mirror `schema/*.json` (the root validator remains the
  sole gatekeeper for content correctness)
- Plain CSS implementing the `docs/art-style.md` palette

## Run locally

```bash
cd www
npm install
npm run dev          # http://localhost:4321
```

## Build

```bash
cd www
npm run build        # runs scripts/check-assets.mjs (prebuild) then astro build
npm run preview      # serve the static build
npm run check        # type-check (.astro types)
```

## Deployment

Static output; deploy to Vercel/Netlify (root path). Set `SITE_URL` to the
production origin, or configure `site` in `astro.config.mjs`.

```bash
SITE_URL=https://example.org npm run build
```

## Architecture notes

- **URLs are keyed by canonical IDs**, not slugs, so permalinks stay stable as
  content slugs change: `/curriculum/<gg>/<nnn>/<nn>/`, `/standards/<domain>/`,
  `/standards/<domain>/<strand>/`, `/docs/<slug>/`. All internal links flow through
  `src/lib/links.ts`.
- **Discovery:** the curriculum index lists every grade's units; lesson pages have
  prev/next navigation; each domain has a strand page with its K–12 objective
  ladder. Content pages tag themselves with Pagefind filter metadata
  (`type`/`grade`/`domain`/`pillar`/`strand`) via `BaseLayout`'s `pagefindFilters`
  prop (values built in `src/lib/filters.ts`), powering faceted search.
- **i18n-ready:** every user-facing string lives in `src/i18n/` (`en.ts`), and
  templates import `ui` from `src/i18n`. Adding a language means adding a locale
  file and switching the export in `src/i18n/index.ts` — curriculum *content*
  translation is a separate content-layer concern (see `docs/roadmap.md` Phase 4).
- **Assets:** the integration `src/lib/assets.ts` copies `../assets` into
  `public/assets` at build/dev so lesson `assets[].path` values resolve.
  `scripts/check-assets.mjs` warns (or fails with `ASSET_CHECK_STRICT=1`) when a
  referenced asset is missing.
- **Design system & theming:** all colors, type, spacing, and shape are CSS custom
  properties in `src/styles/tokens.css` (light in `:root`, dark via
  `:root[data-theme="dark"]`, print overrides in `@media print`). Tune the look
  there. A header toggle switches themes, honors `prefers-color-scheme`, and
  persists the choice in `localStorage` (anti-FOUC script in `BaseLayout.astro`).
- **Print:** lessons/units print cleanly via `@media print` styles (colors reset
  through token overrides), with a dedicated print button on lesson/unit pages.
- **UX & accessibility:** responsive hamburger nav (`<details>`-based, no JS),
  on-this-page table of contents on lesson and docs pages, prev/next lesson
  navigation, a full footer nav, grade quick-links on the home page, and a `/`
  keyboard shortcut that focuses search. Lighthouse: 100/100/100 on desktop and
  mobile.
- **Search:** full-site search via [Pagefind](https://pagefind.app) (`/search/`).
  The `postbuild` script runs `pagefind --site dist` to index the static build;
  the UI is the self-hosted Default UI, themed through the `--pagefind-ui-*`
  tokens in `tokens.css`. No third-party service — search runs entirely in the
  browser. A header search box deep-links to `/search/?q=…` (auto-triggered on the
  search page), and results can be filtered by type, grade, domain, pillar, and
  strand.
