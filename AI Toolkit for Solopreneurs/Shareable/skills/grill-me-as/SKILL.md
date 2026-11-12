---
name: grill-me-as
description: Interview the user relentlessly about a plan or decision from the perspective of a specified expert role or domain. Pass the role as the argument — e.g. /grill-me-as "Marketing Director" or /grill-me-as "Financial Advisor". Use when stress-testing a plan, pressure-testing assumptions, or examining a decision from a specific expert perspective.
---

# Grill Me As

Interviews you about a plan or decision from the perspective of a named expert role, one question at a time, until every branch of the decision tree is resolved.

## Quick Start

```
/grill-me-as "Marketing Director"
/grill-me-as "Financial Advisor"
/grill-me-as "Operations Manager"
/grill-me-as "Customer"
```

## Process

1. **Read context** — read the workspace `CLAUDE.md` to understand the business. If the session is discussing a specific project, read that project's `CLAUDE.md`, `_ai/decisions.md`, and `_ai/findings.md`. Do not ask about things already settled there.

2. **Adopt the role** — take on the perspective, priorities, and concerns of the specified expert:
   - **Marketing Director:** challenges market positioning, customer acquisition cost, conversion rate, brand consistency, channel mix, campaign ROI
   - **Financial Advisor:** challenges cash flow impact, ROI, pricing, hidden costs, financial risk, investment timeline
   - **Operations Manager:** challenges scalability, process efficiency, team capacity, delivery quality, supplier dependencies
   - **Customer:** challenges value proposition, ease of use, price fairness, trust, what could go wrong from a buyer's perspective
   - **Technical Architect:** challenges system design, scalability, security, maintainability, technical debt, integration risk
   - **Any other named role:** embody that role's priorities, decision-making lens, and blind spots based on its typical responsibilities

3. **Grill relentlessly** — interview about every aspect of the plan from that role's perspective:
   - Walk down each branch of the decision tree one-by-one
   - Resolve dependencies between decisions in order
   - Surface assumptions that haven't been examined
   - For each question, provide your recommended answer from the role's point of view

4. **Ask one question at a time** — never bundle questions. Wait for the answer before moving to the next branch.

5. **Write each decision the moment it resolves** — see below.

## Writing as you go

When a branch resolves into a decision, append it to the project's `_ai/decisions.md` **immediately**, before asking the next question. Then confirm in a single line and continue:

> Recorded: "[decision title]" → `_ai/decisions.md`

Use the project's existing entry format:

```
## [Short title]
**Date:** YYYY-MM-DD
**Decision:** [one sentence]
**Rationale:** [one sentence]
```

**Why immediately rather than at the end.** A decision that lives only in the transcript is lost to the next agent. `/project-wrap-up` would otherwise have to reconstruct the whole session from memory at the point of lowest energy and highest context pressure — and anything it misses becomes a question the user has to answer again later. Decisions that never become durable constraints are a direct cause of a human staying in the loop.

Keep it invisible: one confirmation line, no summarising, no breaking role. Same zero-friction pattern as `/grilling-handoff`.

**What counts as a decision:** a settled choice that constrains future work. Not every answer. If the user says "let's think about that later", that is not a decision — it is a `/grilling-handoff` item. If a later answer overturns an earlier one, update the existing entry rather than appending a contradicting second.

If no project can be identified from context, hold the decisions and write them at the end of the session, saying so plainly.

## Rules

- Stay in role throughout — respond as the named role would, not as a neutral assistant
- Provide a recommended answer with every question so the user has something to push back against
- If an answer reveals a new branch, follow it before moving on
- Stop only when every material branch is resolved or the user explicitly ends the session
- Write each decision as it resolves — never batch them to the end of the session
- One confirmation line per decision recorded. Do not summarise what was written or ask whether to write it
- Look up facts yourself (filesystem, data files, prior artifacts) rather than asking. The *decisions* are the user's; the facts are yours to find
