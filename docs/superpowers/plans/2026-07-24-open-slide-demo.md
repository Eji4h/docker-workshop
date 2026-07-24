# Open-slide Docker Workshop Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 10-page open-slide demo deck (jitrak.dev theme, JetBrains Mono, English) under `slides/` on branch `develop` so the instructor can evaluate open-slide before migrating the full workshop.

**Architecture:** One open-slide workspace at `slides/` (CLI init with `--no-git`). Shared tokens in `slides/themes/jitrak.ts`. One deck at `slides/slides/demo/index.tsx` exporting ten `Page` components. **Lab commands copy from Notion Day1**; theory/diagrams from PPTX. Extract at most the VM/container diagram into deck `assets/`.

**Tech Stack:** [@open-slide/cli](https://open-slide.dev/docs/getting-started), `@open-slide/core`, React, TypeScript, JetBrains Mono (Google Fonts), Node `assert` for a tiny theme/page-count check.

## Global Constraints

- Work only on branch `develop` (already exists); do not merge to `main`.
- English copy only; JetBrains Mono as the primary typeface.
- Theme colors: bg `#0a0f0d`, text `#e2e8f0` / muted `#94a3b8`, accent `#10b981`, accent alt `#00bb7f`.
- **Content sources:** Notion [Docker Workshop](https://app.notion.com/p/eji4h/Docker-Workshop-c2ee4966340b4da5ad725395e1c3a05c) Day1 = install / run / utility commands; PPTX = cover/agenda/why/diagram visuals. Do not invent alternate shell commands when Notion already specifies them.
- Day2 Notion (Compose, real-world, GHA) is out of scope for this demo.
- No PPTX auto-convert; no multi-deck; no separate repo; no Thai i18n; no CI deploy for slides.
- Always pass `--no-git` to open-slide init inside this existing repo.
- Every page fills the 1920×1080 canvas (`width`/`height` `100%`).
- Spec: `docs/superpowers/specs/2026-07-24-open-slide-demo-design.md`.

## Content sources

| Source | URL / path | Use in demo |
|--------|------------|-------------|
| Notion root | [Docker Workshop](https://app.notion.com/p/eji4h/Docker-Workshop-c2ee4966340b4da5ad725395e1c3a05c) | Index → Day1 / Day2 |
| Notion Day1 | child page under root | Pages 7–9 exact commands |
| Notion Day2 | child page under root | Follow-up only (not demo) |
| PPTX | `docs/source/Docker Workshop.pptx` | Pages 1–6 visuals / theory; extract `image14.png` for page 5 |

## File map

| Path | Responsibility |
|------|----------------|
| `slides/` | Open-slide workspace root (`package.json`, `open-slide.config.ts`, etc.) |
| `slides/themes/jitrak.ts` | Color + font tokens + shared `slideRoot` style helper |
| `slides/slides/demo/index.tsx` | Deck entry: `meta` + default export of 10 pages |
| `slides/slides/demo/assets/vm-vs-container.png` | Diagram image extracted from PPTX |
| `slides/scripts/check-demo.mjs` | Asserts theme exports + exactly 10 pages |
| `docs/source/Docker Workshop.pptx` | Visual / diagram reference (leave as-is; do not require commit) |
| Notion Day1 | Canonical lab commands for pages 7–9 |

---

### Task 1: Init open-slide workspace on `develop`

**Files:**
- Create: `slides/**` (via CLI scaffolder)
- Modify: none in app code yet
- Test: `slides/package.json` exists; `npm run dev` can start

**Interfaces:**
- Consumes: none
- Produces: workspace at `slides/` with nested `slides/getting-started/` starter deck, empty `themes/`, `open-slide.config.ts`

- [ ] **Step 1: Confirm branch**

```bash
cd /Volumes/Backup/Works/teachs/docker-workshop
git branch --show-current
```

Expected: `develop`

- [ ] **Step 2: Scaffold workspace (no nested git)**

```bash
npx @open-slide/cli init slides --no-git --use-npm
```

Expected: creates `slides/package.json`, `slides/slides/getting-started/`, `slides/themes/`, `slides/open-slide.config.ts`. Must **not** create `slides/.git`.

If the CLI prompts interactively, re-run with the same flags; do not init at repo root.

- [ ] **Step 3: Verify install and ignore nested git**

```bash
test ! -d slides/.git && echo "no nested git OK"
cd slides && npm install && node -e "require('./package.json')" && cd ..
```

Expected: `no nested git OK`; install completes.

- [ ] **Step 4: Smoke-run dev server briefly**

```bash
cd slides && npm run dev
```

Expected: Vite/dev server on `http://localhost:5173` (or next free port) without crash. Stop with Ctrl+C after confirming it boots.

- [ ] **Step 5: Commit scaffold**

```bash
cd /Volumes/Backup/Works/teachs/docker-workshop
git add slides/
git commit -m "$(cat <<'EOF'
chore: scaffold open-slide workspace under slides/

EOF
)"
```

---

### Task 2: Jitrak theme tokens + check script

**Files:**
- Create: `slides/themes/jitrak.ts`
- Create: `slides/scripts/check-demo.mjs`
- Modify: `slides/package.json` (add `"check": "node scripts/check-demo.mjs"`)
- Test: `slides/scripts/check-demo.mjs`

**Interfaces:**
- Consumes: none
- Produces:
  - `export const jitrak` object with `bg`, `text`, `muted`, `accent`, `accentAlt`, `link`, `font`
  - `export function slideRoot(extra?: React.CSSProperties): React.CSSProperties`
  - Check script later will also require demo deck; for this task only assert theme keys exist (deck assert added in Task 3)

- [ ] **Step 1: Write failing check for theme file**

Create `slides/scripts/check-demo.mjs`:

```js
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const themePath = join(root, 'themes', 'jitrak.ts');
assert.equal(existsSync(themePath), true, 'themes/jitrak.ts must exist');
console.log('check-demo: theme file present');
```

- [ ] **Step 2: Run check — expect fail before theme exists (if theme not written yet)**

```bash
cd slides && node scripts/check-demo.mjs
```

Expected: FAIL with `themes/jitrak.ts must exist` if Step 3 not done yet. If you write theme first, skip to Step 4.

- [ ] **Step 3: Write theme tokens**

Create `slides/themes/jitrak.ts`:

```ts
import type { CSSProperties } from 'react';

export const jitrak = {
  bg: '#0a0f0d',
  text: '#e2e8f0',
  muted: '#94a3b8',
  accent: '#10b981',
  accentAlt: '#00bb7f',
  link: '#22d3ee',
  font: '"JetBrains Mono", ui-monospace, monospace',
} as const;

export function slideRoot(extra: CSSProperties = {}): CSSProperties {
  return {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    background: jitrak.bg,
    color: jitrak.text,
    fontFamily: jitrak.font,
    padding: '72px 96px',
    ...extra,
  };
}
```

- [ ] **Step 4: Wire npm script and run check**

In `slides/package.json`, add under `"scripts"`:

```json
"check": "node scripts/check-demo.mjs"
```

```bash
cd slides && npm run check
```

Expected: prints `check-demo: theme file present` and exits 0.

- [ ] **Step 5: Commit**

```bash
git add slides/themes/jitrak.ts slides/scripts/check-demo.mjs slides/package.json
git commit -m "$(cat <<'EOF'
feat: add jitrak theme tokens for open-slide demo

EOF
)"
```

---

### Task 3: Replace starter with `demo` deck shell (10 stubs)

**Files:**
- Create: `slides/slides/demo/index.tsx`
- Delete or leave unused: `slides/slides/getting-started/` (prefer delete starter after demo works)
- Modify: `slides/scripts/check-demo.mjs` (assert 10 pages via static parse)
- Test: `npm run check`; `npm run build` or `npm run dev`

**Interfaces:**
- Consumes: `jitrak`, `slideRoot` from `../../../themes/jitrak.ts` (adjust relative path to `slides/themes/jitrak.ts` → from `slides/slides/demo/` that is `../../../themes/jitrak.ts`)
- Produces: `export default Page[]` length 10; `export const meta: SlideMeta`

- [ ] **Step 1: Extend check to require demo deck and 10 `Page` components**

Replace `slides/scripts/check-demo.mjs` with:

```js
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const themePath = join(root, 'themes', 'jitrak.ts');
const demoPath = join(root, 'slides', 'demo', 'index.tsx');

assert.equal(existsSync(themePath), true, 'themes/jitrak.ts must exist');
assert.equal(existsSync(demoPath), true, 'slides/demo/index.tsx must exist');

const src = readFileSync(demoPath, 'utf8');
assert.match(src, /export default \[/, 'demo must default-export a page array');
const pageConsts = [...src.matchAll(/^const (\w+): Page/gm)].map((m) => m[1]);
assert.equal(pageConsts.length, 10, `expected 10 Page consts, got ${pageConsts.length}: ${pageConsts.join(', ')}`);
assert.match(src, /JetBrains Mono|jitrak\.font/, 'demo must use jitrak font tokens');
console.log('check-demo: theme + 10 pages OK');
```

- [ ] **Step 2: Run check — expect fail (demo missing)**

```bash
cd slides && npm run check
```

Expected: FAIL `slides/demo/index.tsx must exist`

- [ ] **Step 3: Create demo deck with 10 stub pages + font loader**

Create `slides/slides/demo/index.tsx`:

```tsx
import type { CSSProperties, ReactNode } from 'react';
import type { Page, SlideMeta } from '@open-slide/core';
import { jitrak, slideRoot } from '../../../themes/jitrak';

export const meta: SlideMeta = {
  title: 'Docker Workshop — Demo',
};

function Fonts() {
  return (
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap"
    />
  );
}

function Shell({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={slideRoot(style)}>
      <Fonts />
      {children}
    </div>
  );
}

const Cover: Page = () => (
  <Shell style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ workshop --init</p>
    <h1 style={{ fontSize: 96, letterSpacing: '-0.04em', margin: '24px 0' }}>
      Zero to Hero: <span style={{ color: jitrak.accent }}>Docker</span>
    </h1>
    <p style={{ color: jitrak.muted, fontSize: 32, margin: 0 }}>
      Demo deck · open-slide evaluation
    </p>
  </Shell>
);

const About: Page = () => (
  <Shell>
    <h1 style={{ fontSize: 64, marginTop: 0 }}>About</h1>
    <p style={{ color: jitrak.muted }}>stub</p>
  </Shell>
);

const Agenda: Page = () => (
  <Shell>
    <h1 style={{ fontSize: 64, marginTop: 0 }}>Agenda</h1>
    <p style={{ color: jitrak.muted }}>stub</p>
  </Shell>
);

const WhyDocker: Page = () => (
  <Shell>
    <h1 style={{ fontSize: 64, marginTop: 0 }}>What & Why Docker</h1>
    <p style={{ color: jitrak.muted }}>stub</p>
  </Shell>
);

const VmVsContainer: Page = () => (
  <Shell>
    <h1 style={{ fontSize: 64, marginTop: 0 }}>VM vs Container</h1>
    <p style={{ color: jitrak.muted }}>stub</p>
  </Shell>
);

const HandsOnSection: Page = () => (
  <Shell style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ fontSize: 72, textAlign: 'center' }}>Hands-on Workshop</h1>
  </Shell>
);

const InstallDocker: Page = () => (
  <Shell>
    <h1 style={{ fontSize: 64, marginTop: 0 }}>Installing Docker</h1>
    <p style={{ color: jitrak.muted }}>stub</p>
  </Shell>
);

const WorkshopSteps: Page = () => (
  <Shell>
    <h1 style={{ fontSize: 64, marginTop: 0 }}>Workshop steps</h1>
    <p style={{ color: jitrak.muted }}>stub</p>
  </Shell>
);

const UtilityCommands: Page = () => (
  <Shell>
    <h1 style={{ fontSize: 64, marginTop: 0 }}>Utility commands</h1>
    <p style={{ color: jitrak.muted }}>stub</p>
  </Shell>
);

const QA: Page = () => (
  <Shell style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <h1 style={{ fontSize: 96 }}>Q & A</h1>
  </Shell>
);

export default [
  Cover,
  About,
  Agenda,
  WhyDocker,
  VmVsContainer,
  HandsOnSection,
  InstallDocker,
  WorkshopSteps,
  UtilityCommands,
  QA,
] satisfies Page[];
```

If the TypeScript import path to `themes/jitrak` fails under the scaffold’s `tsconfig` paths, fix aliases or use a relative path that resolves; do not invent a second theme file.

- [ ] **Step 4: Run check — expect pass**

```bash
cd slides && npm run check
```

Expected: `check-demo: theme + 10 pages OK`

- [ ] **Step 5: Remove starter deck (optional but preferred)**

```bash
rm -rf slides/slides/getting-started
```

Confirm `npm run dev` still lists the `demo` deck.

- [ ] **Step 6: Commit**

```bash
git add slides/slides/demo slides/scripts/check-demo.mjs
git add -u slides/slides/getting-started
git commit -m "$(cat <<'EOF'
feat: add demo deck shell with 10 stub pages

EOF
)"
```

---

### Task 4: Content pages 1–4 (Cover, About, Agenda, Why)

**Files:**
- Modify: `slides/slides/demo/index.tsx` (replace stubs for `Cover`, `About`, `Agenda`, `WhyDocker`)
- Test: `npm run check`; visual pass in `npm run dev`

**Interfaces:**
- Consumes: `Shell`, `jitrak`, `slideRoot`
- Produces: filled pages 1–4 (no `stub` text)

- [ ] **Step 1: Implement Cover, About, Agenda, WhyDocker**

Replace those four components with:

```tsx
const Cover: Page = () => (
  <Shell style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ workshop --init</p>
    <h1 style={{ fontSize: 96, letterSpacing: '-0.04em', margin: '24px 0', lineHeight: 1.05 }}>
      Zero to Hero:{' '}
      <span style={{ color: jitrak.accent }}>Docker</span>
    </h1>
    <p style={{ color: jitrak.muted, fontSize: 32, margin: 0 }}>
      For IT / Software Developers
    </p>
    <p style={{ color: jitrak.muted, fontSize: 24, marginTop: 48 }}>
      By Yosapol Jitrak · jitrak.dev
    </p>
  </Shell>
);

const About: Page = () => (
  <Shell>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ whoami</p>
    <h1 style={{ fontSize: 72, margin: '16px 0 48px' }}>Yosapol Jitrak</h1>
    <div style={{ display: 'grid', gap: 20, fontSize: 28, color: jitrak.muted }}>
      <div>
        <span style={{ color: jitrak.accent }}>github</span>  github.com/Eji4h
      </div>
      <div>
        <span style={{ color: jitrak.accent }}>web</span>     jitrak.dev
      </div>
      <div>
        <span style={{ color: jitrak.accent }}>profile</span> yosapol.jitrak.dev
      </div>
      <div>
        <span style={{ color: jitrak.accent }}>mail</span>    yosapoljittarak@hotmail.com
      </div>
    </div>
  </Shell>
);

const Agenda: Page = () => (
  <Shell>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cat agenda.md</p>
    <h1 style={{ fontSize: 64, margin: '16px 0 40px' }}>Agenda · Day 1</h1>
    <ol style={{ margin: 0, paddingLeft: 40, fontSize: 30, lineHeight: 1.7, color: jitrak.text }}>
      <li>Get to Know Docker</li>
      <li>Hands-on: Running Docker Container</li>
      <li>Basic Docker Commands</li>
      <li>Networking and Volumes</li>
      <li>Running an Application in Docker</li>
    </ol>
    <p style={{ color: jitrak.muted, fontSize: 22, marginTop: 40 }}>Day 2 covered in a later deck.</p>
  </Shell>
);

const WhyDocker: Page = () => {
  const reasons = [
    'Solve “it works on my machine”',
    'Run multiple projects with different app versions',
    'Easy to ship',
    'DevOps automation (CI/CD)',
    'Registries + multi-platform images',
    'Microservices & cloud (K8s, Cloud Run, ECS)',
  ];
  return (
    <Shell>
      <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker --why</p>
      <h1 style={{ fontSize: 64, margin: '16px 0 40px' }}>What & Why Docker</h1>
      <ul style={{ margin: 0, paddingLeft: 36, fontSize: 28, lineHeight: 1.65 }}>
        {reasons.map((r) => (
          <li key={r} style={{ marginBottom: 8 }}>
            <span style={{ color: jitrak.accentAlt }}>▸</span> {r}
          </li>
        ))}
      </ul>
    </Shell>
  );
};
```

- [ ] **Step 2: Verify**

```bash
cd slides && npm run check
```

Expected: pass. In browser (`npm run dev`), flip pages 1–4; no “stub” copy.

- [ ] **Step 3: Commit**

```bash
git add slides/slides/demo/index.tsx
git commit -m "$(cat <<'EOF'
feat: fill demo cover, about, agenda, and why-docker pages

EOF
)"
```

---

### Task 5: Page 5 diagram asset + VM vs Container

**Files:**
- Create: `slides/slides/demo/assets/vm-vs-container.png` (from PPTX `ppt/media/image14.png`)
- Modify: `slides/slides/demo/index.tsx` (`VmVsContainer`)
- Test: visual; `npm run check`

**Interfaces:**
- Consumes: asset import as URL/module per Vite (default open-slide/Vite asset import)
- Produces: page 5 showing title + diagram image

- [ ] **Step 1: Extract diagram from PPTX**

```bash
cd /Volumes/Backup/Works/teachs/docker-workshop
mkdir -p slides/slides/demo/assets
unzip -p "docs/source/Docker Workshop.pptx" "ppt/media/image14.png" > slides/slides/demo/assets/vm-vs-container.png
file slides/slides/demo/assets/vm-vs-container.png
```

Expected: PNG image data. If `image14.png` looks wrong when previewed, try `image10.png` from the same slide and rename accordingly.

- [ ] **Step 2: Implement VmVsContainer page**

At top of `index.tsx` add:

```tsx
import vmVsContainer from './assets/vm-vs-container.png';
```

Replace component:

```tsx
const VmVsContainer: Page = () => (
  <Shell>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ compare vm container</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 32px' }}>Virtual Machine vs Container</h1>
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '720px',
      }}
    >
      <img
        src={vmVsContainer}
        alt="Virtual machine versus container architecture"
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
      />
    </div>
    <p style={{ color: jitrak.muted, fontSize: 18, margin: 0 }}>
      Credit: docker.com/resources/what-container
    </p>
  </Shell>
);
```

If the default import type errors, add `slides/slides/demo/assets.d.ts`:

```ts
declare module '*.png' {
  const src: string;
  export default src;
}
```

- [ ] **Step 3: Verify in browser**

`npm run dev` → page 5 shows the diagram, not a broken image.

- [ ] **Step 4: Commit**

```bash
git add slides/slides/demo/assets slides/slides/demo/index.tsx slides/slides/demo/assets.d.ts 2>/dev/null
git add slides/slides/demo/
git commit -m "$(cat <<'EOF'
feat: add VM vs container diagram page to demo deck

EOF
)"
```

---

### Task 6: Pages 6–10 (section, install, steps, commands, Q&A)

**Files:**
- Modify: `slides/slides/demo/index.tsx`
- Test: `npm run check`; full click-through of 10 pages

**Interfaces:**
- Consumes: Notion Day1 install / first-container / utility snippets (canonical); `simple-demo/` paths in repo
- Produces: complete demo deck

- [ ] **Step 1: Implement remaining pages (commands must match Notion Day1)**

```tsx
const HandsOnSection: Page = () => (
  <Shell
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>06 · hands-on</p>
    <h1 style={{ fontSize: 80, margin: '24px 0', letterSpacing: '-0.03em' }}>
      Running Docker Container
    </h1>
    <p style={{ color: jitrak.muted, fontSize: 32, margin: 0 }}>
      Install → first containers → utility commands
    </p>
  </Shell>
);

const InstallDocker: Page = () => {
  const cols = [
    {
      os: 'macOS',
      detail: 'Homebrew\nbrew install --cask docker',
    },
    {
      os: 'Windows',
      detail: 'Winget (Admin)\nwinget install -e --id Docker.DockerDesktop',
    },
    {
      os: 'Ubuntu',
      detail:
        'get.docker.com\ncurl -fsSL https://get.docker.com -o get-docker.sh\nsudo sh ./get-docker.sh\nsudo usermod -aG docker $USER',
    },
  ];
  return (
    <Shell>
      <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ install docker</p>
      <h1 style={{ fontSize: 56, margin: '16px 0 48px' }}>Installing Docker</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
        {cols.map((c) => (
          <div
            key={c.os}
            style={{
              border: `1px solid ${jitrak.accent}33`,
              borderRadius: 12,
              padding: 28,
              background: '#00000040',
            }}
          >
            <h2 style={{ color: jitrak.accentAlt, fontSize: 36, marginTop: 0 }}>{c.os}</h2>
            <pre
              style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                fontFamily: jitrak.font,
                fontSize: 20,
                color: jitrak.muted,
                lineHeight: 1.5,
              }}
            >
              {c.detail}
            </pre>
          </div>
        ))}
      </div>
    </Shell>
  );
};

const WorkshopSteps: Page = () => (
  <Shell>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cd simple-demo</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 36px' }}>First containers</h1>
    <div
      style={{
        background: '#00000066',
        border: `1px solid ${jitrak.accent}40`,
        borderRadius: 12,
        padding: 36,
        fontSize: 26,
        lineHeight: 1.7,
      }}
    >
      <div>
        <span style={{ color: jitrak.accent }}>$</span> cd simple-demo
      </div>
      <div style={{ color: jitrak.muted, marginTop: 24 }}># hello-world</div>
      <div>
        <span style={{ color: jitrak.accent }}>$</span> docker run hello-world
      </div>
      <div style={{ color: jitrak.muted, marginTop: 24 }}># nginx on :8080</div>
      <div>
        <span style={{ color: jitrak.accent }}>$</span> docker run --detach --publish 8080:80 --name web
        nginx
      </div>
    </div>
  </Shell>
);

const UtilityCommands: Page = () => {
  const rows = [
    ['docker ps', 'Show running containers'],
    ['docker ps -a', 'Show all containers'],
    ['docker logs -f web', 'Follow nginx logs'],
    ['open localhost:8080', 'Open website in browser'],
    ['docker inspect web', 'Inspect container'],
    ['docker exec -it web /bin/bash', 'Shell into container (then ls / printenv)'],
    ['exit  or  Ctrl+D', 'Leave container shell'],
  ];
  return (
    <Shell>
      <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker --help | head</p>
      <h1 style={{ fontSize: 56, margin: '16px 0 36px' }}>Utility commands</h1>
      <div style={{ display: 'grid', gap: 14 }}>
        {rows.map(([cmd, desc]) => (
          <div key={cmd} style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
            <code style={{ color: jitrak.accentAlt, fontSize: 24 }}>{cmd}</code>
            <span style={{ color: jitrak.muted, fontSize: 24 }}>{desc}</span>
          </div>
        ))}
      </div>
    </Shell>
  );
};

const QA: Page = () => (
  <Shell
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <h1 style={{ fontSize: 120, margin: 0, letterSpacing: '-0.04em' }}>Q & A</h1>
    <p style={{ color: jitrak.muted, fontSize: 32, marginTop: 32 }}>
      Next: decide Day 1 migration vs theme tweaks
    </p>
  </Shell>
);
```

- [ ] **Step 2: Full verification**

```bash
cd slides && npm run check && npm run build
```

Expected: check passes; build exits 0.

Manual: open `npm run dev`, walk all 10 pages — confirm layout variety and that pages 7–9 match Notion Day1 commands (`logs -f`, `exec … /bin/bash`, winget/brew/get.docker.com).

- [ ] **Step 3: Commit**

```bash
git add slides/slides/demo/index.tsx
git commit -m "$(cat <<'EOF'
feat: complete open-slide demo pages 6–10

EOF
)"
```

---

### Task 7: Demo handoff note (short)

**Files:**
- Create: `slides/README.md`
- Test: none beyond file exists

**Interfaces:**
- Consumes: none
- Produces: how to run the demo on `develop`

- [ ] **Step 1: Write README**

Create `slides/README.md` with this content (plain markdown file):

- Title: `Docker Workshop — open-slide demo`
- Point to spec: `docs/superpowers/specs/2026-07-24-open-slide-demo-design.md`
- Run instructions: `cd slides && npm install && npm run dev`
- Note: open the **demo** deck; `npm run check` asserts theme + 10 pages
- Note: work stays on `develop` until expand/merge decision
- [ ] **Step 2: Commit**

```bash
git add slides/README.md
git commit -m "$(cat <<'EOF'
docs: add slides README for open-slide demo

EOF
)"
```

---

## Self-review (plan vs spec)

| Spec requirement | Task |
|------------------|------|
| Workspace under `slides/`, `--no-git`, branch `develop` | Task 1 |
| jitrak tokens + JetBrains Mono | Tasks 2–3 |
| 10 English pages per outline | Tasks 3–6 |
| Notion Day1 commands on pages 7–9 | Task 6 |
| Diagram from PPTX media | Task 5 |
| `simple-demo` paths/commands | Task 6 |
| Success: `npm run dev` + layout variety | Tasks 6–7 |
| Non-goals (no full migrate, no main merge, no Day2 yet) | Global Constraints |

No TBD placeholders. Page const names in check script match `index.tsx`. Relative import `../../../themes/jitrak` matches `slides/slides/demo/` → `slides/themes/`.
