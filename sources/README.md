# Sources

The canonical registry of vetted references for the curriculum. Owned by the
`fact-checker` agent.

## Why

Agents authoring lessons must cite real, reputable sources — never invented URLs.
This registry is the single place those sources are declared, vetted, and reused, so
the curriculum stays honest (see [`docs/philosophy.md`](../docs/philosophy.md) §5).

## Conventions

- Every source cited by a lesson should be registered in `sources/sources.yaml`.
- `reviewed` is `true` only after the `fact-checker` has verified the source actually
  says what it is cited for.
- Prefer sources that are global, primary, and openly accessible where possible.
- Cite registered sources in lesson bodies and `## Resources` using their `S-NNN`
  IDs. The source linter treats missing or unreviewed references as errors.

## Evidence graph

[`usage.md`](usage.md) is a generated reverse index from each registered source to
the lessons that cite it. This extends curriculum traceability with evidence
lineage without changing the curriculum ID scheme:

```
Vision → Pillar → Domain → Strand → Objective → Unit → Lesson → Source
```

After changing lesson citations or the source registry, regenerate and check the
index:

```bash
npm run sources:index
npm run lint:sources
```

`lint:sources` fails when a lesson cites a missing or unreviewed source or when the
generated index is stale. It reports existing maintenance signals—such as duplicate
URLs, unused sources, and claim-area citations absent from `## Resources`—as
warnings for the fact-checker to resolve through backlog work.

## Fields

| Field | Meaning |
|-------|---------|
| `id` | `S-001` … |
| `title` | Source title |
| `type` | `book` \| `article` \| `website` \| `video` \| `report` \| `other` |
| `url` | Canonical link (optional for books) |
| `author` | Author or creator |
| `organization` | Publisher/institution |
| `year` | Publication year |
| `domains` | Which `Dxx` domains the source informs |
| `reviewed` | Has the fact-checker verified it? |
| `notes` | How the source is used / why it is trusted |
