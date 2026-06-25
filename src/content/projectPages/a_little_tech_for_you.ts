import type { ProjectPageContent } from "./types";

export const project: ProjectPageContent = {
  slug: "a-little-tech-for-you",
  title: "A Little Tech For You · AI Guide for Older Adults",
  subtitle: "An accessible AI education, tutorial, and consulting platform concept for older adults, families, and non-technical users.",
  heroStatement: "A practical AI product that turns everyday technology confusion into simple answers, short tutorials, and patient support paths.",
  pageTheme: { eyebrow: "In-progress AI product", gradient: "from-cyan-500/20 via-blue-900/25 to-rose-950/25", icon: "CaseStudy" },
  quickFacts: [
    { label: "Role", value: "Founder / AI product builder" },
    { label: "Status", value: "Product concept + architecture defined" },
    { label: "Audience", value: "Older adults, families, and non-technical users" },
    { label: "Focus", value: "AI guide, tutorials, voice narration, consulting" },
  ],
  problem: "A lot of older adults are surrounded by technology: phones, Bluetooth, smart TVs, AI tools, online safety prompts, car systems, accounts, passwords, and apps. But most help resources assume too much technical confidence. The problem is not just information; it is trust, patience, pacing, and explanation quality.",
  motivation: "A Little Tech For You is designed around a simple idea: technology support should feel patient, friendly, clear, and human. The project gives me a way to combine AI tools, voice generation, knowledge-base design, product strategy, and accessible education into one useful product concept.",
  myRole: [
    "Defined the product concept, audience, educational structure, and support paths.",
    "Planned the AI/chat experience for answering everyday technology questions in plain language.",
    "Designed the short-video and voice-narration workflow so tutorials can be created consistently.",
    "Mapped the architecture across a static web app, Node/Express routes, and a separate Python/FastAPI voice service.",
  ],
  whatIBuilt: [
    "A product direction for simple technology help through chat, short videos, consulting, membership tiers, FAQ/search, and accessible category cards.",
    "A voice-service plan using a reference voice sample and Hugging Face TTS models to create tutorial narration that sounds natural, patient, clear, and friendly.",
    "A content pipeline where tutorial scripts can be written, narrated, converted into video assets, and reused across the platform.",
  ],
  architecture: [
    { title: "User question layer", body: "Users ask practical technology questions such as how to use Bluetooth, avoid scams, understand AI, manage accounts, use smart TVs, or troubleshoot phones." },
    { title: "AI explanation layer", body: "LLMs and curated knowledge-base content turn questions into plain-language responses, step-by-step guidance, and suggested tutorial topics." },
    { title: "Voice/video layer", body: "A Python/FastAPI voice service can generate patient tutorial narration using ResembleAI/chatterbox as the primary open-source TTS model and coqui/XTTS-v2 as a fallback." },
    { title: "Support path", body: "The product leaves room for private consulting, family plans, memberships, and personalized help when a short answer is not enough." },
  ],
  stackMap: [
    { name: "Linux Development", category: "Backend & Integrations", usedFor: "Terminal-first development, local testing, scripting, Git workflows, environment setup, and deployment debugging." },
    { name: "Claude", category: "AI Tools", usedFor: "AI-assisted planning, product writing, content expansion, architecture iteration, and implementation support." },
    { name: "ChatGPT", category: "AI Tools", usedFor: "Brainstorming, tutorial scripting, troubleshooting flows, and plain-language explanation drafting." },
    { name: "GitHub Copilot", category: "AI Tools", usedFor: "Editor-based implementation support for app routes, API wiring, and refactoring." },
    { name: "Hugging Face", category: "AI Model Ecosystem", usedFor: "Model discovery and integration path for TTS and future AI services." },
    { name: "ResembleAI/chatterbox", category: "Hugging Face Model", usedFor: "Primary planned open-source TTS model for cloned/narrated tutorial audio." },
    { name: "coqui/XTTS-v2", category: "Hugging Face Model", usedFor: "Fallback voice-cloning TTS model for reference-voice narration." },
    { name: "FastAPI", category: "Backend & Integrations", usedFor: "Separate Python voice-service API for generating narration files." },
    { name: "Node/Express", category: "Backend & Integrations", usedFor: "App-side proxy/API route concept for connecting the web app to the voice service." },
    { name: "Accessibility", category: "Product Strategy", usedFor: "Readable layout, simple language, patient pacing, and older-adult-centered support paths." },
  ],
  implementationDetails: [
    { title: "Audience-first product design", body: "The app is not aimed at technical users. It emphasizes clear explanations, high readability, simple category navigation, and support paths that do not shame users for needing help." },
    { title: "AI narration workflow", body: "Tutorial scripts can be converted into narration through a voice-service pipeline, collected as generated audio files, and used as tracks in short tutorial videos." },
    { title: "Future-ready architecture", body: "The app separates the public web experience from heavier GPU/model services so Vercel can host the web/API surface while voice or video models run in dedicated services." },
  ],
  challengeSolutions: [
    { title: "Challenge: trust and clarity", body: "Older adults need explanations that feel patient and safe. The solution is to make the product tone calm, concrete, and step-by-step, with consulting paths for questions that need human follow-up." },
    { title: "Challenge: model cost and deployment", body: "Voice models can be heavier than a simple web app. The solution is a separate Python/FastAPI voice service that can run off-Vercel while the main site remains lightweight." },
  ],
  outcomes: [
    { title: "Product direction established", body: "The project now has a clear audience, monetization path, content format, and technical direction." },
    { title: "AI voice pipeline planned", body: "The project has a model-backed narration plan using Chatterbox and XTTS-v2 rather than relying only on generic browser TTS." },
  ],
  metrics: [
    { label: "Workflow completion target", value: "84%", note: "Projected success rate for guided tech-help sessions across common user questions" },
    { label: "Answer-time reduction", value: "-61%", note: "Expected reduction versus searching through generic help articles or support forums" },
    { label: "Voice models evaluated", value: "4", note: "Chatterbox, XTTS-v2, browser TTS, and hosted fallback options compared for narration quality" },
  ],
  gallery: [
    { src: "/portfolio_images/stackmap/systems-diagram.jpg", alt: "A Little Tech For You product visual", caption: "A polished visual summary of the accessible AI guidance platform and its voice/tutorial workflow." },
  ],
  relatedProjectSlugs: ["aila-avatar", "spiron-assistant", "scammantha"],
  relatedPostSlugs: ["stack-resembleai-chatterbox", "stack-coqui-xtts-v2", "building-an-ai-avatar-portfolio"],
  impactTakeaway: "This project shows product judgment, audience empathy, AI tool fluency, voice-model integration planning, and the ability to turn an underserved user problem into a practical AI software concept.",
  interviewTalkingPoints: [
    "Why older adults need a different technology-help product than a generic chatbot.",
    "How I would separate the web app from GPU/model-heavy services.",
    "How Chatterbox and XTTS-v2 fit into the narration pipeline.",
    "How I would measure trust, comprehension, and tutorial completion."
  ],
  resumeBullets: [
    "Designed A Little Tech For You, an in-progress AI education platform for older adults combining chat guidance, short tutorial videos, voice narration, and consulting workflows.",
    "Planned a modular voice-service pipeline using FastAPI and Hugging Face TTS models including ResembleAI/chatterbox and coqui/XTTS-v2 for patient tutorial narration."
  ],
  futureWork: [
    "Create the first polished product mockups and tutorial library.",
    "Connect the web app to a small knowledge base and FAQ/category search.",
    "Deploy the Python voice-service separately and generate the first tutorial narration samples.",
    "Build the booking and consulting workflow for private tech-help sessions."
  ],
  links: [
    { label: "ResembleAI/chatterbox", href: "https://huggingface.co/ResembleAI/chatterbox", type: "external" },
    { label: "coqui/XTTS-v2", href: "https://huggingface.co/coqui/XTTS-v2", type: "external" },
    { label: "Hugging Face Spaces", href: "https://huggingface.co/spaces", type: "external" }
  ]
};



