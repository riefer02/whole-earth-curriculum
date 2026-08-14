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
