---
kind: lesson
id: L.12.005.06
title: "Matrices as Many Equations at Once"
grade: 12
unit: U.12.005
sequence_in_unit: 6
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S2
objectives:
  - D05.S2.12.01
essential_question: How does a matrix hold a whole system of equations, and what does its solution mean in a real context?
key_vocabulary:
  - matrix
  - augmented matrix
  - row operation
  - row reduction
  - coefficient
  - solution vector
materials:
  - name: Matrix-system sheet
    quantity: "1 per learner"
    notes: A system written three ways (equations, matrix, graph) and a row-reduction worked example
  - name: Math journal
    quantity: "1 per learner"
materials_low_tech:
  - name: Grid paper and counters
    notes: Lay the coefficients in a grid and move counters to "eliminate" one unknown at a time
  - name: A real table (price list, resource grid)
    notes: Read the table as the coefficient matrix of a system
materials_enriched:
  - name: Spreadsheet or a matrix-capable calculator
    quantity: "1 per learner or pair"
    notes: Enter the matrix and reduce it, then confirm the solution matches the hand work
context_variants:
  - context: large-group
    note: Reduce one system whole-class on the board, then pairs reduce a second and interpret it
  - context: multi-age
    note: Younger learners add and scale matrix rows by counting; older learners reduce and interpret the solution
  - context: self-directed
    note: A learner follows the worked example, reduces a fresh matrix, and checks the answer in the original scenario
  - context: level-grouped
    note: A ready group reduces a 3×3 system and explains what a row of zeros means (dependent or inconsistent)
  - context: outdoor-only
    note: Draw the augmented matrix in a grid in the dirt or on slate and reduce it row by row with chalk
assets:
  - path: assets/images/L.12.005.06-matrices-as-equations.svg
    alt: "A system of two equations written as an augmented matrix with a coefficient grid and a right-hand column, then the same matrix after one row operation has cleared a coefficient, with the solution read off. Labels carry the meaning, so it prints in grayscale."
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners rewrite a system of equations as an augmented matrix and solve it by row
  reduction — the same elimination moves from Lesson 5, performed on a grid — then
  interpret the solution in context. They connect the grid to the ancient Chinese
  *fangcheng* array and the Lo Shu square as early array-like objects, and see the matrix
  as the form a computer actually solves.
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

# Lesson 6 — Matrices as Many Equations at Once

## Summary

Learners rewrite a system of equations as an **augmented matrix** and solve it by **row
reduction** — the same elimination moves from Lesson 5, performed on a grid — then
**interpret** the solution in context. They connect the grid to the ancient Chinese
*fangcheng* array and the Lo Shu square as early array-like objects, and see the matrix as
the form a computer actually solves.

## Objectives

- Model systems of relationships with matrices and interpret the meaning of a solution in
  a real context. _(D05.S2.12.01)_

## Connection

When there are many equations and many unknowns, writing them all out becomes a wall of
symbols. A matrix squeezes the whole system into one grid — the numbers in rows and
columns — so that a few clean moves solve it. The same grid sits under every spreadsheet,
every supply plan, and every recommendation system you touch: a table of numbers that
represents many relationships at once, and can be reduced to see the answer.

## Materials

- Matrix-system sheet
- Math journal
- Low-tech: grid paper and counters

## Preparation

- Copy or draw the sheet with a system written three ways.
- Retrieval: from Lesson 5, elimination; from Grade 11 (D05.S1.11.02), matrix rows,
  columns, and addition. Today a matrix *is* the system.
- Prepare the row-reduction worked example to model first (S-011).

## Facilitator note

This lesson is written to the learner ("you"). The idea to land: **an augmented matrix
holds the coefficients and the answers side by side; row operations (swap, scale, add a
multiple) preserve the solution while clearing one unknown at a time, and the reduced
matrix reads out the solution.** Teach the moves explicitly with a worked example and
guided practice (S-011). The interpretation — what the numbers mean in the original
situation — is the goal, not the row operations alone.

The **ethics** lens: row operations are a public, checkable record — the same answer
anyone else can verify, which is what makes a computed result trustworthy rather than
opaque. The **egalitarianism** lens: the matrix puts every unknown in the same grid, so no
quantity is privileged; the method is a shared skill, not an arcane one. The **global**
lens: the *fangcheng* array of the *Nine Chapters* (China, c. 200 BCE) arranged systems in
rows and columns and eliminated unknowns — an ancestor of Gaussian elimination (S-289,
S-429); the Lo Shu square is an early Chinese array-like object whose rows, columns, and
diagonals sum to 15 (S-496). The **technology** lens: computers solve enormous systems by
exactly these row operations — the matrix is the working form of numerical computation.
The **environment** lens: resource and energy balances (supply meeting demand across many
nodes of a grid) are matrices; a solution that needs negative or impossible amounts
signals a mismatch between plan and planet (S-005). Preview: Lesson 7 turns from solving
to *algorithms*.

## Procedure

1. **Recall (5 min).** From Lesson 5, the system r + b = 50 and 2r + 3b = 120. Today we
   pack it into one grid.
2. **Write the matrix (10 min).** The **augmented matrix** holds coefficients on the left
   and the answers on the right:
   ```
   [ 1  1 |  50 ]
   [ 2  3 | 120 ]
   ```
   Each row is one equation; each column is one unknown (then the answer column). The
   system *is* this grid.
3. **Worked example — row reduction (15 min).** Use **row operations** that keep the
   solution the same: scale a row, swap rows, or add a multiple of one row to another.
   Subtract 2×(row 1) from row 2 to clear the 2:
   ```
   [ 1  1 |  50 ]         [ 1  1 | 50 ]
   [ 2  3 | 120 ]  R2-2R1 [ 0  1 | 20 ]
   ```
   Now read from the bottom up: b = 20; then r + 20 = 50, so r = 30. Same answer as
   Lesson 5, done on a grid.
4. **Name the goal (6 min).** Row reduction aims for a **staircase** — a leading 1 in each
   row, zeros below — so each row reveals one unknown. A full row of zeros on the left with
   a nonzero answer means **no solution**; a zero row with a zero answer means **infinitely
   many**.
5. **Guided practice (12 min).** With a partner, write a 2×2 system as an augmented
   matrix, reduce it to the staircase, and read off the solution. Interpret the answer in
   the original context, and check it by substitution. Swap and verify.
6. **Retrieve and connect (5 min).** Write one sentence on how the matrix and the
   equations say the *same thing* in two forms, and one on why the grid is what a
   computer prefers.
7. **Close (2 min).** Say — or write, sign, gesture, or use AAC to express — what the
   reduced matrix tells you that the original does not make obvious.

## Differentiation

- **Support:** Reduce only to "clear one coefficient" and finish by substitution, using
  counters to see the move.
- **Extension:** Reduce a 3×3 system and explain, for each kind of zero row, whether the
  system is dependent, inconsistent, or uniquely solved.
- **Number access (dyscalculia):** Provide the step-2 augmented-matrix grid pre-printed with
  empty cells and the step-3 row-reduction worked example partially completed (the R2 − 2R1
  move already applied) to copy; offload the row arithmetic (2×1, 3 − 2, 120 − 100) to a
  partner or calculator; and take the verbal route — read each row aloud as a sentence ("one
  rice plus one bean is fifty") and say "after clearing the 2, the bottom row reads b = 20" to
  reach the solution without hand-computing.
- **Communication access:** Every spoken step — saying, naming, reading aloud, discussing,
  or closing — can be done in writing, sign, gesture, or AAC instead. Learners who are
  non-speaking, d/Deaf, hard-of-hearing, or who use AAC complete every task in their
  preferred mode; no step requires producing or hearing sound.

## Assessment

- **Formative (peer + self):** Can the learner write an augmented matrix, reduce it to a
  staircase, read off the solution, and interpret it in context (in speech, writing, sign,
  or AAC) with a check?
- **Portfolio artifact (unit):** The matrix written, reduced, and interpreted, added to
  the math journal.

## Home connection

Find a two-column table at home (prices, distances, a schedule) and write the rows as a
matrix. Add or scale a row and write one sentence on what the changed numbers would mean.

## Resources

- On worked examples and guided practice: Kirschner, Sweller & Clark (2006) (S-011).
- On the *fangcheng* array and the history of systems: MacTutor — Nine Chapters (S-289);
  Boyer & Merzbach, *A History of Mathematics* (S-429). On the Lo Shu square: Wikipedia —
  Luoshu Square (S-496).
