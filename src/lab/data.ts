/*
  Lab content: the single source of truth for the homepage lab sections, the
  capability network, the timeline and the architecture diagrams.

  Every claim traces to a public repo, the GitHub profile data
  (DN-GitHub-Profile/data/profile.json + VERIFICATION.local.md) or the existing
  site content. No benchmark numbers are stated anywhere they have not been
  published. If something changes, change it here and every view follows.
*/

export type StatusKey =
  | "live"
  | "oss"
  | "research"
  | "winner"
  | "team"
  | "case"
  | "experience"
  | "proposal"
  | "tested"
  | "course"
  | "progress";

export const statuses: Record<StatusKey, { label: string; color: string }> = {
  live: { label: "Live demo", color: "var(--lab-blue)" },
  oss: { label: "Open source", color: "var(--lab-steel)" },
  research: { label: "Research prototype", color: "var(--lab-ice)" },
  winner: { label: "Hackathon winner", color: "var(--lab-red-hi)" },
  team: { label: "Team build", color: "var(--lab-steel)" },
  case: { label: "Case study", color: "var(--lab-ice)" },
  experience: { label: "Professional work", color: "var(--lab-red-hi)" },
  proposal: { label: "Initiative · proposal", color: "var(--lab-red-soft)" },
  tested: { label: "CI + tests", color: "var(--lab-steel)" },
  course: { label: "Course research", color: "var(--lab-ice)" },
  progress: { label: "In progress", color: "var(--lab-red-soft)" },
};

export const links = {
  github: "https://github.com/DanishNadar",
  linkedin: "https://www.linkedin.com/in/danish-nadar",
  iitFeature:
    "https://www.iit.edu/student-experience/student-and-alumni-stories/intelligent-systems-safer-roads",
} as const;

export type MotifKind =
  | "multimodal"
  | "distill"
  | "equilibrium"
  | "platform"
  | "gpu"
  | "voice"
  | "fusion"
  | "tracking"
  | "lanes"
  | "rl";

export type Track = "autonomy" | "applied" | "research" | "infrastructure";

export const tracks: { id: Track | "all"; label: string }[] = [
  { id: "all", label: "All systems" },
  { id: "autonomy", label: "Autonomy & robotics" },
  { id: "applied", label: "Applied AI" },
  { id: "research", label: "Research" },
  { id: "infrastructure", label: "Infrastructure" },
];

export interface LabProject {
  id: string;
  name: string;
  kicker: string;
  tagline: string;
  /** What this project honestly is: shown on every card. */
  maturity: string;
  tracks: Track[];
  status: StatusKey[];
  stack: string[];
  motif: MotifKind;
  motifCaption: string;
  accent: string;
  caseSlug?: string;
  repo?: string;
  demo?: string;
  extra?: { label: string; href: string };
  /** Key into `architectures` below when a diagram exists. */
  architecture?: string;
  flagship?: boolean;
  /** Problem / what was built / depth: shown on flagship cards. */
  story?: { problem: string; built: string; depth: string };
}

export const labProjects: LabProject[] = [
  {
    id: "taloncv",
    name: "TalonCV",
    kicker: "Multimodal AI / browser-local inference",
    tagline:
      "Private, explainable interview coaching: speech, language and vision models that run entirely in the browser.",
    maturity: "Shipped: live demo, CI with typecheck, lint, Vitest and Playwright",
    tracks: ["applied", "research"],
    status: ["live", "oss", "tested"],
    stack: [
      "TypeScript",
      "Next.js",
      "Transformers.js",
      "ONNX Runtime Web",
      "MediaPipe",
      "scikit-learn",
      "Python",
    ],
    motif: "multimodal",
    motifCaption:
      "Audio, video frames and transcript features flow from separate workers into one time-aligned, explainable report. Nothing leaves the browser.",
    accent: "var(--lab-blue)",
    caseSlug: "taloncv",
    repo: "https://github.com/DanishNadar/TalonCV",
    demo: "https://talon-cv-rosy.vercel.app",
    extra: {
      label: "Deployment notes",
      href: "https://github.com/DanishNadar/TalonCV/blob/main/DEPLOYMENT.md",
    },
    architecture: "taloncv",
    flagship: true,
    story: {
      problem:
        "Interview-practice tools usually upload a candidate's video to a server, and those recordings are sensitive.",
      built:
        "The full pipeline from recording to report, inside the browser. Two Web Workers run speech (Whisper), semantics (MiniLM) and vision (YOLO11-face via ONNX Runtime Web, plus MediaPipe). A time-window alignment step fuses their evidence, and deterministic scoring produces an eight-tab report.",
      depth:
        "Quantized model variants (q4/q8), a cancellable worker protocol, and a Python research twin that trains a random-forest cue classifier, exports it to browser JSON and is checked by parity tests.",
    },
  },
  {
    id: "morph",
    name: "Morph",
    kicker: "Model optimization / LLM compression",
    tagline:
      "Depth-compresses Hugging Face causal language models, then uses teacher–student distillation to recover what pruning loses.",
    maturity: "Research prototype: evaluation protocol defined, no benchmark numbers published yet",
    tracks: ["research"],
    status: ["research", "oss"],
    stack: ["PyTorch", "Transformers", "Datasets", "Accelerate", "bitsandbytes", "safetensors"],
    motif: "distill",
    motifCaption:
      "Conceptual view: blocks kept uniformly across the teacher's depth are copied into a smaller student, then distilled. The layer counts are an example, not a measured result.",
    accent: "var(--lab-ice)",
    caseSlug: "morph",
    repo: "https://github.com/DanishNadar/Morph",
    extra: {
      label: "Distillation objective",
      href: "https://github.com/DanishNadar/Morph#distillation-objective",
    },
    architecture: "morph",
    flagship: true,
    story: {
      problem:
        "Many deployment targets can't hold a model's full depth, and naive truncation throws away late-layer behaviour.",
      built:
        "An architecture-aware compression CLI. It locates the decoder-block list across common architectures (Llama, Mistral, Gemma, Qwen2, GPT-2, Falcon, OPT, NeoX, MPT), keeps blocks spread uniformly across depth and copies their weights into a reduced student, which can then be distilled against a frozen teacher.",
      depth:
        "Masked, T²-scaled KL to an optionally 4/8-bit quantized teacher, plus cross-entropy and optional hidden-state matching. Output is a standard Transformers checkpoint with compression metadata.",
    },
  },
  {
    id: "observe",
    name: "OBSERV-E",
    kicker: "Autonomous perception / assistive robotics",
    tagline:
      "Human-following perception and spoken guidance for visually impaired users. Won the StarkHacks 2026 Qualcomm Robotics Track.",
    maturity: "Hackathon prototype (team build): winner, StarkHacks 2026 Qualcomm Robotics Track",
    tracks: ["autonomy"],
    status: ["winner", "team", "oss"],
    stack: [
      "Python",
      "Ultralytics YOLO",
      "OpenCV",
      "NumPy",
      "Kalman filtering",
      "VLM API",
      "STM32 + BLE (team)",
    ],
    motif: "tracking",
    motifCaption:
      "The measured detection (red) arrives at inference rate; a constant-velocity Kalman filter publishes the predicted target state (blue) in between.",
    accent: "var(--lab-red-hi)",
    caseSlug: "observ-e",
    repo: "https://github.com/DanishNadar/observ-e",
    demo: "https://observ-e.vercel.app",
    extra: {
      label: "Perception package",
      href: "https://github.com/DanishNadar/observ-e/tree/main/VLM",
    },
    architecture: "observe",
    flagship: true,
    story: {
      problem:
        "A guide robot for visually impaired users has to keep a lock on its person and give guidance that is timely and relevant, without narrating constantly.",
      built:
        "A Python perception stack (team, StarkHacks 2026): YOLO11 person detection, single-target lock and reacquisition, and tracking that falls back from OpenCV trackers to Lucas–Kanade optical flow. A constant-velocity Kalman filter publishes predicted gimbal state at 100–300 Hz between detections.",
      depth:
        "A separate safety loop runs hazard detection, a risk engine and a speech planner that only speaks when the scene changes; an optional asynchronous VLM adds scene narration. Teammates built the STM32WB/IMU firmware and the BLE companion app.",
    },
  },
  {
    id: "ecocar",
    name: "EcoCAR Sensor Fusion",
    kicker: "Connected & automated vehicles",
    tagline:
      "Requirements, validation tests and real-time C++/RTMaps modules for lead-vehicle detection and driver monitoring.",
    maturity: "Ongoing team engineering: Sensor Fusion Lead since Aug 2024",
    tracks: ["autonomy"],
    status: ["experience", "case"],
    stack: ["C++", "RTMaps", "Camera", "Radar", "LiDAR"],
    motif: "fusion",
    motifCaption: "Camera, radar and LiDAR streams converge on one fused estimate of the scene.",
    accent: "var(--lab-red-hi)",
    caseSlug: "ecocar-sensor-fusion",
    extra: { label: "Illinois Tech feature", href: links.iitFeature },
  },
  {
    id: "lanes",
    name: "Lane Detection Study",
    kicker: "Computer vision / ONCE-3DLanes",
    tagline:
      "ResNet-18 vs EfficientNet-B0 vs MobileNetV2, each with and without augmentation: a reproducible 6-run grid with metrics, plots and video.",
    maturity: "Course research: the experimental design is the result shown here",
    tracks: ["autonomy", "research"],
    status: ["course", "oss"],
    stack: ["PyTorch", "torchvision", "Albumentations", "OpenCV", "Matplotlib"],
    motif: "lanes",
    motifCaption: "Predicted lane points along the road, closer points drawn larger.",
    accent: "var(--lab-blue)",
    caseSlug: "lane-detection-salad",
    repo: "https://github.com/DanishNadar/CS-584-Final-Project",
  },
  {
    id: "rl",
    name: "RL Lane-Keeping Simulator",
    kicker: "Reinforcement learning / simulation",
    tagline:
      "PPO agents in a custom simulator, comparing camera, camera+LiDAR and full-stack sensing on collisions, lane deviation and completion.",
    maturity: "Simulation (course project): not deployed on a vehicle",
    tracks: ["autonomy", "research"],
    status: ["course", "case"],
    stack: ["Python", "PPO", "Reward design", "Simulation"],
    motif: "rl",
    motifCaption: "An agent follows the lane while its episode reward climbs (illustrative curve).",
    accent: "var(--lab-ice)",
    caseSlug: "rl-autonomous-driving",
  },
  {
    id: "confusion",
    name: "ConfusionClassifier",
    kicker: "Probabilistic ML / interactive",
    tagline:
      "A club-fair game where players try to drive a GoEmotions text classifier to a uniform 25/25/25/25 prediction.",
    maturity: "Shipped: live demo used at the Illinois Tech club fair",
    tracks: ["applied", "research"],
    status: ["live", "oss"],
    stack: ["scikit-learn", "FastAPI", "React", "TypeScript", "Supabase"],
    motif: "equilibrium",
    motifCaption:
      "As a player edits the input, the four class probabilities rebalance toward the 25% line: the game's win condition. Bar heights are illustrative.",
    accent: "var(--lab-blue)",
    caseSlug: "confusion-classifier",
    repo: "https://github.com/DanishNadar/ConfusionClassifier",
    demo: "https://confusion-classifier-chi.vercel.app",
  },
  {
    id: "aila",
    name: "AILA",
    kicker: "Voice AI / conversational agents",
    tagline:
      "AI Leadership Avatar for Illinois Tech's Leadership Academy: role-play scenarios with speech in, speech out and barge-in.",
    maturity: "Shipped: live demo, plus a separate local-inference proof of concept",
    tracks: ["applied"],
    status: ["live", "oss"],
    stack: ["JavaScript", "Groq LLM + STT", "XTTS-v2", "Ollama (local PoC)", "Vercel"],
    motif: "voice",
    motifCaption:
      "Speech in, recognition, a language-model turn, synthesis, and speech out, which the user can interrupt.",
    accent: "var(--lab-ice)",
    caseSlug: "aila-avatar",
    repo: "https://github.com/DanishNadar/AILA_Avatar",
    demo: "https://aila-avatar.vercel.app",
    extra: { label: "Local Ollama prototype", href: "https://github.com/DanishNadar/AILA" },
    architecture: "aila",
  },
  {
    id: "campgrids",
    name: "CampGrids",
    kicker: "Full-stack platform / MSI Fab Lab camps",
    tagline:
      "Turns a hyperlink-heavy curriculum workbook into a live platform with roles, rosters, progress tracking and partner pages.",
    maturity: "Shipped: live site; an AWS target is documented, not deployed",
    tracks: ["infrastructure", "applied"],
    status: ["live", "oss"],
    stack: [
      "JavaScript",
      "Supabase",
      "Postgres RLS",
      "Edge Functions",
      "Python",
      "AWS CloudFormation",
    ],
    motif: "platform",
    motifCaption:
      "Educators, students and admins reach the curriculum and progress data through one row-level-secured core.",
    accent: "var(--lab-red-hi)",
    caseSlug: "campgrids",
    repo: "https://github.com/DanishNadar/CampGrids",
    demo: "https://camp-grids.vercel.app",
    architecture: "campgrids",
  },
  {
    id: "compute",
    name: "Compute Collaborative",
    kicker: "GPU infrastructure / initiative",
    tagline:
      "Funding proposal site for a student-run GPU suite, with a workload explorer, budget builder and own-vs-rent model.",
    maturity: "Proposal and planning tools: no cluster has been deployed",
    tracks: ["infrastructure"],
    status: ["proposal", "oss"],
    stack: ["HTML", "CSS", "JavaScript", "Cost modeling"],
    motif: "gpu",
    motifCaption:
      "A planning view: a scheduler distributes example workloads across a proposed GPU pool.",
    accent: "var(--lab-blue)",
    caseSlug: "compute-collaborative",
    repo: "https://github.com/DanishNadar/ComputeCollaborative",
  },
];

export const projectById = Object.fromEntries(labProjects.map((p) => [p.id, p])) as Record<
  string,
  LabProject
>;
export const projectByCaseSlug = Object.fromEntries(
  labProjects.filter((p) => p.caseSlug).map((p) => [p.caseSlug!, p]),
) as Record<string, LabProject>;

/** Projects that share a discipline with this one, for the end of a case study. */
export function relatedByDiscipline(project: LabProject | undefined, exclude: string[], limit = 3) {
  if (!project) return [];
  return labProjects
    .filter((p) => p.id !== project.id && p.caseSlug && !exclude.includes(p.caseSlug))
    .map((p) => ({ p, score: p.tracks.filter((t) => project.tracks.includes(t)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

/** Further verified builds, shown as a compact list with real links only. */
export const moreBuilds: {
  name: string;
  body: string;
  repo?: string;
  demo?: string;
  caseSlug?: string;
}[] = [
  {
    name: "LEAD-AI",
    body: "Auditable leadership-outcome reporting: async CampusGroups export client, deterministic semantic read of weekly reports, Neon Postgres.",
    repo: "https://github.com/DanishNadar/LEAD-AI",
    demo: "https://lead-ai-eight.vercel.app",
  },
  {
    name: "Certeverin",
    body: "Maps job-posting skill demand to certification objectives so a club can decide which certifications to fund. FastAPI, Next.js, CLI, PDF export.",
    repo: "https://github.com/DanishNadar/Certeverin",
    demo: "https://certeverin.vercel.app",
  },
  {
    name: "Cloud Conglomerate",
    body: "Offline Godot 4 game that teaches cloud and ML system design: architectures appear as constellations you inspect, scale and fail over.",
    repo: "https://github.com/DanishNadar/CloudConglomerate",
  },
  {
    name: "TTP DNS Screening",
    body: "SPF / DKIM / DMARC screening automation with DNS-over-HTTPS lookups and checkdmarc validation.",
    repo: "https://github.com/DanishNadar/TTP_DNS-Screening-Tool",
    caseSlug: "dns-security-scanner",
  },
  {
    name: "ITR Lab Access",
    body: "Lab-access management for Illinois Tech Robotics. Next.js 14, Neon Postgres, Drizzle ORM.",
    repo: "https://github.com/DanishNadar/ITR-Lab-Access",
    demo: "https://itr-lab-access.vercel.app",
  },
  {
    name: "Scammantha",
    body: "Scam-awareness training game with an AI scammer.",
    demo: "https://scammantha.vercel.app",
    caseSlug: "scammantha",
  },
];

/* ── Autonomy: one honest view of the whole stack ────────────────────── */

export const autonomyStages = [
  { id: "observe", label: "Observe", detail: "Camera, radar, LiDAR, IMU" },
  { id: "fuse", label: "Fuse", detail: "Align and combine sensor evidence" },
  { id: "localize", label: "Localize", detail: "Where am I, where is the target" },
  { id: "plan", label: "Plan", detail: "Choose a path or response" },
  { id: "control", label: "Control", detail: "Steer, point, speak" },
] as const;

export const autonomyWork: {
  name: string;
  stages: (typeof autonomyStages)[number]["id"][];
  maturity:
    | "Team engineering"
    | "Hackathon prototype"
    | "Simulation"
    | "Course research"
    | "Competition prep";
  body: string;
  caseSlug?: string;
}[] = [
  {
    name: "EcoCAR EV Challenge",
    stages: ["observe", "fuse"],
    maturity: "Team engineering",
    body: "Perception requirements, validation test cases and real-time C++/RTMaps modules across camera, radar and LiDAR.",
    caseSlug: "ecocar-sensor-fusion",
  },
  {
    name: "OBSERV-E",
    stages: ["observe", "localize", "plan", "control"],
    maturity: "Hackathon prototype",
    body: "Person detection and lock, Kalman-predicted target state for the gimbal, and an event-driven speech planner.",
    caseSlug: "observ-e",
  },
  {
    name: "RL lane-keeping",
    stages: ["plan", "control"],
    maturity: "Simulation",
    body: "PPO steering policies compared across camera, camera+LiDAR and full-stack sensing.",
    caseSlug: "rl-autonomous-driving",
  },
  {
    name: "Lane detection study",
    stages: ["observe"],
    maturity: "Course research",
    body: "Three backbones × augmentation on ONCE-3DLanes, with per-epoch histories and qualitative video.",
    caseSlug: "lane-detection-salad",
  },
  {
    name: "NASA Lunabotics",
    stages: ["localize", "plan"],
    maturity: "Competition prep",
    body: "Leading autonomy software (perception, localization, mapping and planning) for the team's lunar robotics entry. No results claimed yet.",
  },
];

/* ── Perceive → Reason → Act ─────────────────────────────────────────── */

export type StageId = "perceive" | "reason" | "act";

export const stages: {
  id: StageId;
  index: string;
  title: string;
  verb: string;
  color: string;
  summary: string;
  concepts: { name: string; body: string }[];
  evidence: { project: string; detail: string }[];
}[] = [
  {
    id: "perceive",
    index: "01",
    title: "Perceive",
    verb: "Sense the world",
    color: "var(--lab-blue)",
    summary:
      "Raw signals become structured observations: what is in the scene, where it is, and how confident the system is about it.",
    concepts: [
      {
        name: "Camera input",
        body: "Frames arrive at a fixed rate and are the system's densest signal.",
      },
      {
        name: "Object detection",
        body: "Boxes and classes for the things that matter: people, vehicles, faces.",
      },
      {
        name: "Semantic segmentation",
        body: "Every pixel labelled, so drivable space and lanes become regions.",
      },
      {
        name: "Spatial relationships",
        body: "Range and bearing from the ego frame to each detection.",
      },
      {
        name: "Sensor observations",
        body: "Radar and LiDAR returns add depth that a single camera lacks.",
      },
    ],
    evidence: [
      {
        project: "taloncv",
        detail: "Whisper, YOLO11-face and MediaPipe running in browser workers",
      },
      { project: "observe", detail: "YOLO11 person detection with single-target lock" },
      { project: "ecocar", detail: "Camera, radar and LiDAR perception requirements and modules" },
      { project: "lanes", detail: "Lane perception on ONCE-3DLanes across three backbones" },
    ],
  },
  {
    id: "reason",
    index: "02",
    title: "Reason",
    verb: "Infer and explain",
    color: "var(--lab-ice)",
    summary:
      "Observations become a model of the world: features are extracted, evidence is aligned over time, and the state is estimated, with uncertainty attached.",
    concepts: [
      {
        name: "Feature extraction",
        body: "Encoders turn pixels, audio and text into compact representations.",
      },
      {
        name: "Neural representations",
        body: "Embeddings and hidden states carry what the model has learned.",
      },
      {
        name: "Model inference",
        body: "Forward passes under real limits on latency, memory and privacy.",
      },
      { name: "State estimation", body: "Filters fuse noisy measurements with a motion model." },
      {
        name: "Decision under uncertainty",
        body: "Calibrated probabilities, not just a top label.",
      },
    ],
    evidence: [
      {
        project: "taloncv",
        detail: "Time-window alignment of audio, vision and transcript evidence",
      },
      {
        project: "morph",
        detail: "Teacher–student distillation with KL and hidden-state matching",
      },
      { project: "observe", detail: "Constant-velocity Kalman filter between detections" },
      { project: "confusion", detail: "Calibrated probabilities with log-loss in model selection" },
    ],
  },
  {
    id: "act",
    index: "03",
    title: "Act",
    verb: "Change the world",
    color: "var(--lab-red-hi)",
    summary:
      "Decisions become actions: a trajectory is chosen, a controller follows it, or software responds to a person, and the next observation shows the effect.",
    concepts: [
      { name: "Trajectory generation", body: "Candidate paths are scored and one is committed." },
      {
        name: "Planning",
        body: "Constraints such as safety margins and comfort shape the choice.",
      },
      { name: "Control", body: "Steering, gimbal pointing or speech: the physical output." },
      { name: "Intelligent responses", body: "Reports, guidance and voice that people act on." },
      { name: "Feedback", body: "Every action changes what the system perceives next." },
    ],
    evidence: [
      {
        project: "observe",
        detail: "Predicted gimbal state at 100–300 Hz and event-driven speech",
      },
      { project: "rl", detail: "PPO steering policies in simulation" },
      { project: "ecocar", detail: "Driver-monitoring and lead-vehicle modules" },
      { project: "taloncv", detail: "Explainable eight-tab coaching report" },
    ],
  },
];

/* ── Architecture diagrams (derived from each repo's implementation) ─── */

export interface ArchNode {
  id: string;
  label: string;
  sub?: string;
  detail: string;
  tone?: "blue" | "ice" | "red" | "steel";
  optional?: boolean;
}
export interface ArchColumn {
  title: string;
  /** Parallel groups inside a column (e.g. two workers). */
  groups: { label?: string; nodes: ArchNode[] }[];
}
export interface Architecture {
  id: string;
  title: string;
  summary: string;
  columns: ArchColumn[];
  footnote?: string;
  source: { label: string; href: string };
}

export const architectures: Record<string, Architecture> = {
  taloncv: {
    id: "taloncv",
    title: "TalonCV: recording to explainable report, entirely in the browser",
    summary:
      "Two Web Workers analyse a recorded session in parallel. Their outputs are aligned on overlapping time windows, scored deterministically, and rendered as a report. There is no backend and no inference API.",
    columns: [
      {
        title: "Input",
        groups: [
          {
            nodes: [
              {
                id: "capture",
                label: "Capture",
                sub: "MediaRecorder · IndexedDB",
                detail:
                  "The session is recorded in the browser and stored in IndexedDB. The static Next.js export never uploads it.",
                tone: "blue",
              },
            ],
          },
        ],
      },
      {
        title: "Browser workers",
        groups: [
          {
            label: "Analysis worker",
            nodes: [
              {
                id: "whisper",
                label: "Whisper",
                sub: "speech → transcript",
                detail: "Speech recognition with a quantized Whisper model via Transformers.js.",
                tone: "blue",
              },
              {
                id: "dsp",
                label: "Audio DSP",
                sub: "pace · pauses · energy",
                detail: "Signal features computed directly from the audio track.",
                tone: "blue",
              },
              {
                id: "minilm",
                label: "MiniLM",
                sub: "semantic embeddings",
                detail: "Sentence embeddings for answer relevance and structure.",
                tone: "blue",
              },
            ],
          },
          {
            label: "Vision worker",
            nodes: [
              {
                id: "yolo",
                label: "YOLO11-face",
                sub: "ONNX Runtime Web",
                detail: "Face detection on sampled frames, running through ONNX Runtime Web.",
                tone: "ice",
              },
              {
                id: "mediapipe",
                label: "MediaPipe",
                sub: "landmarks",
                detail: "Facial landmarks for gaze and posture cues.",
                tone: "ice",
              },
              {
                id: "rf",
                label: "Cue model",
                sub: "rules + random forest",
                detail:
                  "Cue rules plus a random-forest classifier trained in a Python research twin and exported to browser JSON, with parity tests.",
                tone: "ice",
              },
            ],
          },
        ],
      },
      {
        title: "Fusion",
        groups: [
          {
            nodes: [
              {
                id: "align",
                label: "Time-window alignment",
                sub: "multimodal evidence",
                detail:
                  "Audio, vision and transcript evidence are joined by overlapping time windows, so every score points back to a moment in the recording.",
                tone: "ice",
              },
            ],
          },
        ],
      },
      {
        title: "Output",
        groups: [
          {
            nodes: [
              {
                id: "score",
                label: "Deterministic scoring",
                sub: "explainable",
                detail:
                  "Scores are computed by fixed rules over the aligned evidence, so the same session always gives the same result.",
                tone: "red",
              },
              {
                id: "report",
                label: "Eight-tab report",
                sub: "coaching",
                detail: "An explainable report that shows the evidence behind each observation.",
                tone: "red",
              },
              {
                id: "smollm",
                label: "SmolLM2 (optional)",
                sub: "rewording only",
                detail:
                  "An optional worker that only rewords coaching text. It never changes a score.",
                tone: "steel",
                optional: true,
              },
            ],
          },
        ],
      },
    ],
    footnote:
      "Quantized q4/q8 models · cancellable worker protocol · CI runs typecheck, lint, Vitest and Playwright.",
    source: { label: "TalonCV on GitHub", href: "https://github.com/DanishNadar/TalonCV" },
  },
  morph: {
    id: "morph",
    title: "Morph: depth compression, then distillation",
    summary:
      "Morph finds the decoder-block list for the model's architecture, keeps blocks spread uniformly across depth, builds a reduced student from them, and optionally recovers quality by distilling against the frozen teacher.",
    columns: [
      {
        title: "Teacher",
        groups: [
          {
            nodes: [
              {
                id: "teacher",
                label: "Teacher LM",
                sub: "Hugging Face causal LM",
                detail:
                  "Any supported causal LM: Llama, Mistral, Gemma, Qwen2, GPT-2, Falcon, OPT, NeoX or MPT.",
                tone: "ice",
              },
            ],
          },
        ],
      },
      {
        title: "Compression",
        groups: [
          {
            nodes: [
              {
                id: "find",
                label: "find_layer_path",
                sub: "locate decoder blocks",
                detail: "Resolves where each architecture stores its block list (LAYER_PATHS).",
                tone: "blue",
              },
              {
                id: "select",
                label: "select_uniform_layers",
                sub: "keep blocks across depth",
                detail:
                  "Chooses blocks spread uniformly from first to last, so late-layer behaviour isn't simply cut off.",
                tone: "blue",
              },
              {
                id: "student",
                label: "make_reduced_student",
                sub: "copy weights",
                detail:
                  "Builds the smaller model and transfers the selected blocks' weights into it.",
                tone: "blue",
              },
            ],
          },
        ],
      },
      {
        title: "Distillation (optional)",
        groups: [
          {
            nodes: [
              {
                id: "frozen",
                label: "Frozen teacher",
                sub: "optional 4/8-bit",
                detail: "The teacher can be loaded quantized with bitsandbytes to fit in memory.",
                tone: "ice",
              },
              {
                id: "loss",
                label: "Loss",
                sub: "CE + T²·KL + hidden MSE",
                detail:
                  "Weighted next-token cross-entropy, masked temperature-scaled KL to the teacher, and optional hidden-state matching.",
                tone: "red",
              },
              {
                id: "opt",
                label: "AdamW",
                sub: "warmup · grad accumulation",
                detail:
                  "BF16/FP16 and gradient checkpointing keep training within a single GPU's budget.",
                tone: "steel",
              },
            ],
          },
        ],
      },
      {
        title: "Output",
        groups: [
          {
            nodes: [
              {
                id: "ckpt",
                label: "Student checkpoint",
                sub: "+ compression metadata",
                detail:
                  "A standard Transformers checkpoint, plus metadata recording which teacher blocks were kept.",
                tone: "red",
              },
            ],
          },
        ],
      },
    ],
    footnote:
      "Evaluation protocol in the README: held-out perplexity, teacher–student KL and agreement, tokens/s, peak memory. No numbers are published yet.",
    source: { label: "Morph on GitHub", href: "https://github.com/DanishNadar/Morph" },
  },
  aila: {
    id: "aila",
    title: "AILA: a spoken role-play loop the user can interrupt",
    summary:
      "The user speaks, the speech is transcribed, a language model plays the scenario's counterpart, and the reply is synthesized. Voice-activity detection lets the user barge in at any point.",
    columns: [
      {
        title: "Voice input",
        groups: [
          {
            nodes: [
              {
                id: "mic",
                label: "Microphone",
                sub: "VAD · barge-in",
                detail:
                  "Voice-activity detection decides when a turn starts and ends, and lets the user interrupt playback.",
                tone: "blue",
              },
            ],
          },
        ],
      },
      {
        title: "Recognition",
        groups: [
          {
            nodes: [
              {
                id: "stt",
                label: "Speech-to-text",
                sub: "Groq STT",
                detail: "The user's turn is transcribed by a hosted speech-recognition model.",
                tone: "blue",
              },
            ],
          },
        ],
      },
      {
        title: "Language model",
        groups: [
          {
            nodes: [
              {
                id: "llm",
                label: "LLM turn",
                sub: "Groq-hosted",
                detail: "The model plays the counterpart in one of 34 leadership scenarios.",
                tone: "ice",
              },
              {
                id: "ollama",
                label: "Ollama (prototype)",
                sub: "local inference",
                detail: "A separate proof of concept runs the loop on a local model with Ollama.",
                tone: "steel",
                optional: true,
              },
            ],
          },
        ],
      },
      {
        title: "Synthesis",
        groups: [
          {
            nodes: [
              {
                id: "tts",
                label: "Speech synthesis",
                sub: "XTTS-v2 · browser fallback",
                detail:
                  "Replies are voiced with XTTS-v2, falling back to the browser's speech synthesis.",
                tone: "red",
              },
            ],
          },
        ],
      },
      {
        title: "Voice output",
        groups: [
          {
            nodes: [
              {
                id: "out",
                label: "Avatar speaks",
                sub: "interruptible",
                detail: "Playback stops as soon as the user starts talking.",
                tone: "red",
              },
            ],
          },
        ],
      },
    ],
    source: { label: "AILA_Avatar on GitHub", href: "https://github.com/DanishNadar/AILA_Avatar" },
  },
  campgrids: {
    id: "campgrids",
    title: "CampGrids: workbook to platform, secured at the row level",
    summary:
      "Curriculum content flows from an Excel workbook into a static site. Accounts, progress and administration run on Supabase, with Postgres row-level security as the boundary between roles.",
    columns: [
      {
        title: "Content",
        groups: [
          {
            nodes: [
              {
                id: "xlsx",
                label: "Curriculum workbook",
                sub: "Excel",
                detail:
                  "The source of truth staff already used, with belts, columns and linked resources.",
                tone: "steel",
              },
              {
                id: "gen",
                label: "generateCampgrids.py",
                sub: "workbook → site sync",
                detail:
                  "Generates the site from the workbook and upserts content keyed on (belt, column).",
                tone: "blue",
              },
            ],
          },
        ],
      },
      {
        title: "Client",
        groups: [
          {
            nodes: [
              {
                id: "site",
                label: "Static site",
                sub: "Vercel",
                detail: "The public site and signed-in views, served statically.",
                tone: "blue",
              },
            ],
          },
        ],
      },
      {
        title: "Authentication",
        groups: [
          {
            nodes: [
              {
                id: "auth",
                label: "Supabase Auth",
                sub: "students · staff OTP",
                detail: "Student and staff sign-in; staff receive emailed one-time codes.",
                tone: "ice",
              },
            ],
          },
        ],
      },
      {
        title: "Application logic",
        groups: [
          {
            nodes: [
              {
                id: "rpc",
                label: "Postgres RPCs",
                sub: "app logic",
                detail: "Server-side functions for the actions each role can take.",
                tone: "ice",
              },
              {
                id: "edge",
                label: "Edge Functions",
                sub: "admin-only provisioning",
                detail:
                  "Account provisioning runs in admin-gated edge functions, never in the client.",
                tone: "red",
              },
              {
                id: "rt",
                label: "Realtime",
                sub: "navigation",
                detail: "Realtime channels keep navigation in sync.",
                tone: "ice",
              },
            ],
          },
        ],
      },
      {
        title: "Data & workflows",
        groups: [
          {
            nodes: [
              {
                id: "pg",
                label: "Postgres + RLS",
                sub: "row-level security",
                detail:
                  "Row-level security policies define what students, educators and admins can read and write.",
                tone: "red",
              },
              {
                id: "flows",
                label: "Educator & student workflows",
                sub: "rosters · progress",
                detail: "Rosters, progress tracking and partner pages built on the secured data.",
                tone: "red",
              },
            ],
          },
        ],
      },
    ],
    footnote:
      "An AWS target (CloudFormation, Cognito, RDS, EC2 API, S3, Redshift for reporting) is documented in the repo but not deployed.",
    source: { label: "CampGrids on GitHub", href: "https://github.com/DanishNadar/CampGrids" },
  },
  observe: {
    id: "observe",
    title: "OBSERV-E: a tracking loop and a safety loop",
    summary:
      "Camera frames feed two loops. The tracking loop keeps the gimbal on the guided person between detections; the safety loop decides when guidance is worth saying out loud.",
    columns: [
      {
        title: "Sensing",
        groups: [
          {
            nodes: [
              {
                id: "cam",
                label: "Camera frames",
                sub: "on-device",
                detail: "Frames from the robot's camera feed both loops.",
                tone: "blue",
              },
            ],
          },
        ],
      },
      {
        title: "Perception",
        groups: [
          {
            label: "Tracking loop",
            nodes: [
              {
                id: "yolo",
                label: "YOLO11n",
                sub: "person detection",
                detail: "Detects people in each processed frame.",
                tone: "blue",
              },
              {
                id: "lock",
                label: "Target lock",
                sub: "OpenCV → optical flow",
                detail:
                  "Locks one person and reacquires them; tracking falls back from OpenCV trackers to Lucas–Kanade optical flow.",
                tone: "blue",
              },
            ],
          },
          {
            label: "Safety loop",
            nodes: [
              {
                id: "hazard",
                label: "Hazard detector",
                sub: "on-device",
                detail: "Flags hazards in the scene.",
                tone: "ice",
              },
              {
                id: "risk",
                label: "Risk engine",
                sub: "prioritise",
                detail: "Ranks hazards so only what matters reaches the user.",
                tone: "ice",
              },
            ],
          },
        ],
      },
      {
        title: "Estimation & decisions",
        groups: [
          {
            nodes: [
              {
                id: "kf",
                label: "Kalman filter",
                sub: "100–300 Hz projector",
                detail:
                  "A constant-velocity Kalman filter publishes predicted target state at 100–300 Hz, decoupled from inference rate.",
                tone: "ice",
              },
              {
                id: "speech",
                label: "Speech planner",
                sub: "event-driven",
                detail: "Speaks only when the scene changes, instead of narrating constantly.",
                tone: "ice",
              },
              {
                id: "vlm",
                label: "VLM narrator",
                sub: "optional, async",
                detail: "An optional asynchronous vision-language model adds scene narration.",
                tone: "steel",
                optional: true,
              },
            ],
          },
        ],
      },
      {
        title: "Action",
        groups: [
          {
            nodes: [
              {
                id: "gimbal",
                label: "Gimbal state",
                sub: "STM32 firmware (team)",
                detail:
                  "The predicted state drives the gimbal. Teammates built the STM32WB/IMU firmware.",
                tone: "red",
              },
              {
                id: "voice",
                label: "TTS + BLE app",
                sub: "guidance (team app)",
                detail: "Guidance is spoken aloud; teammates built the BLE companion app.",
                tone: "red",
              },
            ],
          },
        ],
      },
    ],
    footnote: "Team build at StarkHacks 2026 (Qualcomm Robotics Track winner).",
    source: { label: "observ-e on GitHub", href: "https://github.com/DanishNadar/observ-e" },
  },
};

/* ── Capabilities: every skill points at the work that proves it ─────── */

export const capabilities: {
  id: string;
  title: string;
  color: string;
  blurb: string;
  items: { skill: string; evidence: string[] }[];
}[] = [
  {
    id: "dl",
    title: "AI & Deep Learning",
    color: "var(--lab-blue)",
    blurb:
      "Training, adapting and serving neural models, with PyTorch and Hugging Face as the daily tools.",
    items: [
      { skill: "PyTorch", evidence: ["morph", "lanes"] },
      { skill: "Hugging Face Transformers", evidence: ["morph", "taloncv"] },
      { skill: "NLP + embeddings", evidence: ["taloncv", "confusion"] },
      { skill: "LLM / VLM integration", evidence: ["observe", "aila"] },
      { skill: "Reinforcement learning (PPO)", evidence: ["rl"] },
    ],
  },
  {
    id: "cv",
    title: "Computer Vision & Multimodal AI",
    color: "var(--lab-ice)",
    blurb: "Detection, tracking and landmarks, and fusing them with speech and text.",
    items: [
      { skill: "YOLO detection", evidence: ["observe", "taloncv"] },
      { skill: "MediaPipe landmarks", evidence: ["taloncv"] },
      { skill: "OpenCV + optical flow", evidence: ["observe"] },
      { skill: "Lane perception", evidence: ["lanes"] },
      { skill: "Speech: Whisper, STT, TTS", evidence: ["taloncv", "aila"] },
      { skill: "Multimodal time alignment", evidence: ["taloncv"] },
    ],
  },
  {
    id: "auto",
    title: "Autonomous Systems & Robotics",
    color: "var(--lab-red-hi)",
    blurb:
      "Perception, estimation and control for vehicles and robots, from requirements to validation.",
    items: [
      { skill: "Sensor fusion (camera / radar / LiDAR)", evidence: ["ecocar"] },
      { skill: "RTMaps real-time pipelines", evidence: ["ecocar"] },
      { skill: "Kalman filtering + tracking", evidence: ["observe"] },
      { skill: "Requirements + validation", evidence: ["ecocar"] },
      { skill: "Simulation + reward design", evidence: ["rl"] },
      { skill: "Hardware integration (BLE, serial)", evidence: ["observe"] },
    ],
  },
  {
    id: "research",
    title: "Model Optimization & Research",
    color: "var(--lab-red-soft)",
    blurb: "Making models smaller and faster, and making results reproducible and honest.",
    items: [
      { skill: "Knowledge distillation", evidence: ["morph"] },
      { skill: "Quantization (4/8-bit, q4/q8)", evidence: ["morph", "taloncv"] },
      { skill: "Experiment grids + ablations", evidence: ["lanes"] },
      { skill: "Dev-only model selection", evidence: ["confusion"] },
      { skill: "Calibration + log-loss", evidence: ["confusion"] },
      { skill: "Explainability", evidence: ["taloncv", "confusion"] },
    ],
  },
  {
    id: "swe",
    title: "Software Engineering",
    color: "var(--lab-steel)",
    blurb: "Shipping the systems around the models: typed front ends, APIs, workers and tests.",
    items: [
      { skill: "Python · TypeScript · C++", evidence: ["taloncv", "observe", "ecocar"] },
      { skill: "Next.js · React", evidence: ["taloncv", "confusion"] },
      { skill: "FastAPI", evidence: ["confusion"] },
      { skill: "Web Workers + IndexedDB", evidence: ["taloncv"] },
      { skill: "Testing: Vitest, Playwright, pytest", evidence: ["taloncv"] },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    color: "var(--lab-blue-soft)",
    blurb: "Secure data layers, infrastructure as code and the economics of compute.",
    items: [
      { skill: "Supabase: Postgres, RLS, Edge Functions", evidence: ["campgrids", "confusion"] },
      { skill: "AWS CloudFormation (documented target)", evidence: ["campgrids"] },
      { skill: "Vercel serverless + static export", evidence: ["taloncv", "aila"] },
      { skill: "GitHub Actions CI", evidence: ["taloncv"] },
      { skill: "GPU capacity + cost modeling", evidence: ["compute"] },
    ],
  },
];

/* ── Experience and education ────────────────────────────────────────── */

export type TimelineKind = "education" | "work" | "leadership" | "award";

export const timeline: {
  id: string;
  when: string;
  year: string;
  role: string;
  org: string;
  kind: TimelineKind;
  state: "Current" | "Completed" | "In progress" | "Expected" | "Awarded";
  body: string;
  contributions?: string[];
  links?: { label: string; href: string }[];
}[] = [
  {
    id: "iit",
    when: "Expected May 2027",
    year: "2023",
    role: "B.S. + M.S. in Artificial Intelligence (combined)",
    org: "Illinois Institute of Technology",
    kind: "education",
    state: "In progress",
    body: "Combined bachelor's and master's in AI. Degree in progress, not yet conferred.",
    links: [{ label: "Illinois Tech", href: "/illinois-tech" }],
  },
  {
    id: "mc",
    when: "Completed Apr 2023",
    year: "2023",
    role: "A.A.S. Cloud Computing & Network Technology",
    org: "Montgomery College (via P-TECH)",
    kind: "education",
    state: "Completed",
    body: "Earned through dual enrollment while finishing high school: an early foundation in infrastructure and networking.",
  },
  {
    id: "ecocar",
    when: "Aug 2024 – Present",
    year: "2024",
    role: "Connected & Automated Vehicle Engineer · Sensor Fusion Lead",
    org: "EcoCAR EV Challenge · Illinois Tech",
    kind: "work",
    state: "Current",
    body: "Owns perception requirements and validation for the team's connected & automated vehicle work.",
    contributions: [
      "Authored requirements and validation test cases for lead-vehicle detection and driver monitoring",
      "Implemented real-time C++ and RTMaps workflows across camera, radar, LiDAR and vehicle-state signals",
    ],
    links: [
      { label: "Case study", href: "/projects/ecocar-sensor-fusion" },
      { label: "Illinois Tech feature", href: links.iitFeature },
    ],
  },
  {
    id: "itr",
    when: "Nov 2024 – Present",
    year: "2024",
    role: "President (previously Treasurer · Instructor)",
    org: "Illinois Tech Robotics",
    kind: "leadership",
    state: "Current",
    body: "Runs the robotics organization: budgets, purchasing, workshops and competition teams.",
    contributions: [
      "Taught workshops across AI/ML, Linux, Python and robotics fundamentals",
      "Led an autonomous robot-fleet project and represented the club at competitions",
    ],
    links: [{ label: "Student organizations", href: "/student-organizations" }],
  },
  {
    id: "officepro",
    when: "May 2025 – Aug 2025",
    year: "2025",
    role: "AI Software Development Intern",
    org: "OfficePro, Inc.",
    kind: "work",
    state: "Completed",
    body: "AI instructor and training-support prototypes on Azure, plus fleet automation.",
    contributions: [
      "Built an AI-instructor prototype with Azure Cognitive Services, Speech Services and Azure Functions",
      "Automated setup for a 50+ computer training fleet with Python and PowerShell",
    ],
    links: [{ label: "Resume", href: "/resume" }],
  },
  {
    id: "academy",
    when: "2025 – Present",
    year: "2025",
    role: "Leadership Academy Scholar",
    org: "M.A. & Lila Self Leadership Academy",
    kind: "leadership",
    state: "Current",
    body: "Selected for leadership development, and built AI tools for the Academy itself.",
    contributions: [
      "Built AILA, a voice role-play coach, and LEAD-AI, auditable outcome reporting",
    ],
    links: [
      { label: "Leadership Academy", href: "/leadership-academy" },
      { label: "AILA case study", href: "/projects/aila-avatar" },
    ],
  },
  {
    id: "ttp",
    when: "Aug 2025 – Present",
    year: "2025",
    role: "Software Automation Engineer",
    org: "Technology Transition Paradigm",
    kind: "work",
    state: "Current",
    body: "Turns manual email-security checks into a repeatable screening and outreach pipeline.",
    contributions: [
      "Automated SPF, DKIM and DMARC lookups with structured JSON/CSV reporting",
      "Validated scanner output against external verification tools",
    ],
    links: [
      { label: "DNS scanner", href: "/projects/dns-security-scanner" },
      { label: "Outreach automation", href: "/projects/ttp-outreach-automation" },
    ],
  },
  {
    id: "alt4u",
    when: "Current · early stage",
    year: "2026",
    role: "Co-Founder & Chief AI Officer",
    org: "A Little Tech For You",
    kind: "leadership",
    state: "Current",
    body: "Technology learning for older adults: an AI-narrated lesson pipeline, plain-language assistance and the model/inference stack.",
    links: [{ label: "Project page", href: "/projects/a-little-tech-for-you" }],
  },
  {
    id: "starkhacks",
    when: "2026",
    year: "2026",
    role: "Winner, Qualcomm Robotics Track",
    org: "StarkHacks 2026 · OBSERV-E (team)",
    kind: "award",
    state: "Awarded",
    body: "Human-following perception and spoken guidance for visually impaired users, built as a team.",
    links: [
      { label: "Case study", href: "/projects/observ-e" },
      { label: "Write-up", href: "/posts/starkhacks-2026-observ-e-win" },
    ],
  },
  {
    id: "eloria",
    when: "May 2026 – Present",
    year: "2026",
    role: "Machine Learning Engineer",
    org: "Grupo Eloria",
    kind: "work",
    state: "Current",
    body: "Applied ML connected to product systems, evaluation and data workflows.",
    links: [{ label: "Resume", href: "/resume" }],
  },
  {
    id: "mliit",
    when: "2026 – Present",
    year: "2026",
    role: "President",
    org: "Machine Learning @ Illinois Tech",
    kind: "leadership",
    state: "Current",
    body: "Leads the student ML community: technical workshops, build sessions and public demos such as ConfusionClassifier at the club fair.",
    links: [{ label: "ConfusionClassifier", href: "/projects/confusion-classifier" }],
  },
  {
    id: "luna",
    when: "In progress · competition prep",
    year: "2026",
    role: "Autonomous Systems Lead",
    org: "NASA Lunabotics team",
    kind: "leadership",
    state: "In progress",
    body: "Leads autonomy software (perception, localization, mapping and planning) for the team's lunar robotics entry. Preparation is ongoing; no results are claimed.",
  },
];

export const heroSignals: { label: string; detail: string; href: string; tone: "red" | "blue" }[] =
  [
    {
      label: "StarkHacks 2026 winner",
      detail: "Qualcomm Robotics Track · OBSERV-E (team)",
      href: "/projects/observ-e",
      tone: "red",
    },
    {
      label: "EcoCAR Sensor Fusion Lead",
      detail: "Camera · radar · LiDAR · RTMaps",
      href: "/projects/ecocar-sensor-fusion",
      tone: "red",
    },
    {
      label: "5 model families in-browser",
      detail: "TalonCV · no inference server",
      href: "/projects/taloncv",
      tone: "blue",
    },
    {
      label: "LLM compression research",
      detail: "Morph · depth pruning + distillation",
      href: "/projects/morph",
      tone: "blue",
    },
  ];
