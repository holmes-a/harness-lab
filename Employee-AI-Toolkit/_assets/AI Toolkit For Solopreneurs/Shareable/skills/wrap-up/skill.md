---
name: wrap-up
description: End-of-session state save. Updates tasks.md, decisions.md, findings.md, and memory for the active project(s), then prints a summary of all changes for manual review before committing. Use when ready to close the session and continue work later or on another machine.
---

# Wrap-Up

Saves session state to the project scaffold files so work can resume cleanly in the next session. Does not commit to git — do that manually after reviewing the summary.

## How to Install

Copy this folder to `~/.claude/skills/wrap-up/`. Once in place, invoke it by typing `/wrap-up` in any Claude Code session.

You will also need to update the memory path in step 2 below. Find your project slug by running:
- Windows: `dir %USERPROFILE%\.claude\projects\`
- Mac/Linux: `ls ~/.claude/projects/`

## Process

1. **Identify active project(s)** from the conversation — which project folder(s) were worked on this session. If more than one, handle each in turn.

2. **Read current project files** — read `tasks.md`, `decisions.md`, and `findings.md` for each active project. Also read the project memory file from:
   - Windows: `%USERPROFILE%\.claude\projects\<YOUR-PROJECT-SLUG>\memory\`
   - Mac/Linux: `~/.claude/projects/<YOUR-PROJECT-SLUG>/memory/`

3. **Update tasks.md** — for each project:
   - Mark any tasks completed this session as done (`- [x]`)
   - Add any new open tasks identified during the session
   - Move completed items into the "Recently Done" section (keep last 3-5; drop older ones)
   - Update any current-state summary paragraph if the project state has materially changed

4. **Update decisions.md** — add an entry for every decision made or confirmed this session that is not already recorded. Use this format:
   ```
   ## [Short title]
   **Date:** YYYY-MM-DD
   **Decision:** [one sentence]
   **Rationale:** [one sentence]
   **Finding:** [ref or omit]
   **Supersedes:** [ref or omit]
   ```
   Only record decisions worth preserving — skip trivial implementation choices.

5. **Update findings.md** — add an entry for every finding worth preserving. Use this format:
   ```
   ## [Short title]
   **Date:** YYYY-MM-DD
   **Finding:** [one sentence — factual, not interpretive]
   **Source:** [test result / analysis / external research / user feedback]
   **Status:** Open | Actioned | Superseded
   **Decision:** [ref or omit]
   ```

6. **Update project memory** — update or create the project memory file to reflect current project state. Update the `MEMORY.md` index if the memory file is new.

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
