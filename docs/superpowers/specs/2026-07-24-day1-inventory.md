# Day1 open-slide inventory

**Sources:** PPTX slides 1–89 · Notion Day1  
**Morph budget:** ≤3 — planned: `vm-container` (diagram continuity). Optional: `j-logo` (skipped — cover uses static hero mark).

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

| # | Title | Role | PPTX | Notion | Steps | Morph | Notes |
|---|-------|------|------|--------|-------|-------|-------|
| 1 | Zero to Hero: Docker for IT / Software Developer | cover | 1 | — | no | — | `brand="hero"`; course title from PPTX |
| 2 | Day 1 | section | 2 | — | no | — | Day marker divider |
| 3 | About Yosapol Jitrak | theory | 3 | — | no | — | GitHub, jitrak.dev, email from source deck |
| 4 | Course Introduction | theory | 4 | — | no | — | Workshop scope and audience |
| 5 | Agenda | theory | 5 | — | yes | — | Numbered agenda build |
| 6 | Get to Know Docker | section | 6 | — | no | — | Chapter B opener |
| 7 | What & Why Docker | theory | 7 | — | yes | — | Bullet reasons for containerization |
| 8 | Evolution of Deployment | diagram | 8–11 | — | no | — | PPTX 11 diagram; PPTX 8–10 credit slides folded as caption strip |
| 9 | Virtual Machine (VM) vs Container | diagram | 12 | — | no | vm-container | Side-by-side VM/container diagram; morph outgoing |
| 10 | VM vs Container — Example | diagram | 13 | — | no | vm-container | Worked example; morph incoming (opacity-only) |
| 11 | List of Linux Distributions | diagram | 14–15 | — | no | — | PPTX 15 credit folded as diagram caption |
| 12 | Containerization | theory | 16–18 | — | yes | — | PPTX 17–18 credits folded into diagram page |
| 13 | Docker Architecture | diagram | 19 | — | no | — | Client/daemon/registry diagram from PPTX |
| 14 | Docker Registry | theory | 20 | — | no | — | Hub and registry concepts |
| 15 | Hands-on Workshop | section | 21 | — | no | — | Chapter C opener |
| 16 | Installing Docker | theory | 22 | — | no | — | Install overview before platform-specific labs |
| 17 | Install with Command Line | lab | 23 | — | yes | — | macOS brew / Linux get.docker.com cmds |
| 18 | Install WSL 2 | lab | 24 | — | yes | — | WSL2 prerequisite steps |
| 19 | Linux Old Version Install | lab | 25 | — | yes | — | Legacy distro install path |
| 20 | Windows Settings Without WSL 2 | lab | 26–27 | — | yes | — | Two PPTX pages merged; Docker Desktop no-WSL path |
| 21 | Windows Settings With WSL 2 | lab | 28–29 | — | yes | — | Two PPTX pages merged; WSL2 integration |
| 22 | Docker Playground | theory | 30 | — | no | — | Play-with-Docker / cloud sandbox option |
| 23 | Already Setup | theory | 31 | — | no | — | Pre-provisioned environment note |
| 24 | Git Registry | lab | 32 | Git registry | yes | — | `git clone` verbatim from Notion |
| 25 | Running Your First Docker Container | section | 33 | Running your first Docker container | no | — | Lab section intro |
| 26 | How to Run Containers Workshop | lab | 34 | How to run containers workshop | yes | — | `simple-demo` steps verbatim from Notion |
| 27 | Utilities Commands Overview | lab | 35 | Utilities Commands Overview | yes | — | ps, logs, inspect, exec sequence from Notion |
| 28 | Exercise (Kahoot) | exercise | 36 | — | no | — | Kahoot quiz break; PPTX title “xercise” |
| 29 | Docker Image | section | 37 | Docker image | no | — | Chapter D opener |
| 30 | Docker Architecture (Images) | theory | 38 | — | no | — | Image layers and build context |
| 31 | Dockerfile | theory | 39–40 | — | no | — | PPTX 40 credit folded as caption |
| 32 | Create Your Own Image | lab | 41 | Create your own image | yes | — | Edit Dockerfile → build → run from Notion |
| 33 | Dockerfile Syntax | theory | 42 | — | yes | — | FROM/RUN/COPY/EXPOSE instruction build-up |
| 34 | Popular docker run Command Options | theory | 43 | — | no | — | Flags reference (-d, -p, -e, --name, …) |
| 35 | Different Entrypoint and CMD | theory | 44 | — | no | — | Intro to ENTRYPOINT vs CMD |
| 36 | Entrypoint and CMD | theory | 45 | — | yes | — | Default process behavior |
| 37 | Shell and Exec Form of CMD | theory | 46–48 | — | yes | — | Three PPTX pages merged; shell vs exec syntax |
| 38 | Entrypoint vs CMD | theory | 49 | — | yes | — | Override rules and combined behavior |
| 39 | Docker Registry (Push) | theory | 50 | — | no | — | Tagging and remote registry |
| 40 | Push Image to Docker Hub (1) | lab | 51–52 | — | yes | — | PPTX 52 placeholder (`‹#›`) merged with step 1 |
| 41 | Push Image to Docker Hub (2) | lab | 53 | — | yes | — | Hub login and tag |
| 42 | Push Image to Docker Hub (3) | lab | 54 | — | yes | — | Push command |
| 43 | Push Image to Docker Hub (4) | lab | 55 | — | yes | — | Verify on Hub |
| 44 | Docker Image Command | theory | 56 | — | no | — | `docker image` subcommand reference |
| 45 | Docker Container Command | theory | 57 | — | no | — | `docker container` subcommand reference |
| 46 | Docker Management Command | theory | 58 | — | no | — | System/prune/info reference |
| 47 | Docker Network | theory | 59 | — | no | — | Chapter E; networking overview |
| 48 | Network Drivers | theory | 60 | — | no | — | bridge, host, overlay, none |
| 49 | Docker Storage | theory | 61 | — | no | — | Volumes vs bind mounts intro |
| 50 | Manage Data in Docker | theory | 62 | — | yes | — | Persistence patterns |
| 51 | Types of Mount | theory | 63 | — | no | — | bind / volume / tmpfs |
| 52 | Application Overview & Running Apps in Docker | theory | 64 | — | no | — | Multi-container app context |
| 53 | MERN Stack | diagram | 65 | — | no | — | MERN topology diagram |
| 54 | Remove All Containers | lab | 66 | Remove all container | yes | — | Force remove all; Notion verbatim |
| 55 | Advanced Docker Usage | section | 67 | Advanced Docker Usage | no | — | Advanced labs section |
| 56 | Linking Docker Containers | lab | 68 | Linking Docker Containers | yes | — | `advance/link-container` lab from Notion |
| 57 | Initialize Data in MongoDB (Mount Volume) | lab | 69 | Initialize data in MongoDB (Mount volume) | yes | — | `advance/mount-volume` lab from Notion |
| 58 | Docker Security Best Practices | section | 70 | Docker Security Best Practices | no | — | Chapter F opener |
| 59 | Not Only "It Works" | theory | 71 | — | no | — | English cleanup of PPTX “Not only it work” |
| 60 | Docker Vulnerability | theory | 72–73 | — | yes | — | Two PPTX pages; attack surface overview |
| 61 | Security Best Practices | theory | 74 | — | yes | — | Hardening checklist build-up |
| 62 | Choosing the Right Base Image | theory | 75 | — | no | — | Slim vs distroless vs alpine |
| 63 | Use Multi-Stage Builds | theory | 76–77 | — | no | — | PPTX 77 credit folded into theory page |
| 64 | Explore Multi-Stage Builds Demo 1 | lab | 78 | Explore Multi-stage builds demo 1 | yes | — | Node slim→alpine Dockerfile from Notion |
| 65 | Explore Multi-Stage Builds Demo 2 | lab | 79 | Explore Multi-stage builds demo 2 | yes | — | Node build→nginx Dockerfile from Notion |
| 66 | Explore Multi-Stage Builds Demo 3 | lab | 80 | Explore Multi-stage builds demo 3 | yes | — | pnpm build→distroless Dockerfile from Notion |
| 67 | Rebuilding Images | theory | 81 | — | no | — | Cache invalidation and rebuild strategy |
| 68 | Check Your Image for Vulnerabilities | theory | 82 | — | no | — | Scanning concepts before Scout lab |
| 69 | Docker Scout | lab | 83 | Docker scout | yes | — | `docker scout recommendations` / `cves` from Notion |
| 70 | Docker Security Cheat Sheet (1) | theory | 84 | — | no | — | Quick-reference panel 1 |
| 71 | Docker Security Cheat Sheet (2) | theory | 85 | — | no | — | Quick-reference panel 2 |
| 72 | Docker Ignore | theory | 86 | — | no | — | `.dockerignore` patterns |
| 73 | Docker Resources | section | 87 | Docker Resources | no | — | Resources section divider |
| 74 | Docker Runtime Metrics | lab | 88 | Docker Runtime Metrics | yes | — | `docker stats` live stream from Notion |
| 75 | Limit Resources | lab | 89 | Limit Resources | yes | — | CPU/memory limits lab from Notion; Day1 ends here |

## Morph plan

| Morph id | Pages (titles) | Notes |
|----------|----------------|-------|
| `vm-container` | Virtual Machine (VM) vs Container → VM vs Container — Example | opacity-only morph transition on incoming |
