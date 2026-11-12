# Project Scaffold Templates

## CLAUDE.md

```markdown
# Project: [Name]

## Purpose
[What and why — one paragraph]

## Status
Active

## Scope
**In scope:**
- 

**Out of scope:**
- 

## Working Instructions
[How Claude should approach tasks — tone, output format, constraints]

At the end of every session, run `/wrap-up` to update `tasks.md`, `decisions.md`, and `findings.md`, then commit all changed project files.

## Project Files
| File | Purpose |
|---|---|
| `tasks.md` | Current state + open tasks + last 3-5 done |
| `decisions.md` | Settled choices — do not re-open without checking contradictions |
| `findings.md` | Observed facts and analysis — check Open findings before starting work |
| `Assets/` | Project-specific assets |

## Entry Standards
**decisions.md:** Date · Decision (1 sentence) · Rationale (1 sentence) · Finding ref · Supersedes ref
**findings.md:** Date · Finding (1 sentence) · Source · Status (Open/Actioned/Superseded) · Decision ref
```

---

## tasks.md

```markdown
Project just set up — no work started yet.

## Open
- [ ] 

## Recently Done
<!-- Keep last 3-5 completed items; delete older ones -->
```

---

## decisions.md

```markdown
# Decisions

<!-- Entry format:
## [Short title]
**Date:** YYYY-MM-DD
**Decision:** [one sentence]
**Rationale:** [one sentence]
**Finding:** [ref to findings.md entry, if any — or omit]
**Supersedes:** [ref to earlier decision, if any — or omit]
-->
```

---

## findings.md

```markdown
# Findings

<!-- Entry format:
## [Short title]
**Date:** YYYY-MM-DD
**Finding:** [one sentence — factual, not interpretive]
**Source:** [test result / analysis / external research / user feedback]
**Status:** Open | Actioned | Superseded
**Decision:** [ref to decisions.md entry, once made — or omit]
-->
```
