import type { Page, SlideMeta, DesignSystem } from '@open-slide/core';
import { Step, Steps } from '@open-slide/core';
import { jitrak, Shell, deckTransition, PageFooter } from '../../themes/jitrak';
import evolutionOfDeployment from './assets/evolution-of-deployment.png';
import containerizationDiagram from './assets/containerization.png';
import dockerArchitecture from './assets/docker-architecture.png';
import vmVsContainer from './assets/vm-vs-container.png';
import vmVsContainerExample from './assets/vm-vs-container-example.png';
import linuxDistributions from './assets/linux-distributions.png';
import windowsWithoutWsl2Daemon from './assets/windows-without-wsl2-daemon.png';
import windowsWithoutWsl2Drives from './assets/windows-without-wsl2-drives.png';
import windowsWithWsl2Engine1 from './assets/windows-with-wsl2-engine-1.png';
import windowsWithWsl2Engine2 from './assets/windows-with-wsl2-engine-2.png';
import dockerPlayground from './assets/docker-playground.png';
import gitRegistryDiagram from './assets/git-registry.png';

import dockerArchitectureImages from './assets/docker-architecture-images.png';
import dockerfileLayers from './assets/dockerfile-layers.png';
import shellExecCmd from './assets/shell-exec-cmd.png';
import shellExecEntrypoint1 from './assets/shell-exec-entrypoint-1.png';
import shellExecEntrypoint2 from './assets/shell-exec-entrypoint-2.png';
import dockerHubRepo from './assets/docker-hub-repo.png';
import dockerHubPlaceholder from './assets/docker-hub-placeholder.png';
import dockerHubLogin from './assets/docker-hub-login.png';
import typeOfMount from './assets/type-of-mount.png';
import appOverview from './assets/app-overview.png';
import mernStack from './assets/mern-stack.png';
import dockerVulnerability1 from './assets/docker-vulnerability-1.png';
import dockerVulnerability2 from './assets/docker-vulnerability-2.png';
import baseImage1 from './assets/base-image-1.png';
import baseImage2 from './assets/base-image-2.png';
import multiStageBuilds from './assets/multi-stage-builds.png';
import rebuildingImagesDiagram from './assets/rebuilding-images.png';
import dockerIgnoreDiagram from './assets/docker-ignore.png';

const MULTISTAGE_1 = "FROM node:20.9-slim AS build\nWORKDIR /usr/src/app\nCOPY package* ./\nRUN yarn\nCOPY . .\nRUN yarn run build\n\nFROM node:20.9-alpine\nWORKDIR /usr/src/app\nCOPY package* ./\nRUN yarn --prod\nCOPY --from=build /usr/src/app/dist ./\nEXPOSE 3000\nENV NODE_ENV production\nENTRYPOINT [ \"yarn\", \"run\" ]\nCMD [ \"start:prod\" ]\n";
const MULTISTAGE_2 = "FROM node:20.9-slim AS build\nWORKDIR /app\nCOPY package* ./\nRUN yarn\nCOPY . .\nRUN yarn run build\n\nFROM nginx:stable-alpine\nCOPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf\nCOPY bin/docker-entrypoint.sh bin/generate_config_js.sh /bin/\nRUN chmod u+x bin/docker-entrypoint.sh bin/generate_config_js.sh\nCOPY --from=build /app/build /usr/share/nginx/html\nENTRYPOINT [ \"/bin/docker-entrypoint.sh\" ]\n";
const MULTISTAGE_3 = "FROM node:18-alpine AS build\nWORKDIR /app\nRUN npm i -g pnpm husky\nCOPY .npmrc package.json pnpm-lock.yaml ./\nRUN pnpm i --frozen-lockfile\nCOPY . .\nRUN pnpm build\nRUN pnpm prune --prod\n\nFROM gcr.io/distroless/nodejs18-debian12:nonroot\nWORKDIR /app\nUSER nonroot\nCOPY --from=build --chown=nonroot:nonroot /app/node_modules ./node_modules\nCOPY --from=build --chown=nonroot:nonroot /app/dist/ ./dist/\nEXPOSE 3000\nENV NODE_PORT 3000\nENV NODE_ENV production\nCMD [ \"dist/main.js\" ]\n";

const preLab = { fontSize: 22, margin: '8px 0', lineHeight: 1.45 } as const;
const preDockerfile = { fontSize: 17, margin: '8px 0', lineHeight: 1.35 } as const;


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

const HandsOnWorkshop: Page = () => (
  <Shell
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ cd hands-on/</p>
    <h1 style={{ fontSize: 88, margin: '24px 0' }}>Hands-on Workshop</h1>
    <PageFooter />
  </Shell>
);

const InstallingDocker: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ install docker</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 40px' }}>Installing Docker</h1>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
      {[
        { os: 'macOS', product: 'Docker Desktop for Mac' },
        { os: 'Windows', product: 'Docker Desktop for Windows' },
        { os: 'Linux', product: 'Docker Engine' },
      ].map((item) => (
        <div
          key={item.os}
          style={{
            border: `1px solid ${jitrak.accent}33`,
            borderRadius: 12,
            padding: 28,
            background: '#00000040',
          }}
        >
          <h2 style={{ color: jitrak.accentAlt, fontSize: 36, margin: '0 0 16px' }}>{item.os}</h2>
          <p style={{ fontSize: 26, margin: 0, color: jitrak.muted, lineHeight: 1.5 }}>{item.product}</p>
        </div>
      ))}
    </div>
    <PageFooter />
  </Shell>
);

const InstallWithCommandLine: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ install --cli</p>
    <h1 style={{ fontSize: 52, margin: '16px 0 32px' }}>Install with Command Line</h1>
    <Steps>
      <Step>
        <div>
          <div style={{ color: jitrak.accent, fontSize: 24 }}>macOS with Homebrew</div>
          <pre style={{ fontSize: 24, margin: '12px 0' }}>{`brew install --cask docker`}</pre>
        </div>
      </Step>
      <Step>
        <div>
          <div style={{ color: jitrak.accent, fontSize: 24 }}>Windows with Winget (Admin)</div>
          <pre style={{ fontSize: 22, margin: '12px 0' }}>{`winget install -e --id Docker.DockerDesktop`}</pre>
        </div>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const WSL2_GUIDE_URL =
  'https://medium.com/@ponggun/%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%97%E0%B8%B6%E0%B8%81-%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87-wsl-2-docker-desktop-%E0%B8%9A%E0%B8%99-windows-10-home-64279672703';

const InstallWsl2: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ wsl --install</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 32px' }}>Install WSL 2</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 28, margin: 0, lineHeight: 1.5 }}>
          Install WSL 2 on Windows before Docker Desktop (required for the WSL 2 engine).
        </p>
      </Step>
      <Step>
        <p style={{ fontSize: 24, margin: 0, lineHeight: 1.5, color: jitrak.muted }}>
          Setup guide:{' '}
          <a href={WSL2_GUIDE_URL} style={{ color: jitrak.accent }}>
            {WSL2_GUIDE_URL}
          </a>
        </p>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const LinuxOldVersionInstall: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ install --legacy</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 28px' }}>Linux Old Version Install</h1>
    <Steps>
      <Step>
        <div>
          <div style={{ color: jitrak.accent, fontSize: 24 }}>Docker</div>
          <pre style={{ fontSize: 20, margin: '12px 0' }}>{`curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh ./get-docker.sh
sudo usermod -aG docker $USER`}</pre>
        </div>
      </Step>
      <Step>
        <div>
          <div style={{ color: jitrak.accent, fontSize: 24 }}>Docker Compose</div>
          <pre style={{ fontSize: 18, margin: '12px 0' }}>{`sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose`}</pre>
        </div>
      </Step>
    </Steps>
    <p style={captionStyle}>Code snippet reference: bit.ly/3kTJKzn</p>
    <PageFooter />
  </Shell>
);

const WindowsSettingsWithoutWsl2: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker desktop --no-wsl2</p>
    <h1 style={{ fontSize: 44, margin: '12px 0 20px' }}>Setting for Windows without WSL2</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 12px' }}>
          Check &ldquo;Expose daemon on tcp://localhost:2375 without TLS&rdquo; checkbox
        </p>
        <img
          src={windowsWithoutWsl2Daemon}
          alt=""
          width={992}
          height={558}
          style={{ display: 'block', width: 900, height: 'auto', objectFit: 'contain' }}
        />
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 12px' }}>
          Select the local drives you want to be available to your containers
        </p>
        <img
          src={windowsWithoutWsl2Drives}
          alt=""
          width={680}
          height={558}
          style={{ display: 'block', width: 700, height: 'auto', objectFit: 'contain' }}
        />
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const WindowsSettingsWithWsl2: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker desktop --wsl2</p>
    <h1 style={{ fontSize: 44, margin: '12px 0 20px' }}>Setting for Windows with WSL2</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 12px' }}>Use the WSL 2 based engine</p>
        <img
          src={windowsWithWsl2Engine1}
          alt=""
          width={1011}
          height={558}
          style={{ display: 'block', width: 900, height: 'auto', objectFit: 'contain' }}
        />
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 12px' }}>Enable WSL 2 integration for your distro</p>
        <img
          src={windowsWithWsl2Engine2}
          alt=""
          width={3093}
          height={1707}
          style={{ display: 'block', width: 1100, height: 'auto', objectFit: 'contain' }}
        />
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const DockerPlayground: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ open playground</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 20px' }}>Docker Playground</h1>
    <img
      src={dockerPlayground}
      alt=""
      width={1920}
      height={1080}
      style={{ display: 'block', width: 1200, height: 'auto', objectFit: 'contain' }}
    />
    <p style={captionStyle}>
      Use{' '}
      <a href="https://labs.play-with-docker.com/" style={{ color: jitrak.accent }}>
        https://labs.play-with-docker.com/
      </a>{' '}
      (PPTX typo: labs.play-wiath-docker.com)
    </p>
    <PageFooter />
  </Shell>
);

const AlreadySetup: Page = () => (
  <Shell
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ docker version</p>
    <h1 style={{ fontSize: 88, margin: '24px 0' }}>Already Setup</h1>
    <p style={{ color: jitrak.muted, fontSize: 32, margin: 0, maxWidth: 1200, lineHeight: 1.5 }}>
      Docker already installed and running? Skip install slides and continue with git clone.
    </p>
    <PageFooter />
  </Shell>
);

const GitRegistry: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ git clone</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 20px' }}>Git Registry</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 16px', color: jitrak.muted }}>
          github.com/Eji4h/docker-workshop
        </p>
        <img
          src={gitRegistryDiagram}
          alt=""
          width={457}
          height={69}
          style={{ display: 'block', width: 500, height: 'auto', objectFit: 'contain', marginBottom: 16 }}
        />
      </Step>
      <Step>
        <pre style={{ fontSize: 26, margin: '12px 0' }}>{`git clone https://github.com/Eji4h/docker-workshop`}</pre>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const RunningYourFirstDockerContainer: Page = () => (
  <Shell
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ docker run</p>
    <h1 style={{ fontSize: 72, margin: '24px 0', lineHeight: 1.15 }}>
      Running Your First Docker Container
    </h1>
    <PageFooter />
  </Shell>
);

const HowToRunContainersWorkshop: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cd simple-demo</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 28px' }}>How to Run Containers Workshop</h1>
    <Steps>
      <Step>
        <pre style={{ fontSize: 26, margin: '12px 0' }}>{`cd simple-demo`}</pre>
      </Step>
      <Step>
        <pre style={{ fontSize: 26, margin: '12px 0' }}>{`docker run hello-world`}</pre>
      </Step>
      <Step>
        <pre style={{ fontSize: 24, margin: '12px 0' }}>{`docker run --detach --publish 8080:80 --name web nginx`}</pre>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const Utilities: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker --help | utilities</p>
    <h1 style={{ fontSize: 48, margin: '12px 0 20px' }}>Utilities Commands Overview</h1>
    <Steps>
      <Step>
        <pre style={{ fontSize: 24, margin: '8px 0' }}>{`docker ps`}</pre>
      </Step>
      <Step>
        <pre style={{ fontSize: 24, margin: '8px 0' }}>{`docker ps -a`}</pre>
      </Step>
      <Step>
        <pre style={{ fontSize: 24, margin: '8px 0' }}>{`docker logs -f web`}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: 0 }}>Open website — browse to http://localhost:8080</p>
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: 0 }}>Open another shell — new terminal tab or window</p>
      </Step>
      <Step>
        <pre style={{ fontSize: 24, margin: '8px 0' }}>{`docker inspect web`}</pre>
      </Step>
      <Step>
        <pre style={{ fontSize: 24, margin: '8px 0' }}>{`docker exec -it web /bin/bash`}</pre>
      </Step>
      <Step>
        <pre style={{ fontSize: 24, margin: '8px 0' }}>{`ls
printenv`}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: 0 }}>Exit — type exit or press Ctrl+D</p>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const ExerciseKahoot: Page = () => (
  <Shell
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ kahoot --join</p>
    <h1 style={{ fontSize: 96, margin: '24px 0', letterSpacing: '-0.02em' }}>Exercise</h1>
    <p style={{ fontSize: 36, margin: '0 0 16px', color: jitrak.muted }}>
      <a href="https://kahoot.it/" style={{ color: jitrak.accent }}>
        https://kahoot.it/
      </a>
    </p>
    <p style={{ fontSize: 32, margin: 0, color: jitrak.muted }}>Game PIN: (instructor provides)</p>
    <PageFooter />
  </Shell>
);

const DockerImageSection: Page = () => (
  <Shell
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ cd images/</p>
    <h1 style={{ fontSize: 88, margin: '24px 0' }}>Docker Image</h1>
    <PageFooter />
  </Shell>
);

const DockerArchitectureImages: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker system diagram</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 20px' }}>Docker Architecture (Images)</h1>
    <img
      src={dockerArchitectureImages}
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

const DockerfileTheory: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cat Dockerfile</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 20px' }}>Dockerfile</h1>
    <p style={{ fontSize: 28, margin: '0 0 20px', maxWidth: 1400, lineHeight: 1.5 }}>
      Docker can build images automatically by reading the instructions from a Dockerfile.
    </p>
    <img
      src={dockerfileLayers}
      alt=""
      width={800}
      height={500}
      style={{ display: 'block', width: 1100, height: 'auto', objectFit: 'contain' }}
    />
    <p style={captionStyle}>Credit: slideshare.net/BrianDeHamer/optimizing-docker-images</p>
    <PageFooter />
  </Shell>
);

const CreateYourOwnImage: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker build</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Create Your Own Image</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 12px' }}>Edit Dockerfile — change ENTRYPOINT line</p>
        <pre style={preLab}>{`ENTRYPOINT [ "echo", "<your name>" ]`}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 12px' }}>Build your own image</p>
        <pre style={preLab}>{`docker build -t <your name> .`}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 12px' }}>Run your own image</p>
        <pre style={preLab}>{`docker run <your name>`}</pre>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const DockerfileSyntax: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ man Dockerfile</p>
    <h1 style={{ fontSize: 52, margin: '16px 0 28px' }}>Dockerfile Syntax</h1>
    <Steps>
      {['FROM', 'RUN', 'ADD', 'COPY', 'ENTRYPOINT', 'CMD', 'ENV', 'WORKDIR', 'EXPOSE', 'HEALTHCHECK'].map(
        (instr) => (
          <Step key={instr}>
            <p style={{ fontSize: 32, margin: 0, color: jitrak.accentAlt }}>{instr}</p>
          </Step>
        ),
      )}
    </Steps>
    <PageFooter />
  </Shell>
);

const PopularDockerRunOptions: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker run --help</p>
    <h1 style={{ fontSize: 44, margin: '16px 0 32px' }}>Popular docker run Command Options</h1>
    <ul style={{ margin: 0, paddingLeft: 36, fontSize: 28, lineHeight: 1.75 }}>
      <li><span style={{ color: jitrak.accent }}>-d</span> or <span style={{ color: jitrak.accent }}>--detach</span></li>
      <li><span style={{ color: jitrak.accent }}>-p</span> or <span style={{ color: jitrak.accent }}>--publish</span></li>
      <li><span style={{ color: jitrak.accent }}>-v</span> or <span style={{ color: jitrak.accent }}>--volume</span></li>
      <li><span style={{ color: jitrak.accent }}>-e</span> or <span style={{ color: jitrak.accent }}>--env</span></li>
      <li><span style={{ color: jitrak.accent }}>--rm</span></li>
      <li><span style={{ color: jitrak.accent }}>--name</span></li>
      <li><span style={{ color: jitrak.accent }}>--link</span></li>
    </ul>
    <PageFooter />
  </Shell>
);

const DifferentEntrypointAndCmd: Page = () => (
  <Shell style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker inspect --format</p>
    <h1 style={{ fontSize: 64, margin: '16px 0 24px' }}>Different Entrypoint and CMD</h1>
    <p style={{ fontSize: 28, margin: 0, color: jitrak.muted, maxWidth: 1200, lineHeight: 1.5 }}>
      ENTRYPOINT defines the main executable; CMD supplies default arguments that can be overridden at run time.
    </p>
    <PageFooter />
  </Shell>
);

const EntrypointAndCmd: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ entrypoint vs cmd</p>
    <h1 style={{ fontSize: 52, margin: '16px 0 24px' }}>Entrypoint and CMD</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 28, margin: '0 0 8px', color: jitrak.accentAlt }}>ENTRYPOINT</p>
        <p style={{ fontSize: 26, margin: 0, lineHeight: 1.5 }}>
          Configures a container that will run as an executable.
        </p>
      </Step>
      <Step>
        <p style={{ fontSize: 28, margin: '0 0 8px', color: jitrak.accentAlt }}>CMD</p>
        <p style={{ fontSize: 26, margin: 0, lineHeight: 1.5 }}>
          Sets default command and/or parameters, which can be overwritten from the command line when the container runs.
        </p>
      </Step>
    </Steps>
    <p style={captionStyle}>Credit: goinbigdata.com/docker-run-vs-cmd-vs-entrypoint</p>
    <PageFooter />
  </Shell>
);

const ShellAndExecFormCmd: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ shell vs exec</p>
    <h1 style={{ fontSize: 44, margin: '12px 0 16px' }}>Shell and Exec Form of CMD</h1>
    <Steps>
      <Step>
        <img src={shellExecCmd} alt="" style={{ display: 'block', width: 1200, height: 'auto', objectFit: 'contain' }} />
        <p style={captionStyle}>Credit: docs.docker.com/engine/reference/builder/</p>
      </Step>
      <Step>
        <img src={shellExecEntrypoint1} alt="" style={{ display: 'block', width: 1200, height: 'auto', objectFit: 'contain' }} />
        <p style={captionStyle}>Credit: docs.docker.com/engine/reference/builder/</p>
      </Step>
      <Step>
        <img src={shellExecEntrypoint2} alt="" style={{ display: 'block', width: 1200, height: 'auto', objectFit: 'contain' }} />
        <p style={captionStyle}>Credit: phoenixnap.com/kb/docker-cmd-vs-entrypoint</p>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const EntrypointVsCmd: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cd entrypoint-and-cmd-demo</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Entrypoint vs CMD</h1>
    <Steps>
      <Step><pre style={preLab}>{`cd entrypoint-and-cmd-demo`}</pre></Step>
      <Step><pre style={preLab}>{`docker build -f Dockerfile.cmd -t cmd-demo .`}</pre></Step>
      <Step><pre style={preLab}>{`docker run cmd-demo`}</pre></Step>
      <Step><pre style={preLab}>{`docker run cmd-demo echo Override`}</pre></Step>
      <Step><pre style={preLab}>{`docker build -f Dockerfile.entrypoint -t entrypoint-demo .`}</pre></Step>
      <Step><pre style={preLab}>{`docker run entrypoint-demo`}</pre></Step>
      <Step><pre style={preLab}>{`docker run entrypoint-demo WorldOverride`}</pre></Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const DockerRegistryPush: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker push</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 32px' }}>Docker Registry (Push)</h1>
    <ul style={{ margin: 0, paddingLeft: 36, fontSize: 28, lineHeight: 1.75 }}>
      <li>Tag images with <span style={{ color: jitrak.accent }}>docker tag</span></li>
      <li>Authenticate with <span style={{ color: jitrak.accent }}>docker login</span></li>
      <li>Publish with <span style={{ color: jitrak.accent }}>docker push</span></li>
      <li>Pull and run from Hub — share images across teams and CI</li>
    </ul>
    <PageFooter />
  </Shell>
);

const PushImageToDockerHub1: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cd simple-demo</p>
    <h1 style={{ fontSize: 44, margin: '12px 0 20px' }}>Push Image to Docker Hub (1)</h1>
    <Steps>
      <Step><pre style={preLab}>{`cd simple-demo`}</pre></Step>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 12px' }}>Go to hub.docker.com — register account and create repository</p>
        <img src={dockerHubRepo} alt="" style={{ display: 'block', width: 900, height: 'auto', objectFit: 'contain' }} />
      </Step>
      <Step>
        <img src={dockerHubPlaceholder} alt="" style={{ display: 'block', width: 1000, height: 'auto', objectFit: 'contain' }} />
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const PushImageToDockerHub2: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker login</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Push Image to Docker Hub (2)</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 12px' }}>Login with Docker Hub user</p>
        <pre style={preLab}>{`docker login`}</pre>
      </Step>
      <Step>
        <img src={dockerHubLogin} alt="" style={{ display: 'block', width: 1000, height: 'auto', objectFit: 'contain' }} />
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const PushImageToDockerHub3: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker tag && docker push</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Push Image to Docker Hub (3)</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 8px' }}>Tag image name from first image</p>
        <pre style={preLab}>{`docker tag <your name> <hub-user>/<repo>:latest`}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 8px' }}>Push your docker image to Docker Hub</p>
        <pre style={preLab}>{`docker push <hub-user>/<repo>:latest`}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 8px' }}>Run friend image</p>
        <pre style={preLab}>{`docker run <hub-user>/<repo>:latest`}</pre>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const PushImageToDockerHub4: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker buildx</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Push Image to Docker Hub (4)</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 8px' }}>Rebuild image with docker buildx and push</p>
        <pre style={{ ...preLab, fontSize: 18 }}>{`docker buildx build --platform linux/amd64,linux/arm64 \\
  -t <hub-user>/<repo>:latest --push .`}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 8px' }}>Re-run friend image with new tag</p>
        <pre style={preLab}>{`docker run <hub-user>/<repo>:latest`}</pre>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const DockerImageCommand: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker image</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Docker Image Command</h1>
    <ul style={{ margin: 0, paddingLeft: 36, fontSize: 24, lineHeight: 1.65 }}>
      <li><span style={{ color: jitrak.accent }}>docker images</span> / <span style={{ color: jitrak.accent }}>docker image ls</span> — list images</li>
      <li><span style={{ color: jitrak.accent }}>docker rmi</span> / <span style={{ color: jitrak.accent }}>docker image rm</span> — remove image</li>
      <li><span style={{ color: jitrak.accent }}>docker pull</span> — pull from registry</li>
      <li><span style={{ color: jitrak.accent }}>docker push</span> — push to registry</li>
      <li><span style={{ color: jitrak.accent }}>docker build</span> / <span style={{ color: jitrak.accent }}>docker image build</span> — build from Dockerfile</li>
      <li><span style={{ color: jitrak.accent }}>docker tag</span> / <span style={{ color: jitrak.accent }}>docker image tag</span> — attach tag</li>
    </ul>
    <PageFooter />
  </Shell>
);

const DockerContainerCommand: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker container</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Docker Container Command</h1>
    <ul style={{ margin: 0, paddingLeft: 36, fontSize: 24, lineHeight: 1.65 }}>
      <li><span style={{ color: jitrak.accent }}>docker run</span> — run container from image</li>
      <li><span style={{ color: jitrak.accent }}>docker exec</span> — execute command (often with <span style={{ color: jitrak.accent }}>-it</span>)</li>
      <li><span style={{ color: jitrak.accent }}>docker logs</span> — print container logs</li>
      <li><span style={{ color: jitrak.accent }}>docker ps</span> — running containers (<span style={{ color: jitrak.accent }}>-a</span> for all)</li>
      <li><span style={{ color: jitrak.accent }}>docker rm</span> — remove container</li>
      <li><span style={{ color: jitrak.accent }}>docker stop</span> — stop running container</li>
    </ul>
    <PageFooter />
  </Shell>
);

const DockerManagementCommand: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker system</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Docker Management Command</h1>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 26, lineHeight: 1.6 }}>
      {['docker image', 'docker network', 'docker node', 'docker secret', 'docker service', 'docker stack', 'docker stats', 'docker swarm', 'docker system', 'docker volume'].map((cmd) => (
        <div key={cmd} style={{ color: jitrak.accentAlt }}>{cmd}</div>
      ))}
    </div>
    <PageFooter />
  </Shell>
);

const DockerNetwork: Page = () => (
  <Shell style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker network</p>
    <h1 style={{ fontSize: 72, margin: '16px 0 24px' }}>Docker Network</h1>
    <p style={{ fontSize: 28, margin: 0, color: jitrak.muted, maxWidth: 1200, lineHeight: 1.5 }}>
      Containers communicate over virtual networks — isolate services or connect them by name.
    </p>
    <PageFooter />
  </Shell>
);

const NetworkDrivers: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker network inspect</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Network Drivers</h1>
    <ul style={{ margin: 0, paddingLeft: 36, fontSize: 24, lineHeight: 1.55 }}>
      <li><span style={{ color: jitrak.accent }}>bridge</span> — default; standalone containers on same host</li>
      <li><span style={{ color: jitrak.accent }}>host</span> — use host networking directly</li>
      <li><span style={{ color: jitrak.accent }}>overlay</span> — multi-daemon swarm services</li>
      <li><span style={{ color: jitrak.accent }}>macvlan</span> — MAC address per container</li>
      <li><span style={{ color: jitrak.accent }}>none</span> — disable networking</li>
    </ul>
    <p style={captionStyle}>Credit: docs.docker.com/network/</p>
    <PageFooter />
  </Shell>
);

const DockerStorage: Page = () => (
  <Shell style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker volume</p>
    <h1 style={{ fontSize: 72, margin: '16px 0 24px' }}>Docker Storage</h1>
    <p style={{ fontSize: 28, margin: 0, color: jitrak.muted, maxWidth: 1200, lineHeight: 1.5 }}>
      Persist data outside the container writable layer — volumes, bind mounts, and tmpfs.
    </p>
    <PageFooter />
  </Shell>
);

const ManageDataInDocker: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker storage</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Manage Data in Docker</h1>
    <Steps>
      <Step><p style={{ fontSize: 26, margin: 0, lineHeight: 1.5 }}>Default: files live on the writable container layer</p></Step>
      <Step><p style={{ fontSize: 26, margin: 0, lineHeight: 1.5 }}>Data does not persist when the container is removed</p></Step>
      <Step><p style={{ fontSize: 26, margin: 0, lineHeight: 1.5 }}>Hard to extract data from a running container</p></Step>
      <Step><p style={{ fontSize: 26, margin: 0, lineHeight: 1.5 }}>Extra abstraction can reduce I/O performance vs volumes</p></Step>
    </Steps>
    <p style={captionStyle}>Credit: docs.docker.com/storage/</p>
    <PageFooter />
  </Shell>
);

const TypesOfMount: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ mount --types</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 20px' }}>Types of Mount</h1>
    <img src={typeOfMount} alt="" style={{ display: 'block', width: 1000, height: 'auto', objectFit: 'contain' }} />
    <ul style={{ margin: '16px 0 0', paddingLeft: 36, fontSize: 22, lineHeight: 1.5, color: jitrak.muted }}>
      <li><span style={{ color: jitrak.accent }}>Volumes</span> — managed by Docker under /var/lib/docker/volumes/</li>
      <li><span style={{ color: jitrak.accent }}>Bind mounts</span> — any host path</li>
      <li><span style={{ color: jitrak.accent }}>tmpfs</span> — host memory only, never on disk</li>
    </ul>
    <PageFooter />
  </Shell>
);

const ApplicationOverview: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker compose preview</p>
    <h1 style={{ fontSize: 40, margin: '12px 0 20px' }}>Application Overview &amp; Running Apps in Docker</h1>
    <img src={appOverview} alt="" style={{ display: 'block', width: 1300, height: 'auto', objectFit: 'contain' }} />
    <PageFooter />
  </Shell>
);

const MernStack: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ stack mern</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 20px' }}>MERN Stack</h1>
    <img src={mernStack} alt="" style={{ display: 'block', width: 1200, height: 'auto', objectFit: 'contain' }} />
    <p style={captionStyle}>Credit: mongodb.com/languages/mern-stack-tutorial</p>
    <PageFooter />
  </Shell>
);

const RemoveAllContainers: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker rm -f</p>
    <h1 style={{ fontSize: 52, margin: '16px 0 28px' }}>Remove All Containers</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 12px' }}>Force remove all containers</p>
        <pre style={preLab}>{`docker rm -f $(docker ps -qa)`}</pre>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const AdvancedDockerUsage: Page = () => (
  <Shell
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ cd advance/</p>
    <h1 style={{ fontSize: 72, margin: '24px 0' }}>Advanced Docker Usage</h1>
    <PageFooter />
  </Shell>
);

const linkMongoScript = `#!/bin/bash

docker run -d \\
\t--name mongo \\
\t-e MONGO_INITDB_ROOT_USERNAME=root \\
\t-e MONGO_INITDB_ROOT_PASSWORD=myPassword \\
\tmongo:7.0.12`;

const linkMongoExpressScript = `#!/bin/bash

docker run -d -p 8081:8081 \\
\t--name mongo-express \\
\t-e ME_CONFIG_MONGODB_URL=mongodb://root:myPassword@mongo:27017/ \\
\t--link mongo:mongo \\
\tmongo-express:1.0.0-20-alpine3.18`;

const mountMongoScript = `#!/bin/bash

docker run -d -p 27018:27017 \\
\t--name mongo-world \\
\t-e MONGO_INITDB_ROOT_USERNAME=root \\
\t-e MONGO_INITDB_ROOT_PASSWORD=myPassword \\
\t-e MONGO_INITDB_DATABASE=world \\
\t-v ./db/init/:/docker-entrypoint-initdb.d/:ro \\
\t-v ./db/init-data/:/tmp/init-data/:ro \\
\tmongo:7.0.12`;

const mountMongoExpressScript = `#!/bin/bash

docker run -d -p 8082:8081 \\
\t--name mongo-express-world \\
\t-e ME_CONFIG_BASICAUTH_USERNAME=jitrak \\
\t-e ME_CONFIG_BASICAUTH_PASSWORD=dotdev \\
\t-e ME_CONFIG_MONGODB_URL=mongodb://root:myPassword@mongo:27017/ \\
\t--link mongo-world:mongo \\
\tmongo-express:1.0.0-20-alpine3.18`;

const LinkingDockerContainers: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cd advance/link-container</p>
    <h1 style={{ fontSize: 44, margin: '12px 0 20px' }}>Linking Docker Containers</h1>
    <Steps>
      <Step><pre style={preLab}>{`cd advance/link-container`}</pre></Step>
      <Step>
        <p style={{ fontSize: 24, margin: '0 0 8px' }}>Run mongo container</p>
        <pre style={{ ...preLab, fontSize: 18 }}>{linkMongoScript}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 24, margin: '0 0 8px' }}>Run mongo-express container</p>
        <pre style={{ ...preLab, fontSize: 18 }}>{linkMongoExpressScript}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: 0 }}>Explore mongo-express — http://localhost:8081 (user: admin, password: pass)</p>
      </Step>
      <Step><pre style={preLab}>{`docker exec -it mongo-express /bin/sh`}</pre></Step>
      <Step><pre style={preLab}>{`ping mongo`}</pre></Step>
      <Step><pre style={preLab}>{`printenv`}</pre></Step>
      <Step><p style={{ fontSize: 26, margin: 0 }}>Exit</p></Step>
      <Step><pre style={preLab}>{`docker network ls`}</pre></Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const InitializeDataMongoMountVolume: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cd advance/mount-volume</p>
    <h1 style={{ fontSize: 40, margin: '12px 0 20px' }}>Initialize Data in MongoDB (Mount Volume)</h1>
    <Steps>
      <Step><pre style={preLab}>{`cd advance/mount-volume`}</pre></Step>
      <Step>
        <p style={{ fontSize: 24, margin: '0 0 8px' }}>Run mongo container with mount volume initial data</p>
        <pre style={{ ...preLab, fontSize: 18 }}>{mountMongoScript}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 24, margin: '0 0 8px' }}>Run mongo-express with connect mongo container with mount volume</p>
        <pre style={{ ...preLab, fontSize: 18 }}>{mountMongoExpressScript}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: 0 }}>Explore mongo-express with world database — http://localhost:8082 (user: jitrak, password: dotdev)</p>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const DockerSecurityBestPractices: Page = () => (
  <Shell
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ cd security/</p>
    <h1 style={{ fontSize: 64, margin: '24px 0' }}>Docker Security Best Practices</h1>
    <PageFooter />
  </Shell>
);

const NotOnlyItWorks: Page = () => (
  <Shell style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ security mindset</p>
    <h1 style={{ fontSize: 72, margin: '16px 0 24px' }}>Not Only &ldquo;It Works&rdquo;</h1>
    <p style={{ fontSize: 30, margin: 0, color: jitrak.muted, maxWidth: 1300, lineHeight: 1.5 }}>
      Production containers need hardening — least privilege, patched bases, scanned images, and resource limits.
    </p>
    <PageFooter />
  </Shell>
);

const DockerVulnerability: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 22, margin: 0 }}>$ scout --preview</p>
    <h1 style={{ fontSize: 40, margin: '12px 0 12px' }}>Docker Vulnerability</h1>
    <Steps>
      <Step>
        <img src={dockerVulnerability1} alt="" style={{ display: 'block', width: 700, height: 'auto', objectFit: 'contain' }} />
      </Step>
      <Step>
        <img src={dockerVulnerability2} alt="" style={{ display: 'block', width: 700, height: 'auto', objectFit: 'contain' }} />
        <p style={captionStyle}>Credit: snyk.io/blog/top-ten-most-popular-docker-images-each-contain-at-least-30-vulnerabilities/</p>
      </Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const SecurityBestPractices: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cat best-practices.md</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 24px' }}>Security Best Practices</h1>
    <Steps>
      <Step><p style={{ fontSize: 28, margin: 0 }}>Choosing the right base image — trusted source, keep it small</p></Step>
      <Step><p style={{ fontSize: 28, margin: 0 }}>Using multi-stage builds</p></Step>
      <Step><p style={{ fontSize: 28, margin: 0 }}>Rebuilding images</p></Step>
      <Step><p style={{ fontSize: 28, margin: 0 }}>Checking your image for vulnerabilities</p></Step>
    </Steps>
    <p style={captionStyle}>Credit: docs.docker.com/develop/security-best-practices/</p>
    <PageFooter />
  </Shell>
);

const ChoosingRightBaseImage: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker search</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 20px' }}>Choosing the Right Base Image</h1>
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <img src={baseImage1} alt="" style={{ display: 'block', width: 500, height: 'auto', objectFit: 'contain' }} />
      <img src={baseImage2} alt="" style={{ display: 'block', width: 500, height: 'auto', objectFit: 'contain' }} />
    </div>
    <ul style={{ margin: '16px 0 0', paddingLeft: 36, fontSize: 24, lineHeight: 1.55 }}>
      <li>Official Image and Verified Publisher badges</li>
      <li>Small image with minimal dependencies lowers attack surface</li>
    </ul>
    <p style={captionStyle}>Credit: docs.docker.com/develop/security-best-practices/</p>
    <PageFooter />
  </Shell>
);

const UseMultiStageBuilds: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker build --target</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 20px' }}>Use Multi-Stage Builds</h1>
    <p style={{ fontSize: 26, margin: '0 0 16px', maxWidth: 1300, lineHeight: 1.5 }}>
      Cherry-pick artifacts without inheriting vulnerabilities from build-stage base images.
    </p>
    <img src={multiStageBuilds} alt="" style={{ display: 'block', width: 1100, height: 'auto', objectFit: 'contain' }} />
    <p style={captionStyle}>
      Credit: docs.docker.com/develop/security-best-practices/ · devopsschool.com/blog/how-to-optimize-faster-builds-and-smaller-docker-images-using-multistaging-build/
    </p>
    <PageFooter />
  </Shell>
);

const MultiStageBuildDemo1: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ multistage demo 1</p>
    <h1 style={{ fontSize: 44, margin: '12px 0 16px' }}>Explore Multi-Stage Builds Demo 1</h1>
    <Steps>
      <Step><pre style={preDockerfile}>{MULTISTAGE_1}</pre></Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const MultiStageBuildDemo2: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ multistage demo 2</p>
    <h1 style={{ fontSize: 44, margin: '12px 0 16px' }}>Explore Multi-Stage Builds Demo 2</h1>
    <Steps>
      <Step><pre style={preDockerfile}>{MULTISTAGE_2}</pre></Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const MultiStageBuildDemo3: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ multistage demo 3</p>
    <h1 style={{ fontSize: 44, margin: '12px 0 16px' }}>Explore Multi-Stage Builds Demo 3</h1>
    <Steps>
      <Step><pre style={preDockerfile}>{MULTISTAGE_3}</pre></Step>
    </Steps>
    <PageFooter />
  </Shell>
);

const RebuildingImages: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker build --no-cache</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 20px' }}>Rebuilding Images</h1>
    <img src={rebuildingImagesDiagram} alt="" style={{ display: 'block', width: 400, height: 'auto', objectFit: 'contain', marginBottom: 16 }} />
    <ul style={{ margin: 0, paddingLeft: 36, fontSize: 22, lineHeight: 1.55 }}>
      <li>Each container should have only one responsibility</li>
      <li>Containers should be immutable, lightweight, and fast</li>
      <li>Do not store data in containers — use a shared data store</li>
      <li>Containers should be easy to destroy and rebuild</li>
      <li>Use a small base image (such as Linux Alpine)</li>
      <li>Avoid installing unnecessary packages</li>
      <li>Avoid cache hits when building — auto-scan before deploying</li>
    </ul>
    <PageFooter />
  </Shell>
);

const CheckImageVulnerabilities: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker scan</p>
    <h1 style={{ fontSize: 44, margin: '16px 0 24px' }}>Check Your Image for Vulnerabilities</h1>
    <ul style={{ margin: 0, paddingLeft: 36, fontSize: 24, lineHeight: 1.6 }}>
      <li>Docker Hub automatic vulnerability scanning (Docker subscription)</li>
      <li>Docker Hub early-access advanced image analysis</li>
      <li>CLI <span style={{ color: jitrak.accent }}>docker scout</span></li>
      <li>Docker Desktop detailed local image vulnerability view</li>
    </ul>
    <p style={captionStyle}>Credit: docs.docker.com/develop/security-best-practices/</p>
    <PageFooter />
  </Shell>
);

const DockerScout: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker scout</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 28px' }}>Docker Scout</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 8px' }}>Run docker scout recommendations local image</p>
        <pre style={preLab}>{`docker scout recommendations <image>`}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 8px' }}>Run docker scout cves local image</p>
        <pre style={preLab}>{`docker scout cves <image>`}</pre>
      </Step>
    </Steps>
    <p style={captionStyle}>Credit: docs.docker.com/engine/scan/</p>
    <PageFooter />
  </Shell>
);

const DockerSecurityCheatSheet1: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cat cheat-sheet-1</p>
    <h1 style={{ fontSize: 44, margin: '16px 0 24px' }}>Docker Security Cheat Sheet (1)</h1>
    <ul style={{ margin: 0, paddingLeft: 36, fontSize: 24, lineHeight: 1.55 }}>
      <li>Keep Host and Docker up to date</li>
      <li>Do not expose the Docker daemon socket (even to containers)</li>
      <li>Set a user</li>
      <li>Limit capabilities — grant only what the container needs</li>
      <li>Add <span style={{ color: jitrak.accent }}>--no-new-privileges</span> flag</li>
      <li>Disable inter-container communication (<span style={{ color: jitrak.accent }}>--icc=false</span>)</li>
      <li>Use Linux Security Module (seccomp, AppArmor, or SELinux)</li>
    </ul>
    <p style={captionStyle}>Credit: cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html</p>
    <PageFooter />
  </Shell>
);

const DockerSecurityCheatSheet2: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cat cheat-sheet-2</p>
    <h1 style={{ fontSize: 44, margin: '16px 0 24px' }}>Docker Security Cheat Sheet (2)</h1>
    <ul style={{ margin: 0, paddingLeft: 36, fontSize: 24, lineHeight: 1.55 }}>
      <li>Limit resources (memory, CPU, file descriptors, processes, restarts)</li>
      <li>Set filesystem and volumes to read-only</li>
      <li>Use static analysis tools</li>
      <li>Set the logging level to at least INFO</li>
      <li>Lint the Dockerfile at build time</li>
      <li>Run Docker in root-less mode</li>
    </ul>
    <p style={captionStyle}>Credit: cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html</p>
    <PageFooter />
  </Shell>
);

const DockerIgnore: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ cat .dockerignore</p>
    <h1 style={{ fontSize: 56, margin: '16px 0 20px' }}>Docker Ignore</h1>
    <img src={dockerIgnoreDiagram} alt="" style={{ display: 'block', width: 500, height: 'auto', objectFit: 'contain' }} />
    <p style={captionStyle}>Credit: docs.docker.com/engine/reference/builder/#dockerignore-file</p>
    <PageFooter />
  </Shell>
);

const DockerResources: Page = () => (
  <Shell
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <p style={{ color: jitrak.accent, fontSize: 28, margin: 0 }}>$ cd resources/</p>
    <h1 style={{ fontSize: 72, margin: '24px 0' }}>Docker Resources</h1>
    <PageFooter />
  </Shell>
);

const DockerRuntimeMetrics: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker stats</p>
    <h1 style={{ fontSize: 48, margin: '16px 0 28px' }}>Docker Runtime Metrics</h1>
    <Steps>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 12px' }}>Display a live stream of container resource usage statistics</p>
        <pre style={preLab}>{`docker stats`}</pre>
      </Step>
    </Steps>
    <p style={captionStyle}>Credit: docs.docker.com/config/containers/runmetrics/</p>
    <PageFooter />
  </Shell>
);

const LimitResources: Page = () => (
  <Shell style={{ position: 'relative' }}>
    <p style={{ color: jitrak.accent, fontSize: 24, margin: 0 }}>$ docker run --memory</p>
    <h1 style={{ fontSize: 52, margin: '16px 0 24px' }}>Limit Resources</h1>
    <Steps>
      <Step><p style={{ fontSize: 26, margin: 0 }}>Open new terminal session</p></Step>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 8px' }}>Run container with limit resources</p>
        <pre style={preLab}>{`docker run -d --name limited --memory 128m --cpus 0.5 nginx`}</pre>
      </Step>
      <Step>
        <p style={{ fontSize: 26, margin: '0 0 8px' }}>Monitor resource usage statistics</p>
        <pre style={preLab}>{`docker stats`}</pre>
      </Step>
      <Step><p style={{ fontSize: 26, margin: 0 }}>Exit</p></Step>
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
  HandsOnWorkshop,
  InstallingDocker,
  InstallWithCommandLine,
  InstallWsl2,
  LinuxOldVersionInstall,
  WindowsSettingsWithoutWsl2,
  WindowsSettingsWithWsl2,
  DockerPlayground,
  AlreadySetup,
  GitRegistry,
  RunningYourFirstDockerContainer,
  HowToRunContainersWorkshop,
  Utilities,
  ExerciseKahoot,

  DockerImageSection,
  DockerArchitectureImages,
  DockerfileTheory,
  CreateYourOwnImage,
  DockerfileSyntax,
  PopularDockerRunOptions,
  DifferentEntrypointAndCmd,
  EntrypointAndCmd,
  ShellAndExecFormCmd,
  EntrypointVsCmd,
  DockerRegistryPush,
  PushImageToDockerHub1,
  PushImageToDockerHub2,
  PushImageToDockerHub3,
  PushImageToDockerHub4,
  DockerImageCommand,
  DockerContainerCommand,
  DockerManagementCommand,
  DockerNetwork,
  NetworkDrivers,
  DockerStorage,
  ManageDataInDocker,
  TypesOfMount,
  ApplicationOverview,
  MernStack,
  RemoveAllContainers,
  AdvancedDockerUsage,
  LinkingDockerContainers,
  InitializeDataMongoMountVolume,
  DockerSecurityBestPractices,
  NotOnlyItWorks,
  DockerVulnerability,
  SecurityBestPractices,
  ChoosingRightBaseImage,
  UseMultiStageBuilds,
  MultiStageBuildDemo1,
  MultiStageBuildDemo2,
  MultiStageBuildDemo3,
  RebuildingImages,
  CheckImageVulnerabilities,
  DockerScout,
  DockerSecurityCheatSheet1,
  DockerSecurityCheatSheet2,
  DockerIgnore,
  DockerResources,
  DockerRuntimeMetrics,
  LimitResources,
] satisfies Page[];
