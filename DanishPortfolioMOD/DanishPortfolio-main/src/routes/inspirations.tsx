import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/inspirations")({
  head: () => ({
    meta: [
      { title: "Inspirations — Danish Nadar" },
      {
        name: "description",
        content:
          "The thinkers, builders, and ideas that shaped how Danish Nadar approaches engineering and life.",
      },
    ],
  }),
  component: InspirationsPage,
});

function InsightCard({ prompt }: { prompt: string }) {
  return (
    <div className="rounded-2xl border border-accent/25 bg-background/35 p-4">
      <p className="text-muted-foreground text-sm leading-6">{prompt}</p>
    </div>
  );
}

const inspirationSlots = [
  {
    id: "INS-01",
    category: "Engineering & AI",
    prompt:
      "Autonomous systems shaped my imagination because they connect perception, control, safety, and responsibility in one moving system.",
    imgId: "INS-IMG-01",
    imgGuidance:
      "A photo, screenshot, or visual that represents this inspiration: a book cover, a project screenshot, or a person.",
    src: "/portfolio_images/generated/rainy-autonomy-rebuild.png",
  },
  {
    id: "INS-02",
    category: "Engineering & AI",
    prompt:
      "Robotics labs and hands-on builders remind me that ideas become real through wiring, testing, debugging, and patient iteration.",
    imgId: "INS-IMG-02",
    imgGuidance: "A photo, screenshot, or visual representing this inspiration.",
    src: "/portfolio_images/generated/featured-portfolio-immersive.png",
  },
  {
    id: "INS-03",
    category: "Leadership & Thinking",
    prompt:
      "The leaders I trust most are the ones who make other people steadier. That standard shapes how I want to communicate in technical teams.",
    imgId: "INS-IMG-03",
    imgGuidance:
      "A photo, book cover, screenshot, or visual representing this person or their work.",
    src: "/portfolio_images/achievements/leadership-community.jpg",
  },
  {
    id: "INS-04",
    category: "Leadership & Thinking",
    prompt:
      "Good technical storytelling influenced me as much as code did: the ability to make complex work understandable without flattening it.",
    imgId: "INS-IMG-04",
    imgGuidance: "A photo, book cover, or visual representing this person or idea.",
    src: "/portfolio_images/articles/career-growth-map.jpg",
  },
  {
    id: "INS-05",
    category: "Life & Resilience",
    prompt:
      "Recovery taught me that rebuilding is rarely dramatic while it is happening. It is small, repeated, honest work until the next step becomes possible.",
    imgId: "INS-IMG-05",
    imgGuidance:
      "A personal photo, symbolic image, or anything that captures what this inspiration means.",
    src: "/portfolio_images/articles/autonomy-mission-remix.jpg",
  },
  {
    id: "INS-06",
    category: "Life & Resilience",
    prompt:
      "Curiosity keeps the work alive: astronomy, music, robotics, and travel all remind me that engineering begins with paying attention.",
    imgId: "INS-IMG-06",
    imgGuidance: "A book cover, screenshot, location photo, or symbolic visual.",
    src: "/portfolio_images/gallery/astronomy-curiosity.jpg",
  },
];

function InspirationsPage() {
  const categories = [...new Set(inspirationSlots.map((s) => s.category))];

  return (
    <MotionPage mood="academic" tone="academic" className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">
      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
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
            and moments that shaped how I approach hard problems — in the lab, in the team, and in
            life.
          </p>
        </div>
        <ImageSlot
          id="INS-HERO"
          title="Inspiration or reflection photo"
          guidance="A photo that captures curiosity or reflection: a bookshelf, a workspace, a telescope, a quiet moment, or anything that represents the thinking life behind the engineering."
          src="/portfolio_images/gallery/travel-reflection.jpg"
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
              .map(({ id, prompt, imgId, imgGuidance, src }) => (
                <article key={id} className="glass premium-border rounded-3xl overflow-hidden">
                  <ImageSlot
                    id={imgId}
                    title={id}
                    guidance={imgGuidance}
                    src={src}
                    aspect="aspect-[16/9]"
                  />
                  <div className="p-6">
                    <InsightCard prompt={prompt} />
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
          <InsightCard
            prompt="The through-line is attention: to people, to systems, to risk, and to the small signals that show whether a tool is actually helping."
          />
          <InsightCard
            prompt="The engineer I want to become is technically serious, but still human: curious enough to keep learning and grounded enough to build for service."
          />
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
