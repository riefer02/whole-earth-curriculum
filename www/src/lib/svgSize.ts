import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Lesson illustrations are square-ish SVGs, but not all of them: a few use
// taller canvases. Reading the real viewBox lets us put width/height on the
// <img> so the browser reserves the right space and the page does not shift
// while an image loads.
const cache = new Map<string, { width: number; height: number } | null>();

const FALLBACK = { width: 512, height: 512 };

/**
 * @param assetPath path as declared in lesson frontmatter, e.g. "images/L.00.001.01-x.svg"
 */
export async function svgSize(
  assetPath: string,
): Promise<{ width: number; height: number }> {
  const cached = cache.get(assetPath);
  if (cached !== undefined) return cached ?? FALLBACK;

  // Lesson frontmatter declares paths like "assets/images/foo.svg" (the URL
  // form), so resolve against the repo root first and fall back to the assets
  // directory for the bare "images/foo.svg" form.
  const repoRoot = path.resolve(process.cwd(), '..');
  const candidates = [
    path.resolve(repoRoot, assetPath),
    path.resolve(repoRoot, 'assets', assetPath),
  ];

  for (const file of candidates) {
    try {
      const head = (await readFile(file, 'utf8')).slice(0, 600);
      const m = head.match(
        /viewBox="\s*([-\d.]+)[\s,]+([-\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/,
      );
      if (m) {
        const width = Math.round(Number(m[3]));
        const height = Math.round(Number(m[4]));
        if (width > 0 && height > 0) {
          const size = { width, height };
          cache.set(assetPath, size);
          return size;
        }
      }
    } catch {
      // try the next candidate path
    }
  }

  cache.set(assetPath, null);
  return FALLBACK;
}
