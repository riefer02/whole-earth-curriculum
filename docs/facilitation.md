# Facilitation

How to teach this curriculum — in a classroom, a community circle, or alone. Written
for the human holding the space, whether a credentialed teacher, a parent, or a
self-directed learner.

## The stance: inquiry, not creed

You are not delivering answers to be accepted; you are inviting wonder and thinking.
The curriculum's deepest commitment ([`philosophy.md`](philosophy.md) §11) is that big
questions — origins, meaning, right and wrong — are held as questions. Your job is to
keep them open, not to close them.

- Say "scientists tell this story because…", not "this is the truth."
- Honor other peoples' stories alongside scientific accounts; do not rank them.
- When a learner asks what you cannot answer, say "I wonder too. Let's find out
  together."

## Voice: speak and write to the learner

Lessons are written **to the learner** ("you"). Read the `## Procedure` aloud for
younger learners; older and self-directed learners read it themselves. Your guidance
as facilitator lives in each lesson's `## Facilitator note`.

## Anchor to the learner's life

Before you teach the abstraction, give the learner a concrete, recognizable example
from their own world — a kitchen, a field, a market, a game, a relationship. Each
lesson's `## Connection` does this; let it guide where you begin. Keep the example
faithful to the real concept, and adapt it to the life in front of you.

## Holding difficult topics safely

The curriculum does not avoid the hard parts of the world; it introduces them at a
depth the age can hold ([`development.md`](development.md)). When a heavy topic arises:

- Stay calm and honest; name feelings before facts ("this is a big, sad thing").
- Offer age-appropriate scaffolding; never dump adult despair onto a child.
- Always connect difficulty to agency and hope — something the learner can do.
- Respect a learner's right to pause or step away.

## Writing a facilitator note

The `## Facilitator note` is what a teacher reads *while* the room is moving. It has
to be answerable in about twenty seconds. **Budget: 250 words.** Past that it stops
being a note and becomes an essay nobody rereads.

Shape it the same way every time, so a returning teacher knows where to look:

1. **Tone** — one or two lines. Only what would actually change how you speak.
2. **The facts to land** — a numbered list of three or four. This is the spine.
3. **Don't overshoot** — the exaggeration that would cost the lesson its credibility.
4. **The lenses, briefly** — one line each. If a lens needs a paragraph, that
   paragraph belongs in `docs/`, with a pointer here.
5. **The skill** — the decision or procedure the learner is practicing.
6. **Access** — only where a learner's access changes what you do (blindness, deafness,
   motor difference, no shared language). Never fold this into a lens bullet; it is
   practical instruction, and it is usually the only place in the lesson that has it.
7. **Emotional safety** — only for material that can land on a learner personally.
8. **Safety floor** — the sentence a facilitator must not miss.

Use those labels, in that order, and nothing else: `npm run audit` and the reviewers
look for them, and a teacher scanning four lessons in a row should find "the facts to
land" in the same place every time. If a note has something real that fits none of
these, the closest label wins — do not invent a ninth.

Lens bullets take one form, using the exact lens names from `cross_cutting_lenses`:

```markdown
- *Ethics:* a safe choice protects our own body and the people near us.
- *Global:* cultures hold alcohol from total avoidance to everyday moderation.
```

Italic label, colon, one sentence. Not bold, not a dash, not "Critical thinking" where
the schema says `critical-thinking`.

Rules:

- **Do not restate repo-wide canon.** Learner-first voice, mastery-not-ranking,
  accessibility-by-default, "hold big questions as questions" — all already stated in
  this document and `docs/philosophy.md`. Repeating them on 1,600 pages is noise.
- **One idea per sentence.** A 90-word sentence with four semicolons is not thorough,
  it is unreadable.
- **Never moralize in the note.** The note tells a teacher how to hold the room; it
  does not scold the room.

`npm run audit` enforces the mechanical half: length, unbroken paragraphs, runaway
sentences, and boilerplate openers.

## Assessing without ranking

Assessment serves the learner ([`philosophy.md`](philosophy.md) §8). Observe what a
learner can *do*, not how they rank. Prefer portfolios, performances, and growth over
scores. Celebrate mastery; never turn learning into competition.

## Low-tech and low-resource

Every lesson has a `materials_low_tech` path. If you have only paper, voices, bodies,
and the outdoors, you have enough. Adapt first; enrich when you can.

## Facilitating self-directed learners

A learner working alone reads the procedure as "you," does the activity, and uses the
assessment and self-assessment to check understanding. Encourage them to write or
talk through their thinking — the act of explaining *is* the learning.

## When to instruct, when to inquire

Use explicit instruction, worked examples, and guided practice for foundational
skills (reading, arithmetic, novice knowledge). Use inquiry, story, and wonder for
concepts, meaning, and motivation. Neither is a dogma. For class size, multi-grade,
and no-facilitator contexts, see [`docs/contexts.md`](contexts.md).
