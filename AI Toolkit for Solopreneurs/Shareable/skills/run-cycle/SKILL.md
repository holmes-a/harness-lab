---
name: run-cycle
description: Run one cycle of a recurring project's routine as delegated work — expands the Playbook over its natural unit, produces each unit with a cold subagent in parallel, reviews every output against the project's acceptance checks, and returns a single exception report. Use when a routine project's cycle is due and you want to review exceptions rather than every artifact.
---

# Run Cycle

Turns a recurring routine into delegated work. You invoke it, read one exception report, and press publish on anything outward-facing. You do not read the artifacts that passed.

This is the knowledge-work counterpart of `/implement`. Where `/implement` relies on tests as its verifier, this relies on the project's `_ai/acceptance.md` plus a separate reviewer agent — knowledge work has no compiler, so the verifier has to be built.

## Quick Start

```
/run-cycle "Local Search Optimisation"
/run-cycle "GBP Posting Engine"
```

If invoked with no argument, ask which project.

## Prerequisites

Both must exist, or stop and say which is missing:

1. A `## Playbook` section in the project's `CLAUDE.md` — this is the routine to expand
2. An `_ai/acceptance.md` in the project — this is the verifier

If `_ai/acceptance.md` is absent, **do not invent one and proceed.** Offer to draft it from the project's `CLAUDE.md` (Working Instructions, Key Decisions, and any output template), then stop for the user to approve it. An unreviewed acceptance file is worse than none — it manufactures false confidence in every artifact that passes it.

## Process

### Step 1 — Read the routine

Read the project's `CLAUDE.md` (`## Playbook`, Working Instructions, any output template) and `_ai/acceptance.md` in full. Read `_ai/findings.md` for Open findings — a producer that re-flags an already-logged finding wastes a revision cycle.

Determine the **natural unit** the routine repeats over: an area, an agent, a page, a review. The Playbook usually names it ("one post per area", "three exports per area"). If it genuinely has no repeated unit, the cycle is a single work unit — that is fine and still worth running for the verifier.

### Step 2 — Resolve the unit list from data, not memory

Expand the unit list from the source files the project names, applying the filters it states — e.g. active areas where a flag is TRUE. Never hardcode a list of units in this skill or carry one over from a previous cycle; agents come and go and the list changes.

Check what already exists for this cycle. If artifacts are present for some units, offer to run only the remainder.

### Step 3 — Write the work units

Write one file per unit to `_ai/work/[cycle-id]/NN-[unit-slug].md`, numbered from `01` in dependency order — blockers first. `[cycle-id]` is the cycle's date or period (`2026-08`, `2026-08-15`).

```
# NN — [Unit title]

**What to produce:** the artifact and the outcome it serves, from the reader's point of view.

**Blocked by:** the numbers/titles of units that gate this one, or "None — can start immediately".

**Status:** ready-for-agent

**Inputs:**
- [each source file or data lookup, by path]

**Output:** [exact path to write]

**Acceptance:** `_ai/acceptance.md` — full file, plus:
- [ ] any criterion specific to this unit
```

A unit must be executable by an agent that has none of this conversation. If it only makes sense with your context, the unit is written wrong — fix the unit, do not compensate by briefing the producer.

Aggregation steps (a cross-unit summary) are units too, with `Blocked by:` listing every unit they consume.

### Step 4 — Show the plan and confirm

Present the unit list: number, title, blocked-by, what it produces. Ask whether the breakdown and unit list are right.

**This is the human gate.** After this, the cycle runs without you. Do not skip it, and do not treat silence as approval.

### Step 5 — Produce

Work the **frontier**: every unit whose blockers are all complete. Launch those in parallel, one subagent per unit.

Each producer gets exactly: its work unit file, `_ai/acceptance.md`, the project's `CLAUDE.md`, and its input paths. **Nothing from this conversation.** A cold start is what proves the work unit is well written, and it is the property that lets the pipeline scale past your context window.

A producer writes its artifact and returns the path. It does not archive, update tasks, publish, or tidy.

### Step 6 — Review

For each artifact, launch the `knowledge-reviewer` agent with the work unit, `_ai/acceptance.md`, the artifact path, and the artifact's source files. The reviewer did not write the artifact and receives nothing about how it was made.

- **PASS** → done. You do not read it.
- **FAIL** → hand the violations back to a fresh producer for **one** revision pass, then re-review.
- **FAIL twice** → stop and escalate to the exception report. Do not attempt a third pass.

Two strikes bounds the cost of a unit that is going nowhere, and stops a producer/reviewer pair converging on confident nonsense.

If the reviewer flags the acceptance file itself as ambiguous, surface that in the report — that is a bug in the checks and it affects every future cycle.

### Step 7 — Report and stop

One report:

```
## [Project] — [cycle-id]

**Passed:** N of M — [unit names]
**Escalated:** [unit name] — [the reviewer's specific findings]
**Not attempted:** [unit name] — [why: missing input, blocked by an escalation]

**Next:** [what needs a human — publish, archive, a decision]
```

Then stop. `/run-cycle` does not archive artifacts, update `_ai/tasks.md`, run `/project-wrap-up`, or publish anything.

## Rules

- **Never publish.** Not to a Google Business Profile, a website, a customer, or an agent. Producing and reviewing a draft is delegated; the publish action is the user's. A wrong knowledge artifact does not fail loudly the way a wrong commit does — it just goes out.
- **Never proceed without `_ai/acceptance.md`.** The verifier is the whole point.
- **Never skip Step 4's confirmation.**
- **Producers start cold.** If you find yourself adding context to a producer's prompt to make it work, that context belongs in the work unit or the acceptance file.
- **The reviewer is never the producer.** Not the same agent, not the same invocation.
- **Two strikes maximum**, then escalate.
- **Do not read passing artifacts** to "just check". That reintroduces exactly the bottleneck this removes. If you do not trust the passes, the acceptance file is too weak — fix the checks.
- **Business-agnostic.** This skill must work in any workspace built from this toolkit. Never hardcode a project name, a path outside the target project, or a unit list.
