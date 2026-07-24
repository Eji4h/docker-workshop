# Jitrak Logo Brand on open-slide Demo — Design

**Date:** 2026-07-24  
**Status:** Approved (brainstorming)  
**Branch:** `develop`  
**Parent:** `docs/superpowers/specs/2026-07-24-open-slide-demo-design.md` (10-page demo already shipped)

## Goal

Add the **Jitrak “J” logo** (`docs/source/mains`) to the existing open-slide demo so Cover reads as branded and content pages carry a quiet corner mark — **brand only**, no content redesign.

## Locked decisions

| Decision | Choice |
|----------|--------|
| Placement pattern | Cover = large logo; other pages = small corner |
| Corner position | Top-right |
| Cover position | Large mark **above** the title stack (in flow) |
| Implementation approach | Theme helpers in `slides/themes/jitrak.ts` (+ JSX via `.tsx` if needed) |
| Scope | Brand chrome only; do not change page copy, theory, or lab commands |

## Architecture

1. **Source of truth (files):** `docs/source/mains/j-logo-black.png` (625×625). Keep this folder as the master; do not import slides from `docs/` at runtime.
2. **Runtime asset:** Copy once to `slides/assets/brand/j-logo-black.png` (global brand asset per open-slide: reuse via `@assets/...` or relative import from theme).
3. **Theme API** (`slides/themes/jitrak.ts` or `.tsx`):
   - `JitrakMark({ size: 'hero' | 'corner' })` — renders the logo `<img>`
   - `brandedRoot(brand, extra?)` — `slideRoot` plus `position: 'relative'` when `brand === 'corner'`
4. **Demo `Shell`:** accepts `brand?: 'hero' | 'corner' | false`; draws mark; pages only pass the mode.

## Visual rules

| Mode | Display size | Position | Layout impact |
|------|--------------|----------|---------------|
| `hero` | 168px | In flow, first child of Cover `Shell` (logo → `$ workshop…` → title → …) | Pushes Cover content down naturally |
| `corner` | 64px | `position: absolute; top: 48px; right: 64px` | Does **not** reserve flow space |
| `false` | — | No mark | Reserved; unused in this phase |

- `alt=""` (decorative).
- No extra shadow, ring, or background behind the mark (logo already has black circle + grey ring).

## Demo wiring

- `Cover` → `brand="hero"`
- Remaining nine pages → `brand="corner"` (or Shell default `'corner'`)
- Do not change English copy, Notion commands, or the VM diagram page content

## Success criteria

1. Cover shows large Logo J above the text stack.
2. All other demo pages show a top-right mark that does not collide with `$ …` eyebrows or shift content columns.
3. Brand helpers live in the jitrak theme module; demo only selects `hero` / `corner`.
4. Runtime file exists at `slides/assets/brand/j-logo-black.png`.
5. `npm run check` asserts brand asset + theme mark API + demo `brand=` usage.

## Non-goals

- Full course content migration
- Profile photos (`neofetch-profile.png`, `pae-profile-pic.png`)
- Theme redesign / new palettes
- Deploy / Cloudflare Access
- Additional decks (Kubernetes, etc.)

## Spec reference for implementers

Plan tasks appended to: `docs/superpowers/plans/2026-07-24-open-slide-demo.md` (Tasks 8+).
