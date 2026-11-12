---
topic: session-workflow
one-liner: /project-wrap-up is the session-end mechanism; PRD files capture multi-session grill output; grill-me-as runs inside role-init before role creation.
---

# Fact: Session Workflow

**One-liner:** `/project-wrap-up` is the session-end mechanism; PRD files capture multi-session grill output; `grill-me-as` runs inside `role-init` before role creation.

## Detail

**Session end:** `/project-wrap-up` updates `_ai/tasks.md`, `_ai/decisions.md`, and `_ai/findings.md` at session end. Session notes are not used — scaffold files are always the current source of truth and are machine-portable. Session notes accumulate as an archive but do not keep live state current.

**PRD files:** When a `grill-me-as` session produces more structured output than tasks/decisions/findings can cleanly hold, write a dedicated PRD `.md` file in `_ai/task-prds/` to capture the full design. Tasks, decisions, and findings files are optimised for short, discrete entries — a design with interdependent schema, blockers, and field notes needs a single coherent document.

**role-init creation flow:** `role-init` includes a 3–5 question `grill-me-as` round — adopting the most senior existing role's perspective — before creating any role files. Creating a new role is a structural decision that warrants the same pre-creation scrutiny as project setup.

**Sequencing note (historical):** Project-level context and memory design was resolved before role-level context. This sequencing is complete — project layer is the working model.

**Scaffold file pruning:** Actioned/Superseded findings are pruned after one full project-wrap-up cycle has passed. Superseded decisions are removed once the superseding entry is at least one session old. Status and Supersedes fields are the correct markers — formalising their pruning use closes the loop.

## Source decisions

- /project-wrap-up over session notes for end-of-session state (2026-06-15)
- PRD file as output format for multi-session grill sessions (2026-06-16)
- grill-me-as step added to role-init creation flow (2026-06-15)
- Project context resolved before role context (2026-06-15)
- Scaffold file pruning rules formalised (2026-06-15)
