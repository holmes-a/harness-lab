# Project Migrate — Reference

## Content Mapping Rules

Use these rules when mapping existing content to scaffold files in Step 3.

| Source content type | Maps to |
|---|---|
| Existing decisions, settled choices, architectural choices | `_ai/decisions.md` entries |
| In-progress work, current state, status notes, handoff notes | `_ai/tasks.md` current-state paragraph + `## Open` task list |
| Analysis, observations, test results, research notes | `_ai/findings.md` entries |
| Project description, purpose, goals, constraints | `CLAUDE.md` sections |
| Reference documents, external files, source material | `_assets/` folder |
| Loose notes that don't clearly fit one category | Flag to user — ask before assigning |

## Ambiguous content

Always flag content that:
- Could be either a decision or a finding (ask which)
- Could be either an open task or a completed one (ask which)
- Belongs in a different project entirely (ask before migrating)
- Looks sensitive (credentials, personal data) — flag and do not move without user confirmation

## Dates

If the existing content contains dates (e.g. in commit messages, document headers, or change logs), preserve them in the `**Date:**` field of the relevant `decisions.md` or `findings.md` entry. If no date can be inferred, use today's date and note it in the summary.
