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
