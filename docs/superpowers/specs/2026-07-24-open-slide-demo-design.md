# Open-slide Docker Workshop Demo — Design

**Date:** 2026-07-24  
**Status:** Approved (brainstorming)  
**Branch:** `develop` (do not merge to `main` until after demo review)

## Goal

Ship a **10-page open-slide demo** inside this repo so we can evaluate [open-slide](https://open-slide.dev/) against the existing Google Slides / PPTX workshop deck before deciding whether to migrate Day 1 or the full 177-slide course.

## Context

- Repo: `docker-workshop` — lab demos (`simple-demo`, compose, CI/CD, etc.).
- Source deck: `docs/source/Docker Workshop.pptx` (~177 slides, ~91 media files). Reference only; **no automated PPTX→React conversion**.
- Brand: redesign from scratch using [jitrak.dev](https://jitrak.dev/) visual language; primary typeface **JetBrains Mono**; copy **English only**.

## Approach (locked)

**Single open-slide workspace + one demo deck + shared theme tokens.**

Not in scope: multi-deck layout, separate repo, PPTX auto-convert, Thai i18n, CI deploy of the deck, merge to `main`.

## Repository layout

```text
docker-workshop/                 # existing git repo; work on branch develop
├── slides/                      # open-slide workspace (cli init here)
│   ├── slides/
│   │   └── demo/                # the 10-page deck
│   │       ├── index.tsx
│   │       └── assets/          # only media used by demo pages
│   ├── themes/
│   │   └── jitrak.ts            # color + font tokens
│   ├── open-slide.config.ts
│   └── package.json
├── simple-demo/                 # labs referenced by workshop steps slide
└── docs/source/
    └── Docker Workshop.pptx     # local reference (optional to commit; ~21MB)
```

Init command (from repo root):

```bash
npx @open-slide/cli init slides --no-git
```

`--no-git` is required so the scaffolder does not nest a second git repo or create a stray initial commit inside an existing project.

## Theme

| Token | Value | Notes |
|-------|--------|--------|
| Background | `#0a0f0d` | Near-black terminal from jitrak.dev |
| Text | `#e2e8f0` / `#94a3b8` | Slate light / muted |
| Accent / primary | `#10b981` | Emerald |
| Accent alt | `#00bb7f` | Brighter green |
| Link | `#22d3ee` | Cyan (optional) |
| Font | JetBrains Mono | Headings, body, and code |

Terminal cues (`$` prompts, mono UI chrome) are encouraged where they aid hierarchy. Do not pixel-match the old Google Slides layouts.

## Page outline (10 pages, English)

| # | Id / purpose | Layout to demonstrate |
|---|--------------|------------------------|
| 1 | Cover — Zero to Hero: Docker | Hero + brand |
| 2 | About — Yosapol Jitrak + links | Terminal-style profile |
| 3 | Agenda — Day 1 emphasis | Numbered list |
| 4 | What & Why Docker | Bullet reasons |
| 5 | VM vs Container | Diagram / image (extract from PPTX media if suitable) |
| 6 | Section — Hands-on: Running Containers | Full-bleed section break |
| 7 | Installing Docker | macOS / Windows / Linux columns |
| 8 | Workshop steps — `simple-demo` | Code / terminal block (`run-hello-world.sh`, `run-nginx.sh`) |
| 9 | Utility commands overview | Command list + short descriptions |
| 10 | Q&A | Minimal closer |

Instructor facts for page 2 (from source deck): GitHub `github.com/Eji4h`, site `jitrak.dev`, email as on existing slide.

## Assets

- Prefer extracting needed images from the PPTX (`ppt/media/`) into `slides/slides/demo/assets/`.
- Do not duplicate the full PPTX under `slides/`.
- Diagrams may be simplified React/CSS if extracted bitmaps are poor quality.

## Success criteria

1. On `develop`, `cd slides && npm run dev` serves the demo deck.
2. All 10 pages present; theme is jitrak + JetBrains Mono.
3. Layout variety includes: hero, list, diagram/image, section break, columns, code/terminal, Q&A.
4. Workshop step paths match `simple-demo/` in this repo.
5. Reviewer can decide next phase (Day 1 / full course / theme tweaks) after walking the deck.

## Non-goals (this phase)

- Migrating all 177 slides
- Multi-deck (`day1/`, `day2/`) structure
- Separate git repository
- Automated PPTX conversion
- Thai localization
- Production deploy / CI for slides
- Merging `develop` → `main`

## Follow-up (after demo review)

New brainstorming cycle for Day 1 or full migration; out of scope for this design.
