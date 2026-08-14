# Taxonomy

The official scheme for naming and organizing curriculum content. This is the
backbone; do not invent new IDs. If a concept does not fit here, propose a change to
this document rather than working around it.

## The traceability chain

```
Vision → Pillar → Domain → Strand → Standard/Objective → Unit → Lesson
```

## Levels and their IDs

### Pillars — `P1`–`P4`

The four dimensions of a whole person (see [`vision.md`](vision.md)).

| ID | Pillar |
|----|--------|
| P1 | Emotional & Social Awareness |
| P2 | Physical & Somatic Awareness |
| P3 | Intellectual & Cognitive Awareness |
| P4 | Contextual & Ecological Awareness |

### Domains — `D01`–`D10`

Broad content areas, each anchored to a primary pillar (a domain may also serve
others).

| ID | Domain | Primary pillar |
|----|--------|----------------|
| D01 | Self & Identity | P1 |
| D02 | Relationships & Community | P1 |
| D03 | Body & Wellness | P2 |
| D04 | Language & Communication | P3 |
| D05 | Mathematics & Reasoning | P3 |
| D06 | Science & Inquiry | P3 |
| D07 | Creative & Aesthetic Expression | P3 |
| D08 | Humanity & Global History | P4 |
| D09 | Ethics, Justice & Civic Life | P4 |
| D10 | Technology, Media & Environment | P4 |

### Strands — `Dxx.Sn`

A strand is a persistent thread *within* a domain that runs vertically across grades
(the mechanism of the spiral). Each domain defines its own strands; strand lists are
declared in the domain file under `curriculum/standards/domains/`.

Example: `D01.S1` = Domain 1, Strand 1 ("Emotional Literacy").

### Standards / Objectives — `Dxx.Sn.<grade>.<n>`

A standard is a grade-level objective: one measurable thing a student should be able
to know or do at a specific grade.

- `<grade>` is `K` for Kindergarten, or `01`–`12` for Grades 1–12.
- `<n>` is a zero-padded sequence number within that strand and grade.

Example: `D01.S1.K.01` = Domain 1, Strand 1, Kindergarten, objective 1.

### Units — `U.gg.nnn`

A unit is a coherent, multi-lesson block (roughly 2–6 weeks).

- `gg` is the grade, zero-padded (`00` = Kindergarten, `01`–`12`).
- `nnn` is the unit number within the grade, zero-padded, ordered by sequence.

Example: `U.00.001` = Kindergarten, unit 1.

### Lessons — `L.gg.nnn.nn`

A lesson is one day of instruction (~45–60 minutes).

- `gg.nnn` is the owning unit.
- final `nn` is the lesson number within the unit, zero-padded.

Example: `L.00.001.01` = Kindergarten, unit 1, lesson 1.

## Directory conventions

- Domains live in `curriculum/standards/domains/<domain-id>-<slug>/domain.md`.
- Grade content lives in `curriculum/k-12/grade-<gg>-<slug>/`, with `scope.md`,
  `units/unit-<nnn>-<slug>/unit.md`, and `lessons/lesson-<nn>-<slug>.md`.

## Cross-cutting lenses

In addition to its pillar, every unit and lesson declares which cross-cutting lenses
it engages. Allowed values (see [`docs/philosophy.md`](philosophy.md) §4):

`ethics`, `egalitarianism`, `global`, `technology`, `environment`,
`social-emotional`, `physical`, `intellectual`, `community`, `professional`,
`critical-thinking`.

## Traceability guarantee

- A lesson MUST declare `objectives:` that resolve to real standard IDs.
- A standard lives in exactly one strand; a strand in exactly one domain.
- A domain anchors to a pillar. Thus every lesson traces to the vision.

The validator checks that lesson `objectives:` reference standards declared in the
`curriculum/standards/` tree.
