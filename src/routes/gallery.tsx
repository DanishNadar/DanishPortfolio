import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Images, MonitorPlay, Sparkles } from "lucide-react";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery  -  Danish Nadar" },
      { name: "description", content: "A visual gallery for project photos, leadership moments, robotics images, autonomy work, and personal highlights." },
    ],
  }),
  component: GalleryPage,
});

const featuredSlots = [
  {
    id: "G-01",
    title: "Featured portfolio moment",
    guidance: "Use the strongest image you want people to remember first: you presenting, building, leading, or standing with a major project.",
    src: "/portfolio_images/gallery/featured-01.jpg",
    aspect: "aspect-[16/9]",
  },
  {
    id: "G-02",
    title: "Second hero image",
    guidance: "Use another major moment: competition, lab, professional event, robotics demo, or a clean portrait.",
    src: "/portfolio_images/gallery/featured-02.jpg",
    aspect: "aspect-[16/9]",
  },
];

const gallerySlots = [
  ["G-03", "Robotics lab action", "Use a photo of you building, testing, wiring, soldering, CAD work, or helping someone with hardware.", "/portfolio_images/gallery/robotics-lab-action.jpg"],
  ["G-04", "Autonomous vehicle work", "Use EcoCAR, sensor fusion, vehicle testing, simulation, lane detection, or autonomy-related imagery.", "/portfolio_images/gallery/autonomous-vehicle-work.jpg"],
  ["G-05", "Leadership moment", "Use a photo where you are leading, speaking, hosting a meeting, organizing a workshop, or representing a group.", "/portfolio_images/gallery/leadership-moment.jpg"],
  ["G-06", "Won the world's largest hardware hackathon", "StarkHacks 2026  -  Qualcomm Robotics Track. Use the winner certificate, award moment, team photo, demo table, or OBSERV-E showcase image.", "/portfolio_images/gallery/la-blankets.jpg"],
  ["G-07", "Professional event", "Use networking, career bootcamp, LinkedIn-style event photos, conference photos, or mentorship moments.", "/portfolio_images/gallery/professional-event.jpg"],
  ["G-08", "Project screenshot", "Use a screenshot of a web app, AI tool, dashboard, Streamlit app, portfolio feature, or product UI.", "/portfolio_images/gallery/project-screenshot.jpg"],
  ["G-09", "Technical diagram", "Use a pipeline diagram, system architecture, information model, signal flow, or ML workflow diagram.", "/portfolio_images/gallery/technical-diagram.jpg"],
  ["G-10", "Mentorship / teaching", "Use a photo from a workshop, tutoring, coaching, robotics training, or community teaching moment.", "/portfolio_images/gallery/mentorship-teaching.jpg"],
  ["G-11", "Music / guitar", "Use a guitar, performance, music-related memory, or creative hobby photo.", "/portfolio_images/gallery/music-guitar.jpg"],
  ["G-12", "Astronomy / curiosity", "Use sky, telescope, planetarium, stargazing, travel night sky, or anything that shows curiosity and wonder.", "/portfolio_images/gallery/astronomy-curiosity.jpg"],
  ["G-13", "Travel / reflection", "Use a travel memory, study abroad photo, city view, lake/mountain photo, or a moment that shaped your perspective.", "/portfolio_images/gallery/travel-reflection.jpg"],
  ["G-14", "Fitness / sports", "Use football, volleyball, track, gym, running, or a photo that shows discipline outside engineering.", "/portfolio_images/gallery/fitness-sports.jpg"],
  ["G-15", "Friends / team culture", "Use a team photo, friends at an event, robotics group photo, or a moment that shows collaboration.", "/portfolio_images/gallery/friends-team-culture.jpg"],
  ["G-16", "Community impact", "Use public safety, youth commission, service, outreach, or a photo that connects your work to people.", "/portfolio_images/gallery/community-impact.jpg"],
  ["G-17", "Behind the scenes", "Use a candid work-in-progress photo: messy desk, whiteboard, laptop, workshop table, or debugging session.", "/portfolio_images/gallery/behind-the-scenes.jpg"],
  ["G-18", "Open image slot", "Use any additional picture you want people to see that does not fit the other categories.", "/portfolio_images/gallery/open-slot.jpg"],
] as const;

function GalleryPage() {
  return (
    <MotionPage className="mx-auto max-w-[96rem] px-6 lg:px-10 py-14 readable-page">
      <section className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent">
          <Images className="h-4 w-4" /> Visual gallery
        </div>
        <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold animated-title-glow">
          A visual showcase for the work, people, and moments behind the <span className="text-gradient-rb">engineering story</span>.
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
          This gallery brings the work into focus: robotics labs, autonomy work, leadership moments, technical diagrams, community impact, and the creative discipline behind the engineering.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/autonomous-vehicles" className="brand-button bg-gradient-rb text-background inline-flex items-center gap-2">
            Autonomy page <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/about" className="brand-button glass inline-flex items-center gap-2">
            About + hobbies <Sparkles className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-16 grid lg:grid-cols-2 gap-6">
        {featuredSlots.map((slot) => (
          <ImageSlot key={slot.id} {...slot} />
        ))}
      </section>

      <section className="mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Full gallery wall</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Visual showcase across projects, leadership, and life</h2>
          </div>
          <div className="glass rounded-2xl px-4 py-3 text-sm text-muted-foreground">
            Engineering · Leadership · Life
          </div>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {gallerySlots.map(([id, title, guidance, src]) => (
            <ImageSlot key={id} id={id} title={title} guidance={guidance} src={src} aspect="aspect-[4/3]" />
          ))}
        </div>
      </section>

      <section className="mt-16 glass premium-border rounded-3xl p-8 md:p-10">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Visual narrative</div>
        <h2 className="mt-3 text-3xl font-display font-bold">The work is <span className="text-gradient-rb">technical</span>, but the story is <span className="text-gradient-rb">human</span>.</h2>
        <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
          These images are here to show the full pattern clearly: I build systems, lead teams, learn quickly, document what matters, and connect technology back to people. The visuals are intentionally organized as project context instead of decoration.
        </p>
      </section>
    </MotionPage>
  );
}

