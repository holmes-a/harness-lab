---
name: manifesto
description: Grills the PM manifesto into existence, and runs dated, reasoned amendments to it thereafter. Use when the manifesto has never been filled in, or when a decision or an opposition collision calls for a change to it.
---

# Manifesto

Produces and maintains `PM/manifesto.md` — the one file this skill writes. Department manifestos belong
to `appoint-advisor`.

Every target, commitment, slot rule, not-yet item and balance-plan setting in that file comes from
Adrian, through the interview. A plausible-looking target is a failure rather than a partial success:
it will be read later as something he agreed to.

`grill-me-as` runs the interview. This skill selects the mode, names what the interview must cover, and
records the result.

## Selecting the mode

Read `PM/manifesto.md`. Placeholder comments throughout mean **Mode A**; sections holding real content
mean **Mode B**.

Complete when one mode is named.

## Mode A — First fill

### Step 1 — Invoke `grill-me-as` as the PM seat

The seat that weighs the five departments against each other and commits to a manifesto they will all
be measured against.

Name the write target: the section of `PM/manifesto.md` each question belongs to.

A first fill is a **silent** grilling in `grill-me-as`'s terms — no manifesto exists yet to read a
recommendation down from, so every question here is put without a proposal attached.

Complete when the interview is running under that role and target.

### Step 2 — Cover every section, writing each as it resolves

Five sections come from the grilling: **Targets**, **Commitments**, **Slot Rule**, **Not-Yet List**,
**Balance Plan**. Replace each placeholder body with Adrian's words at the moment that section settles,
rather than at the end of the session.

**Binding Constraints** stays a pointer to root `CLAUDE.md` — confirm it, and leave it pointing.

Two rows carry required fields:

- A **Commitment** needs its **time element** (when its clock resets, so a check-in detects silence by
  date subtraction) and its **agency grade** — `mine`, `shared` or `influence`.
- A **Not-Yet** item needs its **trigger to revisit**. An item with no trigger is indistinguishable
  from a decision nobody made.

Complete when all five grilled sections hold Adrian's words, every Commitment row carries both fields,
every Not-Yet row carries its trigger, and Binding Constraints still points at root `CLAUDE.md`.

### Step 3 — Seed the Amendment Log

One entry: `**Date:** [today], **Amendment:** Initial manifesto written, **Reason:** first fill via the
manifesto grilling.`

Complete when the log holds exactly that one entry.

## Mode B — Amendment

The manifesto changes only by explicit, dated, reasoned amendment. Reversing a ruling is a decision
made in the moment; amending the manifesto is a separate, recorded act. Were amending easy, the
manifesto would become a log of what Adrian did anyway, and the system would quietly disable its own
alarm.

### Step 1 — Establish the reason

Most often an `opposition` collision Adrian resolved by choosing *amend* over *reverse*, or a run of
rulings against the same line that `opposition` Step 5 reported. Confirm the reason in Adrian's own
words before anything changes.

Complete when Adrian has stated the reason.

### Step 2 — Invoke `grill-me-as` as the PM seat

Work out what the amendment should actually say, stress-testing the phrasing offered rather than
settling on the first one.

Name the write target: the section being amended, plus the Amendment Log.

Complete when the wording is settled.

### Step 3 — Write the change

Apply it to the relevant section of `PM/manifesto.md`.

Complete when that section reads as the settled wording.

### Step 4 — Append to the Amendment Log

Prior entries stay intact — every amendment is dated and carries its reason:

```
## [Short title]
**Date:** YYYY-MM-DD
**Amendment:** [what changed]
**Reason:** [why]
```

A manifesto change with no log entry has not happened as far as this skill is concerned.

Complete when the entry is appended and matches the section as written.
