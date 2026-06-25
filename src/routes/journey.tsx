import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Car, GraduationCap, Heart, Users } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "The Journey - Danish Nadar" },
      {
        name: "description",
        content:
          "Leadership, community, autonomy, and education behind Danish Nadar's AI engineering journey.",
      },
    ],
  }),
  component: JourneyPage,
});

const journeySections = [
  {
    to: "/student-organizations",
    title: "Student Organizations",
    body: "The clubs, teams, and leadership roles that shaped nearly every year of college.",
    icon: Users,
    featured: true,
  },
  {
    to: "/leadership-academy",
    title: "Leadership Academy",
    body: "Formal development programs and the habits of service they built.",
    icon: BookOpen,
    featured: false,
  },
  {
    to: "/friends",
    title: "Friends",
    body: "The people whose support, humor, and shared experiences shaped the journey.",
    icon: Heart,
    featured: false,
  },
  {
    to: "/inspirations",
    title: "Inspirations",
    body: "The thinkers, builders, and ideas that shaped how I approach engineering and life.",
    icon: BookOpen,
    featured: false,
  },
  {
    to: "/autonomous-vehicles",
    title: "Autonomy",
    body: "EcoCAR sensor fusion, safety-minded systems, and the purpose behind the engineering.",
    icon: Car,
    featured: false,
  },
  {
    to: "/illinois-tech",
    title: "Illinois Tech",
    body: "Computer Science at IIT and the academic foundation behind the work.",
    icon: GraduationCap,
    featured: false,
  },
] as const;

function JourneyPage() {
  return (
    <MotionPage className="la-page mx-auto max-w-[92rem] px-6 py-14 lg:px-10 readable-page">
      <header className="la-hero relative rounded-[2rem] border overflow-hidden p-7 md:p-12">
        <div className="la-hero-glow la-hero-glow-a" aria-hidden="true" />
        <div className="la-hero-glow la-hero-glow-b" aria-hidden="true" />
        <div className="la-hero-glow la-hero-glow-c" aria-hidden="true" />
        <div className="la-haze" aria-hidden="true" />
        <div className="text-xs uppercase tracking-[0.22em] text-accent font-tech">The Journey</div>
        <h1 className="mt-4 max-w-5xl text-4xl md:text-6xl font-display font-bold leading-tight">
          The people, systems, and turning points behind the{" "}
          <span className="text-gradient-rb">engineering mission</span>.
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">
          Follow the path through campus leadership, community, AI engineering, autonomy, and the
          academic foundation that connected them.
        </p>
      </header>
      <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {journeySections.map(({ to, title, body, icon: Icon, featured }) => (
          <Link
            key={to}
            to={to}
            className={`group glass premium-border rounded-3xl p-6 ${featured ? "dropdown-featured-item" : ""}`}
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-rb text-background">
                <Icon className="h-5 w-5" />
              </span>
              {featured && (
                <span className="text-[10px] uppercase tracking-[0.18em] text-accent">
                  Start here
                </span>
              )}
            </div>
            <h2 className="mt-5 text-2xl font-display font-bold">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              Open chapter{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>
    </MotionPage>
  );
}
