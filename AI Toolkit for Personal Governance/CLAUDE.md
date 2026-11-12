# Project: AI Toolkit for Personal Governance

## Purpose

To build and maintain the framework this workspace runs on — a cabinet-government model for personal
decision-making, where Adrian is Prime Minister, five specialist advisors hold departments and their
own evidence, and an `opposition` skill audits decisions against the manifesto. A secondary goal is to
keep it distilled into shareable resources anyone could use to replicate the system.

Sibling to `AI Toolkit for Solopreneurs`, which governs *business* work by value-chain function. This
one governs *a life* by role. The project scaffold is shared; the governing model is not.

## Goal

A complete, documented governance system — agents, skills, templates, and a bootstrap — running live on
this workspace and usable by anyone with Claude Code.

## Business Function

PM

## Status

Active — structural build complete (Phases 1–6 of `_ai/task-prds/implementation-tasks.md`); Adrian's
own manifesto, department manifestos, and advisor methods are still to be grilled into existence.

## Type

Ongoing

## Scope

**In scope:**
- The five minister agent definitions — mandates, output contract
- The `opposition` skill
- `check-in`, `idea`, `routine` — the three triggers, as skills
- `manifesto` and `appoint-advisor` — the skills that grill content into the templates this project
  produces
- Templates: `PM/manifesto.md`, department `manifesto.md`, root / PM / Advisors / department
  `CLAUDE.md`
- The dashboard and its data contract
- `BOOTSTRAP.md` — a runbook for a fresh workspace

**Out of scope:**
- Adrian's actual manifesto, priorities, and department data — those are the live instance, not the
  template (see `implementation-brief.md` §0.1)
- Anything the Solopreneurs toolkit already does well — reuse before invention

## Key Constraints

- **Reuse before invention.** If an existing Solopreneurs toolkit file or skill does the job, use it —
  see `implementation-brief.md` §8 for the exact reuse map.
- **`Shareable/` is the source of truth.** Author here, deploy out to the workspace's `.claude/` and
  `_system/`. The Solopreneurs project has known drift between `Shareable/` and its deployed copies —
  do not repeat it here.
- **Structure, never content.** Any file that would hold Adrian's goals, commitments, targets or values
  is a template with placeholder comments until a grilling session fills it in.

## Working Instructions

Outputs should be concrete — file contents, folder structures, agent definitions — not discussion. Read
`_ai/decisions.md` before proposing anything: the design was settled over a long grilling session and
several obvious-looking ideas (a governance gate, scheduled interception, "seats earned by data", a
`register.md`) were considered and explicitly rejected with reasons.

The framework's design history lives in `_ai/decisions.md` and `_ai/findings.md`, both carried over
from the greenfield grilling session of 2026-08-10 that superseded the prior 39-decision design.

## Facts

<!-- Populated as decisions graduate. Confirm before adding. -->

## Project Files

| File | Purpose |
|---|---|
| `_ai/tasks.md` | Current state + open tasks + last 3-5 done |
| `_ai/decisions.md` | The design record — carried over from the 2026-08-10 greenfield session |
| `_ai/findings.md` | Observed facts and analysis from that same session |
| `_ai/facts/` | Graduated facts — one-liner pointer in `## Facts` above |
| `_assets/` | Project-specific reference material |
| `_ai/task-prds/` | `implementation-brief.md` and `implementation-tasks.md` — the spec and work order this build followed |
| `_skills/` | Project-scoped skills |
| `Shareable/` | The publishable framework — source of truth for everything deployed into `.claude/` and `_system/` |
