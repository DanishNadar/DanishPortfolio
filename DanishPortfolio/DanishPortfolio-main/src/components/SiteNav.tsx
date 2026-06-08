import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { projectPages } from "@/content/projectPages";
import { SocialLinks } from "@/components/SocialLinks";

const activeNavClass = "text-background bg-gradient-rb shadow-lg shadow-blue-950/30 ring-1 ring-accent/40";
const inactiveNavClass = "text-muted-foreground hover:text-foreground hover:bg-muted/35";

const links = [
  { to: "/gallery", label: "Gallery" },
  { to: "/stack-map", label: "Stack Map" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

const journeyGroups = [
  {
    label: "Engineering",
    links: [
      { to: "/autonomous-vehicles", label: "Autonomy", description: "EcoCAR sensor fusion, safety-first systems, and the engineering mission." },
      { to: "/illinois-tech", label: "Illinois Tech", description: "Computer Science at IIT — the academic foundation behind the work." },
    ],
  },
  {
    label: "Leadership",
    links: [
      { to: "/leadership-academy", label: "Leadership Academy", description: "Formal development programs and the habits they built." },
      { to: "/student-organizations", label: "Student Organizations", description: "EcoCAR, clubs, and communities at Illinois Tech." },
    ],
  },
  {
    label: "People & Ideas",
    links: [
      { to: "/friends", label: "Friends", description: "The people who shaped the journey." },
      { to: "/inspirations", label: "Inspirations", description: "The thinkers, builders, and ideas that shaped how I approach engineering and life." },
    ],
  },
];

// All pathway links flattened (used for mobile nav)
const pathwayLinks = journeyGroups.flatMap((g) => g.links);

const featuredPosts = [
  { slug: "starkhacks-2026-observ-e-win", title: "How We Won the World's Largest Hardware Hackathon", tag: "Hackathon" },
  { slug: "ecocar-sensor-fusion-reflection", title: "What Sensor-Fusion Engineering on EcoCAR Taught Me", tag: "Autonomy" },
  { slug: "building-an-rl-lane-keeping-simulator", title: "Building an RL Lane-Keeping Simulator", tag: "Robotics" },
  { slug: "building-an-ai-avatar-portfolio", title: "Building the AI Avatar Portfolio System", tag: "AI" },
  { slug: "automating-spf-dkim-dmarc-screening", title: "Automating SPF, DKIM, and DMARC Screening", tag: "Security" },
];

const projectGroups = [
  "Accessibility Robotics",
  "Autonomy Systems",
  "Machine Learning",
  "Cybersecurity",
  "AI Product",
  "Hackathon Build",
  "Other",
] as const;

function projectGroup(project: (typeof projectPages)[number]) {
  const eyebrow = project.pageTheme?.eyebrow ?? "Other";
  if (/accessibility|robot/i.test(eyebrow)) return "Accessibility Robotics";
  if (/autonomy|vehicle|lane|driving/i.test(`${eyebrow} ${project.title}`)) return "Autonomy Systems";
  if (/machine|learning|fraud|course|recommend/i.test(`${eyebrow} ${project.title}`)) return "Machine Learning";
  if (/security|dns|phishing|scam|automation/i.test(`${eyebrow} ${project.title}`)) return "Cybersecurity";
  if (/avatar|assistant|headshot|shopping|product|platform/i.test(`${eyebrow} ${project.title}`)) return "AI Product";
  if (/hackathon|selvam|stark/i.test(`${eyebrow} ${project.title}`)) return "Hackathon Build";
  return "Other";
}

function PathwaysDropdown() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={close} onFocus={() => setOpen(true)}>
      <button className={`nav-link px-3.5 py-2.5 text-[0.95rem] transition-colors rounded-md inline-flex items-center gap-1.5 ${inactiveNavClass}`}>
        The Journey. <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute left-1/2 top-full z-50 w-96 -translate-x-1/2 pt-3 transition duration-150 ${open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"}`}>
        <div className="rounded-2xl border border-border/70 bg-background/95 shadow-2xl shadow-blue-950/30 backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-3 bg-gradient-to-r from-blue-500/10 via-transparent to-rose-800/10">
            <div className="text-xs font-semibold text-foreground">The Journey.</div>
            <Link to="/about" onClick={close} className="shrink-0 rounded-lg bg-gradient-rb px-3 py-1 text-xs font-semibold text-background">
              About me
            </Link>
          </div>
          <div className="max-h-[420px] overflow-y-auto journey-dropdown-scroll">
            {journeyGroups.map(({ label, links: groupLinks }) => (
              <div key={label}>
                <div className="px-5 pt-3 pb-1 text-[10px] uppercase tracking-[0.18em] text-accent/80 font-tech">{label}</div>
                {groupLinks.map(({ to, label: linkLabel, description }) => (
                  <Link key={to} to={to} onClick={close} className="flex items-start gap-3 px-5 py-3 text-sm hover:bg-muted/50 transition border-b border-border/20 last:border-0">
                    <div>
                      <div className="font-semibold text-foreground leading-tight">{linkLabel}</div>
                      <div className="mt-0.5 text-xs leading-5 text-muted-foreground">{description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PostsDropdown() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={close} onFocus={() => setOpen(true)}>
      <Link
        to="/posts"
        onClick={close}
        className={`nav-link px-3.5 py-2.5 text-[0.95rem] transition-colors rounded-md inline-flex items-center gap-1.5 ${inactiveNavClass}`}
        activeProps={{ className: activeNavClass }}
      >
        Posts <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </Link>
      <div className={`absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3 transition duration-150 ${open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"}`}>
        <div className="rounded-2xl border border-border/70 bg-background/95 shadow-2xl shadow-blue-950/30 backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-3 bg-gradient-to-r from-blue-500/10 via-transparent to-rose-800/10">
            <div className="text-xs font-semibold text-foreground">Featured writing</div>
            <Link to="/posts" onClick={close} className="shrink-0 rounded-lg bg-gradient-rb px-3 py-1 text-xs font-semibold text-background">
              All posts
            </Link>
          </div>
          <div className="max-h-72 overflow-y-auto journey-dropdown-scroll">
            {featuredPosts.map(({ slug, title, tag }) => (
              <Link key={slug} to="/posts/$slug" params={{ slug }} onClick={close} className="block px-5 py-3.5 text-sm hover:bg-muted/50 transition border-b border-border/20 last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-accent/15 text-accent font-tech">{tag}</span>
                </div>
                <div className="font-medium text-foreground leading-snug line-clamp-2">{title}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsDropdown() {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const grouped = useMemo(() => {
    const groups = new Map<string, typeof projectPages>();
    for (const g of projectGroups) groups.set(g, [] as unknown as typeof projectPages);
    for (const project of projectPages) {
      const g = projectGroup(project);
      groups.set(g, [...(groups.get(g) ?? []), project] as typeof projectPages);
    }
    return Array.from(groups.entries()).filter(([, items]) => items.length > 0);
  }, []);

  const close = () => setProjectsOpen(false);

  return (
    <div className="relative" onMouseEnter={() => setProjectsOpen(true)} onMouseLeave={close} onFocus={() => setProjectsOpen(true)}>
      <Link
        to="/projects"
        onClick={close}
        className={`nav-link px-3.5 py-2.5 text-[0.95rem] transition-colors rounded-md inline-flex items-center gap-1.5 ${inactiveNavClass}`}
        activeProps={{ className: activeNavClass }}
      >
        Projects <ChevronDown className={`h-3.5 w-3.5 transition ${projectsOpen ? "rotate-180" : ""}`} />
      </Link>

      <div className={`absolute left-1/2 top-full z-50 w-[min(860px,calc(100vw-2rem))] -translate-x-1/2 pt-3 transition duration-150 ${projectsOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"}`}>
        <div className="rounded-2xl border border-border/70 bg-background/95 shadow-2xl shadow-blue-950/30 backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-4 bg-gradient-to-r from-blue-500/10 via-transparent to-rose-800/10">
            <div>
              <div className="font-display text-sm font-semibold text-foreground">Project case studies</div>
              <div className="text-xs text-muted-foreground">Jump directly to any dedicated project page.</div>
            </div>
            <Link to="/projects" onClick={close} className="shrink-0 rounded-lg bg-gradient-rb px-3 py-1.5 text-xs font-semibold text-background">
              All projects
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 p-3 max-h-[70vh] overflow-auto">
            {grouped.map(([group, items]) => (
              <div key={group} className="p-2">
                <div className="px-2 pb-2 text-[10px] uppercase tracking-[0.18em] text-accent">{group}</div>
                <div className="space-y-1">
                  {items.map((project) => (
                    <Link
                      key={project.slug}
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      onClick={close}
                      className="block rounded-xl px-3 py-2.5 text-sm hover:bg-muted/50 transition"
                    >
                      <div className="font-medium leading-tight text-foreground">{project.title}</div>
                      <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{project.heroStatement}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/55 border-b border-border/70 shadow-[0_12px_60px_-50px_rgba(34,211,238,0.65)]">
      <nav className="px-6 h-16 flex items-center gap-4">
        {/* Logo — pinned left */}
        <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="Danish Nadar home">
          <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl overflow-hidden ring-orb bg-background/40 shadow-lg shadow-blue-950/30">
            <img src="/brand/dn-logo.png" alt="DN logo" className="h-full w-full object-contain p-0.5" />
          </span>
          <span className="font-display font-semibold tracking-tight text-base md:text-lg">Danish Nadar</span>
        </Link>

        {/* Nav links — centered */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-1">
          <Link
            to="/"
            className={`nav-link px-3.5 py-2.5 text-[0.95rem] transition-colors rounded-md ${inactiveNavClass}`}
            activeProps={{ className: activeNavClass }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <ProjectsDropdown />
          <PathwaysDropdown />
          <PostsDropdown />
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link px-3.5 py-2.5 text-[0.95rem] transition-colors rounded-md ${inactiveNavClass}`}
              activeProps={{ className: activeNavClass }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Social links — pinned right */}
        <div className="hidden md:flex items-center shrink-0 ml-auto">
          <SocialLinks variant="icons" />
        </div>

        <button className="md:hidden text-foreground ml-auto" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95">
          <div className="px-6 py-4 flex flex-col gap-2 max-h-[calc(100vh-4rem)] overflow-auto">
            <Link to="/" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-muted-foreground" activeProps={{ className: "bg-gradient-rb text-background font-semibold" }} activeOptions={{ exact: true }}>Home</Link>
            <div className="text-[10px] uppercase tracking-[0.18em] text-accent px-3 pt-1 pb-0.5">The Journey.</div>
            {pathwayLinks.map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-muted-foreground" activeProps={{ className: "bg-gradient-rb text-background font-semibold" }}>
                {label}
              </Link>
            ))}
            <button
              onClick={() => setMobileProjectsOpen((v) => !v)}
              className="flex items-center justify-between py-2 text-left text-sm"
            >
              Projects <ChevronDown className={`h-4 w-4 transition ${mobileProjectsOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileProjectsOpen && (
              <div className="ml-3 border-l border-border pl-3 space-y-1">
                <Link to="/projects" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-accent" activeProps={{ className: "bg-gradient-rb text-background font-semibold" }}>All projects</Link>
                {projectPages.map((project) => (
                  <Link
                    key={project.slug}
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground"
                    activeProps={{ className: "bg-gradient-rb text-background font-semibold" }}
                  >
                    {project.title}
                  </Link>
                ))}
              </div>
            )}
            <div className="text-[10px] uppercase tracking-[0.18em] text-accent px-3 pt-1 pb-0.5">Posts</div>
            {featuredPosts.map(({ slug, title }) => (
              <Link key={slug} to="/posts/$slug" params={{ slug }} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-muted-foreground" activeProps={{ className: "bg-gradient-rb text-background font-semibold" }}>
                {title}
              </Link>
            ))}
            <Link to="/posts" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-accent">All posts →</Link>
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-muted-foreground" activeProps={{ className: "bg-gradient-rb text-background font-semibold" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
