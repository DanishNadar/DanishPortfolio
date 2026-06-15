import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BookOpen, ArrowRight, Users, Star, Lightbulb } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/leadership-academy")({
  head: () => ({
    meta: [
      { title: "Leadership Academy — Danish Nadar" },
      {
        name: "description",
        content:
          "Danish Nadar's leadership development journey through formal programs, mentorship, and applied growth.",
      },
    ],
  }),
  component: LeadershipAcademyPage,
});

const modules = [
  {
    icon: Lightbulb,
    title: "Self-awareness before direction",
    slot: "LM-01",
    prompt: "Leadership starts by understanding how your choices affect others.",
  },
  {
    icon: Users,
    title: "Service through collaboration",
    slot: "LM-02",
    prompt: "Teams need trust, clarity, feedback, and follow-through, not performance.",
  },
  {
    icon: Star,
    title: "Practice under real stakes",
    slot: "LM-03",
    prompt: "The strongest lessons came from projects, teams, and hard conversations.",
  },
];

function LeadershipNote({ prompt }: { prompt: string }) {
  return (
    <div className="rounded-2xl border border-accent/25 bg-background/35 p-4">
      <p className="text-muted-foreground text-sm leading-6">{prompt}</p>
    </div>
  );
}

function LeadershipAcademyPage() {
  return (
    <MotionPage mood="leadership" tone="leadership" className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">
      <section className="section-atmosphere section-atmosphere-leadership grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center rounded-[2rem] p-6 md:p-10">
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <Award className="h-4 w-4" /> Leadership development
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            Leading with <span className="text-gradient-rb">intention</span>, not just competence.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            The Academy connected technical ambition to responsibility: listen first, communicate
            under pressure, and serve the team, not the title.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/student-organizations"
              className="brand-button glass inline-flex items-center gap-2"
            >
              Student organizations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <ImageSlot
          id="LA-01"
          title="Leadership academy hero"
          guidance="Use a photo of you at the program: speaking, in a cohort session, at a workshop, or receiving recognition."
          src="/portfolio_images/achievements/leadership-community.jpg"
          aspect="aspect-[4/3]"
        />
      </section>

      <section className="mt-16 grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
        <ImageSlot
          id="LA-02"
          title="Cohort or program session"
          guidance="Use a group photo of your cohort, a classroom or workshop session, or a program event."
          src="/portfolio_images/generated/collaboration-lab-moment.png"
          aspect="aspect-video"
        />
        <div className="glass premium-border rounded-3xl p-7 md:p-9">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
            The program
          </div>
          <h2 className="mt-3 text-3xl font-display font-bold">
            What it covered and who it was for
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            Leadership is reflection, service, accountability, and helping a team move through
            uncertainty.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              ["Focus", "Service-minded leadership"],
              ["Practice", "Workshops and team reflection"],
              ["Context", "Illinois Tech community"],
              ["Outcome", "Clearer technical leadership"],
            ].map(([label, value]) => (
              <div key={label} className="glass rounded-2xl p-4">
                <div className="text-[10px] uppercase tracking-[0.14em] text-accent">{label}</div>
                <div className="mt-1 text-sm font-semibold text-muted-foreground">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
          Key experiences
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">
          The sessions that stuck
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {modules.map(({ icon: Icon, title, slot, prompt }) => (
            <article
              key={slot}
              className="glass premium-border rounded-3xl p-7 flex flex-col gap-4"
            >
              <div className="icon-well icon-well-leadership h-11 w-11">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{title}</h3>
              <LeadershipNote prompt={prompt} />
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid lg:grid-cols-2 gap-6">
        <ImageSlot
          id="LA-03"
          title="Workshop or activity"
          guidance="A photo from a workshop, challenge, simulation, or hands-on group activity during the program."
          src="/portfolio_images/achievements/workshop-mentoring.jpg"
          aspect="aspect-[4/3]"
        />
        <ImageSlot
          id="LA-04"
          title="Recognition or closing moment"
          guidance="A photo from a graduation, certificate, award, or closing ceremony for the program."
          src="/portfolio_images/gallery/leadership-moment.jpg"
          aspect="aspect-[4/3]"
        />
      </section>

      <section className="mt-16 glass premium-border rounded-3xl p-8 md:p-10">
        <div className="flex items-start gap-4">
          <div className="icon-well icon-well-leadership h-12 w-12 shrink-0">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
              What it changed
            </div>
            <h2 className="mt-2 text-3xl font-display font-bold">
              What the academy gave me that engineering school didn't
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              It gave me a standard: ask better questions, expose context, document decisions, and
              help people contribute. I carry that into robotics, EcoCAR, workshops, and technical
              storytelling.
            </p>
          </div>
        </div>
      </section>
    </MotionPage>
  );
}
