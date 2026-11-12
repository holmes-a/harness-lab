---
topic: dashboard
one-liner: Periodic review tool; horizontal swimlanes ordered L→R by roles.json hierarchy; colour reserved for attention signals only.
---

# Fact: Dashboard Design

**One-liner:** Periodic review tool; horizontal swimlanes ordered left-to-right by `roles.json` hierarchy; colour reserved for attention signals only.

## Detail

**Purpose:** The project dashboard is a personal, periodic full-picture review screen — not a session-start launchpad. Primary use is deliberate cross-role scanning at a glance. Session-start navigation is a separate, lower-priority concern captured as an open task.

**Layout:** Roles render as horizontal columns ordered left-to-right by the `roles.json` hierarchy file. Cards stack vertically within each column sorted by `last_worked` descending. Empty columns are always shown — a role with no AI-engaged projects is a signal, not noise to be hidden.

**Colour:** Colour is reserved exclusively for attention signals — Blocked state (red/amber accent) and deadline warnings in the side panel. Type differentiation uses font icons with no colour. Overloading colour (type + status + recency) degrades the scan; a single semantic — colour means "needs attention" — lets the eye go straight to problems.

Full design detail: [task-prds/dashboard-ui-prd.md](../task-prds/dashboard-ui-prd.md)

## Source decisions

- Dashboard is a personal periodic review tool (2026-06-17)
- Dashboard layout — horizontal swimlanes, hierarchy L→R from roles.json (2026-06-17)
- Dashboard colour carries one meaning — attention (2026-06-17)
