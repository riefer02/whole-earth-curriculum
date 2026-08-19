---
kind: lesson
id: L.10.005.03
title: "Exponential Growth and Decay: Base and Rate"
grade: 10
unit: U.10.005
sequence_in_unit: 3
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S1
objectives:
  - D05.S1.10.01
essential_question: How do the base and the rate of a growth or decay process tell me how fast something doubles or fades, and how do I use roots to solve for the unknown?
key_vocabulary:
  - growth factor
  - decay factor
  - growth rate
  - half-life
  - doubling time
materials:
  - name: Growth-and-decay problem sheet
    quantity: "1 per learner"
    notes: Worked and practice problems for doubling, half-life, and finding an unknown base or time with roots
  - name: Math journal
    quantity: "1 per learner"
materials_low_tech:
  - name: Counters, seeds, or pebbles
    notes: Start with a pile and repeatedly multiply (double, halve) to see the factor at work by hand
  - name: A clock or watch
    notes: To time and narrate a real halving (e.g., a candle, a shadow, a shared amount)
materials_enriched:
  - name: Calculator or spreadsheet
    quantity: "1 per learner or pair"
    notes: To check growth over many steps and see the curve
context_variants:
  - context: large-group
    note: Solve one worked example whole-class, then learners work in pairs on a mixed set and compare the key step (finding the base with a root)
  - context: multi-age
    note: Younger learners compute a few forward steps by repeated multiplication; older learners solve backward for time or base using roots
  - context: self-directed
    note: A learner follows the worked examples, then solves the practice set and checks each answer by substituting back
  - context: level-grouped
    note: Group by fluency with roots from Lesson 2; a ready group extends to a fractional rate and a three-step decay problem
  - context: outdoor-only
    note: Model growth and decay with natural quantities — a doubling plant, a halving shadow — and record each step as a factor
assets:
  - path: assets/images/L.10.005.03-growth-and-decay-base-and-rate.svg
    alt: A paired diagram of exponential growth (a doubling sequence shown as a rising curve and as 1, 2, 4, 8) and exponential decay (a halving sequence shown as a falling curve), with the growth factor b = 1 plus r and decay factor b = 1 minus r labeled
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners connect the base of an exponential expression to a growth or decay factor,
  distinguish growth rate from growth factor, and use roots to solve backward for an
  unknown base or time in doubling and half-life problems. They practice with
  concrete growth and decay scenarios and check answers by substitution.
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

# Lesson 3 — Exponential Growth and Decay: Base and Rate

## Summary

Learners read the **base** of an exponential expression as a growth or decay factor,
separate the **rate** from the **factor**, and use **roots** to solve backward for an
unknown base or time in doubling and half-life problems. They work concrete growth
and decay scenarios and check answers by substituting back.

## Objectives

- Use properties of exponents and roots to solve problems involving exponential
  growth and decay — finding the base or the time from a known factor using roots.
  _(D05.S1.10.01)_

## Connection

A medicine's instructions might say "half leaves your body every six hours"; a savings
notice says "5% a year"; a biologist says "this culture doubles every three hours."
These are the same sentence in different clothes: something is being *multiplied by a
fixed factor, again and again*. If it doubles, the factor is 2; if it halves, the
factor is ½. The factor and the rate are two ways of naming the same thing — a 5%
growth is a factor of 1.05, a 5% decay is a factor of 0.95. Once you can read that
factor, you can also work *backward*: "how long until it halves?" or "what rate makes
it double in ten years?" — and roots are the tool that unlocks the backward question.

## Materials

- Growth-and-decay problem sheet
- Math journal

## Preparation

- Copy or draw the problem sheet.
- Retrieval: from Lesson 2, roots and rational exponents; from Grade 9, exponential
  functions in context (D05.S2.09.01). Today we solve *backward* with roots.
- Prepare worked examples for doubling, half-life, and finding an unknown base.

## Facilitator note

This lesson is written to the learner ("you"). The idea to land: **in exponential
change, the base b is a factor — b = 1 + r for growth, b = 1 − r for decay — and roots
let us solve backward for the base or the number of steps.** Teach the two directions
explicitly: *forward* (apply the factor repeatedly) and *backward* (take a root to
find the factor, or reason about the number of steps). Use worked examples and guided
practice (S-011).

The **intellectual** lens: the same equation bⁿ = c is read forward ("apply b, n
times") and backward ("what b, or what n, gives c?"). The **critical-thinking** lens:
learners check every backward answer by substituting forward — "does 1.05⁷ actually
give about 1.4?" The **environment** lens: half-life and doubling are the real
language of pollution decay, medicine in the body, and population pressure — reading
them honestly matters for the planet. The **technology** lens: sensors and models
report growth and decay as rates; converting a rate to a factor is the first step to
understanding what a device or dashboard is telling you. Preview: Lessons 7 and 8
build these same factors into full exponential *functions* and models.

## Procedure

1. **Recall (5 min).** From Lesson 2, what does x^(1/n) mean? If x³ = 8, what is x?
   Today we solve the same shape of question in real growth and decay.
2. **Meet the factor (10 min).** A quantity that changes by a fixed *factor* each step
   is exponential. **Growth factor** b = 1 + r (a 5% growth → b = 1.05). **Decay
   factor** b = 1 − r (a 5% decay → b = 0.95). A **half-life** is decay with b = ½;
   **doubling time** is growth with b = 2. Worked example: a culture doubles every
   3 hours. Starting from 100, after 3, 6, 9 hours it is 200, 400, 800 — that is
   100 · 2¹, 100 · 2², 100 · 2³.
3. **Solve backward with roots (15 min).** Watch two worked examples:
   - *Find the base:* a quantity grows to 8 times its size in 3 steps. Then b³ = 8, so
     b = ∛8 = 2 — it doubles each step.
   - *Find the steps:* a quantity halves each step; after how many steps is it 1/16 of
     its start? ½ⁿ = 1/16, so n = 4 steps.
   Notice the root undoes the power (Lesson 2).
4. **Guided practice (15 min).** With a partner: (a) a medicine has a half-life of
   6 hours; after 24 hours, what fraction remains? (b) a population grows 50% a year;
   what is the yearly factor? (c) an amount grows by a fixed factor each year and
   triples in 2 years; find the factor. Check each by substituting forward.
5. **Independent practice (5 min).** In your journal, write one growth and one decay
   scenario from your own life, give each a factor, and solve one backward question
   about it with a root.
6. **Close (5 min).** Say the difference between a *rate* (5%) and a *factor* (1.05),
   and name the tool that solves backward for the factor.

## Differentiation

- **Support:** Work only forward first (compute 2–3 steps by repeated
  multiplication), then solve for a whole-number base (b³ = 8).
- **Extension:** Solve for a base with a fractional exponent, e.g. b⁴ = 10, giving
  b = 10^(1/4), and interpret the answer.

## Assessment

- **Formative (peer + self):** Can the learner state the factor from a rate (and
  vice versa) and solve a backward growth/decay problem using a root, with a
  substitution check?
- **Portfolio artifact (unit):** The completed problem sheet with the self-written
  growth and decay scenarios, added to the number toolkit.

## Home connection

Find something at home that doubles or halves — yeast rising, a battery draining, a
prescription dose. Write its factor, and predict where it will be after three steps.
Check your prediction if you can.

## Resources

- On worked examples and guided practice: Kirschner, Sweller & Clark (2006),
  <https://doi.org/10.1207/s15326985ep4102_1> (S-011).
