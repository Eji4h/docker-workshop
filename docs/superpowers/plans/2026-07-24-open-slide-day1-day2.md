# Open-slide Day1 + Day2 Full Decks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the open-slide `demo` deck with full English **Day1** and **Day2** teaching decks (PPTX theory + Notion labs), shared jitrak course kit, and Rich motion (Steps + transitions + Morph ≤2–3/day).

**Architecture:** Inventory-first. Expand `slides/themes/jitrak.tsx` into a course kit (`Shell`, `deckTransition`, `PageFooter`). Delete `slides/slides/demo/`. Author `slides/slides/day-1/index.tsx` from Day1 inventory (PPTX ~1–89 + Notion Day1), then Day2 inventory + `day-2` (PPTX ~90–177 + Notion Day2). Shared code only in `themes/` and `assets/`.

**Tech Stack:** `@open-slide/core` (`Page`, `Step`/`Steps`, `SlideTransition`, `MorphElement`, `useSlidePageNumber`, `DesignSystem`), React, TypeScript, JetBrains Mono, Node `assert` check script.

## Global Constraints

- Branch: `develop`
- Copy language: **English only**
- Lab commands: **verbatim** from Notion Day1 / Day2 when present — never invent alternates
- Theory/diagram order: follow `docs/source/Docker Workshop.pptx` (Day1 ≈ slides 1–89, Day2 ≈ 90–177)
- Canvas: 1920×1080; split pages on overflow — do not shrink below type-scale floors
- Brand: Cover `brand="hero"`; other pages default `corner` via theme `Shell`
- Motion: module `export const transition = deckTransition`; Steps only where inventory `Steps=yes`; Morph ≤2–3 ids per day, listed in inventory
- Deck file contract: one `index.tsx` + optional `assets/` per deck — no sibling `.tsx` helpers
- Do not edit `package.json` / `open-slide.config.ts` unless a check script rename requires updating the `check` npm script only
- Spec: `docs/superpowers/specs/2026-07-24-open-slide-day1-day2-design.md`

### Page authoring playbook (all content tasks)

For each inventory row in the task’s PPTX range:

1. Open PPTX slide(s) and matching Notion section (if `Notion` column set).
2. Choose layout: cover / section / theory bullets / diagram+caption / lab terminal / columns.
3. Wrap in `<Shell>` (hero only on Cover). Include `<PageFooter />` except Cover.
4. If `Steps=yes`, wrap deferred beats in `<Steps><Step>…</Step></Steps>` (Step = direct child).
5. If `Morph` set, wrap shared nodes in `<MorphElement id="…">` on both adjacent pages; set opacity-only morph transition on the **incoming** page (and reverse page if backward morph needed).
6. Import images from `./assets/` only after copying from `ppt/media/` or existing demo assets.
7. Append `const Name: Page` to `export default […]` in inventory order.
8. Re-run `npm run check` after each chapter commit.

### Notion lab anchors (canonical)

- Day1 page: https://app.notion.com/p/0b3b6693d7b94ab6a9fafde069f9806a  
- Day2 page: https://app.notion.com/p/b12648dd782f4589947ec61ef0001e75  
- Root index: https://app.notion.com/p/eji4h/Docker-Workshop-c2ee4966340b4da5ad725395e1c3a05c  

---

### Task 1: Write Day1 inventory

**Files:**
- Create: `docs/superpowers/specs/2026-07-24-day1-inventory.md`
- Modify: `docs/superpowers/specs/2026-07-24-open-slide-demo-design.md` (Follow-up pointer only)
- Test: file exists + table row count ≥ 40 (Day1 is large; exact count = PPTX 1–89 after merge/split decisions)

**Interfaces:**
- Consumes: PPTX slide list (titles extracted), Notion Day1 markdown
- Produces: inventory table used by Tasks 4–10; Morph ids reserved: `vm-container` (required), optional `j-logo` (skip if costly)

- [ ] **Step 1: Create inventory file with schema + chapter map**

Write `docs/superpowers/specs/2026-07-24-day1-inventory.md`:

```markdown
# Day1 open-slide inventory

**Sources:** PPTX slides 1–89 · Notion Day1  
**Morph budget:** ≤3 — planned: `vm-container` (diagram continuity). Optional: `j-logo`.

## Schema

| # | Title | Role | PPTX | Notion | Steps | Morph | Notes |
|---|-------|------|------|--------|-------|-------|-------|

## Chapters (fill every PPTX slide into rows; split if needed)

| Chapter | PPTX range | Focus |
|---------|------------|--------|
| A Opening | 1–5 | Cover, Day1 marker, About, Course intro, Agenda |
| B Get to Know Docker | 6–20 | Why Docker, credits/diagrams, VM vs Container, architecture, registry |
| C Hands-on Running Containers | 21–36 | Install, playground, git clone, first containers, utilities, Kahoot |
| D Images & Dockerfile | 37–58 | Dockerfile, CMD/ENTRYPOINT labs, hub push, image/container cmds |
| E Network, Storage, Apps | 59–69 | Networks, mounts, MERN, remove all, link/volume labs |
| F Security & Resources | 70–89 | Security, multi-stage, scout, stats/limits — ends before PPTX “Day 2” |

## Rows

<!-- Implementer: add one row per open-slide page. Start from PPTX titles;
     set Steps=yes for Notion lab sequences and long bullet builds;
     Morph=vm-container on the pair that carries the VM↔Container visual. -->
```

Fill the **Rows** table completely in this task (every teaching beat from PPTX 1–89). Credit-only slides may become short caption pages or be folded into the prior diagram page with a credit line — record the decision in Notes. Do **not** leave empty chapters.

Minimum Morph decision to record:

| Morph id | Pages (titles) | Notes |
|----------|----------------|-------|
| `vm-container` | … → … | opacity-only morph transition on incoming |

- [ ] **Step 2: Assert inventory quality**

```bash
cd /Volumes/Backup/Works/teachs/docker-workshop
python3 - <<'PY'
from pathlib import Path
p = Path('docs/superpowers/specs/2026-07-24-day1-inventory.md')
assert p.is_file(), 'missing day1 inventory'
text = p.read_text()
assert '| PPTX |' in text or '| PPTX |' in text.replace('PPTX','PPTX')
rows = [ln for ln in text.splitlines() if ln.startswith('|') and ln.count('|') >= 6]
# header + separator + data; require ≥ 40 data-ish rows after filtering separators
data = [r for r in rows if not set(r.replace('|','').strip()) <= set('-: ') and 'Title' not in r]
assert len(data) >= 40, f'expected ≥40 inventory rows, got {len(data)}'
assert 'vm-container' in text, 'must plan vm-container morph'
print(f'day1-inventory OK: {len(data)} rows')
PY
```

Expected: `day1-inventory OK: N rows` with N ≥ 40.

- [ ] **Step 3: Point demo design Follow-up at new spec**

In `docs/superpowers/specs/2026-07-24-open-slide-demo-design.md`, replace the Follow-up bullets with:

```markdown
## Follow-up (after demo review)

- **Brand mark:** done — see `2026-07-24-jitrak-logo-brand-design.md`.
- **Full Day1 + Day2 decks:** approved — see `2026-07-24-open-slide-day1-day2-design.md` and plan `docs/superpowers/plans/2026-07-24-open-slide-day1-day2.md`.
```

- [ ] **Step 4: Commit**

```bash
cd /Volumes/Backup/Works/teachs/docker-workshop
git add docs/superpowers/specs/2026-07-24-day1-inventory.md \
  docs/superpowers/specs/2026-07-24-open-slide-demo-design.md
git commit -m "$(cat <<'EOF'
docs: add Day1 open-slide inventory from PPTX and Notion

EOF
)"
```

---

### Task 2: Delete demo + retarget check script

**Files:**
- Delete: `slides/slides/demo/` (entire tree)
- Create: `slides/scripts/check-decks.mjs`
- Modify: `slides/package.json` (`check` script)
- Delete: `slides/scripts/check-demo.mjs` (after rename/replace)
- Test: `slides/scripts/check-decks.mjs`

**Interfaces:**
- Consumes: inventory path; theme path; later `day-1` / `day-2`
- Produces: `npm run check` asserts no demo, brand asset, theme kit strings, day-1 exists when present

- [ ] **Step 1: Write failing check for “demo must be gone” + day-1 required**

Create `slides/scripts/check-decks.mjs`:

```js
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const demoPath = join(root, 'slides', 'demo', 'index.tsx');
const day1Path = join(root, 'slides', 'day-1', 'index.tsx');
const day2Path = join(root, 'slides', 'day-2', 'index.tsx');
const brandPath = join(root, 'assets', 'brand', 'j-logo-black.png');
const themePathTsx = join(root, 'themes', 'jitrak.tsx');
const themePathTs = join(root, 'themes', 'jitrak.ts');
const themePath = existsSync(themePathTsx) ? themePathTsx : themePathTs;
const invDay1 = join(root, '..', 'docs', 'superpowers', 'specs', '2026-07-24-day1-inventory.md');

assert.equal(existsSync(demoPath), false, 'slides/demo must be deleted');
assert.equal(existsSync(brandPath), true, 'assets/brand/j-logo-black.png must exist');
assert.equal(existsSync(themePath), true, 'themes/jitrak.ts(x) must exist');
assert.equal(existsSync(invDay1), true, 'Day1 inventory spec must exist');

const themeSrc = readFileSync(themePath, 'utf8');
assert.match(themeSrc, /JitrakMark/, 'theme must export JitrakMark');
assert.match(themeSrc, /brandedRoot/, 'theme must export brandedRoot');
assert.match(themeSrc, /export function Shell/, 'theme must export Shell');
assert.match(themeSrc, /deckTransition/, 'theme must export deckTransition');
assert.match(themeSrc, /PageFooter/, 'theme must export PageFooter');

assert.equal(existsSync(day1Path), true, 'slides/day-1/index.tsx must exist');
const day1 = readFileSync(day1Path, 'utf8');
assert.match(day1, /export default \[/, 'day-1 must default-export pages');
assert.match(day1, /brand=["']hero["']/, 'day-1 Cover must use brand="hero"');
assert.match(day1, /from ['"]\.\.\/\.\.\/themes\/jitrak['"]/, 'day-1 must import course kit');
assert.match(day1, /deckTransition|export const transition/, 'day-1 must wire deck transition');
assert.match(day1, /<Steps>|\bSteps\b/, 'day-1 must use Steps somewhere');
assert.match(day1, /MorphElement/, 'day-1 must use MorphElement somewhere');

if (existsSync(day2Path)) {
  const day2 = readFileSync(day2Path, 'utf8');
  assert.match(day2, /export default \[/, 'day-2 must default-export pages');
  assert.match(day2, /brand=["']hero["']/, 'day-2 Cover must use brand="hero"');
}

console.log('check-decks: demo gone + day-1 kit/motion OK');
```

Update `slides/package.json` script:

```json
"check": "node scripts/check-decks.mjs"
```

- [ ] **Step 2: Run check — expect fail (demo still exists and/or day-1 missing)**

```bash
cd /Volumes/Backup/Works/teachs/docker-workshop/slides && npm run check
```

Expected: FAIL (`slides/demo must be deleted` and/or `day-1 must exist` / missing Shell).

- [ ] **Step 3: Delete demo tree and old check script**

```bash
cd /Volumes/Backup/Works/teachs/docker-workshop
rm -rf slides/slides/demo
rm -f slides/scripts/check-demo.mjs
```

- [ ] **Step 4: Commit check + deletion (day-1 assertions will still fail until Task 4)**

If check cannot pass until later tasks, temporarily comment **only** the `day1Path` existence + day-1 content asserts behind `const REQUIRE_DAY1 = true` and set `REQUIRE_DAY1 = false` in this commit — then Task 4 flips it to `true`. Prefer:

```js
const REQUIRE_DAY1 = false; // Task 4 sets true
…
if (REQUIRE_DAY1) {
  assert.equal(existsSync(day1Path), true, 'slides/day-1/index.tsx must exist');
  // … day-1 asserts …
}
```

```bash
git add -A slides/scripts slides/package.json slides/slides
git add -u slides/slides/demo slides/scripts/check-demo.mjs
git commit -m "$(cat <<'EOF'
chore: remove open-slide demo deck and retarget checks

EOF
)"
```

---

### Task 3: Expand jitrak theme into course kit

**Files:**
- Modify: `slides/themes/jitrak.tsx`
- Test: `slides/scripts/check-decks.mjs` (theme asserts; day-1 still optional)

**Interfaces:**
- Consumes: existing `jitrak`, `brandedRoot`, `JitrakMark`, `BrandMode`
- Produces:
  - `export function Shell(props: { children: ReactNode; style?: CSSProperties; brand?: BrandMode }): JSX.Element`
  - `export const deckTransition: SlideTransition`
  - `export function PageFooter(): JSX.Element`

- [ ] **Step 1: Extend check — require Shell / deckTransition / PageFooter**

Ensure Task 2’s theme asserts are present. Run:

```bash
cd /Volumes/Backup/Works/teachs/docker-workshop/slides && npm run check
```

Expected: FAIL matching `Shell` (or similar) until Step 2.

- [ ] **Step 2: Implement course kit in `slides/themes/jitrak.tsx`**

Keep existing token/brand exports. Append (imports at top):

```tsx
import type { CSSProperties, ReactNode } from 'react';
import type { SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import jLogo from '../assets/brand/j-logo-black.png';

// … existing jitrak, BrandMode, slideRoot, brandedRoot, JitrakMark …

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

/** Quiet rise — house transition for Day1/Day2 */
export const deckTransition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

/** Opacity-only pair for morphing pages (assign on both sides of a morph cut). */
export const morphFadeTransition: SlideTransition = {
  duration: 280,
  exit: { duration: 224, easing: EASE_IN, keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: {
    duration: 308,
    delay: 112,
    easing: EASE_OUT,
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
  },
  morph: { duration: 868, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
};

export function Shell({
  children,
  style,
  brand = 'corner',
}: {
  children: ReactNode;
  style?: CSSProperties;
  brand?: BrandMode;
}) {
  return (
    <div style={brandedRoot(brand, style)}>
      {brand === 'hero' ? <JitrakMark size="hero" /> : null}
      {brand === 'corner' ? <JitrakMark size="corner" /> : null}
      {children}
    </div>
  );
}

export function PageFooter() {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 96,
        bottom: 40,
        fontSize: 20,
        color: jitrak.muted,
        fontFamily: jitrak.font,
        pointerEvents: 'none',
      }}
    >
      {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </div>
  );
}
```

Note: `brandedRoot('corner')` already sets `position: 'relative'` so footer absolute works. For `hero` Cover without relative, either skip footer on Cover or pass `style={{ position: 'relative' }}` when using footer.

- [ ] **Step 3: Run check**

```bash
cd /Volumes/Backup/Works/teachs/docker-workshop/slides && npm run check
```

Expected: theme asserts pass; day-1 still skipped if `REQUIRE_DAY1 === false`.

- [ ] **Step 4: Commit**

```bash
git add slides/themes/jitrak.tsx slides/scripts/check-decks.mjs
git commit -m "$(cat <<'EOF'
feat: add Shell, deckTransition, and PageFooter course kit

EOF
)"
```

---

### Task 4: Scaffold `day-1` deck (Cover + chrome + transition)

**Files:**
- Create: `slides/slides/day-1/index.tsx`
- Create: `slides/slides/day-1/assets.d.ts` (copy from demo if needed)
- Modify: `slides/scripts/check-decks.mjs` — set `REQUIRE_DAY1 = true`
- Move/copy: `vm-vs-container.png` from old demo assets if still needed (recover from git if deleted):  
  `git show HEAD:slides/slides/demo/assets/vm-vs-container.png` → write file, or from PPTX media
- Test: `npm run check`, `npm run build`

**Interfaces:**
- Consumes: `Shell`, `deckTransition`, `PageFooter`, `jitrak` from theme
- Produces: runnable `day-1` with ≥3 pages (Cover, About, Agenda) and `export const transition = deckTransition`

- [ ] **Step 1: Enable day-1 asserts; run check — expect fail**

Set `REQUIRE_DAY1 = true` in `check-decks.mjs`. Run `npm run check` → FAIL missing `day-1`.

- [ ] **Step 2: Write scaffold `slides/slides/day-1/index.tsx`**

```tsx
import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import {
  jitrak,
  Shell,
  deckTransition,
  PageFooter,
} from '../../themes/jitrak';

export const meta: SlideMeta = {
  title: 'Docker Workshop — Day 1',
  createdAt: '2026-07-24T10:09:12.417Z',
};

export const design: DesignSystem = {
  palette: { bg: '#0a0f0d', text: '#e2e8f0', accent: '#10b981' },
  fonts: {
    display: '"JetBrains Mono", ui-monospace, monospace',
    body: '"JetBrains Mono", ui-monospace, monospace',
  },
  typeScale: { hero: 96, body: 28 },
  radius: 12,
};

export const transition = deckTransition;

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-day-1';
if (typeof document !== 'undefined' && !document.getElementById(FONT_LINK_ID)) {
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

const Cover: Page = () => (
  <Shell
    brand="hero"
    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
  >
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ workshop --day 1</p>
    <h1 style={{ fontSize: 96, letterSpacing: '-0.04em', margin: '24px 0', lineHeight: 1.05 }}>
      Zero to Hero: <span style={{ color: jitrak.accent }}>Docker</span>
    </h1>
    <p style={{ color: jitrak.muted, fontSize: 32, margin: 0 }}>For IT / Software Developers</p>
    <p style={{ color: jitrak.muted, fontSize: 24, marginTop: 48 }}>
      Day 1 · By Yosapol Jitrak · jitrak.dev
    </p>
  </Shell>
);

const About: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ whoami</p>
    <h1 style={{ fontSize: 72, margin: '16px 0 48px' }}>Yosapol Jitrak</h1>
    <div style={{ display: 'grid', gap: 20, fontSize: 28, color: jitrak.muted }}>
      <div>
        <span style={{ color: jitrak.accent }}>github</span> github.com/Eji4h
      </div>
      <div>
        <span style={{ color: jitrak.accent }}>web</span> jitrak.dev
      </div>
      <div>
        <span style={{ color: jitrak.accent }}>mail</span> yosapol@jitrak.dev
      </div>
    </div>
    <PageFooter />
  </Shell>
);

const Agenda: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cat agenda.md</p>
    <h1 style={{ fontSize: 64, margin: '16px 0 40px' }}>Agenda · Day 1</h1>
    <ol style={{ margin: 0, paddingLeft: 40, fontSize: 30, lineHeight: 1.7 }}>
      <li>Get to Know Docker</li>
      <li>Hands-on: Running Docker Container</li>
      <li>Images, Dockerfile, Registry</li>
      <li>Networking, Volumes, Advanced Usage</li>
      <li>Security & Resources</li>
    </ol>
    <PageFooter />
  </Shell>
);

export default [Cover, About, Agenda] satisfies Page[];
```

Temporarily satisfy Steps/Morph check asserts by adding **placeholder pages** that Task 5 replaces with real content — OR relax those two asserts until Task 5 (preferred: Task 5 immediately follows; if check requires them now, add a tiny Steps page and Morph pair stub).

If check requires Steps + Morph before Task 5, append stubs:

```tsx
import { Step, Steps, MorphElement } from '@open-slide/core';
import { morphFadeTransition } from '../../themes/jitrak';

const StepsStub: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <Steps>
      <h1 style={{ fontSize: 56 }}>Utilities (stub)</h1>
      <Step>
        <pre style={{ fontSize: 28 }}>docker ps</pre>
      </Step>
      <Step>
        <pre style={{ fontSize: 28 }}>docker ps -a</pre>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const MorphA: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <MorphElement id="vm-container">
      <div style={{ width: 400, height: 240, background: jitrak.accent }} />
    </MorphElement>
    <PageFooter />
  </Shell>
);
MorphA.transition = morphFadeTransition;

const MorphB: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <MorphElement id="vm-container">
      <div style={{ width: 720, height: 360, background: jitrak.link }} />
    </MorphElement>
    <PageFooter />
  </Shell>
);
MorphB.transition = morphFadeTransition;

export default [Cover, About, Agenda, StepsStub, MorphA, MorphB] satisfies Page[];
```

- [ ] **Step 3: Run check + build**

```bash
cd /Volumes/Backup/Works/teachs/docker-workshop/slides && npm run check && npm run build
```

Expected: both exit 0.

- [ ] **Step 4: Commit**

```bash
git add slides/slides/day-1 slides/scripts/check-decks.mjs
git commit -m "$(cat <<'EOF'
feat: scaffold open-slide day-1 deck with course kit

EOF
)"
```

---

### Task 5: Replace stubs with real Steps lab + VM Morph

**Files:**
- Modify: `slides/slides/day-1/index.tsx`
- Create: `slides/slides/day-1/assets/vm-vs-container.png` (from git history or PPTX)
- Test: `npm run check`, visual `npm run dev`

**Interfaces:**
- Consumes: Notion utilities commands; `morphFadeTransition`; inventory Morph row for `vm-container`
- Produces: real utilities Steps page; morphing diagram pages using extracted asset

- [ ] **Step 1: Restore diagram asset**

```bash
cd /Volumes/Backup/Works/teachs/docker-workshop
mkdir -p slides/slides/day-1/assets
git show HEAD:slides/slides/demo/assets/vm-vs-container.png > slides/slides/day-1/assets/vm-vs-container.png 2>/dev/null \
  || git log --all --diff-filter=A --summary -- '**/vm-vs-container.png' | head
# If missing, extract from PPTX ppt/media/ matching the VM vs Container slide
file slides/slides/day-1/assets/vm-vs-container.png
```

- [ ] **Step 2: Implement Utilities Steps page (Notion verbatim)**

Replace `StepsStub` with:

```tsx
const Utilities: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker --help | utilities</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 32px' }}>Utilities Commands Overview</h1>
    <Steps>
      <Step>
        <pre style={{ fontSize: 26, margin: '12px 0' }}>{`# Show all running containers
docker ps`}</pre>
      </Step>
      <Step>
        <pre style={{ fontSize: 26, margin: '12px 0' }}>{`# Show all containers
docker ps -a`}</pre>
      </Step>
      <Step>
        <pre style={{ fontSize: 26, margin: '12px 0' }}>{`# Logs website with nginx container
docker logs -f web`}</pre>
      </Step>
      <Step>
        <pre style={{ fontSize: 26, margin: '12px 0' }}>{`# Inspect + shell
docker inspect web
docker exec -it web /bin/bash`}</pre>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);
```

- [ ] **Step 3: Implement Morph diagram pair**

```tsx
import vmVsContainer from './assets/vm-vs-container.png';

const VmVsContainerWide: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ compare --vm --container</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Virtual Machine vs Container</h1>
    <MorphElement id="vm-container">
      <img
        src={vmVsContainer}
        alt=""
        width={1100}
        height={620}
        style={{ display: 'block', width: 1100, height: 'auto', objectFit: 'contain' }}
      />
    </MorphElement>
    <PageFooter />
  </Shell>
);
VmVsContainerWide.transition = morphFadeTransition;

// Optional second page: crop/zoom layout with same MorphElement id="vm-container"
// If inventory only has one diagram page, morph from a prior “Evolution” page that
// shows a smaller version of the same asset — both must share id="vm-container".
```

Align page titles/order with inventory Morph row. Remove colored stub rectangles.

- [ ] **Step 4: check + build + commit**

```bash
cd slides && npm run check && npm run build
git add slides/slides/day-1
git commit -m "$(cat <<'EOF'
feat: add Day1 utilities Steps and VM↔container morph

EOF
)"
```

---

### Task 6: Day1 Chapter A–B fill (Opening + Get to Know Docker)

**Files:**
- Modify: `slides/slides/day-1/index.tsx`
- Create: assets under `slides/slides/day-1/assets/` as needed from PPTX `ppt/media/`
- Test: page count for chapters A–B matches inventory rows for PPTX 1–20

**Interfaces:**
- Consumes: inventory chapters A–B; playbook above
- Produces: all pages for PPTX 1–20 in `export default`

- [ ] **Step 1: List inventory rows for PPTX 1–20**

```bash
rg -n "\|.*\|.*\|.*\| 1[0-9]? \||\| [1-9] \|" docs/superpowers/specs/2026-07-24-day1-inventory.md | head -80
```

- [ ] **Step 2: Author every row in range** using the Page authoring playbook. Reuse Cover/About/Agenda from Task 4; expand Agenda if inventory differs. Theory pages: heading + ≤5 bullets or one diagram. Credit slides: caption + link line.

Section divider example:

```tsx
const GetToKnowDocker: Page = () => (
  <Shell
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ cd theory/</p>
    <h1 style={{ fontSize: 88, margin: '24px 0' }}>Get to Know Docker</h1>
    <PageFooter />
  </Shell>
);
```

- [ ] **Step 3: Assert chapter coverage**

```bash
cd slides && node -e "
import {readFileSync} from 'fs';
const src=readFileSync('slides/day-1/index.tsx','utf8');
const pages=[...src.matchAll(/^const (\\w+): Page/gm)].map(m=>m[1]);
console.log('pages', pages.length, pages.join(','));
"
npm run check && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add slides/slides/day-1
git commit -m "$(cat <<'EOF'
feat: fill Day1 opening and Get-to-Know-Docker pages

EOF
)"
```

---

### Task 7: Day1 Chapter C — Hands-on Running Containers

**Files:**
- Modify: `slides/slides/day-1/index.tsx` (+ assets)
- Test: `npm run check`

**Interfaces:**
- Consumes: Notion Install / Git clone / first container / utilities (utilities already partially in Task 5 — merge, don’t duplicate)
- Produces: pages for PPTX ~21–36

- [ ] **Step 1: Author install page — Notion commands verbatim**

```tsx
const InstallingDocker: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ install docker</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 32px' }}>Installing Docker</h1>
    <Steps>
      <Step>
        <div>
          <div style={{ color: jitrak.accent, fontSize: 24 }}>macOS (Homebrew)</div>
          <pre style={{ fontSize: 24 }}>{`brew install --cask docker`}</pre>
        </div>
      </Step>
      <Step>
        <div>
          <div style={{ color: jitrak.accent, fontSize: 24 }}>Windows (Admin)</div>
          <pre style={{ fontSize: 22 }}>{`winget install -e --id Docker.DockerDesktop`}</pre>
        </div>
      </Step>
      <Step>
        <div>
          <div style={{ color: jitrak.accent, fontSize: 24 }}>Ubuntu</div>
          <pre style={{ fontSize: 20 }}>{`curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh ./get-docker.sh
sudo usermod -aG docker $USER`}</pre>
        </div>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);
```

Include remaining Notion lab pages for first containers + git clone; Windows/WSL setting slides from PPTX as diagram/caption pages.

- [ ] **Step 2: check + build + commit**

```bash
cd slides && npm run check && npm run build
git add slides/slides/day-1
git commit -m "$(cat <<'EOF'
feat: add Day1 hands-on install and first-container pages

EOF
)"
```

---

### Task 8: Day1 Chapters D–F — Images through Resources

**Files:**
- Modify: `slides/slides/day-1/index.tsx` (+ assets)
- Test: final Day1 page count equals inventory row count

**Interfaces:**
- Consumes: Notion Dockerfile / ENTRYPOINT / Hub / advanced / security / scout / stats sections; PPTX 37–89
- Produces: complete `day-1` `export default` matching inventory

- [ ] **Step 1: Author all remaining inventory rows** (playbook). Lab multi-step Notion blocks → Steps. Multi-stage Dockerfile demos → one page per demo or stepped reveal of stages.

- [ ] **Step 2: Page-count gate**

```bash
cd /Volumes/Backup/Works/teachs/docker-workshop
python3 - <<'PY'
from pathlib import Path
import re
inv = Path('docs/superpowers/specs/2026-07-24-day1-inventory.md').read_text()
rows = [ln for ln in inv.splitlines() if ln.startswith('|') and 'Title' not in ln and not set(ln.replace('|','').strip()) <= set('-: ')]
src = Path('slides/slides/day-1/index.tsx').read_text()
pages = re.findall(r'^const (\w+): Page', src, re.M)
assert len(pages) == len(rows), f'pages {len(pages)} != inventory {len(rows)}'
print('Day1 complete:', len(pages))
PY
cd slides && npm run check && npm run build
```

- [ ] **Step 3: Visual smoke** — `npm run dev`, spot-check Cover, one Steps lab, Morph pair, last page footer total.

- [ ] **Step 4: Commit**

```bash
git add slides/slides/day-1
git commit -m "$(cat <<'EOF'
feat: complete Day1 open-slide deck from inventory

EOF
)"
```

---

### Task 9: Day2 inventory

**Files:**
- Create: `docs/superpowers/specs/2026-07-24-day2-inventory.md`
- Test: same quality script as Task 1 with ≥40 rows; Morph ≤3 (candidate: `compose-service`)

**Interfaces:**
- Consumes: PPTX 90–177; Notion Day2
- Produces: inventory for Tasks 10–11

- [ ] **Step 1: Write inventory** with chapters e.g. Compose intro · Compose labs · Real-world stack · Tips · CI/CD · Orchestration preview · Close/Q&A. Mark Morph `compose-service` if using a growing compose diagram.

- [ ] **Step 2: Quality assert (≥40 rows, morph budget noted)**

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/2026-07-24-day2-inventory.md
git commit -m "$(cat <<'EOF'
docs: add Day2 open-slide inventory from PPTX and Notion

EOF
)"
```

---

### Task 10: Scaffold + fill `day-2` deck

**Files:**
- Create: `slides/slides/day-2/index.tsx`, `assets/`, `assets.d.ts`
- Modify: check already handles day-2 if present
- Test: `npm run check && npm run build`; page count == Day2 inventory

**Interfaces:**
- Consumes: course kit; Day2 inventory; Notion Compose / real-world / GHA / cleanup
- Produces: complete `day-2` deck

- [ ] **Step 1: Scaffold** mirroring Day1 (`meta.title = 'Docker Workshop — Day 2'`, `FONT_LINK_ID = 'osd-webfont-day-2'`, `export const transition = deckTransition`, Cover `brand="hero"`).

- [ ] **Step 2: Author all inventory rows** (playbook). Example Compose lab Steps from Notion:

```tsx
const ComposeMultiContainer: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker compose</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Compose II: Multi-container Apps</h1>
    <Steps>
      <Step>
        <pre style={{ fontSize: 24 }}>{`cd ../../docker-compose-demo/multi-container-app`}</pre>
      </Step>
      <Step>
        <pre style={{ fontSize: 24 }}>{`docker compose up
docker compose up --build`}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 28 }}>Open localhost:8000 — then Ctrl+C to exit</p>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);
```

- [ ] **Step 3: Page-count gate** (same Python pattern against `2026-07-24-day2-inventory.md` + `day-2/index.tsx`)

- [ ] **Step 4: check + build + commit**

```bash
cd slides && npm run check && npm run build
git add slides/slides/day-2
git commit -m "$(cat <<'EOF'
feat: add full Day2 open-slide deck from inventory

EOF
)"
```

---

### Task 11: Docs + README handoff

**Files:**
- Modify: `slides/README.md`
- Modify: design spec status if needed
- Test: none beyond reading

- [ ] **Step 1: Update `slides/README.md`**

```markdown
# Docker Workshop — open-slide

Full teaching decks (jitrak theme, JetBrains Mono, English):

- **day-1** — PPTX ~1–89 + Notion Day1 labs
- **day-2** — PPTX ~90–177 + Notion Day2 labs

Spec: `docs/superpowers/specs/2026-07-24-open-slide-day1-day2-design.md`

## Run

\`\`\`bash
cd slides
npm install
npm run dev
\`\`\`

Open **day-1** or **day-2**. `npm run check` asserts demo removed + kit + day-1 (and day-2 if present).
```

- [ ] **Step 2: Commit**

```bash
git add slides/README.md
git commit -m "$(cat <<'EOF'
docs: point slides README at day-1 and day-2 decks

EOF
)"
```

---

## Self-review (plan author)

1. **Spec coverage:** Goal, delete demo, inventories, course kit, motion, Day1 then Day2, checks, non-goals → Tasks 1–11.
2. **Placeholders:** Content Tasks 6–8/10 intentionally use the playbook + verbatim Notion samples rather than pasting 150 full pages of JSX into the plan — inventory is the page-level contract.
3. **Types:** `Shell`, `deckTransition`, `morphFadeTransition`, `PageFooter`, `BrandMode` consistent across tasks.
