# Messaging

How the project speaks to the world. This document is the "identifiable ideology"
written down — not a brand book, but the shared words and voice that every public
surface (website, grant pitch, talks, domain launch) should use. It is a translation
of [`vision.md`](vision.md) and [`philosophy.md`](philosophy.md) into public
language, refracted into the registers defined in [`audiences.md`](audiences.md).

The rule: **one stance, three vocabularies.** The message never changes; only the
words do. We are not three different projects to three different people.

## The one-sentence stance

> A free, complete, K–12 curriculum that develops the whole human — emotional,
> physical, intellectual, and ecological — to raise the baseline standard of living
> for all life on Earth.

This is the sentence every surface leads with or lands on. Everything else is an
unpacking of it.

## The ideology, in plain language

**What we believe, stated for a curious adult:**

1. **A child is a whole person, not a set of subjects.** Emotion, body, mind, and
   context grow together — so we teach them together.
2. **Everyone deserves this, not just the few.** The curriculum is built to lift
   the many, and it is free, forever, on purpose.
3. **The world is bigger than one nation's story.** History, culture, and knowledge
   are taught from a global, cross-cultural view.
4. **How we treat each other is part of the curriculum.** Ethics and empathy are
   woven through every subject, not bolted on.
5. **Technology should be understood, not worshiped or feared.** Learners are taught
   to see what technology does to people and the planet, and to judge it.
6. **We teach how to think, not what to think.** Big questions stay open; evidence
   is separated from belief.

These six are the ideology. They are already fully present in the source documents;
the messaging work is to say them this plainly, not to invent new values.

## The four pillars, for a non-writer

The curriculum is organized under four dimensions of a whole person. Present them as
questions, not labels — questions are warm and invite people in.

| Internal | Public framing | The question it answers |
|----------|----------------|-------------------------|
| P1 Emotional & Social | "Who am I?" | Who am I, and how do I live well with others? |
| P2 Physical & Somatic | "My body" | How do I understand and care for my body? |
| P3 Intellectual & Cognitive | "How I think" | How do I think, reason, and know? |
| P4 Contextual & Ecological | "The world I live in" | What world do I live in, and what do I owe it? |

Never lead with the IDs. Lead with the questions.

## The three registers

The same six beliefs, refracted:

**Curious / general public** — warmth and conviction. Short words, concrete examples,
no system language. Lead with the stance, the six beliefs, and "here, open a lesson."

**Teacher** — practicality and respect. Lead with *doing*: "Grade 4 → next lesson →
print." The ideology shows up implicitly in what the lesson asks of a child, not in
prose. Speak to their time and their craft; treat them as partners, not operators of
a script.

**Leader / funder** — evidence and trust. Lead with outcomes, the evidence base, and
how quality is guaranteed. The ideology is expressed as commitments with a track
record (see [`grant-pitch.md`](grant-pitch.md)), not as adjectives.

## Voice and tone rules

- **Calm, not missionary.** We are confident in the idea; we do not need to shout it.
- **Plain, not academic.** If a sentence needs an ID or a word from the taxonomy to
  make sense, rewrite it. (Contributor-facing surfaces are exempt.)
- **Concrete, not abstract.** Every claim is backed by an example a reader can open
  and judge for themselves.
- **Honest about limits.** Where the work is incomplete, say so. Trust is earned by
  not overstating.
- **Global, not Western-default.** "We" means all people, not one nation.

### Do not say

- "Strand," "domain," "traceability chain," "frontmatter," "agent loop" — outside
  contributor surfaces.
- Any claim that a given ideology, religion, or political program is *the* answer —
  we teach how to think, not what to think.
- Overstatements about scale, adoption, or outcomes that are not yet true.

## Public name

**Decision (2026-08-25): the public-facing name is "Whole Earth Curriculum" (`WEC`).**

The original name "New World Order" was retired for public use because the phrase
carries well-known fringe and conspiratorial baggage that directly contradicted the
curriculum's egalitarian, humanitarian message — especially for the two audiences
that matter most for growth (mainstream parents and policymakers).

- **Public name:** Whole Earth Curriculum (`WEC`). "Whole" = the holistic pillar;
  "Earth" = the ecological/global pillar; "Curriculum" = neutral, self-describing.
- **Internal name:** the repo, package, tooling, and agent loop keep `NWO-EDU`
  identifiers (code keys, integration names, `localStorage` keys) — they are not
  user-facing.
- The one-sentence stance (top of this document) is the tagline.

This is a single string in `www/src/i18n/en.ts` (`site.name` / `site.short`) and is
trivially reversible.
