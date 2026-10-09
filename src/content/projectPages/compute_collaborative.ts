import type { ProjectPageContent } from "./types";

export const project: ProjectPageContent = {
  slug: "compute-collaborative",
  title: "Compute Collaborative",
  subtitle:
    "The technical and financial case for governed, student-run GPU infrastructure at Illinois Tech.",
  heroStatement:
    "Compute Collaborative is a funding-proposal site for a student GPU suite: a workload explorer, a budget builder and an own-versus-rent model, where every cost figure opens its assumptions and sources.",
  pageTheme: {
    eyebrow: "GPU Infrastructure Initiative",
    gradient: "from-sky-500/25 via-slate-900/30 to-rose-800/15",
    icon: "CaseStudy",
  },
  quickFacts: [
    { label: "Role", value: "Initiative lead and site author" },
    { label: "Status", value: "Proposal · open source" },
    { label: "Deployment", value: "No cluster has been deployed" },
    { label: "Focus", value: "Workloads, budgets, governance" },
  ],
  problem:
    "Student AI work needs GPUs, but cloud rental costs add up and shared hardware needs governance. A funding decision needs the trade-offs laid out transparently.",
  motivation:
    "Give decision-makers an interactive model of workloads and costs instead of a static slide, with every number traceable to an assumption.",
  myRole: [
    "Framed the initiative and wrote the proposal.",
    "Built the workload explorer, budget builder and own-versus-rent model.",
    "Documented assumptions and sources for every cost figure.",
  ],
  whatIBuilt: [
    "A workload explorer describing the kinds of student jobs the suite would serve.",
    "A budget builder for hardware and operating costs.",
    "An own-versus-rent comparison with visible assumptions.",
  ],
  architecture: [
    { title: "Workloads", body: "Representative student AI workloads and their compute needs." },
    {
      title: "Costs",
      body: "Hardware, operations and rental alternatives with cited assumptions.",
    },
    { title: "Decision", body: "Own-versus-rent comparison to support a funding decision." },
  ],
  stackMap: [
    { name: "HTML", category: "Front end", usedFor: "Static proposal site." },
    { name: "CSS", category: "Front end", usedFor: "Layout and presentation." },
    { name: "JavaScript", category: "Front end", usedFor: "Interactive explorer and calculators." },
    { name: "Cost modeling", category: "Analysis", usedFor: "Own-versus-rent and budget models." },
  ],
  implementationDetails: [
    { title: "Traceable figures", body: "Every cost opens its assumptions and sources." },
    { title: "Interactive budgets", body: "Decision-makers can change inputs and see the effect." },
  ],
  challengeSolutions: [
    { title: "Credibility", body: "Transparent assumptions instead of headline numbers." },
    {
      title: "Governance",
      body: "The proposal treats access and fair use as first-class requirements.",
    },
  ],
  outcomes: [
    {
      title: "Proposal ready for review",
      body: "An interactive case for governed student GPU infrastructure.",
    },
  ],
  metrics: [],
  gallery: [],
  relatedProjectSlugs: ["campgrids", "morph"],
  relatedPostSlugs: [],
  impactTakeaway:
    "Compute Collaborative shows infrastructure thinking that includes cost, governance and how decisions get made, not just hardware.",
  interviewTalkingPoints: [
    "How to make a cost model credible: expose every assumption.",
    "Own versus rent for bursty student AI workloads.",
  ],
  resumeBullets: [
    "Led a student GPU-infrastructure initiative; built an interactive proposal with a workload explorer, budget builder and own-versus-rent model with sourced assumptions.",
  ],
  futureWork: ["Pilot with a small node and publish utilization data before scaling."],
  links: [],
};
