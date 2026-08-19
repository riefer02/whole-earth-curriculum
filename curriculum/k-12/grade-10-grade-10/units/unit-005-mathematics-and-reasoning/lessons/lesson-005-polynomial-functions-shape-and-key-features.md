---
kind: lesson
id: L.10.005.05
title: "Polynomial Functions: Shape and Key Features"
grade: 10
unit: U.10.005
sequence_in_unit: 5
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S2
objectives:
  - D05.S2.10.01
essential_question: What do the key features of a polynomial function — its zeros, turning points, and end behavior — tell me about the real relationship it models?
key_vocabulary:
  - polynomial
  - degree
  - leading coefficient
  - zero
  - x-intercept
  - turning point
  - end behavior
materials:
  - name: Polynomial-features chart
    quantity: "1 per learner"
    notes: A labeled graph of a cubic showing zeros, turning points, and end behavior, with a checklist of features to find
  - name: Graph paper
    quantity: "1 per learner"
  - name: Math journal
    quantity: "1 per learner"
materials_low_tech:
  - name: A stick or arm to trace curves in the air
    notes: Sweep out a cubic's rise-fall-rise shape with a hand to feel the turning points before drawing
  - name: String or rope laid on the ground
    notes: Bend it into a cubic shape and mark where it crosses a straight line (the zeros)
materials_enriched:
  - name: Graphing calculator or graphing software
    quantity: "1 per learner or pair"
    notes: To graph a cubic and a quartic and confirm the number of turning points
context_variants:
  - context: large-group
    note: Sketch one cubic whole-class on a large board, then learners sketch their own and compare feature checklists in pairs
  - context: multi-age
    note: Younger learners find zeros of factored quadratics; older learners sketch cubics and quartics and reason about end behavior
  - context: self-directed
    note: A learner follows the worked sketch, then sketches a new polynomial and checks each feature against the factored form
  - context: level-grouped
    note: Group by fluency with factoring from Grade 9; a ready group extends to a polynomial given by its zeros (building the factors)
  - context: outdoor-only
    note: Sketch curves in the ground and mark where they cross the baseline; read the crossings as zeros
assets:
  - path: assets/images/L.10.005.05-polynomial-functions.svg
    alt: A cubic function graph with its x-intercepts (zeros) marked, a local maximum and minimum (turning points) labeled, and arrows showing the end behavior (down on the far left, up on the far right), with the factored form written beside it
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners grow from linear and quadratic functions to polynomials of higher degree,
  and learn to read a polynomial's key features — zeros, turning points, and end
  behavior — from its factored form and graph. They model a real relationship (a
  box's volume, a projectile's height) and describe what each feature means in
  context.
cross_cutting_lenses:
  - intellectual
  - critical-thinking
  - environment
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

# Lesson 5 — Polynomial Functions: Shape and Key Features

## Summary

Learners extend from linear and quadratic functions to polynomials of higher degree,
reading a polynomial's **zeros**, **turning points**, and **end behavior** from its
factored form and graph. They model a real relationship — a box's volume, a
projectile's height — and say what each feature means in context.

## Objectives

- Build and interpret polynomial functions that model real relationships and describe
  their key features. _(D05.S2.10.01)_

## Connection

Cut the corners from a square of cardboard and fold up the sides to make a box. The
volume of that box is a polynomial in the side length: too small a cut and the box is
shallow, too large and the base is tiny, and somewhere in between the volume is
biggest. The *shape* of that relationship — where it rises, where it turns, where it
crosses zero (a box of zero volume) — is exactly what a polynomial function's key
features describe. A thrown ball's height over time is another polynomial, a parabola.
Polynomials are how we describe any smooth curve built from powers of a single
quantity, and their features carry real meaning: zeros are "nothing left," turning
points are "the most," end behavior is "where it goes from here."

## Materials

- Polynomial-features chart
- Graph paper
- Math journal

## Preparation

- Copy or draw the polynomial-features chart.
- Retrieval: from Grade 9, linear and quadratic functions and their graphs
  (D05.S2.09.01, D05.S2.09.02). Today we add degree and look at features that
  generalize to cubics and beyond.
- Prepare a worked sketch of a factored cubic.

## Facilitator note

This lesson is written to the learner ("you"). The idea to land: **a polynomial is a
sum of powers of x with constant coefficients, and its key features — zeros, turning
points, end behavior — can be read from its factored form and carry meaning in a real
model.** Teach the feature-finding routine explicitly (factor → zeros; degree and
leading coefficient → end behavior; sketch → turning points), then let learners
practice (S-011).

The **intellectual** lens: the degree and leading coefficient are a *shortcut* to the
shape, but they can be justified, not memorized. The **critical-thinking** lens: ask
learners to connect each feature to a real question ("when is the volume zero? when is
it largest?"). The **environment** lens: projectile motion — height as a quadratic in
time — is a standard, openly licensed model (S-435), and the same shape governs other
rise-and-fall processes in nature. The **technology** lens: a graphing tool confirms a
sketch but should not replace the reasoning; read the tool *with* the math, not
instead of it. Preview: Lesson 6 turns to rational functions — ratios of polynomials
that model rates and proportions.

## Procedure

1. **Recall (5 min).** From Grade 9: what shape is a quadratic, and what do its
   x-intercepts tell you? What does the sign of the leading coefficient tell you about
   a parabola?
2. **Meet polynomials (10 min).** A **polynomial** is a sum of terms like aₙxⁿ. Its
   **degree** is the highest power; the **leading coefficient** is the number on that
   term. You already know degree 1 (linear) and degree 2 (quadratic). Today we add
   degree 3 (cubic) and 4 (quartic).
3. **Read the features (15 min).** Worked example: f(x) = (x − 1)(x + 2)(x − 3).
   - **Zeros:** set each factor to zero → x = 1, −2, 3. These are the x-intercepts.
   - **End behavior:** the leading term (after multiplying) is x³, so as x → +∞,
     f(x) → +∞, and as x → −∞, f(x) → −∞ (an odd degree with a positive leading
     coefficient).
   - **Turning points:** a cubic has at most two; sketch the curve rising, falling,
     rising to hit the three zeros in order.
   Mark each feature on the chart.
4. **Model something real (15 min).** The volume of a box made by cutting squares of
   side x from a 10-by-10 sheet is V(x) = x(10 − 2x)². Find: (a) the zeros and what
   each means (x = 0 and x = 5 → zero volume); (b) the end behavior (degree 3,
   leading term +4x³ → up on the right and down on the left — but the real box only
   makes sense on 0 < x < 5, where the base's side 10 − 2x is positive, so the model
   is restricted to that interval). Sketch it.
5. **Guided practice (5 min).** With a partner, sketch g(x) = x²(x − 2) and identify
   its zeros and end behavior.
6. **Close (5 min).** Say in one sentence what the zeros, turning points, and end
   behavior tell you about a real relationship.

## Differentiation

- **Support:** Find zeros of a factored quadratic first, then a factored cubic with
  integer roots.
- **Extension:** Sketch a polynomial from its zeros alone (build the factors), and
  explain why the leading coefficient's sign sets the far ends.

## Assessment

- **Formative (peer + self):** Can the learner find zeros, describe end behavior, and
  locate turning points of a factored polynomial, and state what each means in the
  box model?
- **Portfolio artifact (unit):** The labeled polynomial-features chart with the box
  model, added to the functions toolkit.

## Home connection

Find a curve around you — an arch, a hill, a ball's flight. Ask: where does it cross
the ground (zeros), where does it peak (turning point), and where does it go far from
the middle (end behavior)?

## Resources

- On quadratics as models of projectile motion: OpenStax, "Algebra and
  Trigonometry 2e" (and "College Physics 2e"),
  <https://openstax.org/details/books/algebra-and-trigonometry-2e> (S-435).
- On worked examples and guided practice: Kirschner, Sweller & Clark (2006),
  <https://doi.org/10.1207/s15326985ep4102_1> (S-011).
