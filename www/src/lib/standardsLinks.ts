// Sätteri HAST plugin: auto-link canonical standard/strand IDs in rendered markdown.
//
//   `D08.S1`       → /standards/d08/s1/
//   `D08.S1.10.01` → /standards/d08/s1/#D08.S1.10.01
//
// Guardrails:
//   - Skips text inside <code>/<pre> (code spans & blocks), <a> (no nested
//     links), and headings h1–h6 (leave the TOC slugs alone).
//   - Matches the longest form first, so a full standard never collapses to a
//     bare strand link.
//   - Links optimistically: a strand page exists for every well-formed strand
//     ID, and an unknown standard simply won't scroll to an anchor (no 404).

import type { HastNode, HastPluginDefinition, HastVisitorContext } from 'satteri';

const ID_RE = /\bD\d{2}\.S\d+(?:\.[A-Za-z0-9]+){0,2}\b/g;
const FULL_STANDARD_RE = /^D\d{2}\.S\d+\.[A-Za-z0-9]+\.[A-Za-z0-9]+$/i;
const SKIP_TAGS = new Set(['code', 'pre', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

function inSkipContext(ctx: HastVisitorContext, node: HastNode): boolean {
  let current: HastNode = node;
  for (;;) {
    const parent = ctx.parent(current);
    if (!parent) return false;
    if (parent.type === 'element' && SKIP_TAGS.has(parent.tagName)) return true;
    current = parent as HastNode;
  }
}

function makeLink(id: string): HastNode {
  const strandMatch = /^(D\d{2})\.(S\d+)/i.exec(id);
  const domain = (strandMatch?.[1] ?? '').toLowerCase();
  const strand = (strandMatch?.[2] ?? '').toLowerCase();
  const href = FULL_STANDARD_RE.test(id)
    ? `/standards/${domain}/${strand}/#${id.toUpperCase()}`
    : `/standards/${domain}/${strand}/`;
  return {
    type: 'element',
    tagName: 'a',
    properties: { href },
    children: [{ type: 'text', value: id }],
  };
}

function linkify(value: string): HastNode[] {
  const out: HastNode[] = [];
  let last = 0;
  for (const m of value.matchAll(ID_RE)) {
    const id = m[0];
    const index = m.index;
    if (index > last) {
      out.push({ type: 'text', value: value.slice(last, index) });
    }
    out.push(makeLink(id));
    last = index + id.length;
  }
  if (out.length === 0) return out;
  if (last < value.length) {
    out.push({ type: 'text', value: value.slice(last) });
  }
  return out;
}

export const standardsLinks: HastPluginDefinition = {
  name: 'wec-standards-links',
  text(node, ctx) {
    if (inSkipContext(ctx, node)) return;
    const out = linkify(node.value);
    if (out.length === 0) return;
    ctx.insertBefore(node, out);
    ctx.removeNode(node);
  },
};

export default standardsLinks;
