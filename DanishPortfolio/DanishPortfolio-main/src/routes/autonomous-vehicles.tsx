import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, Car, ExternalLink, Gauge, Network, Radar, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/autonomous-vehicles")({
  head: () => ({
    meta: [
      { title: "Autonomous Vehicles — Danish Nadar" },
      {
        name: "description",
        content:
          "Danish Nadar's autonomous vehicle mission, technical focus, project record, and image-ready portfolio page for autonomy work.",
      },
    ],
  }),
  component: AutonomousVehiclesPage,
});

const pillars = [
  {
    icon: Radar,
    title: "Perception",
    body: "Understanding lanes, vehicles, pedestrians, signs, driver state, and the surrounding scene through camera, radar, LiDAR, and learned models.",
  },
  {
    icon: Network,
    title: "Sensor fusion",
    body: "Combining noisy signals into a more trustworthy model of the world so the vehicle can make safer, more explainable decisions.",
  },
  {
    icon: Workflow,
    title: "Planning + control",
    body: "Connecting high-level decisions to real-time motion: lane keeping, trajectory choices, control loops, timing, and vehicle constraints.",
  },
  {
    icon: ShieldCheck,
    title: "Validation",
    body: "Testing the system against edge cases, failure modes, human factors, and validation work showing the system is not just impressive, but reliable.",
  },
];

const missionCards = [
  ["What I find hard (in the right way)", "Designing perception systems that degrade gracefully. Building fusion layers that surface uncertainty honestly. Writing validation that a safety reviewer can actually trust. These are the problems I want to spend years getting good at."],
  ["What I care about", "Autonomy should not be a black box. I care about the engineering story: what the system sensed, what it believed, why it acted, and how we know it worked. Explainability is not a feature — it is a design constraint."],
  ["Where I fit on a team", "I connect the layers. Perception outputs, CAN signals, ML model behavior, open-source tooling, real-time software constraints, and the written story that lets teammates and stakeholders understand why the system behaves the way it does."],
  ["Beyond the vehicle", "The same reasoning loop — sense, decide, act, validate — applies to business automation. TTP security workflows, Grupo Eloria product intelligence, OfficePro deployment systems: all of them are autonomy problems with a different sensor modality."],
];

const autonomyImageSlots = [
  {
    id: "AV-01",
    title: "Autonomy hero image",
    guidance: "Use a strong photo of you, a vehicle, an autonomy lab, EcoCAR work, or a robotics/autonomy setup.",
    src: "/portfolio_images/autonomy/av-hero.jpg",
    aspect: "aspect-[16/10]",
  },
  {
    id: "AV-02",
    title: "Autonomous vehicle pipeline diagram",
    guidance: "Place a diagram showing sensors → perception → fusion → planning → control → validation.",
    src: "/portfolio_images/autonomy/av-pipeline.jpg",
    aspect: "aspect-video",
  },
  {
    id: "AV-03",
    title: "Sensor or camera setup",
    guidance: "Use a photo of a camera, LiDAR/radar setup, vehicle sensor stack, or lab hardware.",
    src: "/portfolio_images/autonomy/sensor-setup.jpg",
    aspect: "aspect-video",
  },
  {
    id: "AV-04",
    title: "RTMaps / CAN / real-time tools screenshot",
    guidance: "Use a screenshot of RTMaps, CAN signal work, simulation logs, validation tools, or control software.",
    src: "/portfolio_images/autonomy/realtime-tools.jpg",
    aspect: "aspect-video",
  },
  {
    id: "AV-05",
    title: "Lane detection or RL simulator result",
    guidance: "Use an output image from lane detection, RL driving, road segmentation, or a simulator run.",
    src: "/portfolio_images/autonomy/lane-rl-result.jpg",
    aspect: "aspect-video",
  },
  {
    id: "AV-06",
    title: "Team, testing, or competition moment",
    guidance: "Use a photo of you with teammates, at a competition, in the lab, or beside the project vehicle.",
    src: "/portfolio_images/autonomy/team-testing.jpg",
    aspect: "aspect-[4/3]",
  },
  {
    id: "AV-07",
    title: "Validation dashboard / results image",
    guidance: "Use a plot, dashboard, confusion matrix, data table, driving test result, or before/after comparison.",
    src: "/portfolio_images/autonomy/validation-results.jpg",
    aspect: "aspect-video",
  },
  {
    id: "AV-08",
    title: "Mission-centered closing image",
    guidance: "Use an image that connects autonomy to people: accessibility, safety, mobility, mentoring, or community impact.",
    src: "/portfolio_images/autonomy/mission-impact.jpg",
    aspect: "aspect-[16/10]",
  },
];

function AutonomousVehiclesPage() {
  return (
    <MotionPage className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">
      <section className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <Car className="h-4 w-4" /> Autonomous vehicle focus
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            Building toward autonomy that is <span className="text-gradient-rb">safe, useful, and explainable</span>.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            The homepage carries the origin — the curiosity, the collision, the recovery. This page carries what came after: EcoCAR sensor fusion, the engineering thesis behind perception-to-decision pipelines, the validation discipline that makes autonomous systems trustworthy, and the open problems that keep the work compelling.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects/ecocar-sensor-fusion" className="brand-button bg-gradient-rb text-background inline-flex items-center gap-2">
              EcoCAR case study <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/projects/rl-autonomous-driving" className="brand-button glass inline-flex items-center gap-2">
              RL driving project <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/gallery" className="brand-button glass inline-flex items-center gap-2">
              View gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <ImageSlot {...autonomyImageSlots[0]} />
      </section>

      <section className="mt-12 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
        <ImageSlot
          id="AV-STORY"
          title="Autonomy pipeline visual"
          guidance="A diagram or photo showing sensor input → perception → fusion → planning → control, or EcoCAR lab work."
          src="/portfolio_images/articles/autonomy-mission-remix.jpg"
          aspect="aspect-[16/10]"
        />
        <div className="glass premium-border rounded-3xl p-7 md:p-9">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Engineering perspective</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Trustworthy autonomy starts with a commitment to the signal layer.</h2>
          <p className="mt-5 text-base md:text-lg leading-8 text-muted-foreground">
            Perception is not about detecting objects — it is about building a model of the world accurate enough to stake a decision on. Every camera frame, radar return, and LiDAR point is a claim about reality that the system must reason about, weight, and sometimes discard. Getting that layer right is not purely a software problem; it is an epistemics problem.
          </p>
          <p className="mt-4 text-base md:text-lg leading-8 text-muted-foreground">
            Sensor fusion is where the difficulty becomes structural. Individual sensors lie — cameras lose depth information, radar loses resolution, LiDAR struggles in precipitation. The fusion layer combines partial, noisy, sometimes contradictory signals into something more trustworthy than any one of them. At EcoCAR, working with CAN signals and vehicle subsystems gave me direct exposure to how that process works at the hardware boundary, not just in simulation.
          </p>
          <p className="mt-4 text-base md:text-lg leading-8 text-muted-foreground">
            Planning and control are where the system earns or loses the trust of the person inside the vehicle. Trajectory decisions, lane logic, and timing have to work within real vehicle constraints and hold across edge cases nobody wrote test scenarios for. Validation closes that loop — not by running the happy path in CI, but by building logs that can be audited, metrics that are honestly chosen, and documentation clear enough for a teammate or regulator to reconstruct the system's reasoning.
          </p>
        </div>
      </section>

      <section className="mt-12 glass premium-border rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(200,30,70,0.15),transparent_32%)]" aria-hidden="true" />
        <div className="relative grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Featured recognition</div>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">Intelligent Systems for Safer Roads</h2>
            <p className="mt-3 max-w-4xl text-base md:text-lg leading-8 text-muted-foreground">
              Illinois Tech featured the story behind my autonomy mission: how being struck by a speeding car pushed me toward AI systems that can make transportation safer, more predictive, and more dependable in real environments.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/posts/intelligent-systems-for-safer-roads" className="brand-button bg-gradient-rb text-background inline-flex items-center gap-2">
              Read my reflection <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://www.iit.edu/student-experience/student-and-alumni-stories/intelligent-systems-safer-roads" target="_blank" rel="noreferrer" className="brand-button glass inline-flex items-center gap-2">
              Illinois Tech article <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>



      <section className="mt-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
        <div className="glass premium-border rounded-3xl p-7 md:p-9">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Autonomy beyond the vehicle</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">I want to make systems autonomous wherever human effort is being wasted.</h2>
          <p className="mt-5 text-base md:text-lg leading-8 text-muted-foreground">
            My road-safety mission is one part of a larger engineering belief: the best systems should sense what is happening, make the next step easier, reduce repetitive human labor, and help people focus on decisions that actually require judgment.
          </p>
          <p className="mt-4 text-base md:text-lg leading-8 text-muted-foreground">
            I have applied that mindset in Technology Transition Paradigm by automating SPF, DKIM, and DMARC analysis; in EcoCAR by working with vehicle signals and autonomy pipelines; in Grupo Eloria by connecting machine learning to product workflows; and in OfficePro by supporting AI and deployment systems that reduce manual setup and operational friction.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["TTP Automation", "EcoCAR", "Grupo Eloria", "OfficePro", "Open-source tooling"].map((item) => (
              <span key={item} className="case-badge glass text-accent">{item}</span>
            ))}
          </div>
        </div>
        <ImageSlot
          id="AV-BUSINESS"
          title="Autonomous systems for business operations"
          guidance="A visual connecting autonomous vehicle thinking to business process automation and operational intelligence."
          src="/portfolio_images/articles/autonomy-business-systems.jpg"
          aspect="aspect-[16/10]"
        />
      </section>

      <section className="mt-16 grid md:grid-cols-4 gap-5">
        {missionCards.map(([title, body]) => (
          <article key={title} className="glass premium-border ambient-card rounded-3xl p-7">
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">{title}</div>
            <p className="mt-4 text-base leading-8 text-muted-foreground">{body}</p>
          </article>
        ))}
      </section>

      <section className="mt-20">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Technical direction</div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">The autonomy stack I am growing into</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
          My goal is to keep building from both sides: the low-level vehicle software and signal flow, the Linux-based tooling that makes development reproducible, plus the AI/ML systems that interpret the world and support better decisions.
        </p>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {pillars.map(({ icon: Icon, title, body }) => (
            <article key={title} className="glass premium-border ambient-card rounded-3xl p-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-rb text-background">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 grid lg:grid-cols-[0.92fr_1.08fr] gap-8 items-start">
        <div className="glass premium-border rounded-3xl p-8 sticky top-24">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Working thesis</div>
          <h2 className="mt-3 text-3xl font-display font-bold">Autonomy is a trust problem as much as it is an AI problem.</h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            A vehicle does not become trustworthy just because it detects lanes or predicts objects. It becomes trustworthy when its perception, uncertainty handling, control decisions, fallback behavior, and validation record all connect into one story.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
            <div className="glass rounded-2xl p-4"><span className="text-accent font-semibold">Inputs:</span> cameras, radar/LiDAR, CAN, driver state, maps, and simulation data.</div>
            <div className="glass rounded-2xl p-4"><span className="text-accent font-semibold">Reasoning:</span> perception, fusion, prediction, planning, and policy decisions.</div>
            <div className="glass rounded-2xl p-4"><span className="text-accent font-semibold">Validation:</span> test cases, metrics, edge cases, logs, demos, and honest limitations.</div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {autonomyImageSlots.slice(1, 5).map((slot) => (
            <ImageSlot key={slot.id} {...slot} />
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Outcomes I want this page to show</div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Autonomy results, people, and proof of direction</h2>
        <div className="mt-8 grid lg:grid-cols-3 gap-5">
          {autonomyImageSlots.slice(5).map((slot) => (
            <ImageSlot key={slot.id} {...slot} />
          ))}
        </div>
      </section>

      <section className="mt-20 glass premium-border rounded-3xl p-8 md:p-10">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-rb text-background">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Next direction</div>
            <h2 className="mt-2 text-3xl font-display font-bold">What I want to keep building</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-4xl">
              I want to keep moving toward projects where autonomy meets real-time systems, embedded constraints, open-source engineering culture, human-centered design, responsible AI, and operational automation. The long-term goal is to contribute to vehicles and robots that help people navigate the world more safely and independently.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/stack-map" className="brand-button glass inline-flex items-center gap-2">
                See technical stack <Gauge className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="brand-button bg-gradient-rb text-background inline-flex items-center gap-2">
                Talk autonomy <Sparkles className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MotionPage>
  );
}
