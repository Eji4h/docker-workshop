import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { jitrak, brandedRoot, JitrakMark, type BrandMode } from '../../themes/jitrak';
import vmVsContainer from './assets/vm-vs-container.png';

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

function Shell({
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

const Cover: Page = () => (
  <Shell
    brand="hero"
    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
  >
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
        <span style={{ color: jitrak.accent }}>mail</span>    yosapol@jitrak.dev
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
