Role/project-scoped skill convention established; `workspace-new-skill` created and deployed; `employee-ai-toolkit-sync` extended; `project-init` and `project-update` scaffolds updated. Open: dashboard source data-path, session-start navigation, context portability research.

## Open

### High Priority
- [x] Review all skills in `Shareable/skills/` for improvement opportunity using `/write-a-skill`
- [x] Add role-level `assets/` folder — define structure, update scaffold standard, add to `project-init` and `project-update`

### High Priority
- [ ] Rename `Technical-Director/Employee-AI-Toolkit/skills/` → `_skills/` to adopt the new convention; update sync skill source path references accordingly
- [ ] Create `_skills/.gitkeep` at Employee AI Toolkit project level

### Workspace Foundations
- [ ] Add `_context/connections.md` for cross-role, cross-project insights that don't belong to a single project

### Project Management & Dashboard
- [x] Build project dashboard UI
- [ ] Update dashboard source to fetch from `/_system/dashboard/data/roles.json` and `/_system/dashboard/data/projects.json`, rebuild, copy fresh dist to `Shareable/dashboard/`, then run `/employee-ai-toolkit-sync` to redeploy

### Session-Start Navigation (separate session)
- [ ] Design a lightweight project name-to-path mapping — a simple file (not `projects.json`) that lets Claude resolve a plain project name to its workspace path at session start
- [ ] Decide format — a flat markdown table or minimal JSON mapping `{ "name": "path" }` entries; must exclude archived projects
- [ ] Integrate: `project-init` adds an entry on creation; archiving a project removes it
- [ ] Evaluate whether this replaces or supplements the `@` folder navigation pattern

### Context Portability Research
- [ ] Research `AGENTS.md` — structure, which tools use it, and how it compares to `CLAUDE.md`
- [ ] Investigate `copilot-instructions.md` — what VS Copilot reads, what context it supports
- [ ] Define a canonical shared context strategy: one source of truth that each tool either reads natively or maps to

### Tool Evaluation
- [ ] Document current AI tool usage across roles (Claude Code, VS Copilot — any others?)
- [ ] Evaluate GitHub Copilot CLI and Codex CLI as potential Claude Code alternatives — context handling, skills/commands, memory support
- [ ] Define evaluation criteria: what does a "good" employee AI toolkit look like for Saturn?

### Developer Workflow & _ai/ Migration
- [x] Run `/project-update` on all existing projects to adopt `_ai/` scaffold structure
- [x] Update `employee-ai-toolkit-sync` audit criteria to check `_ai/` paths

### Shareable Deliverables
- [ ] Design the `init-ai-toolkit` skill — an interview-driven installer that captures employee-specific context, installs supporting skills, and scaffolds the right folder structure
- [ ] Draft onboarding and training approach — what does a new toolkit user need to know, and how do they get up to speed?

### Testing Phase (Future)
- [ ] Identify a developer from the team for hands-on testing
- [ ] Draft a lightweight evaluation guide for the testing phase

## Inbox
<!-- Items captured mid-session via /grilling-handoff. Surface at next session start ("what's next") for triage. [task] items are to-dos; [finding], [decision], [thought] items will be routed to their own files at triage. -->

## Recently Done
<!-- Keep last 3-5 completed items; delete older ones -->
- [x] Added role-level `assets/` standard — `role-init` updated (folder + `## Role Assets` table), all 6 role CLAUDE.md files updated, folders created, `employee-ai-toolkit-sync` audit criteria updated, `role-init` deployed (2026-06-22)
- [x] Established role/project-scoped skill convention via /grill-me-as session; recorded 3 decisions; defined two scopes, `_skills/` naming, topic prefix, `workspace-new-skill` as enforcing entry point (2026-06-23)
- [x] Created `workspace-new-skill`; extended `employee-ai-toolkit-sync` to deploy `_skills/` folders; updated `project-init` and `project-update` scaffolds to include `_skills/.gitkeep`; updated Shareable README (2026-06-23)
