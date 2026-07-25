import type { Page, SlideMeta, DesignSystem } from '@open-slide/core';
import { Step, Steps } from '@open-slide/core';
import { jitrak, Shell, deckTransition, PageFooter } from '../../themes/jitrak';
import evolutionOfDeployment from './assets/evolution-of-deployment.png';
import containerizationDiagram from './assets/containerization.png';
import dockerArchitecture from './assets/docker-architecture.png';
import vmVsContainer from './assets/vm-vs-container.png';
import vmVsContainerExample from './assets/vm-vs-container-example.png';
import linuxDistributions from './assets/linux-distributions.png';

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

const captionStyle = {
  color: jitrak.muted,
  fontSize: 16,
  margin: '12px 0 0',
  lineHeight: 1.5,
} as const;

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

const Day1: Page = () => (
  <Shell
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ cd day-1/</p>
    <h1 style={{ fontSize: 120, margin: '24px 0', letterSpacing: '-0.03em' }}>Day 1</h1>
    <PageFooter />
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

const CourseIntroduction: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cat README.md</p>
    <h1 style={{ fontSize: 64, margin: '16px 0 40px' }}>Course Introduction</h1>
    <ul style={{ margin: 0, paddingLeft: 36, fontSize: 28, lineHeight: 1.65 }}>
      <li>Hands-on Docker workshop for IT and software developers</li>
      <li>From container concepts to running real applications</li>
      <li>Bring your laptop — we build and run together</li>
      <li>Workshop repo: github.com/Eji4h/docker-workshop</li>
      <li>Two-day program; Day 1 focuses on core Docker skills</li>
    </ul>
    <PageFooter />
  </Shell>
);

const Agenda: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cat agenda.md</p>
    <h1 style={{ fontSize: 64, margin: '16px 0 32px' }}>Agenda · Day 1</h1>
    <Steps>
      <Step>
        <ol start={1} style={{ margin: 0, paddingLeft: 40, fontSize: 28, lineHeight: 1.7 }}>
          <li>Get to Know Docker</li>
        </ol>
      </Step>
      <Step>
        <ol start={2} style={{ margin: 0, paddingLeft: 40, fontSize: 28, lineHeight: 1.7 }}>
          <li>Hands-on Workshop: Running Docker Container</li>
        </ol>
      </Step>
      <Step>
        <ol start={3} style={{ margin: 0, paddingLeft: 40, fontSize: 28, lineHeight: 1.7 }}>
          <li>Lunch Break</li>
        </ol>
      </Step>
      <Step>
        <ol start={4} style={{ margin: 0, paddingLeft: 40, fontSize: 28, lineHeight: 1.7 }}>
          <li>Basic Docker Commands</li>
        </ol>
      </Step>
      <Step>
        <ol start={5} style={{ margin: 0, paddingLeft: 40, fontSize: 28, lineHeight: 1.7 }}>
          <li>Docker Networking and Volumes</li>
        </ol>
      </Step>
      <Step>
        <ol start={6} style={{ margin: 0, paddingLeft: 40, fontSize: 28, lineHeight: 1.7 }}>
          <li>Application Overview &amp; Running Application in Docker</li>
        </ol>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

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

const WhatAndWhyDocker: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker --why</p>
    <h1 style={{ fontSize: 64, margin: '16px 0 32px' }}>What &amp; Why Docker</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 28, margin: 0 }}>Solve &ldquo;it works on my machine&rdquo;</p>
      </Step>
      <Step>
        <p style={{ fontSize: 28, margin: 0 }}>
          Run multiple projects with different application versions
        </p>
      </Step>
      <Step>
        <p style={{ fontSize: 28, margin: 0 }}>Easy to ship</p>
      </Step>
      <Step>
        <p style={{ fontSize: 28, margin: 0 }}>DevOps automation (CI/CD)</p>
      </Step>
      <Step>
        <p style={{ fontSize: 28, margin: 0 }}>Docker registry and multi-platform images</p>
      </Step>
      <Step>
        <p style={{ fontSize: 28, margin: 0 }}>Microservices and open-source ecosystem</p>
      </Step>
      <Step>
        <p style={{ fontSize: 28, margin: 0 }}>Node cluster</p>
      </Step>
      <Step>
        <p style={{ fontSize: 28, margin: 0 }}>
          Freedom of choice — your own images and preferred registry
        </p>
      </Step>
      <Step>
        <p style={{ fontSize: 28, margin: 0 }}>
          Cloud provider support (Kubernetes, Google Cloud Run, AWS ECS)
        </p>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const EvolutionOfDeployment: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ history deployment</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 20px' }}>Evolution of Deployment</h1>
    <img
      src={evolutionOfDeployment}
      alt=""
      width={1346}
      height={514}
      style={{ display: 'block', width: 1500, height: 'auto', objectFit: 'contain' }}
    />
    <p style={captionStyle}>
      Credits: aqnouch.com · pikandeeweb.com · medium.com/@mazraara · kubernetes.io/docs
    </p>
    <PageFooter />
  </Shell>
);

const VmVsContainerWide: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ compare --vm --container</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Virtual Machine (VM) vs Container</h1>
    <img
      src={vmVsContainer}
      alt=""
      width={2444}
      height={957}
      style={{ display: 'block', width: 1680, height: 'auto', objectFit: 'contain' }}
    />
    <PageFooter />
  </Shell>
);

const VmVsContainerExample: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ compare --vm --container --example</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>VM vs Container — Example</h1>
    <img
      src={vmVsContainerExample}
      alt=""
      width={650}
      height={530}
      style={{ display: 'block', width: 900, height: 'auto', objectFit: 'contain' }}
    />
    <PageFooter />
  </Shell>
);

const LinuxDistributions: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ ls distros/</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 24px' }}>List of Linux Distributions</h1>
    <img
      src={linuxDistributions}
      alt=""
      width={958}
      height={267}
      style={{ display: 'block', width: 1500, height: 'auto', objectFit: 'contain' }}
    />
    <p style={captionStyle}>
      Credit: Wikimedia — en.wikipedia.org/wiki/Linux_distribution#Timeline
    </p>
    <PageFooter />
  </Shell>
);

const containerTraits = [
  'Flexible',
  'Lightweight',
  'Interchangeable',
  'Portable',
  'Scalable',
  'Stackable',
] as const;

const Containerization: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker inspect traits</p>
    <h1 style={{ fontSize: 52, margin: '12px 0 16px' }}>Containerization</h1>
    <Steps>
      {containerTraits.map((trait) => (
        <Step key={trait}>
          <p style={{ fontSize: 30, margin: 0, lineHeight: 1.25, color: jitrak.accentAlt }}>
            {trait}
          </p>
        </Step>
      ))}
      <Step>
        <img
          src={containerizationDiagram}
          alt=""
          width={1919}
          height={944}
          style={{ display: 'block', width: 980, height: 'auto', objectFit: 'contain' }}
        />
        <p style={captionStyle}>
          Credits: dzone.com/articles/learn-how-to-setup-a-cicd-pipeline-from-scratch ·
          dzone.com/articles/continuous-delivery-vs-continuous-deployment-an-ov
        </p>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const DockerArchitecture: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker system diagram</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 20px' }}>Docker Architecture</h1>
    <img
      src={dockerArchitecture}
      alt=""
      width={1009}
      height={527}
      style={{ display: 'block', width: 1400, height: 'auto', objectFit: 'contain' }}
    />
    <p style={captionStyle}>
      Credit: aquasec.com/wiki/display/containers/Docker+Containers+vs.+Virtual+Machines
    </p>
    <PageFooter />
  </Shell>
);

const DockerRegistry: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker push</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 40px' }}>Docker Registry</h1>
    <ul style={{ margin: 0, paddingLeft: 36, fontSize: 30, lineHeight: 1.8 }}>
      <li>
        <span style={{ color: jitrak.accent }}>Docker Hub</span> — hub.docker.com
      </li>
      <li>
        <span style={{ color: jitrak.accent }}>Google Container Registry</span> —
        cloud.google.com/container-registry/
      </li>
      <li>
        <span style={{ color: jitrak.accent }}>Amazon ECR</span> — aws.amazon.com/ecr/
      </li>
    </ul>
    <p style={{ color: jitrak.muted, fontSize: 24, marginTop: 40, maxWidth: 1200 }}>
      Registries store and distribute images — tag locally, push to share, pull to deploy.
    </p>
    <PageFooter />
  </Shell>
);

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
  Day1,
  About,
  CourseIntroduction,
  Agenda,
  GetToKnowDocker,
  WhatAndWhyDocker,
  EvolutionOfDeployment,
  VmVsContainerWide,
  VmVsContainerExample,
  LinuxDistributions,
  Containerization,
  DockerArchitecture,
  DockerRegistry,
  Utilities,
] satisfies Page[];
