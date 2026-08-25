---
kind: lesson
id: L.12.005.08
title: "Are Algorithms Fair?"
grade: 12
unit: U.12.005
sequence_in_unit: 8
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S2
objectives:
  - D05.S2.12.02
essential_question: How do I analyze an algorithm not only for whether it works, but for whether it works fairly?
key_vocabulary:
  - algorithmic bias
  - input bias
  - fairness
  - disparate impact
  - feedback loop
  - proxy
materials:
  - name: Fairness-analysis sheet
    quantity: "1 per learner"
    notes: A decision algorithm (who gets a scarce resource) to trace on two different inputs and compare
  - name: Math journal
    quantity: "1 per learner"
materials_low_tech:
  - name: Slips of paper as "applicants" with differing attributes
    notes: Run the same decision rule by hand on each slip and watch who the rule favors
  - name: Two different lists (one skewed, one not)
    notes: Feed the same rule two inputs and compare the outputs side by side
materials_enriched:
  - name: A documented case study of an algorithm with disputed fairness
    quantity: "1 per pair"
    notes: A real screening, ranking, or allocation algorithm to read and critique
context_variants:
  - context: large-group
    note: Run one rule on several slips whole-class, then pairs design a fairer rule and defend it
  - context: multi-age
    note: Younger learners notice "the rule picks more of one kind"; older learners trace the mechanism and propose a fix
  - context: self-directed
    note: A learner traces a rule on two inputs, names the bias, and writes a fairer version with reasons
  - context: level-grouped
    note: A ready group also distinguishes input bias, a biased rule, and a biased proxy, and debates which is operating
  - context: outdoor-only
    note: Stand in two lines representing two groups and physically run a selection rule, then notice who is left out
assets:
  - path: assets/images/L.12.005.08-are-algorithms-fair.svg
    alt: "An algorithm pipeline with input going into a rule that produces an output, annotated: biased input, then a rule that copies the bias, then an output skewed toward one group, with a fairness check added that asks who is left out. Labels carry the meaning, so it prints in grayscale."
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners analyze a decision algorithm not only for correctness but for fairness: they
  trace the same rule on two different inputs, see how a biased input or a biased rule
  produces a skewed output, and distinguish input bias from a biased rule from a biased
  proxy. They connect this to the recommendation and ranking systems that shape what
  people see and get, and to the principle that a fair procedure must be checkable by
  those it affects.
cross_cutting_lenses:
  - ethics
  - egalitarianism
  - global
  - technology
  - environment
  - critical-thinking
assessment_type:
  - formative
  - self
  - peer
  - portfolio
status: draft
author: lesson-author
last_updated: 2026-08-25
---

# Lesson 8 — Are Algorithms Fair?

## Summary

Learners analyze a decision algorithm not only for **correctness** but for **fairness**:
they trace the same rule on two different inputs, see how a biased input or a biased rule
produces a skewed output, and distinguish **input bias** from a **biased rule** from a
**biased proxy**. They connect this to the recommendation and ranking systems that shape
what people see and get, and to the principle that a fair procedure must be checkable by
those it affects.

## Objectives

- Describe an algorithm for a real problem and analyze whether it works correctly *and*
  fairly. _(D05.S2.12.02)_

## Connection

An algorithm can be perfectly correct — it always stops, and it follows its rule exactly —
and still be unfair. If a loan or admission or hiring screen is trained on past decisions
that favored one group, a "correct" algorithm will copy that pattern; if a feed ranks by
what keeps you clicking, it may hide what challenges you. Correctness is about the rule
doing what it says; fairness is about *who* it helps and leaves out. Both are checkable,
but only if we look.

## Materials

- Fairness-analysis sheet
- Math journal
- Low-tech: slips of paper as "applicants"

## Preparation

- Prepare a decision rule (e.g., "admit the top 3 by past score") and two inputs: one
  where past scores are balanced across groups, one where they are skewed.
- Retrieval: from Lesson 7, an algorithm's correctness. Today we add a second question:
  fairness.
- Prepare the worked example (trace one rule on two inputs) to model first (S-011).

## Facilitator note

This lesson is written to the learner ("you"). The idea to land: **an algorithm can be
correct yet unfair; bias can enter through the input, through the rule itself, or through a
proxy that stands in for a protected attribute — and we can see all three by tracing the
same rule on different inputs.** Teach the trace explicitly (S-011), then let learners
argue about fairness — that argument *is* the learning, so hold it open rather than closing
it with one verdict. Keep the descriptive question (does the output differ by group?) apart
from the value question (is that difference acceptable?), per philosophy §5.

The **ethics** lens: a rule that is correct but harmful still carries moral weight; naming
that is the whole point of the lesson. The **egalitarianism** lens: fairness is judged by
who is left out — a rule is not fair just because its author intended it to be; check the
outputs, not the intentions. The **global** lens: the same mechanism appears everywhere
algorithms gate scarce things — credit, housing, jobs, migration, school places — across
many legal and cultural contexts, none of which is the default. The **technology** lens:
recommendation and ranking systems shape what we see and get; personalization can wrap a
person in a "filter bubble" of what confirms their existing views (S-482, S-481). The
**environment** lens: allocation algorithms decide who gets water, land, or disaster
relief, so a biased rule can mean real ecological and bodily harm to one group (S-483).
The **critical-thinking** lens: distinguishing input bias, a biased rule, and a biased
proxy is careful analysis, not slogan. Preview: Lesson 9 turns to coordinates and vectors.

## Procedure

1. **Recall (5 min).** From Lesson 7, name the two properties of a correct algorithm. Today
   a third question: is it *fair*?
2. **Correct but unfair (8 min).** An admission rule: "rank everyone by past score and
   take the top 3." The rule is correct — it always stops and follows its own rule. But if
   past scores were themselves skewed (some groups had worse access to schooling), the
   "correct" rule copies the old unfairness forward. Correctness ≠ fairness.
3. **Worked example — trace on two inputs (15 min).** Take slips for 6 applicants in two
   groups; give the rule "top 3 by score." Trace it. Now make the input skewed — one
   group's scores sit higher because they had better preparation — and trace again. Compare
   the two outputs: the same rule picks more from the advantaged group. Name where the bias
   lives: the **input**, not the rule.
4. **Three places bias enters (8 min).** Bias can be (a) **input bias** — the data already
   skews; (b) a **biased rule** — the rule itself uses a group attribute directly; or
   (c) a **biased proxy** — the rule uses a "neutral" stand-in (like a postal code) that
   secretly tracks a group attribute. Sort each case into one of the three.
5. **Fix it (12 min).** With a partner, rewrite the rule to reduce the skew — e.g., reserve
   places, or use a measure that predicts future performance without the proxy. Test your
   new rule on both inputs and report what changed. Discuss — aloud or in writing, sign,
   gesture, or AAC: does your fix trade one unfairness for another? (There is no perfect
   answer — argue it honestly.)
6. **Connect to feeds (5 min).** A feed that ranks by "what keeps you clicking" is a
   correct algorithm whose output can narrow what you see into a **filter bubble** (S-482).
   Write one sentence on what that means for *you* as the input to the algorithm.
7. **Close (2 min).** Say — or write, sign, gesture, or use AAC to express — why checking
   *outputs*, not just *intentions*, is how we judge fairness.

## Differentiation

- **Support:** Sort the slips by the rule and count "how many from each group" without the
  vocabulary; then attach the three labels to what you saw.
- **Extension:** Find and analyze a documented real-world algorithm (screening, ranking, or
  allocation), name where the bias enters, and defend a fairer design in writing.
- **Number access (dyscalculia):** Provide a pre-printed two-input trace organizer for step 3
  — one column per group with tally boxes for "who the rule picked" — so the learner tallies
  slips rather than comparing scores; offload the counting ("how many from each group") to a
  partner; and take the verbal route — run the rule by hand on the slips and name in words
  which group the rule favors and who is left out, reaching the bias conclusion without
  numeric comparison.
- **Communication access:** Every spoken step — saying, naming, reading aloud, discussing,
  or closing — can be done in writing, sign, gesture, or AAC instead. Learners who are
  non-speaking, d/Deaf, hard-of-hearing, or who use AAC complete every task in their
  preferred mode; no step requires producing or hearing sound.

## Assessment

- **Formative (peer + self):** Can the learner trace one rule on two inputs, name where the
  bias enters (input, rule, or proxy) — in speech, writing, sign, or AAC — and propose and
  test a fairer rule?
- **Portfolio artifact (unit):** The two-input trace with the bias named and a fairer rule
  argued, in the math journal.

## Home connection

Notice one algorithm you met today — a search result, a recommended video, a "best price."
Write one sentence on what it seems to rank by and one on who might be left out.

## Resources

- On worked examples and guided practice: Kirschner, Sweller & Clark (2006) (S-011).
- On recommendation systems, engagement-ranking, and the filter bubble: Britannica —
  Social media (S-481); Pariser, *The Filter Bubble* (S-482).
- On environmental-justice framing for who bears the harms of biased allocation: U.S. EPA
  — Environmental Justice (S-483).
