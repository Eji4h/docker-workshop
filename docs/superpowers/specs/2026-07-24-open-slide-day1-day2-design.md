# Open-slide Day1 + Day2 Full Decks — Design

**Date:** 2026-07-24  
**Status:** Approved (brainstorming)  
**Branch:** `develop`  
**Parent:** Demo evaluation shipped; brand chrome shipped (`jitrak` logo helpers). This replaces the demo with teaching decks.

## Goal

Ship **two full open-slide decks** — `day-1` and `day-2` — covering the Docker workshop in English, with jitrak brand chrome and **Rich** motion (Steps + page transitions + Morph ≤2–3 beats per day). Delete the `demo` deck at the start of implementation.

## Locked decisions

| Decision | Choice |
|----------|--------|
| Decks | Two folders: `slides/slides/day-1/`, `slides/slides/day-2/` |
| Demo | Delete immediately when implementation starts |
| Order | Day1 inventory → delete demo → course kit → Day1 deck → Day2 inventory → Day2 deck |
| Content sources | **Full merge:** PPTX theory/diagrams + Notion Day1/Day2 labs (do not drop material unless it cannot fit the 1080px canvas — then split pages) |
| Language | English only |
| Density | Follow source (PPTX ~177 slides; Day1 ≈ slides 1–89, Day2 ≈ 90–177) |
| Motion | Rich: Steps on lab/theory builds; module `deckTransition`; Morph ≤2–3 per day |
| Shared code | Course kit in `slides/themes/jitrak.tsx` (+ global `assets/brand/`) — not sibling files inside a deck |
| Speaker notes | Out of scope this phase |

## Sources

| Source | Role |
|--------|------|
| `docs/source/Docker Workshop.pptx` | Theory, diagrams, section order (~177 slides). **No automated PPTX→React conversion.** |
| Notion root [Docker Workshop](https://app.notion.com/p/eji4h/Docker-Workshop-c2ee4966340b4da5ad725395e1c3a05c) | Index |
| Notion [Day1](https://app.notion.com/p/0b3b6693d7b94ab6a9fafde069f9806a) | Canonical lab/shell commands for Day1 |
| Notion [Day2](https://app.notion.com/p/b12648dd782f4589947ec61ef0001e75) | Canonical lab/shell commands for Day2 |
| Repo labs (`simple-demo/`, `entrypoint-and-cmd-demo/`, `advance/`, `docker-compose-*`, `ci-cd-demo/`, …) | Paths referenced by Notion steps |

## Architecture

### Pipeline

1. **Inventory** — Markdown tables mapping each open-slide page to PPTX slide # and/or Notion block, plus `Steps?` / `Morph id`.
2. **Delete** `slides/slides/demo/` and retarget checks.
3. **Course kit** — Expand `slides/themes/jitrak.tsx`: keep brand helpers; add `Shell`, `deckTransition`, `PageFooter`, optional shared chrome helpers.
4. **Author `day-1`** page-by-page from inventory (chapter waves).
5. **Inventory Day2** → author `day-2`.

### Repository layout (target)

```text
slides/
├── slides/
│   ├── day-1/
│   │   ├── index.tsx
│   │   └── assets/          # media copied from PPTX as needed
│   └── day-2/
│       ├── index.tsx
│       └── assets/
├── themes/jitrak.tsx        # course kit
├── assets/brand/j-logo-black.png
└── scripts/check-decks.mjs  # replaces check-demo.mjs
docs/superpowers/specs/
├── 2026-07-24-open-slide-day1-day2-design.md   # this file
├── 2026-07-24-day1-inventory.md                # produced in implementation
└── 2026-07-24-day2-inventory.md                # produced before Day2 authoring
```

open-slide constraint: each deck is **one** `index.tsx` (+ `assets/`). Shared UI lives only in `themes/` and `assets/`.

## Course kit API

Retain existing:

- `jitrak` tokens, `BrandMode`, `slideRoot`, `brandedRoot`, `JitrakMark`

Add:

| Export | Behavior |
|--------|----------|
| `Shell` | `brand?: BrandMode` default `'corner'`; renders mark + children via `brandedRoot` |
| `deckTransition` | Quiet rise/dissolve DNA (~200ms); decks `export const transition = deckTransition` |
| `PageFooter` | `useSlidePageNumber()` → `03 / 42`; Cover may omit |
| Optional | Shared eyebrow / terminal block styles only if both decks reuse them |

Each deck also exports `design: DesignSystem` mirroring jitrak tokens for the Design panel.

## Motion rules

- **Transitions:** One DNA per course via `deckTransition`. Section dividers may use a slightly longer settle override.
- **Steps:** Labs, command lists, theory build-ups. Not Cover, full-bleed diagrams shown whole, or pure section titles.
- **Morph (≤2–3 / day):** Chosen only in inventory. Candidates:
  - Day1: VM vs Container continuity; logo hero→corner (optional if costly)
  - Day2: Compose service box join/expand
- Morph pages: opacity-only enter/exit; follow open-slide morph rules (`useIsActivePage`, no `transform` on morph node).

## Inventory row schema

| Column | Meaning |
|--------|---------|
| `#` | 1-based open-slide page index |
| Title | Page heading / role name |
| Role | `cover` \| `section` \| `theory` \| `lab` \| `diagram` \| `exercise` \| `qa` \| … |
| PPTX | Slide number(s) in `Docker Workshop.pptx` (or —) |
| Notion | Day1/Day2 section anchor (or —) |
| Steps | `yes` / `no` |
| Morph | morph `id` or — |
| Notes | e.g. “commands verbatim from Notion” |

Page count is **derived from inventory**, not fixed in advance. Prefer one PPTX idea per page; split if canvas overflows.

## Content rules

- Lab commands: copy from Notion Day1/Day2 **verbatim** when present.
- Theory/diagrams: from PPTX; extract needed bitmaps into deck `assets/`.
- English only.
- Fit 1920×1080; split rather than shrink below type-scale floors.
- Keep jitrak brand: Cover `brand="hero"`; other pages `corner`.

## Success criteria

1. `slides/slides/demo/` is gone.
2. `day-1` (then `day-2`) match their inventories (page count + Steps/Morph flags).
3. Brand chrome works (hero + corner).
4. Module transition active; Steps/Morph only where inventory says.
5. Lab commands match Notion; theory/diagrams align with PPTX order.
6. `npm run check` and `npm run build` pass under `slides/`.

## Non-goals

- Automated PPTX→React conversion  
- Thai / bilingual copy  
- Speaker notes as a deliverable  
- Forced production deploy / Cloudflare Access  
- Merge `develop` → `main` (separate decision)  
- New visual brand / palette redesign  

## Implementation plan

See `docs/superpowers/plans/2026-07-24-open-slide-day1-day2.md`.
