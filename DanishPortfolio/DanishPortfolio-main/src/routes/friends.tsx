import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Heart, UsersRound } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";
import { StaggerIn, StaggerChild } from "@/components/AnimateIn";
import { friendProfiles, type FriendProfile } from "@/data/friendProfiles";

export const Route = createFileRoute("/friends")({
  head: () => ({
    meta: [
      { title: "Friends — Danish Nadar" },
      {
        name: "description",
        content:
          "The people who shaped Danish Nadar's journey: moments, memories, and the community behind the work.",
      },
    ],
  }),
  component: FriendsPage,
});

function FriendCard({ id, slug, name, overview, image }: FriendProfile) {
  return (
    <Link
      to="/friends/$slug"
      params={{ slug }}
      className="friend-profile-card group block glass premium-border overflow-hidden rounded-3xl"
    >
      <ImageSlot
        id={id}
        title={`${name} photo`}
        guidance={`Add a portrait or shared photo featuring ${name}.`}
        src={image}
        aspect="aspect-[4/3]"
        className="rounded-none border-0"
      />
      <div className="p-5 md:p-6">
        <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech">{id}</div>
        <h3 className="mt-2 font-display text-xl font-semibold">{name}</h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{overview}</p>
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
    <MotionPage
      mood="community"
      className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page"
    >
      <section className="section-atmosphere section-atmosphere-community grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center rounded-[2rem] p-6 md:p-10">
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <Heart className="h-4 w-4" /> Community
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            The people who made the <span className="text-gradient-rb">hard parts survivable</span>.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Recovery and ambition do not happen alone. This page is for the people who showed up in
            hard seasons and ordinary moments that mattered.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm text-accent">
            <UsersRound className="h-4 w-4" />
            {friendProfiles.length} people currently featured
          </div>
        </div>
        <ImageSlot
          id="FR-HERO"
          title="Group or community photo"
          guidance="Use a group photo: friends at an event, after a competition, at dinner, or just together somewhere that matters."
          src="/portfolio_images/gallery/friends-team-culture.jpg"
          aspect="aspect-[4/3]"
        />
      </section>

      {/* Individual friend profiles */}
      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
          People worth naming
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">
          The people behind the journey
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground leading-8">
          Individual stories, photos, and links will grow here. The work was never built alone.
        </p>
        <StaggerIn className="mt-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {friendProfiles.map((friend) => (
            <StaggerChild key={friend.id}>
              <FriendCard {...friend} />
            </StaggerChild>
          ))}
        </StaggerIn>
      </section>

      {/* Group moments */}
      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
          Group moments
        </div>
        <h2 className="mt-3 text-3xl font-display font-bold">Where we were</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ImageSlot
            id="FR-GROUP-01"
            title="Event or outing"
            guidance="A photo from a group event: competition, dinner, trip, game, or any moment that captures the energy."
            src="/portfolio_images/gallery/hackathon-competition.jpg"
            aspect="aspect-[4/3]"
          />
          <ImageSlot
            id="FR-GROUP-02"
            title="Campus or lab moment"
            guidance="A photo from around campus, in the lab, at a study session, or doing something school-related together."
            src="/portfolio_images/gallery/robotics-lab-action.jpg"
            aspect="aspect-[4/3]"
          />
          <ImageSlot
            id="FR-GROUP-03"
            title="Celebration or milestone"
            guidance="A photo from a graduation, birthday, project finish, or any moment worth marking."
            src="/portfolio_images/achievements/starkhacks-observ-e-win.jpg"
            aspect="aspect-[4/3]"
          />
        </div>
      </section>

      {/* Reflection */}
      <section className="mt-16 glass premium-border rounded-3xl p-8 md:p-12">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
          What community means
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold leading-tight max-w-3xl">
          Why this page exists on a technical portfolio
        </h2>
        <p className="mt-5 text-lg leading-9 text-foreground/80 max-w-3xl">
          Most portfolios perform solitude — the lone engineer, the solo breakthrough. This one does
          not. The people on this page are the context behind everything else you see here.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-accent/25 bg-background/35 p-6">
            <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech mb-3">
              During recovery
            </div>
            <p className="text-sm leading-7 text-foreground/85">
              Friendship gave recovery witnesses, humor, and people who saw who I was becoming
              before I could. Rebuilding is deeply internal — but it doesn't happen invisibly. These
              people showed up in ways that made the hard parts not just survivable, but worth
              something.
            </p>
          </div>
          <div className="rounded-2xl border border-accent/25 bg-background/35 p-6">
            <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech mb-3">
              What it taught me
            </div>
            <p className="text-sm leading-7 text-foreground/85">
              That support shapes how I lead now — explain patiently, make room, and help others
              feel capable. The way I build teams, document systems, and communicate under pressure
              traces directly back to lessons learned in friendship, not in coursework.
            </p>
          </div>
          <div className="rounded-2xl border border-accent/25 bg-background/35 p-6">
            <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech mb-3">
              What I bring to teams
            </div>
            <p className="text-sm leading-7 text-foreground/85">
              Someone who knows what it feels like to not understand something — and still need to
              keep moving. Someone who asks before assuming, documents for future-you, and treats
              team friction as information rather than obstruction.
            </p>
          </div>
          <div className="rounded-2xl border border-accent/25 bg-background/35 p-6">
            <div className="text-[10px] uppercase tracking-[0.18em] text-accent font-tech mb-3">
              Why it matters to you
            </div>
            <p className="text-sm leading-7 text-foreground/85">
              If you're evaluating me as a colleague, collaborator, or hire: the people here shaped
              my judgment, my patience, and my sense of what good looks like in a team. They are not
              background — they are evidence.
            </p>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            {
              label: "Patience",
              body: "Earned through walking alongside others in hard seasons, not from reading about it.",
            },
            {
              label: "Clarity",
              body: "Learned from explaining half-understood things to people who still needed to move forward.",
            },
            {
              label: "Loyalty",
              body: "The belief that showing up consistently matters more than showing up perfectly.",
            },
          ].map(({ label, body }) => (
            <div
              key={label}
              className="glass rounded-2xl p-5 text-center border border-accent/15 hover:border-accent/40 transition-colors"
            >
              <div className="text-lg font-display font-semibold text-gradient-rb">{label}</div>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/about" className="brand-button glass inline-flex items-center gap-2">
            More about me <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-xl text-sm font-semibold border border-border hover:border-accent/60 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </MotionPage>
  );
}
