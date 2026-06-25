import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Sparkles, Users } from "lucide-react";
import { projectPages } from "@/content/projectPages";
import { SocialLinks } from "@/components/SocialLinks";

const activeNavClass =
  "text-background bg-gradient-rb shadow-lg shadow-blue-950/30 ring-1 ring-accent/40";
const inactiveNavClass = "text-muted-foreground hover:text-foreground hover:bg-muted/35";

const links = [
  { to: "/gallery", label: "Gallery" },
  { to: "/stack-map", label: "Stack Map" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

function resetStackMapScroll() {
  window.setTimeout(() => {
    if (window.location.pathname === "/stack-map") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, 0);
}

const journeyGroups = [
  {
    label: "Campus Leadership",
    links: [
      {
        to: "/student-organizations",
        label: "Student Organizations",
        description:
          "The clubs, teams, and leadership roles that shaped nearly every year of college.",
        featured: true,
      },
      {
        to: "/leadership-academy",
        label: "Leadership Academy",
        description: "Formal development programs and the habits of service they built.",
        featured: false,
      },
    ],
  },
  {
    label: "People & Community",
    links: [
      {
        to: "/friends",
        label: "Friends",
        description:
          "Meet the people whose support, humor, and shared experiences shaped the journey.",
        featured: true,
      },
      {
        to: "/inspirations",
        label: "Inspirations",
        description:
          "The thinkers, builders, and ideas that shaped how I approach engineering and life.",
        featured: false,
      },
    ],
  },
  {
    label: "Engineering",
    links: [
      {
        to: "/autonomous-vehicles",
        label: "Autonomy",
        description:
          "EcoCAR sensor fusion, safety-minded systems, and the purpose behind the engineering.",
        featured: true,
      },
      {
        to: "/illinois-tech",
        label: "Illinois Tech",
        description: "Computer Science at IIT and the academic foundation behind the work.",
        featured: false,
      },
    ],
  },
];

const featuredPosts = [
  {
    slug: "starkhacks-2026-observ-e-win",
    title: "How We Won the World's Largest Hardware Hackathon",
    tag: "Hackathon",
  },
  {
    slug: "ecocar-sensor-fusion-reflection",
    title: "What Sensor-Fusion Engineering on EcoCAR Taught Me",
    tag: "Autonomy",
  },
  {
    slug: "building-an-rl-lane-keeping-simulator",
    title: "Building an RL Lane-Keeping Simulator",
    tag: "Robotics",
  },
  {
    slug: "building-an-ai-avatar-portfolio",
    title: "Building the AI Avatar Portfolio System",
    tag: "AI",
  },
  {
    slug: "automating-spf-dkim-dmarc-screening",
    title: "Automating SPF, DKIM, and DMARC Screening",
    tag: "Security",
  },
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
  if (/autonomy|vehicle|lane|driving/i.test(`${eyebrow} ${project.title}`))
    return "Autonomy Systems";
  if (/machine|learning|fraud|course|recommend/i.test(`${eyebrow} ${project.title}`))
    return "Machine Learning";
  if (/security|dns|phishing|scam|automation/i.test(`${eyebrow} ${project.title}`))
    return "Cybersecurity";
  if (/avatar|assistant|headshot|shopping|product|platform/i.test(`${eyebrow} ${project.title}`))
    return "AI Product";
  if (/hackathon|selvam|stark/i.test(`${eyebrow} ${project.title}`)) return "Hackathon Build";
  return "Other";
}

function useDropdownHover() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (!closeTimer.current) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const openDropdown = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const closeDropdown = () => {
    clearCloseTimer();
    setOpen(false);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      closeTimer.current = null;
    }, 260);
  };

  useEffect(() => clearCloseTimer, []);

  return { open, openDropdown, closeDropdown, scheduleClose };
}

function PathwaysDropdown() {
  const { open, openDropdown, closeDropdown, scheduleClose } = useDropdownHover();
  return (
    <div
      className="relative"
      onMouseEnter={openDropdown}
      onMouseLeave={scheduleClose}
      onFocus={openDropdown}
    >
      <Link
        to="/journey"
        onClick={closeDropdown}
        className={`nav-link whitespace-nowrap px-3.5 py-2.5 text-[0.95rem] transition-colors rounded-md inline-flex items-center gap-1.5 ${inactiveNavClass}`}
        activeProps={{ className: activeNavClass }}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        The Journey.{" "}
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </Link>
      <div
        className={`nav-dropdown fixed inset-x-4 top-16 z-50 mx-auto w-auto max-w-md transition duration-150 ${open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"}`}
        onMouseEnter={openDropdown}
        onMouseLeave={scheduleClose}
      >
        <div className="rounded-2xl border border-border/70 bg-background/98 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-3 bg-gradient-to-r from-blue-500/10 via-transparent to-rose-800/10">
            <div className="text-xs font-semibold text-foreground">The Journey.</div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                to="/student-organizations"
                onClick={closeDropdown}
                className="featured-nav-link inline-flex items-center gap-1.5 rounded-lg bg-gradient-rb px-3 py-1 text-xs font-semibold text-background"
              >
                <Users className="h-3.5 w-3.5" /> Student Orgs
              </Link>
              <Link
                to="/journey"
                onClick={closeDropdown}
                className="rounded-lg border border-accent/35 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/20 transition"
              >
                Overview
              </Link>
            </div>
          </div>
          <div className="max-h-[420px] overflow-y-auto journey-dropdown-scroll">
            {journeyGroups.map(({ label, links: groupLinks }) => (
              <div key={label}>
                <div className="px-5 pt-3 pb-1 text-[10px] uppercase tracking-[0.18em] text-accent/80 font-tech">
                  {label}
                </div>
                {groupLinks.map(({ to, label: linkLabel, description, featured }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={closeDropdown}
                    className={`flex items-start gap-3 px-5 py-3 text-sm transition border-b border-border/20 last:border-0 ${featured ? "dropdown-featured-item" : "hover:bg-muted/50"}`}
                  >
                    <div>
                      <div className="flex items-center gap-2 font-semibold text-foreground leading-tight">
                        {featured && <Sparkles className="h-3.5 w-3.5 text-accent" />}
                        {linkLabel}
                      </div>
                      <div className="mt-0.5 text-xs leading-5 text-muted-foreground">
                        {description}
                      </div>
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
  const { open, openDropdown, closeDropdown, scheduleClose } = useDropdownHover();
  return (
    <div
      className="relative"
      onMouseEnter={openDropdown}
      onMouseLeave={scheduleClose}
      onFocus={openDropdown}
    >
      <Link
        to="/posts"
        search={{ page: 1 }}
        onClick={closeDropdown}
        className={`nav-link px-3.5 py-2.5 text-[0.95rem] transition-colors rounded-md inline-flex items-center gap-1.5 ${inactiveNavClass}`}
        activeProps={{ className: activeNavClass }}
      >
        Posts <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </Link>
      <div
        className={`nav-dropdown fixed inset-x-4 top-16 z-50 mx-auto w-auto max-w-sm transition duration-150 ${open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"}`}
        onMouseEnter={openDropdown}
        onMouseLeave={scheduleClose}
      >
        <div className="rounded-2xl border border-border/70 bg-background/98 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-3 bg-gradient-to-r from-blue-500/10 via-transparent to-rose-800/10">
            <div className="text-xs font-semibold text-foreground">Featured writing</div>
            <Link
              to="/posts"
              search={{ page: 1 }}
              onClick={closeDropdown}
              className="shrink-0 rounded-lg bg-gradient-rb px-3 py-1 text-xs font-semibold text-background"
            >
              All posts
            </Link>
          </div>
          <div className="max-h-72 overflow-y-auto journey-dropdown-scroll">
            {featuredPosts.map(({ slug, title, tag }, index) => (
              <Link
                key={slug}
                to="/posts/$slug"
                params={{ slug }}
                search={{ page: 1 }}
                onClick={closeDropdown}
                className={`block px-5 py-3.5 text-sm transition border-b border-border/20 last:border-0 ${index === 0 ? "dropdown-featured-item" : "hover:bg-muted/50"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-accent/15 text-accent font-tech">
                    {tag}
                  </span>
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
  const {
    open: projectsOpen,
    openDropdown,
    closeDropdown,
    scheduleClose,
  } = useDropdownHover();
  const grouped = useMemo(() => {
    const groups = new Map<string, typeof projectPages>();
    for (const g of projectGroups) groups.set(g, [] as unknown as typeof projectPages);
    for (const project of projectPages) {
      const g = projectGroup(project);
      groups.set(g, [...(groups.get(g) ?? []), project] as typeof projectPages);
    }
    return Array.from(groups.entries()).filter(([, items]) => items.length > 0);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={openDropdown}
      onMouseLeave={scheduleClose}
      onFocus={openDropdown}
    >
      <Link
        to="/projects"
        onClick={closeDropdown}
        className={`nav-link px-3.5 py-2.5 text-[0.95rem] transition-colors rounded-md inline-flex items-center gap-1.5 ${inactiveNavClass}`}
        activeProps={{ className: activeNavClass }}
      >
        Projects{" "}
        <ChevronDown className={`h-3.5 w-3.5 transition ${projectsOpen ? "rotate-180" : ""}`} />
      </Link>

      <div
        className={`nav-dropdown fixed inset-x-4 top-16 z-50 mx-auto w-auto max-w-[860px] transition duration-150 ${projectsOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"}`}
        onMouseEnter={openDropdown}
        onMouseLeave={scheduleClose}
      >
        <div className="rounded-2xl border border-border/70 bg-background/98 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-4 bg-gradient-to-r from-blue-500/10 via-transparent to-rose-800/10">
            <div>
              <div className="font-display text-sm font-semibold text-foreground">
                Project case studies
              </div>
              <div className="text-xs text-muted-foreground">
                Jump directly to any dedicated project page.
              </div>
            </div>
            <Link
              to="/projects"
              onClick={closeDropdown}
              className="shrink-0 rounded-lg bg-gradient-rb px-3 py-1.5 text-xs font-semibold text-background"
            >
              All projects
            </Link>
          </div>
          <Link
            to="/projects/$slug"
            params={{ slug: "observ-e" }}
            onClick={closeDropdown}
            className="dropdown-featured-item mx-3 mt-3 flex items-center justify-between gap-4 rounded-xl border border-accent/25 px-4 py-3"
          >
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-accent">
                <Sparkles className="h-3.5 w-3.5" /> Featured AI + robotics case study
              </div>
              <div className="mt-1 font-display text-sm font-semibold text-foreground">
                OBSERV-E Accessibility Robotics
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
          </Link>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 p-3 max-h-[70vh] overflow-auto">
            {grouped.map(([group, items]) => (
              <div key={group} className="p-2">
                <div className="px-2 pb-2 text-[10px] uppercase tracking-[0.18em] text-accent">
                  {group}
                </div>
                <div className="space-y-1">
                  {items.map((project) => (
                    <Link
                      key={project.slug}
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      onClick={closeDropdown}
                      className="block rounded-xl px-3 py-2.5 text-sm hover:bg-muted/50 transition"
                    >
                      <div className="font-medium leading-tight text-foreground">
                        {project.title}
                      </div>
                      <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {project.heroStatement}
                      </div>
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
  return (
    <header className="site-nav-header sticky top-0 z-40 backdrop-blur-xl bg-background/90 border-b border-border/70 shadow-[0_12px_60px_-50px_rgba(34,211,238,0.65)]">
      <nav className="site-nav-shell px-3 lg:px-6 h-16 flex items-center gap-3">
        {/* Logo  -  pinned left */}
        <Link
          to="/"
          className="site-brand-link flex items-center gap-3 group shrink-0"
          aria-label="Danish Nadar home"
        >
          <span className="dn-logo-aura relative inline-flex h-14 w-14 items-center justify-center rounded-xl overflow-hidden ring-orb bg-background/40 shadow-lg shadow-blue-950/30">
            <img
              src="/brand/dn-logo.png"
              alt="DN logo"
              className="h-full w-full object-contain p-0.5"
            />
          </span>
          <span className="site-brand-name font-display font-semibold tracking-tight text-base md:text-lg">
            Danish Nadar
          </span>
        </Link>

        {/* Nav links  -  centered */}
        <div className="site-primary-nav flex flex-1 items-center justify-center gap-1">
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
              search={
                l.to === "/stack-map"
                  ? { page: 1, q: "", category: "all", stackJump: "" }
                  : undefined
              }
              resetScroll={l.to === "/stack-map"}
              onClick={l.to === "/stack-map" ? resetStackMapScroll : undefined}
              className={`nav-link whitespace-nowrap px-3.5 py-2.5 text-[0.95rem] transition-colors rounded-md ${inactiveNavClass}`}
              activeProps={{ className: activeNavClass }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Social links  -  pinned right */}
        <div className="site-nav-socials hidden min-[1280px]:flex items-center shrink-0 ml-auto">
          <SocialLinks variant="icons" className="site-nav-social-links" />
        </div>
      </nav>
    </header>
  );
}
