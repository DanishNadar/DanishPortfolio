import portfolio from "./portfolio.json";

export interface SeedProject {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  summary?: string;
  long_description?: string;
  role?: string;
  domain?: string;
  domainSlug?: string;
  period?: string;
  status?: string;
  featured?: boolean;
  priority?: number;
  tech_stack?: string[];
  outcomes?: string[];
  lessons?: string[];
  metrics?: Record<string, unknown>;
  github_url?: string;
  live_demo_url?: string;
  article_url?: string;
  cover_image?: string;
  showcase?: string;
  detailCards?: { title: string; note: string }[];
  proof?: Record<string, string>;
  visualLabel?: string;
  visualHint?: string;
}

export interface SeedPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  post_type: string;
  source_url?: string;
  body_markdown?: string;
  generated_summary?: string;
  why_this_matters?: string;
  skills_shown?: string[];
  tags?: string[];
  cover_image_url?: string;
  image_urls?: string[];
  featured?: boolean;
  status: string;
  published_at?: string;
  isSample?: boolean;
  related_project_slugs?: string[];
  related_stack?: string[];
  suggested_caption?: string;
}

export interface SeedSkill {
  id: string;
  name: string;
  category?: string;
  description?: string;
  level?: number;
  sort_order?: number;
}

export interface SeedProfile {
  id: string;
  name: string;
  title?: string;
  location?: string;
  email?: string;
  github_url?: string;
  linkedin_url?: string;
  bio_short?: string;
  bio_long?: string;
  hero_image_url?: string;
  primary_photo_url?: string;
}

const raw = portfolio as Record<string, unknown>;
const rawProjects = (raw.projects as Record<string, unknown>[] | undefined) ?? [];

export const seedProjects: SeedProject[] = rawProjects.map((p, i) => ({
  id: (p.id as string) ?? `seed-${i}`,
  slug: (p.id as string) ?? `project-${i}`,
  title: (p.title as string) ?? "Untitled",
  summary: (p.summary as string) ?? "",
  role: p.role as string | undefined,
  domain: p.domain as string | undefined,
  domainSlug: p.domainSlug as string | undefined,
  period: p.period as string | undefined,
  status: "published",
  featured: i < 6,
  priority: 100 - i,
  tech_stack: (p.skills as string[]) ?? [],
  outcomes: (p.outcomes as string[]) ?? [],
  github_url: p.github as string | undefined,
  cover_image: p.image as string | undefined,
  showcase: p.showcase as string | undefined,
  detailCards: p.detailCards as { title: string; note: string }[] | undefined,
  proof: p.proof as Record<string, string> | undefined,
  visualLabel: p.visualLabel as string | undefined,
  visualHint: p.visualHint as string | undefined,
}));

export const seedProfile: SeedProfile = {
  id: "seed-profile",
  name: "Danish Nadar",
  title: "AI Engineer · Robotics · Autonomy",
  location: "Chicago · Illinois Tech",
  email: "danish.t.nadar@gmail.com",
  github_url: "https://github.com/DanishNadar",
  linkedin_url: "https://www.linkedin.com/in/danish-nadar",
  bio_short:
    "AI engineer building accessibility robotics, autonomous systems, and applied ML  -  from idea to working prototype.",
  bio_long:
    "I'm a BS/MS AI student at Illinois Tech focused on robotics, autonomy, applied ML, and security automation. EcoCAR sensor-fusion lead. StarkHacks 2026 winner.",
};

export const seedSkills: SeedSkill[] = [
  { id: "s-python", name: "Python", category: "Languages", level: 5, sort_order: 1 },
  { id: "s-ts", name: "Production App Workflows", category: "Languages", level: 4, sort_order: 2 },
  { id: "s-cpp", name: "C++", category: "Languages", level: 4, sort_order: 3 },
  { id: "s-pytorch", name: "PyTorch", category: "AI/ML", level: 5, sort_order: 4 },
  { id: "s-rtmaps", name: "RTMaps", category: "Robotics", level: 5, sort_order: 5 },
  { id: "s-claude", name: "Claude", category: "AI Tools", level: 5, sort_order: 6 },
  { id: "s-huggingface", name: "Hugging Face", category: "AI Tools", level: 4, sort_order: 7 },
  { id: "s-supabase", name: "Supabase", category: "Backend/Cloud", level: 4, sort_order: 7 },
  { id: "s-azure", name: "Azure", category: "Backend/Cloud", level: 3, sort_order: 8 },
];

// Sample DRAFT posts  -  clearly marked, not actually published to LinkedIn
export const seedPosts: SeedPost[] = [
  {
    id: "post-starkhacks-observe",
    slug: "starkhacks-2026-observ-e-win",
    title: "How we won StarkHacks 2026 with an accessibility robotics pitch",
    post_type: "event_recap",
    status: "draft",
    isSample: true,
    featured: true,
    published_at: "2026-03-15",
    generated_summary:
      "Reflections on winning StarkHacks 2026 with the Illinois Tech Robotics team  -  what we built, what almost broke, and why accessibility is the right north star.",
    body_markdown: `## The 48 hours

We walked into StarkHacks 2026 with a rough idea  -  what if a robot could act like a service dog for someone who is visually impaired? 48 hours later we walked out as winners.

## What we actually built

A minimum viable OBSERV-E loop: camera in, person/obstacle detection out, audio + haptic guidance to the user. The hardware was held together with zip ties. The software was held together with caffeine.

## What I learned

- A clear north star beats a clever architecture every time.
- Demo storytelling is half the score.
- Hardware hackathons reward teams who debug fast, not teams who plan long.

## What's next

OBSERV-E is now an umbrella for three concepts: GRVI (ground robot), DRVI (drone), HRVI (haptic receiver). The hackathon was step one.`,
    why_this_matters:
      "It shows that the accessibility-robotics direction resonates with judges, engineers, and the people it's meant to serve.",
    tags: ["robotics", "accessibility", "hackathon", "team"],
    skills_shown: ["Robotics", "Computer Vision", "Product"],
    related_project_slugs: ["observ-e", "selvam-valuations"],
    related_stack: ["python", "cpp", "rtmaps"],
    suggested_caption:
      "Won StarkHacks 2026 with the Illinois Tech Robotics team. We built the first prototype of OBSERV-E  -  assistive robotics for visually impaired users.",
  },
  {
    id: "post-ecocar-reflection",
    slug: "ecocar-sensor-fusion-reflection",
    title: "What sensor-fusion engineering on EcoCAR actually taught me",
    post_type: "reflection",
    status: "draft",
    isSample: true,
    featured: true,
    published_at: "2026-01-22",
    generated_summary:
      "A year of LiDAR + radar + camera time-syncing in RTMaps, and what shipping autonomy code in C++ on a real vehicle teaches you that no class can.",
    body_markdown: `## The gap between simulation and a real car

In class, the sensors agree with you. On a real EV, the LiDAR is 3ms late, the radar dropped a frame, and the camera is suddenly blinded by a low sun. Sensor fusion is the discipline of being right anyway.

## What changed how I think

- Requirements first, then code. Test plans force you to define "correct".
- C++ is not scary if you treat it like a hardware contract.
- The Stanley controller is elegant exactly because it is boring.

## Where I focused

Lead vehicle detection + driver attention pipeline. Both modules had to be fast enough for real-time, paranoid enough for safety, and small enough for the team's compute budget.`,
    why_this_matters:
      "Autonomy is where AI stops being a demo and starts being engineering. EcoCAR was my deep end.",
    tags: ["autonomy", "robotics", "ecocar", "sensor-fusion"],
    skills_shown: ["C++", "RTMaps", "Sensor Fusion"],
    related_project_slugs: ["ecocar-sensor-fusion", "rl-autonomous-driving"],
    related_stack: ["cpp", "rtmaps"],
    suggested_caption:
      "Wrapping a year as sensor-fusion lead on EcoCAR. A few notes on what shipping autonomy on a real EV teaches you.",
  },
  {
    id: "post-rl-driving",
    slug: "building-an-rl-lane-keeping-simulator",
    title: "Building a tiny RL lane-keeping simulator to ask better questions",
    post_type: "technical_writeup",
    status: "draft",
    isSample: true,
    published_at: "2025-12-05",
    generated_summary:
      "I built a lightweight PPO-trained lane-keeper in Python + Pygame to compare sensor configurations. The surprising part: more sensors did not always help.",
    body_markdown: `## Setup

PPO policy. Custom 2D simulator. Three sensor configs: camera-only, camera+LiDAR, full stack.

## Metrics that mattered

Reward, collision rate, off-road rate, task completion, lane deviation, distance traveled.

## The unintuitive result

Camera+LiDAR sometimes beat the full stack. More observations also means more noise to learn around with a small policy. Sensor design is a budget, not a buffet.`,
    tags: ["rl", "autonomy", "simulation", "ppo"],
    skills_shown: ["Python", "Reinforcement Learning", "Simulation"],
    related_project_slugs: ["rl-autonomous-driving"],
    related_stack: ["python"],
    suggested_caption:
      "Built a small RL lane-keeping simulator to compare sensor stacks. Sometimes less sensing helps.",
  },
  {
    id: "post-lane-detection",
    slug: "lane-detection-backbone-bake-off",
    title: "ResNet-18 vs EfficientNet vs MobileNet for monocular lane detection",
    post_type: "technical_writeup",
    status: "draft",
    isSample: true,
    published_at: "2025-11-20",
    generated_summary:
      "Adapting ONCE-3DLanes into a simpler 2D regression problem and comparing backbones on robustness, not just accuracy.",
    body_markdown: `## Why a study, not a contest

I cared more about *which backbone fails how* than which won a single number.

## What I did

- Reframed the 3D lane task as a tractable 2D regression problem.
- Trained ResNet-18 baseline, EfficientNet-B0, MobileNetV2.
- Stress-tested with brightness, contrast, blur, noise, shadow, and crop augmentations.

## What I'd do next

Add weather-shifted real data, not just synthetic augmentations. The robustness gap closes quickly when the model sees real adversarial conditions.`,
    tags: ["computer-vision", "research", "ml"],
    skills_shown: ["PyTorch", "Computer Vision", "Data Augmentation"],
    related_project_slugs: ["lane-detection-salad"],
    related_stack: ["python", "sklearn"],
    suggested_caption:
      "A monocular lane detection study comparing three backbones on robustness, not just leaderboard accuracy.",
  },
  {
    id: "post-dns-security",
    slug: "automating-spf-dkim-dmarc-screening",
    title: "Why I automated SPF / DKIM / DMARC screening for an MSP workflow",
    post_type: "technical_writeup",
    status: "draft",
    isSample: true,
    published_at: "2025-10-10",
    generated_summary:
      "Manual DNS posture checks across hundreds of domains is the kind of work that ages a person. So I scripted it  -  and validated against EasyDMARC.",
    body_markdown: `## The problem

Email security posture across many client domains is genuinely tedious to audit by hand.

## The script

Python + DNS queries + structured JSON/CSV reports. Validated against EasyDMARC so we trust the output.

## The lesson

Automation is not the hard part. Building automation that an ops team will actually adopt is the hard part  -  reports they can read, errors they can act on, and outputs the next tool downstream can consume.`,
    tags: ["security", "automation", "dns"],
    skills_shown: ["Python", "Security", "Automation"],
    related_project_slugs: ["dns-security-scanner"],
    related_stack: ["python", "security"],
    suggested_caption:
      "Wrote up the DNS email-authentication scanner I built for SPF/DKIM/DMARC screening. Why ops adoption matters as much as the script itself.",
  },
  {
    id: "post-scammantha",
    slug: "scammantha-scam-awareness-game",
    title: "Scammantha  -  a scam-awareness game for the Kitboga generation",
    post_type: "project_update",
    status: "draft",
    isSample: true,
    published_at: "2025-09-18",
    generated_summary:
      "An educational game concept where you play against an AI scammer in a safe environment, inspired by Kitboga, Scammer Payback, and Jim Browning.",
    body_markdown: `## The pitch

Most scam-awareness content is a slideshow. Scammantha is a game.

## How it works

You pick a scenario (IRS, tech support, romance, crypto). The AI plays a scammer. You try to spot the manipulation patterns and end the call. The game scores you on how quickly you noticed the red flags.

## Why now

LLMs are powerful enough to roleplay scammer scripts safely in an educational setting. Used carefully, this can teach a whole generation of users what to listen for.`,
    tags: ["security", "ai", "education", "game"],
    skills_shown: ["LLMs", "Product", "Game Design"],
    related_project_slugs: [],
    related_stack: ["python"],
    suggested_caption:
      "Concept post on Scammantha  -  a safe, educational scam-awareness game powered by LLMs.",
  },
  {
    id: "post-career-bootcamp",
    slug: "career-bootcamp-takeaways",
    title: "Five takeaways from a software engineering career bootcamp",
    post_type: "event_recap",
    status: "draft",
    isSample: true,
    published_at: "2025-08-30",
    generated_summary:
      "Less about the technical content, more about what changed in how I network, write, and frame my work.",
    body_markdown: `1. Your resume is a sales doc, not a transcript.
2. The strongest signal you can send is a working link.
3. Every engineer you meet is a potential future teammate  -  act like it.
4. Saying "I don't know yet" is a strength, not a tell.
5. Real conversations beat 100 cold messages.`,
    tags: ["career", "networking", "growth"],
    skills_shown: ["Communication"],
    related_project_slugs: [],
    related_stack: [],
    suggested_caption:
      "Five things that actually stuck with me from the bootcamp.",
  },
  {
    id: "post-networking-ink",
    slug: "networking-event-ink-factory",
    title: "Networking with intent  -  a reflection on the Ink Factory event",
    post_type: "reflection",
    status: "draft",
    isSample: true,
    published_at: "2025-08-01",
    generated_summary:
      "What changes when you walk into a networking event with two real questions instead of a stack of business cards.",
    body_markdown: `## The shift

I stopped trying to "network" and started trying to learn two specific things from each conversation. The room got smaller and the conversations got bigger.

## What worked

- One open question per person, not a pitch.
- Following up the same day with a one-line, specific thank-you.
- Asking who *they* think I should meet.`,
    tags: ["career", "networking"],
    skills_shown: ["Communication"],
    related_project_slugs: [],
    related_stack: [],
    suggested_caption: "Notes from the Ink Factory networking night.",
  },
  {
    id: "post-avatar-build",
    slug: "building-an-ai-avatar-portfolio",
    title: "Why my portfolio talks back  -  building the AI avatar layer",
    post_type: "project_update",
    status: "draft",
    isSample: true,
    published_at: "2025-07-12",
    generated_summary:
      "A portfolio is a static document. An avatar is a conversation. Here's the design direction behind the AI layer of my site.",
    body_markdown: `## The thesis

Busy technical readers do not read top-to-bottom. They scan. An avatar that routes them to the right project in one question respects their time.

## What it does today

Local rule-based router. Browser TTS. Suggests routes based on the question.

## What's next

Cloned voice via XTTS-v2. A real 3D model. Personality state machine (idle / thinking / projectMode / leadershipMode).`,
    tags: ["product", "ai", "portfolio"],
    skills_shown: ["Claude", "Hugging Face", "LLMs", "Product"],
    related_project_slugs: ["aila-avatar"],
    related_stack: ["python", "apis"],
    suggested_caption: "On why my portfolio has an AI avatar  -  and the design direction behind it.",
  },
  {
    id: "post-why-accessibility",
    slug: "why-accessibility-robotics",
    title: "Why robotics  -  and why accessibility specifically",
    post_type: "reflection",
    status: "draft",
    isSample: true,
    published_at: "2025-06-04",
    generated_summary:
      "The shortest answer: I want to build the thing that helps the person, not the thing that wins the demo.",
    body_markdown: `Robotics is the field where AI has to be embodied, accountable, and useful in the same moment.

Accessibility is the use case where that combination is *non-negotiable*. The robot either helps the user navigate, or it doesn't. There is no "the model is technically interesting" loophole.

That's why OBSERV-E exists.`,
    tags: ["robotics", "accessibility", "values"],
    skills_shown: ["Product"],
    related_project_slugs: ["observ-e"],
    related_stack: [],
    suggested_caption:
      "Why robotics, and why accessibility specifically. The shortest version of my answer.",
  },
  {
    id: "post-debug-deploy",
    slug: "debugging-vercel-supabase-deploys",
    title: "The 4 deploy bugs you only learn about in production",
    post_type: "technical_writeup",
    status: "draft",
    isSample: true,
    published_at: "2025-05-15",
    generated_summary:
      "Notes from production fixes on an AI headshot platform  -  env vars, edge runtimes, Stripe webhooks, and Supabase auth quirks.",
    body_markdown: `1. The env var that exists locally but not in prod. Always.
2. The edge runtime that doesn't support your favorite npm package.
3. The Stripe webhook that worked once and never sent a signature header again.
4. The Supabase RLS policy that locks YOU out before it locks anyone else out.`,
    tags: ["deployment", "debugging", "vercel", "supabase"],
    skills_shown: ["Production App Workflows", "Supabase", "Vercel"],
    related_project_slugs: ["ai-headshot-platform"],
    related_stack: ["supabase", "vercel"],
    suggested_caption:
      "Four deploy bugs you only learn about in production.",
  },
  {
    id: "post-ttp-automation",
    slug: "ttp-streamlit-outreach-automation",
    title: "Going from a CLI script to a Streamlit tool an ops team will actually use",
    post_type: "project_update",
    status: "draft",
    isSample: true,
    published_at: "2025-04-20",
    generated_summary:
      "Wrapping the DNS scanner in Streamlit + Microsoft Graph outreach turned a personal script into a tool the team can run.",
    body_markdown: `## The arc

Script → Streamlit UI → Graph API outreach → batch mode for 100+ domains/contacts → test/live toggles.

## The lesson

The interface is the product. The model is just the engine.`,
    tags: ["automation", "security", "product"],
    skills_shown: ["Python", "Streamlit", "Microsoft Graph"],
    related_project_slugs: ["dns-security-scanner"],
    related_stack: ["python", "apis"],
    suggested_caption: "Wrapping the DNS scanner in Streamlit + Microsoft Graph outreach.",
  },
];

