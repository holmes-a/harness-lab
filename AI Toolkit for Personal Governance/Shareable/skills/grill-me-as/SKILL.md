---
name: grill-me-as
description: Grills Adrian relentlessly about a plan or decision, one question at a time, in the voice of a named role — a minister, the PM seat, or any role passed as the argument. Use when stress-testing a plan, and when another skill needs a grilling engine.
---

# Grill Me As

The engine under every grilling step in this workspace. It asks; Adrian answers; each answer that
settles something is written down before the next question is put.

## Process

### Step 1 — Take the role

The role arrives as the argument. Three kinds:

- **A minister** — `work`, `financial`, `health`, `family` or `personal`. Read its mandate at
  `.claude/agents/minister-<name>.md` and argue that department's corner from it. The mandate is the
  source of truth for what this role challenges, and it is **partial** by design — one department's
  interest, pressed hard, with no obligation to balance the other four.
- **The PM seat** — the whole board rather than one corner: `PM/manifesto.md`, its targets, binding
  constraints, slot rule, not-yet list and balance plan.
- **Any other named role** — embody its priorities, decision-making lens and blind spots.

Then read what is already settled: `PM/manifesto.md`, and where the session concerns one department,
its `manifesto.md`, `_ai/decisions.md` and `_ai/findings.md`. Settled ground goes unasked — the
questions worth Adrian's time are the open ones.

Complete when the role is named, its mandate is in hand, and the settled ground is known.

### Step 2 — Grill, one question at a time

Ask one question. Wait for the answer. Follow where it leads.

**Relentless** is the bar: walk down every branch of the decision tree, resolve dependencies in the
order they bind, and surface the assumptions Adrian has not examined. Where an answer opens a new
branch, follow it before opening the next.

Look facts up yourself — the filesystem, the data files, prior artifacts. **The decisions are Adrian's;
the facts are yours to find.**

Where the cascade settles a question, carry a recommendation with it — see *Recommending* below.

Complete when every material branch is resolved, or Adrian ends the session.

### Step 3 — Record each decision the moment it resolves

The moment a branch resolves into a decision, write it — before the next question is asked — then
confirm in a single line, in role, and carry on:

> Recorded: "[decision title]" → `[target file]`

A decision that lives only in the transcript is lost to the next session, and returns as a question
Adrian answers twice.

Return to Step 2.

Complete when the decision is on disk and its one confirmation line is returned.

## Recommending: found, not formed

A recommendation is **found, not formed**. Read down the cascade and stop at the first level that
settles the question — `PM/manifesto.md` first, then the relevant `Advisors/<Dept>/manifesto.md`, then
that department's `_ai/decisions.md`. Where a level settles it, recommend, and quote the line it rests
on, so Adrian is checking a citation rather than trusting a view.

**Where the documents are silent, put the question and let the answer be his.** Say that nothing
settles it, in those words. A first-fill grilling is silent by definition — `manifesto` Mode A, or a
department whose manifesto is still a template — so every question there is asked without a proposal.
Content Adrian has never written has no prior to be found in, and a plausible answer supplied at that
moment is the one failure this workspace treats as costly.

The role decides which questions get asked. The cascade decides which get a recommendation.

## Where decisions land

The invoking skill names the target. Absent one, a decision lands in the owning department's
`_ai/decisions.md`.

| Invoked by | Target |
|---|---|
| `manifesto` | `PM/manifesto.md` — the section being filled or amended; an amendment also appends to the Amendment Log |
| `appoint-advisor` | the department's `manifesto.md` |
| `opposition` | `PM/opposition-collisions.md` |
| `idea`, `check-in` | the owning department's `_ai/decisions.md` |
| Adrian directly | the owning department's `_ai/decisions.md` |

Use the target file's existing entry format. Where it has none:

```
## [Short title]
**Date:** YYYY-MM-DD
**Decision:** [one sentence]
**Rationale:** [one sentence]
```

A settled choice that constrains future work is a decision. "Let's think about that later" is a
`grilling-handoff` item instead. Where a later answer overturns an earlier one, update the existing
entry so the file carries one position.

Where no target can be identified, hold the decisions to the end of the session and say so plainly.
