---
name: role-init
description: Creates a new role folder with CLAUDE.md and updates the workspace CLAUDE.md. Also provides role-specific project interview questions read internally by /project-init. Use when adding a new role to the workspace, or when /project-init encounters an unrecognised role.
---

# Role Init

Two modes of operation:

1. **Creation** — `/role-init [Role Name]` — scaffolds a new role folder, creates its CLAUDE.md, updates the workspace CLAUDE.md, and optionally creates business function context files
2. **Questions** — read internally by `/project-init` to supply role-specific project interview questions (see [REFERENCE.md](REFERENCE.md))

## Quick Start

```
/role-init "Product Officer"
/role-init "Systems Architect"
```

If invoked with no arguments, the interview begins with the role title.

---

## Creation Mode

### Step 1 — Read workspace context

Read the workspace CLAUDE.md to understand the business, existing roles, and naming conventions in use.

### Step 2 — Interview

Ask one question at a time, always providing a recommended answer:

1. What is the role title? (confirm or refine if passed as an argument)
2. What folder name should this role use? (recommend kebab-case from the title — e.g. `Technical-Director`, `Product-Officer`)
3. What does this role own? (scope — one paragraph: what it is responsible for, who it serves, what level it operates at)
4. What are the key responsibilities? (3–5 bullet points)
5. What does this role typically deliver? (3–5 bullet points)
6. Which business functions does this role touch? Check `_context/` for existing function files and offer to reuse them. If new functions are needed, ask for a brief description of each.

### Step 3 — Grill-me-as round

Before creating files, say: *"Before I create anything, let me challenge this role definition."*

Identify the most senior existing role from the workspace CLAUDE.md `## My Roles` section. Apply the grill-me-as process from `~/.claude/skills/grill-me-as/skill.md` — adopt that role's perspective and run **3–5 questions** to stress-test:
- Whether this role is genuinely distinct from existing roles
- Whether the scope is appropriately bounded
- Whether the responsibilities and deliverables are coherent
- Whether adding this role creates organisational ambiguity

### Step 4 — Confirm and create

Summarise what will be created:
- **Folder:** `[Role-Folder]/`
- **Role assets folder:** `[Role-Folder]/_assets/` — empty on creation; populate as reference material accumulates
- **Role skills folder:** `[Role-Folder]/_skills/.gitkeep` — placeholder; holds role-scoped skills created via `/workspace-new-skill`
- **Role CLAUDE.md:** `[Role-Folder]/CLAUDE.md`
- **Workspace update:** new entry added to `## My Roles` in the workspace CLAUDE.md
- **Business function files:** `_context/bf-[function].md` for any new functions (skipped if reusing existing)

Ask for confirmation before writing anything.

**`[Role-Folder]/CLAUDE.md`** — build from interview answers:

| Section | Source |
|---|---|
| `# Role: [Title]` | Q1 answer |
| `@../_context/bf-[function].md` imports | Q6 — one line per function file; omit section if none. Note: `@import` is Claude Code specific — other tools should inline the function file content instead |
| `## Role Scope` | Q3 answer — one paragraph |
| `## Key Responsibilities` | Q4 answer — bullet list |
| `## Typical Deliverables` | Q5 answer — bullet list |
| `## Role Assets` | Empty table placeholder — populate as assets accumulate |

**`## Role Assets`** — append after `## Typical Deliverables`:

```markdown
## Role Assets

`_assets/` — reference material owned by this role and shared across its projects. Load specific files when relevant to the current task.

| File / Folder | Purpose |
|---|---|
| *(none yet)* | |
```

**Workspace CLAUDE.md** — append to `## My Roles`:
- `` `[Role-Folder]/` — [one-clause scope, condensed from Q3] ``

**`_context/bf-[function].md`** — for each new business function:

| Section | Source |
|---|---|
| `# Business Function: [Name]` | Function name |
| Opening paragraph | What this function does and why it matters to the business |
| `**Strategy:**` | High-level direction — what this function optimises for |
| `**Key priorities:**` | Bullet list |
| `**[Role] contribution:**` | How the role-holder contributes — scope, decisions owned, deliverables |

### Step 5 — Register in roles.json

After creating the role files, register the new role in `_system/dashboard/data/roles.json`.

1. Read `_system/dashboard/data/roles.json` (create an empty array `[]` if absent)
2. Show the current hierarchy as a numbered list: `1. Technical Director`, `2. Compliance Officer`, etc.
3. Ask: *"Where should [Role Label] sit in the hierarchy? Enter a position (1–N+1), or press Enter to add at the end."*
4. Insert `{ "key": "[Role-Folder]", "label": "[Role Label]", "order": N }` at the chosen position; renumber all entries sequentially from 1
5. Write the updated array back to `_system/dashboard/data/roles.json`

> Note: `key` must exactly match the role's folder name (kebab-case), as it is used to match against the `role` field in `projects.json`.

Do not commit — the user reviews the created files and commits manually.

---

## Role-Specific Project Questions

Used by `/project-init` during its Step 4 interview. See [REFERENCE.md](REFERENCE.md) for all role question sets.
