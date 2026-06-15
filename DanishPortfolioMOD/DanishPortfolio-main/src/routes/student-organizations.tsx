import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Cpu, Users, Zap } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/student-organizations")({
  head: () => ({
    meta: [
      { title: "Student Organizations — Danish Nadar" },
      {
        name: "description",
        content:
          "Danish Nadar's involvement in EcoCAR, student clubs, and teams at Illinois Institute of Technology.",
      },
    ],
  }),
  component: StudentOrganizationsPage,
});

function StudentOrganizationsPage() {
  return (
    <MotionPage
      mood="community"
      tone="brand"
      className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page"
    >
      <section className="section-atmosphere section-atmosphere-community max-w-5xl rounded-[2rem] p-6 md:p-9">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
          <Users className="h-4 w-4" /> Student organizations
        </div>
        <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
          Where engineering meets <span className="text-gradient-rb">teamwork and purpose</span>.
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
          Illinois Tech gave me teams worth building with, where technical skill found purpose and
          purpose found community.
        </p>
      </section>

      {/* EcoCAR — featured, real content */}
      <section className="mt-16 section-atmosphere section-atmosphere-community rounded-[2rem] p-6 md:p-10">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_40%)]"
          aria-hidden="true"
        />
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-well icon-well-community h-12 w-12">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech">
                  Featured org
                </div>
                <h2 className="font-display text-2xl font-bold">EcoCAR EV Challenge</h2>
              </div>
            </div>
            <p className="text-base leading-8 text-muted-foreground">
              EcoCAR is a multi-year DOE and GM-sponsored competition where university teams
              redesign a production vehicle for electrification and autonomy. It joins real
              hardware, software, validation, and cross-disciplinary teamwork.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              I work on autonomy and perception with CAN signals, RTMaps, and the sensor stack. The
              system must survive testing, not just simulation.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Sensor Fusion",
                "CAN Bus",
                "RTMaps",
                "Autonomy Stack",
                "Vehicle Systems",
                "Real-Time Software",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to="/autonomous-vehicles"
                className="brand-button bg-gradient-rb text-background inline-flex items-center gap-2"
              >
                See autonomy work <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid gap-5">
            <ImageSlot
              id="SO-ECOCAR-01"
              title="EcoCAR team or vehicle"
              guidance="Use a photo of the Illinois Tech EcoCAR team, the project vehicle, a lab session, or a competition moment."
              src="/portfolio_images/achievements/ecocar-autonomy.jpg"
              aspect="aspect-[4/3]"
            />
            <ImageSlot
              id="SO-ECOCAR-02"
              title="EcoCAR technical work"
              guidance="Use a photo of the sensor stack, CAN bus setup, RTMaps session, testing environment, or hardware work."
              src="/portfolio_images/autonomy/realtime-tools.jpg"
              aspect="aspect-video"
            />
          </div>
        </div>
      </section>

      <section className="mt-10 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
        <ImageSlot
          id="SO-ORG2-01"
          title="Illinois Tech Robotics"
          guidance="Use a photo from this organization's events, meetings, projects, or team moments."
          src="/portfolio_images/generated/collaboration-lab-moment.png"
          aspect="aspect-video"
        />
        <div className="glass premium-border rounded-3xl p-7 md:p-9">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-well icon-well-community h-11 w-11">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-accent/60 font-tech">
                Organization
              </div>
              <h2 className="font-display text-xl font-bold">Illinois Tech Robotics</h2>
            </div>
          </div>
          <p className="text-base leading-8 text-muted-foreground">
            Robotics made engineering communal. I helped lead technical direction, workshops,
            projects, and club systems that move students from curiosity to building.
          </p>
          <div className="mt-5">
            <p className="text-base leading-8 text-muted-foreground">
              That includes accessibility robotics, AI/ML/Linux/Python sessions, budgeting,
              documentation, and a culture where learning does not require pretending.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
        <div className="glass premium-border rounded-3xl p-7 md:p-9">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-well icon-well-community h-11 w-11">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-accent/60 font-tech">
                Organization
              </div>
              <h2 className="font-display text-xl font-bold">ML@IIT</h2>
            </div>
          </div>
          <p className="text-base leading-8 text-muted-foreground">
            ML@IIT makes applied AI approachable through projects, shared resources, and
            conversations grounded in real problems.
          </p>
          <div className="mt-5">
            <p className="text-base leading-8 text-muted-foreground">
              Learn carefully. Build together. Explain what you made.
            </p>
          </div>
        </div>
        <ImageSlot
          id="SO-ORG3-01"
          title="ML@IIT learning community"
          guidance="Use a photo from this organization's events, work, or team."
          src="/portfolio_images/stackmap/machine-learning.jpg"
          aspect="aspect-video"
        />
      </section>

      {/* Cross-org reflection */}
      <section className="mt-16 glass premium-border rounded-3xl p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
          What orgs teach that courses don't
        </div>
        <h2 className="mt-3 text-3xl font-display font-bold">The work that required a team</h2>
        <div className="mt-5 grid md:grid-cols-2 gap-5">
          <p className="rounded-2xl border border-border/70 bg-background/30 p-5 text-sm leading-7 text-muted-foreground">
            Technical work moves when teams coordinate, document, ask for help, and recover from
            imperfect plans.
          </p>
          <p className="rounded-2xl border border-border/70 bg-background/30 p-5 text-sm leading-7 text-muted-foreground">
            Leadership is repeated work: make the next step clearer.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/friends"
            className="brand-button bg-gradient-rb text-background inline-flex items-center gap-2"
          >
            Friends & community <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/leadership-academy"
            className="brand-button glass inline-flex items-center gap-2"
          >
            Leadership academy <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/autonomous-vehicles"
            className="brand-button glass inline-flex items-center gap-2"
          >
            Autonomy work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </MotionPage>
  );
}
