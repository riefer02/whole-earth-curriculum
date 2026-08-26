import assert from 'node:assert/strict';
import test from 'node:test';
import {
  analyzeEvidenceGraph,
  extractSourceIds,
  normalizeUrl,
  renderSourceUsageIndex,
  splitResourcesSection,
} from './evidence-graph.mjs';

test('extractSourceIds returns unique, sorted source IDs', () => {
  assert.deepEqual(extractSourceIds('S-010 then S-002 and S-010'), ['S-002', 'S-010']);
});

test('splitResourcesSection separates claims from resources', () => {
  const sections = splitResourcesSection('Claim (S-001).\n\n## Resources\n\n- Source (S-001).\n\n## Home connection\n');
  assert.equal(sections.exists, true);
  assert.match(sections.before, /Claim/);
  assert.match(sections.resources, /Source/);
  assert.doesNotMatch(sections.resources, /Home connection/);
});

test('normalizeUrl removes fragments and insignificant trailing slashes', () => {
  assert.equal(normalizeUrl('https://EXAMPLE.com/report/#part'), 'https://example.com/report');
});

test('analysis finds broken, unreviewed, and incomplete citation edges', () => {
  const sources = [
    { id: 'S-001', title: 'Reviewed', reviewed: true, domains: ['D06'] },
    { id: 'S-002', title: 'Pending', reviewed: false, domains: ['D06'] },
  ];
  const lessons = [
    {
      id: 'L.01.001.01',
      title: 'Example',
      relativePath: 'curriculum/example.md',
      body: 'Claims (S-001, S-002, S-999).\n\n## Resources\n\n- Reviewed (S-001).\n',
    },
  ];
  const analysis = analyzeEvidenceGraph({ sources, lessons });

  assert.deepEqual(analysis.missingReferences.map((item) => item.sourceId), ['S-999']);
  assert.deepEqual(analysis.unreviewedReferences.map((item) => item.sourceId), ['S-002']);
  assert.deepEqual(
    analysis.referencesMissingFromResources.map((item) => item.sourceId),
    ['S-002', 'S-999']
  );
  assert.equal(analysis.edgeCount, 3);
});

test('usage index contains a reverse mapping to a citing lesson', () => {
  const graph = {
    sources: [{ id: 'S-001', title: 'Reviewed', reviewed: true, domains: ['D06'] }],
    lessons: [
      {
        id: 'L.01.001.01',
        title: 'Example',
        relativePath: 'curriculum/example.md',
        body: 'Claim (S-001).\n\n## Resources\n\n- Source (S-001).\n',
      },
    ],
  };
  const rendered = renderSourceUsageIndex(graph, analyzeEvidenceGraph(graph));

  assert.match(rendered, /\[S-001\]\(#s-001\)/);
  assert.match(rendered, /Cited by 1 lesson:\n\n- `L\.01\.001\.01`/);
});
