import type { ProjectPageContent } from "./types";

export const project: ProjectPageContent = {
  slug: "taloncv",
  title: "TalonCV",
  subtitle:
    "Private, explainable interview coaching with speech, language and vision models running entirely in the browser.",
  heroStatement:
    "TalonCV analyses a recorded practice interview without uploading it. Browser workers run Whisper, MiniLM, YOLO11-face and MediaPipe, align their evidence in time, and produce a deterministic, explainable coaching report.",
  pageTheme: {
    eyebrow: "Multimodal AI",
    gradient: "from-sky-500/25 via-slate-900/30 to-rose-900/20",
    icon: "CaseStudy",
  },
  quickFacts: [
    { label: "Role", value: "Sole engineer: design, models, front end, tests" },
    { label: "Status", value: "Live demo · open source · CI" },
    { label: "Inference", value: "In-browser Web Workers, no backend" },
    { label: "Storage", value: "IndexedDB on the user's device" },
  ],
  problem:
    "Interview-practice tools usually upload a candidate's video to a server for analysis. Those recordings are sensitive, and a coaching score is only useful if the candidate can see why it was given.",
  motivation:
    "Build the whole pipeline, from recording to report, so that it runs on the candidate's own device: no inference API, no upload, and every observation traceable to a moment in the recording.",
  myRole: [
    "Designed the end-to-end architecture: capture, worker protocol, alignment, scoring and report.",
    "Selected and integrated quantized model variants (q4/q8) for speech, semantics and vision.",
    "Built a Python research twin that trains a random-forest cue classifier and exports it to browser JSON.",
    "Set up CI with typecheck, lint, Vitest and Playwright, plus parity tests between Python and browser models.",
  ],
  whatIBuilt: [
    "An analysis worker running Whisper speech recognition, audio DSP features and MiniLM sentence embeddings.",
    "A vision worker running YOLO11-face through ONNX Runtime Web and MediaPipe landmarks, plus cue rules and the random-forest classifier.",
    "A time-window alignment step that fuses audio, vision and transcript evidence.",
    "Deterministic scoring and an eight-tab explainable report; an optional SmolLM2 worker only rewords coaching text.",
    "A static Next.js export with sessions stored in IndexedDB, so the deployment has no server component.",
  ],
  architecture: [
    {
      title: "Capture and storage",
      body: "The session is recorded and stored locally in IndexedDB; nothing is uploaded.",
    },
    {
      title: "Parallel workers",
      body: "Speech/semantics and vision run in two Web Workers with a cancellable protocol.",
    },
    {
      title: "Alignment and scoring",
      body: "Overlapping time windows join the modalities; fixed rules turn evidence into scores.",
    },
  ],
  stackMap: [
    {
      name: "TypeScript",
      category: "Language",
      usedFor: "Application, workers and inference orchestration.",
    },
    { name: "Next.js", category: "Framework", usedFor: "Static export with no server runtime." },
    {
      name: "Transformers.js",
      category: "Inference",
      usedFor: "Whisper and MiniLM in the browser.",
    },
    { name: "ONNX Runtime Web", category: "Inference", usedFor: "YOLO11-face detection." },
    {
      name: "MediaPipe",
      category: "Computer vision",
      usedFor: "Facial landmarks for gaze and posture cues.",
    },
    {
      name: "scikit-learn",
      category: "Machine learning",
      usedFor: "Random-forest cue classifier in the research twin.",
    },
    {
      name: "Python",
      category: "Language",
      usedFor: "Research twin, model export and CPU benchmarking script.",
    },
    { name: "Playwright", category: "Testing", usedFor: "End-to-end tests in CI." },
    { name: "Vitest", category: "Testing", usedFor: "Unit tests in CI." },
  ],
  implementationDetails: [
    {
      title: "Quantized models",
      body: "q4/q8 model variants keep downloads and memory within browser limits.",
    },
    {
      title: "Cancellable workers",
      body: "A message protocol lets a long analysis be cancelled cleanly mid-run.",
    },
    {
      title: "Parity tests",
      body: "The Python-trained classifier is exported to JSON and tested for parity in the browser.",
    },
  ],
  challengeSolutions: [
    {
      title: "Privacy without a server",
      body: "All inference runs client-side, so privacy is a property of the architecture rather than a policy.",
    },
    {
      title: "Explainability",
      body: "Deterministic scoring over aligned evidence means each observation points back to the recording.",
    },
  ],
  outcomes: [
    {
      title: "Live and testable",
      body: "A public demo and an open repository with CI on every change.",
    },
    {
      title: "Five model families on-device",
      body: "Whisper, MiniLM, YOLO11-face, MediaPipe and an optional SmolLM2 run in the browser.",
    },
  ],
  metrics: [
    {
      label: "Model families in-browser",
      value: "5",
      note: "Whisper, MiniLM, YOLO11-face (ONNX), MediaPipe, SmolLM2 (optional).",
    },
    {
      label: "Inference servers",
      value: "0",
      note: "Static export; recordings stay in IndexedDB.",
    },
    { label: "Report tabs", value: "8", note: "Each observation links to its evidence." },
  ],
  gallery: [],
  relatedProjectSlugs: ["aila-avatar", "morph", "confusion-classifier"],
  relatedPostSlugs: [],
  impactTakeaway:
    "TalonCV shows multimodal inference engineered under real constraints of privacy, memory and latency, with the testing discipline to keep a browser ML stack reliable.",
  interviewTalkingPoints: [
    "Why browser-local inference changes the privacy story more than any policy could.",
    "How time-window alignment makes multimodal evidence explainable.",
    "Keeping a Python-trained model and its browser export in parity.",
  ],
  resumeBullets: [
    "Built a browser-local multimodal interview coach running Whisper, MiniLM, YOLO11-face (ONNX Runtime Web) and MediaPipe in Web Workers, with no inference server.",
    "Designed time-window alignment and deterministic scoring for an explainable eight-tab report; CI with Vitest, Playwright and model-parity tests.",
  ],
  futureWork: [
    "Publish per-stage latency for a 60-second clip on CPU and WebGPU using the existing benchmarking script.",
    "Report total model download size per profile.",
  ],
  links: [
    { label: "Live demo", href: "https://talon-cv-rosy.vercel.app", type: "demo" },
    {
      label: "Deployment notes",
      href: "https://github.com/DanishNadar/TalonCV/blob/main/DEPLOYMENT.md",
      type: "github",
    },
  ],
};
