// Repo-relative doc links, made clickable on the site.
//
// The curriculum and the docs are written for two readers at once. In the
// repository, `[docs/philosophy.md](../../../../docs/philosophy.md)` is a link a
// contributor can follow in their editor; inside `docs/`, a sibling link is just
// `philosophy.md`. On the website both resolve against the current URL and 404 —
// about thirty dead links that only surface when a teacher clicks one.
//
// Two mechanisms, because the two pipelines differ:
//
//   1. `repoDocLinks` — a Sätteri HAST plugin. It rewrites lesson-body links during
//      markdown rendering, which is where most of them are.
//   2. `rewriteDocLinksAtBuild` — a post-build pass over `dist`, because the docs
//      pages render through the content collection and never reach the HAST
//      plugin. It is idempotent: anything already rewritten to `/docs/<page>/` is
//      left alone.
//
// Source stays repo-relative. Only the built site is rewritten.

import fs from 'node:fs';
import path from 'node:path';
import type { AstroIntegration } from 'astro';
import type { HastNode, HastPluginDefinition, HastVisitorContext } from 'satteri';

const DOC_PATH_RE = /^(?:\.{1,2}\/)*docs\/([a-z0-9-]+)\.md$/i;
const BARE_DOC_RE = /^([a-z0-9-]+)\.md$/i;

const docsDir = () =>
  [
    path.resolve(process.cwd(), '..', 'docs'),
    path.resolve(process.cwd(), 'docs'),
  ].find((dir) => fs.existsSync(dir));

const docSlugs = () => {
  const dir = docsDir();
  if (!dir) return new Set<string>();
  return new Set(
    fs
      .readdirSync(dir)
      .filter((name) => name.endsWith('.md'))
      .map((name) => name.replace(/\.md$/, '').toLowerCase()),
  );
};

export const repoDocLinks: HastPluginDefinition = {
  name: 'wec-repo-doc-links',
  element: {
    filter: ['a'],
    visit(node: Readonly<HastNode>, ctx: HastVisitorContext) {
      if (node.type !== 'element') return;
      const href = node.properties?.['href'];
      if (typeof href !== 'string' || href.includes('://')) return;

      const trimmed = href.trim();
      const pathMatch = DOC_PATH_RE.exec(trimmed);
      if (pathMatch) {
        ctx.setProperty(node, 'href', `/docs/${pathMatch[1].toLowerCase()}/`);
        return;
      }
      const bare = BARE_DOC_RE.exec(trimmed);
      if (bare && docSlugs().has(bare[1].toLowerCase())) {
        ctx.setProperty(node, 'href', `/docs/${bare[1].toLowerCase()}/`);
      }
    },
  },
};

// A doc that points at the source registry gets the site's Sources page: the
// registry itself is a YAML file, which a browser would just download raw.
const SOURCES_RE = /href="(?:\.{1,2}\/)*sources\/sources\.yaml"/gi;

const HREF_RE = /href="((?:\.{1,2}\/)*docs\/[a-z0-9-]+\.md|[a-z0-9-]+\.md)"/gi;

export function rewriteDocLinksAtBuild(): AstroIntegration {
  return {
    name: 'wec-rewrite-doc-links',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const slugs = docSlugs();
        if (!slugs.size) {
          logger.warn('[wec-rewrite-doc-links] no docs directory found; skipping');
          return;
        }
        const root = dir.pathname;
        let files = 0;
        let links = 0;

        const walk = (current: string): void => {
          for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
            const full = path.join(current, entry.name);
            if (entry.isDirectory()) {
              walk(full);
              continue;
            }
            if (!entry.name.endsWith('.html')) continue;
            const before = fs.readFileSync(full, 'utf8');
            let after = before.replace(SOURCES_RE, () => {
              links += 1;
              return 'href="/sources/"';
            });
            after = after.replace(HREF_RE, (whole, target: string) => {
              const match = DOC_PATH_RE.exec(target) ?? BARE_DOC_RE.exec(target);
              if (!match) return whole;
              const slug = match[1].toLowerCase();
              if (!DOC_PATH_RE.test(target) && !slugs.has(slug)) return whole;
              links += 1;
              return `href="/docs/${slug}/"`;
            });
            if (after !== before) {
              fs.writeFileSync(full, after);
              files += 1;
            }
          }
        };

        walk(root);
        logger.info(`[wec-rewrite-doc-links] ${links} link(s) in ${files} file(s)`);
      },
    },
  };
}

export default repoDocLinks;
