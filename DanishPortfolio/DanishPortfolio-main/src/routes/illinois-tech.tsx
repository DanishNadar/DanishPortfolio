import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, Building2, FlaskConical, GraduationCap, Users } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/illinois-tech")({
  head: () => ({
    meta: [
      { title: "Illinois Tech — Danish Nadar" },
      {
        name: "description",
        content:
          "Computer science at Illinois Institute of Technology: coursework, research, and the academic foundation behind the engineering work.",
      },
    ],
  }),
  component: IllinoisTechPage,
});

function PlaceholderText({ id, prompt }: { id: string; prompt: string }) {
  return (
    <div className="rounded-2xl border border-accent/25 bg-background/35 p-4">
      <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech mb-2">{id}</div>
      <p className="text-muted-foreground text-sm leading-6">{prompt}</p>
    </div>
  );
}

function IllinoisTechPage() {
  return (
    <MotionPage mood="academic" className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">
      <section className="section-atmosphere section-atmosphere-academic grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center rounded-[2rem] p-6 md:p-10">
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <GraduationCap className="h-4 w-4" /> Illinois Institute of Technology
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            Where the <span className="text-gradient-rb">engineering foundation</span> was built.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            IIT gave curiosity structure: hard problems, strong peers, real competitions, and room
            to build.
          </p>
        </div>
        <ImageSlot
          id="IIT-HERO"
          title="Illinois Tech campus or event photo"
          guidance="Use a campus photo, classroom moment, lab photo, or any IIT event that captures the environment."
          src="/portfolio_images/generated/collaboration-lab-moment.png"
          aspect="aspect-[4/3]"
        />
      </section>

      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
          Academic foundation
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Computer Science, B.S.</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="glass premium-border rounded-3xl p-7">
            <span className="icon-well icon-well-academic mb-5"><BookOpenCheck className="h-5 w-5" /></span>
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech mb-4">
              Relevant coursework
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Data Structures & Algorithms",
                "Machine Learning",
                "Artificial Intelligence",
                "Computer Vision",
                "Operating Systems",
                "Databases",
                "Software Engineering",
                "Computer Networks",
                "Cybersecurity",
                "Probability & Statistics",
                "Linear Algebra",
                "Systems Programming",
              ].map((course) => (
                <div
                  key={course}
                  className="rounded-xl border border-border/60 bg-background/30 px-3 py-2 text-xs text-muted-foreground"
                >
                  {course}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div className="glass premium-border rounded-3xl p-7">
              <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech mb-3">
                What IIT gave me
              </div>
              <PlaceholderText
                id="IIT-CONTEXT-01"
                prompt="IIT turned technical foundations into practice through peers, EcoCAR, leadership, and hard projects."
              />
            </div>
            <ImageSlot
              id="IIT-02"
              title="Classroom, lab, or campus moment"
              guidance="A photo from class, a study session, the engineering building, or any IIT academic moment."
              src="/portfolio_images/stackmap/workstation-stack.jpg"
              aspect="aspect-video"
            />
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
          Campus involvement
        </div>
        <h2 className="mt-3 text-3xl font-display font-bold">Beyond the classroom</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="glass premium-border rounded-3xl p-6">
            <span className="icon-well icon-well-academic mb-5"><Building2 className="h-5 w-5" /></span>
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech mb-3">
              EcoCAR at IIT
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              A DOE national competition that connected coursework to real autonomy engineering.
            </p>
            <Link
              to="/student-organizations"
              className="mt-4 inline-flex items-center gap-2 text-accent text-sm hover:underline"
            >
              Student orgs <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="glass premium-border rounded-3xl p-6">
            <span className="icon-well icon-well-academic mb-5"><FlaskConical className="h-5 w-5" /></span>
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech mb-3">
              Research & labs
            </div>
            <PlaceholderText
              id="IIT-RESEARCH"
              prompt="AI/ML projects, autonomy experiments, and lane studies taught me to ask what the data truly proves."
            />
          </div>
          <div className="glass premium-border rounded-3xl p-6">
            <span className="icon-well icon-well-academic mb-5"><Users className="h-5 w-5" /></span>
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech mb-3">
              Community at IIT
            </div>
            <PlaceholderText
              id="IIT-COMMUNITY"
              prompt="Classmates, teammates, and mentors turned difficult work into shared progress."
            />
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
          Campus photos
        </div>
        <h2 className="mt-3 text-3xl font-display font-bold">IIT in pictures</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              id: "IIT-03",
              title: "Campus or building",
              guidance: "Crown Hall, Siegel Hall, the quad, or any recognizable IIT location.",
              src: "/portfolio_images/gallery/professional-event.jpg",
            },
            {
              id: "IIT-04",
              title: "Lab or project work",
              guidance:
                "A photo from a lab session, coding environment, robotics room, or engineering workspace.",
              src: "/portfolio_images/gallery/robotics-lab-action.jpg",
            },
            {
              id: "IIT-05",
              title: "Event or organization",
              guidance: "A club meeting, GBM, competition, or IIT event you were part of.",
              src: "/portfolio_images/gallery/leadership-moment.jpg",
            },
          ].map(({ id, title, guidance, src }) => (
            <ImageSlot
              key={id}
              id={id}
              title={title}
              guidance={guidance}
              src={src}
              aspect="aspect-[4/3]"
            />
          ))}
        </div>
      </section>

      <section className="mt-16 glass premium-border rounded-3xl p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Reflection</div>
        <h2 className="mt-3 text-3xl font-display font-bold">What studying here actually meant</h2>
        <div className="mt-5 grid md:grid-cols-2 gap-5">
          <PlaceholderText
            id="IIT-REFLECTION-01"
            prompt="Engineering means finding the right problem, validating the answer, and explaining why it matters."
          />
          <PlaceholderText
            id="IIT-REFLECTION-02"
            prompt="I leave with stronger fundamentals, clearer direction, and deeper respect for the teams behind ambitious work."
          />
        </div>
        <div className="mt-6 flex gap-3">
          <Link
            to="/autonomous-vehicles"
            className="brand-button glass inline-flex items-center gap-2"
          >
            Autonomy work <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/student-organizations"
            className="brand-button glass inline-flex items-center gap-2"
          >
            Student orgs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </MotionPage>
  );
}
