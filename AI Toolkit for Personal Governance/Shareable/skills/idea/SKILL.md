---
name: idea
description: Evaluate a new idea end to end and force a disposition on it. Use when Adrian brings a new idea; for the weekly rhythm use /check-in, for a fast task list use /routine.
---

# Idea

Trigger 2 of three. Rare and allowed to be expensive — which is why Steps 1 and 2 exist to make the
**cheap kill** available before five advisors and an opposition check are spent on an idea. Its job is
to spot the challenge early — taking on too much, not following through, working the wrong project —
before the idea consumes a slot and Adrian's attention.

## Process

### Step 1 — Test potential value

Identify the owning department and run its quick value test from `Advisors/<Dept>/_skills/`. The test
is on the idea's **potential value**.

**Capacity belongs at Step 8.** Working an idea through both validates it and gets it out of Adrian's
head; a capacity gate at the door destroys both benefits before they happen.

A failed quick test is the first **cheap kill** — stop here and record it at Step 9. Most ideas should
die at this price.

Complete when the owning department is named and its quick value test has returned a pass or a fail.

### Step 2 — Owning advisor grills to understand

The owning advisor (its minister agent) grills Adrian to understand the idea — what it is, what it
would take, what it depends on. **One question at a time, waiting for each answer** — a batch of
questions gets shallow answers to all of them.

This is where the **cheap kill** does most of its work: most ideas that survive Step 1 die here.

Complete when the advisor can state the idea, its cost and its dependencies in Adrian's own terms,
with no question outstanding that it would need answered before Step 3.

### Step 3 — All advisors ask questions, blind and parallel

Launch all five minister agents **in parallel, in a single batch**.

The brief each one receives is **verbatim**: the idea as Adrian stated it, plus his answers from
Step 2, in his words. The orchestrating skill has read the manifesto; the brief carries Adrian's words
alone. Brief contamination is a real failure.

Each advisor asks **blind** — it does not see what the other four asked, and assumes nothing about what
the idea will turn out to require in its domain.

Complete when all five have returned their questions.

### Step 4 — Adrian answers

Present every advisor's questions **verbatim**, department by department, each under its own heading.
Adrian answers.

Complete when every question from all five is answered or explicitly declined — a declined question
carries into Step 5 as a known gap.

### Step 5 — All advisors rule, blind and parallel

Launch all five again, **in parallel, in a single batch**, each blind to the other four's rulings.
Each returns its three-part output contract: a position (support / oppose / conditional) with the cost
named, any remaining questions, and any data-gap escalation.

Complete when all five have returned all three parts.

### Step 6 — Present the five positions

Present all five positions **verbatim**, side by side, each under its own heading. Compressing five
positions into a paragraph is arbitration wearing a different hat — it decides which tensions matter,
which is Adrian's call at Step 8.

Complete when all five appear in full, the directly conflicting ones included.

### Step 7 — Opposition raises the conflicts

Invoke the `opposition` skill with the five positions and `PM/manifesto.md`. It runs every session,
including the ones where nothing looks like a conflict, and it raises both kinds — a position colliding
with the manifesto, and two positions that cannot both be acted on.

This is the mechanism between Step 6 and Step 8. Adrian settles each conflict here, one at a time, so
the disposition he forces next is taken with the tensions already named rather than in spite of them.

Complete when `opposition` has returned and every conflict it raised is settled or recorded open.

### Step 8 — Adrian resolves

Adrian resolves. **Disposition is forced — exactly one of:**

- **Commit** — the idea gets a slot
- **Park-with-a-trigger** — parked, with an explicit condition that would bring it back. A park with no
  trigger and no date is a kill nobody wrote down
- **Kill** — the idea does not proceed

**This is where capacity applies.** The idea's potential value and cost are known from Steps 1–7, so
"what comes off the board to make room" is now answerable — it was not at Step 1.

"Let's think about it" resolves to park-with-a-trigger, with its trigger named, or it is not yet a
resolution.

Complete when exactly one of the three is recorded, with its reason.

### Step 9 — Write the output

Write to the owning department's folder, matching the disposition:

- **Commit** — the idea takes its slot in one of two shapes:
  - **A project** — a body of work with an end. Run `project-init` in the owning department
  - **A commitment** — a recurring behaviour. A row in the department manifesto's Commitments table
    carrying its time element and agency grade, a dated entry in that manifesto's Amendment Log, and a
    tracking line in the department's `_ai/state.md`

  A commitment that never reaches `_ai/state.md` is invisible to `check-in`, which finds its questions
  by subtracting dates in that table — the idea would commit and then go silent permanently.
- **Park-with-a-trigger** — a decision recording the trigger and the date
- **Kill** — a decision recording the reason

Then write the session record to `PM/reviews/`, including the disposition and its reason — a kill is
still a decision worth the history.

Complete when both the department artifact and the `PM/reviews/` record are written.
