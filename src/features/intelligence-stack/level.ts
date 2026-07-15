import type {
  CubeCategory,
  SkillCubeNode,
  SkillStory,
  StackMapLayout,
  StackMission,
} from "./types";

export const LEVEL_NODES: readonly SkillCubeNode[] = [
  {
    id: "python",
    label: "Python",
    category: "Foundation",
    description: "The launch point for building, testing, and connecting intelligent systems.",
    position: [0, 3.15, -3.8],
    prerequisiteIds: [],
    neighbors: { left: "data-preparation", right: "software-engineering" },
  },
  {
    id: "data-preparation",
    label: "Data Preparation",
    category: "Foundation",
    description: "Turning imperfect signals into dependable training and decision inputs.",
    position: [-1.2, 2.5, -2.1],
    prerequisiteIds: ["python"],
    neighbors: { right: "linear-algebra", back: "python", forward: "machine-learning" },
  },
  {
    id: "software-engineering",
    label: "Software Engineering",
    category: "Foundation",
    description: "Building systems that can be tested, deployed, and trusted over time.",
    position: [1.2, 2.5, -2.1],
    prerequisiteIds: ["python"],
    neighbors: { left: "python", right: "algorithms", forward: "ai-infrastructure" },
  },
  {
    id: "linear-algebra",
    label: "Linear Algebra",
    category: "Foundation",
    description: "The language of transformations, embeddings, optimization, and state.",
    position: [-4, 1.85, -0.45],
    prerequisiteIds: ["data-preparation"],
    neighbors: {
      left: "data-preparation",
      right: "probability",
      back: "python",
      forward: "computer-vision-foundations",
    },
  },
  {
    id: "probability",
    label: "Probability",
    category: "Foundation",
    description: "Reasoning clearly when sensors, models, and environments are uncertain.",
    position: [-2, 1.85, -0.45],
    prerequisiteIds: ["linear-algebra"],
    neighbors: {
      left: "linear-algebra",
      right: "algorithms",
      forward: "perception",
    },
  },
  {
    id: "algorithms",
    label: "Algorithms",
    category: "Foundation",
    description: "Efficient building blocks for search, planning, and real-time decisions.",
    position: [0, 1.85, -0.45],
    prerequisiteIds: ["probability"],
    neighbors: {
      left: "probability",
      right: "embedded-systems",
      back: "software-engineering",
      forward: "localization",
    },
  },
  {
    id: "embedded-systems",
    label: "Embedded Systems",
    category: "Foundation",
    description: "Connecting software decisions to sensors, actuators, and physical hardware.",
    position: [2, 1.85, -0.45],
    prerequisiteIds: ["algorithms"],
    neighbors: {
      left: "algorithms",
      right: "model-evaluation",
      back: "software-engineering",
      forward: "robotics-foundations",
    },
  },
  {
    id: "model-evaluation",
    label: "Model Evaluation",
    category: "Foundation",
    description: "Measuring robustness, latency, and failure modes before relying on a model.",
    position: [4, 1.85, -0.45],
    prerequisiteIds: ["embedded-systems"],
    neighbors: { left: "embedded-systems", forward: "ai-infrastructure" },
  },
  {
    id: "machine-learning",
    label: "Machine Learning",
    category: "Machine Learning",
    description: "Learning useful patterns from prepared data while keeping evaluation in view.",
    position: [-4.25, 1.15, 1.1],
    prerequisiteIds: ["data-preparation", "linear-algebra", "python"],
    neighbors: {
      right: "computer-vision-foundations",
      back: "data-preparation",
      forward: "object-detection",
    },
    projectSlug: "course-recommendation",
    major: true,
  },
  {
    id: "computer-vision-foundations",
    label: "Vision Foundations",
    category: "Computer Vision",
    description: "Extracting geometry, context, and reliable features from visual input.",
    position: [-2.55, 1.15, 1.1],
    prerequisiteIds: ["linear-algebra", "python"],
    neighbors: {
      left: "machine-learning",
      right: "perception",
      back: "linear-algebra",
      forward: "object-detection",
    },
    projectSlug: "lane-detection-salad",
  },
  {
    id: "perception",
    label: "Perception",
    category: "Computer Vision",
    description: "Turning camera and sensor streams into an interpretable view of the world.",
    position: [-0.85, 1.15, 1.1],
    prerequisiteIds: ["probability", "computer-vision-foundations"],
    neighbors: {
      left: "computer-vision-foundations",
      right: "localization",
      back: "probability",
      forward: "sensor-fusion",
    },
    projectSlug: "observ-e",
  },
  {
    id: "localization",
    label: "Localization",
    category: "Autonomous Systems",
    description:
      "Estimating where an intelligent machine is before asking it to move with purpose.",
    position: [0.85, 1.15, 1.1],
    prerequisiteIds: ["algorithms", "probability"],
    neighbors: {
      left: "perception",
      right: "robotics-foundations",
      back: "algorithms",
      forward: "path-planning",
    },
    projectSlug: "rl-autonomous-driving",
  },
  {
    id: "robotics-foundations",
    label: "Robotics Foundations",
    category: "Robotics",
    description: "Embodied systems require feedback, timing, mechanics, and resilient interfaces.",
    position: [2.55, 1.15, 1.1],
    prerequisiteIds: ["algorithms", "embedded-systems"],
    neighbors: {
      left: "localization",
      right: "ai-infrastructure",
      back: "embedded-systems",
      forward: "control-systems",
    },
    projectSlug: "observ-e",
  },
  {
    id: "ai-infrastructure",
    label: "AI Infrastructure",
    category: "AI Infrastructure",
    description:
      "The delivery layer for dependable models, services, evaluation, and useful tools.",
    position: [4.25, 1.15, 1.1],
    prerequisiteIds: ["software-engineering", "model-evaluation"],
    neighbors: {
      left: "robotics-foundations",
      back: "model-evaluation",
      forward: "intelligent-agents",
    },
    projectSlug: "a-little-tech-for-you",
    major: true,
  },
  {
    id: "object-detection",
    label: "Object Detection",
    category: "Computer Vision",
    description: "Recognizing meaningful objects and obstacles in a changing visual scene.",
    position: [-5, 0.48, 2.65],
    prerequisiteIds: ["computer-vision-foundations", "model-evaluation"],
    neighbors: {
      right: "sensor-fusion",
      back: "computer-vision-foundations",
      forward: "intelligent-agents",
    },
    projectSlug: "lane-detection-salad",
    major: true,
  },
  {
    id: "sensor-fusion",
    label: "Sensor Fusion",
    category: "Sensor Fusion",
    description: "Combining sensor evidence into a more reliable environmental model.",
    position: [-3, 0.48, 2.65],
    prerequisiteIds: ["probability", "perception", "embedded-systems"],
    neighbors: {
      left: "object-detection",
      right: "path-planning",
      back: "perception",
      forward: "autonomous-systems",
    },
    projectSlug: "ecocar-sensor-fusion",
    major: true,
  },
  {
    id: "path-planning",
    label: "Path Planning",
    category: "Autonomous Systems",
    description: "Selecting safe, efficient actions through a world that is never perfectly known.",
    position: [-1, 0.48, 2.65],
    prerequisiteIds: ["algorithms", "localization", "robotics-foundations"],
    neighbors: {
      left: "sensor-fusion",
      right: "control-systems",
      back: "localization",
      forward: "autonomous-systems",
    },
    projectSlug: "rl-autonomous-driving",
  },
  {
    id: "control-systems",
    label: "Control Systems",
    category: "Robotics",
    description: "Closing the loop between plans, measurements, and precise real-world action.",
    position: [1, 0.48, 2.65],
    prerequisiteIds: ["robotics-foundations", "embedded-systems"],
    neighbors: {
      left: "path-planning",
      right: "autonomous-systems",
      back: "robotics-foundations",
      forward: "autonomous-systems",
    },
    projectSlug: "ecocar-sensor-fusion",
    major: true,
  },
  {
    id: "autonomous-systems",
    label: "Autonomous Systems",
    category: "Autonomous Systems",
    description:
      "Bringing perception, planning, and control together under real operating constraints.",
    position: [3, 0.48, 2.65],
    prerequisiteIds: ["sensor-fusion", "path-planning", "control-systems"],
    neighbors: {
      left: "control-systems",
      right: "intelligent-agents",
      back: "control-systems",
      forward: "integrated-intelligence",
    },
    projectSlug: "ecocar-sensor-fusion",
    major: true,
  },
  {
    id: "intelligent-agents",
    label: "Intelligent Agents",
    category: "AI Infrastructure",
    description: "Orchestrating models, tools, and context into useful, bounded systems.",
    position: [5, 0.48, 2.65],
    prerequisiteIds: ["machine-learning", "ai-infrastructure", "object-detection"],
    neighbors: {
      left: "autonomous-systems",
      back: "object-detection",
      forward: "integrated-intelligence",
    },
    projectSlug: "a-little-tech-for-you",
  },
  {
    id: "integrated-intelligence",
    label: "Integrated Intelligence",
    category: "Integrated Intelligence",
    description: "Perception, reasoning, planning, and action operating together as one system.",
    position: [0, 0.08, 4.18],
    prerequisiteIds: [
      "machine-learning",
      "object-detection",
      "sensor-fusion",
      "control-systems",
      "autonomous-systems",
      "ai-infrastructure",
    ],
    neighbors: { back: "autonomous-systems", left: "intelligent-agents" },
    finalNode: true,
  },
];

export const STACK_MISSIONS: readonly StackMission[] = [
  {
    id: "foundation-run",
    title: "Foundation Run",
    label: "Mission 01",
    description:
      "Build from Python through the foundations until the stack can learn from evidence.",
    caseFile: "The missing learning signal",
    casePrompt:
      "Trace the data and mathematical evidence required to make the first model reliable.",
    objectiveNodeId: "machine-learning",
    objectiveLabel: "Activate Machine Learning",
    startNodeId: "python",
    layout: "stack",
  },
  {
    id: "perception-run",
    title: "Perception Run",
    label: "Mission 02",
    description:
      "Navigate the constellation map and assemble the evidence needed for visual awareness.",
    caseFile: "The unseen obstacle",
    casePrompt:
      "Recover the visual and evaluation evidence needed to identify what is in front of the system.",
    objectiveNodeId: "object-detection",
    objectiveLabel: "Activate Object Detection",
    startNodeId: "python",
    layout: "constellation",
  },
  {
    id: "autonomy-circuit",
    title: "Autonomy Circuit",
    label: "Mission 03",
    description:
      "Close the full loop across perception, planning, control, and deployment to reach integrated intelligence.",
    caseFile: "The closed-loop system",
    casePrompt:
      "Follow every dependency to reveal how a machine can perceive, decide, and act safely.",
    objectiveNodeId: "integrated-intelligence",
    objectiveLabel: "Activate Integrated Intelligence",
    startNodeId: "python",
    layout: "circuit",
  },
];

export const MISSION_BY_ID = new Map(STACK_MISSIONS.map((mission) => [mission.id, mission]));

export function getObjectiveEvidenceNodes(objectiveNodeId: string): readonly SkillCubeNode[] {
  const evidenceIds = new Set<string>();
  const collectEvidence = (nodeId: string) => {
    if (evidenceIds.has(nodeId)) return;
    evidenceIds.add(nodeId);
    const node = NODE_BY_ID.get(nodeId);
    node?.prerequisiteIds.forEach(collectEvidence);
  };

  collectEvidence(objectiveNodeId);
  return LEVEL_NODES.filter((node) => evidenceIds.has(node.id));
}

export function getMissionPosition(
  node: SkillCubeNode,
  layout: StackMapLayout,
): [number, number, number] {
  if (layout === "stack") return [node.position[0], node.position[1], node.position[2]];

  const index = LEVEL_NODES.findIndex((item) => item.id === node.id);
  if (layout === "constellation") {
    if (index === 0) return [0, 3.15, -0.75];
    const ringIndex = index - 1;
    const band = Math.floor(ringIndex / 7);
    const angle = ((ringIndex % 7) / 7) * Math.PI * 2 + band * 0.38 - Math.PI / 2;
    const radius = 2.25 + band * 1.3;
    return [Math.cos(angle) * radius, 2.55 - band * 0.95, Math.sin(angle) * radius + 0.55];
  }

  const column = index % 5;
  const row = Math.floor(index / 5);
  return [(column - 2) * 1.92, 3.12 - row * 0.78, (column % 2 === 0 ? -0.7 : 0.7) + row * 0.92];
}

const STORY_CONTENT: Record<string, SkillStory> = {
  python: {
    image: "/portfolio_images/stackmap/python.jpg",
    imageAlt: "Python skill map visual",
    story:
      "Python is the practical starting point behind my model experiments, perception prototypes, automation workflows, and project validation. It is the language that lets an early idea become a testable system.",
    references: [
      { label: "OBSERV-E accessibility robotics", href: "/projects/observ-e", kind: "Case study" },
      {
        label: "RL lane-keeping simulator",
        href: "/posts/building-an-rl-lane-keeping-simulator",
        kind: "Article",
      },
    ],
  },
  "data-preparation": {
    image: "/portfolio_images/stackmap/data-eda.jpg",
    imageAlt: "Data exploration and preparation visual",
    story:
      "Before a model can be useful, the data has to be understandable. This layer represents Danish’s work turning raw signals, datasets, and measurements into inputs that can support a credible experiment.",
    references: [
      {
        label: "Fraud detection case study",
        href: "/projects/fraud-detection",
        kind: "Case study",
      },
      {
        label: "Course recommendation system",
        href: "/projects/course-recommendation",
        kind: "Case study",
      },
    ],
  },
  "software-engineering": {
    image: "/portfolio_images/stackmap/software-development-life-cycle.jpg",
    imageAlt: "Software development lifecycle visual",
    story:
      "Strong AI work needs the same engineering discipline as any other reliable product: clear interfaces, testable behavior, deployment judgment, and software that teammates can extend.",
    references: [
      {
        label: "TTP outreach automation",
        href: "/projects/ttp-outreach-automation",
        kind: "Case study",
      },
      {
        label: "From CLI script to team tool",
        href: "/posts/ttp-streamlit-outreach-automation",
        kind: "Article",
      },
    ],
  },
  "linear-algebra": {
    image: "/portfolio_images/stackmap/linear-regression.jpg",
    imageAlt: "Mathematical modeling visual",
    story:
      "Linear algebra underpins how Danish reasons about representations, transformations, control, and model behavior. It is a technical foundation that makes later perception and autonomy work more legible.",
    references: [
      {
        label: "Course recommendation system",
        href: "/projects/course-recommendation",
        kind: "Case study",
      },
      { label: "Lane-detection study", href: "/projects/lane-detection-salad", kind: "Case study" },
    ],
  },
  probability: {
    image: "/portfolio_images/stackmap/sensor-fusion.jpg",
    imageAlt: "Sensor fusion probability visual",
    story:
      "Probability matters whenever a system has to act with incomplete or noisy evidence. In autonomy work, it is the difference between reacting to a signal and reasoning about how much to trust it.",
    references: [
      { label: "EcoCAR sensor fusion", href: "/projects/ecocar-sensor-fusion", kind: "Case study" },
      {
        label: "Sensor-fusion engineering reflection",
        href: "/posts/ecocar-sensor-fusion-reflection",
        kind: "Article",
      },
    ],
  },
  algorithms: {
    image: "/portfolio_images/stackmap/data-driven-planning.jpg",
    imageAlt: "Data-driven planning visual",
    story:
      "Algorithms turn engineering intent into repeatable decisions: search, planning, optimization, and feedback loops. This layer connects early programming fluency to later intelligent behavior.",
    references: [
      {
        label: "RL autonomous driving",
        href: "/projects/rl-autonomous-driving",
        kind: "Case study",
      },
      {
        label: "RL lane-keeping simulator",
        href: "/posts/building-an-rl-lane-keeping-simulator",
        kind: "Article",
      },
    ],
  },
  "embedded-systems": {
    image: "/portfolio_images/stackmap/can-bus.jpg",
    imageAlt: "Vehicle CAN bus visual",
    story:
      "Intelligent machines only matter when software reaches physical systems. Embedded work connects Danish’s code to real vehicle signals, timing constraints, sensors, and actuators.",
    references: [
      { label: "EcoCAR sensor fusion", href: "/projects/ecocar-sensor-fusion", kind: "Case study" },
      {
        label: "Sensor-fusion engineering reflection",
        href: "/posts/ecocar-sensor-fusion-reflection",
        kind: "Article",
      },
    ],
  },
  "model-evaluation": {
    image: "/portfolio_images/stackmap/model-evaluation.jpg",
    imageAlt: "Model evaluation visual",
    story:
      "Danish treats evaluation as part of building, not an afterthought. It is how accuracy, robustness, latency, and meaningful failure cases become visible before a system is trusted.",
    references: [
      { label: "Lane-detection study", href: "/projects/lane-detection-salad", kind: "Case study" },
      {
        label: "Lane-detection backbone study",
        href: "/posts/lane-detection-backbone-bake-off",
        kind: "Article",
      },
    ],
  },
  "machine-learning": {
    image: "/portfolio_images/stackmap/machine-learning.jpg",
    imageAlt: "Applied machine learning visual",
    story:
      "This is where prepared data and mathematical foundations become learned behavior. Danish uses machine learning as a component within a system, with clear evaluation and real user or operational context.",
    references: [
      {
        label: "Course recommendation system",
        href: "/projects/course-recommendation",
        kind: "Case study",
      },
      {
        label: "Fraud detection case study",
        href: "/projects/fraud-detection",
        kind: "Case study",
      },
    ],
  },
  "computer-vision-foundations": {
    image: "/portfolio_images/stackmap/computer-vision.jpg",
    imageAlt: "Computer vision visual",
    story:
      "Computer vision is central to Danish’s interest in machines that can understand real scenes. This layer frames visual input as a source of geometry, context, and safety-critical evidence.",
    references: [
      { label: "Lane-detection study", href: "/projects/lane-detection-salad", kind: "Case study" },
      {
        label: "Lane-detection backbone study",
        href: "/posts/lane-detection-backbone-bake-off",
        kind: "Article",
      },
    ],
  },
  perception: {
    image: "/portfolio_images/stackmap/opencv.jpg",
    imageAlt: "OpenCV perception visual",
    story:
      "Perception combines visual and environmental cues into something an intelligent system can use. It is the bridge between sensing a scene and acting responsibly within it.",
    references: [
      { label: "OBSERV-E accessibility robotics", href: "/projects/observ-e", kind: "Case study" },
      {
        label: "StarkHacks OBSERV-E story",
        href: "/posts/starkhacks-2026-observ-e-win",
        kind: "Article",
      },
    ],
  },
  localization: {
    image: "/portfolio_images/stackmap/autonomous-systems.jpg",
    imageAlt: "Autonomous systems localization visual",
    story:
      "Localization answers a simple but essential question: where is the machine? Danish connects that question to more reliable planning, lane keeping, and autonomy evaluation.",
    references: [
      {
        label: "RL autonomous driving",
        href: "/projects/rl-autonomous-driving",
        kind: "Case study",
      },
      {
        label: "RL lane-keeping simulator",
        href: "/posts/building-an-rl-lane-keeping-simulator",
        kind: "Article",
      },
    ],
  },
  "robotics-foundations": {
    image: "/portfolio_images/stackmap/ros2.jpg",
    imageAlt: "ROS2 robotics visual",
    story:
      "Robotics makes intelligence embodied. This layer represents Danish’s work connecting perception, feedback, hardware constraints, and user-centered utility in physical systems.",
    references: [
      { label: "OBSERV-E accessibility robotics", href: "/projects/observ-e", kind: "Case study" },
      {
        label: "Why accessibility robotics",
        href: "/posts/why-accessibility-robotics",
        kind: "Article",
      },
    ],
  },
  "ai-infrastructure": {
    image: "/portfolio_images/stackmap/model-deployment.jpg",
    imageAlt: "AI deployment infrastructure visual",
    story:
      "AI infrastructure is what lets models become dependable tools: APIs, evaluation, delivery paths, and interfaces that make intelligent behavior useful to people.",
    references: [
      {
        label: "A Little Tech For You",
        href: "/projects/a-little-tech-for-you",
        kind: "Case study",
      },
      {
        label: "Building the AI avatar portfolio",
        href: "/posts/building-an-ai-avatar-portfolio",
        kind: "Article",
      },
    ],
  },
  "object-detection": {
    image: "/portfolio_images/stackmap/yolo.jpg",
    imageAlt: "YOLO object detection visual",
    story:
      "Object detection is a concrete form of visual awareness: identifying hazards, targets, and context quickly enough for a system to respond. It connects Danish’s perception work to safety and accessibility.",
    references: [
      { label: "Lane-detection study", href: "/projects/lane-detection-salad", kind: "Case study" },
      { label: "OBSERV-E accessibility robotics", href: "/projects/observ-e", kind: "Case study" },
    ],
  },
  "sensor-fusion": {
    image: "/portfolio_images/stackmap/sensor-fusion.jpg",
    imageAlt: "Sensor fusion systems visual",
    story:
      "Sensor fusion is one of Danish’s most career-specific autonomy layers. It combines complementary evidence from a real vehicle’s systems to make a more dependable world model.",
    references: [
      { label: "EcoCAR sensor fusion", href: "/projects/ecocar-sensor-fusion", kind: "Case study" },
      {
        label: "Sensor-fusion engineering reflection",
        href: "/posts/ecocar-sensor-fusion-reflection",
        kind: "Article",
      },
    ],
  },
  "path-planning": {
    image: "/portfolio_images/stackmap/data-driven-planning.jpg",
    imageAlt: "Path planning visual",
    story:
      "Path planning turns a world model into a safe route. It reflects Danish’s interest in systems that do more than observe: they decide, adapt, and move with purpose.",
    references: [
      {
        label: "RL autonomous driving",
        href: "/projects/rl-autonomous-driving",
        kind: "Case study",
      },
      {
        label: "RL lane-keeping simulator",
        href: "/posts/building-an-rl-lane-keeping-simulator",
        kind: "Article",
      },
    ],
  },
  "control-systems": {
    image: "/portfolio_images/stackmap/simulink.jpg",
    imageAlt: "Control systems simulation visual",
    story:
      "Control systems turn planned actions into stable movement. This is where Danish’s autonomy interests meet the discipline of feedback, timing, and vehicle behavior.",
    references: [
      { label: "EcoCAR sensor fusion", href: "/projects/ecocar-sensor-fusion", kind: "Case study" },
      {
        label: "Sensor-fusion engineering reflection",
        href: "/posts/ecocar-sensor-fusion-reflection",
        kind: "Article",
      },
    ],
  },
  "autonomous-systems": {
    image: "/portfolio_images/stackmap/autonomous-systems.jpg",
    imageAlt: "Autonomous systems visual",
    story:
      "Autonomous systems combine perception, planning, and control under real constraints. This layer reflects the safety-minded engineering direction that connects Danish’s technical work to a larger mission.",
    references: [
      { label: "EcoCAR sensor fusion", href: "/projects/ecocar-sensor-fusion", kind: "Case study" },
      {
        label: "RL autonomous driving",
        href: "/projects/rl-autonomous-driving",
        kind: "Case study",
      },
    ],
  },
  "intelligent-agents": {
    image: "/portfolio_images/stackmap/agentic-systems.jpg",
    imageAlt: "Agentic systems visual",
    story:
      "Intelligent agents bring models, tools, information, and product judgment together. For Danish, this is about building helpful, bounded systems rather than isolated model outputs.",
    references: [
      {
        label: "A Little Tech For You",
        href: "/projects/a-little-tech-for-you",
        kind: "Case study",
      },
      {
        label: "Building the AI avatar portfolio",
        href: "/posts/building-an-ai-avatar-portfolio",
        kind: "Article",
      },
    ],
  },
  "integrated-intelligence": {
    image: "/portfolio_images/stackmap/systems-integration.jpg",
    imageAlt: "Integrated intelligent systems visual",
    story:
      "Integrated Intelligence is the portfolio’s north star: perception, reasoning, planning, and action working together to make a system genuinely useful, safe, and accountable.",
    references: [
      { label: "EcoCAR sensor fusion", href: "/projects/ecocar-sensor-fusion", kind: "Case study" },
      { label: "OBSERV-E accessibility robotics", href: "/projects/observ-e", kind: "Case study" },
    ],
  },
};

const STORY_ART_BY_CATEGORY: Record<CubeCategory, Pick<SkillStory, "image" | "imageAlt">> = {
  Foundation: {
    image: "/portfolio_images/stackmap/story-art/foundation-story.png",
    imageAlt: "Luminous foundation systems on a holographic engineering grid",
  },
  "Machine Learning": {
    image: "/portfolio_images/stackmap/story-art/machine-learning-story.png",
    imageAlt: "Glowing machine-learning system built from data tiles and a neural lattice",
  },
  "Computer Vision": {
    image: "/portfolio_images/stackmap/story-art/vision-story.png",
    imageAlt: "Luminous perception system interpreting a three-dimensional scene",
  },
  Robotics: {
    image: "/portfolio_images/stackmap/story-art/robotics-story.png",
    imageAlt: "Robotic control system with feedback loops inside translucent modules",
  },
  "Autonomous Systems": {
    image: "/portfolio_images/stackmap/story-art/autonomy-story.png",
    imageAlt: "Autonomous navigation system planning a route through a glowing world model",
  },
  "Sensor Fusion": {
    image: "/portfolio_images/stackmap/story-art/fusion-story.png",
    imageAlt: "Sensor streams converging into a fused environmental model",
  },
  "AI Infrastructure": {
    image: "/portfolio_images/stackmap/story-art/infrastructure-story.png",
    imageAlt: "AI services and tools orchestrated across a luminous infrastructure network",
  },
  "Integrated Intelligence": {
    image: "/portfolio_images/stackmap/story-art/integrated-story.png",
    imageAlt: "A radiant intelligent core connecting every layer of the system",
  },
};

const STORY_ART_BY_NODE: Partial<Record<string, Pick<SkillStory, "image" | "imageAlt">>> = {
  python: {
    image: "/portfolio_images/stackmap/story-art/python-story.png",
    imageAlt: "Python engineering modules flowing into a luminous model lattice",
  },
};

export const SKILL_STORIES: Record<string, SkillStory> = Object.fromEntries(
  LEVEL_NODES.map((node) => [
    node.id,
    {
      ...STORY_CONTENT[node.id],
      ...STORY_ART_BY_CATEGORY[node.category],
      ...STORY_ART_BY_NODE[node.id],
    },
  ]),
) as Record<string, SkillStory>;

export const STORY_BEATS: Record<string, { chapter: string; beat: string }> = {
  python: {
    chapter: "Chapter 01 · The Builder's Launch Point",
    beat: "A practical idea becomes something Danish can prototype, test, and grow.",
  },
  "data-preparation": {
    chapter: "Chapter 02 · Making Signals Useful",
    beat: "The raw material is shaped before any intelligent system is asked to learn from it.",
  },
  "software-engineering": {
    chapter: "Chapter 03 · Building for the Real World",
    beat: "Experiments become reliable tools when the engineering around them is deliberate.",
  },
  "linear-algebra": {
    chapter: "Chapter 04 · Seeing Structure",
    beat: "Mathematical structure gives later models, transformations, and controls a common language.",
  },
  probability: {
    chapter: "Chapter 05 · Reasoning Under Uncertainty",
    beat: "The stack learns not just to react to signals, but to judge how much to trust them.",
  },
  algorithms: {
    chapter: "Chapter 06 · Turning Intent into Decisions",
    beat: "Repeatable algorithms carry the journey from working code to intelligent behavior.",
  },
  "embedded-systems": {
    chapter: "Chapter 07 · Reaching the Physical World",
    beat: "Software meets real sensors, timing limits, and machines that must respond on cue.",
  },
  "model-evaluation": {
    chapter: "Chapter 08 · Earning Trust",
    beat: "The system has to be measured at its edges before it earns a role in the field.",
  },
  "machine-learning": {
    chapter: "Chapter 09 · Learning from Evidence",
    beat: "Prepared data and sound foundations turn into behavior the system can generalize.",
  },
  "computer-vision-foundations": {
    chapter: "Chapter 10 · Opening the Visual Layer",
    beat: "The journey shifts from abstract data to the geometry and context of real scenes.",
  },
  perception: {
    chapter: "Chapter 11 · Interpreting the Scene",
    beat: "Signals become a usable view of the world that can support a safer next action.",
  },
  localization: {
    chapter: "Chapter 12 · Knowing Where You Are",
    beat: "Before an intelligent machine can move with purpose, it needs a reliable sense of place.",
  },
  "robotics-foundations": {
    chapter: "Chapter 13 · Giving Intelligence a Body",
    beat: "This is where sensing and software become a physical experience for real people.",
  },
  "ai-infrastructure": {
    chapter: "Chapter 14 · Delivering the System",
    beat: "Models become useful when services, interfaces, and evaluation carry them into practice.",
  },
  "object-detection": {
    chapter: "Chapter 15 · Recognizing What Matters",
    beat: "The stack learns to identify the objects and hazards that shape a safe response.",
  },
  "sensor-fusion": {
    chapter: "Chapter 16 · Forming One World Model",
    beat: "Independent sensor clues become a stronger shared understanding of what is happening.",
  },
  "path-planning": {
    chapter: "Chapter 17 · Choosing a Way Forward",
    beat: "Perception turns into action through routes that are purposeful, safe, and adaptable.",
  },
  "control-systems": {
    chapter: "Chapter 18 · Closing the Loop",
    beat: "Plans matter only when the machine can execute them with stable, precise feedback.",
  },
  "autonomous-systems": {
    chapter: "Chapter 19 · Coordinating the Journey",
    beat: "Perception, planning, and control now work together under real operating constraints.",
  },
  "intelligent-agents": {
    chapter: "Chapter 20 · Orchestrating Intelligence",
    beat: "Models, tools, and judgment combine into systems that can help without overreaching.",
  },
  "integrated-intelligence": {
    chapter: "Chapter 21 · The System Comes Together",
    beat: "Every layer now contributes to one accountable machine that can perceive, reason, plan, and act.",
  },
};

export const NODE_BY_ID = new Map(LEVEL_NODES.map((node) => [node.id, node]));

export const MAJOR_NODE_IDS = LEVEL_NODES.filter((node) => node.major).map((node) => node.id);

export const CATEGORY_ORDER: readonly CubeCategory[] = [
  "Machine Learning",
  "Computer Vision",
  "Robotics",
  "Autonomous Systems",
  "Sensor Fusion",
  "AI Infrastructure",
];

const seenEdges = new Set<string>();

export const LEVEL_EDGES = LEVEL_NODES.flatMap((node) =>
  Object.values(node.neighbors).flatMap((neighborId) => {
    if (!neighborId) return [];
    const key = [node.id, neighborId].sort().join("::");
    if (seenEdges.has(key)) return [];
    seenEdges.add(key);
    return [[node.id, neighborId] as const];
  }),
);

export function getMissingPrerequisites(node: SkillCubeNode, activatedIds: ReadonlySet<string>) {
  return node.prerequisiteIds
    .filter((id) => !activatedIds.has(id))
    .map((id) => NODE_BY_ID.get(id))
    .filter((prerequisite): prerequisite is SkillCubeNode => Boolean(prerequisite));
}
