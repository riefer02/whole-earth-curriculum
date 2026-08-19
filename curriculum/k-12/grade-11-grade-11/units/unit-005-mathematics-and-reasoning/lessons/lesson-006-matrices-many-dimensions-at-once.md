---
kind: lesson
id: L.11.005.06
title: "Matrices: Many Dimensions at Once"
grade: 11
unit: U.11.005
sequence_in_unit: 6
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S1
objectives:
  - D05.S1.11.02
essential_question: How does a matrix hold many numbers at once, and how do I add and multiply matrices to combine several dimensions of information?
key_vocabulary:
  - matrix
  - row
  - column
  - element
  - dimensions of a matrix
  - scalar multiple
  - matrix multiplication
materials:
  - name: Matrix problem sheet
    quantity: "1 per learner"
    notes: Worked and practice problems for adding, scaling, and multiplying matrices
  - name: Math journal
    quantity: "1 per learner"
materials_low_tech:
  - name: Grid paper and counters
    notes: Lay counters in a grid to see rows and columns, and slide two grids together for addition
  - name: A real table (timetable, price list, roster)
    notes: Any table is a matrix waiting to be named by its rows and columns
materials_enriched:
  - name: Spreadsheet
    quantity: "1 per learner or pair"
    notes: A spreadsheet is a living matrix; practice naming cells and summing rows/columns
  - name: Calculator
    quantity: "1 per learner"
context_variants:
  - context: large-group
    note: Build one matrix addition and one multiplication whole-class, then learners work in pairs on a mixed set
  - context: multi-age
    note: Younger learners add and scale matrices by counting; older learners multiply and interpret the result in context
  - context: self-directed
    note: A learner follows the worked examples, then solves the practice set and checks dimensions before each multiplication
  - context: level-grouped
    note: Group by comfort with dot products; a ready group composes two transformations (e.g., rotate then scale) as matrix multiplication
  - context: outdoor-only
    note: Use a real roster or a field layout drawn in chalk as a matrix, and add two layouts cell by cell
assets:
  - path: assets/images/L.11.005.06-matrices-many-dimensions.svg
    alt: A 2 by 3 matrix with its rows and columns labeled, a second 2 by 3 matrix beside it, and a worked matrix addition showing corresponding elements being added, plus a note that matrices combine many numbers at once
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners meet the matrix as a table that holds many numbers at once, name its rows,
  columns, and dimensions, and add, scale, and multiply matrices — reading real tables
  (rosters, timetables, price lists) as matrices and combining several dimensions of
  information in one step. They meet the Lo Shu square as an early array-like object.
cross_cutting_lenses:
  - intellectual
  - global
  - technology
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

# Lesson 6 — Matrices: Many Dimensions at Once

## Summary

Learners meet the **matrix** — a rectangular table of numbers that holds many
quantities at once. They name its **rows**, **columns**, and **dimensions**, then
**add**, **scale**, and **multiply** matrices, reading real tables (rosters,
timetables, price lists) as matrices. They meet the Lo Shu square as an early
array-like object from China, part of a shared global history.

## Objectives

- Represent multi-dimensional quantities as matrices, perform matrix addition, scalar
  multiplication, and multiplication, and interpret the results in real contexts.
  _(D05.S1.11.02)_

## Connection

A single number says "how much"; a table says "how much, of what, for whom, and
when" — all at once. A bus timetable, a price list, a class roster, a spreadsheet of
rainfall by month and region: each is a matrix, a grid of numbers. When you combine
two tables — prices with quantities, schedules with routes — you are multiplying
matrices, the way a machine combines many pieces of information in one step.

## Materials

- Matrix problem sheet
- Math journal

## Preparation

- Copy or draw the problem sheet.
- Retrieval: from Lesson 5, vectors and components (a vector is a one-column matrix).
- Prepare worked examples for naming dimensions, addition, scaling, and multiplication.

## Facilitator note

This lesson is written to the learner ("you"). The ideas to land: **a matrix has
rows × columns (an m×n matrix has m rows, n columns); addition and scalar
multiplication work element by element; multiplication combines rows of the first
with columns of the second, so the inside dimensions must match.** Teach the moves
explicitly — *name* (dimensions), *combine by element* (add/scale), and *row-times-
column* (multiply) — with worked examples and guided practice (S-011).

The **intellectual** lens: a matrix is a single object that holds many numbers; its
power is doing many operations at once. The **global** lens: the Lo Shu square — a
3×3 arrangement whose rows, columns, and diagonals all sum to 15 — is an ancient
Chinese array-like object, one root of a global story (S-496, S-429). The
**technology** lens: matrices are the working language of computer graphics, search,
and machine learning — the grid that a screen or a model actually computes. The
**egalitarianism** lens: a census table, a voting tally, a resource grid — matrices
let everyone's row be counted on the same footing; reading them is a shared-skill,
not a ranking ritual. Preview: Lesson 7 turns to trigonometric functions.

## Procedure

1. **Recall (5 min).** From Lesson 5, a vector is a column of numbers. A matrix is a
   whole *table* of them.
2. **Meet the matrix (12 min).** A **matrix** is a rectangular array; an m×n matrix has
   m rows and n columns. Each number is an **element**. Worked example: a 2×3 matrix
   of rainfall (two regions, three months):
   ```
   [ 10 12 14
     20 18 16 ]
   ```
   Row 1 is region A; column 2 is the second month.
3. **Add and scale (10 min).** Add matrices **element by element** (same dimensions);
   multiply every element by a **scalar**. Worked example: adding two 2×3 price grids
   doubles the table into one combined grid; scaling by 2 doubles every price.
4. **Multiply: row times column (15 min).** Matrix multiplication combines the rows of
   the first with the columns of the second; the **inside dimensions must match**
   (an m×n times an n×p gives an m×p). Worked example:
   ```
   [1 2]   [5]   [1·5 + 2·6]   [17]
   [3 4] · [6] = [3·5 + 4·6] = [39]
   ```
   Read it as two orders (1 of item X and 2 of item Y; 3 and 4) hit by prices (5 and
   6): the totals are 17 and 39.
5. **Guided practice (10 min).** With a partner: (a) name the dimensions of a 3×2
   roster; (b) add two 2×2 grids; (c) multiply a 2×2 by a 2×1 and read the answer as
   totals. Check dimensions before each multiplication.
6. **Close (3 min).** Say why a matrix beats many separate numbers, and name one real
   table in your life.

## Differentiation

- **Support:** Add and scale matrices by counting counters in a grid before doing any
  multiplication.
- **Extension:** Compose two transformations (rotate a point, then scale it) as a
  matrix product and apply it to a vector.

## Assessment

- **Formative (peer + self):** Can the learner name matrix dimensions, add and scale
  matrices, and multiply two matrices with a dimension check, reading the result in
  context?
- **Portfolio artifact (unit):** The matrix sheet with the order-and-price
  multiplication, added to the number toolkit.

## Home connection

Find a real table at home — a timetable, a price list, a roster — and name its rows,
columns, and dimensions. Add or scale it, and write one sentence about what the new
numbers mean.

## Resources

- On worked examples and guided practice: Kirschner, Sweller & Clark (2006),
  <https://doi.org/10.1207/s15326985ep4102_1> (S-011).
- On the Lo Shu square and the shared history of arrays: Wikipedia — Luoshu (Lo Shu)
  Square (S-496); Boyer & Merzbach, *A History of Mathematics* (S-429).
