import { Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  BookOpenText,
  ChevronDown,
  Contact,
  FolderKanban,
  GalleryHorizontalEnd,
  Home,
  Layers3,
  Map as MapIcon,
  Menu,
  Newspaper,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { projectPages } from "@/content/projectPages";
import { SocialLinks } from "@/components/SocialLinks";
import { motion, AnimatePresence } from "framer-motion";
import { rankProjectsForAiEngineering } from "@/lib/projectRanking";

const activeNavClass =
  "text-background bg-gradient-rb shadow-lg shadow-blue-950/30 ring-1 ring-accent/40";
const inactiveNavClass = "text-muted-foreground hover:text-foreground hover:bg-muted/35";
const DROPDOWN_CLOSE_DELAY_MS = 180;

const links = [
  { to: "/gallery", label: "Gallery", icon: GalleryHorizontalEnd },
  { to: "/stack-map", label: "Stack Map", icon: Layers3 },
  { to: "/about", label: "About", icon: BookOpenText },
  { to: "/resume", label: "Resume", icon: MapIcon },
  { to: "/contact", label: "Contact", icon: Contact },
];

const journeyGroups = [
  {
    label: "People & Community",
    links: [
      {
        to: "/friends",
        label: "Friends",
        description:
          "Meet the people whose support, humor, and shared experiences shaped the journey.",
      },
      {
        to: "/inspirations",
        label: "Inspirations",
        description:
          "The thinkers, builders, and ideas that shaped how I approach engineering and life.",
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
      },
      {
        to: "/illinois-tech",
        label: "Illinois Tech",
        description: "Computer Science at IIT and the academic foundation behind the work.",
      },
    ],
  },
  {
    label: "Leadership",
    links: [
      {
        to: "/leadership-academy",
        label: "Leadership Academy",
        description: "Formal development programs and the habits of service they built.",
      },
      {
        to: "/student-organizations",
        label: "Student Organizations",
        description: "EcoCAR, clubs, and communities where engineering became shared work.",
      },
    ],
  },
];

const featuredPosts = [
  {
    slug: "starkhacks-2026-observ-e-win",
    title: "Building OBSERV-E for the StarkHacks Robotics Track",
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

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.14 } },
};

function NavLabel({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <>
      <Icon className="nav-link-icon h-4 w-4" aria-hidden="true" />
      <span>{children}</span>
    </>
  );
}

function PathwaysDropdown() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(close, DROPDOWN_CLOSE_DELAY_MS);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setOpen(true)}
    >
      <Link
        to="/journey"
        onClick={close}
        className={`nav-link px-3 py-2.5 text-[0.9rem] transition-colors rounded-md inline-flex items-center gap-1.5 whitespace-nowrap ${inactiveNavClass}`}
        activeProps={{ className: activeNavClass }}
      >
        <NavLabel icon={MapIcon}>Journey</NavLabel>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="nav-dropdown nav-dropdown-journey nav-dropdown-compact fixed inset-x-4 top-16 z-50 mx-auto w-auto max-w-md"
            style={{ transformOrigin: "top center" }}
          >
            <div className="rounded-2xl border border-border/70 bg-background/96 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-3 bg-gradient-to-r from-blue-500/12 via-transparent to-rose-800/12">
                <div className="text-xs font-semibold text-foreground tracking-wide">
                  The Journey.
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    to="/friends"
                    onClick={close}
                    className="rounded-lg border border-accent/35 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/20 transition"
                  >
                    Friends
                  </Link>
                  <Link
                    to="/journey"
                    onClick={close}
                    className="rounded-lg bg-gradient-rb px-3 py-1 text-xs font-semibold text-background hover:brightness-110 transition"
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
                    {groupLinks.map(({ to, label: linkLabel, description }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={close}
                        className="flex items-start gap-3 px-5 py-3 text-sm hover:bg-muted/55 transition-colors duration-150 border-b border-border/20 last:border-0 group/item"
                      >
                        <div>
                          <div className="font-semibold text-foreground leading-tight group-hover/item:text-accent transition-colors duration-150">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PostsDropdown() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(close, DROPDOWN_CLOSE_DELAY_MS);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setOpen(true)}
    >
      <Link
        to="/posts"
        onClick={close}
        className={`nav-link px-3 py-2.5 text-[0.9rem] transition-colors rounded-md inline-flex items-center gap-1.5 whitespace-nowrap ${inactiveNavClass}`}
        activeProps={{ className: activeNavClass }}
      >
        <NavLabel icon={Newspaper}>Posts</NavLabel>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="nav-dropdown nav-dropdown-compact fixed inset-x-4 top-16 z-50 mx-auto w-auto max-w-sm"
            style={{ transformOrigin: "top center" }}
          >
            <div className="rounded-2xl border border-border/70 bg-background/96 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-3 bg-gradient-to-r from-blue-500/12 via-transparent to-rose-800/12">
                <div className="text-xs font-semibold text-foreground tracking-wide">
                  Featured writing
                </div>
                <Link
                  to="/posts"
                  onClick={close}
                  className="shrink-0 rounded-lg bg-gradient-rb px-3 py-1 text-xs font-semibold text-background hover:brightness-110 transition"
                >
                  All posts
                </Link>
              </div>
              <div className="max-h-72 overflow-y-auto journey-dropdown-scroll">
                {featuredPosts.map(({ slug, title, tag }) => (
                  <Link
                    key={slug}
                    to="/posts/$slug"
                    params={{ slug }}
                    onClick={close}
                    className="block px-5 py-3.5 text-sm hover:bg-muted/55 transition-colors duration-150 border-b border-border/20 last:border-0 group/post"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-accent/15 text-accent font-tech">
                        {tag}
                      </span>
                    </div>
                    <div className="font-medium text-foreground leading-snug line-clamp-2 group-hover/post:text-accent transition-colors duration-150">
                      {title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectsDropdown() {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const grouped = useMemo(() => {
    const groups = new Map<string, typeof projectPages>();
    for (const g of projectGroups) groups.set(g, [] as unknown as typeof projectPages);
    for (const project of rankProjectsForAiEngineering(projectPages)) {
      const g = projectGroup(project);
      groups.set(g, [...(groups.get(g) ?? []), project] as typeof projectPages);
    }
    return Array.from(groups.entries()).filter(([, items]) => items.length > 0);
  }, []);

  const close = () => setProjectsOpen(false);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setProjectsOpen(true);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(close, DROPDOWN_CLOSE_DELAY_MS);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setProjectsOpen(true)}
    >
      <Link
        to="/projects"
        onClick={close}
        className={`nav-link px-3 py-2.5 text-[0.9rem] transition-colors rounded-md inline-flex items-center gap-1.5 whitespace-nowrap ${inactiveNavClass}`}
        activeProps={{ className: activeNavClass }}
      >
        <NavLabel icon={FolderKanban}>Projects</NavLabel>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${projectsOpen ? "rotate-180" : ""}`}
        />
      </Link>

      <AnimatePresence>
        {projectsOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="nav-dropdown nav-dropdown-projects fixed inset-x-4 top-16 z-50 mx-auto w-auto max-w-[70rem]"
            style={{ transformOrigin: "top center" }}
          >
            <div className="rounded-2xl border border-border/70 bg-background/96 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-4 bg-gradient-to-r from-blue-500/12 via-transparent to-rose-800/12">
                <div>
                  <div className="font-display text-sm font-semibold text-foreground tracking-tight">
                    Project chapters
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Jump directly to a dedicated project story.
                  </div>
                </div>
                <Link
                  to="/projects"
                  onClick={close}
                  className="shrink-0 rounded-lg bg-gradient-rb px-3 py-1.5 text-xs font-semibold text-background hover:brightness-110 transition"
                >
                  All chapters
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 p-3 max-h-[70vh] overflow-auto">
                {grouped.map(([group, items]) => (
                  <div key={group} className="p-2">
                    <div className="px-2 pb-2 text-[10px] uppercase tracking-[0.18em] text-accent font-tech">
                      {group}
                    </div>
                    <div className="space-y-1">
                      {items.map((project) => (
                        <Link
                          key={project.slug}
                          to="/projects/$slug"
                          params={{ slug: project.slug }}
                          onClick={close}
                          className="block rounded-xl px-3 py-2.5 text-sm hover:bg-muted/55 transition-colors duration-150 group/proj"
                        >
                          <div className="font-medium leading-tight text-foreground group-hover/proj:text-accent transition-colors duration-150">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav-header sticky top-0 z-40 border-b border-border/70">
      <nav className="site-nav-shell mx-auto h-16 w-full px-4 sm:px-6 flex items-center gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group shrink-0"
          aria-label="Danish Nadar home"
        >
          <span className="dn-nav-logo relative inline-flex h-12 w-12 items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <img src="/brand/dn-logo.png" alt="DN logo" className="h-full w-full object-contain" />
          </span>
          <span className="site-nav-name hidden xl:inline whitespace-nowrap font-display font-semibold tracking-tight text-base transition-colors duration-180 group-hover:text-accent">
            Danish Nadar
          </span>
        </Link>

        {/* Nav links — centered */}
        <div className="hidden lg:flex min-w-0 flex-1 items-center justify-center gap-0">
          <Link
            to="/"
            className={`nav-link px-3 py-2.5 text-[0.9rem] transition-colors rounded-md inline-flex items-center gap-1.5 whitespace-nowrap ${inactiveNavClass}`}
            activeProps={{ className: activeNavClass }}
            activeOptions={{ exact: true }}
          >
            <NavLabel icon={Home}>Home</NavLabel>
          </Link>
          <ProjectsDropdown />
          <PathwaysDropdown />
          <PostsDropdown />
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-link px-3 py-2.5 text-[0.9rem] transition-colors rounded-md inline-flex items-center gap-1.5 whitespace-nowrap ${inactiveNavClass}`}
                activeProps={{ className: activeNavClass }}
                activeOptions={{ exact: l.to === "/" }}
              >
                <NavLabel icon={Icon}>{l.label}</NavLabel>
              </Link>
            );
          })}
        </div>

        {/* Social links */}
        <div className="hidden 2xl:flex items-center shrink-0 ml-auto">
          <SocialLinks variant="icons" />
        </div>

        <button
          className="lg:hidden text-foreground ml-auto rounded-lg p-2 hover:bg-muted/40 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden border-t border-border bg-background/96 backdrop-blur-2xl overflow-hidden"
          >
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2 px-4 py-4 sm:px-6">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-muted/35 hover:text-foreground transition-colors"
                activeProps={{
                  className:
                    "bg-gradient-rb text-background font-semibold rounded-xl px-3 py-3 text-sm",
                }}
                activeOptions={{ exact: true }}
              >
                Home
              </Link>
              <Link
                to="/journey"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-muted/35 hover:text-foreground transition-colors"
                activeProps={{
                  className:
                    "bg-gradient-rb text-background font-semibold rounded-xl px-3 py-3 text-sm",
                }}
              >
                Journey
              </Link>
              <Link
                to="/projects"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-muted/35 hover:text-foreground transition-colors"
                activeProps={{
                  className:
                    "bg-gradient-rb text-background font-semibold rounded-xl px-3 py-3 text-sm",
                }}
              >
                Projects
              </Link>
              <Link
                to="/posts"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-muted/35 hover:text-foreground transition-colors"
                activeProps={{
                  className:
                    "bg-gradient-rb text-background font-semibold rounded-xl px-3 py-3 text-sm",
                }}
              >
                Posts
              </Link>
              <Link
                to="/friends"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-muted/35 hover:text-foreground transition-colors"
                activeProps={{
                  className:
                    "bg-gradient-rb text-background font-semibold rounded-xl px-3 py-3 text-sm",
                }}
              >
                Friends
              </Link>
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-muted/35 hover:text-foreground transition-colors"
                  activeProps={{
                    className:
                      "bg-gradient-rb text-background font-semibold rounded-xl px-3 py-3 text-sm",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
