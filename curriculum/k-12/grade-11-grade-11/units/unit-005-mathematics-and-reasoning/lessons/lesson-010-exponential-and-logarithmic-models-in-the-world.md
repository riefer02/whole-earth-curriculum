---
kind: lesson
id: L.11.005.10
title: "Exponential and Logarithmic Models in the World"
grade: 11
unit: U.11.005
sequence_in_unit: 10
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S2
objectives:
  - D05.S2.11.02
essential_question: How do I use logarithms to solve for time or rate in real growth and decay — half-life, doubling time, and radioactive dating?
key_vocabulary:
  - doubling time
  - half-life
  - carbon dating
  - radioactive decay
  - solve for time
  - rate
materials:
  - name: Growth-and-decay modeling sheet
    quantity: "1 per learner"
    notes: Worked and practice problems solving for time and rate with logarithms
  - name: Math journal
    quantity: "1 per learner"
materials_low_tech:
  - name: Paper and counters
    notes: Halve a pile repeatedly to see half-life, and count how many halvings reach a small fraction
  - name: A timeline drawn long
    notes: Mark doubling or halving steps to feel how logarithms count the steps
materials_enriched:
  - name: Calculator
    quantity: "1 per learner or pair"
    notes: To evaluate natural and common logs in solving for time and rate
context_variants:
  - context: large-group
    note: Solve one half-life and one doubling-time problem whole-class, then learners work in pairs on a mixed set
  - context: multi-age
    note: Younger learners count halvings/doublings by hand; older learners solve symbolically with logs
  - context: self-directed
    note: A learner follows the worked examples, then solves the practice set and checks each answer by substituting back
  - context: level-grouped
    note: Group by comfort with logs; a ready group solves for an unknown rate rather than time
  - context: outdoor-only
    note: Use a real halving (a shared amount split repeatedly) or a real doubling (a plant's new shoots) and count the steps
assets:
  - path: assets/images/L.11.005.10-exponential-and-logarithmic-models.svg
    alt: "Two panels. Left: a radioactive decay curve falling toward zero with half-life steps marked, and the equation t equals log of the remaining fraction over log of one half. Right: a growth curve rising with doubling time marked, and the equation t equals log of the growth factor over log of one plus r"
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners use logarithms to solve the two great exponential questions — "how long
  until it halves (or doubles)?" and "what rate is at work?" — through half-life,
  doubling time, and radioactive dating. They connect the mathematics to medicine in
  the body, population, and the age of very old things.
cross_cutting_lenses:
  - environment
  - intellectual
  - critical-thinking
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

# Lesson 10 — Exponential and Logarithmic Models in the World

## Summary

Learners use logarithms to answer the two great questions of exponential change:
**"how long until it halves (or doubles)?"** and **"what rate is at work?"** They
solve half-life and doubling-time problems and meet **radioactive dating** as the tool
that reads the age of very old things. The mathematics connects to medicine in the
body, population, and the planet.

## Objectives

- Solve growth and decay problems for time or rate using logarithms, and interpret the
  answers in real contexts such as half-life, doubling time, and radioactive dating.
  _(D05.S2.11.02)_

## Connection

"Half of this medicine leaves your body every six hours." "This population doubles
every generation." "This buried charcoal is 12 000 years old." Each is a question
about *time* in an exponential process, and time is what logarithms unlock: if you
know the factor and the fraction, the log tells you how many steps have passed —
whether the steps are hours, generations, or millennia.

## Materials

- Growth-and-decay modeling sheet
- Math journal

## Preparation

- Copy or draw the problem sheet.
- Retrieval: from Lesson 9, log_b(x) = y means b^y = x; from Grade 10, growth and
  decay factors and half-life (D05.S1.10.01).
- Prepare worked examples for half-life, doubling time, and dating.

## Facilitator note

This lesson is written to the learner ("you"). The idea to land: **to solve b^t = c
for t, take logs of both sides: t = log(c)/log(b).** For half-life, b = ½; for
doubling, b = 2; for growth at rate r, b = 1 + r. Teach the one move — *take the log,
then divide* — with worked examples and guided practice (S-011).

The **environment** lens: half-life is the honest language of how long pollution and
radioactive material persist — carbon-14's 5 730-year half-life is what lets us date
ancient charcoal and climate records. The **intellectual** lens: one move (log both
sides) turns a power equation into a linear one for the unknown time. The
**critical-thinking** lens: learners check every answer by substituting it back into
the original. The **technology** lens: dating labs, medical dose calculators, and
climate models all solve these same log equations under the hood. Distinguish the
mathematics (exact) from the real-world mess (rates are estimates). Preview: Lesson
11 begins geometry with the unit circle.

## Procedure

1. **Recall (5 min).** From Lesson 9, log₁₀(1000) = 3 because 10³ = 1000. Today we
   find the *unknown power* (time) the same way.
2. **The one move (10 min).** To solve b^t = c, take logs of both sides and divide:
   t = log(c)/log(b). Worked example: a medicine halves every 6 hours (b = ½); after
   how many steps is 1/16 left? (½)^t = 1/16, so t = log(1/16)/log(½) = 4 steps, or
   24 hours.
3. **Half-life and dating (15 min).** Carbon-14 has a half-life of about 5 730 years.
   If a sample has ¼ of its carbon-14 left, two half-lives have passed — about 11 460
   years. Worked example: a sample has 30% left. Solve (½)^(t/5730) = 0.30 →
   t = 5730·log(0.30)/log(0.5) ≈ 9 950 years (S-435). This is how the age of ancient
   wood and bone is estimated.
4. **Doubling time and the rule of 70 (10 min).** A population growing at rate r
   doubles when (1 + r)^t = 2, so t = log(2)/log(1 + r). Worked example: at 2% a year,
   t = log(2)/log(1.02) ≈ 35 years. The **rule of 70** approximates this:
   doubling time ≈ 70/(percent rate) ≈ 70/2 = 35 years.
5. **Guided practice (10 min).** With a partner: (a) a pollutant halves every 20 years
   — how long until 1/8 remains? (b) a saving grows 7% a year — when does it double?
   (c) a sample has 12.5% of its carbon-14 left — how old is it? Check by substitution.
6. **Close (5 min).** Say, in one sentence, how a logarithm answers "how long?" for a
   halving or doubling process.

## Differentiation

- **Support:** Solve only whole-number-of-steps problems first (½, ¼, ⅛), then move
  to logs.
- **Extension:** Solve for an unknown rate: given a quantity triples in 20 years, find
  the yearly rate.

## Assessment

- **Formative (peer + self):** Can the learner solve a growth/decay equation for time
  with a logarithm and interpret the result in a half-life, doubling-time, or dating
  context, with a substitution check?
- **Portfolio artifact (unit):** The completed modeling sheet, added to the pattern
  toolkit.

## Home connection

Estimate a doubling time near home — how long a plant, a savings amount, or a family
tradition's scale doubles — and check it with the rule of 70.

## Resources

- On worked examples and guided practice: Kirschner, Sweller & Clark (2006),
  <https://doi.org/10.1207/s15326985ep4102_1> (S-011).
- On carbon-14 dating and log solutions: OpenStax, *Algebra and Trigonometry* (S-435);
  on climate-record dating context: IPCC (S-005).
