---
kind: lesson
id: L.11.005.09
title: "Logarithms: Order, Growth, and Scale"
grade: 11
unit: U.11.005
sequence_in_unit: 9
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S2
objectives:
  - D05.S2.11.02
essential_question: How does a logarithm turn multiplication into addition and compress huge ranges of scale, and why do we use log scales for sound, acidity, and earthquakes?
key_vocabulary:
  - logarithm
  - base
  - common log
  - natural log
  - order of magnitude
  - log scale
  - inverse
materials:
  - name: Logarithm problem sheet
    quantity: "1 per learner"
    notes: Worked and practice problems for evaluating logs and reading log scales
  - name: Math journal
    quantity: "1 per learner"
materials_low_tech:
  - name: Paper strips folded in half
    notes: Each fold doubles the thickness — count folds to feel a logarithm (fold 7 = about 128 layers)
  - name: A number line drawn large
    notes: Mark 1, 10, 100, 1000 evenly spaced to see a log scale compress tenfold jumps
materials_enriched:
  - name: Calculator
    quantity: "1 per learner or pair"
    notes: To evaluate logs and check inverse pairs
  - name: A sound-level or pH meter (if available)
    quantity: "1 per group"
    notes: To read a real decibel or pH reading and place it on its log scale
context_variants:
  - context: large-group
    note: Evaluate a few logs whole-class, then learners work in pairs on a mixed set (exponential to log and back)
  - context: multi-age
    note: Younger learners fold paper to count doublings; older learners evaluate logs and convert between scales
  - context: self-directed
    note: A learner follows the worked examples, then solves the practice set and checks each by exponentiation
  - context: level-grouped
    note: Group by comfort with exponents; a ready group solves for an unknown base or works in base e
  - context: outdoor-only
    note: Compare real sizes on a log scale — a leaf, a branch, a tree, a field — each about ten times the last
assets:
  - path: assets/images/L.11.005.09-logarithms-order-growth-scale.svg
    alt: A number line where 1, 10, 100, and 1000 are evenly spaced, labeled as a log scale, with the note that each step is ten times the last, and beside it the inverse relationship log base 10 of 1000 equals 3 because 10 cubed equals 1000
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners meet the logarithm as the inverse of the exponential, see how it turns
  multiplication into addition, and read the log scales that compress huge ranges —
  pH, decibels, and earthquake magnitude. They meet Napier's invention and the older
  insight (powers of ten) that it built on, as shared history.
cross_cutting_lenses:
  - intellectual
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
last_updated: 2026-08-19
---

# Lesson 9 — Logarithms: Order, Growth, and Scale

## Summary

Learners meet the **logarithm** as the inverse of the exponential — log_b(x) = y means
b^y = x — and see how it turns multiplication into addition and compresses vast ranges
onto a readable **log scale**. They read the three everyday log scales: **pH**
(acidity), **decibels** (sound), and **Richter magnitude** (earthquakes), and meet
Napier's invention and the powers-of-ten insight behind it.

## Objectives

- Use logarithms as the inverse of exponentials and interpret logarithmic scales
  (pH, decibels, earthquake magnitude) to reason about growth, decay, and scale.
  _(D05.S2.11.02)_

## Connection

Some ranges are too big to hold in your head: a whisper and a jet engine, an acid and
a base, a small tremor and a great earthquake — each spans powers of ten, not small
steps. A logarithm compresses those powers into small, comparable numbers: pH 3 vs
pH 7, 40 vs 120 decibels, magnitude 5 vs 9. "Log base 10 of x" just asks: *10 to what
power gives x?* — the exponent, written small.

## Materials

- Logarithm problem sheet
- Math journal

## Preparation

- Copy or draw the problem sheet.
- Retrieval: from Grade 10, exponents and bases (D05.S1.10.01). A logarithm names the
  exponent.
- Prepare worked examples for evaluating logs and reading log scales.

## Facilitator note

This lesson is written to the learner ("you"). The ideas to land: **log_b(x) = y means
b^y = x; a log turns multiplication into addition (log(x·y) = log x + log y); and a
log scale spaces powers of ten evenly.** Teach the *inverse* relationship explicitly —
write "log" as "what power?" — and connect it to the three real scales (S-011).

The **intellectual** lens: a logarithm is the question "what power?" — the inverse of
"raise b to a power." The **global** lens: John Napier (1614) systematized logarithms
for computation, but the underlying idea of using powers of ten to count huge
quantities is far older, appearing in Archimedes' *Sand-Reckoner* — a shared, layered
history (S-429). The **technology** lens: decibels, pH, and Richter are the log
scales that instruments and sensors report — reading them is reading a device. The
**environment** lens: pH measures acidity (rain, soil, oceans), and each unit is a
tenfold change — a small pH change can mean a large chemical change. Preview: Lesson
10 uses logs to solve growth and decay.

## Procedure

1. **Recall (5 min).** From Grade 10, 10³ = 1000. Today we ask it backward: what power
   makes 1000? The answer is log₁₀(1000) = 3.
2. **The inverse (12 min).** **log_b(x) = y** means **b^y = x**. Worked examples:
   log₁₀(1000) = 3 (because 10³ = 1000); log₂(8) = 3 (because 2³ = 8);
   log₁₀(0.01) = −2 (because 10⁻² = 0.01). The **common log** is base 10; the
   **natural log** is base e ≈ 2.718.
3. **Multiplication becomes addition (8 min).** Because exponents add when you
   multiply, logs add too: log(x·y) = log x + log y. Worked example: log₁₀(100·1000)
   = log₁₀(100) + log₁₀(1000) = 2 + 3 = 5, and 10⁵ = 100 000. This is why logs made
   hard multiplication easy before machines — and still describe growth neatly.
4. **Log scales: compress the range (15 min).** On a **log scale**, each equal step is
   a factor of ten. Read three real ones:
   - **pH:** each unit is a tenfold change in acidity; pH 3 is a hundred times more
     acidic than pH 5.
   - **Decibels:** each +10 dB is ten times the sound intensity; 120 dB is far more
     than 40 dB.
   - **Richter magnitude:** each unit is about ten times the shaking; magnitude 7
     releases vastly more energy than magnitude 5 (S-435).
5. **Guided practice (10 min).** With a partner: (a) evaluate log₃(81), log₁₀(1 000 000),
   log₁₀(0.001); (b) say how many times more acidic pH 2 is than pH 6; (c) write
   "100 000" and "0.0001" as powers of ten.
6. **Close (5 min).** Say what "log₁₀(x) = y" means in one sentence, and name one
   place a log scale appears in daily life.

## Differentiation

- **Support:** Work only in base 10 with whole-number powers first (10, 100, 1000).
- **Extension:** Use the natural log to solve b^x = c for x, and convert between log
  bases.

## Assessment

- **Formative (peer + self):** Can the learner evaluate a log, state the inverse
  relationship to powers, and read a pH, decibel, or magnitude value on its log scale?
- **Portfolio artifact (unit):** The log-scale reading sheet, added to the pattern
  toolkit.

## Home connection

Fold a strip of paper in half and count the folds: 7 folds is about 128 layers, 10
folds about 1024. Write each fold count as a power of two — you are doing logs by
hand.

## Resources

- On worked examples and guided practice: Kirschner, Sweller & Clark (2006),
  <https://doi.org/10.1207/s15326985ep4102_1> (S-011).
- On logarithms and their scales (pH, decibels, Richter): OpenStax, *Algebra and
  Trigonometry* (S-435); on the history of logarithms and Archimedes' powers-of-ten:
  Boyer & Merzbach, *A History of Mathematics* (S-429).
