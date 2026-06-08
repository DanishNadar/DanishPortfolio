import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BookOpen, ArrowRight, Users, Star, Lightbulb } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/leadership-academy")({
  head: () => ({
    meta: [
      { title: "Leadership Academy — Danish Nadar" },
      { name: "description", content: "Danish Nadar's leadership development journey through formal programs, mentorship, and applied growth." },
    ],
  }),
  component: LeadershipAcademyPage,
});

const modules = [
  {
    icon: Lightbulb,
    title: "Module placeholder",
    slot: "LM-01",
    prompt: "Name the module or theme. What was covered? What did you actually learn, not just what was on the agenda?",
  },
  {
    icon: Users,
    title: "Module placeholder",
    slot: "LM-02",
    prompt: "Describe a session that changed how you think about working with others, leading under pressure, or giving feedback.",
  },
  {
    icon: Star,
    title: "Module placeholder",
    slot: "LM-03",
    prompt: "Describe the capstone, challenge, project, or experience that made the whole program real. What did you deliver or present?",
  },
];

function PlaceholderText({ id, prompt }: { id: string; prompt: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-accent/30 bg-accent/5 p-4">
      <div className="text-[10px] uppercase tracking-[0.18em] text-accent/60 font-tech mb-2">{id}</div>
      <p className="text-muted-foreground/60 italic text-sm leading-6">{prompt}</p>
    </div>
  );
}

function LeadershipAcademyPage() {
  return (
    <MotionPage className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">

      <section className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <Award className="h-4 w-4" /> Leadership development
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            Leading with <span className="text-gradient-rb">intention</span>, not just competence.
          </h1>
          <div className="mt-6">
            <PlaceholderText
              id="LA-INTRO"
              prompt="2–3 sentences: which program this was, when you participated, and what drew you to it. What was the selection process like? Why did you apply?"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/student-organizations" className="brand-button glass inline-flex items-center gap-2">
              Student organizations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <ImageSlot
          id="LA-01"
          title="Leadership academy hero"
          guidance="Use a photo of you at the program: speaking, in a cohort session, at a workshop, or receiving recognition."
          src="/portfolio_images/leadership/la-hero.jpg"
          aspect="aspect-[4/3]"
        />
      </section>

      <section className="mt-16 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
        <ImageSlot
          id="LA-02"
          title="Cohort or program session"
          guidance="Use a group photo of your cohort, a classroom or workshop session, or a program event."
          src="/portfolio_images/leadership/la-cohort.jpg"
          aspect="aspect-video"
        />
        <div className="glass premium-border rounded-3xl p-7 md:p-9">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">The program</div>
          <h2 className="mt-3 text-3xl font-display font-bold">What it covered and who it was for</h2>
          <div className="mt-5">
            <PlaceholderText
              id="LA-PROGRAM"
              prompt="Describe the program structure: its goals, duration, cohort, themes, and what made it different from a class. What kind of person does it develop?"
            />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              ["Cohort size", "LA-STAT-01"],
              ["Program length", "LA-STAT-02"],
              ["Year", "LA-STAT-03"],
              ["Affiliation", "LA-STAT-04"],
            ].map(([label, id]) => (
              <div key={id} className="glass rounded-2xl p-4">
                <div className="text-[10px] uppercase tracking-[0.14em] text-accent">{label}</div>
                <div className="mt-1 text-base font-display font-bold text-muted-foreground/50 italic text-sm">Fill in</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Key experiences</div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">The sessions that stuck</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {modules.map(({ icon: Icon, title, slot, prompt }) => (
            <article key={slot} className="glass premium-border rounded-3xl p-7 flex flex-col gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-rb text-background">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold text-muted-foreground/60 italic">{title}</h3>
              <PlaceholderText id={slot} prompt={prompt} />
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid lg:grid-cols-2 gap-6">
        <ImageSlot
          id="LA-03"
          title="Workshop or activity"
          guidance="A photo from a workshop, challenge, simulation, or hands-on group activity during the program."
          src="/portfolio_images/leadership/la-workshop.jpg"
          aspect="aspect-[4/3]"
        />
        <ImageSlot
          id="LA-04"
          title="Recognition or closing moment"
          guidance="A photo from a graduation, certificate, award, or closing ceremony for the program."
          src="/portfolio_images/leadership/la-recognition.jpg"
          aspect="aspect-[4/3]"
        />
      </section>

      <section className="mt-16 glass premium-border rounded-3xl p-8 md:p-10">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-rb text-background">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">What it changed</div>
            <h2 className="mt-2 text-3xl font-display font-bold">What the academy gave me that engineering school didn't</h2>
            <div className="mt-5">
              <PlaceholderText
                id="LA-IMPACT"
                prompt="Write 3–4 sentences on the specific leadership habit, perspective, or skill the program built that you actively apply: in EcoCAR, in team settings, in how you give direction or feedback."
              />
            </div>
          </div>
        </div>
      </section>

    </MotionPage>
  );
}
