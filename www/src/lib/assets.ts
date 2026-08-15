import type { AstroIntegration } from 'astro';
import { cp, rm, access } from 'node:fs/promises';
import path from 'node:path';

// Copies the repo's scholastic assets (../../assets) into public/assets so
// lesson-declared `assets[].path` values resolve in both dev and static build.
// The source of truth remains `assets/` at the repo root — nothing is forked.
export function copyAssets(): AstroIntegration {
  return {
    name: 'nwo-edu-assets',
    hooks: {
      'astro:config:setup': async ({ logger }) => {
        const src = path.resolve(process.cwd(), '..', 'assets');
        const dest = path.resolve(process.cwd(), 'public', 'assets');
        try {
          await access(src);
        } catch {
          logger.warn(`[nwo-edu-assets] asset source not found at ${src}`);
          return;
        }
        await rm(dest, { recursive: true, force: true });
        await cp(src, dest, { recursive: true });
      },
    },
  };
}
