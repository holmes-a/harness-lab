# PRD: Project Dashboard UI

## Purpose

A single-page dashboard for personal, periodic review of all AI-engaged projects across Saturn roles. The goal is a full-picture scan — what's active, what's blocked, what's going cold — without opening a single project file.

## Primary User

Adrian Holmes. Personal tool. Not designed for sharing or presentation in v1.

## Primary Use Case

Deliberate periodic review: open the dashboard, scan across all roles, identify anything needing attention, close it. Not a session-start launchpad. Not an always-on screen.

---

## Data Sources

| File | Purpose |
|---|---|
| `projects.json` | Project records — one object per project |
| `roles.json` | Role names and display order — drives column layout |

Both files sit at the workspace root. The dashboard reads them directly. It never writes to them.

### projects.json schema (relevant fields)

```json
{
  "id": "string",
  "name": "string",
  "role": "string — matches role key in roles.json",
  "path": "string — relative workspace path",
  "type": "Ongoing | Defined Goal",
  "status": "Active | Blocked | Completed - Goal Reached | Completed - Partial | Completed - Abandoned",
  "start_date": "YYYY-MM-DD",
  "deadline": "YYYY-MM-DD — optional, Defined Goal only",
  "last_worked": "YYYY-MM-DD",
  "status_note": "string — optional; current stage when Active, reason when Blocked, outcome summary when Completed"
}
```

> **Note:** `status_note` is optional and may be absent from existing records. Handle its absence gracefully.

### roles.json schema (to be created)

```json
[
  { "key": "Technical-Director", "label": "Technical Director", "order": 1 },
  { "key": "Compliance-Officer", "label": "Compliance Officer", "order": 2 }
]
```

> **Note:** `roles.json` does not yet exist. This PRD assumes it will be created before the dashboard is built. Coordinate with project owner.

---

## Layout

### Overall structure

- **Page header** — dashboard title + total active project count
- **Filter bar** — toggle chips (see Filtering)
- **Swimlane area** — horizontal columns, one per role

### Swimlane columns

- One column per role, ordered left-to-right by `order` in `roles.json`
- Column header: role label + project count for that role e.g. "Technical Director (4)"
- Cards stack vertically within each column
- Cards sorted by `last_worked` descending — most recently worked at the top

### Empty columns

- Always shown — a role with no active projects is a signal, not noise
- Display a subtle, muted "No active projects" message in the column body
- Do not hide or collapse empty columns

### Minimum supported resolution

1920 × 1080. No requirement to support smaller viewports. A basic responsive fallback (columns wrapping to rows) is acceptable but not required in v1.

---

## Project Cards

Each project is represented as a card within its role column.

### Card face — four elements only

| Element | Detail |
|---|---|
| **Project name** | Prominent — the primary anchor |
| **Type badge** | Font icon + label: Ongoing / Defined Goal. Neutral colour — type is not a status signal |
| **Last worked** | Human-relative: "2 days ago", "3 weeks ago". Not a raw date |
| **Blocked indicator** | Red/amber badge — shown only when `status === "Blocked"`. In Progress is the default state and carries no label |

No other fields on the card face. Start date, deadline, and path are detail — they belong in the side panel.

### Going cold

If `last_worked` is 30 or more days ago, render the last-worked date in a muted/dimmed style to signal the project is going cold. No additional colour — just reduced visual weight.

---

## Filtering

Two toggle chips in the filter bar, above the swimlane area.

| Chip | Behaviour |
|---|---|
| **Blocked** | Show only Blocked projects across all columns. Empty columns remain visible with their "No active projects" message |
| **Ongoing / Defined Goal** | Show only projects of the selected type. Mutually exclusive — selecting one deselects the other |

Chips show the count of matching projects: e.g. "Blocked (2)".

One click to apply, one click to clear. No search box. No date range. No other filters in v1.

---

## Side Panel

Clicking a card opens a panel that slides in from the right. The main content area is not navigated away from — the panel overlays it.

### Panel contents

| Field | Detail |
|---|---|
| **Project name** | Panel header |
| **Role** | One line — provides context when you've clicked out of the column grouping |
| **Type** | Badge, consistent with card |
| **Status** | Written in full: "In Progress" or "Blocked" |
| **Status note** | Shown beneath status when `status_note` is present. Hidden otherwise |
| **Started** | `start_date` as a readable date e.g. "12 March 2026" |
| **Last worked** | Exact date — not relative (the card shows relative; the panel is precise) |
| **Deadline** | `deadline` formatted as a readable date. Show a visual warning (amber) if within 14 days; red if overdue. Hidden entirely for Ongoing projects |
| **Path** | Workspace-relative path as a copyable string. Copy-to-clipboard on click |

Clicking outside the panel or pressing Escape closes it.

---

## Colour System

Colour carries one meaning only: **attention required**.

| Colour | Used for |
|---|---|
| Red / amber | Blocked badge on card face; Blocked status in panel; deadline warning in panel |
| Muted / dimmed | Going-cold last-worked date (≥30 days) |
| Neutral | Everything else — type badges, role headers, counts, card backgrounds |

Do not use colour for type differentiation. Font icons carry that meaning.

---

## Access

A local file served to the browser. No login, no hosting. Adrian will bookmark it. The developer should confirm whether a simple static file with a relative path to `projects.json` is sufficient, or whether a minimal local server is needed to satisfy browser CORS constraints when reading JSON.

---

## Out of Scope

- Navigation to project folders or CLAUDE.md files from the dashboard
- Write operations of any kind — the dashboard is read-only
- Completed / archived projects — these are removed from `projects.json` on archive; they do not appear
- Mobile or small-viewport support
- Authentication or access control
- Monday.com integration
- Any data not present in `projects.json` or `roles.json`

---

## Dependencies

Before development begins, confirm:

1. **`roles.json` exists** at workspace root with the agreed schema — see parked task in `tasks.md`
2. **`status_note` field** is supported by the skills that write to `projects.json` — done
