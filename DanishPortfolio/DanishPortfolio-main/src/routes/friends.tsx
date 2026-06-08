import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/friends")({
  head: () => ({
    meta: [
      { title: "Friends — Danish Nadar" },
      { name: "description", content: "The people who shaped Danish Nadar's journey: moments, memories, and the community behind the work." },
    ],
  }),
  component: FriendsPage,
});

const friendSlots = [
  {
    id: "FR-01",
    namePrompt: "Friend's name",
    descPrompt: "Who is this person, how did you meet, and what's one thing about them that stuck with you, as an engineer, a collaborator, or a person?",
    imgId: "FR-IMG-01",
    imgGuidance: "A photo with this friend or a moment you shared.",
  },
  {
    id: "FR-02",
    namePrompt: "Friend's name",
    descPrompt: "Who is this person, how did you meet, and why do they matter to the story of who you are?",
    imgId: "FR-IMG-02",
    imgGuidance: "A photo with this friend or a moment you shared.",
  },
  {
    id: "FR-03",
    namePrompt: "Friend's name",
    descPrompt: "Who is this person, from school, work, a team, or elsewhere? What would you want people to know about them?",
    imgId: "FR-IMG-03",
    imgGuidance: "A photo with this friend or a moment that captures who they are.",
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

function FriendsPage() {
  return (
    <MotionPage className="mx-auto max-w-[92rem] px-6 lg:px-10 py-14 readable-page">

      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
            <Heart className="h-4 w-4" /> Community
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold leading-tight animated-title-glow">
            The people who made the <span className="text-gradient-rb">hard parts survivable</span>.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            Recovery, engineering, and ambition don't happen in isolation. This page is for the people who showed up: in the lab, at the hospital, in the group chat at 2am, at competitions, at dinners, and everywhere else that doesn't make it onto a resume.
          </p>
        </div>
        <ImageSlot
          id="FR-HERO"
          title="Group or community photo"
          guidance="Use a group photo: friends at an event, after a competition, at dinner, or just together somewhere that matters."
          src="/portfolio_images/friends/friends-hero.jpg"
          aspect="aspect-[4/3]"
        />
      </section>

      {/* Individual friend profiles */}
      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">People worth naming</div>
        <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">A few of the ones who mattered most</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {friendSlots.map(({ id, namePrompt, descPrompt, imgId, imgGuidance }) => (
            <article key={id} className="glass premium-border rounded-3xl overflow-hidden">
              <ImageSlot
                id={imgId}
                title={namePrompt}
                guidance={imgGuidance}
                src={`/portfolio_images/friends/${imgId.toLowerCase()}.jpg`}
                aspect="aspect-[4/3]"
              />
              <div className="p-6">
                <div className="font-display text-lg font-semibold text-muted-foreground/60 italic mb-3">{namePrompt}</div>
                <PlaceholderText id={id} prompt={descPrompt} />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Group moments */}
      <section className="mt-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Group moments</div>
        <h2 className="mt-3 text-3xl font-display font-bold">Where we were</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ImageSlot
            id="FR-GROUP-01"
            title="Event or outing"
            guidance="A photo from a group event: competition, dinner, trip, game, or any moment that captures the energy."
            src="/portfolio_images/friends/group-01.jpg"
            aspect="aspect-[4/3]"
          />
          <ImageSlot
            id="FR-GROUP-02"
            title="Campus or lab moment"
            guidance="A photo from around campus, in the lab, at a study session, or doing something school-related together."
            src="/portfolio_images/friends/group-02.jpg"
            aspect="aspect-[4/3]"
          />
          <ImageSlot
            id="FR-GROUP-03"
            title="Celebration or milestone"
            guidance="A photo from a graduation, birthday, project finish, or any moment worth marking."
            src="/portfolio_images/friends/group-03.jpg"
            aspect="aspect-[4/3]"
          />
        </div>
      </section>

      {/* Reflection */}
      <section className="mt-16 glass premium-border rounded-3xl p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">What community means</div>
        <h2 className="mt-3 text-3xl font-display font-bold">Why this page exists on a technical portfolio</h2>
        <div className="mt-5 grid md:grid-cols-2 gap-5">
          <PlaceholderText
            id="FR-REFLECTION-01"
            prompt="Write about a specific moment when a friend's support, presence, or words changed how you approached something hard: the recovery, a project, a decision."
          />
          <PlaceholderText
            id="FR-REFLECTION-02"
            prompt="Write about what you've tried to give back and how you show up for others the way they showed up for you during the hardest parts of the story."
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
