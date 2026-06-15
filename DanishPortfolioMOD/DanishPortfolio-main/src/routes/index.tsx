import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Car,
  Cpu,
  Crosshair,
  FileText,
  Gauge,
  GraduationCap,
  HeartPulse,
  Navigation2,
  Radar,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { projectsQuery } from "@/lib/queries";
import heroPhoto from "@/assets/danish-hero.jpg";
import { SocialLinks } from "@/components/SocialLinks";
import { MotionPage } from "@/components/MotionPage";
import { SectionReveal } from "@/components/SectionReveal";
import { ImmersiveImage } from "@/components/ImmersiveImage";
import { getProjectPage } from "@/content/projectPages";
import { projectCoverPath } from "@/lib/visuals";
import { rankProjectsForAiEngineering } from "@/lib/projectRanking";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  component: Home,
});

const metrics = [
  { v: "16+", l: "chapters of applied building" },
  { v: "244+", l: "skills tied to real work" },
  { v: "1st", l: "robotics recognition earned with a team" },
  { v: "AI", l: "guided by usefulness" },
];

const openingTimeline = [
  {
    label: "Curiosity",
    icon: Radar,
    title: "I started with one question: how can a car see?",
    body: "Before AI became a buzzword, I wanted to know how cameras, sensors, and code could teach a car to understand the road.",
  },
  {
    label: "Impact",
    icon: ShieldCheck,
    title: "Then road safety became personal.",
    body: "After my first day at OfficePro, a speeding car struck me crossing the road. Safety stopped being abstract.",
  },
  {
    label: "Recovery",
    icon: HeartPulse,
    title: "Recovery taught me how to rebuild under pressure.",
    body: "I relearned movement, memory, and years of math. Recovery became my method: break it down, test the next step, keep moving.",
  },
  {
    label: "Mission",
    icon: RouteIcon,
    title: "Now the mission is bigger than one vehicle.",
    body: "Now I build AI and autonomous systems to reduce harm, remove friction, and help people move with more confidence.",
  },
];

const homeNarrativeChapters = [
  {
    phase: "01 · Ignition",
    title: "The first spark was a quiet question about intelligent vehicles.",
    copy: "Autonomous vehicles asked the question that shaped me: how can code understand a moving world? It pulled me into AI, computer vision, and robotics.",
    skillLine:
      "Curiosity-driven engineering · Computer vision mindset · AI fundamentals · Technical storytelling",
    visual: "radar",
    image: "/portfolio_images/home/narrative-ignition.png",
  },
  {
    phase: "02 · Foundation",
    title: "P-TECH gave me a foundation and an early sense of responsibility.",
    copy: "Through P-TECH, I finished high school while earning an AAS in Cloud Computing and Network Technology. It taught me early that systems carry responsibility.",
    skillLine:
      "Cloud computing · Networking · Software foundations · Early professional experience",
    visual: "foundation",
    image: "/portfolio_images/home/narrative-foundation.png",
  },
  {
    phase: "03 · Impact",
    title: "A traffic collision changed my life, and deepened my direction.",
    copy: "A speeding car struck me after my first day at OfficePro. Safety became personal. Engineering decisions no longer felt abstract; lives sit downstream.",
    skillLine: "Human-centered engineering · Safety mindset · Resilience · Purpose-driven work",
    visual: "impact",
    image: "/portfolio_images/home/narrative-impact.png",
  },
  {
    phase: "04 · Recovery",
    title: "Rebuilding taught me to treat hard problems as a series of honest steps.",
    copy: "Recovery meant rebuilding academically too. I relearned roughly 12 years of math in two months, passed ALEKS, and completed my AAS. Patience became proof.",
    skillLine:
      "Persistence · Problem decomposition · Quantitative recovery · Evidence-based growth",
    visual: "recovery",
    image: "/portfolio_images/home/narrative-recovery.png",
  },
  {
    phase: "05 · Acceleration",
    title: "At Illinois Tech, recovery turned into disciplined building.",
    copy: "At Illinois Tech, recovery became momentum: robotics, EcoCAR, automation, and applied ML. I stopped building only to learn and started building to matter.",
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
    body: "Dual enrollment in high school while earning an AAS in Cloud Computing & Network Technology. This is where software, systems, and responsibility started to feel real.",
    tag: "Introduction",
  },
  {
    phase: "Checkpoint 1",
    title: "OfficePro Internship",
    icon: BriefcaseBusiness,
    body: "Early internship experience connected classroom learning to real work, and placed my interest in software inside a larger question: how should technology serve people when the stakes are real?",
    tag: "Rising action",
  },
  {
    phase: "Checkpoint 2",
    title: "Collision & Recovery",
    icon: ShieldCheck,
    body: "A life-altering traffic collision turned autonomy from fascination into mission. Road safety, reliability, and meaningful engineering impact became personal.",
    tag: "Turning point",
  },
  {
    phase: "Checkpoint 3",
    title: "Rebuild",
    icon: HeartPulse,
    body: "Recovery meant rebuilding body, memory, confidence, and math fundamentals one step at a time. Passing ALEKS and completing P-TECH became less about proving something and more about learning how to rise patiently.",
    tag: "Resilience",
  },
  {
    phase: "Checkpoint 4",
    title: "Illinois Tech & Leadership",
    icon: Cpu,
    body: "I carried that momentum into AI engineering, robotics leadership, and deeper technical growth, turning recovery into long-term discipline and direction.",
    tag: "Growth",
  },
  {
    phase: "Destination in motion",
    title: "EcoCAR · TTP · Grupo Eloria",
    icon: Bot,
    body: "Today I apply that mindset to autonomy, AI products, security automation, and operational workflows—building systems that help people and organizations move better.",
    tag: "Applied impact",
  },
];

const metaphorLanes = [
  {
    title: "Steering",
    icon: Navigation2,
    headline: "Leadership gave the work a direction.",
    body: "In robotics, I learned that leading is not choosing every turn. It is helping a team agree on who the system should serve, then turning that purpose into a route people can build together.",
    evidenceLabel: "See that direction become OBSERV-E",
    evidenceTo: "/posts/starkhacks-2026-observ-e-win",
    image: "/portfolio_images/home/metaphor-steering.png",
  },
  {
    title: "Braking",
    icon: ShieldCheck,
    headline: "Responsibility changed how I define progress.",
    body: "Once safety became personal, moving fast was no longer enough. EcoCAR taught me to treat validation, documentation, and restraint as part of the engineering, not delays around it.",
    evidenceLabel: "Explore the EcoCAR case study",
    evidenceTo: "/projects/ecocar-sensor-fusion",
    image: "/portfolio_images/home/metaphor-braking.png",
  },
  {
    title: "Sensors",
    icon: Radar,
    headline: "Better decisions begin with a truer picture.",
    body: "Sensor fusion taught me to respect incomplete signals. Whether I am reading vehicle data or team feedback, I look for context before committing the system to an answer.",
    evidenceLabel: "Read what sensor fusion taught me",
    evidenceTo: "/posts/ecocar-sensor-fusion-reflection",
    image: "/portfolio_images/home/metaphor-sensors.png",
  },
  {
    title: "Powertrain",
    icon: Cpu,
    headline: "Discipline turns intent into something real.",
    body: "Purpose still has to survive contact with code. I use the stack to carry an idea through architecture, integration, debugging, and deployment until someone can genuinely use it.",
    evidenceLabel: "See the AI portfolio system",
    evidenceTo: "/posts/building-an-ai-avatar-portfolio",
    image: "/portfolio_images/home/metaphor-powertrain.png",
  },
  {
    title: "Navigation",
    icon: RouteIcon,
    headline: "Purpose tells me which problems deserve the journey.",
    body: "The accident made safer mobility personal. Since then, I have chosen work that can reduce harm, restore independence, or remove friction from someone's life.",
    evidenceLabel: "Read why safer roads became my mission",
    evidenceTo: "/posts/intelligent-systems-for-safer-roads",
    image: "/portfolio_images/home/metaphor-navigation.png",
  },
  {
    title: "Calibration",
    icon: Crosshair,
    headline: "Every result gives me a reason to look again.",
    body: "A model, plan, or team can drift while still appearing successful. I revisit assumptions, compare evidence, and improve the system instead of protecting the first answer.",
    evidenceLabel: "Follow the lane-detection study",
    evidenceTo: "/posts/lane-detection-backbone-bake-off",
    image: "/portfolio_images/home/metaphor-calibration.png",
  },
];

const missionTagClass =
  "rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-accent/60 hover:text-accent hover:bg-accent/10 transition-all duration-200";

function Home() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const featured = rankProjectsForAiEngineering(projects).slice(0, 6);

  return (
    <MotionPage mood="hero" tone="brand" className="mx-auto max-w-7xl px-6 home-story-page">
      <div className="home-scroll-telemetry" aria-hidden="true">
        <div className="telemetry-rail" />
        <div className="telemetry-car">▰</div>
        <div className="telemetry-label">route</div>
      </div>

      <section className="home-hero py-4 md:py-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start relative overflow-hidden">
        <div className="absolute inset-x-[-8%] bottom-8 h-24 home-road-scan" aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full text-xs text-accent">
            <Sparkles className="h-3 w-3" /> Machine Learning · Software Automation · Sensor Fusion
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-display font-bold leading-[1.1] animated-title-glow">
            <span className="text-gradient-rb">AI Engineer</span> rebuilding through curiosity,
            robotics, and <span className="text-gradient-rb">autonomous systems</span>.
          </h1>
          <p className="mt-3 text-base text-muted-foreground max-w-xl">
            Curiosity about machines that see. A collision that made safety personal. Recovery. Now
            building AI that reduces preventable harm.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/autonomous-vehicles"
              className="brand-button-lg inline-flex items-center gap-2 bg-gradient-rb text-background glow-blue hover:scale-[1.02] transition"
            >
              Follow the Autonomy Path <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/projects"
              className="brand-button-lg inline-flex items-center gap-2 glass hover:glow-blue transition"
            >
              Read the Project Chapters <FileText className="h-4 w-4" />
            </Link>
          </div>
          <SocialLinks variant="buttons" className="mt-3" />
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {metrics.map((m) => (
              <div
                key={m.l}
                className="glass rounded-2xl p-4 hover-lift premium-border ambient-card min-h-[6.25rem]"
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
          <div className="home-cockpit-card glass premium-border rounded-[2rem] p-3">
            <div className="relative aspect-[4/5] max-h-[520px] w-full rounded-3xl overflow-hidden ring-orb">
              <img
                src={heroPhoto}
                alt="Danish Nadar"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <div className="text-xs uppercase tracking-widest text-accent">
                  Currently building
                </div>
                <div className="text-sm font-semibold mt-1">
                  EcoCAR autonomy · AI automation · accessibility robotics
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
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

      <SectionReveal className="py-8">
        <section className="home-telemetry-panel rounded-[2rem] border border-border/70 bg-background/25 p-6 md:p-8 overflow-hidden relative">
          <div className="absolute inset-0 home-telemetry-grid" aria-hidden="true" />
          <div className="relative z-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="case-badge bg-gradient-rb text-background">Opening chapter</div>
              <h2 className="mt-5 text-3xl md:text-5xl font-display font-bold leading-tight">
                A path from curiosity, through rebuilding, into purposeful AI engineering.
              </h2>
              <p className="mt-4 text-muted-foreground leading-8">
                Technical training, a road-safety turning point, recovery, and Illinois Tech shaped
                one commitment: build technology that is useful, explainable, and humane.
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

      <SectionReveal className="py-12">
        <section className="relative rounded-[2.25rem] border border-border/70 bg-background/25 p-5 md:p-8 overflow-hidden">
          <div
            className="absolute left-8 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent hidden md:block"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
              Engineering as rebuilding
            </div>
            <h2 className="mt-2 text-3xl md:text-5xl font-display font-bold">
              Five chapters behind the engineer I am still becoming.
            </h2>
            <p className="mt-4 text-muted-foreground leading-8">
              Each chapter connects a turning point to the skills and discipline behind the work.
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

      <SectionReveal className="py-12">
        <section className="home-route-story rounded-[2rem] border border-border/70 bg-background/25 p-6 md:p-8 overflow-hidden relative">
          <div className="relative z-10 max-w-4xl">
            <div className="case-badge bg-gradient-rb text-background">Journey in motion</div>
            <h2 className="mt-5 text-3xl md:text-5xl font-display font-bold">
              The route from recovery to purposeful engineering should be easy to follow.
            </h2>
            <p className="mt-4 text-muted-foreground leading-8">
              I built a foundation, survived disruption, rebuilt with discipline, and turned
              recovery into an engineering mission.
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

      <SectionReveal className="py-12">
        <section className="home-vehicle-system rounded-[2rem] border border-border/70 bg-background/25 p-6 md:p-8 overflow-hidden relative">
          <div className="home-vehicle-outline" aria-hidden="true" />
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
                The vehicle as a metaphor
              </div>
              <h2 className="mt-2 text-3xl md:text-5xl font-display font-bold">
                My skillset is organized like an autonomy system.
              </h2>
              <p className="mt-4 max-w-3xl text-muted-foreground leading-8">
                Direction, safety, awareness, execution, and navigation shape both vehicles and my
                work.
              </p>
            </div>
            <Link
              to="/stack-map"
              className="brand-button glass inline-flex items-center gap-2 hover:glow-blue transition"
            >
              Search the Stack Map <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative z-10 mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {metaphorLanes.map((lane, index) => {
              const LaneIcon = lane.icon;
              return (
                <motion.article
                  key={lane.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="home-metaphor-card glass premium-border rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-200"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="metaphor-icon-animated grid h-9 w-9 place-items-center rounded-xl bg-gradient-rb text-background flex-shrink-0">
                      <LaneIcon className="h-4 w-4" />
                    </div>
                    <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
                      {lane.title}
                    </div>
                  </div>
                  <div className="home-metaphor-image">
                    <img
                      src={lane.image}
                      alt={`${lane.title} metaphor visual`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-3 text-xl font-display font-bold text-gradient-rb">
                    {lane.headline}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{lane.body}</p>
                  <Link
                    to={lane.evidenceTo}
                    className="home-metaphor-evidence mt-4 inline-flex items-center gap-2 border-t border-border/60 pt-4 text-sm font-semibold leading-6 text-accent transition-colors hover:text-foreground"
                  >
                    <span>{lane.evidenceLabel}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform" />
                  </Link>
                </motion.article>
              );
            })}
          </div>

          {/* System-status closing callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 relative z-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] px-5 py-4 flex flex-col sm:flex-row items-center gap-4 justify-between"
          >
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {metaphorLanes.map(({ title }) => (
                <div key={title} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
                  <span className="text-[10px] font-tech uppercase tracking-[0.16em] text-emerald-400/80">
                    {title}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs font-tech uppercase tracking-[0.18em] text-muted-foreground whitespace-nowrap">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_3px_rgba(52,211,153,0.4)] animate-pulse" />
              All systems operational
            </div>
          </motion.div>
        </section>
      </SectionReveal>

      <SectionReveal className="py-10">
        <section className="rounded-[2rem] border border-border/70 bg-background/25 p-6 md:p-8 overflow-hidden relative">
          <div className="absolute inset-0 build-loop-bg" aria-hidden="true" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="case-badge bg-gradient-rb text-background">Direction ahead</div>
              <h2 className="mt-5 text-3xl md:text-5xl font-display font-bold leading-tight">
                Why this story matters to teams building safer intelligent systems.
              </h2>
              <p className="mt-4 text-muted-foreground leading-8">
                I care about autonomy because safer systems change real lives. I want to build them
                with technical rigor, clear purpose, and respect for the people who depend on them.
              </p>
              <p className="mt-4 text-muted-foreground leading-8">
                The rest of this portfolio is the evidence.
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
                Build systems that sense carefully, decide responsibly, and reduce avoidable harm.
              </h3>
              <div className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                <p>Build safer autonomous and intelligent mobility systems.</p>
                <p>Use AI to remove repetitive work.</p>
                <p>Turn recovery into disciplined execution.</p>
                <p>Make complex work understandable.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/autonomous-vehicles" className={missionTagClass}>
                  Autonomous Systems
                </Link>
                <Link to="/projects" search={{ domain: "Applied AI" }} className={missionTagClass}>
                  AI Engineering
                </Link>
                <Link to="/autonomous-vehicles" className={missionTagClass}>
                  Robotics
                </Link>
                <Link
                  to="/stack-map"
                  search={{ page: 1, q: "computer vision", category: "all" }}
                  className={missionTagClass}
                >
                  Computer Vision
                </Link>
                <Link to="/projects" search={{ domain: "Applied AI" }} className={missionTagClass}>
                  Automation
                </Link>
                <Link
                  to="/stack-map"
                  search={{ page: 1, q: "systems thinking", category: "all" }}
                  className={missionTagClass}
                >
                  Systems Thinking
                </Link>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal className="py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Chapters where the mission becomes practical
            </h2>
            <p className="text-muted-foreground mt-2">
              The mission becomes real through robotics, autonomy, AI products, and automation.
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
                className="group block glass premium-border ambient-card rounded-3xl h-full hover:glow-blue transition-all hover:-translate-y-1 overflow-hidden"
              >
                <ImmersiveImage
                  src={getProjectPage(p.slug)?.gallery?.[0]?.src ?? projectCoverPath(p.cover_image)}
                  alt={`${p.title} visual`}
                  aspect="aspect-video"
                  animated={i < 3}
                  variant="card"
                  className="rounded-none"
                />
                <div className="p-7">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-rb text-background font-semibold">
                      {p.domain}
                    </span>
                    <span className="text-xs text-muted-foreground">{p.period}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-gradient-rb">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.summary}</p>
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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </SectionReveal>
    </MotionPage>
  );
}
