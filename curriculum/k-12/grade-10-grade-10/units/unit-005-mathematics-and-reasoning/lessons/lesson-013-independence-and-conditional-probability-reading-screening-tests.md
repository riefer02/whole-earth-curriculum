---
kind: lesson
id: L.10.005.13
title: "Independence and Conditional Probability: Reading Screening Tests"
grade: 10
unit: U.10.005
sequence_in_unit: 13
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S4
objectives:
  - D05.S4.10.01
essential_question: How does new information change a probability, and why can a "positive" screening test still mean a person is probably fine?
key_vocabulary:
  - conditional probability
  - independence
  - sensitivity
  - specificity
  - false positive
  - false negative
  - base rate
  - prevalence
materials:
  - name: Screening-test worksheet
    quantity: "1 per learner"
    notes: A worked two-by-two table for a rare disease with sensitivity and specificity, plus practice scenarios
  - name: Math journal
    quantity: "1 per learner"
materials_low_tech:
  - name: Colored counters for "ill" and "well"
    notes: Sort counters into a two-by-two table by hand to see true and false positives and negatives
  - name: A two-by-two table drawn in the ground
    notes: Fill cells with found objects to act out a screening test on a pretend population
materials_enriched:
  - name: Spreadsheet
    quantity: "1 per learner or pair"
    notes: To compute P(disease | positive) for several prevalence levels and see how the answer changes
context_variants:
  - context: large-group
    note: Work the rare-disease example whole-class on a big table, then learners recompute with a different prevalence in pairs
  - context: multi-age
    note: Younger learners sort counters into the table and read the fractions; older learners compute P(A|B), test independence, and explain the base-rate effect
  - context: self-directed
    note: A learner follows the worked table, then recomputes for a different disease and writes the "why the positive test can mislead" explanation
  - context: level-grouped
    note: Group by comfort with fractions and ratios; a ready group extends to comparing two tests or to a decision about retesting
  - context: outdoor-only
    note: Act out a screening test on a group of learners (or found objects) outdoors, filling a ground-drawn table and reading the fractions
assets:
  - path: assets/images/L.10.005.13-screening-tests.svg
    alt: A two-by-two contingency table for a screening test on a rare disease, showing true positives, false positives, true negatives, and false negatives, with the conditional probability P(disease given positive test) computed beside it, in grayscale-printable labels
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners meet conditional probability P(A|B), define independence, and use both to
  read a screening test honestly — discovering that with a rare disease, most
  positives can be false. They reflect on what that means for who is tested, how
  results are communicated, and whether testing is fair.
cross_cutting_lenses:
  - intellectual
  - critical-thinking
  - ethics
  - egalitarianism
  - technology
assessment_type:
  - formative
  - self
  - peer
  - portfolio
status: draft
author: lesson-author
last_updated: 2026-08-19
---

# Lesson 13 — Independence and Conditional Probability: Reading Screening Tests

## Summary

Learners meet **conditional probability** P(A|B), define **independence**, and use
both to read a screening test honestly — discovering that when a disease is rare,
most positive results can be false. They reflect on what that means for who gets
tested, how results are communicated, and whether testing is fair.

## Objectives

- Understand independence and conditional probability and use them to interpret real
  situations such as screening tests and risk. _(D05.S4.10.01)_

## Connection

A screening test is 99% accurate. You take it, and it comes back positive. Surely you
almost certainly have the disease — right? Not necessarily. If the disease is rare —
say 1 in 1,000 people have it — then even a very good test will "find" far more healthy
people by mistake than truly sick people, simply because there are so many more healthy
people to mistake. The math is a humbling, life-relevant truth: **new information
changes a probability, but the base rate matters just as much as the test.** Reading
this honestly protects people from needless fear, needless treatment, and unfair
labeling — and it is exactly what conditional probability is for.

## Materials

- Screening-test worksheet
- Math journal

## Preparation

- Copy or draw the screening-test worksheet.
- Retrieval: from Lesson 12, two-way tables and the multiplication rule; from Grade 9,
  conditional relative frequencies (D05.S4.09.02). Today we formalize P(A|B) and
  independence.
- Prepare the rare-disease worked table.

## Facilitator note

This lesson is written to the learner ("you"). The idea to land: **conditional
probability P(A|B) = P(A and B) / P(B) measures how knowing B changes the chance of A;
independence means P(A|B) = P(A); and for screening tests the key insight is that with
a rare condition, most positives are false — so the prevalence (base rate) matters as
much as the test's accuracy.** Teach the computation with worked examples (S-011), and
let the 2×2 table carry the reasoning.

The **intellectual** lens: the formula is just "restrict to the cases where B is true,
and ask what fraction are A." The **critical-thinking** lens: always ask "given what?"
— a probability without its condition is incomplete. The **ethics** lens: a false
alarm is not a harmless number — it is fear, cost, and sometimes treatment a person
did not need; honest communication of risk is a duty, not a nicety. The
**egalitarian** lens: who gets screened, who can afford follow-up, and how a "positive"
label follows a person are questions of fairness — the same arithmetic lands
differently on different people. The **technology** lens: screening, prediction, and
risk scores are everywhere in health and beyond; the base-rate lesson applies to any
"it flagged you" system. Preview: Lesson 14 ends the unit with expected value — the
decision side of risk.

## Procedure

1. **Recall (5 min).** From Lesson 12, what is P(A and B) for two independent events?
   From Grade 9, what is a two-way table? Today we ask: how does *knowing* one thing
   change the chance of another?
2. **Meet conditional probability (10 min).** P(A|B) is read "the probability of A
   *given* B" and equals P(A and B) / P(B). Worked example: from a deck, P(king |
   heart) = P(king and heart) / P(heart) = (1/52)/(13/52) = 1/13. Two events are
   **independent** if knowing one does not change the other: P(A|B) = P(A).
3. **Read a screening test (20 min).** Work the table for a disease with prevalence
   1 in 1,000 in a town of 10,000, and a test with **sensitivity** 99% (catches 99% of
   the sick) and **specificity** 99% (clears 99% of the well):
   - Sick: 10; well: 9,990.
   - True positives: 99% of 10 ≈ 10. False negatives: ≈ 0.
   - False positives: 1% of 9,990 ≈ 100. True negatives: ≈ 9,890.
   - So P(disease | positive) ≈ 10 / (10 + 100) ≈ 9%. Even with a positive result, the
     person is *probably fine* — because the disease is rare.
   Recompute with a common disease (prevalence 10%) and see the answer change.
4. **Reflect (10 min).** In your journal, answer: why can a positive test still mean
   "probably fine"? Who bears the cost of a false alarm — the person, the family, the
   system? What would make testing fairer?
5. **Close (5 min).** Say in one sentence what P(A|B) measures and why the base rate
   matters as much as the test.

## Differentiation

- **Support:** Fill the 2×2 table with counters first, then translate counts to
  fractions.
- **Extension:** Compute P(well | negative) for the same table and explain what a
  negative result tells you when the test is very sensitive.

## Assessment

- **Formative (peer + self):** Can the learner compute a conditional probability from a
  2×2 table, test for independence, and explain the base-rate effect in a screening
  scenario?
- **Portfolio artifact (unit):** The completed screening-test worksheet with the
  written reflection, added to the data-and-chance toolkit.

## Home connection

Ask someone about a test or a prediction they have seen — medical, weather, or a
"risk score." Talk together about what the number was *conditioned on*, and whether
the base rate was part of the story.

## Resources

- On the origin of probability theory (for background on reasoning about risk):
  Encyclopaedia Britannica, "Probability and statistics,"
  <https://www.britannica.com/science/probability> (S-301).
- On worked examples and guided practice: Kirschner, Sweller & Clark (2006),
  <https://doi.org/10.1207/s15326985ep4102_1> (S-011).
