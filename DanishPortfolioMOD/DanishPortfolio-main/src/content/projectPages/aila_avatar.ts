import type { ProjectPageContent } from "./types";

export const project: ProjectPageContent = {
  "slug": "aila-avatar",
  "title": "AILA \u00b7 AI Leadership Avatar",
  "subtitle": "An AI avatar concept for leadership communication and interactive portfolio guidance.",
  "heroStatement": "Avatar/chat interface, voice pipeline planning, knowledge base, and route recommendations.",
  "pageTheme": {
    "eyebrow": "Human-AI Interaction",
    "gradient": "from-blue-500/25 via-rose-800/20 to-slate-900/30",
    "icon": "CaseStudy"
  },
  "quickFacts": [
    {
      "label": "Role",
      "value": "AI Systems Builder"
    },
    {
      "label": "Status",
      "value": "Expandable case study"
    },
    {
      "label": "Domain",
      "value": "Human-AI Interaction"
    },
    {
      "label": "Page purpose",
      "value": "Evidence-backed case study with visuals, stack context, and next steps"
    }
  ],
  "problem": "This chapter explains the practical human-ai interaction problem, why it matters to people or teams, and what technical choices helped turn the idea into something more useful.",
  "motivation": "The goal is to make the work legible to recruiters, collaborators, technical reviewers, and future me while preserving the learning behind it. Screenshots, diagrams, posts, and artifacts can be added as the project continues to grow.",
  "myRole": [
    "Defined the project framing and technical goals.",
    "Built or planned the core implementation workflow.",
    "Mapped the project to concrete skills, technologies, and portfolio artifacts.",
    "Documented interview-ready talking points and future improvements."
  ],
  "whatIBuilt": [
    "Avatar/chat interface, voice pipeline planning, knowledge base, and route recommendations.",
    "A reusable case-study structure that connects stack choices, architecture, challenges, outcomes, resume bullets, and related reflections."
  ],
  "architecture": [
    {
      "title": "Input / Context",
      "body": "The chapter starts from a real user, technical, research, or business problem that deserves careful framing."
    },
    {
      "title": "Build / Processing",
      "body": "The selected stack turns the problem into a working prototype, experiment, automation, or research artifact with a clear reason for existing."
    },
    {
      "title": "Output / Artifacts",
      "body": "The chapter captures outcomes, links, screenshots, future work, and the lessons worth carrying into the next build."
    }
  ],
  "stackMap": [
    { "name": "Claude", "category": "AI Tools", "usedFor": "Used as the primary AI coding/architecture partner while iterating on the avatar and portfolio system." },
    { "name": "ChatGPT", "category": "AI Tools", "usedFor": "Used for planning the avatar experience, copy, troubleshooting, and user-flow iteration." },
    { "name": "coqui/XTTS-v2", "category": "Hugging Face model", "usedFor": "Explored for voice-cloned speech and future avatar narration/lip-sync workflows." },
    { "name": "Knowledge Base", "category": "AI assistant layer", "usedFor": "Connects the assistant to projects, posts, routes, and portfolio context." }
  ],
  "implementationDetails": [
    {
      "title": "Core workflow",
      "body": "Avatar/chat interface, voice pipeline planning, knowledge base, and route recommendations."
    },
    {
      "title": "Portfolio integration",
      "body": "This dedicated chapter links the project to stack items, posts, related projects, and external references so the work can be understood in context."
    },
    {
      "title": "Next-edit ready",
      "body": "The content model leaves room for better evidence over time: cards, screenshots, diagrams, links, and posts as the project matures."
    }
  ],
  "challengeSolutions": [
    {
      "title": "Clarity",
      "body": "A short card can flatten the work. This chapter gives the project room to explain context, decisions, and results with more care."
    },
    {
      "title": "Artifact collection",
      "body": "Screenshots, demo links, source links, and LinkedIn images can be attached as the project evolves and the evidence becomes stronger."
    }
  ],
  "outcomes": [
    {
      "title": "Dedicated chapter shaped",
      "body": "This project now has a dedicated chapter with its own context, artifacts, and learning signals."
    },
    {
      "title": "Stack map connected",
      "body": "Technologies are connected back to the site-wide stack map and related projects so skills are grounded in real work."
    }
  ],
  "metrics": [
    {
      "label": "Voice synthesis latency",
      "value": "—",
      "note": "End-to-end TTS generation time from text input to audio output"
    },
    {
      "label": "Voice models tested",
      "value": "—",
      "note": "Number of TTS/voice-cloning models evaluated for avatar narration"
    }
  ],
  "gallery": [
    {
      "src": "/portfolio_images/articles/ai-avatar-pipeline.jpg",
      "alt": "Project visual for AILA \u00b7 AI Leadership Avatar",
      "caption": "A polished visual summary of the project direction, technical stack, and product value."
    }
  ],
  "relatedProjectSlugs": [
    "spiron-assistant",
    "observ-e"
  ],
  "relatedPostSlugs": [
    "building-an-ai-avatar-portfolio"
  ],
  "recruiterTakeaway": "This chapter shows applied human-ai interaction work as part of a broader pattern: frame the problem, build carefully, learn honestly, and connect the result to people who can use it.",
  "interviewTalkingPoints": [
    "What problem AILA \u00b7 AI Leadership Avatar tries to serve.",
    "Which stack choices mattered, and where the tradeoffs showed up.",
    "What I would rebuild or strengthen in the next iteration."
  ],
  "resumeBullets": [
    "Built AILA \u00b7 AI Leadership Avatar, applying AI-assisted product interface, 3D interaction experiments, LLMs to a practical human-ai interaction workflow."
  ],
  "futureWork": [
    "Expand the project evidence with additional demo captures, metrics, and deployment notes.",
    "Strengthen the project record with clearer source links, implementation notes, and evaluation details.",
    "Write or attach related posts."
  ],
  "links": [
    { "label": "coqui/XTTS-v2", "href": "https://huggingface.co/coqui/XTTS-v2", "type": "external" },
  ]
};
