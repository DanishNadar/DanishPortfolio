import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/inspirations")({
  head: () => ({
    meta: [
      { title: "Inspirations — Danish Nadar" },
      { name: "description", content: "The thinkers, builders, and ideas that shaped how Danish Nadar approaches engineering and life." },
    ],
  }),
  component: InspirationsPage,
});

function PlaceholderText({ id, prompt }: { id: string; prompt: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-accent/30 bg-accent/5 p-4">
      <div className="text-[10px] uppercase tracking-[0.18em] text-accent/60 font-tech mb-2">{id}</div>
      <p className="text-muted-foreground/60 italic text-sm leading-6">{prompt}</p>
    </div>
  );
}

const inspirationSlots = [
  {
    id: "INS-01",
    category: "Engineering & AI",
    prompt: "Name a person, team, or company in AI/engineering whose work shaped how you think. What specifically did they do and why does it matter to you?",
    imgId: "INS-IMG-01",
    imgGuidance: "A photo, screenshot, or visual that represents this inspiration: a book cover, a project screenshot, or a person.",
  },
  {
    id: "INS-02",
    category: "Engineering & AI",
    prompt: "Name another figure or project in AI/engineering: a researcher, an open-source project, a paper, or a company that changed your perspective.",
    imgId: "INS-IMG-02",
    imgGuidance: "A photo, screenshot, or visual representing this inspiration.",
  },
  {
    id: "INS-03",
    category: "Leadership & Thinking",
    prompt: "Who do you look to for how to lead, communicate, or think through hard problems? What have they taught you that you carry into your own work?",
    imgId: "INS-IMG-03",
    imgGuidance: "A photo, book cover, screenshot, or visual representing this person or their work.",
  },
  {
    id: "INS-04",
    category: "Leadership & Thinking",
    prompt: "Name a thinker, author, or leader, inside or outside engineering, whose way of seeing the world has influenced how you approach yours.",
    imgId: "INS-IMG-04",
    imgGuidance: "A photo, book cover, or visual representing this person or idea.",
  },
  {
    id: "INS-05",
    category: "Life & Resilience",
    prompt: "Who or what inspired you through the hardest part of the story: recovery, rebuilding, or finding direction after the collision? Name them and explain why.",
    imgId: "INS-IMG-05",
    imgGuidance: "A personal photo, symbolic image, or anything that captures what this inspiration means.",
  },
  {
    id: "INS-06",
    category: "Life & Resilience",
    prompt: "What idea, book, community, or moment gave you the mental model you return to most? Explain the idea and what it changed for you.",
    imgId: "INS-IMG-06",
    imgGuidance: "A book cover, screenshot, location photo, or symbolic visual.",
  },
];

function InspirationsPage() {
  const categories = [...new Set(inspirationSlots.map((s) => s.category))];

  return (
    <MotionPage className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">

      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <Sparkles className="h-4 w-4" /> What shaped the thinking
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            The people and ideas that made me <span className="text-gradient-rb">think differently</span>.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Engineering is downstream of thinking. This page is about the thinkers, builders, books, and moments that shaped how I approach hard problems — in the lab, in the team, and in life.
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
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">{category}</div>
          <h2 className="mt-3 text-3xl font-display font-bold">
            {category === "Engineering & AI" && "The builders and ideas that redefined what's possible."}
            {category === "Leadership & Thinking" && "How to lead, communicate, and see clearly."}
            {category === "Life & Resilience" && "What held up when everything else didn't."}
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {inspirationSlots
              .filter((s) => s.category === category)
              .map(({ id, prompt, imgId, imgGuidance }) => (
                <article key={id} className="glass premium-border rounded-3xl overflow-hidden">
                  <ImageSlot
                    id={imgId}
                    title={id}
                    guidance={imgGuidance}
                    src={`/portfolio_images/inspirations/${imgId.toLowerCase()}.jpg`}
                    aspect="aspect-[16/9]"
                  />
                  <div className="p-6">
                    <PlaceholderText id={id} prompt={prompt} />
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}

      <section className="mt-16 glass premium-border rounded-3xl p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Why this page exists</div>
        <h2 className="mt-3 text-3xl font-display font-bold">Engineering reflects the people who influenced the engineer.</h2>
        <div className="mt-5 grid md:grid-cols-2 gap-5">
          <PlaceholderText
            id="INS-CLOSING-01"
            prompt="Write about the through-line: how do the people and ideas on this page connect to the engineer you are right now? What do they have in common?"
          />
          <PlaceholderText
            id="INS-CLOSING-02"
            prompt="Write about who you want to become and which of these inspirations you're actively trying to embody in how you build and lead."
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
