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
] satisfies Page[];
