import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BookOpen, ArrowRight, Users, Star, Lightbulb } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/leadership-academy")({
  head: () => ({
    meta: [
      { title: "Leadership Academy  -  Danish Nadar" },
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
    title: "Strategic leadership",
    slot: "LM-01",
    body: "Translating broad goals into priorities, decision criteria, and execution plans that teams can understand and sustain.",
  },
  {
    icon: Users,
    title: "Team communication",
    slot: "LM-02",
    body: "Practicing active listening, constructive feedback, conflict navigation, and communication that preserves trust under pressure.",
  },
  {
    icon: Star,
    title: "Applied leadership technology",
    slot: "LM-03",
    body: "Leading the technical direction for an AI-powered Leadership Avatar designed for interactive communication and role-play practice.",
  },
];

function LeadershipAcademyPage() {
  return (
    <MotionPage className="la-page mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">
      <section className="la-hero relative grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center rounded-[2rem] border p-8 md:p-12 overflow-hidden">
        <div className="la-hero-glow la-hero-glow-a" aria-hidden="true" />
        <div className="la-hero-glow la-hero-glow-b" aria-hidden="true" />
        <div className="la-hero-glow la-hero-glow-c" aria-hidden="true" />
        <div className="la-haze" aria-hidden="true" />
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <Award className="h-4 w-4" /> Leadership development
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            Leading with <span className="text-gradient-rb">intention</span>, not just competence.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            As an M.A. and Lila Self Leadership Academy Scholar and Tech Committee Lead, I developed
            leadership skills through cohort learning, applied projects, and the responsibility of
            translating organizational needs into working technical systems.
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
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
            The program
          </div>
          <h2 className="mt-3 text-3xl font-display font-bold">
            What it covered and who it was for
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            The Leadership Academy combines formal leadership development with practical service,
            mentorship, team projects, and reflection. Its value comes from applying communication,
            ethics, strategy, and collaboration to work with real stakeholders and constraints.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              ["Program", "Leadership Academy"],
              ["Role", "Tech Committee Lead"],
              ["Focus", "Leadership technology"],
              ["Affiliation", "Illinois Tech"],
            ].map(([label, value]) => (
              <div key={label} className="glass rounded-2xl p-4">
                <div className="text-[10px] uppercase tracking-[0.14em] text-accent">{label}</div>
                <div className="mt-1 text-sm font-display font-bold">{value}</div>
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
          {modules.map(({ icon: Icon, title, slot, body }) => (
            <article
              key={slot}
              className="glass premium-border rounded-3xl p-7 flex flex-col gap-4"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-rb text-background">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{title}</h3>
              <p className="text-sm leading-7 text-muted-foreground">{body}</p>
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
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
              What it changed
            </div>
            <h2 className="mt-2 text-3xl font-display font-bold">
              What the academy gave me that engineering school didn't
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              The academy strengthened my ability to convert technical ambition into shared
              execution. I apply that habit in EcoCAR, robotics leadership, and ML@IIT by defining
              outcomes, listening before prescribing solutions, assigning clear ownership, and
              building systems that remain useful after the first demonstration.
            </p>
          </div>
        </div>
      </section>
    </MotionPage>
  );
}
