import type { Page, SlideMeta, DesignSystem } from '@open-slide/core';
import { Step, Steps, MorphElement } from '@open-slide/core';
import {
  jitrak,
  Shell,
  deckTransition,
  PageFooter,
  morphFadeTransition,
} from '../../themes/jitrak';
import vmVsContainer from './assets/vm-vs-container.png';

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

const VmVsContainerWide: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ compare --vm --container</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Virtual Machine (VM) vs Container</h1>
    <MorphElement id="vm-container">
      <img
        src={vmVsContainer}
        alt=""
        width={1198}
        height={957}
        style={{ display: 'block', width: 800, height: 'auto', objectFit: 'contain' }}
      />
    </MorphElement>
    <PageFooter />
  </Shell>
);
VmVsContainerWide.transition = morphFadeTransition;

const VmVsContainerExample: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ compare --vm --container --example</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 16px' }}>VM vs Container — Example</h1>
    <p style={{ color: jitrak.muted, fontSize: 22, margin: '0 0 20px', maxWidth: 960 }}>
      Each VM bundles its own guest OS — three apps means three full stacks on the hypervisor.
    </p>
    <MorphElement id="vm-container">
      <div style={{ width: 880, height: 500, overflow: 'hidden', borderRadius: 8 }}>
        <img
          src={vmVsContainer}
          alt=""
          width={1198}
          height={957}
          style={{
            display: 'block',
            width: 1320,
            height: 'auto',
            marginLeft: -140,
            marginTop: -30,
          }}
        />
      </div>
    </MorphElement>
    <PageFooter />
  </Shell>
);
VmVsContainerExample.transition = morphFadeTransition;

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

export default [
  Cover,
  About,
  Agenda,
  VmVsContainerWide,
  VmVsContainerExample,
  Utilities,
] satisfies Page[];
