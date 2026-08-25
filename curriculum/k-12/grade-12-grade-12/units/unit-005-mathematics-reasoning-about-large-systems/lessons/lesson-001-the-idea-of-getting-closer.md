---
kind: lesson
id: L.12.005.01
title: "The Idea of Getting Closer"
grade: 12
unit: U.12.005
sequence_in_unit: 1
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S1
objectives:
  - D05.S1.12.01
essential_question: How does the idea of a limit — getting closer and closer to a value — describe change and approximation?
key_vocabulary:
  - limit
  - approach
  - tends to
  - continuity
  - infinite series
  - approximation
  - convergence
materials:
  - name: Limit-and-continuity diagram sheet
    quantity: "1 per learner"
    notes: A half-line diagram and a "does it jump?" continuity checker for sorting examples
  - name: Math journal
    quantity: "1 per learner"
    notes: The unit-long notebook for worked examples, reflections, and portfolio artifacts
materials_low_tech:
  - name: Paper strip or string
    notes: Fold or mark a strip into halves repeatedly to watch the distance shrink toward a wall or a line
  - name: A cup, water, and a target line
    notes: Pour toward a fill line and notice how you slow as you "approach" it — the everyday feel of a limit
materials_enriched:
  - name: Spreadsheet or graphing tool
    quantity: "1 per learner or pair"
    notes: Generate the partial sums 1/2, 3/4, 7/8, … and watch them level off toward 1
context_variants:
  - context: large-group
    note: Run the half-strip demonstration whole-class, then pairs sort "approaches a value" vs "jumps" examples
  - context: multi-age
    note: Younger learners fold paper halves; older learners compute partial sums and argue why they never overshoot 1
  - context: self-directed
    note: A learner follows the worked example, builds the table of partial sums, and writes the limit in their own words
  - context: level-grouped
    note: A ready group also states the informal definition of continuity (no gap, no jump) and tests a step function against it
  - context: outdoor-only
    note: Walk halfway to a tree, then halfway again, then again — and name what you are "approaching"
assets:
  - path: assets/images/L.12.005.01-the-idea-of-getting-closer.svg
    alt: "A number line from 0 to 1 showing the partial sums 1/2, 3/4, 7/8, and 15/16 stepping closer and closer to 1, with the label 'approaches 1, never overshoots.' Labels carry the meaning, so it prints in grayscale."
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners meet the limit informally: a quantity that gets closer and closer to a value
  without needing to reach it, and continuity as "no gap, no jump." They work the
  half-step sum 1/2 + 1/4 + 1/8 + …, watch it approach 1, and connect the idea to
  everyday settling — a cooling drink, a filling cup, a population nearing its ceiling —
  and to the early limit ideas of more than one mathematical tradition.
cross_cutting_lenses:
  - ethics
  - egalitarianism
  - global
  - technology
  - environment
assessment_type:
  - formative
  - self
  - peer
  - portfolio
status: draft
author: lesson-author
last_updated: 2026-08-25
---

# Lesson 1 — The Idea of Getting Closer

## Summary

Learners meet the **limit** informally: a quantity that gets **closer and closer** to a
value without needing to arrive, and **continuity** as "no gap, no jump." They work the
half-step sum 1/2 + 1/4 + 1/8 + …, watch it approach 1, and connect the idea to everyday
settling — a cooling drink, a filling cup, a population nearing its ceiling — and to
early limit ideas from more than one mathematical tradition.

## Objectives

- Apply the idea of a limit and of continuity informally to describe change,
  approximation, and the behavior of quantities. _(D05.S1.12.01)_

## Connection

You already do limits without naming them. You pour toward a fill line and slow down as
you get close; you wait for a hot drink to cool to room temperature; you walk halfway to a
door, then halfway again, and you never quite reach it in a finite number of steps — but
you get as close as you like. "Getting as close as you like" is the whole idea, and it is
one every person, in every place, can describe.

## Materials

- Limit-and-continuity diagram sheet
- Math journal
- Low-tech: paper strip, cup and water

## Preparation

- Copy or draw the half-line diagram; prepare a paper strip for the folding demo.
- Retrieval: from Grade 11 (D05.S1.11.01), sequences that get larger or smaller; from
  Unit 2 (D05.S2.11.01), reading the slope of a graph. Today we ask *what a sequence is
  heading toward*.
- Prepare the worked example (partial sums of halves) to model first (S-011).

## Facilitator note

This lesson is written to the learner ("you"). The idea to land: **a limit describes
where a quantity is heading as it gets arbitrarily close to a value — it does not require
arrival; continuity means no gap and no jump.** Teach the worked example explicitly, then
let learners describe limits in their own words (S-011). Hold the concept as description,
not mystery: the limit of 1/2 + 1/4 + 1/8 + … is 1, a claim anyone can check.

The **ethics** lens: "approaching a goal without arriving" is honest about what a limit is
and is not — we never claim the sum *equals* 1 by fiat; we show what it approaches. The
**egalitarianism** lens: a limit is checkable by anyone with a strip of paper — it needs no
special instrument or status. The **global** lens: the "approaches but never quite reaches"
puzzle appears in many traditions — the Greek Zeno's dichotomy paradox, and the infinite
series for π and trigonometric quantities developed by the Kerala school in southern
India (Madhava of Sangamagrama, 14th–15th c.), centuries before European calculus
(S-272, S-240). The **technology** lens: every calculator and computer *approximates* —
it stops after finitely many steps, which is exactly the limit idea made practical. The
**environment** lens: a population growing toward its carrying capacity is a living limit —
it approaches a ceiling rather than growing forever (S-436). Preview: Lesson 2 turns
limits into rates of change.

## Procedure

1. **Recall (5 min).** From Grade 11: a sequence is a list of numbers with a pattern. Say —
   or write, sign, gesture, or use AAC to show — where the sequence 1/2, 1/4, 1/8, 1/16, … is
   *heading* — not where it stops.
2. **Walk halfway (8 min).** Stand an arm's length from a wall. Step halfway there, then
   halfway of what remains, then again. Name what you are doing: you get **closer and
   closer** to the wall, as close as you like, without a "final" step. That is a
   **limit**.
3. **Worked example — the half-step sum (12 min).** Add the steps you just walked:
   1/2, then 1/2 + 1/4 = 3/4, then 3/4 + 1/8 = 7/8, then 15/16, 31/32, …. Write the
   table. The sums get **closer and closer to 1** and never overshoot. We write: the
   limit is 1. You do not need the "last" term; closeness is the point.
4. **Name the terms (8 min).** The sum **tends to** 1; it **converges** to 1. A quantity
   that does this has a **limit**. A graph is **continuous** if it has **no gap and no
   jump** — you could draw it without lifting the pencil. A staircase is *not*
   continuous; a smooth cooling curve is.
5. **Sort examples (12 min).** With a partner, sort each as "approaches a limit" or
   "jumps": a cooling drink; a filling cup; a staircase step; the partial sums above; a
   population slowing as food runs short. For each, say *what* it approaches or *where*
   it jumps — aloud or in writing, sign, gesture, or AAC.
6. **Guided practice (8 min).** In your journal, write the limit of
   0.9, 0.99, 0.999, … in words and one sentence on why "as close as I like" matters
   more than "the last one." Self-check against the worked example.
7. **Close (2 min).** Say — or write, sign, gesture, or use AAC to express — what it means
   for a quantity to approach a value without arriving.

## Differentiation

- **Support:** Fold the paper strip into halves and halves again, and read the fractions
  off the folds before writing any symbols.
- **Extension:** State why 0.999… (the pattern above) and 1 have no number between them,
  and test a step function at its jump point against the "no gap, no jump" rule.
- **Number access (dyscalculia):** Keep the step-3 half-step-sum worked example visible as
  a card to copy, with the partial sums 1/2, 3/4, 7/8, 15/16 already written; provide the
  table pre-printed so the learner only fills the next partial sum; and offload the fraction
  addition to a partner or calculator — or take the verbal route, folding the paper strip in
  halves and saying in words or gesture that "each fold removes half of what remains, so I
  get closer and closer to 1," without writing any numeral.
- **Communication access:** Every spoken step — saying, naming, reading aloud, discussing,
  or closing — can be done in writing, sign, gesture, or AAC instead. Learners who are
  non-speaking, d/Deaf, hard-of-hearing, or who use AAC complete every task in their
  preferred mode; no step requires producing or hearing sound.

## Assessment

- **Formative (peer + self):** Can the learner explain (in speech, writing, sign, or AAC)
  "closer and closer," build the half-step sum table, and sort "approaches" vs "jumps" with
  a reason?
- **Portfolio artifact (unit):** The half-step sum table with a written sentence naming
  the limit and what "closer and closer" means, opened in the math journal.

## Home connection

Ask someone at home to walk halfway to a door, then halfway again, and describe what is
happening. Write one sentence about their description and one about whether you agreed on
"as close as you like."

## Resources

- On worked examples and guided practice for a new concept: Kirschner, Sweller & Clark
  (2006) (S-011).
- On the Kerala school and non-European roots of the infinite-series/limit idea: Joseph,
  *The Crest of the Peacock* (S-272); MacTutor History of Mathematics (S-240).
- On populations approaching a carrying capacity (the logistic/S-shaped curve): Britannica
  — Carrying capacity (S-436).
