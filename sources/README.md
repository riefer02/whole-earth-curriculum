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

## Finding one, instead of inventing one

The registry is searched, not browsed:

```bash
npm run sources:find -- retrieval
npm run sources:find -- "hand hygiene" --limit 5
```

It prints the ID, year, title, URL and domains of every match, and exits non-zero when
nothing matches. That non-zero exit is the useful part: "no registered source supports
this claim" is a finding, not a reason to cite something adjacent. Either cut the claim,
or leave it uncited and say so in the pull request.

## Adding a source

1. Confirm the source exists and says what you need it to say. Open the URL; do not
   work from memory or from a citation you saw elsewhere.
2. Add it to `sources/sources.yaml` with the next free `S-NNN`, the fields below, and
   `reviewed: true` only if you actually verified it.
3. In `notes`, record **what the source supports**, **which lesson uses it for what**,
   and **when you checked it** (e.g. "Verified live 2026-11-25: the entry states …").
   That note is what lets the next person audit the citation instead of trusting it.
4. Wire it into the lesson twice: inline as `(S-NNN)` at the sentence it supports, and
   in that lesson's `## Resources` as
   `- On <what>: Author — Title (S-NNN).`
5. `npm run sources:index && npm run lint:sources`.

A citation that does not support the sentence it sits on is worse than no citation: a
reviewer checks one, finds it misapplied, and the whole registry loses credibility.

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
