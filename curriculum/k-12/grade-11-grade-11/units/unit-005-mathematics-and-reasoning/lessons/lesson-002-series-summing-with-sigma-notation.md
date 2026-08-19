---
kind: lesson
id: L.11.005.02
title: "Series: Summing with Sigma Notation"
grade: 11
unit: U.11.005
sequence_in_unit: 2
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S1
objectives:
  - D05.S1.11.01
essential_question: How do I turn a sequence into a sum, write that sum with sigma notation, and find the total of an arithmetic or geometric series?
key_vocabulary:
  - series
  - sigma notation
  - partial sum
  - arithmetic series
  - geometric series
  - finite sum
materials:
  - name: Series problem sheet
    quantity: "1 per learner"
    notes: Worked and practice problems for sigma notation and arithmetic/geometric series sums
  - name: Math journal
    quantity: "1 per learner"
materials_low_tech:
  - name: Counters, seeds, or pebbles
    notes: Pair counters to feel why the arithmetic-sum formula averages the first and last term
  - name: Paper strips
    notes: Fold a strip to visualize summing a geometric series approaching a fixed total
materials_enriched:
  - name: Calculator or spreadsheet
    quantity: "1 per learner or pair"
    notes: To check a series sum against adding the terms one by one
context_variants:
  - context: large-group
    note: Demonstrate the first-plus-last pairing whole-class, then learners sum one arithmetic and one geometric series in pairs
  - context: multi-age
    note: Younger learners add a short series term by term; older learners derive and apply the closed formulas
  - context: self-directed
    note: A learner follows the worked examples, then sums the practice set and checks by direct addition
  - context: level-grouped
    note: Group by comfort with exponents; a ready group sums an infinite geometric series with |r| under 1
  - context: outdoor-only
    note: Lay out a row of pebbles in an arithmetic pattern, then pair the first with the last to count the total
assets:
  - path: assets/images/L.11.005.02-sigma-notation-and-series.svg
    alt: A diagram showing sigma notation with its parts labeled (start index, end index, and general term), and beside it a pairing diagram that folds the numbers 1 through 8 into four pairs each summing to 9, illustrating the arithmetic-series formula
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners turn a sequence into a series (a sum), read and write sigma notation, and
  find totals using the arithmetic-series formula (the first-plus-last pairing) and
  the finite geometric-series formula. The pairing idea that sums 1 through n is met
  as a shared discovery, not one person's trick.
cross_cutting_lenses:
  - intellectual
  - critical-thinking
  - global
  - egalitarianism
assessment_type:
  - formative
  - self
  - peer
  - portfolio
status: draft
author: lesson-author
last_updated: 2026-08-19
---

# Lesson 2 — Series: Summing with Sigma Notation

## Summary

Learners move from a *sequence* (a list) to a *series* (a sum of the list), read and
write **sigma notation** for that sum, and find totals with two closed formulas: the
**arithmetic-series formula** (pair the first with the last) and the **finite
geometric-series formula**. They meet the pairing idea that sums 1 through n as a
discovery shared across traditions.

## Objectives

- Express and evaluate arithmetic and geometric series with sigma notation, and find
  finite sums using the first-plus-last pairing and the geometric-sum formula, in
  financial and environmental contexts. _(D05.S1.11.01)_

## Connection

When you add up a whole run of payments, harvests, or days of growth, you are not
adding one number but a *list* of numbers — a series. "How much in total over the
year?" "How much rain fell all season?" "How much do all the loan payments add up
to?" Each is a sum of a sequence, and sigma notation is the compact way to say "add
up every term from here to here."

## Materials

- Series problem sheet
- Math journal

## Preparation

- Copy or draw the problem sheet.
- Retrieval: from Lesson 1, the explicit formula for arithmetic (aₙ = a₁ + (n−1)d)
  and geometric (aₙ = a₁·r^(n−1)) sequences.
- Prepare worked examples for sigma notation, the arithmetic sum, and the geometric
  sum.

## Facilitator note

This lesson is written to the learner ("you"). The ideas to land: **sigma notation
Σ sums a general term from a start index to an end index; an arithmetic series sums
to Sₙ = n/2·(a₁ + aₙ) (first-plus-last pairing); a finite geometric series sums to
Sₙ = a₁·(1 − rⁿ)/(1 − r).** Teach the pairing as a concrete move first — fold the
list in half — then compress it into the formula (S-011).

The **intellectual** lens: a series compresses a long addition into one formula; the
sigma symbol says "sum this rule." The **critical-thinking** lens: learners check
every closed formula against adding a few terms directly. The **global** lens: the
first-plus-last pairing is a discovery credited to several traditions, not one
person alone (S-429, S-240) — treat it as shared mathematics. The **egalitarianism**
lens: the same sum that counts a king's treasury can count a village's shared
harvest; the tool serves everyone equally, and "mastery, not ranking" applies here
too. Preview: Lessons 3–4 apply these sums to compound interest/debt and to
environmental accumulation.

## Procedure

1. **Recall (5 min).** From Lesson 1, what are a₁, d, and r? Write the nth term of
   2, 4, 8, 16, … and of 2, 4, 6, 8, ….
2. **Meet sigma notation (10 min).** A **series** is the sum of a sequence. Σ (capital
   sigma) says "add": Σᵢ₌₁ⁿ aᵢ means a₁ + a₂ + … + aₙ. Read the **lower index**
   (where to start), the **upper index** (where to stop), and the **general term**
   (what to add). Worked example: Σᵢ₌₁⁴ 2i = 2 + 4 + 6 + 8 = 20.
3. **Arithmetic series: the pairing (12 min).** To sum 1 + 2 + … + 100, pair the
   first with the last (1 + 100 = 101), the second with the next-to-last
   (2 + 99 = 101), and so on — 50 pairs, each 101, so the sum is 50·101 = 5050.
   This is Sₙ = n/2·(a₁ + aₙ). Worked example: 3 + 7 + 11 + 15 + 19 has n = 5, so
   S₅ = 5/2·(3 + 19) = 55.
4. **Geometric series: the finite sum (12 min).** The sum of a geometric sequence is
   Sₙ = a₁·(1 − rⁿ)/(1 − r). Worked example: 3 + 6 + 12 + 24 + 48 (a₁ = 3, r = 2,
   n = 5) → S₅ = 3·(1 − 32)/(1 − 2) = 3·31 = 93. Check: 3 + 6 + 12 + 24 + 48 = 93.
5. **Guided practice (10 min).** With a partner, sum: (a) Σᵢ₌₁⁶ (2i + 1) (b) the
   first 20 terms of 5, 8, 11, 14, … (c) 1 + 2 + 4 + … + 64. Check each by adding the
   terms directly for at least the small ones.
6. **Independent practice (4 min).** In your journal, write a sum from your own life
   (savings over several weeks, bus fares over a month) in sigma notation and total it.
7. **Close (2 min).** Say what "first-plus-last pairing" means and why it works.

## Differentiation

- **Support:** Sum only short series (n ≤ 5) by direct addition first, then match the
  same total to the formula.
- **Extension:** Sum an infinite geometric series with |r| < 1 (e.g., 1 + ½ + ¼ + …)
  and explain why it approaches a fixed value.

## Assessment

- **Formative (peer + self):** Can the learner read and write sigma notation, and
  total an arithmetic and a geometric series with the closed formula, verified by a
  direct check?
- **Portfolio artifact (unit):** The problem sheet with the self-written sum, added
  to the number toolkit.

## Home connection

Add up a real series at home — the pages of a book read each day for a week, the
coins saved each day for a month. Write it in sigma notation and total it with the
pairing idea or the geometric formula.

## Resources

- On worked examples and guided practice: Kirschner, Sweller & Clark (2006),
  <https://doi.org/10.1207/s15326985ep4102_1> (S-011).
- On the first-plus-last pairing and series history as shared mathematics: Boyer &
  Merzbach, *A History of Mathematics* (S-429); MacTutor History of Mathematics
  Archive (S-240).
