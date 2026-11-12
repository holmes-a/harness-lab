---
name: to-work-units
description: Break a brief, plan, or the current conversation into work units — one per deliverable, each sized for a single fresh context window, each declaring what blocks it. Written to _ai/work/ and gated on your approval. Use before delegating knowledge work to agents.
---

# To Work Units

Decomposes a brief into **work units** — one per deliverable, each executable by an agent that has none of this conversation, each declaring the units that must finish before it can start.

This is the knowledge-work counterpart of `/to-tickets`, and it uses the same file shape so `/run-cycle` and `/run-work` can consume either.

## Process

### 1. Gather context

Work from what is already in the conversation. If the user passes a brief path as an argument, read it in full. Read the project's `CLAUDE.md`, `_ai/decisions.md`, and `_ai/acceptance.md` if present.

### 2. Draft the units

<unit-rules>

- Each unit produces **one complete deliverable** — a whole page, a whole review, a whole campaign asset. Not "draft the headings for all nine pages", which finishes nothing.
- A completed unit is judgeable on its own against the acceptance checks.
- Each unit fits in a single fresh context window. If a deliverable cannot, it is two deliverables.
- Shared groundwork — a template, a data extract, a decision every other unit depends on — is its own unit, sequenced first, and blocks the rest.

</unit-rules>

Give each unit its **blocking edges**: the units that must complete before it can start. A unit with no blockers starts immediately.

Prefer few edges. If everything blocks everything, the decomposition is wrong — look for the shared groundwork and pull it out as one early unit rather than duplicating it into every other.

### 3. Quiz the user

Present the breakdown as a numbered list. Per unit: **Title**, **Blocked by**, **What it delivers**.

Ask:
- Does the granularity feel right — too coarse, too fine?
- Are the blocking edges real, or just a guess at order?
- Should any units merge or split?

**Iterate until the user approves.** Do not write files before approval — this is the last human gate before the work runs unattended, and it is the one that decides whether the rest is worth anything.

### 4. Write the units

One file per unit at `_ai/work/[slug]/NN-[unit-slug].md`, numbered from `01` in dependency order — blockers first.

<unit-template>

# NN — [Unit title]

**What to produce:** the deliverable and the outcome it serves, from the reader's point of view — not a layer-by-layer task list.

**Blocked by:** the numbers/titles of the units that gate this one, or "None — can start immediately".

**Status:** ready-for-agent

**Inputs:**
- [each source file, data lookup, or prior unit's output, by path]

**Output:** [exact path to write]

**Acceptance:** `_ai/acceptance.md` if the project has one, plus:
- [ ] criterion specific to this unit
- [ ] criterion specific to this unit

</unit-template>

### 5. Confirm

Report where the units were written and how many can start immediately. Offer `/run-work` as the next step.

## Rules

- **Never write files before the user approves the breakdown.**
- **A unit must be executable cold.** Before writing each one, ask: could an agent with no memory of this conversation produce this? If not, the unit is underspecified — fix the unit rather than planning to brief the producer.
- **No file paths or line numbers in `What to produce`** — they go stale while units sit in the queue. Paths belong in `Inputs` and `Output`.
- One unit per file. Never a single combined file.
- Do not stage or commit to git.
- **Business-agnostic** — this skill must work in any workspace built from this toolkit. Never hardcode project names or paths outside the target project.
