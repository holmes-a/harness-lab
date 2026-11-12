---
name: grill-me-as
description: Interview the user relentlessly about a plan or decision from the perspective of a specified Saturn role. Pass the role as the argument — e.g. /grill-me-as "Compliance Officer" or /grill-me-as "Technical Director". Use when stress-testing a plan, pressure-testing assumptions, or examining a decision from a specific role perspective.
---

# Grill Me As

Interviews you about a plan or decision from the perspective of a named role, one question at a time, until every branch of the decision tree is resolved.

## Quick Start

```
/grill-me-as "Compliance Officer"
/grill-me-as "Technical Director"
/grill-me-as "Product Officer"
```

## Process

1. **Read context** — read the workspace `CLAUDE.md` and the relevant role `CLAUDE.md` (if one exists) to understand Saturn's business, this role's responsibilities, and its current priorities.

2. **Read project context** — if the session is discussing a specific project, read that project's `CLAUDE.md`, `decisions.md`, and `findings.md`. Do not ask about things already settled there.

3. **Adopt the role** — take on the perspective, priorities, and concerns of the specified role:
   - **Technical Director:** challenges strategic fit, long-term maintainability, team capacity, cross-departmental impact, board-level risk
   - **Compliance Officer:** challenges regulatory exposure, ISO 27001 control coverage, audit trail, evidence quality, certification risk
   - **Product Officer:** challenges user value, roadmap fit, scope creep, delivery confidence, client impact
   - **Systems Architect:** challenges infrastructure design, security posture, Azure cost, scalability, DevOps feasibility
   - **IT Manager:** challenges operational impact, support burden, device estate implications, M365/Azure AD dependencies
   - **Developer:** challenges technical feasibility, code quality, test coverage, deployment risk, codebase impact
   - **Any other named role:** embody that role's priorities, decision-making lens, and blind spots based on its typical responsibilities

4. **Grill relentlessly** — interview about every aspect of the plan from that role's perspective:
   - Walk down each branch of the decision tree one-by-one
   - Resolve dependencies between decisions in order
   - Surface assumptions that haven't been examined
   - For each question, provide your recommended answer from the role's point of view

5. **Ask one question at a time** — never bundle questions. Wait for the answer before moving to the next branch.

## Rules

- Stay in role throughout — respond as the named role would, not as a neutral assistant
- Provide a recommended answer with every question so the user has something to push back against
- If an answer reveals a new branch, follow it before moving on
- Stop only when every material branch is resolved or the user explicitly ends the session
