# Project: AI Toolkit for Solopreneurs

## Purpose
To build and maintain an AI workflow system for Hot Iron — defining the CLAUDE.md hierarchy, project scaffold conventions, skill configurations, and memory setup — so that AI assistance across all five functions is consistent, efficient, and improvable over time. A secondary goal is to distil this system into shareable resources that other solopreneurs could use to replicate the workflow.

## Status
Active

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

## Working Instructions
Work analytically and structurally. Outputs should be concrete proposals — file contents, folder structures, naming conventions — rather than discussion. Reference the existing CLAUDE.md hierarchy before suggesting changes. Conventions are established and working well; revisit only with a clear rationale. When proposing changes to the scaffold or memory system, explain the reasoning briefly.

Keep `README.md` and `Shareable/` in sync with the actual setup as conventions evolve — flag when they drift.

At the end of every session, update `tasks.md`, `decisions.md`, and `findings.md` to reflect work done, then commit all changed project files.

## Project Files
| File | Purpose |
|---|---|
| `tasks.md` | Current state + open tasks + last 3–5 done |
| `decisions.md` | Settled choices — do not re-open without checking contradictions |
| `findings.md` | Observed facts and analysis — check Open findings before starting work |
| `Assets/` | Project-specific assets |
| `Shareable/` | Polished, publishable resources for other solopreneurs |
| `README.md` | Public-facing entry point explaining the toolkit and how to replicate the workflow |

## Entry Standards
**decisions.md:** Date · Decision (1 sentence) · Rationale (1 sentence) · Finding ref · Supersedes ref  
**findings.md:** Date · Finding (1 sentence) · Source · Status (Open/Actioned/Superseded) · Decision ref
