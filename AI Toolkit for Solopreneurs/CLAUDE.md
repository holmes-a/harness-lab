# Project: AI Toolkit for Solopreneurs

## Purpose
To build and maintain an AI workflow system for Hot Iron — defining the CLAUDE.md hierarchy, project scaffold conventions, skill configurations, and memory setup — so that AI assistance across all five functions is consistent, efficient, and improvable over time. A secondary goal is to distil this system into shareable resources that other solopreneurs could use to replicate the workflow.

## Goal
A complete, publicly shareable AI workflow system — documented, tested on Hot Iron, and usable by any solopreneur with Claude Code — with all five functions migrated to the new scaffold.

## Business Function
00 - Cross Function

## Context
Company

## Status
Active

## Project ID
2eoxf6

## Type
Ongoing

## Scope
**In scope:**
- The CLAUDE.md hierarchy (root, function, project levels)
- Project scaffold conventions (templates, standard files)
- Skill configurations (custom skills in `~/.claude/skills/`)
- Memory setup and conventions
- AI assistant configurations (ChatGPT GPTs, Claude profiles in `AI Assistants/`)
- Shareable resources: polished skills, templates, and a public README for other solopreneurs

**Out of scope:**
- Work done inside individual projects (that belongs to each function)
- Prompt engineering for specific tasks (those live in the relevant project or assistant config)

## Key Constraints
None defined yet.

## Working Instructions
Work analytically and structurally. Outputs should be concrete proposals — file contents, folder structures, naming conventions — rather than discussion. Reference the existing CLAUDE.md hierarchy before suggesting changes. Conventions are established and working well; revisit only with a clear rationale. When proposing changes to the scaffold or memory system, explain the reasoning briefly.

Keep `README.md` and `Shareable/` in sync with the actual setup as conventions evolve — flag when they drift.

At the end of every session, run `/project-wrap-up` to update `_ai/tasks.md`, `_ai/decisions.md`, and `_ai/findings.md`, then commit all changed project files.

## Facts
<!-- Populated by /project-wrap-up as decisions graduate. Full detail in _ai/facts/[topic].md. Confirm with user before adding entries here. -->
- Project registry (`_system/dashboard/data/projects.json`) and SPA dashboard are standard toolkit components. → `_ai/facts/toolkit-design.md`
- Business functions are predefined at workspace setup; no function-init skill exists. → `_ai/facts/toolkit-design.md`
- `project-init` supports a Developer project type (pipeline tracker + inputs.md, no decisions/findings). → `_ai/facts/toolkit-design.md`
- The workspace sync skill is named `ai-toolkit-sync` (project-scoped, not in Shareable/). → `_ai/facts/toolkit-design.md`

## Project Files
| File | Purpose |
|---|---|
| `_ai/tasks.md` | Current state + open tasks + last 3-5 done |
| `_ai/decisions.md` | Active choices — working set, not an archive; graduates to facts/ when settled |
| `_ai/findings.md` | Observed facts and analysis — check Open findings before starting work |
| `_ai/facts/` | Graduated facts — one-liner pointer in `## Facts` above, full detail per topic |
| `_assets/` | Project-specific files and reference material |
| `_ai/task-prds/` | Detailed PRDs and captured items requiring more than two lines of context |
| `_skills/` | Project-scoped skills — created via `/new-skill`; empty at project creation |
| `Shareable/` | Polished, publishable resources for other solopreneurs |
| `README.md` | Public-facing entry point explaining the toolkit and how to replicate the workflow |

## Entry Standards
**decisions.md:** Date · Decision (1 sentence) · Rationale (1 sentence) · Finding ref · Supersedes ref
**findings.md:** Date · Finding (1 sentence) · Source · Status (Open/Actioned/Superseded) · Decision ref
**facts/:** One-liner in `## Facts` → full detail in `_ai/facts/[topic].md`. Graduated by `/project-wrap-up` — always confirm with user before editing CLAUDE.md.
**tasks.md:** Append `[blocked by: X]` to flag a dependency. Append `→ [PRD](_ai/task-prds/filename.md)` where a detailed PRD exists. `## Inbox` holds items captured mid-session via /grilling-handoff — `[task]`, `[finding]`, `[decision]`, `[thought]` entries awaiting triage at next session start.
