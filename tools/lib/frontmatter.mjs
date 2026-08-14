import { parse } from 'yaml';

/**
 * Split a Markdown file into YAML frontmatter and body.
 * Returns { data, body, hasFrontmatter }. `data` is the parsed object.
 */
export function readFrontmatter(text) {
  const match = text.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/);
  if (!match) {
    return { data: null, body: text, hasFrontmatter: false };
  }
  let data;
  try {
    data = parse(match[1]) ?? {};
  } catch (err) {
    const wrapped = new Error(`YAML parse error: ${err.message}`);
    wrapped.cause = err;
    throw wrapped;
  }
  return { data, body: text.slice(match[0].length), hasFrontmatter: true };
}
