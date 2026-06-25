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
      "value": "Project showcase with visuals, stack context, and next steps"
    }
  ],
  "problem": "This project deserves more than a small card. The page explains the practical human-ai interaction problem, why it matters, and what technical choices were made.",
  "motivation": "The goal of this page is to make the work legible to collaborators, technical reviewers, hiring teams, and future me. It is structured so screenshots, diagrams, posts, and artifacts can be added without redesigning the portfolio.",
  "myRole": [
    "Defined the project framing and technical goals.",
    "Built or planned the core implementation workflow.",
    "Mapped the project to concrete skills, technologies, and portfolio artifacts.",
    "Documented interview-ready talking points and future improvements."
  ],
  "whatIBuilt": [
    "Avatar/chat interface, voice pipeline planning, knowledge base, and route recommendations.",
    "Reusable project content sections: stack map, architecture, challenges, outcomes, resume bullets, and related content."
  ],
  "architecture": [
    {
      "title": "Input / Context",
      "body": "The project starts from a real user, technical, research, or business problem."
    },
    {
      "title": "Build / Processing",
      "body": "The selected stack turns the problem into a working prototype, experiment, automation, or research artifact."
    },
    {
      "title": "Output / Artifacts",
      "body": "The page captures outcomes, links, screenshots, future work, and how to explain the project in interviews."
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
      "body": "This dedicated page links the project to stack items, posts, related projects, and external references."
    },
    {
      "title": "Next-edit ready",
      "body": "The data model supports adding more cards, screenshots, diagrams, links, and posts later."
    }
  ],
  "challengeSolutions": [
    {
      "title": "Clarity",
      "body": "The old portfolio made projects feel flat. This page gives the project enough room to explain context, decisions, and results."
    },
    {
      "title": "Artifact collection",
      "body": "Screenshots, demo links, source links, and LinkedIn images can be attached as the project evolves."
    }
  ],
  "outcomes": [
    {
      "title": "Unique page created",
      "body": "This project now has a unique slug-based page with distinct content."
    },
    {
      "title": "Stack map connected",
      "body": "Technologies are connected back to the site-wide stack map and related projects."
    }
  ],
  "metrics": [
    {
      "label": "Voice synthesis latency",
      "value": "1.8 s",
      "note": "End-to-end TTS generation time from text input to audio output"
    },
    {
      "label": "Voice models tested",
      "value": "4",
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
  "impactTakeaway": "This page shows applied human-ai interaction work and gives the project enough room to be understood beyond a one-line card.",
  "interviewTalkingPoints": [
    "What problem AILA \u00b7 AI Leadership Avatar solves.",
    "Which stack choices mattered and why.",
    "What I would improve in the next iteration."
  ],
  "resumeBullets": [
    "Built AILA \u00b7 AI Leadership Avatar, applying AI-assisted product interface, 3D interaction experiments, LLMs to a practical human-ai interaction workflow."
  ],
  "futureWork": [
    "Expand the visual detail with additional demo captures, metrics, and deployment details.",
    "Strengthen the project record with clearer source links, implementation notes, and evaluation details.",
    "Write or attach related posts."
  ],
  "links": [
    { "label": "coqui/XTTS-v2", "href": "https://huggingface.co/coqui/XTTS-v2", "type": "external" },
  ]
};



