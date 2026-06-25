import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Cpu, Users, Zap } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/student-organizations")({
  head: () => ({
    meta: [
      { title: "Student Organizations  -  Danish Nadar" },
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
    <MotionPage className="la-page mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">
      <section className="la-hero relative rounded-[2rem] border overflow-hidden p-8 md:p-12">
        <div className="la-hero-glow la-hero-glow-a" aria-hidden="true" />
        <div className="la-hero-glow la-hero-glow-b" aria-hidden="true" />
        <div className="la-hero-glow la-hero-glow-c" aria-hidden="true" />
        <div className="la-haze" aria-hidden="true" />
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <Users className="h-4 w-4" /> Student organizations
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            Where engineering meets <span className="text-gradient-rb">teamwork and purpose</span>.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Illinois Tech is where I found teams worth building with. These are the organizations that
            put the work into context, giving technical skills a mission and that mission a community.
          </p>
        </div>
      </section>

      {/* EcoCAR  -  featured, real content */}
      <section className="mt-16 rounded-[2rem] border border-red-900/25 bg-background/25 p-6 md:p-10 overflow-hidden relative">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(130,20,45,0.14),transparent_40%)]"
          aria-hidden="true"
        />
        <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div className="glass premium-border rounded-[1.5rem] p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-rb text-background">
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
              redesign a production vehicle for improved efficiency, electrification, and autonomy.
              At Illinois Tech, it sits at the intersection of everything I care about: real vehicle
              hardware, sensor systems, software pipelines, team coordination, and the validation
              rigor that safety-critical work demands.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              My work has focused on the autonomy and perception side, working with CAN bus signals,
              RTMaps, and the sensor stack to contribute to a vehicle system that has to hold up
              under test conditions, not just simulation. The program runs on deadlines,
              deliverables, and cross-disciplinary collaboration, which means technical depth and
              communication have to coexist.
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
                <Link
                  key={tag}
                  to="/stack-map"
                  search={{ q: tag, page: 1, category: "all", stackJump: "search" }}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent transition"
                >
                  {tag}
                </Link>
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
              src="/portfolio_images/orgs/ecocar-team.jpg"
              aspect="aspect-[4/3]"
            />
            <ImageSlot
              id="SO-ECOCAR-02"
              title="EcoCAR technical work"
              guidance="Use a photo of the sensor stack, CAN bus setup, RTMaps session, testing environment, or hardware work."
              src="/portfolio_images/orgs/ecocar-technical.jpg"
              aspect="aspect-video"
            />
          </div>
        </div>
      </section>

      {/* Illinois Tech Robotics */}
      <section className="mt-10 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
        <ImageSlot
          id="SO-ORG2-01"
          title="Illinois Tech Robotics"
          guidance="Robotics leadership, lab operations, workshops, and team project work."
          src="/portfolio_images/orgs/org2-hero.jpg"
          aspect="aspect-video"
        />
        <div className="glass premium-border rounded-3xl p-7 md:p-9">
          <div className="flex items-center gap-3 mb-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-rb text-background">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-accent/60 font-tech">
                Organization
              </div>
              <h2 className="font-display text-xl font-bold">Illinois Tech Robotics</h2>
            </div>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            As Treasurer, instructor, and robotics leader, I helped strengthen the operational and
            technical foundation of the organization through budgeting, lab organization,
            documentation, workshops, and project support.
          </p>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            The organization became a place to teach Python, Linux, machine learning, and robotics
            while also supporting ambitious builds such as OBSERV-E. That work connected financial
            stewardship, technical mentorship, and hands-on engineering.
          </p>
        </div>
      </section>

      {/* ML@IIT */}
      <section className="mt-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
        <div className="glass premium-border rounded-3xl p-7 md:p-9">
          <div className="flex items-center gap-3 mb-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-rb text-background">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-accent/60 font-tech">
                Organization
              </div>
              <h2 className="font-display text-xl font-bold">ML@IIT</h2>
            </div>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            As President of ML@IIT, I focus on making machine learning practical and approachable
            through workshops, project pathways, peer learning, and collaboration with other
            technical organizations.
          </p>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            The goal is to help students move from interest to implementation: choosing a problem,
            understanding the data, building a baseline, evaluating results, and communicating what
            the model actually learned.
          </p>
        </div>
        <ImageSlot
          id="SO-ORG3-01"
          title="ML@IIT"
          guidance="Machine learning workshops, project sessions, and community events."
          src="/portfolio_images/orgs/org3-hero.jpg"
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
          <p className="rounded-2xl border border-border/60 bg-background/30 p-5 text-sm leading-7 text-muted-foreground">
            Student organizations taught me that momentum depends on operating systems: clear
            ownership, realistic budgets, documented decisions, consistent communication, and
            meetings that end with accountable next steps.
          </p>
          <p className="rounded-2xl border border-border/60 bg-background/30 p-5 text-sm leading-7 text-muted-foreground">
            They also taught me to lead through constraints. When time, funding, or alignment is
            limited, the answer is not more enthusiasm; it is clearer scope, better listening, and a
            plan the team can actually execute.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
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
