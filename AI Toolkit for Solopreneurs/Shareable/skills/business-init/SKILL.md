---
name: business-init
description: Set up a complete new business workspace from the toolkit — function folders, root and function CLAUDE.md files, skills, agents, hooks, memory, and the project registry. Use when starting a new business from a copy of this toolkit, or when a workspace has the toolkit folder but no structure around it.
---

# Business Init

Builds a whole business workspace from a copy of this toolkit: structure, context files, installed skills and agents, hooks, memory, registry.

## The runbook is the source of truth

The full process lives in **`Shareable/BOOTSTRAP.md`**. Read that file and follow it — do not work from this file alone, and do not restate its steps here.

Two files, one process, because they solve different starting conditions:

- **`BOOTSTRAP.md`** works with *nothing installed*. That is the normal case for a new business: you drop the toolkit into an empty folder, and there are no skills yet to invoke. The user says "read BOOTSTRAP.md and follow it".
- **`/business-init`** is this same process once the toolkit is already installed on the machine — a second or third business, or re-running after an abandoned attempt.

Keeping the steps in one file is the point. A duplicated process drifts, and a bootstrap that has drifted from reality fails at the worst possible moment: when someone is setting up a business for the first time and has no way to tell what is wrong.

## Process

1. **Locate the runbook.** It is at `Shareable/BOOTSTRAP.md` inside the AI Toolkit project folder. If the workspace has no such folder, this is not a toolkit workspace — say so and stop.

2. **Read it in full**, then follow every phase in order.

3. **Pay particular attention to the collision guard in Phase 5.** You are running as an installed skill, which means a toolkit is already installed on this machine — so a name collision is not a possibility here, it is the expected condition. Every skill about to be written already exists. Compare each one properly and stop on any difference rather than assuming your source is the newer.

## Rules

- Follow `BOOTSTRAP.md`; do not improvise a shorter version.
- Never overwrite an installed skill that differs from your source — stop and ask.
- Never commit to git.
- If `BOOTSTRAP.md` and this file ever disagree, `BOOTSTRAP.md` wins — and say so, because the disagreement is a bug worth fixing.
