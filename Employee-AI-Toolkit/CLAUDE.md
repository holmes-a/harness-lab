# Project: Employee AI Toolkit

## Brief
Personal discovery project to evaluate and refine an AI toolkit for Saturn employees, through hands-on use and iteration. Builds the evidence base for a future board-level adoption decision.

## Goal
A proven, shareable AI toolkit — context templates, scaffold skills, and onboarding materials — ready to deploy to a second Saturn employee for hands-on validation.

## Business Function
Finance & GRC

## Status
Completed - Partial

## Outcome
Only used as a source to develop the "AI Toolkit for Solopreneurs" project

## Project ID
t7r2kn

## Type
Ongoing

## Cross-Role Work
Single-role — Technical Director

## Key Constraints
- None defined yet

## Stakeholders
- Adrian Holmes (sole stakeholder for now)
- A developer from the team will be added when the testing phase begins

## Working Instructions
Work analytically and structurally. Outputs should be concrete proposals — file contents, folder structures, naming conventions — rather than discussion. Conventions are established and working; revisit only with a clear rationale.

Edit skills only in `Shareable/skills/` — never in `~/.claude/skills/` directly. Run `/employee-ai-toolkit-sync` to deploy Shareable/ changes to installed. If a quick fix is made to an installed skill in-session, use the sync skill to merge it back to `Shareable/` before the session ends.

At the end of every session, run `/project-wrap-up` to update `_ai/tasks.md`, `_ai/decisions.md`, and `_ai/findings.md`, then commit all changed project files.

## Facts
<!-- Linked fact files — load when that type of work is active. Groups are re-evaluated each pass as the project grows.
     Confirm with user before adding new entries. Full detail in _ai/facts/[topic].md. -->
- [Project lifecycle](_ai/facts/project-lifecycle.md) — Project IDs, types, status schema, projects.json data layer, role folder structure, archive structure. Load when creating or archiving projects/roles.
- [Skill development](_ai/facts/skill-development.md) — Shareable/ structure, skill origins, role-init/project-init design. Load when writing or deploying skills.
- [Session workflow](_ai/facts/session-workflow.md) — project-wrap-up patterns, PRD files, scaffold pruning rules. Load when designing session or wrap-up flows.
- [Hooks and memory](_ai/facts/hooks-memory.md) — PreCompact hook, SessionEnd removal, memory architecture. Load when working on hooks or memory.
- [Dashboard design](_ai/facts/dashboard.md) — Layout, colour, and purpose decisions. Load when building the dashboard SPA.

## Project Files
| File | Purpose |
|---|---|
| `_ai/tasks.md` | Current state + open tasks + last 3-5 done |
| `_ai/decisions.md` | Active choices — working set, not an archive; graduates to facts/ when settled |
| `_ai/findings.md` | Observed facts and analysis — check Open findings before starting work |
| `_ai/facts/` | Graduated facts — one-liner pointer in ## Facts above, full detail per topic |
| `_ai/task-prds/` | Detailed PRDs for tasks too complex for a single task line |
| `Shareable/` | Employee-facing resources: hooks, skills, templates, memory examples |
| `_assets/` | Research material and reference projects |

## Entry Standards
**decisions.md:** Date · Decision (1 sentence) · Rationale (1 sentence) · Finding ref · Supersedes ref
**findings.md:** Date · Finding (1 sentence) · Source · Status (Open/Actioned/Superseded) · Decision ref
**facts/:** One-liner in `## Facts` → full detail in `_ai/facts/[topic].md`. Graduated by `/project-wrap-up` — always confirm with user before editing CLAUDE.md.
**tasks.md:** Append `[blocked by: X]` to flag a dependency. Append `→ [PRD](_ai/task-prds/filename.md)` where a detailed PRD exists. `## Inbox` holds items captured mid-session via /grilling-handoff — `[task]`, `[finding]`, `[decision]`, `[thought]` entries awaiting triage at next session start. Non-task types appear here temporarily and will be routed to their own files at triage.
