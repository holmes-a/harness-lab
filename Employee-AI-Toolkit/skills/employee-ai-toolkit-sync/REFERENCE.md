# Employee AI Toolkit Sync — Reference

Detailed phase logic, conformance markers, report format, and remediation actions.

---

## Phase: Skills

1. List directories in `~/.claude/skills/`; read `skill.md` from each.
2. List directories in `Shareable/skills/`; read `skill.md` from each.
3. Discover all `_skills/` sources across the workspace:
   - Role-scoped: check `[role]/_skills/` for each unprefixed role folder at workspace root (exclude `_archive/`)
   - Project-scoped: check `[project]/_skills/` for each active project folder (containing a `CLAUDE.md` starting with `# Project:`, excluding `_archive/`)
4. For each skill in `Shareable/skills/`, determine status:
   - Installed copy exists, content identical → **In sync**
   - Installed copy exists, content differs → **Drifted** — note which section differs
   - No installed copy → **Not deployed**
5. For each skill discovered in `_skills/` folders, determine status by comparing against `~/.claude/skills/[name]/skill.md`:
   - Installed copy exists, content identical → **In sync (role/project-scoped)**
   - Installed copy exists, content differs → **Drifted (role/project-scoped)** — note source path
   - No installed copy → **Not deployed**
6. For each installed skill not accounted for above:
   - Known project-scoped skill (e.g. `employee-ai-toolkit-sync`) — compare against `skills/` source → **In sync (project-scoped)** or **Drifted (project-scoped)**
   - Not found anywhere → **Untracked** (no action needed)

---

## Phase: Hooks

1. Read `~/.claude/settings.json`; extract the `hooks` object.
2. List `.ps1` and `.sh` files in `Shareable/hooks/` (skip `settings-example.json`).
3. For each Shareable hook, scan for `<YOUR-` placeholder tokens to determine if it is a **distribution template**. Then:
   - No matching hook event in `settings.json` → **Not configured**
   - Configured, script path does not exist on disk → **Script missing**
   - Configured, script exists + **distribution template**: compare non-placeholder lines only
     - Identical → **Personalised** (no action needed)
     - Differ → **Drifted (structural)** — list which non-placeholder lines changed
   - Configured, script exists + **not a distribution template**: compare full content
     - Identical → **In sync**
     - Differ → **Drifted**

---

## Phase: Dashboard

Compare `Shareable/dashboard/` against `_system/dashboard/` file-by-file (index.html and all files under `assets/`):
- `_system/dashboard/` does not exist → **Not deployed**
- All files present and content identical → **In sync**
- Any file differs or is missing → **Drifted** — list which files differ

---

## Phase: Audit

Checks every active project and role folder for structural conformance. Checks section markers only — does not compare content.

**Discover targets:**
- Role folders: all unprefixed directories at workspace root, excluding `_archive/`, `_system/`, `_context/`
- Active projects: for each role folder, all subdirectories (excluding `_archive/`) containing a `CLAUDE.md` that starts with `# Project:`

For `audit:path`, scope discovery to that single path only.

**Required markers — Standard project `CLAUDE.md`:**
`## Brief`, `## Goal`, `## Business Function`, `## Status`, `## Project ID`, `## Type`, `## Cross-Role Work`, `## Key Constraints`, `## Stakeholders`, `## Working Instructions`, `## Facts`, `## Project Files`, `## Entry Standards`
`## Working Instructions` section must also contain `/project-wrap-up`.

**Required markers — Developer project `CLAUDE.md`** (projects under `Developer/`):
`## Brief`, `## Goal`, `## Business Function`, `## Status`, `## Project ID`, `## Type`, `## Cross-Role Work`, `## Tech Stack`, `## Key Constraints`, `## Stakeholders`, `## Working Instructions`, `## Project Files`, `## Entry Standards`

**Required markers — Role `CLAUDE.md`:**
`# Role:`, `## Role Scope`, `## Key Responsibilities`, `## Typical Deliverables`, `## Role Assets`

**Required markers — `_ai/tasks.md`:**
`## Open`, `## Recently Done`, and the pruning comment `<!-- Keep last 3-5`

**Required markers — `_ai/decisions.md`:**
`# Decisions` heading and the entry-format comment block (presence of `**Decision:**` inside a comment block)

**Required markers — `_ai/findings.md`:**
`# Findings` heading and the entry-format comment block (presence of `**Finding:**` inside a comment block)

**What to check per target:**
- Standard project: `CLAUDE.md`, `_ai/tasks.md`, `_ai/decisions.md`, `_ai/findings.md`
- Developer project: `CLAUDE.md`, `_ai/tasks.md` only
- Role: `CLAUDE.md` only

If a file is missing entirely, report **Missing file** rather than listing absent sections.

`_context/bf-*.md` files are freeform — exclude from structural audit.

---

## Report format

Print only the sections matching the active scope. Omit sections for skipped phases entirely.

```
## Skill Sync
| Skill                      | Status                     |
|----------------------------|----------------------------|
| grill-me-as                | ✓ In sync                  |
| project-wrap-up            | ✓ In sync                  |
| employee-ai-toolkit-sync   | ✓ In sync (project-scoped) |
| caveman                    | — Untracked                |

## Hook Sync
| Hook            | Status          |
|-----------------|-----------------|
| pre-compact.ps1 | ✓ Personalised  |

## Dashboard Sync
| File            | Status      |
|-----------------|-------------|
| index.html      | ✓ In sync   |
| assets/main.js  | ✓ In sync   |

## Template Audit
| Target                                  | File         | Status                             |
|-----------------------------------------|--------------|------------------------------------|
| Technical-Director/Employee-AI-Toolkit  | CLAUDE.md    | ✓ Conforms                         |
| Developer/Saturn.Business.AI.Dashboard  | CLAUDE.md    | ⚠ Missing: ## Project ID, ## Type |
| Technical-Director (role)               | CLAUDE.md    | ✓ Conforms                         |
```

For **Drifted** items: summarise which section changed — not a full text diff.
For **non-conforming** items: list only missing markers.

---

## Remediation actions

| Status | Default action |
|---|---|
| **Drifted skill** | Deploy Shareable/ → installed. If installed has in-session changes worth keeping, offer merge-back to Shareable/ first — confirm before overwriting — then deploy. |
| **Drifted (role/project-scoped)** | Deploy `_skills/[name]/skill.md` → installed. Show source path in confirmation prompt. |
| **Drifted (project-scoped)** | Deploy `skills/[name]/skill.md` → installed (used for `employee-ai-toolkit-sync` only). |
| **Not deployed (skill)** | Ask: deploy from source now? (Shareable/ for distributable; `_skills/` for role/project-scoped.) |
| **Not configured hook** | No action — requires manual `settings.json` edit. Point to `settings-example.json`. |
| **Script missing** | No action — requires manual reinstall of the hook script. |
| **Dashboard drifted / not deployed** | Copy all files from `Shareable/dashboard/` to `_system/dashboard/` (create `assets/` subfolder if absent). |
| **Personalised** | No action — correctly personalised. |
| **Drifted (structural)** | Show which non-placeholder lines changed. User must manually re-apply the structural change to preserve their personalised values. |
| **Untracked skill** | No action — managed outside this toolkit. |
| **Non-conforming project/role** | Run `/project-update [path]` — offer to do this now. |

Perform any confirmed operations, then re-confirm the affected item's status.
