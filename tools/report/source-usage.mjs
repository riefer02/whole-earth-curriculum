import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  analyzeEvidenceGraph,
  loadEvidenceGraph,
  renderSourceUsageIndex,
} from '../citation-lint/evidence-graph.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const OUTPUT = path.join(ROOT, 'sources', 'usage.md');

const graph = loadEvidenceGraph(ROOT);
const analysis = analyzeEvidenceGraph(graph);
fs.writeFileSync(OUTPUT, renderSourceUsageIndex(graph, analysis));

console.log(
  `Generated ${path.relative(ROOT, OUTPUT)} with ${graph.sources.length} sources and ` +
    `${analysis.edgeCount} source-to-lesson links.`
);
