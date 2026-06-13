import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BrainCircuit, Car, ExternalLink, Gauge, Network, Radar, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/autonomous-vehicles")({
  head: () => ({
    meta: [
      { title: "Autonomy With Purpose - Danish Nadar" },
      {
        name: "description",
        content:
          "Danish Nadar's autonomous vehicle mission, technical focus, project record, and purpose-driven path into safer mobility systems.",
      },
    ],
  }),
  component: AutonomousVehiclesPage,
});

const pillars = [
  {
    icon: Radar,
    title: "Perception",
    body: "Turning camera, radar, LiDAR, and model outputs into a reliable view of the road.",
  },
  {
    icon: Network,
    title: "Sensor fusion",
    body: "Combining imperfect signals into decisions that are safer and easier to explain.",
  },
  {
    icon: Workflow,
    title: "Planning + control",
    body: "Turning decisions into real-time motion within timing, control, and vehicle constraints.",
  },
  {
    icon: ShieldCheck,
    title: "Validation",
    body: "Proving reliability across edge cases, failure modes, and human factors.",
  },
];

const missionCards = [
  ["The hard problems", "Graceful failure, honest uncertainty, and validation a safety reviewer can trust."],
  ["What matters", "The system should reveal what it sensed, why it acted, and how we know it worked."],
  ["Where I contribute", "I connect perception, CAN signals, ML behavior, real-time constraints, and the story behind the system."],
  ["Beyond vehicles", "Sense, decide, act, validate. The same loop powers useful business automation."],
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
    <MotionPage mood="autonomy" className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">
      <section className="section-atmosphere section-atmosphere-technical grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center rounded-[2rem] p-6 md:p-10">
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <Car className="h-4 w-4" /> Autonomous vehicle focus
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            Building toward autonomy that is <span className="text-gradient-rb">safe, useful, and explainable</span>.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            What came after the turning point: EcoCAR, sensor fusion, perception-to-decision
            pipelines, and the validation discipline trustworthy autonomy demands.
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
            Perception builds a model safe enough to act on. Every frame and return is a claim
            about reality, and the system must know what to trust.
          </p>
          <p className="mt-4 text-base md:text-lg leading-8 text-muted-foreground">
            Fusion joins sensors that fail differently: cameras lose depth, radar loses resolution,
            and LiDAR struggles in weather. EcoCAR brought that challenge to the hardware boundary
            through CAN signals and vehicle subsystems.
          </p>
          <p className="mt-4 text-base md:text-lg leading-8 text-muted-foreground">
            Planning and control turn belief into motion. Trust comes from edge cases, auditable
            logs, honest metrics, and decisions a teammate or regulator can reconstruct.
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
              Illinois Tech featured how a road-safety turning point became a mission to build more
              dependable transportation systems.
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
            Useful autonomy senses what is happening, removes repetitive work, and leaves judgment
            to people.
          </p>
          <p className="mt-4 text-base md:text-lg leading-8 text-muted-foreground">
            I apply that loop across EcoCAR, TTP security automation, Grupo Eloria product
            workflows, and OfficePro deployment systems.
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
          I am building across the full path: vehicle signals, reproducible Linux tooling, and the
          AI systems that interpret the world.
        </p>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {pillars.map(({ icon: Icon, title, body }) => (
            <article key={title} className="glass premium-border ambient-card rounded-3xl p-6">
              <div className="icon-well icon-well-technical h-12 w-12">
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
            Trust appears when perception, uncertainty, control, fallback behavior, and validation
            tell one coherent story.
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
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Autonomy results, people, and signals of direction</h2>
        <div className="mt-8 grid lg:grid-cols-3 gap-5">
          {autonomyImageSlots.slice(5).map((slot) => (
            <ImageSlot key={slot.id} {...slot} />
          ))}
        </div>
      </section>

      <section className="mt-20 glass premium-border rounded-3xl p-8 md:p-10">
        <div className="flex items-start gap-4">
          <div className="icon-well icon-well-technical h-12 w-12 shrink-0">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Next direction</div>
            <h2 className="mt-2 text-3xl font-display font-bold">What I want to keep building</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-4xl">
              I want to build vehicles and robots that combine real-time engineering, responsible
              AI, and human-centered design to help people move more safely and independently.
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
