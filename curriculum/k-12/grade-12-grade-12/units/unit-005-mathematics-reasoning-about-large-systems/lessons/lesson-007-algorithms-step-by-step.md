---
kind: lesson
id: L.12.005.07
title: "Algorithms: Step-by-Step Procedures"
grade: 12
unit: U.12.005
sequence_in_unit: 7
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S2
objectives:
  - D05.S2.12.02
essential_question: How do I describe an algorithm precisely and analyze whether it works correctly?
key_vocabulary:
  - algorithm
  - step
  - input
  - output
  - termination
  - correctness
  - trace
materials:
  - name: Algorithm sheet
    quantity: "1 per learner"
    notes: Two procedures to describe precisely, trace by hand, and test for correctness
  - name: Math journal
    quantity: "1 per learner"
materials_low_tech:
  - name: Cards, stones, or slips to sort
    notes: Physically sort a small pile step by step to *be* the algorithm before writing it
  - name: A recipe or instruction list
    notes: Any everyday procedure, read for what happens if a step is missing or out of order
materials_enriched:
  - name: A simple programming environment or spreadsheet
    quantity: "1 per pair"
    notes: Encode the algorithm as a few lines so the machine runs the exact steps you wrote
context_variants:
  - context: large-group
    note: Build one algorithm whole-class on the board, then pairs design and trace their own
  - context: multi-age
    note: Younger learners sort objects by one rule; older learners write the steps and argue about termination and correctness
  - context: self-directed
    note: A learner writes the steps, traces them by hand, and tests them on a tricky input
  - context: level-grouped
    note: A ready group also finds a counterexample where a flawed algorithm fails, and patches it
  - context: outdoor-only
    note: Line up and act out a sorting or "who is tallest" procedure, testing whether it always finishes
assets:
  - path: assets/images/L.12.005.07-algorithms-step-by-step.svg
    alt: "A flowchart with input at the top, a sequence of steps, a decision box that loops back, and an output at the bottom, labeled to show that an algorithm has a start, ordered steps, a test, and a stop. Labels carry the meaning, so it prints in grayscale."
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners describe an algorithm as a precise step-by-step procedure for a real problem —
  sorting a pile, splitting a bill fairly, finding the largest value — and analyze it for
  the two things that make an algorithm *work*: it must always finish (termination) and
  produce the right result (correctness). They meet the very word's origin in the Persian
  scholar al-Khwarizmi and see the procedure as something anyone can write and check.
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

# Lesson 7 — Algorithms: Step-by-Step Procedures

## Summary

Learners describe an **algorithm** as a precise step-by-step procedure for a real problem —
sorting a pile, splitting a bill fairly, finding the largest value — and analyze it for the
two things that make an algorithm *work*: it must always **finish** (termination) and
produce the **right result** (correctness). They meet the very word's origin in the Persian
scholar al-Khwarizmi, and see the procedure as something anyone can write and check.

## Objectives

- Describe an algorithm as a step-by-step procedure for a real problem and analyze whether
  it works correctly. _(D05.S2.12.02)_

## Connection

A recipe, a bus route, a rule for sharing a harvest fairly, the steps of long division —
each is an algorithm: a precise list of steps that a person (or machine) can follow without
judgment, and that ends with a result. The power and the risk are the same: because an
algorithm runs *exactly* the steps you write, a missing step or a wrong order does real
damage — so learning to read and test one is a survival skill in a world run by them.

## Materials

- Algorithm sheet
- Math journal
- Low-tech: cards or stones to sort, a recipe or instruction list

## Preparation

- Prepare two procedures (a sort and a fair split) and a deliberately flawed one to debug.
- Retrieval: from Lesson 6, row reduction was itself an algorithm (ordered row operations).
  Today we study *procedures* themselves.
- Prepare the worked example (trace a sort by hand) to model first (S-011).

## Facilitator note

This lesson is written to the learner ("you"). The idea to land: **an algorithm is a
finite, ordered, unambiguous set of steps that turns an input into an output; we analyze it
for termination (it always stops) and correctness (it stops on the right answer).** Teach
tracing by hand as the skill — read each step, write the state, repeat — with a worked
example and guided practice (S-011). Debugging a flawed algorithm is the deepest learning;
let learners *find* the flaw rather than only receiving it.

The **ethics** lens: an algorithm that is *correct* is a promise kept — but correctness is
only one virtue, and a procedure can be correct yet cruel; naming that distinction prepares
Lesson 8. The **egalitarianism** lens: because an algorithm is written in steps anyone can
follow and check, it can be inspected and questioned by anyone — transparency is the
egalitarian heart of procedure. The **global** lens: the word *algorithm* comes from the
name of Muhammad ibn Musa al-Khwarizmi (c. 780–850, Baghdad), whose book on calculation by
completion and balancing also gave us the word *algebra* (S-431, S-293) — a reminder that
the idea of explicit procedure has deep, multi-rooted history. The **technology** lens:
algorithms *are* what runs — every recommendation, every search, every payment. The
**environment** lens: resource-sharing and allocation algorithms (who gets water, how a
harvest is divided) decide real environmental outcomes, so their correctness is a matter of
survival, not just arithmetic. Preview: Lesson 8 asks whether an algorithm is *fair*.

## Procedure

1. **Recall (5 min).** From Lesson 6, row reduction was a set of ordered steps. Name other
   procedures you follow without thinking: a recipe, a route, a game's rules.
2. **Define it (8 min).** An **algorithm** is a finite, ordered, unambiguous list of steps
   that takes an **input** and produces an **output**. It must **terminate** (always stop)
   and be **correct** (stop on the right answer).
3. **Worked example — sort by hand (15 min).** Trace this algorithm on the pile
   [3, 1, 2]: *repeat — find the smallest remaining card and move it to the front — until
   the pile is empty.* Show each pass: [1, 3, 2], then [1, 2, 3]. Check both properties: it
   always finishes (the pile shrinks each pass) and it is correct (each pass places the
   next smallest). This is *selection sort*.
4. **Test it (8 min).** Run the same algorithm on [2, 1] and on an empty pile. Does it
   still terminate? Is it correct? A good algorithm handles *edge cases* — the empty pile,
   the one-item pile.
5. **Find the flaw (12 min).** Debug a flawed fair-split algorithm: "give each person one
   item in turn, repeating until nothing is left, but never check who has had a turn."
   Trace it on 5 items and 2 people. Where does it break? Rewrite the step so it is
   unambiguous and always finishes. With a partner, swap fixes and test each other's.
6. **Write your own (10 min).** Choose a real problem (finding the tallest in a line,
   splitting a bill evenly, sharing water fairly) and write a precise algorithm. Trade with
   a partner and *trace* theirs by hand; report whether it terminates and is correct.
7. **Close (2 min).** Say — or write, sign, gesture, or use AAC to express — in one
   sentence each, what *termination* and *correctness* mean, and why a missing step matters.

## Differentiation

- **Support:** Sort a physical pile following a given set of steps, then describe the steps
  you used in one sentence each.
- **Extension:** Write the algorithm so it also counts how many steps it takes, and compare
  the count on a sorted vs a reversed pile (a first taste of efficiency).
- **Number access (dyscalculia):** Provide a pre-printed trace table for step 3 with a "pile"
  box and a "next smallest" box, so the learner records each pass ([3, 1, 2] → [1, 3, 2] →
  [1, 2, 3]) by copying rather than comparing numerals; offload the counting ("find the
  smallest remaining") to a partner; and take the physical route — sort real cards or stones
  by the rule and describe each pass aloud, checking termination and correctness in words
  without number work.
- **Communication access:** Every spoken step — saying, naming, reading aloud, discussing,
  or closing — can be done in writing, sign, gesture, or AAC instead. Learners who are
  non-speaking, d/Deaf, hard-of-hearing, or who use AAC complete every task in their
  preferred mode; no step requires producing or hearing sound.

## Assessment

- **Formative (peer + self):** Can the learner describe an algorithm precisely (in speech,
  writing, sign, or AAC), trace it by hand, and judge termination and correctness —
  including finding a flaw?
- **Portfolio artifact (unit):** One written algorithm with a hand trace and a correctness
  check, in the math journal.

## Home connection

Describe one procedure from home (cooking, packing, a game) as a numbered list, then test
it by having someone follow it *exactly*. Write one sentence on what they did that you
did not intend.

## Resources

- On worked examples and guided practice: Kirschner, Sweller & Clark (2006) (S-011).
- On the origin of the word *algorithm* and of *algebra* in al-Khwarizmi's work: Wikipedia
  — al-Khwarizmi (S-431); MacTutor — al-Khwarizmi (S-293).
