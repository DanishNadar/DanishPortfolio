import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FolderKanban,
  Linkedin,
  MessageSquareQuote,
} from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";
import { friendProfileBySlug } from "@/data/friendProfiles";
import { getProjectPage } from "@/content/projectPages";

export const Route = createFileRoute("/friends/$slug")({
  loader: ({ params }) => {
    const friend = friendProfileBySlug[params.slug];
    if (!friend) throw new Error("Friend profile not found");
    return friend;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.name} - Friends - Danish Nadar` },
      {
        name: "description",
        content: `${loaderData.name}: shared work, stories, photos, and community in Danish Nadar's portfolio.`,
      },
    ],
  }),
  component: FriendProfilePage,
});

function FriendProfilePage() {
  const friend = Route.useLoaderData();
  const projects = friend.sharedProjectSlugs
    .map((slug) => getProjectPage(slug))
    .filter((project) => project !== null);

  return (
    <MotionPage
      mood="community"
      className="mx-auto max-w-[92rem] px-6 py-14 lg:px-10 readable-page"
    >
      <Link
        to="/friends"
        className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All friends
      </Link>

      <section className="section-atmosphere section-atmosphere-community mt-6 grid gap-8 rounded-[2rem] p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <ImageSlot
          id={`${friend.id}-PORTRAIT`}
          title={`${friend.name} portrait`}
          guidance={`Add a portrait or shared photo featuring ${friend.name}.`}
          src={friend.image}
          aspect="aspect-[4/3]"
        />
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-tech">
            Friend profile · {friend.id}
          </div>
          <h1 className="mt-4 text-4xl font-display font-bold leading-tight md:text-6xl">
            {friend.name}
          </h1>
          <p className="mt-5 text-xl leading-9 text-muted-foreground">{friend.overview}</p>

          <div className="mt-7">
            {friend.linkedinUrl ? (
              <a
                href={friend.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="brand-button inline-flex items-center gap-2 bg-gradient-rb text-background"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn profile
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/35 px-4 py-3 text-sm text-muted-foreground">
                <Linkedin className="h-4 w-4 text-accent" />
                Verified LinkedIn URL ready to add
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-tech">Shared work</div>
        <h2 className="mt-3 text-3xl font-display font-bold md:text-4xl">
          Projects we shaped together
        </h2>
        {projects.length ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group glass premium-border rounded-3xl p-6 hover-lift"
              >
                <FolderKanban className="h-5 w-5 text-accent" />
                <h3 className="mt-4 text-2xl font-display font-bold">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {project.heroStatement}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Open case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-accent/35 bg-accent/5 p-6 text-muted-foreground">
            Shared project references are ready to be added once the exact collaborations are
            confirmed.
          </div>
        )}
      </section>

      <section className="mt-14">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-tech">
          Stories behind the work
        </div>
        <h2 className="mt-3 text-3xl font-display font-bold md:text-4xl">
          Room for the moments that mattered
        </h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {friend.stories.map((story, index) => (
            <article key={story.title} className="glass premium-border rounded-3xl p-6">
              <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech">
                Story {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 text-xl font-display font-bold">{story.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {story.body ??
                  "This space is reserved for a specific, approved story about the friendship and the work shared together."}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-2">
        {friend.gallery.map((image, index) => (
          <ImageSlot
            key={image}
            id={`${friend.id}-STORY-${index + 1}`}
            title={`${friend.name} shared moment ${index + 1}`}
            guidance={`Add a shared project, campus, team, or friendship photo involving ${friend.name}.`}
            src={image}
            aspect="aspect-[4/3]"
          />
        ))}
      </section>

      <section className="mt-14 glass premium-border rounded-[2rem] p-7 md:p-10">
        <MessageSquareQuote className="h-7 w-7 text-accent" />
        <div className="mt-4 text-xs uppercase tracking-[0.2em] text-accent font-tech">
          Testimonials
        </div>
        <h2 className="mt-3 text-3xl font-display font-bold md:text-4xl">
          What {friend.name} says about working with me
        </h2>
        {friend.testimonials.length ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {friend.testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.quote}
                className="rounded-3xl border border-accent/25 bg-background/35 p-6"
              >
                <p className="text-lg leading-8 text-foreground/90">“{testimonial.quote}”</p>
                {testimonial.context ? (
                  <footer className="mt-4 text-sm text-muted-foreground">
                    {testimonial.context}
                  </footer>
                ) : null}
              </blockquote>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-accent/35 bg-accent/5 p-6 text-muted-foreground">
            No quote is published yet. This section only displays words provided directly by the
            friend and approved for the portfolio.
          </div>
        )}
      </section>
    </MotionPage>
  );
}
