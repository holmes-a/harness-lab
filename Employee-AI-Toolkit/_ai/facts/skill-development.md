---
topic: skill-development
one-liner: Shareable/ structure, skill naming origins, and role-init/project-init design decisions — load when writing or deploying skills.
---

# Fact: Skill Development

**Load when:** writing, editing, or deploying distributable or project-scoped skills.

## Shareable/ structure

`Shareable/skills/` is the only skills subfolder under Shareable — `Shareable/dev-skills/` was removed. Project-scoped skills already have a home in `[project]/skills/`; mirroring them into a separate Shareable subfolder created a redundant third copy with no benefit.

## Skill origins

**grill-me-as:** Promoted from `.claude/commands/` (project-scoped) to `~/.claude/skills/` (user-scoped). Commands are project-local and not shareable; as a skill it is available in every session and distributable to other employees.

**Generic project-health rejected:** The only real gap not covered by `/project-wrap-up` is Shareable/ sync — a project-specific concern. `/employee-ai-toolkit-sync` was built as a project-scoped skill instead.

**GitHub Copilot retained for IDE:** Inline completions, refactors, and smaller coding tasks remain with GitHub Copilot in the IDE. The toolkit does not attempt to replace what is already working well.

## role-init and project-init design

`role-init` is a standalone skill rather than embedded questions inside `project-init` — it can be extended independently, invoked directly, and versioned separately. When `project-init` encounters an unrecognised role and the user confirms it is new, it invokes `role-init` to scaffold the role before continuing. This completes the setup flow end-to-end without a separate manual command.

`project-init` generates the project CLAUDE.md from an inline spec in skill.md; `TEMPLATES.md` was removed to eliminate the sync problem between the template file and the inline spec.

All project CLAUDE.md files include both a `## Brief` section (why it exists) and a `## Goal` section (what done looks like).

`role-init` includes a 3–5 question `grill-me-as` round — adopting the most senior existing role's perspective — before creating any role files.

## Source decisions

- Shareable/dev-skills/ removed — only Shareable/skills/ exists (2026-06-16)
- grill-me-as promoted from command to skill (2026-06-15)
- Generic project-health rejected; project-specific sync skill built instead (2026-06-16)
- GitHub Copilot in Visual Studio retained for coding (2026-06-12)
- role-init as a standalone skill, not embedded in project-init (2026-06-15)
- project-init invokes role-init for new roles (2026-06-15)
- TEMPLATES.md removed from project-init (2026-06-15)
- Goal section added to project CLAUDE.md structure (2026-06-15)
- role-init extended to full role creation skill (2026-06-15)
- grill-me-as step added to role-init creation flow (2026-06-15)
