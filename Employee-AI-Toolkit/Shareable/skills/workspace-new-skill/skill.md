---
name: workspace-new-skill
description: Scaffolds a new role or project-scoped skill in the Saturn workspace. Use when the user wants to create a personal skill tied to a specific role or project — not for distributable skills (those go in Shareable/skills/).
---

# workspace-new-skill

Guides creation of a role or project-scoped skill: determines the correct `_skills/` folder, enforces topic prefix naming, invokes `/write-a-skill` to author the content, then deploys via `/employee-ai-toolkit-sync`.

## Process

### Step 1 — Gather details

Ask the following four questions before doing anything else:

1. **Scope** — is this skill scoped to a *role* or a *project*?
2. **Location** — which role or project folder? (e.g. `Compliance-Officer/` for role-scoped, or `Compliance-Officer/Cyber-Essentials/` for project-scoped)
3. **Topic prefix** — what short prefix identifies this skill's domain? (e.g. `ce-` for Cyber Essentials, `co-` for Compliance Officer)
4. **Function name** — what does this skill do? (e.g. `answer-question`, `review-control`)

Derive the skill name as `[prefix][function]` — e.g. `ce-answer-question`.
Derive the target path as `[location]/_skills/[name]/skill.md`.

Confirm both the name and the full path with the user before proceeding.

### Step 2 — Author the skill

Invoke `/write-a-skill`. The skill name and purpose are already known — use them to pre-answer the requirements gathering questions where possible so the user isn't asked twice.

### Step 3 — Save to the correct folder

Once `/write-a-skill` produces the `skill.md` content, save it to the confirmed path:

- Role-scoped: `[role]/_skills/[name]/skill.md`
- Project-scoped: `[project]/_skills/[name]/skill.md`

Create the `_skills/[name]/` folder if it does not exist.

### Step 4 — Deploy

Run `/employee-ai-toolkit-sync` to install the new skill to `~/.claude/skills/` and make it available in all sessions.

## Rules

- Never save to `Shareable/skills/` — that folder is for distributable skills only
- Always use a topic prefix — never use a bare function name
- Always invoke `/write-a-skill` — do not author `skill.md` content without it
- Always confirm the name and path with the user before writing any files
