import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers3,
  Network,
  Sparkles,
} from "lucide-react";
import portfolio from "@/data/portfolio.json";
import { projectPages } from "@/content/projectPages";
import { postPages } from "@/content/postPages";
import { MotionPage } from "@/components/MotionPage";
import { TechnicalHighlight } from "@/components/TechnicalHighlight";
import { SectionReveal } from "@/components/SectionReveal";
import { ImageSlot } from "@/components/ImageSlot";
import { ImageZoomButton } from "@/components/ImageLightbox";
import { StableSearchBox } from "@/components/StableSearchBox";

interface PortfolioSkill {
  slug: string;
  name: string;
  category: string;
  short: string;
  projects: string[];
  link?: string;
}

type StackRecord = PortfolioSkill & {
  linkedProjects: typeof projectPages;
  linkedPosts: typeof postPages;
  searchText: string;
};

const STACK_ITEMS_PER_PAGE = 12;

const AI_ENGINEER_PRIORITY = [
  "python",
  "applied-machine-learning",
  "pytorch",
  "deep-learning",
  "computer-vision-ml",
  "llms",
  "model-evaluation",
  "data-pipelines",
  "model-deployment",
  "fastapi",
  "sensor-fusion",
  "autonomous-systems",
  "machine-learning",
  "feature-engineering",
  "natural-language-processing",
  "vlms",
  "agentic-systems",
  "opencv",
  "yolo",
  "sklearn",
  "tensorflow",
  "neural-networks",
  "evaluation-metrics",
  "data-science",
  "data-eda",
  "sql",
  "postgresql",
  "apis",
  "rest-apis",
  "linux-development",
  "testing",
  "systems-integration",
  "ros2",
  "reinforcement-learning",
  "ppo",
  "signal-processing",
  "rtmaps",
  "aws",
  "azure-ai-foundry",
  "azure",
  "cloud-architecture",
  "cloud-automation",
  "supabase",
  "vercel-ci-cd",
  "hugging-face",
  "hf-inference-providers",
  "hugging-face-spaces",
  "cpp",
  "typescript",
  "java",
  "scripting",
  "process-automation",
  "documentation",
  "requirements-engineering",
  "agile-project-management",
] as const;

const aiEngineerRank = new Map(AI_ENGINEER_PRIORITY.map((slug, index) => [slug, index]));

const categoryPriority = new Map(
  [
    "ML",
    "Robotics",
    "Language",
    "AI Tools & Workflow",
    "Backend & Integrations",
    "Cloud",
    "Security & Domain",
    "Leadership & Professional",
  ].map((category, index) => [category, index]),
);

function compareForAiEngineering(a: PortfolioSkill, b: PortfolioSkill) {
  const aRank = aiEngineerRank.get(a.slug);
  const bRank = aiEngineerRank.get(b.slug);

  if (aRank !== undefined || bRank !== undefined) {
    if (aRank === undefined) return 1;
    if (bRank === undefined) return -1;
    return aRank - bRank;
  }

  const categoryDifference =
    (categoryPriority.get(a.category) ?? categoryPriority.size) -
    (categoryPriority.get(b.category) ?? categoryPriority.size);

  return categoryDifference || a.name.localeCompare(b.name);
}

export const Route = createFileRoute("/stack-map")({
  validateSearch: (search: Record<string, unknown>) => ({
    page: Math.max(1, Number(search.page) || 1),
    q: typeof search.q === "string" ? search.q : "",
    category: typeof search.category === "string" ? search.category : "all",
    stackJump: search.stackJump === "search" ? "search" : "",
  }),
  head: () => ({
    meta: [
      { title: "Stack Map  -  Danish Nadar" },
      {
        name: "description",
        content:
          "A searchable, paginated map of Danish Nadar's languages, AI tools, ML stack, robotics systems, cloud integrations, security automation, education, and project record.",
      },
    ],
  }),
  component: StackMapPage,
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

function getStackMatches(skill: PortfolioSkill) {
  const lowerSlug = skill.slug.toLowerCase();
  const lowerName = skill.name.toLowerCase();
  const linkedProjects = projectPages.filter((project) => {
    const explicit = skill.projects.includes(project.slug);
    const stackHit = project.stackMap.some((item) => {
      const haystack =
        `${item.name} ${item.category} ${item.usedFor} ${item.context ?? ""}`.toLowerCase();
      return haystack.includes(lowerName) || haystack.includes(lowerSlug);
    });
    const bodyHit =
      `${project.title} ${project.subtitle} ${project.heroStatement} ${project.impactTakeaway}`
        .toLowerCase()
        .includes(lowerName);
    return explicit || stackHit || bodyHit;
  });
  const linkedPosts = postPages.filter((post) => {
    const stackHit = post.relatedStack.some(
      (item) =>
        item.toLowerCase() === lowerSlug ||
        item.toLowerCase() === lowerName ||
        item.toLowerCase().includes(lowerName),
    );
    const tagHit = post.tags.some((tag) => tag.toLowerCase().includes(lowerName));
    const bodyHit = `${post.title} ${post.subtitle} ${post.summary}`
      .toLowerCase()
      .includes(lowerName);
    return stackHit || tagHit || bodyHit;
  });
  return { linkedProjects, linkedPosts };
}

const educationHighlights = [
  "B.S. in Artificial Intelligence at Illinois Tech, Minor in Data Science, 2027",
  "M.A.S. in Artificial Intelligence path at Illinois Tech",
  "A.A.S. Cloud Computing & Network Technology foundation from Montgomery College",
  "Data Catalyst, AI Professional Skills, Python & Data, Querying Data, TestOut Network Pro, and TestOut PC Pro certifications",
];

const categoryDetails: Record<string, { kicker: string; description: string }> = {
  Language: {
    kicker: "Implementation languages",
    description:
      "Programming languages I use to build AI experiments, robotics logic, security automation, data workflows, and production-facing tools.",
  },
  ML: {
    kicker: "Applied model-building lane",
    description:
      "Machine learning, data science, evaluation, EDA, model design, and research adaptation skills connected to coursework, certifications, and product work.",
  },
  "AI Tools & Workflow": {
    kicker: "AI acceleration and model ecosystem",
    description:
      "Claude, ChatGPT, Copilot, Hugging Face, and model tools I use to prototype faster, build responsibly, and turn ideas into implementation plans.",
  },
  Robotics: {
    kicker: "Robotics, perception, and autonomy lane",
    description:
      "Autonomy, computer vision, sensor fusion, controls, simulation, and real-time vehicle/robotics skills tied to OBSERV-E, EcoCAR, and accessibility robotics.",
  },
  Cloud: {
    kicker: "Cloud and AI infrastructure",
    description:
      "AWS, Azure, databases, CI/CD, and cloud workflow skills tied to AI product delivery and professional software automation work.",
  },
  "Backend & Integrations": {
    kicker: "Systems and integration layer",
    description:
      "Linux development, APIs, automation, requirements, testing, backend services, Microsoft Graph, FastAPI, scripting, and integration glue that connect models, data, workflows, and users.",
  },
  "Security & Domain": {
    kicker: "Security and domain automation",
    description:
      "DNS, SPF, DKIM, DMARC, email-authentication, phishing detection, and domain-focused tooling tied to professional software automation work.",
  },
  "Leadership & Professional": {
    kicker: "Leadership and execution",
    description:
      "Team leadership, stakeholder alignment, coaching, documentation, workshop design, budgeting, and program-building skills that make technical delivery sustainable.",
  },
};

function categoryDetail(category: string) {
  return (
    categoryDetails[category] ?? {
      kicker: "Portfolio stack lane",
      description: "A connected skill area with project, writing, and professional context.",
    }
  );
}

const categoryColorMap: Record<string, string> = {
  "AI/ML": "from-cyan-400 to-blue-500",
  "AI Tools": "from-violet-400 to-purple-600",
  "Backend/Cloud": "from-sky-400 to-indigo-500",
  Languages: "from-rose-400 to-pink-500",
  Robotics: "from-emerald-400 to-teal-500",
  "Security & Domain": "from-amber-400 to-red-500",
  "Leadership & Professional": "from-amber-300 to-orange-500",
};

function categoryGradient(cat: string) {
  return categoryColorMap[cat] ?? "from-blue-400 to-violet-500";
}

function skillImagePath(slug: string) {
  return `/portfolio_images/stackmap/${slug}.jpg`;
}

function StackMapPage() {
  const skills = (portfolio as unknown as { skills: PortfolioSkill[] }).skills;
  const { page, q, category, stackJump } = Route.useSearch();
  const [activeCategory, setActiveCategory] = useState(category || "all");
  const [searchTerm, setSearchTerm] = useState((q || "").toLowerCase());
  const [searchFocusSignal, setSearchFocusSignal] = useState(0);

  useEffect(() => {
    setSearchTerm((q || "").toLowerCase());
    setActiveCategory(category || "all");
  }, [q, category]);

  useEffect(() => {
    const shouldJumpToSearch = Boolean(q) && stackJump === "search";
    if (!shouldJumpToSearch) return;

    const timer = window.setTimeout(() => {
      document.getElementById("stack-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
      setSearchFocusSignal((value) => value + 1);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [q, stackJump]);

  const records = useMemo<StackRecord[]>(() => {
    return skills
      .map((skill) => {
        const matches = getStackMatches(skill);
        const searchText = [
          skill.name,
          skill.slug,
          skill.category,
          skill.short,
          ...matches.linkedProjects.map((project) => `${project.title} ${project.heroStatement}`),
          ...matches.linkedPosts.map(
            (post) => `${post.title} ${post.summary} ${post.tags.join(" ")}`,
          ),
        ]
          .join(" ")
          .toLowerCase();
        return { ...skill, ...matches, searchText };
      })
      .sort(compareForAiEngineering);
  }, [skills]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set<string>(records.map((item) => item.category)));
    return unique.sort((a, b) => {
      return (
        (categoryPriority.get(a) ?? categoryPriority.size) -
          (categoryPriority.get(b) ?? categoryPriority.size) || a.localeCompare(b)
      );
    });
  }, [records]);

  const featuredJumps = useMemo(() => {
    const bySlug = new Map(records.map((skill) => [skill.slug, skill]));
    return AI_ENGINEER_PRIORITY.slice(0, 18)
      .map((slug) => bySlug.get(slug))
      .filter(Boolean) as StackRecord[];
  }, [records]);

  const filtered = useMemo(() => {
    const matches = records.filter((skill) => {
      if (activeCategory !== "all" && skill.category !== activeCategory) return false;
      if (searchTerm && !skill.searchText.includes(searchTerm)) return false;
      return true;
    });
    if (!searchTerm) return matches;
    return [...matches].sort((a, b) => {
      const score = (s: StackRecord) => {
        const name = s.name.toLowerCase();
        const slug = s.slug.toLowerCase();
        if (name === searchTerm) return 0;
        if (slug === searchTerm) return 1;
        if (name.startsWith(searchTerm)) return 2;
        if (slug.startsWith(searchTerm)) return 3;
        if (name.includes(searchTerm)) return 4;
        if (slug.includes(searchTerm)) return 5;
        if (s.short.toLowerCase().includes(searchTerm)) return 6;
        return 7;
      };
      return score(a) - score(b) || compareForAiEngineering(a, b);
    });
  }, [activeCategory, records, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / STACK_ITEMS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * STACK_ITEMS_PER_PAGE;
  const visibleSkills = filtered.slice(startIndex, startIndex + STACK_ITEMS_PER_PAGE);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const totalProjectLinks = useMemo(
    () => records.reduce((sum, skill) => sum + skill.linkedProjects.length, 0),
    [records],
  );
  const totalPostLinks = useMemo(
    () => records.reduce((sum, skill) => sum + skill.linkedPosts.length, 0),
    [records],
  );

  return (
    <MotionPage className="mx-auto w-full max-w-[1580px] px-4 sm:px-6 lg:px-10 py-12 md:py-16 stack-map-page">
      <section
        id="top"
        className="stack-map-hero glass premium-border rounded-[2rem] p-6 md:p-8 lg:p-10 overflow-hidden scroll-mt-28"
      >
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_34rem] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-2 text-xs font-tech uppercase tracking-[0.16em] text-accent">
              <Network className="h-4 w-4" /> Searchable project stack
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl xl:text-7xl font-display font-bold animated-title-glow">
              Stack <span className="text-gradient-rb">Map</span>
            </h1>
            <p className="mt-5 max-w-6xl text-base md:text-lg leading-8 text-muted-foreground">
              <TechnicalHighlight text="A searchable, paginated map of the tools behind my work: languages, AI workflows, machine learning, robotics and autonomy, cloud, backend integrations, security automation, systems engineering, and leadership. Tags and article references can now open this page with the exact search already applied, so employers can move from story to depth in one click." />
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                [records.length, "stack items"],
                [projectPages.length, "project pages"],
                [postPages.length, "articles"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border/70 bg-background/35 p-4 text-center shadow-lg shadow-blue-950/20"
                >
                  <div className="font-logo text-2xl md:text-4xl text-accent">{value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ImageSlot
            id="SM-01"
            title="Stack Map hero image"
            guidance="Use a clean desk, robot, code editor, lab, or whiteboard image that visually introduces your technical ecosystem."
            src="/portfolio_images/stackmap/stackmap-hero.jpg"
            aspect="aspect-[4/3]"
          />
        </div>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-5">
        <div className="stack-summary-card rounded-3xl glass p-6 premium-border">
          <Sparkles className="h-5 w-5 text-accent" />
          <div className="mt-4 font-display text-xl">Depth, not keywords</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Every entry connects to shipped work, a real role, or a documented outcome than a
            self-reported badge.
          </p>
        </div>
        <div className="stack-summary-card rounded-3xl glass p-6 premium-border">
          <div className="font-logo text-3xl text-gradient-rb">{records.length}</div>
          <div className="mt-3 font-display text-xl">Skills with context</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Each entry is backed by a project, role, or technical write-up, traceable from this
            page.
          </p>
        </div>
        <div className="stack-summary-card rounded-3xl glass p-6 premium-border">
          <div className="font-logo text-3xl text-gradient-rb">{categories.length}</div>
          <div className="mt-3 font-display text-xl">Technical domains</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            <TechnicalHighlight text="AI/ML engineering, robotics, security, cloud, backend systems, and leadership. Breadth with depth in each." />
          </p>
        </div>
        <div className="stack-summary-card rounded-3xl glass p-6 premium-border">
          <div className="font-logo text-3xl text-gradient-rb">{totalProjectLinks}</div>
          <div className="mt-3 font-display text-xl">Skill → project links</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Cross-references between individual skills and case studies. Trace any capability back
            to real work.
          </p>
        </div>
        <div className="stack-summary-card rounded-3xl glass p-6 premium-border">
          <div className="font-logo text-3xl text-gradient-rb">{totalPostLinks}</div>
          <div className="mt-3 font-display text-xl">Skill → article links</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Writing tied to technical skills, so employers can see how I explain and apply what I
            know, not just that I know it.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        <ImageSlot
          id="SM-02"
          title="Systems diagram or whiteboard"
          guidance="Place a diagram showing how your tools connect across AI, robotics, cloud, backend, and security automation."
          src="/portfolio_images/stackmap/systems-diagram.jpg"
        />
        <ImageSlot
          id="SM-03"
          title="Tools in action"
          guidance="Use a screenshot or photo showing your development environment, robot testing setup, or project dashboard."
          src="/portfolio_images/stackmap/workstation-stack.jpg"
        />
      </section>

      <nav
        className="stack-horizontal-nav mt-10 mb-12 glass premium-border rounded-[1.75rem] p-4 md:p-5"
        aria-label="Stack map jump navigation"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-tech uppercase tracking-[0.14em] text-foreground">
              <Layers3 className="h-4 w-4 text-accent" /> Quick jumps
            </div>
            <button
              onClick={() => jumpTo("stack-list")}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/30 px-3.5 py-2 text-xs font-tech uppercase tracking-[0.12em] text-muted-foreground hover:text-accent hover:border-accent/70 transition"
            >
              Open stack list <ArrowDownRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="stack-chip-row">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  jumpTo("stack-list");
                }}
                className="stack-jump-chip stack-jump-chip-primary"
              >
                {category}
              </button>
            ))}
          </div>
          <div className="stack-chip-row">
            {featuredJumps.map((skill) => (
              <button
                key={skill.slug}
                onClick={() => {
                  setActiveCategory("all");
                  setSearchTerm(skill.name.toLowerCase());
                  jumpTo("stack-list");
                }}
                className="stack-jump-chip stack-jump-chip-skill"
                title={`Search for ${skill.name}`}
              >
                {skill.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <SectionReveal>
        <section
          id="stack-education"
          className="stack-section scroll-mt-36 rounded-[2rem] border border-border/70 bg-background/25 p-5 sm:p-7 lg:p-8"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
                Education & certifications
              </div>
              <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">
                Credential-backed foundation
              </h2>
            </div>
            <button onClick={() => jumpTo("top")} className="stack-back-button">
              <ArrowUp className="h-3.5 w-3.5" /> Back to top
            </button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {educationHighlights.map((item) => (
              <div
                key={item}
                className="glass rounded-2xl p-5 text-sm leading-7 text-muted-foreground premium-border"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </SectionReveal>

      <main id="stack-list" className="mt-12 stack-map-content scroll-mt-28">
        <div className="rounded-[2rem] border border-border/70 bg-background/25 p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
                Searchable Stack Map
              </div>
              <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">
                Find the tools behind the work
              </h2>
              <p className="mt-3 max-w-3xl text-sm md:text-base leading-7 text-muted-foreground">
                Search by tool, category, project, or topic. The results are paginated so the page
                does not overload the browser.
              </p>
            </div>
            <button onClick={() => jumpTo("top")} className="stack-back-button">
              <ArrowUp className="h-3.5 w-3.5" /> Back to top
            </button>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 items-center">
            <StableSearchBox
              value={searchTerm}
              onSearch={(value) => setSearchTerm(value.toLowerCase())}
              onClear={() => setSearchTerm("")}
              placeholder="Search stack map…"
              label="Search stack map"
              maxLength={120}
              focusSignal={searchFocusSignal}
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`text-xs px-3 py-1.5 rounded-full transition living-chip ${activeCategory === "all" ? "bg-gradient-rb text-background font-semibold" : "glass"}`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-xs px-3 py-1.5 rounded-full transition living-chip ${activeCategory === category ? `bg-gradient-to-r ${categoryGradient(category)} text-background font-semibold` : "glass hover:bg-muted/40"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {searchTerm ? (
            <div className="mt-5 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-slate-100">
              Showing Stack Map results for{" "}
              <span className="font-semibold text-accent">{searchTerm}</span>. Clear the search box
              to return to the full map.
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <div>
              Showing <span className="text-foreground font-semibold">{visibleSkills.length}</span>{" "}
              of <span className="text-foreground font-semibold">{filtered.length}</span> matching
              stack items
              {filtered.length > STACK_ITEMS_PER_PAGE ? (
                <span>
                  {" "}
                  · page {currentPage} of {totalPages}
                </span>
              ) : null}
            </div>
            {activeCategory !== "all" ? (
              <div className="rounded-full border border-border px-3 py-1 text-xs text-accent">
                {categoryDetail(activeCategory).kicker}
              </div>
            ) : null}
          </div>

          {activeCategory !== "all" && (
            <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
              {categoryDetail(activeCategory).description}
            </p>
          )}

          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-7 lg:gap-9"
            data-card-entrance="off"
          >
            {filtered.length === 0 && (
              <div className="col-span-full glass rounded-2xl p-10 text-center text-muted-foreground">
                No stack items match that search yet.
              </div>
            )}
            {visibleSkills.map((skill) => (
              <StackCard key={skill.slug} skill={skill} />
            ))}
          </motion.div>

          {filtered.length > STACK_ITEMS_PER_PAGE && (
            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
              aria-label="Stack map pagination"
            >
              <PageLink
                page={Math.max(1, currentPage - 1)}
                disabled={currentPage === 1}
                label="Previous"
                icon="prev"
              />
              {pageNumbers.map((pageNumber) => (
                <PageLink
                  key={pageNumber}
                  page={pageNumber}
                  active={pageNumber === currentPage}
                  label={String(pageNumber)}
                />
              ))}
              <PageLink
                page={Math.min(totalPages, currentPage + 1)}
                disabled={currentPage === totalPages}
                label="Next"
                icon="next"
              />
            </nav>
          )}
        </div>
      </main>
    </MotionPage>
  );
}

function StackCard({ skill }: { skill: StackRecord }) {
  return (
    <article
      id={`skill-${skill.slug}`}
      className="skill-context-card scroll-mt-36 rounded-3xl border border-border/70 bg-background/45 p-5 md:p-6 premium-border"
    >
      <div className="stack-card-image-wrap mb-5">
        <img
          src={skillImagePath(skill.slug)}
          alt={`${skill.name} stack visual`}
          loading="lazy"
          className="stack-card-image"
        />
        <ImageZoomButton src={skillImagePath(skill.slug)} alt={`${skill.name} stack visual`} />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-accent">{skill.category}</div>
          <h3 className="mt-2 text-2xl font-display font-semibold">{skill.name}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{skill.short}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Related projects
          </div>
          <div className="space-y-2.5">
            {skill.linkedProjects.slice(0, 3).map((project) => (
              <Link
                key={project.slug}
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="stack-context-link"
              >
                <span>{project.title}</span>
                <ArrowDownRight className="h-3.5 w-3.5" />
              </Link>
            ))}
            {skill.linkedProjects.length === 0 && (
              <Link to="/resume" className="stack-context-link">
                <span>See resume context</span>
                <ArrowDownRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
        <div>
          <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Related writing
          </div>
          <div className="space-y-2.5">
            {skill.linkedPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to="/posts/$slug"
                params={{ slug: post.slug }}
                className="stack-context-link"
              >
                <span>{post.title}</span>
                <ArrowDownRight className="h-3.5 w-3.5" />
              </Link>
            ))}
            {skill.linkedPosts.length === 0 && (
              <Link
                to="/posts/$slug"
                params={{ slug: `stack-${skill.slug}` }}
                className="stack-context-link"
              >
                <span>Read generated stack note</span>
                <ArrowDownRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {skill.link && (
        <a
          href={skill.link}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-xs font-tech uppercase tracking-[0.12em] text-accent hover:underline"
        >
          Reference <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </article>
  );
}

function PageLink({
  page,
  label,
  active = false,
  disabled = false,
  icon,
}: {
  page: number;
  label: string;
  active?: boolean;
  disabled?: boolean;
  icon?: "prev" | "next";
}) {
  const { q, category } = Route.useSearch();
  const content = (
    <>
      {icon === "prev" && <ChevronLeft className="h-3.5 w-3.5" />}
      {label}
      {icon === "next" && <ChevronRight className="h-3.5 w-3.5" />}
    </>
  );

  if (disabled) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground/50 cursor-not-allowed">
        {content}
      </span>
    );
  }

  return (
    <Link
      to="/stack-map"
      search={{ page, q, category }}
      className={`inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm transition ${active ? "border-transparent bg-gradient-rb text-background font-semibold" : "border-border glass hover:text-accent"}`}
      aria-current={active ? "page" : undefined}
    >
      {content}
    </Link>
  );
}

function getPageNumbers(currentPage: number, totalPages: number) {
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
