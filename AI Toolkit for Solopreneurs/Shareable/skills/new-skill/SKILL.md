---
name: new-skill
description: Scaffolds a new function or project-scoped skill in the workspace. Use when the user wants to create a personal skill tied to a specific business function or project — not for distributable skills (those go in Shareable/skills/).
---

# new-skill

Guides creation of a function or project-scoped skill: determines the correct `_skills/` folder, enforces topic prefix naming, invokes `/write-a-skill` to author the content, then deploys via `/ai-toolkit-sync`.

## Process

### Step 1 — Gather details

Ask the following four questions before doing anything else:

1. **Scope** — is this skill scoped to a *business function* or a *project*?
2. **Location** — which function or project folder? (e.g. `02 - Marketing/` for function-scoped, or `02 - Marketing/Customer/GBP Posting Engine/` for project-scoped)
3. **Topic prefix** — what short prefix identifies this skill's domain? (e.g. `gbp-` for GBP Posting Engine, `mkt-` for Marketing)
4. **Function name** — what does this skill do? (e.g. `draft-post`, `review-copy`)

Derive the skill name as `[prefix][function]` — e.g. `gbp-draft-post`.
Derive the target path as `[location]/_skills/[name]/SKILL.md`.

Confirm both the name and the full path with the user before proceeding.

### Step 2 — Author the skill

Invoke `/write-a-skill`. The skill name and purpose are already known — use them to pre-answer the requirements gathering questions where possible so the user isn't asked twice.

### Step 3 — Save to the correct folder

Once `/write-a-skill` produces the `SKILL.md` content, save it to the confirmed path:

- Function-scoped: `[function]/_skills/[name]/SKILL.md`
- Project-scoped: `[project]/_skills/[name]/SKILL.md`

Create the `_skills/[name]/` folder if it does not exist.

### Step 4 — Deploy

Run `/ai-toolkit-sync` to deploy the new skill to the workspace `.claude/skills/`, making it available in every session in this workspace. Skills are never installed to `~/.claude/skills/` — that is reserved for business-agnostic tools.

## Rules

- Never save to `Shareable/skills/` — that folder is for distributable skills only
- Always use a topic prefix — never use a bare function name
- Always invoke `/write-a-skill` — do not author `SKILL.md` content without it
- Always confirm the name and path with the user before writing any files
