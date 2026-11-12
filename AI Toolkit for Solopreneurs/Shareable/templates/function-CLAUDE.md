# [Function Name] — Context

## Purpose

[One paragraph. What this business function covers, what decisions live here, and what Claude should use this context for.]

## What Belongs Here

- [Bullet list of work types, topics, and decisions that sit within this function]
- [Be specific — this tells Claude whether a task should be handed off elsewhere]

## Projects

Active projects sit directly under this function folder — there is no `Active Projects/` wrapper. Completed projects move to `_archived/` via `/archive-project`.

[If this function uses scope folders, say so here — e.g. "Projects are split by who they serve: `Company/`, `Customer/`, `Agent/`." Delete this line if the function has no scope split and projects sit directly at the function root.]

## Working Approach

- [Preferred output style for this function — e.g. "default to structured analysis", "prefer short bullets over paragraphs"]
- [Any function-specific constraints — tone, audience, platforms]
- [Any recurring task patterns worth noting]

## Assets

The `_assets/` folder holds reference material and files that belong to this function but are not tied to a single project.

## Standard Folders

Every function root contains `_assets/`, `_archived/`, and `_skills/`. Each needs a `.gitkeep` while empty — git cannot track an empty directory, and a bare folder silently disappears.
