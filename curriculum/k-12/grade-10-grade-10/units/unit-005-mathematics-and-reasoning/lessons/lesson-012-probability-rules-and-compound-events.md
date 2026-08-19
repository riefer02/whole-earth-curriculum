---
kind: lesson
id: L.10.005.12
title: "Probability Rules and Compound Events"
grade: 10
unit: U.10.005
sequence_in_unit: 12
domain:
  - D05
pillar:
  - P3
strand:
  - D05.S4
objectives:
  - D05.S4.10.02
essential_question: How do the addition and multiplication rules combine the chances of "this or that" and "this and that," and how do I lay out a compound event so nothing is missed or double-counted?
key_vocabulary:
  - sample space
  - event
  - compound event
  - addition rule
  - multiplication rule
  - mutually exclusive
  - two-way table
  - tree diagram
materials:
  - name: Probability-rules chart
    quantity: "1 per learner"
    notes: The addition rule (with and without overlap), the multiplication rule, and a two-way table and tree diagram example
  - name: Two dice or spinners
    quantity: "1 set per pair"
    notes: To generate compound events by hand
  - name: Math journal
    quantity: "1 per learner"
materials_low_tech:
  - name: Pebbles, seeds, or coins
    notes: Toss two coins many times and tally outcomes to feel a compound event by hand
  - name: A two-way table drawn in the ground
    notes: Mark rows and columns for two events and fill cells by tossing found objects
materials_enriched:
  - name: A spreadsheet or calculator
    quantity: "1 per learner or pair"
    notes: To simulate many trials of a compound event and compare the frequency to the computed probability
context_variants:
  - context: large-group
    note: Build the two-way table whole-class, then learners toss in pairs and compare their tallies to the computed probabilities
  - context: multi-age
    note: Younger learners list outcomes of two coins and count; older learners apply the addition and multiplication rules and handle overlap
  - context: self-directed
    note: A learner follows the worked examples, then computes and simulates a compound event and compares frequency to probability
  - context: level-grouped
    note: Group by comfort with fractions; a ready group extends to three events and to the general addition rule with overlap
  - context: outdoor-only
    note: Toss found objects (two different seeds, two coins) outdoors and tally compound outcomes on a ground-drawn table
assets:
  - path: assets/images/L.10.005.12-probability-rules.svg
    alt: A two-way table and a branching tree diagram for a compound event (two coin tosses), with the addition rule for or and the multiplication rule for and written beside them, all in grayscale-printable lines
    kind: image
    source: original
duration_minutes: 55
summary: >-
  Learners formalize the rules for combining probabilities — the addition rule for
  "or" (watching for overlap) and the multiplication rule for "and" — and lay out
  compound events with two-way tables and tree diagrams so nothing is missed or
  double-counted. They meet the long history of reasoning about games of chance.
cross_cutting_lenses:
  - intellectual
  - critical-thinking
  - global
  - ethics
assessment_type:
  - formative
  - self
  - peer
  - portfolio
status: draft
author: lesson-author
last_updated: 2026-08-19
---

# Lesson 12 — Probability Rules and Compound Events

## Summary

Learners formalize the rules for combining probabilities — the **addition rule** for
"or" (watching for overlap) and the **multiplication rule** for "and" — and lay out
**compound events** with two-way tables and tree diagrams so nothing is missed or
double-counted. They meet the long history of reasoning about games of chance.

## Objectives

- Use probability rules to compute probabilities of compound events. _(D05.S4.10.02)_

## Connection

If it rains on 30% of days and is windy on 20% of days, what is the chance of a rainy
*or* windy day? You cannot just add 30% and 20% — days that are both would be counted
twice. And what is the chance that a coin and a die come up "heads" *and* "six"? These
"or" and "and" questions are everywhere: the chance of one treatment working or
another, the chance of two machines both failing, the chance a bet pays off. The rules
that answer them are two small, careful moves — and the habit of laying every outcome
out so you can *see* what you are counting is what keeps the answer honest.

## Materials

- Probability-rules chart
- Two dice or spinners
- Math journal

## Preparation

- Copy or draw the probability-rules chart.
- Retrieval: from Grade 7/8, simple and compound events (D05.S4.07.02); from Grade 9,
  two-way tables (D05.S4.09.02). Today we formalize the "or" and "and" rules.
- Prepare worked examples for the addition rule (with and without overlap) and the
  multiplication rule.

## Facilitator note

This lesson is written to the learner ("you"). The idea to land: **the addition rule
P(A or B) = P(A) + P(B) − P(A and B) handles "or" (subtracting the overlap), the
multiplication rule handles "and" (for independent events, P(A and B) = P(A) × P(B)),
and two-way tables and tree diagrams lay out compound events so the count is honest.**
Teach the rules with worked examples (S-011), then let learners compute and simulate.

The **global** lens: reasoning about chance has a long, human history. Dice are
ancient — found in Egypt, India, and Mesopotamia, used across many cultures (S-300);
and the careful *study* of chance began with questions from games in 17th-century
Europe, answered in the correspondence of Pascal and Fermat (S-301). Hold that as
*one* starting point among the many peoples who gambled, divided, and predicted
before and since. The **intellectual** lens: the rules are counting, done carefully —
the subtraction in the addition rule is just "don't count the overlap twice." The
**critical-thinking** lens: always lay out the sample space before computing, and ask
whether the events overlap or not. The **ethics** lens: the same rules that keep a
game fair can be hidden inside a rigged one; reading probability honestly protects
people from being cheated. Preview: Lesson 13 turns to conditional probability and
why order and information change the odds.

## Procedure

1. **Recall (5 min).** From earlier grades, what is the probability of rolling a 6 on
   one fair die? Of tossing heads on one coin? What does it mean for outcomes to be
   equally likely?
2. **Meet the addition rule (15 min).** The **sample space** is every possible
   outcome; an **event** is a set of outcomes. For "A or B":
   P(A or B) = P(A) + P(B) − P(A and B). If A and B cannot both happen (**mutually
   exclusive**), the overlap is 0. Worked example: one die — P(even or ≥ 5) =
   P(even) + P(≥5) − P(even and ≥5) = 3/6 + 2/6 − 1/6 = 4/6 = 2/3.
3. **Meet the multiplication rule (10 min).** For "A and B" when the events do not
   affect each other (independent — previewed fully next lesson): P(A and B) =
   P(A) × P(B). Worked example: a coin and a die — P(heads and six) = (1/2)(1/6) =
   1/12.
4. **Lay it out (15 min).** Build a **two-way table** for two coin tosses (HH, HT,
   TH, TT — four equally likely outcomes) and a **tree diagram** for the same. Use them
   to find P(at least one heads) = 3/4, and check it against the addition rule
   (P(first heads) + P(second heads) − P(both) = 1/2 + 1/2 − 1/4 = 3/4). Then toss two
   coins 20 times and tally — does the frequency approach the probability?
5. **Close (5 min).** Say in one sentence what the subtraction in the addition rule
   is for, and when the multiplication rule applies.

## Differentiation

- **Support:** List all four outcomes of two coins first and count directly before
  using the formulas.
- **Extension:** Compute P(sum of two dice is 7 or 11), laying out the 36 outcomes in a
  table to avoid double-counting.

## Assessment

- **Formative (peer + self):** Can the learner apply the addition and multiplication
  rules correctly and lay out a compound event in a table or tree without missing or
  double-counting?
- **Portfolio artifact (unit):** The probability-rules chart with the two-coin
  experiment and tally, added to the data-and-chance toolkit.

## Home connection

Play a small game of chance at home with two coins or dice. Before playing, compute
the probability of each outcome, then compare your predictions to what happens. Explain
the "or" and "and" rules you used.

## Resources

- On the antiquity of dice: Encyclopaedia Britannica, "Dice,"
  <https://www.britannica.com/topic/dice> (S-300).
- On the origin of probability theory in games of chance (Pascal and Fermat):
  Encyclopaedia Britannica, "Probability and statistics,"
  <https://www.britannica.com/science/probability> (S-301).
- On worked examples and guided practice: Kirschner, Sweller & Clark (2006),
  <https://doi.org/10.1207/s15326985ep4102_1> (S-011).
