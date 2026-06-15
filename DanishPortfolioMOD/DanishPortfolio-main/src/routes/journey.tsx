import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Car,
  Compass,
  Cpu,
  GraduationCap,
  Heart,
  HeartPulse,
  Lightbulb,
  Map,
  Radar,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { SectionReveal } from "@/components/SectionReveal";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "The Journey — Danish Nadar" },
      {
        name: "description",
        content:
          "The full picture behind the engineer: curiosity about autonomous vehicles, a life-altering collision, recovery, Illinois Tech, leadership, and the people who made the path real.",
      },
    ],
  }),
  component: JourneyPage,
});

const chapters = [
  {
    phase: "01",
    label: "Curiosity",
    title: "It started with one question about machines that could see.",
    body: "Autonomous vehicles gave me the question I still follow: how can code and sensors help a machine understand a moving world?",
    color: "blue",
  },
  {
    phase: "02",
    label: "Foundation",
    title: "P-TECH gave me an early technical foundation and a sense of responsibility.",
    body: "I earned an AAS in Cloud Computing and Network Technology while finishing high school. P-TECH taught me that technology always serves someone.",
    color: "cyan",
  },
  {
    phase: "03",
    label: "Turning Point",
    title: "A traffic collision made the mission profoundly personal.",
    body: "A speeding car struck me after my first day as a software intern. Autonomy became responsibility: build systems that prevent harm.",
    color: "red",
  },
  {
    phase: "04",
    label: "Recovery",
    title: "Rebuilding taught me how to rise through a hard problem with patience.",
    body: "I relearned movement, memory, and roughly 12 years of math. Recovery built the patience I bring to every hard problem.",
    color: "purple",
  },
  {
    phase: "05",
    label: "Community",
    title: "Student organizations turned college into a place to build, lead, and belong.",
    body: "Robotics, EcoCAR, ML@IIT, IGDA, and ITRC gave me years of shared responsibility, technical growth, and leadership.",
    color: "blue",
  },
  {
    phase: "06",
    label: "Mission",
    title: "Now the work points toward safer, more capable, more humane systems.",
    body: "The mission is simple: build systems that reduce harm, remove friction, and help people move with more confidence.",
    color: "cyan",
  },
];

const pathGroups = [
  {
    id: "engineering",
    groupLabel: "Engineering",
    groupDesc: "The technical foundation and applied work behind the mission.",
    color: "blue" as const,
    icon: Cpu,
    pages: [
      {
        to: "/autonomous-vehicles" as const,
        icon: Car,
        eyebrow: "Autonomy mission",
        title: "Autonomous Vehicles",
        body: "EcoCAR, sensor fusion, lane-centering, driver monitoring, CAN, and validation for safer roads.",
        tags: ["EcoCAR", "Sensor Fusion", "Computer Vision", "Validation"],
        accent: "blue",
      },
      {
        to: "/illinois-tech" as const,
        icon: GraduationCap,
        eyebrow: "Academic foundation",
        title: "Illinois Tech",
        body: "The coursework, teams, and competitions that turned curiosity into capability.",
        tags: ["CS Degree", "Research", "Robotics", "Competitions"],
        accent: "cyan",
      },
    ],
  },
  {
    id: "leadership",
    groupLabel: "Student Leadership",
    groupDesc: "The organizations, responsibilities, and people that shaped my college experience.",
    color: "red" as const,
    icon: Star,
    pages: [
      {
        to: "/student-organizations" as const,
        icon: Users,
        eyebrow: "College through-line",
        title: "Student Organizations",
        body: "Years of building and leading across Robotics, EcoCAR, ML@IIT, IGDA, and ITRC.",
        tags: ["Robotics", "EcoCAR", "ML@IIT", "IGDA", "ITRC"],
        accent: "red",
      },
      {
        to: "/leadership-academy" as const,
        icon: Lightbulb,
        eyebrow: "Leadership development",
        title: "Leadership Academy",
        body: "Practice in self-awareness, service, communication, and leadership under real pressure.",
        tags: ["Program", "Service", "Communication", "Team Building"],
        accent: "blue",
      },
    ],
  },
  {
    id: "people",
    groupLabel: "People & Ideas",
    groupDesc: "The relationships and ideas that gave the work meaning.",
    color: "cyan" as const,
    icon: Heart,
    pages: [
      {
        to: "/friends" as const,
        icon: Heart,
        eyebrow: "People who mattered",
        title: "Friends",
        body: "The people who carried hard seasons with humor, honesty, and care.",
        tags: ["Community", "Support", "Shared Story", "People"],
        accent: "cyan",
      },
      {
        to: "/inspirations" as const,
        icon: Sparkles,
        eyebrow: "Ideas that shaped the work",
        title: "Inspirations",
        body: "The thinkers and builders who shaped how I approach engineering and responsibility.",
        tags: ["Thinkers", "Builders", "Science", "Engineering Philosophy"],
        accent: "blue",
      },
    ],
  },
];

const displayedPathGroups = [
  pathGroups.find((group) => group.id === "leadership")!,
  ...pathGroups.filter((group) => group.id !== "leadership"),
];

const accentMap = {
  blue: {
    badge: "bg-gradient-to-r from-blue-600 to-blue-500 text-white",
    icon: "bg-blue-500/15 text-blue-400",
    border: "border-blue-500/25",
    glow: "hover:shadow-[0_24px_64px_-32px_rgba(59,130,246,0.5)]",
    tag: "border-blue-500/30 text-blue-400/80",
    dot: "bg-blue-400",
    iconGlow: "icon-glow-blue",
    iconRing: "icon-orbit-ring",
    sectionBg:
      "bg-[radial-gradient(ellipse_at_0%_30%,rgba(59,130,246,0.11),transparent_60%),radial-gradient(ellipse_at_100%_80%,rgba(59,130,246,0.05),transparent_50%)]",
  },
  cyan: {
    badge: "bg-gradient-to-r from-cyan-600 to-cyan-500 text-background",
    icon: "bg-cyan-500/15 text-cyan-400",
    border: "border-cyan-500/25",
    glow: "hover:shadow-[0_24px_64px_-32px_rgba(34,211,238,0.45)]",
    tag: "border-cyan-500/30 text-cyan-400/80",
    dot: "bg-cyan-400",
    iconGlow: "icon-glow-cyan",
    iconRing: "icon-orbit-ring-cyan",
    sectionBg: "bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.10),transparent_60%)]",
  },
  red: {
    badge: "bg-gradient-to-r from-rose-700 to-rose-600 text-white",
    icon: "bg-rose-500/15 text-rose-400",
    border: "border-rose-500/25",
    glow: "hover:shadow-[0_24px_64px_-32px_rgba(200,30,70,0.45)]",
    tag: "border-rose-500/30 text-rose-400/80",
    dot: "bg-rose-400",
    iconGlow: "icon-glow-red",
    iconRing: "icon-orbit-ring-red",
    sectionBg:
      "bg-[radial-gradient(ellipse_at_100%_20%,rgba(200,30,70,0.12),transparent_60%),radial-gradient(ellipse_at_0%_90%,rgba(200,30,70,0.05),transparent_50%)]",
  },
  purple: {
    badge: "bg-gradient-to-r from-violet-700 to-violet-500 text-white",
    icon: "bg-violet-500/15 text-violet-400",
    border: "border-violet-500/25",
    glow: "hover:shadow-[0_24px_64px_-32px_rgba(124,58,237,0.45)]",
    tag: "border-violet-500/30 text-violet-400/80",
    dot: "bg-violet-400",
    iconGlow: "icon-glow-purple",
    iconRing: "icon-orbit-ring",
    sectionBg: "bg-[radial-gradient(ellipse_at_30%_50%,rgba(124,58,237,0.10),transparent_60%)]",
  },
};

const phaseColors = {
  blue: "text-blue-400",
  cyan: "text-cyan-400",
  red: "text-rose-400",
  purple: "text-violet-400",
} as const;

type AccentKey = keyof typeof accentMap;

function JourneyPage() {
  return (
    <MotionPage mood="hero" tone="brand" className="mx-auto max-w-7xl px-6 py-16">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl"
      >
        <div className="inline-flex items-center gap-2.5 glass px-4 py-2 rounded-full text-sm text-accent mb-6">
          <Compass className="h-4 w-4" />
          <span className="font-tech tracking-wide">The Journey</span>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.04] animated-title-glow">
          The path that shaped <span className="text-gradient-rb">the engineer.</span>
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-3xl">
          Curiosity led to autonomy. A collision made safety personal. Recovery built discipline.
          Illinois Tech student organizations gave it community, responsibility, and direction. This
          is the story behind the work.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/about"
            className="brand-button-lg inline-flex items-center gap-2 bg-gradient-rb text-background glow-blue hover:scale-[1.02] transition"
          >
            Read the full about page <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/resume"
            className="brand-button-lg inline-flex items-center gap-2 glass hover:glow-blue transition"
          >
            View resume path <Map className="h-4 w-4" />
          </Link>
        </div>
      </motion.section>

      <SectionReveal className="mt-14">
        <Link
          to="/student-organizations"
          className="group relative block overflow-hidden rounded-[2rem] border border-blue-400/30 bg-[radial-gradient(circle_at_8%_12%,rgba(59,130,246,0.24),transparent_36%),radial-gradient(circle_at_92%_88%,rgba(200,30,70,0.22),transparent_40%),linear-gradient(135deg,rgba(15,30,68,0.88),rgba(27,10,35,0.88))] p-7 shadow-[0_28px_90px_-58px_rgba(59,130,246,0.9)] transition hover:-translate-y-1 hover:border-rose-400/40 md:p-9"
        >
          <div className="relative z-10 grid gap-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-rb text-white shadow-[0_0_34px_rgba(59,130,246,0.3)]">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-300 font-tech">
                Central to the journey
              </div>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">
                Student organizations shaped nearly every year of college.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                They became the place where I built systems, managed budgets, led initiatives,
                learned from friends, and helped technical communities grow.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Illinois Tech Robotics", "EcoCAR", "ML@IIT", "IGDA", "ITRC"].map((org) => (
                  <span
                    key={org}
                    className="rounded-full border border-blue-300/25 bg-blue-400/8 px-3 py-1 text-xs text-blue-100/80"
                  >
                    {org}
                  </span>
                ))}
              </div>
            </div>
            <div className="inline-flex items-center gap-2 font-semibold text-cyan-300 transition group-hover:text-white">
              Explore the organizations
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </SectionReveal>

      {/* ── Personal arc timeline ──────────────────────────────── */}
      <SectionReveal className="mt-20">
        <section className="rounded-[2rem] border border-border/70 bg-background/25 p-6 md:p-10 overflow-hidden relative">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(200,30,70,0.07),transparent_50%)]"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-accent font-tech mb-2">
              Personal arc
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">
              Six chapters, one continuous direction.
            </h2>
            <div className="relative">
              {/* Vertical rail */}
              <div
                className="absolute left-[1.35rem] top-3 bottom-3 w-px bg-gradient-to-b from-blue-500/20 via-cyan-500/60 to-blue-500/20 hidden md:block"
                aria-hidden="true"
              />
              <div className="space-y-8 md:pl-16">
                {chapters.map((c, i) => (
                  <motion.div
                    key={c.phase}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-[3.7rem] top-1 hidden md:flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border/80 text-[10px] font-display font-bold text-accent"
                      aria-hidden="true"
                    >
                      {c.phase}
                    </div>
                    <div className="glass premium-border rounded-2xl p-5 md:p-6">
                      <div
                        className={`text-[10px] uppercase tracking-[0.2em] font-tech mb-2 ${phaseColors[c.color as keyof typeof phaseColors]}`}
                      >
                        {c.label}
                      </div>
                      <h3 className="text-lg md:text-xl font-display font-bold leading-snug mb-3">
                        {c.title}
                      </h3>
                      <p className="text-sm leading-7 text-muted-foreground">{c.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── Chapter groups ─────────────────────────────────────── */}
      {displayedPathGroups.map((group, gi) => {
        const GroupIcon = group.icon;
        const groupColors = accentMap[group.color];
        return (
          <SectionReveal key={group.id} className="mt-16" delay={gi * 0.05}>
            <section className="rounded-[2rem] border border-border/70 p-6 md:p-8 relative overflow-hidden">
              <div
                className={`absolute inset-0 rounded-[2rem] ${groupColors.sectionBg}`}
                aria-hidden="true"
              />
              <div className="relative z-10">
                {/* Group header */}
                <div className="flex items-start gap-4 mb-8">
                  <motion.div
                    className={`relative flex-shrink-0 grid h-14 w-14 place-items-center rounded-2xl ${groupColors.icon} ${groupColors.iconGlow} ${groupColors.iconRing}`}
                    initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 280, damping: 20, delay: gi * 0.1 }}
                  >
                    <GroupIcon className="h-7 w-7" />
                  </motion.div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-accent font-tech mb-1">
                      Chapter group
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                      {group.groupLabel}
                    </h2>
                    <p className="mt-1.5 text-base text-muted-foreground max-w-2xl">
                      {group.groupDesc}
                    </p>
                  </div>
                </div>

                {/* Sub-page cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  {group.pages.map((page, pi) => {
                    const PageIcon = page.icon;
                    const colors = accentMap[page.accent as AccentKey];
                    return (
                      <motion.div
                        key={page.to}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ delay: pi * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          to={page.to}
                          className={`group block glass premium-border rounded-[1.85rem] p-7 h-full transition-all duration-260 hover:-translate-y-1.5 hover:scale-[1.012] ${colors.glow} border ${colors.border}`}
                        >
                          {/* Card header */}
                          <div className="flex items-start justify-between gap-3 mb-5">
                            <div
                              className={`grid h-12 w-12 place-items-center rounded-2xl ${colors.icon}`}
                            >
                              <PageIcon className="h-6 w-6" />
                            </div>
                            <span
                              className={`text-[10px] uppercase tracking-[0.16em] font-tech px-2.5 py-1 rounded-full ${colors.badge}`}
                            >
                              {page.eyebrow}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl font-display font-bold leading-tight mb-3 group-hover:text-gradient-rb transition-all duration-200">
                            {page.title}
                          </h3>

                          {/* Body */}
                          <p className="text-sm leading-7 text-muted-foreground mb-6">
                            {page.body}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {page.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full border ${colors.tag}`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className="flex items-center gap-2 text-sm font-semibold text-accent group-hover:text-foreground transition-colors duration-200">
                            Open this chapter
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          </SectionReveal>
        );
      })}

      {/* ── Cross-chapter callout ──────────────────────────────── */}
      <SectionReveal className="mt-16">
        <section className="rounded-[2rem] border border-border/70 bg-background/25 p-8 md:p-10 relative">
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(59,130,246,0.1),transparent_55%),radial-gradient(ellipse_at_30%_100%,rgba(200,30,70,0.08),transparent_50%)]"
              aria-hidden="true"
            />
          </div>
          <div className="relative z-10 grid lg:grid-cols-[1fr_260px] gap-8 items-start">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-accent font-tech mb-3">
                The through-line
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-4">
                Every chapter connects back to the same mission.
              </h2>
              <p className="text-base leading-8 text-muted-foreground max-w-2xl">
                Engineering, leadership, people, and ideas are not separate tracks. They are the
                same track seen from different angles. The Autonomy page shows the technical
                mission. Illinois Tech shows the academic foundation. Leadership shows how I work
                with people. Inspirations shows what shapes the thinking. Friends shows why it
                matters. Together they describe an engineer who builds with both technical depth and
                human purpose.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Link
                to="/projects"
                className="brand-button-lg inline-flex items-center justify-center gap-2 bg-gradient-rb text-background glow-blue hover:scale-[1.02] transition w-full text-center"
              >
                See the project work <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              <Link
                to="/about"
                className="brand-button-lg inline-flex items-center justify-center gap-2 glass hover:glow-blue transition w-full text-center"
              >
                Full about page <BrainCircuit className="h-4 w-4 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Quick-nav to all 6 sub-pages */}
          <div className="relative z-10 mt-10 border-t border-border/40 pt-8">
            <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech mb-4">
              Quick navigation
            </div>
            <div className="flex flex-wrap gap-3">
              {displayedPathGroups.flatMap((g) =>
                g.pages.map((p) => {
                  const Icon = p.icon;
                  return (
                    <Link
                      key={p.to}
                      to={p.to}
                      className="inline-flex items-center gap-2 glass rounded-2xl px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:-translate-y-0.5 hover:glow-blue transition-all duration-200"
                    >
                      <Icon className="h-4 w-4 text-accent" />
                      {p.title}
                    </Link>
                  );
                }),
              )}
            </div>
          </div>
        </section>
      </SectionReveal>
    </MotionPage>
  );
}
