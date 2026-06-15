import type { ProjectPageContent } from "./types";

export const project: ProjectPageContent = {
  slug: "selvam-valuations",
  title: "Selvam Valuations · ScarletHacks M&A Intelligence Prototype",
  subtitle: "A team-built M&A valuation intelligence concept from ScarletHacks, separate from the StarkHacks/OBSERV-E win.",
  heroStatement: "Selvam explores how financial data, news, LLM-assisted analysis, and deal-comparison workflows can help users reason about acquisitions, valuation, ESG context, and merger strategy.",
  pageTheme: {
    eyebrow: "Hackathon prototype",
    gradient: "from-blue-500/25 via-rose-800/20 to-slate-900/30",
    icon: "CaseStudy"
  },
  quickFacts: [
    { label: "Role", value: "AI/product engineering contributor" },
    { label: "Event", value: "ScarletHacks prototype" },
    { label: "Status", value: "Prototype / expandable case study" },
    { label: "Important correction", value: "Not the StarkHacks winning project" }
  ],
  problem: "M&A research can be scattered across financial statements, market signals, news, ESG context, and qualitative risk factors. Selvam turns that into a product concept where users can compare companies, explore valuation assumptions, and surface structured deal intelligence in one place.",
  motivation: "I wanted the project to show product thinking around finance and AI rather than just a generic dashboard: what data matters, how a user might compare companies, where LLM summaries help, and how backend/data integration turns raw sources into decision support.",
  myRole: [
    "Helped frame the product direction and AI-assisted insight workflow.",
    "Contributed to the technical architecture for financial-data ingestion, article analysis, ESG-style graphing, and merger-lab style comparison flows.",
    "Mapped the project into a portfolio case study that separates it clearly from the StarkHacks OBSERV-E robotics win.",
    "Identified future improvements around live APIs, reliable valuation outputs, CORS/backend deployment stability, and stronger demo data."
  ],
  whatIBuilt: [
    "A case-study structure for Selvam as a financial AI / M&A intelligence prototype.",
    "A stack map connecting FastAPI, Python, financial APIs, LLM insight extraction, React/Vite app delivery, and Vercel deployment debugging.",
    "Documentation-ready sections for architecture, implementation decisions, limitations, and future improvements."
  ],
  architecture: [
    { title: "Financial data layer", body: "Company fundamentals, market data, news/article context, and ESG-style signals feed the product's analysis surface." },
    { title: "Insight layer", body: "LLM-assisted summarization and structured analysis convert articles and financial inputs into comparison-ready observations." },
    { title: "Merger lab", body: "Users compare companies, review valuation assumptions, and reason about strategic fit through a guided interface." },
    { title: "Deployment/debugging layer", body: "The project surfaced practical reliability issues such as API configuration, CORS, entrypoints, environment variables, and production build reliability." }
  ],
  stackMap: [
    { name: "Python", category: "Implementation language", usedFor: "Financial-data processing, backend logic, and analysis utilities." },
    { name: "FastAPI", category: "Backend & Integrations", usedFor: "API layer for valuation, article analysis, and data endpoints." },
    { name: "LLMs", category: "AI Tools & Workflow", usedFor: "Assisted article/news insight extraction and qualitative deal reasoning." },
    { name: "Financial APIs", category: "Backend & Integrations", usedFor: "Planned integration path for SEC/FMP/Finnhub/NewsAPI-style sources." },
    { name: "Supabase", category: "Cloud", usedFor: "Potential data/auth/storage layer for reports, user workspaces, or saved comparisons." },
    { name: "Vercel", category: "Cloud", usedFor: "Frontend deployment target and deployment-debugging context." }
  ],
  implementationDetails: [
    { title: "M&A workflow framing", body: "The prototype is organized around the actual flow a user would need: pick companies, ingest data, inspect news, compare assumptions, and generate a strategic view." },
    { title: "LLM-assisted analysis", body: "LLMs are positioned as an interpretation layer—not a source of truth—so the site can explain where a summary came from and keep financial reasoning grounded." },
    { title: "Deployment lessons", body: "The project gave useful practice with CORS, Vercel/FastAPI entrypoints, backend 502s, environment configuration, and the difference between prototype assumptions and live production data." }
  ],
  challengeSolutions: [
    { title: "Challenge: avoid fake precision", body: "Valuation tools can look authoritative even with prototype data. The solution path is to label assumptions clearly, connect outputs to sources, and distinguish prototype logic from live financial advice." },
    { title: "Challenge: reliability", body: "The app needed frontend, backend, API keys, and deployment settings to align. Debugging CORS, API routing, and Vercel/FastAPI structure became part of the learning outcome." }
  ],
  outcomes: [
    { title: "Separate project identity", body: "Selvam is now represented as its own ScarletHacks M&A intelligence prototype, not as the StarkHacks robotics-winning project." },
    { title: "Employer-facing case study", body: "The page shows financial AI product thinking, API architecture, deployment debugging, and LLM-assisted analysis in one explainable story." }
  ],
  metrics: [
    { label: "Project type", value: "M&A AI", note: "Valuation intelligence and merger-analysis concept" },
    { label: "Event context", value: "ScarletHacks", note: "Team hackathon prototype, not StarkHacks winner" },
    { label: "Stack areas", value: "6", note: "Backend, AI, data, finance APIs, deployment, product" }
  ],
  gallery: [
    { src: "/portfolio_images/stackmap/business-strategy.jpg", alt: "Project visual media for Selvam Valuations", caption: "A polished visual summary of the M&A intelligence prototype, financial analysis workflow, and AI product direction." }
  ],
  relatedProjectSlugs: ["ttp-outreach-automation", "fraud-detection", "course-recommendation"],
  relatedPostSlugs: ["debugging-vercel-supabase-deploys"],
  recruiterTakeaway: "Selvam shows that I can think beyond model demos: I can reason about a domain, design a product workflow, plan API/data architecture, and debug the practical deployment issues that make Full-Stack AI products real.",
  interviewTalkingPoints: [
    "How Selvam differs from the StarkHacks OBSERV-E robotics win.",
    "How I would ground LLM-generated finance insights in real sources and assumptions.",
    "What I learned about API deployment, CORS, and demo reliability.",
    "How the product could mature into a real M&A research assistant."
  ],
  resumeBullets: [
    "Contributed to Selvam Valuations, a ScarletHacks M&A intelligence prototype combining financial data, LLM-assisted article analysis, valuation workflows, and deployment debugging.",
    "Mapped financial-AI product requirements into backend/API, data, and user-facing comparison workflows while identifying reliability gaps around live data, CORS, environment configuration, and deployment."
  ],
  futureWork: [
    "Expand the gallery with additional ScarletHacks demo screenshots and valuation-report outputs.",
    "Replace prototype valuation outputs with live-source-backed calculations and clear assumptions.",
    "Add source attribution for financial/news data and improve report generation.",
    "Create a polished case-study diagram for the merger-lab pipeline."
  ],
  links: []
};
