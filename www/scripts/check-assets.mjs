// Warns when a lesson references an asset path that does not resolve to a real
// file. Runs before `astro build`. Warnings do not fail the build unless
// ASSET_CHECK_STRICT=1 (use in CI).
import { readFile, access, readdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), '..');
const K12 = path.join(ROOT, 'curriculum', 'k-12');
const STRICT = process.env.ASSET_CHECK_STRICT === '1';

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (e.name.endsWith('.md')) yield full;
  }
}

function frontmatterAssetPaths(content) {
  const lines = content.split(/\r?\n/);
  const paths = [];
  let inFM = false;
  for (const line of lines) {
    const t = line.trim();
    if (t === '---') {
      if (!inFM) {
        inFM = true;
        continue;
      }
      break;
    }
    if (inFM) {
      const m = t.match(/^[-*]?\s*path:\s*"?([^"\s]+)"?/);
      if (m) paths.push(m[1]);
    }
  }
  return paths;
}

const missing = [];
const checked = [];

for await (const file of walk(K12)) {
  if (!file.includes(`${path.sep}lessons${path.sep}`)) continue;
  const content = await readFile(file, 'utf8');
  for (const p of frontmatterAssetPaths(content)) {
    const abs = path.resolve(ROOT, p);
    checked.push({ file, path: p });
    try {
      await access(abs);
    } catch {
      missing.push({ file, path: p });
    }
  }
}

console.log(`[check-assets] ${checked.length} asset reference(s) across ${new Set(checked.map((c) => c.file)).size} lesson file(s).`);
if (missing.length) {
  for (const m of missing) {
    console.warn(`[check-assets] MISSING ${m.path}\n  in ${path.relative(ROOT, m.file)}`);
  }
  if (STRICT) {
    console.error(`[check-assets] ${missing.length} missing asset(s) (strict).`);
    process.exit(1);
  } else {
    console.warn(`[check-assets] ${missing.length} missing asset(s) (warn only).`);
  }
}
