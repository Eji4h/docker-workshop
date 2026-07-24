import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { jitrak, slideRoot } from '../../themes/jitrak';

export const meta: SlideMeta = {
  title: 'Docker Workshop — Demo',
};

export const design: DesignSystem = {
  palette: {
    bg: '#0a0f0d',
    text: '#e2e8f0',
    accent: '#10b981',
  },
  fonts: {
    display: '"JetBrains Mono", ui-monospace, monospace',
    body: '"JetBrains Mono", ui-monospace, monospace',
  },
  typeScale: {
    hero: 96,
    body: 28,
  },
  radius: 12,
};

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-demo';
if (typeof document !== 'undefined' && !document.getElementById(FONT_LINK_ID)) {
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

function Shell({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={slideRoot(style)}>{children}</div>;
}

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
