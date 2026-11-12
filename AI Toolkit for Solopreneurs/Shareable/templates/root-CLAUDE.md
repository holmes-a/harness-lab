# [Business Name] — Business Context

## What We Do

[One paragraph. What the business does, who it serves, and how it operates. Be specific — this is the first thing Claude reads in every session.]

## Key People

- **[Name]** — [Role and what they are responsible for]
- **[Name]** — [Role and what they are responsible for]

## Business Model

- [How customers find you]
- [How you deliver the service or product]
- [Pricing model or revenue structure]
- [Any key constraints — geography, capacity, seasonality]
- [Current scale — revenue, customers, team size]

## Business Functions

All work in this repository is organised around these five functions:

1. **01 - Create Value** — Product and service development; technical systems and infrastructure
2. **02 - Marketing** — Attracting customers; SEO, ads, content, brand
3. **03 - Sales** — Converting leads; pricing, offers, conversion
4. **04 - Deliver Value** — Operations; onboarding, fulfilment, quality
5. **05 - Finance** — Revenue, costs, reporting, bookkeeping

**00 - Cross Function** is the strategy layer — decisions and work that cuts across two or more functions.

## Folder Structure

Each function folder contains:
- A `CLAUDE.md` with function-specific context (read this alongside the root file)
- `_assets/` — reference material owned by this function, not tied to one project
- `_archived/` — completed projects (moved here by `/archive-project`)
- `_skills/` — function-scoped skills (created by `/new-skill`)
- Project folders for current work, sitting **directly under the function** — there is no `Active Projects/` wrapper

[Optional: if a function's work splits by who it serves, add scope folders — e.g. `Company/`, `Customer/`, `Agent/` — and put projects inside those. Keep it consistent per function.]

Each project folder contains a `CLAUDE.md` at its root and its working files under `_ai/`:
- `_ai/tasks.md` — current state, open tasks, recently done
- `_ai/decisions.md` — active choices (graduates to `_ai/facts/` once settled)
- `_ai/findings.md` — observed facts and analysis
- `_ai/facts/` — graduated facts, loaded only when relevant
- `_ai/task-prds/` — briefs and captured items needing more than two lines
- `_assets/` — files belonging to this project alone
- `_skills/` — project-scoped skills

`_assets/`, `_skills/`, `_ai/facts/`, and `_ai/task-prds/` each need a `.gitkeep` while empty — git cannot track an empty directory, and a bare folder silently disappears.

When working within a project, Claude must read context files at all three levels:
**root CLAUDE.md → function CLAUDE.md → project CLAUDE.md**

The `_system/` folder at workspace root holds shared infrastructure:
- `_system/dashboard/` — project dashboard (deployed by `/ai-toolkit-sync`)
- `_system/dashboard/data/projects.json` — project registry
- `_system/hooks/` — Claude Code hooks (deployed by `/ai-toolkit-sync`)

## Tools & Platforms

- **Code & Hosting:** [e.g. GitHub, Vercel, Azure]
- **Marketing:** [e.g. Google Ads, Mailchimp]
- **Finance:** [e.g. Xero, QuickBooks]
- **Productivity:** [e.g. Notion, Office 365]
- **Payments:** [e.g. Stripe, PayPal]

## General Instructions for Claude

- Always use [UK / US] English spelling and grammar
- The audience for customer-facing content is [describe your customers]
- Prefer [structured output / conversational output] unless asked otherwise
- When unsure which function a task falls under, surface the ambiguity rather than guessing
- [Any other business-specific constraints or preferences]
