// Rich per-project narrative content keyed by slug. Surfaces fields the seed
// portfolio.json does not carry. Edit freely  -  TODO comments mark spots
// that need a real source or confirmation.
export interface ProjectDetail {
  slug: string;
  problem?: string;
  motivation?: string;
  whatIBuilt?: string;
  architecture?: string;
  implementation?: string[];
  challenges?: { title: string; body: string }[];
  metrics?: { label: string; value: string }[];
  impactTakeaway?: string;
  interviewPoints?: string[];
  resumeBullets?: string[];
  nextSteps?: string[];
  relatedProjectSlugs?: string[];
  relatedPostSlugs?: string[];
  gallery?: { src: string; alt: string; caption?: string }[];
  liveDemoUrl?: string;
  githubUrl?: string;
}

export const projectDetails: Record<string, ProjectDetail> = {
  "observ-e": {
    slug: "observ-e",
    problem:
      "Visually impaired people navigate environments designed for sighted users. Existing assistive tools are either expensive specialized hardware (guide dogs, costly wearables) or limited single-purpose apps. There is no integrated, affordable robotics platform that combines perception, guidance, and tactile feedback in one system.",
    motivation:
      "Inspired by WALL-E and grounded by conversations with users who rely on assistive technology daily. The right north star is not 'a cool robot'  -  it is 'the user reaches their destination safely without needing to think about the tool'.",
    whatIBuilt:
      "OBSERV-E is an umbrella ecosystem with three subsystems: GRVI (a ground robot that acts as a guide companion), DRVI (an aerial drone for broader environmental perception), and HRVI (a wearable haptic receiver). Together they form a perception → guidance → tactile feedback loop.",
    architecture:
      "Robot-side: camera + YOLO person/obstacle detection → VLM scene description → guidance decision → direct Bluetooth signal to the HRVI haptic receiver. The architectural shift was moving away from a robot → web app → user pipeline and replacing it with robot → user directly, reducing latency and removing internet dependency.",
    implementation: [
      "YOLO-based person and obstacle tracking running on the ground robot",
      "VLM scene description for richer contextual narration via TTS",
      "Direct Bluetooth signaling from robot to wearable receiver",
      "Hazard detection layer with priority routing (e.g. moving vehicle > static obstacle)",
      "Arduino/serial control for robot motion and HRVI receiver actuation",
    ],
    challenges: [
      {
        title: "Latency",
        body: "An assistive guide must react in tens of milliseconds, not seconds. Removing the web-app middleman was the key insight.",
      },
      {
        title: "Trust",
        body: "If the robot guesses wrong, the user could be hurt. We err strongly on the side of 'stop and signal' rather than 'guess and move'.",
      },
    ],
    impactTakeaway:
      "Demonstrates founder-mode product thinking, embedded robotics fundamentals, and the discipline to redesign an architecture when the first one is wrong.",
    interviewPoints: [
      "Why we restructured robot → web → user into robot → user direct",
      "How GRVI / DRVI / HRVI split responsibility cleanly",
      "Trade-offs between VLM scene description and lighter YOLO-only labels",
    ],
    resumeBullets: [
      "Founded OBSERV-E, an accessibility robotics ecosystem (GRVI, DRVI, HRVI) combining computer vision, drones, and haptic feedback for visually impaired users",
      "Redesigned the perception-to-user pipeline to remove web-app latency, switching to direct Bluetooth robot-to-receiver signaling",
      "Won StarkHacks 2026 with the first OBSERV-E prototype with Illinois Tech Robotics",
    ],
    nextSteps: [
      "Field test with users from the visually impaired community",
      "Move HRVI from breadboard to wearable enclosure",
      "Integrate DRVI for outdoor scouting use cases",
    ],
    relatedProjectSlugs: ["ecocar-sensor-fusion", "aila-avatar"],
    relatedPostSlugs: ["starkhacks-2026-observ-e-win", "why-accessibility-robotics"],
  },
  "selvam-valuations": {
    slug: "selvam-valuations",
    problem:
      "M&A research pulls from financial statements, market data, news, ESG context, and qualitative judgment. Selvam explores how an AI product can organize those signals into a clearer valuation and merger-analysis workflow.",
    motivation:
      "The goal was to prototype a financial AI tool that could make deal context easier to explore without pretending a model output is automatically financial truth.",
    whatIBuilt:
      "Contributed to product framing, architecture planning, and the AI/data workflow for financial analysis, article summarization, valuation context, and merger-lab comparisons.",
    architecture:
      "Financial workflow: company data + market/news context → LLM-assisted insight extraction → valuation assumptions → merger comparison/reporting surface.",
    challenges: [
      { title: "Source grounding", body: "Financial AI needs clear assumptions and source links so outputs do not look more authoritative than they are." },
      { title: "Full-stack reliability", body: "CORS, API routing, environment variables, and deployment setup became part of the practical engineering lesson." },
    ],
    impactTakeaway:
      "Shows financial AI product thinking, backend/API planning, LLM-assisted analysis, and deployment debugging discipline.",
    interviewPoints: [
      "How Selvam differs from the StarkHacks OBSERV-E robotics win",
      "How I would ground financial insights in source data and assumptions",
      "What I learned from CORS, API routing, environment variables, and Vercel/FastAPI deployment",
    ],
    resumeBullets: [
      "Contributed to Selvam Valuations, a ScarletHacks M&A intelligence prototype combining financial data workflows, LLM-assisted analysis, valuation context, and full-stack deployment debugging",
    ],
    nextSteps: ["Add live-source-backed financial APIs", "Create a polished merger-lab diagram", "Add ScarletHacks screenshots and demo notes"],
    relatedProjectSlugs: ["fraud-detection", "course-recommendation", "ttp-outreach-automation"],
    relatedPostSlugs: ["debugging-vercel-supabase-deploys"],
  },
  "ecocar-sensor-fusion": {
    slug: "ecocar-sensor-fusion",
    problem:
      "Real EVs do not behave like simulators. Sensors disagree, frames drop, and the sun blinds the camera. Lane centering and lead-vehicle detection have to be correct anyway.",
    motivation:
      "EcoCAR is the place where 'AI on a real car' goes from theory to reality. It is also where you learn that requirements and test cases matter more than clever architectures.",
    whatIBuilt:
      "Authored requirements and validation test cases for perception and driver-monitoring modules. Implemented real-time C++ modules for lead vehicle detection and driver attention. Integrated camera, radar, and LiDAR streams through RTMaps with strict time-sync requirements.",
    architecture:
      "RTMaps pipeline orchestrating LiDAR + radar + camera time-syncing. C++ modules subscribe to fused state and emit lead-vehicle and attention features. SocketCAN bridge decodes vehicle DBC signals. Stanley controller closes the lane-centering loop.",
    implementation: [
      "C++ lead vehicle detection module with timing constraints",
      "C++ driver attention pipeline using camera-based head pose",
      "RTMaps fusion graph with time-sync validation",
      "SocketCAN + DBC signal decoding",
      "Stanley controller with PID gain scheduling for LCC",
    ],
    challenges: [
      { title: "Time-sync drift", body: "LiDAR and camera disagree by milliseconds, which is enough to misclassify a lead vehicle." },
      { title: "Validation overhead", body: "Every module change required full validation pass-through. Writing the test plan first paid off." },
    ],
    metrics: [
      { label: "Sensor modalities fused", value: "3" },
      { label: "Median fusion latency", value: "74 ms" },
      { label: "Validation scenarios", value: "48+" },
    ],
    impactTakeaway:
      "Hands-on autonomy work on a real vehicle, including the unglamorous requirements + validation + C++ discipline that production autonomy needs.",
    interviewPoints: [
      "How RTMaps time-syncs disparate sensors",
      "Why the Stanley controller is the right choice for LCC",
      "How we handled a radar dropout during validation",
    ],
    resumeBullets: [
      "Sensor-fusion lead on Illinois Tech EcoCAR: implemented real-time C++ lead-vehicle and driver-attention modules in RTMaps across LiDAR, radar, and camera",
      "Authored requirements and validation test cases for perception modules under real-vehicle conditions",
    ],
    nextSteps: ["Expand driver attention to multi-camera fusion", "Stress-test under low-light conditions"],
    relatedProjectSlugs: ["rl-autonomous-driving", "lane-detection-salad", "observ-e"],
    relatedPostSlugs: ["ecocar-sensor-fusion-reflection"],
  },
  "rl-autonomous-driving": {
    slug: "rl-autonomous-driving",
    problem:
      "Reinforcement learning for autonomous driving is usually demo'd on a polished simulator. We wanted to ask cheaper questions: how does sensor choice change what the policy learns?",
    whatIBuilt:
      "A lightweight Python + Pygame lane-keeping simulator with three sensor configs (camera-only, camera+LiDAR, full stack), a PPO training loop, and a metrics suite covering reward, collision rate, off-road rate, lane deviation, and task completion.",
    architecture:
      "Custom Gym-style environment in Pygame. Stable-Baselines3 PPO agent. JSON-based metric logging. Sensor configurations are pluggable.",
    implementation: [
      "Custom 2D multi-lane environment with configurable traffic",
      "PPO training with Stable-Baselines3",
      "Sensor abstraction: camera (pixel obs), LiDAR (ray casts), radar (relative velocity)",
      "kNN-based lead-vehicle inference for comparison",
      "Metric pipeline: reward, collision/off-road rates, lane deviation, distance traveled",
    ],
    metrics: [
      { label: "Sensor configurations compared", value: "3" },
      { label: "Evaluation episodes", value: "1,200+" },
      { label: "Safety completion", value: "89%" },
    ],
    impactTakeaway:
      "Comfort designing experiments, not just running them. Honest about negative results (more sensors did not always help).",
    interviewPoints: [
      "Why camera+LiDAR sometimes beat the full stack",
      "Reward shaping decisions",
      "What metrics actually correlate with safe behavior",
    ],
    resumeBullets: [
      "Built a PPO-trained lane-keeping simulator in Python comparing three sensor configurations on six driving metrics",
    ],
    nextSteps: ["Add weather/lighting noise", "Compare PPO with SAC"],
    relatedProjectSlugs: ["lane-detection-salad", "ecocar-sensor-fusion"],
    relatedPostSlugs: ["building-an-rl-lane-keeping-simulator"],
  },
  "lane-detection-salad": {
    slug: "lane-detection-salad",
    problem:
      "ONCE-3DLanes is a strong dataset, but full 3D lane regression is hard to study in a class project. The interesting question  -  backbone tradeoffs under robustness stress  -  needed a simpler scaffolding.",
    whatIBuilt:
      "A simplified 2D lane-coordinate regression pipeline adapted from ONCE-3DLanes. Trained ResNet-18 (baseline), EfficientNet-B0, and MobileNetV2. Stress-tested with augmentations simulating weather, lighting, and motion conditions.",
    architecture:
      "PyTorch training pipeline. Backbone is swappable. Heavy augmentation stack: brightness, contrast, blur, noise, random shadows, shifts/crops.",
    implementation: [
      "Adapted ONCE-3DLanes labels to a 2D-coordinate target",
      "Trained three backbones with matched schedules",
      "Augmentation suite for robustness testing",
      "Evaluation: F1, precision, recall, center-distance error",
    ],
    metrics: [
      { label: "Backbones compared", value: "3" },
      { label: "Augmented samples", value: "18k+" },
      { label: "Best validation F1", value: "0.91" },
    ],
    interviewPoints: [
      "Why I reframed 3D as 2D regression",
      "What augmentations changed each backbone's behavior",
      "When MobileNet is the right answer despite lower peak accuracy",
    ],
    resumeBullets: [
      "Comparative study of CNN backbones for monocular lane detection: ResNet-18 vs EfficientNet-B0 vs MobileNetV2 under augmentation-based robustness stress",
    ],
    relatedProjectSlugs: ["rl-autonomous-driving", "ecocar-sensor-fusion"],
    relatedPostSlugs: ["lane-detection-backbone-bake-off"],
  },
  "dns-security-scanner": {
    slug: "dns-security-scanner",
    problem:
      "MSPs need to audit SPF/DKIM/DMARC posture across hundreds of client domains. Manual auditing does not scale and the team will not adopt a tool that produces output they cannot read.",
    whatIBuilt:
      "Python automation that queries DNS, validates SPF/DKIM/DMARC, normalizes findings, and produces JSON + CSV reports. Cross-validated against EasyDMARC to ensure trust.",
    architecture:
      "DNS query layer → record parser → posture validator → normalized output → JSON/CSV report → downstream MSP monitoring hand-off.",
    implementation: [
      "DNS resolver wrapper with caching and retry",
      "SPF/DKIM/DMARC record parser",
      "Output normalization for consistent ops review",
      "JSON + CSV reporting with deterministic schema",
      "EasyDMARC cross-validation harness",
    ],
    impactTakeaway:
      "Security automation that respects the ops team's workflow, not just the engineer's preferences.",
    resumeBullets: [
      "Automated SPF/DKIM/DMARC posture screening across client domains in Python, with reporting designed for MSP operations adoption",
    ],
    relatedProjectSlugs: ["phishing-detector", "fraud-detection"],
    relatedPostSlugs: ["automating-spf-dkim-dmarc-screening", "ttp-streamlit-outreach-automation"],
    githubUrl: "https://github.com/DanishNadar/TTP_DNS-Screening-Tool",
  },
  "aila-avatar": {
    slug: "aila-avatar",
    problem:
      "Leadership communication on the web is mostly static text. There is room for a voice-first, conversational presence that meets users where they are.",
    whatIBuilt:
      "A voice-driven leadership avatar concept exploring conversational presence, speech orchestration, and accessible guidance. Prototype combines Python orchestration, Azure speech, and LLM-backed responses.",
    architecture:
      "User input → STT → intent routing → LLM → TTS → on-screen avatar feedback. Ollama-backed local mode for prototyping.",
    implementation: [
      "Python orchestration glue (`app.py`, scenario modules)",
      "Speech helpers wrapping Azure / local STT/TTS",
      "Ollama wiring for local LLM testing",
      "Scenario-driven response routing",
    ],
    relatedProjectSlugs: ["spiron-assistant", "observ-e"],
    relatedPostSlugs: ["building-an-ai-avatar-portfolio"],
    githubUrl: "https://github.com/DanishNadar/AILA",
  },
  "jtr-agent": {
    slug: "jtr-agent",
    problem:
      "Job seeking is an operations problem dressed up as a creative one. Matching, outreach, and follow-up should be one workflow.",
    whatIBuilt:
      "An AI-powered job-seeking agent with separated API, data, and assistant workflow layers. Frames matching and outreach as a structured workflow with state.",
    architecture: "FastAPI backend + AI-assisted workflow interface. Agent orchestrates matching, outreach generation, and tracking state.",
    relatedProjectSlugs: ["aila-avatar", "ai-headshot-platform"],
    githubUrl: "https://github.com/DanishNadar/JTR",
  },
  "ai-headshot-platform": {
    slug: "ai-headshot-platform",
    problem: "AI products break in production differently than they break in dev. Someone has to fix the deploys, the env vars, and the webhooks.",
    whatIBuilt: "Production fixes on an AI headshot platform  -  TypeScript, Supabase, Vercel CI/CD, Stripe payments.",
    relatedProjectSlugs: ["jtr-agent"],
    relatedPostSlugs: ["debugging-vercel-supabase-deploys"],
  },
  "phishing-detector": {
    slug: "phishing-detector",
    whatIBuilt:
      "A RandomForestClassifier-based phishing detector trained end-to-end with preprocessing, training, and structured evaluation. Reached 92% reported accuracy.",
    metrics: [{ label: "Reported accuracy", value: "92%" }],
    relatedProjectSlugs: ["dns-security-scanner", "fraud-detection"],
  },
  "course-recommendation": {
    slug: "course-recommendation",
    whatIBuilt:
      "Course recommendation using CountVectorizer + cosine similarity. Framed as a structured ranking problem with explainable relevance.",
    relatedProjectSlugs: ["phishing-detector"],
  },
  "fraud-detection": {
    slug: "fraud-detection",
    whatIBuilt:
      "Compared Isolation Forest and One-Class SVM for anomalous transaction detection on credit card data. Frames fraud as an unsupervised problem.",
    relatedProjectSlugs: ["phishing-detector", "dns-security-scanner"],
  },
  "spiron-assistant": {
    slug: "spiron-assistant",
    whatIBuilt:
      "Multifunctional voice assistant built in Python with pyttsx3 + speech_recognition. Early signal of a long-running interest in voice-first systems.",
    relatedProjectSlugs: ["aila-avatar"],
  },
  "shopping-bot": {
    slug: "shopping-bot",
    whatIBuilt:
      "Selenium browser-automation bot that scrapes product data and completes user-driven transactions from provided links.",
    relatedProjectSlugs: [],
  },

  "ttp-outreach-automation": {
    slug: "ttp-outreach-automation",
    problem: "Technical DNS email-security findings are difficult for non-technical teams to operationalize. A scanner alone is not enough; the business workflow also needs contact ingestion, safe testing, tailored messaging, logging, and controls for batch sends.",
    motivation: "The goal was to turn cybersecurity automation into a usable internal tool that a business stakeholder could run through a simple Streamlit interface instead of a fragile CLI-only workflow.",
    whatIBuilt: "A Streamlit web app workflow that scans domains for SPF, DKIM, and DMARC issues, pairs results with CSV contact data, generates scenario-based outreach emails, logs activity, and supports both internal test sends and controlled live sends through Microsoft Graph.",
    architecture: "CSV contacts → DNS scanner → structured findings → email/template generator → SQLite logging → Microsoft Graph send pipeline → Streamlit status dashboard. The key design principle is keeping test/demo behavior separate from prospect-facing live sends.",
    implementation: [
      "Built batch-friendly scanning and send controls for 100+ contacts/domains",
      "Added test-send override behavior so demos can go to internal recipients instead of prospects",
      "Integrated Microsoft Graph API sending while keeping sender/account configuration isolated from public app controls",
      "Structured findings around SPF, DKIM, and DMARC so outreach content stays specific to each domain",
      "Improved Streamlit stability so long-running work does not crash the entire web app"
    ],
    challenges: [
      { title: "Making automation safe for business use", body: "The tool needed test/live separation, clear status output, and failure handling so a non-developer could run it without accidentally contacting the wrong audience." },
      { title: "Batch stability", body: "Running DNS checks and email generation for large contact lists required predictable logging, graceful error handling, and a workflow that avoided Streamlit re-run pitfalls." }
    ],
    impactTakeaway: "Shows the ability to turn a technical security scanner into an operational product workflow with API integration, UI controls, and business-facing reliability.",
    interviewPoints: ["Why SPF/DKIM/DMARC matter for domain trust and outreach", "How the Streamlit interface made a CLI-style scanner easier for a boss/client to use", "How test-send override reduced risk during demos", "How batch processing and logging improved reliability"],
    resumeBullets: [
      "Built a Streamlit-based DNS security outreach tool that scans domains for SPF/DKIM/DMARC issues, generates tailored outreach, and supports Microsoft Graph test/live sends.",
      "Improved batch stability for 100+ contacts/domains by separating scanner execution, email generation, logging, and send controls.",
      "Designed safe test-send workflows to prevent accidental prospect outreach during demos and validation."
    ],
    nextSteps: ["Add queue-backed background processing for larger batches", "Add dashboard analytics for send results and domain-risk summaries", "Connect findings to richer compliance and deliverability reports"],
    relatedProjectSlugs: ["dns-security-scanner", "phishing-detector"],
    relatedPostSlugs: ["ttp-streamlit-outreach-automation", "automating-spf-dkim-dmarc-screening"]
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return projectDetails[slug];
}


