import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Flame } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/illinois-tech")({
  head: () => ({
    meta: [
      { title: "Illinois Tech  -  Danish Nadar" },
      {
        name: "description",
        content:
          "Computer science at Illinois Institute of Technology: coursework, research, and the academic foundation behind the engineering work.",
      },
    ],
  }),
  component: IllinoisTechPage,
});

function IllinoisTechPage() {
  return (
    <MotionPage className="illinois-tech-page mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="illinois-hero relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center rounded-[2rem] border p-8 md:p-12 overflow-hidden">
        <div className="illinois-hero-glow illinois-hero-glow-a" aria-hidden="true" />
        <div className="illinois-hero-glow illinois-hero-glow-b" aria-hidden="true" />
        <div className="illinois-hero-glow illinois-hero-glow-c" aria-hidden="true" />
        <div className="illinois-hawk-streaks" aria-hidden="true" />

        <div className="relative">
          <div className="illinois-kicker inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
            <GraduationCap className="h-4 w-4" /> Illinois Institute of Technology · Scarlet Hawks
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            Where the <span className="illinois-gradient-text">engineering foundation</span> was built.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Computer Science at IIT gave me more than coursework. It gave me the problems, the
            peers, the competitions, and the environment that turned curiosity into capability.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["CS, B.S.", "GPA 3.5+", "2022 – 2026", "Chicago, IL"].map((tag) => (
              <span key={tag} className="illinois-pill rounded-full px-3 py-1 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <ImageSlot
          id="IIT-HERO"
          title="Illinois Tech campus or event photo"
          guidance="Use a campus photo, classroom moment, lab photo, or any IIT event that captures the environment."
          src="/portfolio_images/illinois-tech/iit-hero.jpg"
          aspect="aspect-[4/3]"
        />
      </section>

      {/* ── Academic foundation ───────────────────────────────────────── */}
      <section className="mt-16">
        <div className="illinois-section-label text-xs uppercase tracking-[0.18em] font-tech">
          Academic foundation
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Computer Science, B.S.</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="illinois-card relative glass rounded-3xl p-7 overflow-hidden">
            <div className="illinois-card-flare" aria-hidden="true" />
            <div className="relative">
              <div className="-mx-7 -mt-7 mb-5 rounded-t-3xl overflow-hidden">
                <ImageSlot
                  id="IIT-COURSEWORK"
                  title="Coursework or classroom moment"
                  guidance="A photo from class, whiteboard, study session, IIT engineering building, or lab environment."
                  src="/portfolio_images/illinois-tech/iit-coursework.jpg"
                  aspect="aspect-[16/9]"
                />
              </div>
              <div className="illinois-section-label text-xs uppercase tracking-[0.18em] font-tech mb-4">
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
                    className="illinois-course-chip rounded-xl px-3 py-2 text-xs transition"
                  >
                    {course}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="illinois-card glass rounded-3xl p-7">
              <div className="illinois-section-label text-xs uppercase tracking-[0.18em] font-tech mb-3">
                What IIT gave me
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                Illinois Tech gave me direct access to ambitious peers, robotics leadership,
                national competition work, and an environment where coursework could become a
                deployed system. EcoCAR, ML@IIT, Illinois Tech Robotics, and applied AI projects
                turned academic concepts into engineering responsibility.
              </p>
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

      {/* ── Campus involvement ────────────────────────────────────────── */}
      <section className="mt-16">
        <div className="illinois-section-label text-xs uppercase tracking-[0.18em] font-tech">
          Campus involvement
        </div>
        <h2 className="mt-3 text-3xl font-display font-bold">Beyond the classroom</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {
              label: "EcoCAR at IIT",
              body: "The DOE national autonomous vehicle competition hosted through Illinois Tech, the project that connected coursework to real autonomy engineering.",
              link: { to: "/student-organizations", label: "Student orgs" },
            },
            {
              label: "Research & labs",
              body: "Machine learning, deep learning, NLP, computer vision, and autonomous-systems projects extended beyond assignments into comparative experiments, model evaluation, technical writing, and product-oriented prototypes.",
              link: null,
            },
            {
              label: "Community at IIT",
              body: "The strongest part of IIT has been the community built through difficult courses, robotics work, student leadership, hackathons, and shared projects. Those relationships created a culture of mutual support and technical ambition.",
              link: null,
            },
          ].map(({ label, body, link }) => (
            <div
              key={label}
              className="illinois-card group relative glass rounded-3xl p-6 transition-all duration-300 overflow-hidden"
            >
              <div className="illinois-card-hover" aria-hidden="true" />
              <div className="relative">
                <div className="illinois-section-label text-xs uppercase tracking-[0.18em] font-tech mb-3">
                  {label}
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{body}</p>
                {link && (
                  <Link
                    to={link.to}
                    className="mt-4 inline-flex items-center gap-2 text-[color:var(--illinois-scarlet-bright)] text-sm hover:text-[color:var(--illinois-scarlet-soft)] hover:underline transition"
                  >
                    {link.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Campus photos ─────────────────────────────────────────────── */}
      <section className="mt-16">
        <div className="illinois-section-label text-xs uppercase tracking-[0.18em] font-tech">
          Campus photos
        </div>
        <h2 className="mt-3 text-3xl font-display font-bold">IIT in pictures</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              id: "IIT-03",
              title: "Campus or building",
              guidance: "Crown Hall, Siegel Hall, the quad, or any recognizable IIT location.",
            },
            {
              id: "IIT-04",
              title: "Lab or project work",
              guidance:
                "A photo from a lab session, coding environment, robotics room, or engineering workspace.",
            },
            {
              id: "IIT-05",
              title: "Event or organization",
              guidance: "A club meeting, GBM, competition, or IIT event you were part of.",
            },
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

      {/* ── Reflection ────────────────────────────────────────────────── */}
      <section className="illinois-reflection relative mt-16 rounded-[2rem] border p-8 md:p-10 overflow-hidden">
        <div className="illinois-hero-glow illinois-hero-glow-c" aria-hidden="true" />
        <div className="illinois-hawk-streaks" aria-hidden="true" />
        <div className="relative">
          <div className="illinois-section-label flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-tech">
            <Flame className="h-3.5 w-3.5" /> Reflection
          </div>
          <h2 className="mt-3 text-3xl font-display font-bold">
            What studying here actually <span className="illinois-gradient-text">meant</span>
          </h2>
          <div className="mt-5 grid md:grid-cols-2 gap-5">
            <p className="illinois-reflection-note rounded-2xl p-5 text-sm leading-7 text-muted-foreground">
              Working with vehicle signals, perception pipelines, and cross-disciplinary EcoCAR
              deliverables changed my view of engineering. A model is only one part of the job;
              integration, timing, validation, and communication determine whether the system is
              useful.
            </p>
            <p className="illinois-reflection-note rounded-2xl p-5 text-sm leading-7 text-muted-foreground">
              I am carrying forward a systems mindset, a network of builders, and a higher standard
              for technical rigor. Illinois Tech helped turn resilience and curiosity into a
              professional engineering identity.
            </p>
          </div>
          <div className="mt-6 flex gap-3">
            <Link
              to="/autonomous-vehicles"
              className="illinois-button brand-button inline-flex items-center gap-2 transition-all"
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
        </div>
      </section>
    </MotionPage>
  );
}

