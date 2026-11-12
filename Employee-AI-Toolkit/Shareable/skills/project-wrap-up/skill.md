---
name: project-wrap-up
description: End-of-session state save. Updates _ai/tasks.md, _ai/decisions.md, _ai/findings.md, and memory for the active project(s), then prints a summary of all changes for manual review before committing. Developer projects only update _ai/tasks.md — no decisions.md or findings.md. Use when ready to close the session and continue work later or on another machine.
---

# Project Wrap-Up

Saves session state to the project scaffold files so work can resume cleanly in the next session. Does not commit to git — do that manually after reviewing the summary.

## Quick Start

```
/project-wrap-up
```

The memory path in Step 2 uses `<YOUR-PROJECT-SLUG>` — find your slug by running `dir %USERPROFILE%\.claude\projects\` (Windows) or `ls ~/.claude/projects/` (Mac/Linux).

## Process

1. **Identify active project(s)** from the conversation — which project folder(s) were worked on this session. If more than one, handle each in turn.

2. **Read current project files** — determine the project type by reading `CLAUDE.md`: if it contains `## Feature Workflow` or `## Maintenance Workflow` it is a Developer project; otherwise it is a standard project.

   - **Standard project:** read `_ai/tasks.md`, `_ai/decisions.md`, and `_ai/findings.md`
   - **Developer project:** read `_ai/tasks.md` only — `_ai/decisions.md` and `_ai/findings.md` do not exist; architectural decisions live in `docs/adr/` (managed by `/grill-with-docs`)

   Also read the project memory file from:
   - Windows: `%USERPROFILE%\.claude\projects\<YOUR-PROJECT-SLUG>\memory\`
   - Mac/Linux: `~/.claude/projects/<YOUR-PROJECT-SLUG>/memory/`

2b. **Update projects.json** — for each active project:
    - Read the project's `CLAUDE.md` and locate the `## Project ID` section to get the project's ID
    - If no `## Project ID` section exists (legacy project), skip this step and note it in the summary
    - Read `_system/dashboard/data/projects.json` (if it exists)
    - Find the record where `id` matches the project's ID
    - If found, apply the following updates and write the file:
      - Always set `last_worked` to today's date (YYYY-MM-DD)
      - If the project's status changed this session (e.g. became `Blocked` or reverted to `Active`), update `status` to the new value
      - If a `status_note` was set or updated this session (e.g. why it is blocked, or the current stage), write it as `"status_note": "[note]"`; if the note was cleared, remove the `status_note` key from the record entirely
    - If no matching record is found (project not yet registered), note it in the summary — do not create an entry (that is `project-init`'s responsibility)

3. **Update `_ai/tasks.md`** — for each project:
   - Mark any tasks completed this session as done (`- [x]`)
   - Add any new open tasks identified during the session
   - Move completed items into the "Recently Done" section (keep last 3-5; drop older ones)
   - When moving a completed task to Recently Done: if the task has a `→ [PRD](_ai/task-prds/filename.md)` link, delete the linked PRD file and remove the `→ [PRD]` suffix from the task line before adding to Recently Done
   - For Developer projects: update the `## Active Workflow` section — check off completed pipeline steps; if a workflow was completed, restore both workflows ready for the next piece of work
   - Update any current-state summary paragraph if the project state has materially changed

4. **Update `_ai/decisions.md`** (standard projects only — skip for Developer projects) — add an entry for every decision made or confirmed this session that is not already recorded. Use this format:
   ```
   ## [Short title]
   **Date:** YYYY-MM-DD
   **Decision:** [one sentence]
   **Rationale:** [one sentence]
   **Finding:** [ref or omit]
   **Supersedes:** [ref or omit]
   ```
   Only record decisions worth preserving — skip trivial implementation choices.

4b. **Graduate decisions to facts** (standard projects only — skip for Developer projects) — scan `_ai/decisions.md` for graduation candidates. A decision should graduate if it passes both tests:
   1. **Skill-enforced:** the decision is fully implemented in a specific skill — the skill is the enforcement mechanism, so decisions.md does not need to repeat it.
   2. **No spontaneous-violation risk:** Claude would not violate this decision when acting outside a formal skill workflow (e.g. creating a folder, naming a skill, writing a memory entry mid-session).
   Only decisions that could be violated *without* running a skill belong in decisions.md.

   For each graduation candidate:
   - Identify the right facts/ file by task type — which type of session work triggers needing this fact? Group related decisions together (e.g. all project creation facts in one file, all skill development facts in another). Re-evaluate existing groupings if a better structure has become clear.
   - Draft a one-liner (≤ 15 words) — the settled fact in its most portable form
   - Draft or update the `_ai/facts/[topic].md` file with: the one-liner, full detail with examples and edge cases, and the original decision title, date, and rationale. Include a **Load when:** line describing which task type triggers reading this file.
   - Show candidates and proposed file changes to the user and ask for confirmation before writing anything
   - If confirmed: write the facts file, then ask for explicit confirmation before adding the pointer to `CLAUDE.md ## Facts`
   - Delete the graduated entry from `_ai/decisions.md`
   - If nothing qualifies, skip silently

5. **Update `_ai/findings.md`** (standard projects only — skip for Developer projects) — add an entry for every finding worth preserving. Use this format:
   ```
   ## [Short title]
   **Date:** YYYY-MM-DD
   **Finding:** [one sentence — factual, not interpretive]
   **Source:** [test result / analysis / external research / user feedback]
   **Status:** Open | Actioned | Superseded
   **Decision:** [ref or omit]
   ```

6. **Update project memory** — the project memory file is a pointer, not a summary. If no project memory file exists for this project, create one that names the project and its scaffold path, then directs Claude to read the right files for current state:
   - **Standard project:** read `_ai/tasks.md`, `_ai/decisions.md`, and `_ai/findings.md`
   - **Developer project:** read `_ai/tasks.md` and `_ai/inputs.md`; architectural decisions are in `docs/adr/`

   Do not duplicate scaffold content in the memory file — the scaffold files are the source of truth. Update the `MEMORY.md` index if the memory file is new.

7. **Print summary** — after all writes, output:
   - Which files were changed and what was added/updated
   - Any open questions or follow-on tasks worth noting for the next session
   - Reminder to stage and commit the changed files

## Rules

- Work from what is already known in the conversation — do not ask questions unless genuinely ambiguous
- Be conservative: only record things that are true, settled, or worth preserving
- Do not record implementation details that belong in code comments or commit messages
- The "Recently Done" section keeps the last 3-5 completed items — drop older ones silently
- If nothing material happened in a file (e.g. no new decisions), leave it unchanged and say so in the summary
