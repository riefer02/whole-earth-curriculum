---
kind: lesson
id: L.12.005.02
title: "Approximation and the Shape of Change"
grade: 12
unit: U.12.005
sequence_in_unit: 2
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S1
objectives:
  - D05.S1.12.01
essential_question: How does the idea of a limit turn an average rate of change into the rate at a single instant?
key_vocabulary:
  - average rate of change
  - secant
  - tangent
  - instantaneous rate
  - slope
  - derivative (informal)
  - approximation
materials:
  - name: Rate-of-change diagram sheet
    quantity: "1 per learner"
    notes: A curve with a secant and a tangent, plus a table for shrinking time intervals
  - name: Math journal
    quantity: "1 per learner"
materials_low_tech:
  - name: A curved track or a rolling object
    notes: Roll a ball and notice that "average speed over the whole trip" hides the fast and slow moments
  - name: String and a ruler
    notes: Lay a string against a drawn curve to see a short segment look nearly straight
materials_enriched:
  - name: Spreadsheet or graphing tool
    quantity: "1 per learner or pair"
    notes: Compute average slopes over shorter and shorter intervals and watch them settle on one number
context_variants:
  - context: large-group
    note: Build the average-slope table whole-class, then pairs compute one shrinking interval each and compare
  - context: multi-age
    note: Younger learners describe where a trip is fastest and slowest; older learners compute secant slopes and the limit
  - context: self-directed
    note: A learner follows the worked example, fills the table, and writes what the slopes are heading toward
  - context: level-grouped
    note: A ready group also explains why a smooth curve is required (a corner has no single tangent)
  - context: outdoor-only
    note: Roll a ball down a slope and mark distances at equal times, then compute the average speed of each stretch
assets:
  - path: assets/images/L.12.005.02-approximation-and-the-shape-of-change.svg
    alt: "A curve with a secant line cutting across two points and a tangent line touching at one point, labeled 'average slope' and 'instantaneous slope,' with a note that shrinking the interval turns the secant into the tangent. Labels carry the meaning, so it prints in grayscale."
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners turn the limit idea into a rate of change: the average slope over an interval
  (a secant) shrinks toward the slope at a single instant (a tangent), which is the
  informal derivative. They connect it to speed at a moment, a plant's growth, and a
  population's changing rate — and to the long human habit of approximating quantities
  ever more finely, from Babylonian root tables to the calculus written down in Europe.
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

# Lesson 2 — Approximation and the Shape of Change

## Summary

Learners turn the limit idea into a **rate of change**: the **average slope** over an
interval (a **secant**) shrinks toward the slope at a single instant (a **tangent**) — the
informal **derivative**. They connect it to speed at a moment, a plant's growth, and a
population's changing rate, and to the long human habit of approximating quantities ever
more finely, from Babylonian root tables to the calculus written down in Europe.

## Objectives

- Apply the idea of a limit and of continuity to describe change and approximation,
  and use average rates of change to approach an instantaneous rate. _(D05.S1.12.01)_

## Connection

A speedometer reads "60" at a single moment, yet any *measured* speed is distance over
time — an average. The number on the dial is the limit of those averages as the time
interval shrinks toward zero. The same move — shrink the interval, watch what the slope
approaches — describes a plant's fastest growth week, a river's peak flow, or a fever's
peak. Approximating ever more finely is one of the oldest and most universal human moves
in mathematics.

## Materials

- Rate-of-change diagram sheet
- Math journal
- Low-tech: curved track or rolling object, string and ruler

## Preparation

- Copy or draw the curve with secant and tangent; prepare the shrinking-interval table.
- Retrieval: from Lesson 1, "closer and closer" (the limit idea); from Grade 11, slope as
  rise over run. Today we shrink the run to zero and watch the slope settle.
- Prepare the worked example (a distance-time curve) to model first (S-011).

## Facilitator note

This lesson is written to the learner ("you"). The idea to land: **an average rate of
change (secant slope) becomes an instantaneous rate (tangent slope) in the limit as the
interval shrinks to a point — this is the informal derivative, and it needs the curve to
be continuous and smooth.** Teach the worked example explicitly — build the table of
shrinking intervals, then let the number settle (S-011). The limit is what makes "at an
instant" meaningful rather than mystical.

The **ethics** lens: honesty about what a speedometer *is* — a limit, not a direct
measurement — is honesty about what numbers can and cannot claim. The **egalitarianism**
lens: the derivative needs no special talent, only the shared move of shrinking an
interval and watching. The **global** lens: the habit of approximating a value ever more
finely is ancient and worldwide — the Babylonian tablet YBC 7289 (c. 1800–1600 BCE)
carries √2 correct to about six decimal places (S-430), and the calculus we inherit was
written up in 17th-century Europe by Newton and Leibniz (S-302) on top of much older,
multi-rooted work (S-272, S-429). The **technology** lens: the derivative is the working
language of physics, engineering, and the simulation engines behind every screen. The
**environment** lens: a population's *growth rate* is a derivative — it rises, then
slows toward zero as the population nears its carrying capacity (S-436). Preview:
Lessons 3–4 turn to reasoning about the *size* of large systems.

## Procedure

1. **Recall (5 min).** From Lesson 1, name what a limit is. From Grade 11, slope is
   rise ÷ run. Today the run shrinks toward zero.
2. **Average speed hides the moment (8 min).** A ball rolls 3 m in 3 s: average speed is
   1 m/s — but it was faster at the start and slower at the end. An **average rate of
   change** over an interval is one number; it cannot see the *instant*. To see the
   instant, shrink the interval.
3. **Worked example — shrinking the interval (15 min).** A distance-time curve passes
   through (2, 4) and, later, (5, 13). The **secant** slope between them is
   (13 − 4)/(5 − 2) = 3. Now take points closer to (2, 4): at t = 3, 2.5, 2.1, 2.01,
   compute the slope each time. The slopes settle toward a single number — that number is
   the **instantaneous rate**, the slope of the **tangent** at (2, 4). Write: the limit
   of the secant slopes is the tangent slope.
4. **Name it (6 min).** The instantaneous rate is the **derivative** (informally): how
   fast a quantity changes *at a moment*. A smooth curve has one; a corner does not (there
   is no single tangent).
5. **Guided practice (12 min).** With a partner, take a curve and two points; compute the
   secant slope; move the second point closer; predict the limit; compare with the
   tangent drawn on the sheet. Check each other's arithmetic.
6. **Retrieve and connect (8 min).** In your journal, write one real quantity whose
   *rate of change* matters (a river's flow, a plant's height, a battery draining) and
   one sentence on why "average over a long stretch" is not enough.
7. **Close (2 min).** Say — or write, sign, gesture, or use AAC to express — what the
   derivative approximates and what it is the limit of.

## Differentiation

- **Support:** Compute only the secant slope for one wide interval, then one narrow one,
  and say which is closer to "the moment."
- **Extension:** Explain why a graph with a sharp corner has left-hand and right-hand
  secant slopes that settle on *different* numbers, so no single tangent exists.
- **Number access (dyscalculia):** Pre-fill the step-3 shrinking-interval table (t = 3, 2.5,
  2.1, 2.01) with the slope column left blank, so the learner copies the worked pattern
  rather than re-deriving each rise and run; offload the rise-over-run division to a partner
  or calculator; and take the verbal route — say where the ball is fastest and slowest, then
  describe in words or a sketch how the average slope "settles" on the slope at a single
  instant, without computing any quotient.
- **Communication access:** Every spoken step — saying, naming, reading aloud, discussing,
  or closing — can be done in writing, sign, gesture, or AAC instead. Learners who are
  non-speaking, d/Deaf, hard-of-hearing, or who use AAC complete every task in their
  preferred mode; no step requires producing or hearing sound.

## Assessment

- **Formative (peer + self):** Can the learner compute a secant slope, shrink the
  interval, and state (in speech, writing, sign, or AAC) what the slope is approaching
  (the tangent slope)?
- **Portfolio artifact (unit):** The shrinking-interval table with the limit named, added
  to the math journal.

## Home connection

Watch something change at home — a kettle heating, a plant growing, a phone charging.
Describe in one sentence where the rate is fastest and one where it is slowest, and what
"at a moment" would mean for it.

## Resources

- On worked examples and guided practice: Kirschner, Sweller & Clark (2006) (S-011).
- On the Babylonian √2 approximation (YBC 7289): S-430; on the calculus of Newton and
  Leibniz and its multi-rooted history: Newton, *Principia* (S-302); Boyer & Merzbach,
  *A History of Mathematics* (S-429); Joseph, *The Crest of the Peacock* (S-272).
- On a population's growth rate slowing near carrying capacity: Britannica — Carrying
  capacity (S-436).
