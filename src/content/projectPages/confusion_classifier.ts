import type { ProjectPageContent } from "./types";

export const project: ProjectPageContent = {
  slug: "confusion-classifier",
  title: "ConfusionClassifier",
  subtitle:
    "A club-fair game that turns model uncertainty into the goal: drive a text classifier to a uniform prediction.",
  heroStatement:
    "Players write text and try to make a GoEmotions-based classifier as unsure as possible: 25% for each of four classes. Each prediction is explained with TF-IDF × coefficient contributions.",
  pageTheme: {
    eyebrow: "Probabilistic Machine Learning",
    gradient: "from-sky-500/25 via-slate-900/30 to-sky-300/15",
    icon: "CaseStudy",
  },
  quickFacts: [
    { label: "Role", value: "Model, API and game design" },
    { label: "Status", value: "Live demo · open source" },
    { label: "Data", value: "Official GoEmotions splits mapped to 4 classes" },
    { label: "Used at", value: "Illinois Tech club fair (ML @ Illinois Tech)" },
  ],
  problem:
    "Most people only ever see a model's top answer. The uncertainty underneath, and what drives it, is invisible, which makes calibration hard to teach.",
  motivation:
    "Make uncertainty the thing people interact with, so a club-fair visitor learns what moves a classifier's probabilities within a minute of playing.",
  myRole: [
    "Mapped GoEmotions labels to four classes using the official splits.",
    "Selected the model on the dev set by macro-F1 − 0.05 × log loss and evaluated once on the untouched test split.",
    "Built the FastAPI service and the React/TypeScript game.",
    "Implemented per-token explanations from TF-IDF features and model coefficients.",
  ],
  whatIBuilt: [
    "A text-classification pipeline with dev-only model selection and a single held-out test evaluation.",
    "An API returning calibrated class probabilities and per-token contributions.",
    "A game front end where the win condition is a uniform 25/25/25/25 prediction.",
  ],
  architecture: [
    {
      title: "Model",
      body: "TF-IDF features with a linear classifier chosen by a calibration-aware dev score.",
    },
    { title: "Service", body: "FastAPI returns probabilities and explanation weights." },
    { title: "Game", body: "React/TypeScript UI with Supabase for game state." },
  ],
  stackMap: [
    {
      name: "scikit-learn",
      category: "Machine learning",
      usedFor: "TF-IDF features and the linear classifier.",
    },
    { name: "FastAPI", category: "Backend", usedFor: "Prediction and explanation API." },
    { name: "React", category: "Front end", usedFor: "The game interface." },
    { name: "TypeScript", category: "Language", usedFor: "Front-end application code." },
    { name: "Supabase", category: "Backend", usedFor: "Game state." },
  ],
  implementationDetails: [
    {
      title: "Selection rule",
      body: "macro-F1 − 0.05 × log loss rewards models that are accurate and well calibrated.",
    },
    {
      title: "Untouched test set",
      body: "The test split is evaluated once, after selection, to avoid leakage.",
    },
    {
      title: "Explanations",
      body: "TF-IDF value × class coefficient shows which words pushed each probability.",
    },
  ],
  challengeSolutions: [
    {
      title: "Making uncertainty playable",
      body: "Inverting the objective (aim for confusion) makes probabilities the focus.",
    },
    {
      title: "Trustworthy numbers",
      body: "Calibration is part of model selection, so the probabilities mean something.",
    },
  ],
  outcomes: [
    { title: "Live at the club fair", body: "Used as a public demo for ML @ Illinois Tech." },
    { title: "Open and reproducible", body: "Model metrics are committed with the repository." },
  ],
  metrics: [
    { label: "Classes", value: "4", note: "GoEmotions labels mapped from the official splits." },
  ],
  gallery: [],
  relatedProjectSlugs: ["taloncv", "morph", "aila-avatar"],
  relatedPostSlugs: [],
  impactTakeaway:
    "ConfusionClassifier shows careful evaluation practice (dev-only selection, calibration, an untouched test split) packaged as something people actually want to play.",
  interviewTalkingPoints: [
    "Why calibration belongs in the model-selection objective.",
    "How a game design choice can teach a statistical concept.",
  ],
  resumeBullets: [
    "Built a live ML game around classifier uncertainty: GoEmotions mapped to 4 classes, model chosen by dev macro-F1 − 0.05 × log loss, single held-out test evaluation.",
  ],
  futureWork: ["Add a reliability diagram to the game's results view."],
  links: [
    { label: "Live demo", href: "https://confusion-classifier-chi.vercel.app", type: "demo" },
  ],
};
