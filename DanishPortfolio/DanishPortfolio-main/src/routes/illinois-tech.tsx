import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/illinois-tech")({
  head: () => ({
    meta: [
      { title: "Illinois Tech — Danish Nadar" },
      { name: "description", content: "Computer science at Illinois Institute of Technology: coursework, research, and the academic foundation behind the engineering work." },
    ],
  }),
  component: IllinoisTechPage,
});

function PlaceholderText({ id, prompt }: { id: string; prompt: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-accent/30 bg-accent/5 p-4">
      <div className="text-[10px] uppercase tracking-[0.18em] text-accent/60 font-tech mb-2">{id}</div>
      <p className="text-muted-foreground/60 italic text-sm leading-6">{prompt}</p>
    </div>
  );
}

function IllinoisTechPage() {
  return (
    <MotionPage className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">

      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <GraduationCap className="h-4 w-4" /> Illinois Institute of Technology
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            Where the <span className="text-gradient-rb">engineering foundation</span> was built.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Computer Science at IIT gave me more than coursework. It gave me the problems, the peers, the competitions, and the environment that turned curiosity into capability.
          </p>
        </div>
        <ImageSlot
          id="IIT-HERO"
          title="Illinois Tech campus or event photo"
          guidance="Use a campus photo, classroom moment, lab photo, or any IIT event that captures the environment."
          src="/portfolio_images/illinois-tech/iit-hero.jpg"
          aspect="aspect-[4/3]"
        />
      </section>

      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Academic foundation</div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Computer Science, B.S.</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="glass premium-border rounded-3xl p-7">
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech mb-4">Relevant coursework</div>
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
                <div key={course} className="rounded-xl border border-border/60 bg-background/30 px-3 py-2 text-xs text-muted-foreground">
                  {course}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div className="glass premium-border rounded-3xl p-7">
              <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech mb-3">What IIT gave me</div>
              <PlaceholderText
                id="IIT-CONTEXT-01"
                prompt="Write about what Illinois Tech specifically gave you: the environment, the research exposure, the access to EcoCAR, the student orgs, the people. What couldn't you have gotten elsewhere?"
              />
            </div>
            <ImageSlot
              id="IIT-02"
              title="Classroom, lab, or campus moment"
              guidance="A photo from class, a study session, the engineering building, or any IIT academic moment."
              src="/portfolio_images/illinois-tech/iit-academic.jpg"
              aspect="aspect-video"
            />
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Campus involvement</div>
        <h2 className="mt-3 text-3xl font-display font-bold">Beyond the classroom</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="glass premium-border rounded-3xl p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech mb-3">EcoCAR at IIT</div>
            <p className="text-sm leading-7 text-muted-foreground">The DOE national autonomous vehicle competition hosted through Illinois Tech, the project that connected coursework to real autonomy engineering.</p>
            <Link to="/student-organizations" className="mt-4 inline-flex items-center gap-2 text-accent text-sm hover:underline">
              Student orgs <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="glass premium-border rounded-3xl p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech mb-3">Research & labs</div>
            <PlaceholderText
              id="IIT-RESEARCH"
              prompt="Write about any research involvement, AI lab work, faculty mentorship, or academic projects that went beyond standard coursework."
            />
          </div>
          <div className="glass premium-border rounded-3xl p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech mb-3">Community at IIT</div>
            <PlaceholderText
              id="IIT-COMMUNITY"
              prompt="Write about the community you found or built at IIT: peers, study groups, the culture of the CS department, or what made the environment feel like yours."
            />
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Campus photos</div>
        <h2 className="mt-3 text-3xl font-display font-bold">IIT in pictures</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { id: "IIT-03", title: "Campus or building", guidance: "Crown Hall, Siegel Hall, the quad, or any recognizable IIT location." },
            { id: "IIT-04", title: "Lab or project work", guidance: "A photo from a lab session, coding environment, robotics room, or engineering workspace." },
            { id: "IIT-05", title: "Event or organization", guidance: "A club meeting, GBM, competition, or IIT event you were part of." },
          ].map(({ id, title, guidance }) => (
            <ImageSlot
              key={id}
              id={id}
              title={title}
              guidance={guidance}
              src={`/portfolio_images/illinois-tech/${id.toLowerCase()}.jpg`}
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
            prompt="Write about a specific moment at IIT: a class, a professor, a project, or a realization that shifted how you think about engineering or what you want to build."
          />
          <PlaceholderText
            id="IIT-REFLECTION-02"
            prompt="Write about what you're taking forward from IIT: not just the skills, but the perspective, the standards, the network, or the identity it helped you build."
          />
        </div>
        <div className="mt-6 flex gap-3">
          <Link to="/autonomous-vehicles" className="brand-button glass inline-flex items-center gap-2">
            Autonomy work <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/student-organizations" className="brand-button glass inline-flex items-center gap-2">
            Student orgs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </MotionPage>
  );
}
