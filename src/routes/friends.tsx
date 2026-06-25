import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Heart, Users } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";
import { employerRelevantFriendProfiles, friendProfiles, type FriendProfile } from "@/data/friends";

export const Route = createFileRoute("/friends")({
  head: () => ({
    meta: [
      { title: "Friends | Danish Nadar" },
      {
        name: "description",
        content:
          "The people who shaped Danish Nadar's journey: moments, memories, and the community behind the work.",
      },
    ],
  }),
  component: FriendsPage,
});

function FriendCard(profile: FriendProfile) {
  return (
    <Link
      to="/friends/$slug"
      params={{ slug: profile.slug }}
      className="friend-profile-card group block glass premium-border overflow-hidden rounded-3xl"
    >
      <ImageSlot
        title={`${profile.name} photo`}
        guidance={`A portrait or shared photo featuring ${profile.name}.`}
        src={profile.image}
        fallbackSrc={profile.placeholderImage}
        aspect="aspect-[4/3]"
        className="rounded-none border-0 shadow-none"
        imgPosition={profile.portraitCrop?.position}
        imgScale={profile.portraitCrop?.scale}
        imgOrigin={profile.portraitCrop?.origin}
      />
      <div className="p-5 md:p-6">
        <h3 className="font-display text-xl font-semibold">{profile.name}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{profile.overview}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/50 pt-4">
          <span className="text-xs font-semibold text-accent">Open friend profile</span>
          <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function FriendsPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isIndex = pathname.replace(/\/+$/, "") === "/friends";

  return isIndex ? <FriendsIndex /> : <Outlet />;
}

function FriendsIndex() {
  return (
    <MotionPage className="la-page mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">
      <section className="la-hero relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center rounded-[2rem] border overflow-hidden p-6 md:p-10">
        <div className="la-hero-glow la-hero-glow-a" aria-hidden="true" />
        <div className="la-hero-glow la-hero-glow-b" aria-hidden="true" />
        <div className="la-hero-glow la-hero-glow-c" aria-hidden="true" />
        <div className="la-haze" aria-hidden="true" />
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <Heart className="h-4 w-4" /> Community
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            The people who made the <span className="text-gradient-rb">hard parts survivable</span>.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Recovery and ambition do not happen alone. These friendships grew through hard seasons,
            shared work, honest conversations, and ordinary moments that mattered.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm text-accent">
            <Users className="h-4 w-4" /> {friendProfiles.length} people currently featured
          </div>
        </div>
        <ImageSlot
          title="Friends and community"
          guidance="Friends at an event, competition, dinner, or another shared moment."
          src="/portfolio_images/gallery/friends-team-culture.jpg"
          aspect="aspect-[4/3]"
          className="friend-hero-card"
        />
      </section>

      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
          Friends and collaborators
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">
          The people behind the journey
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground leading-8">
          Shared projects, campus moments, conversations, and the relationships that shaped the
          journey.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {employerRelevantFriendProfiles.map((profile) => (
            <FriendCard key={profile.slug} {...profile} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
          Group moments
        </div>
        <h2 className="mt-3 text-3xl font-display font-bold">Where we were</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ImageSlot
            title="Event or outing"
            guidance="A group event or competition moment."
            src="/portfolio_images/gallery/hackathon-competition.jpg"
            aspect="aspect-[4/3]"
            className="friend-group-card"
          />
          <ImageSlot
            title="Campus or lab moment"
            guidance="A campus, lab, or study-session moment."
            src="/portfolio_images/gallery/robotics-lab-action.jpg"
            aspect="aspect-[4/3]"
            className="friend-group-card"
          />
          <ImageSlot
            title="Celebration or milestone"
            guidance="A milestone worth marking."
            src="/portfolio_images/achievements/starkhacks-observ-e-win.jpg"
            aspect="aspect-[4/3]"
            className="friend-group-card"
          />
        </div>
      </section>

      <section className="mt-16 glass premium-border rounded-3xl p-8 md:p-12">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
          What community means
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold leading-tight max-w-3xl">
          Strong work grows through trust, patience, and shared momentum
        </h2>
        <p className="mt-5 text-lg leading-9 text-foreground/80 max-w-3xl">
          The people here brought perspective, humor, encouragement, and honest feedback into
          demanding seasons. Those relationships continue to shape how I collaborate and lead.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {[
            [
              "During recovery",
              "Friendship gave recovery witnesses, humor, and people who saw who I was becoming before I could. Rebuilding is extremely internal, but it does not happen invisibly.",
            ],
            [
              "What it taught me",
              "That support shapes how I lead now. I explain patiently, make room, and help others feel capable.",
            ],
            [
              "What I bring to teams",
              "Someone who asks before assuming, documents for future teammates, and treats friction as information rather than obstruction.",
            ],
            [
              "On collaborative teams",
              "Their influence appears in how I listen, document decisions, explain difficult ideas, and build environments where people can contribute with confidence.",
            ],
          ].map(([title, body]) => (
            <article
              key={title}
              className="friend-community-card rounded-2xl border border-accent/25 bg-background/35 p-6"
            >
              <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech mb-3">
                {title}
              </div>
              <p className="text-sm leading-7 text-foreground/85">{body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/about" className="brand-button glass inline-flex items-center gap-2">
            More about me <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="brand-button glass inline-flex items-center gap-2">
            Get in touch
          </Link>
        </div>
      </section>
    </MotionPage>
  );
}
