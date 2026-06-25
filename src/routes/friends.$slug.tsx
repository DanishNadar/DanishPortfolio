import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, ExternalLink, Globe, Linkedin, Quote } from "lucide-react";
import { ImageSlot } from "@/components/ImageSlot";
import { MotionPage } from "@/components/MotionPage";
import { getProjectPage } from "@/content/projectPages";
import { friendBySlug } from "@/data/friends";

export const Route = createFileRoute("/friends/$slug")({
  loader: ({ params }) => {
    const profile = friendBySlug[params.slug];
    if (!profile) throw notFound();
    return profile;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Friend"} - Friends - Danish Nadar` },
      {
        name: "description",
        content: `${loaderData?.name ?? "Friend"}: shared work, stories, photos, and community in Danish Nadar's portfolio.`,
      },
    ],
  }),
  component: FriendProfilePage,
});

function FriendProfilePage() {
  const profile = Route.useLoaderData();
  const sharedProjects = profile.sharedProjectSlugs
    .map(getProjectPage)
    .filter((project) => project !== null);

  return (
    <MotionPage className="mx-auto max-w-[92rem] px-6 py-14 lg:px-10 readable-page">
      <Link
        to="/friends"
        className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All friends
      </Link>

      <section className="section-atmosphere section-atmosphere-community mt-6 overflow-hidden rounded-[2.5rem]">
        <div className="grid lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr]">
          {/* Portrait  -  full-bleed, no padding */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px]">
            <img
              src={profile.image}
              alt={`${profile.name} portrait`}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: profile.portraitCrop?.position }}
              onError={(e) => {
                if (profile.placeholderImage) e.currentTarget.src = profile.placeholderImage;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep/60 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-deep/70" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:py-14">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-tech">
              Friend profile
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl xl:text-[3.5rem]">
              {profile.name}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-9 text-muted-foreground">
              {profile.overview}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.linkedin ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#0A66C2] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#004182]"
              >
                <Linkedin className="h-4 w-4" />
                Connect to {profile.gratitudeName ?? profile.name.split(" ")[0]}
              </a>
              {profile.website && profile.website !== "#" && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/35 px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <Globe className="h-4 w-4" /> Website
                </a>
              )}
              {profile.portfolio && profile.portfolio !== "#" && (
                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/35 px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <ExternalLink className="h-4 w-4" /> Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-tech">Shared work</div>
        <h2 className="mt-3 text-3xl font-display font-bold md:text-4xl">
          Work and learning we shared
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.sharedWorkSummary
            .split(". ")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((sentence, i) => (
              <article
                key={i}
                className="glass premium-border rounded-3xl p-6 flex flex-col gap-3"
              >
                <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm leading-7 text-foreground/85">
                  {sentence.endsWith(".") ? sentence : `${sentence}.`}
                </p>
              </article>
            ))}
        </div>
        {sharedProjects.length > 0 && (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {sharedProjects.map((project) => (
              <Link
                key={project.slug}
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group glass premium-border rounded-3xl p-6 hover-lift"
              >
                <BriefcaseBusiness className="h-5 w-5 text-accent" />
                <h3 className="mt-4 text-2xl font-display font-bold">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {project.heroStatement}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Open case study{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-14">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-tech">
          Stories behind the work
        </div>
        <h2 className="mt-3 text-3xl font-display font-bold md:text-4xl">
          The moments that mattered
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {profile.stories.map((story, index) => (
            <article key={story.title} className="glass premium-border rounded-3xl p-6">
              <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech">
                Story {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 text-xl font-display font-bold">{story.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{story.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-2">
        {profile.gallery.map((image, index) => (
          <ImageSlot
            key={image}
            title={profile.galleryLabels?.[index] ?? `${profile.name} shared moment ${index + 1}`}
            guidance={`A shared project, campus, team, or friendship photo involving ${profile.name}.`}
            src={image}
            fallbackSrc={profile.galleryPlaceholders[index]}
            aspect="aspect-[4/3]"
            imgPosition={profile.galleryCrops?.[index]?.position}
            imgScale={profile.galleryCrops?.[index]?.scale}
            imgOrigin={profile.galleryCrops?.[index]?.origin}
          />
        ))}
      </section>

      <section className="mt-14 glass premium-border rounded-[2rem] p-7 md:p-10">
        <div className="text-xs uppercase tracking-[0.2em] text-accent font-tech">
          With gratitude
        </div>
        <h2 className="mt-3 text-3xl font-display font-bold md:text-4xl">
          Thank you, {profile.gratitudeName ?? profile.name.split(" ")[0]}.
        </h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <article className="rounded-3xl border border-accent/25 bg-background/35 p-6">
            <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech">
              What your friendship means
            </div>
            <p className="mt-4 text-base leading-8 text-foreground/85">{profile.gratitude}</p>
          </article>
          <article className="rounded-3xl border border-accent/25 bg-background/35 p-6">
            <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech">
              Looking ahead
            </div>
            <p className="mt-4 text-base leading-8 text-foreground/85">{profile.legacy}</p>
          </article>
        </div>
      </section>

      {profile.testimonial && (
        <section className="mt-14">
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-tech">
            In their words
          </div>
          <h2 className="mt-3 text-3xl font-display font-bold md:text-4xl">
            A note from {profile.gratitudeName ?? profile.name.split(" ")[0]}
          </h2>
          <figure className="mt-6 glass premium-border rounded-[2rem] p-8 md:p-12">
            <Quote className="h-8 w-8 text-accent opacity-80" />
            <blockquote className="mt-6 max-w-4xl font-display text-xl italic leading-10 text-foreground/90 md:text-2xl md:leading-[1.7]">
              "{profile.testimonial}"
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-border/50" />
              <span className="text-sm font-semibold text-accent">
                 -  {profile.gratitudeName ?? profile.name.split(" ")[0]}
              </span>
            </figcaption>
          </figure>
        </section>
      )}
    </MotionPage>
  );
}
