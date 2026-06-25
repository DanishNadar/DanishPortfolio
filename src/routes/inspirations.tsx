import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/inspirations")({
  head: () => ({
    meta: [
      { title: "Inspirations  -  Danish Nadar" },
      {
        name: "description",
        content:
          "The thinkers, builders, and ideas that shaped how Danish Nadar approaches engineering and life.",
      },
    ],
  }),
  component: InspirationsPage,
});

const inspirationSlots = [
  {
    id: "INS-01",
    category: "Engineering & AI",
    title: "Open-source AI builders",
    body: "The open-source AI community shaped how I learn: inspect the implementation, reproduce the result, understand the limitations, and contribute improvements that other builders can use.",
    imgId: "INS-IMG-01",
    imgGuidance:
      "A photo, screenshot, or visual that represents this inspiration: a book cover, a project screenshot, or a person.",
  },
  {
    id: "INS-02",
    category: "Engineering & AI",
    title: "Autonomous vehicle research teams",
    body: "Teams working on perception, planning, controls, and safety validation showed me that intelligent vehicles are not one model. They are coordinated systems whose decisions must remain understandable under real-world pressure.",
    imgId: "INS-IMG-02",
    imgGuidance: "A photo, screenshot, or visual representing this inspiration.",
  },
  {
    id: "INS-03",
    category: "Leadership & Thinking",
    title: "Technical leaders who create momentum",
    body: "I am influenced by leaders who make difficult work feel possible through clear priorities, honest feedback, and systems that help a team keep moving after the initial excitement fades.",
    imgId: "INS-IMG-03",
    imgGuidance:
      "A photo, book cover, screenshot, or visual representing this person or their work.",
  },
  {
    id: "INS-04",
    category: "Leadership & Thinking",
    title: "Systems thinking",
    body: "Systems thinking changed how I approach engineering and leadership. Local improvements are useful only when they strengthen the larger workflow, reduce hidden failure modes, and move the shared outcome forward.",
    imgId: "INS-IMG-04",
    imgGuidance: "A photo, book cover, or visual representing this person or idea.",
  },
  {
    id: "INS-05",
    category: "Life & Resilience",
    title: "Recovery through disciplined practice",
    body: "Relearning how to walk, remember, and solve mathematics made persistence concrete. Progress came from small, measurable repetitions, and that same discipline now shapes how I debug and build.",
    imgId: "INS-IMG-05",
    imgGuidance:
      "A personal photo, symbolic image, or anything that captures what this inspiration means.",
  },
  {
    id: "INS-06",
    category: "Life & Resilience",
    title: "Engineering in service of people",
    body: "The idea I return to most is that technical ambition should create human value. Safety, accessibility, clarity, and independence are not secondary benefits; they are design requirements.",
    imgId: "INS-IMG-06",
    imgGuidance: "A book cover, screenshot, location photo, or symbolic visual.",
  },
];

function InspirationsPage() {
  const categories = [...new Set(inspirationSlots.map((s) => s.category))];

  return (
    <MotionPage className="la-page mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">
      <section className="la-hero relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center rounded-[2rem] border overflow-hidden p-8 md:p-12">
        <div className="la-hero-glow la-hero-glow-a" aria-hidden="true" />
        <div className="la-hero-glow la-hero-glow-b" aria-hidden="true" />
        <div className="la-hero-glow la-hero-glow-c" aria-hidden="true" />
        <div className="la-haze" aria-hidden="true" />
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <Sparkles className="h-4 w-4" /> What shaped the thinking
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            The people and ideas that made me{" "}
            <span className="text-gradient-rb">think differently</span>.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Engineering is downstream of thinking. This page is about the thinkers, builders, books,
            and moments that shaped how I approach hard problems  -  in the lab, in the team, and in
            life.
          </p>
        </div>
        <ImageSlot
          id="INS-HERO"
          title="Inspiration or reflection photo"
          guidance="A photo that captures curiosity or reflection: a bookshelf, a workspace, a telescope, a quiet moment, or anything that represents the thinking life behind the engineering."
          src="/portfolio_images/inspirations/inspirations-hero.jpg"
          aspect="aspect-[4/3]"
        />
      </section>

      {categories.map((category) => (
        <section key={category} className="mt-16">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
            {category}
          </div>
          <h2 className="mt-3 text-3xl font-display font-bold">
            {category === "Engineering & AI" &&
              "The builders and ideas that redefined what's possible."}
            {category === "Leadership & Thinking" && "How to lead, communicate, and see clearly."}
            {category === "Life & Resilience" && "What held up when everything else didn't."}
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {inspirationSlots
              .filter((s) => s.category === category)
              .map(({ id, title, body, imgId, imgGuidance }) => (
                <article key={id} className="glass premium-border rounded-3xl overflow-hidden">
                  <ImageSlot
                    id={imgId}
                    title={id}
                    guidance={imgGuidance}
                    src={`/portfolio_images/inspirations/${imgId.toLowerCase()}.jpg`}
                    aspect="aspect-[16/9]"
                  />
                  <div className="p-6">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech">
                      {id}
                    </div>
                    <h3 className="mt-2 text-xl font-display font-semibold">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}

      <section className="mt-16 glass premium-border rounded-3xl p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
          Through-line
        </div>
        <h2 className="mt-3 text-3xl font-display font-bold">
          Engineering reflects the people who influenced the engineer.
        </h2>
        <div className="mt-5 grid md:grid-cols-2 gap-5">
          <p className="rounded-2xl border border-border/60 bg-background/30 p-5 text-sm leading-7 text-muted-foreground">
            Across these influences, the common standard is responsibility: understand the system
            deeply, communicate clearly, validate honestly, and remember who experiences the
            consequences of the design.
          </p>
          <p className="rounded-2xl border border-border/60 bg-background/30 p-5 text-sm leading-7 text-muted-foreground">
            I want to become the kind of engineer who can lead ambitious technical work without
            losing the patience, humility, and human focus required to make that work trustworthy.
          </p>
        </div>
        <div className="mt-6">
          <Link to="/about" className="brand-button glass inline-flex items-center gap-2">
            More about me <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </MotionPage>
  );
}
