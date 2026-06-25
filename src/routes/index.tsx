import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Car,
  Cpu,
  FileText,
  Gauge,
  GraduationCap,
  HeartPulse,
  Info,
  Radar,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { projectsQuery } from "@/lib/queries";
import heroPhoto from "@/assets/danish-hero.jpg";
import { SocialLinks } from "@/components/SocialLinks";
import { MotionPage } from "@/components/MotionPage";
import { SectionReveal } from "@/components/SectionReveal";
import { TechnicalHighlight } from "@/components/TechnicalHighlight";
import { ImageZoomButton } from "@/components/ImageLightbox";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  component: Home,
});

const metrics = [
  { v: "38+", l: "AI experiments benchmarked" },
  { v: "120+", l: "simulation scenarios tested" },
  { v: "91%", l: "best perception benchmark" },
  { v: "3", l: "robotics + autonomy pipelines" },
];

const openingTimeline = [
  {
    label: "Curiosity",
    icon: Radar,
    title: "I started with one question: how can a car see?",
    body: "Before AI became a mainstream buzzword, autonomous vehicles already had my attention. I wanted to understand how cameras, sensors, and code could turn signals and numbers into awareness, motion, and decisions.",
  },
  {
    label: "Impact",
    icon: ShieldCheck,
    title: "Then road safety became personal.",
    body: "After my first day as a software engineering intern at OfficePro Inc., I was struck by a speeding car while crossing the road after getting off a bus. The mission stopped being abstract and became deeply human.",
  },
  {
    label: "Recovery",
    icon: HeartPulse,
    title: "Recovery taught me how to rebuild under pressure.",
    body: "I came back from a coma, cardiac arrest, clinical death, memory loss, and losing the ability to walk. Relearning life, movement, and math taught me the same discipline I now bring to engineering: diagnose, iterate, validate, and keep going.",
  },
  {
    label: "Mission",
    icon: RouteIcon,
    title: "Now the mission is bigger than one vehicle.",
    body: "I want to build autonomous systems that reduce preventable harm, reduce repetitive human effort, and improve real operations - from safer mobility to smarter business workflows.",
  },
];

const homeNarrativeChapters = [
  {
    phase: "01 · Ignition",
    title: "The first spark came from curiosity about intelligent vehicles.",
    copy: "Long before the current AI wave, I was drawn to autonomous vehicles because they felt impossible in the best way. I kept thinking about the gap between binary logic and real-world perception: how can a machine read lanes, detect hazards, and make a decision in motion? That question pulled me toward AI, computer vision, and robotics - and it shaped the kind of engineer I wanted to become.",
    skillLine:
      "Curiosity-driven engineering · Computer vision mindset · AI fundamentals · Technical storytelling",
    visual: "radar",
    image: "/portfolio_images/home/narrative-ignition.png",
  },
  {
    phase: "02 · Foundation",
    title: "P-TECH gave me an early systems foundation and a path into industry.",
    copy: "In high school, I joined P-TECH, a dual-enrollment program where I worked toward an Associate of Applied Science in Cloud Computing and Network Technology while still finishing high school. That gave me early exposure to infrastructure, networking, software, and real technical responsibility. It also led to a software engineering internship at OfficePro Inc. - the same internship that became the turning point in my story.",
    skillLine:
      "Cloud computing · Networking · Software foundations · Early professional experience",
    visual: "foundation",
    image: "/portfolio_images/home/narrative-foundation.png",
  },
  {
    phase: "03 · Impact",
    title: "A traffic collision changed my life, but not my direction.",
    copy: "Coming home from my first day at OfficePro Inc., I was hit by a speeding car while crossing the road after getting off a bus. What followed was devastating: hospitalization, a coma, cardiac arrest, clinical death, memory disruption, and having to relearn how to walk. That experience gave road safety a human face for me. It also turned my interest in autonomous systems into a personal mission to help build safer, smarter technology.",
    skillLine: "Human-centered engineering · Safety mindset · Resilience · Purpose-driven work",
    visual: "impact",
    image: "/portfolio_images/home/narrative-impact.png",
  },
  {
    phase: "04 · Recovery",
    title: "I rebuilt myself with the same persistence I now bring to engineering.",
    copy: 'During recovery, I also had to rebuild academically. I forgot years of math - down to long division - and still needed to pass the ALEKS placement exam to reach Calculus. Through relentless work on Khan Academy, I relearned roughly 12 years of math in about two months, passed the exam, graduated from P-TECH, and completed my AAS in Cloud Computing & Network Technology. That season taught me how to break down impossible problems into winnable steps.',
    skillLine:
      "Persistence · Problem decomposition · Quantitative recovery · Data-driven growth",
    visual: "recovery",
    image: "/portfolio_images/home/narrative-recovery.png",
  },
  {
    phase: "05 · Acceleration",
    title: "At Illinois Tech, that recovery turned into leadership and technical momentum.",
    copy: "I entered Illinois Tech determined to keep growing in AI engineering. Since then, I have built robotics and autonomy projects, contributed to EcoCAR, worked on automation at Technology Transition Paradigm, connected machine learning to product work at Grupo Eloria, and kept building systems that reduce manual effort while increasing capability. I am fully healed now, still ambitious, and more committed than ever to becoming a great engineer who helps people through technology.",
    skillLine:
      "AI engineering · Robotics · Autonomy · Product-minded systems thinking · Leadership",
    visual: "autonomy",
    image: "/portfolio_images/home/narrative-acceleration.png",
  },
];

const routeMilestones = [
  {
    phase: "Start",
    title: "P-TECH",
    icon: GraduationCap,
    body: (
      <>
        Dual enrollment in high school while earning an{" "}
        <strong><span className="technical-keyword">AAS in Cloud Computing &amp; Network Technology</span></strong>
        . This is where software, systems, and professional ambition became real.
      </>
    ),
    tag: "Introduction",
  },
  {
    phase: "Checkpoint 1",
    title: "The Internship",
    icon: BriefcaseBusiness,
    body: (
      <>
        A life-altering traffic collision fundamentally changed how I view technology's role in society. What was once an intellectual fascination with autonomy became a personal mission to <strong><span className="technical-keyword">build systems that people can trust with their lives</span></strong>. That experience continues to drive my work on safety-critical, reliable technologies capable of making transportation safer for millions.
      </>
    ),
    tag: "Rising action",
  },
  {
    phase: "Checkpoint 2",
    title: "Collision & Survival",
    icon: ShieldCheck,
    body: (
      <>
        A life-altering traffic collision turned autonomy from fascination into mission. <strong><span className="technical-keyword">Road safety, reliability, and meaningful engineering impact became personal.</span></strong>
      </>
    ),
    tag: "Climax",
  },
  {
    phase: "Checkpoint 3",
    title: "Rebuild",
    icon: HeartPulse,
    body: (
      <>
        Coma, cardiac arrest, relearning how to walk, recovering memory, and relearning 12 years of math in 2 months through Khan Academy before passing ALEKS and completing the P-TECH program. <strong><span className="technical-keyword">A formidable crucible, but ultimately a proving ground I conquered.</span></strong>
      </>
    ),
    tag: "Resilience",
  },
  {
    phase: "Checkpoint 4",
    title: "Illinois Tech & Leadership",
    icon: Cpu,
    body: (
      <>
        I carried that momentum into <strong><span className="technical-keyword">AI engineering, robotics leadership, and deeper technical growth</span></strong> that transformed recovery into long-term discipline and direction.
      </>
    ),
    tag: "Growth",
  },
  {
    phase: "Destination in motion",
    title: "EcoCAR · TTP · Grupo Eloria",
    icon: Bot,
    body: (
      <>
        Today I apply that mindset to <strong><span className="technical-keyword">Autonomy, AI products, security automation, and operational workflows</span></strong> by building systems that help people and organizations move better.
      </>
    ),
    tag: "Applied impact",
  },
];

const metaphorLanes = [
  {
    title: "Steering",
    headline: "Intentional over instinctive.",
    body: "Big goals need architecture before they can move. I map routes before I build them  by translating vision into project plans, system designs, and experiments that commit to a destination before committing to motion.",
    proof:
      "Robotics leadership, AI product planning, project execution, and clear technical direction.",
    image: "/portfolio_images/home/metaphor-steering.png",
  },
  {
    title: "Braking",
    headline: "Speed means nothing without control.",
    body: "The hardest engineering decisions are the ones that slow things down on purpose  with validation checkpoints, security audits, privacy review, documentation that outlasts the sprint. The best systems know when to hold. I know, because I've led them.",
    proof:
      "EcoCAR validation thinking, TTP security workflows, privacy-aware design, trustworthy system behavior.",
    image: "/portfolio_images/home/metaphor-braking.png",
  },
  {
    title: "Sensors",
    headline: "Perception before action.",
    body: (
      <>
        "Decisions built on instinct fail at scale. I invest in the signal layer first, from  <span className="technical-keyword">user data, logs, feedback loops, and domain context</span> before committing to any direction. Awareness is what separates a system that guesses from one that knows.",
      </>
    ),
    proof:
      "Computer vision, sensor fusion, ML workflows, accessibility robotics, measured iteration.",
    image: "/portfolio_images/home/metaphor-sensors.png",
  },
  {
    title: "Powertrain",
    headline: "Potential is nothing until it moves.",
    body: "Execution is where engineering lives  -  Python, C++, TypeScript, APIs, databases, cloud tooling, Linux. The stack serves the outcome, not the résumé. What matters is that the system runs, ships, and holds under load.",
    proof:
      "AI apps, automation tooling, backend integrations, deployment debugging, production-minded implementation.",
    image: "/portfolio_images/home/metaphor-powertrain.png",
  },
  {
    title: "Navigation",
    headline: "The destination shapes every decision.",
    body: "Autonomous vehicles, safer mobility, AI that reduces avoidable harm  -  these aren't aspirations chosen for the portfolio. They're the coordinates everything else is calibrated around.",
    proof:
      "EcoCAR, Technology Transition Paradigm, Grupo Eloria, OfficePro, AILA, and related builds.",
    image: "/portfolio_images/home/metaphor-navigation.png",
  },
  {
    title: "Calibration",
    headline: "Trust is earned through measurement.",
    body: "Models, sensors, and workflows drift when assumptions go untested. I measure behavior against reality, tune what falls short, and revalidate after every meaningful change so the system improves without losing reliability.",
    proof:
      "Model evaluation, sensor alignment, regression testing, feedback loops, and post-deployment iteration.",
    image: "/portfolio_images/home/metaphor-calibration.png",
  },
];

const symbolismMetricDetails = [
  {
    metric: "g cost",
    detail:
      "The measured route cost from the starting node to the current solved path. It represents the work already paid for: training, recovery, project execution, and the real distance covered.",
  },
  {
    metric: "h0 direct",
    detail:
      "The first heuristic estimate, or the clean straight-line guess before reality complicates the route. In the story, this is the early dream of autonomy before life added constraints.",
  },
  {
    metric: "f goal",
    detail:
      "A* combines known cost and estimated distance to choose a smarter next step. It symbolizes how I now make decisions: insight plus direction, not motion for motion's sake.",
  },
  {
    metric: "detour",
    detail:
      "The extra distance between the ideal route and the real route. The detour matters because the setback did not erase the destination; it changed the path and made the mission more specific.",
  },
  {
    metric: "scanned / coverage",
    detail:
      "How much of the problem space was explored before committing to a path. This reflects technical curiosity, validation, debugging, and learning from more than the obvious route.",
  },
  {
    metric: "hops / links",
    detail:
      "The steps and connections in the final route. These map to P-TECH, the internship, the collision, recovery, Illinois Tech, leadership, EcoCAR, and applied AI work.",
  },
  {
    metric: "avg edge / branch factor",
    detail:
      "How dense and demanding the route is. It shows that the story is not a single miracle moment; it is a connected system of choices, constraints, opportunities, and follow-through.",
  },
];

function SymbolismInfoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    scrollPositionRef.current = { x: window.scrollX, y: window.scrollY };
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      if (dialog.open) dialog.close();
      window.requestAnimationFrame(() => {
        window.scrollTo(scrollPositionRef.current.x, scrollPositionRef.current.y);
      });
    };
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="symbolism-info-modal"
      aria-label="See the Symbolism details"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }}
    >
      <article className="symbolism-info-panel">
        <div className="symbolism-info-toolbar">
          <button
            type="button"
            className="symbolism-info-close"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onClose();
            }}
            aria-label="Close symbolism details"
            autoFocus
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="symbolism-info-header">
          <span className="symbolism-info-kicker">Background decoder</span>
          <h2>Sentiment of the Symbolism</h2>
          <p>
            This moment turns the homepage into a live autonomy metaphor: a vehicle outline, A*
            path planning, scanning telemetry, and route animation all work together to show how my
            story moves from uncertainty to a validated direction.
          </p>
        </div>

        <div className="symbolism-info-grid">
          <section>
            <h3>What is happening in the background</h3>
            <p>
              The animated graph is a live path-planning scene. Nodes represent possible states,
              links represent available transitions, and the highlighted route shows the solved
              path from origin to goal. The A* telemetry updates after the route is drawn so the
              numbers feel earned, like a result being reported after the system has actually
              solved the route.
            </p>
            <p>
              The vehicle layer ties that planning system back to autonomous driving. The motion,
              sensors, glowing route, and dashboard-like metrics are there to make the portfolio
              feel like an intelligent system rather than a static resume page.
            </p>
          </section>

          <section>
            <h3>Why it matters to my story</h3>
            <p>
              The section represents the core pattern of my life and engineering work: observe the
              environment, understand constraints, choose a route, recover when the path changes,
              and keep moving toward a mission. The collision and recovery are not shown as a stop;
              they are shown as a reroute.
            </p>
            <p>
              That is why the visuals lean into autonomy. My interest in safer vehicles became
              personal, and the background turns that mission into a system metaphor: perception,
              planning, control, validation, and forward motion.
            </p>
          </section>
        </div>

        <section className="symbolism-info-metrics">
          <h3>Metric details</h3>
          <div className="symbolism-info-metric-grid">
            {symbolismMetricDetails.map((item) => (
              <div key={item.metric} className="symbolism-info-metric">
                <strong>{item.metric}</strong>
                <span>{item.detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="symbolism-info-purpose">
          <h3>Purpose of the visual system</h3>
          <p>
            The goal is to make the portfolio legible before reading
            every paragraph. The visuals say: this person thinks in systems, cares about safety,
            understands autonomous planning concepts, and can translate a difficult personal
            journey into disciplined technical direction.
          </p>
        </section>
      </article>
    </dialog>
  );
}

function Home() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const symbolismRef = useRef<HTMLElement | null>(null);
  const [symbolismInfoOpen, setSymbolismInfoOpen] = useState(false);
  const openSymbolismInfo = useCallback(() => setSymbolismInfoOpen(true), []);
  const closeSymbolismInfo = useCallback(() => setSymbolismInfoOpen(false), []);

  useEffect(() => {
    const root = document.documentElement;
    const section = symbolismRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const active = entry.isIntersecting;
        root.classList.toggle("symbolism-active", active);
      },
      { threshold: 0.22, rootMargin: "-12% 0px -12% 0px" },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      root.classList.remove("symbolism-active");
    };
  }, []);

  return (
    <MotionPage className="mx-auto max-w-7xl px-6 home-story-page">
      <div className="home-scroll-telemetry" aria-hidden="true">
        <div className="telemetry-rail" />
        <div className="telemetry-car">▰</div>
        <div className="telemetry-label">route</div>
      </div>

      <section className="home-hero py-5 md:py-6 grid lg:grid-cols-[1.08fr_0.92fr] gap-6 items-center relative overflow-hidden">
        <div className="absolute inset-x-[-8%] bottom-8 h-24 home-road-scan" aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full text-xs text-accent">
            <Sparkles className="h-3 w-3" /> AI/ML Engineering · Autonomous Systems · Software Development · Innovative Solutions
          </div>
          <h1 className="mt-3 text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.02] animated-title-glow">
            <span className="text-gradient-rb">AI Engineer</span> building intelligent systems
            that perceive, reason, and act to{" "}
            <span className="text-gradient-rb">solve real-world problems.</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl">
            <TechnicalHighlight text="From agentic AI and intelligent automation to computer vision, robotics, and autonomy, I engineer reliable systems that turn complex signals into useful decisions and measurable impact." />
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/autonomous-vehicles"
              className="brand-button-lg inline-flex items-center gap-2 bg-gradient-rb text-background glow-blue hover:scale-[1.02] transition"
            >
              See the Autonomy Story <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/projects"
              className="brand-button-lg inline-flex items-center gap-2 glass hover:glow-blue transition"
            >
              View Build Logs <FileText className="h-4 w-4" />
            </Link>
          </div>
          <SocialLinks variant="buttons" className="mt-3" />
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {metrics.map((m) => (
              <div
                key={m.l}
                className="glass rounded-2xl p-3 hover-lift premium-border ambient-card min-h-[4.5rem]"
              >
                <div className="text-2xl font-display font-bold text-gradient-rb">{m.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{m.l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 18 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="home-cockpit-card glass premium-border rounded-[2rem] p-3 md:p-4">
            <div className="relative aspect-[4/3] max-w-[34rem] mx-auto rounded-3xl overflow-hidden ring-orb">
              <img src={heroPhoto} alt="Danish Nadar" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent" />
              <ImageZoomButton src={heroPhoto} alt="Danish Nadar" className="bottom-20" />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <div className="text-xs uppercase tracking-widest text-accent">
                  Currently building
                </div>
                <div className="text-sm font-semibold mt-1">
                  EcoCAR autonomy · AI automation · accessibility robotics
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-2xl bg-background/40 border border-border/70 p-2.5">
                <Gauge className="mx-auto h-5 w-5 text-accent" />
                <div className="mt-1">Recover</div>
              </div>
              <div className="rounded-2xl bg-background/40 border border-border/70 p-2.5">
                <Cpu className="mx-auto h-5 w-5 text-accent" />
                <div className="mt-1">Build</div>
              </div>
              <div className="rounded-2xl bg-background/40 border border-border/70 p-2.5">
                <Car className="mx-auto h-5 w-5 text-accent" />
                <div className="mt-1">Move</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <SectionReveal className="home-spaced-section py-8">
        <section className="home-telemetry-panel rounded-[2rem] border border-border/70 bg-background/25 p-6 md:p-8 overflow-hidden relative">
          <div className="absolute inset-0 home-telemetry-grid" aria-hidden="true" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="case-badge bg-gradient-rb text-background">Route initialization</div>
              <h2 className="mt-5 text-3xl md:text-5xl font-display font-bold leading-tight">
                A journey from curiosity to recovery to applied{" "}
                <span className="text-gradient-rb">AI engineering impact</span>.
              </h2>
              <p className="mt-4 text-muted-foreground leading-8">
                <TechnicalHighlight text="This story connects the work behind the portfolio: early technical training, a road-safety turning point, recovery through discipline, leadership at Illinois Tech, and a long-term commitment to autonomous systems and impactful AI engineering." />
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {openingTimeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: index * 0.08 }}
                    className="home-signal-card rounded-3xl border border-border/70 bg-background/40 p-5 premium-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-rb text-background">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-accent">
                        {item.label}
                      </div>
                    </div>
                    <h3 className="mt-4 text-xl font-display font-bold leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal className="home-spaced-section py-12">
        <section className="home-section-shell relative rounded-[2.25rem] border border-border/70 bg-background/25 p-5 md:p-8 overflow-hidden">
          <div
            className="absolute left-8 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent hidden md:block"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
              Autonomous engineering narrative
            </div>
            <h2 className="mt-2 text-3xl md:text-5xl font-display font-bold">
              Five chapters that explain who I am as an AI engineer.
            </h2>
            <p className="mt-4 text-muted-foreground leading-8">
              The visuals below are meant to read like a dashboard: sensing, foundation, disruption,
              recovery, and forward motion. Each chapter ties a part of my story directly to the
              skills and mindset behind my work.
            </p>
          </div>
          <div className="mt-10 space-y-7">
            {homeNarrativeChapters.map((chapter, index) => (
              <motion.article
                key={chapter.phase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.5 }}
                className={`home-chapter-card grid gap-5 lg:grid-cols-[0.72fr_1.28fr] rounded-[2rem] border border-border/70 bg-background/40 p-5 md:p-6 premium-border ${index % 2 ? "lg:ml-16" : "lg:mr-16"}`}
              >
                <div className="home-chapter-visual">
                  <img
                    src={chapter.image}
                    alt={chapter.phase}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <ImageZoomButton src={chapter.image} alt={chapter.title} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-accent">
                    {chapter.phase}
                  </div>
                  <h3 className="mt-2 text-2xl md:text-3xl font-display font-bold leading-tight">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 text-sm md:text-base leading-8 text-muted-foreground">
                    {chapter.copy}
                  </p>
                  <div className="mt-5 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-slate-100">
                    <span className="font-tech uppercase tracking-[0.16em] text-accent text-[10px] block mb-2">
                      Skill signal
                    </span>
                    {chapter.skillLine}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </SectionReveal>

      <SectionReveal className="home-spaced-section py-12">
        <section className="home-route-story rounded-[2rem] border border-border/70 bg-background/25 p-6 md:p-8 overflow-hidden relative">
          <div className="relative z-10 max-w-4xl">
            <div className="case-badge bg-gradient-rb text-background">Journey in motion</div>
            <h2 className="mt-5 text-3xl md:text-5xl font-display font-bold">
              Follow the route from survival to <span className="text-gradient-rb">Applied AI Engineering</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-8">
              On a high level: I built an early technical foundation, survived a traumatic experience (which I often refer to as <strong className="technical-keyword">my crucible</strong>),
              rebuilt from it, and turned that experience into a disciplined engineering mission.
            </p>
          </div>
          <div className="home-road-timeline mt-10">
            {routeMilestones.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.06 }}
                  className="home-road-stop glass premium-border rounded-[1.75rem] p-5"
                >
                  <div className="home-road-marker">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-[10px] uppercase tracking-[0.18em] text-accent">
                    {step.phase}
                  </div>
                  <h3 className="mt-2 text-xl font-display font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p>
                  <div className="mt-4 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-accent">
                    {step.tag}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>
      </SectionReveal>

      <SectionReveal className="home-spaced-section py-12">
        <section className="home-vehicle-system rounded-[2rem] border border-border/70 bg-background/25 p-6 md:p-8 overflow-hidden relative">
          <div className="home-vehicle-outline" aria-hidden="true" />
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
                The vehicle as a metaphor
              </div>
              <h2 className="mt-2 text-3xl md:text-5xl font-display font-bold">
                My skillset works like an autonomy system.
              </h2>
              <p className="mt-4 max-w-3xl text-muted-foreground leading-8">
                I do not want the homepage metaphor to feel arbitrary. Vehicles need direction,
                safety, awareness, execution, and navigation. My engineering work does too. These
                are the traits that show up across my projects, leadership, and professional
                experiences.
              </p>
            </div>
            <Link
              to="/stack-map"
              className="brand-button glass inline-flex items-center gap-2 hover:glow-blue transition"
            >
              Search the Stack Map <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative z-10 mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {metaphorLanes.map((lane, index) => (
              <motion.article
                key={lane.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="home-metaphor-card glass premium-border rounded-2xl p-5"
              >
                <div className="home-metaphor-image">
                  <img
                    src={lane.image}
                    alt={`${lane.title} metaphor visual`}
                    className="h-full w-full object-cover"
                  />
                  <ImageZoomButton src={lane.image} alt={`${lane.title}: ${lane.headline}`} />
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
                  {lane.title}
                </div>
                <div className="mt-2 text-xl font-display font-bold text-gradient-rb">
                  {lane.headline}
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{lane.body}</p>
                <p className="mt-4 text-xs leading-6 text-slate-200/85 border-t border-border/60 pt-4">
                  {lane.proof}
                </p>
              </motion.article>
            ))}
          </div>
        </section>
      </SectionReveal>

      <SectionReveal className="home-spaced-section py-10">
        <section className="home-section-shell rounded-[2rem] border border-border/70 bg-background/25 p-6 md:p-8 overflow-hidden relative">
          <div className="absolute inset-0 build-loop-bg" aria-hidden="true" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="case-badge bg-gradient-rb text-background">Future direction</div>
              <h2 className="mt-5 text-3xl md:text-5xl font-display font-bold leading-tight">
                Why this story matters to an autonomous vehicle employer.
              </h2>
              <p className="mt-4 text-muted-foreground leading-8">
                I am not interested in autonomy only because the technology is impressive. I care
                because I have seen how much safer and smarter systems could matter in the real world.
                My goal is to contribute to autonomous vehicles and adjacent AI systems in a way
                that is technically serious, mission-driven, and grounded in helping real people.
              </p>
              <p className="mt-4 text-muted-foreground leading-8">
                Across my work, that mission becomes concrete through perception pipelines,
                autonomy controls, accessibility robotics, AI products, security automation, and
                the validation practices required to make intelligent systems dependable.
              </p>
            </div>
            <div className="home-future-panel glass premium-border rounded-[1.75rem] p-6">
              <div className="flex items-center gap-3 text-accent">
                <Activity className="h-5 w-5" />
                <span className="text-xs uppercase tracking-[0.18em] font-tech">
                  Mission statement
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-display font-bold">
                <strong><span className="text-gradient-rb">Build systems that sense well, decide responsibly, and reduce avoidable harm.</span></strong>
              </h3>
              <div className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                <p>Contribute to autonomous vehicles and intelligent mobility.</p>
                <p>Use AI and automation to reduce repetitive effort in business operations.</p>
                <p>
                  Keep building with the mindset of someone who has had to recover, adapt, and
                  deliver successfully.
                </p>
                <p>
                  Help teams through both engineering execution and the ability to explain why the
                  work matters with a drive for business impact.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Autonomous Systems",
                  "AI Engineering",
                  "Robotics",
                  "Computer Vision",
                  "Automation",
                  "Systems Thinking",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal className="home-spaced-section home-symbolism-reveal py-0">
        <section
          ref={symbolismRef}
          id="see-the-symbolism"
          className="home-symbolism-section relative min-h-[100svh] overflow-visible"
          aria-label="See the Symbolism background showcase"
        >
          <div className="home-symbolism-frame">
            <div className="home-symbolism-label" aria-hidden="true">
              <span>See the</span>
              <strong>Symbolism</strong>
            </div>
            <button
              type="button"
              className="home-symbolism-info-trigger"
              onClick={openSymbolismInfo}
              aria-label="Open details about the Symbolism section"
              title="Open symbolism details"
            >
              <Info className="h-5 w-5" />
            </button>
          </div>
          <SymbolismInfoModal open={symbolismInfoOpen} onClose={closeSymbolismInfo} />
        </section>
      </SectionReveal>

      <SectionReveal className="home-spaced-section py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Featured work
            </h2>
            <p className="text-muted-foreground mt-2">
              <TechnicalHighlight text="The narrative above becomes real through robotics, autonomy, AI products, and automation systems." />
            </p>
          </div>
          <Link to="/projects" className="text-sm text-accent hover:underline hidden md:inline">
            All projects →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group block glass premium-border ambient-card rounded-3xl p-7 h-full hover:glow-blue transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-rb text-background font-semibold">
                    {p.domain}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.period}</span>
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-gradient-rb">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  <TechnicalHighlight text={p.summary} />
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(p.tech_stack || []).slice(0, 4).map((t: string) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-border text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </SectionReveal>
    </MotionPage>
  );
}

