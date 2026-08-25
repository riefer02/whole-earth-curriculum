# Audiences

The people the website must serve, and how the site should meet them. This is the
contract for all public-facing website work, in the same way `AGENTS.md` is the
contract for content work. The curriculum itself does not change for any audience;
only the *door* through which a person enters, and the *register* in which they are
addressed, changes.

## The governing principle: one curriculum, three doors, one hidden room

The curriculum is a single source of truth. Different audiences need:

- **different entry points** (what they see first),
- **different language** (words, not a different message),
- **different proof** (what convinces them it is real),
- **the same facts underneath** (traceability never lies).

The internal structure — pillars, domains, strands, standards, IDs — is a *reference
manual* for curriculum writers. It is **not** the front door. It must remain fully
reachable, but demoted to a clearly-labeled "Reference / for contributors" area.

## The four audiences

### 1. The Curious — the general public (highest volume, highest importance)

**Who.** Parents, students, journalists, neighbors, people who heard about the
project and want to know whether it is real and whether it is good.

**Job-to-be-done.** "Tell me what this is, what it stands for, and whether I should
care."

**The questions they ask.**
- What is this? What does it actually teach my child?
- Does it stand for something good, or is it an ideology being pushed on kids?
- Who made it? Can I trust it? Is it free?
- Can I actually use it at home, today?

**Register.** Plain, warm, values-forward. No IDs. No "strand," "domain," or
"traceability chain." Short sentences. Concrete examples. Real lesson excerpts.

**The proof they need.** A quotable statement of belief, a few beautiful sample
lessons, real art, and a clear "this is free and open" signal.

**Entry points.** Homepage hero → "I'm curious" → plain-language ideology page +
sample lessons.

### 2. Teachers — the classroom user

**Who.** Classroom teachers, homeschoolers, tutors, and self-directed learners using
the curriculum day-to-day.

**Job-to-be-done.** "Give me Grade N, the next unit, printable, right now — and tell
me how to teach it."

**The questions they ask.**
- Where is the next lesson for my grade this week?
- How long does it take? What materials do I need? What if I have nothing (no-tech)?
- Can I print it? Can a kid follow it without me?
- Is it any good — does it build on the last grade and set up the next?

**Register.** Practical, fast, task-oriented. Lead with grade → subject → unit →
lesson. Surface duration, materials, the low-tech tier, and print immediately.

**The proof they need.** Speed and structure — a "Teach today" path, copyable links
to hand a lesson to a colleague or a family, and the low-tech/no-cost tier front and
center.

**Entry points.** Homepage → "I'm a teacher" → grade picker → "next lesson this
week."

### 3. Leaders & funders — administrators, policymakers, grantmakers

**Who.** School and district leaders, education ministries, politicians,
philanthropies, and grant officers deciding whether to fund or adopt.

**Job-to-be-done.** "Why should we adopt or fund this? What is the evidence, the
cost, the scale, and the risk?"

**The questions they ask.**
- What problem does this solve, and for whom?
- What is the evidence base? How is quality guaranteed?
- How does it map to the standards or frameworks we already answer to?
- What does adoption look like — cost, training, rollout?
- Is this politically safe and globally legitimate?

**Register.** Evidence, systems, and risk-reduction. Numbers, sources, alignment
mapping. Lead with outcomes and trust, not pedagogy.

**The proof they need.** The evidence table from [`grant-pitch.md`](grant-pitch.md),
the traceability/QA story, the license, and a credible "where it stands today."
The `grant-pitch.md` content must be promoted from a buried repo doc into a polished
public page.

**Entry points.** Homepage → "I'm a leader / funder" → evidence + adoption page.

### 4. Contributors — the hidden room (keep, do not remove)

**Who.** The curriculum writers, reviewers, and engineers who build the thing. This
is the *internal* audience the current site already serves well.

**Job-to-be-done.** "Let me inspect and edit the source of truth — every ID, every
standard, every lesson, every doc."

**Register.** Full taxonomy, IDs, schemas, the traceability chain, the validator.

**Entry points.** `/standards/` and `/docs/` — relabeled "Reference / for
contributors" and demoted from primary navigation.

## Language registers at a glance

| Concern | Curious | Teacher | Leader/Funder |
|---------|---------|---------|---------------|
| "Pillar" | "four parts of a whole person" | "four dimensions" | "four dimensions of a whole learner" |
| "Strand / domain" | omitted | "subject" | "content area" |
| "Traceability chain" | omitted | "everything is aligned" | "auditable alignment, grade by grade" |
| Standard IDs (`D05.S2.03.2`) | never shown | shown small, muted | shown as evidence of rigor |

## Progressive disclosure of IDs

The ID scheme (`Dxx.Sn.<grade>.<n>`, `U.gg.nnn`, `L.gg.nnn.nn`) is a distraction to
everyone except contributors. The rule:

- Human names lead everywhere by default ("Grade 3 · Body, Wellness & Movement").
- IDs appear as a muted, copyable chip — not as the headline.
- A global "Show IDs" toggle (like the existing theme toggle) reveals full IDs for
  writers, and remembers the choice.

## User stories (the acceptance criteria for the site)

- As a curious parent, I can understand what the program stands for in under a
  minute, without encountering a single ID or jargon term.
- As a curious parent, I can open one sample lesson and judge its quality myself.
- As a Grade 4 teacher, I can reach my next lesson in two clicks and print it.
- As a teacher in a bare classroom, I can immediately see the low-tech / no-cost
  version of any lesson.
- As a teacher, I can copy a link to a specific lesson and share it.
- As a grant officer, I can find the evidence, the license, and the "where it stands
  today" status in one page.
- As a curriculum writer, I can still reach any standard by ID and see every lesson
  that teaches it.
- As a writer, I can see, from any standard, which units and lessons enact it (the
  reverse of the current one-way chain).
