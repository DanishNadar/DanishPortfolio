import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Sparkles, Trophy } from "lucide-react";
import portrait from "@/assets/danish-portrait.jpg";
import { SocialLinks } from "@/components/SocialLinks";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Danish Nadar" },
      { name: "description", content: "A reflective look at Danish Nadar's path through AI engineering, robotics, autonomy, recovery, creativity, and purposeful technology." },
    ],
  }),
  component: About,
});

const focusAreas = [
  ["Open-source engineering", "Linux-first workflows with Bash, Git, Docker, Python, and reproducible deployments.", "/posts/linux-first-ai-engineering-workflow"],
  ["Accessibility robotics", "Computer vision, haptics, and assistive systems built around dignity and independence.", "/projects/observ-e"],
  ["Autonomy systems", "EcoCAR, RTMaps, CAN signals, sensor fusion, and safety-minded validation.", "/projects/ecocar-sensor-fusion"],
  ["Applied ML + AI tools", "Lane detection, RL, fraud detection, and AI workflows built for practical questions.", "/stack-map"],
  ["Security automation", "DNS authentication, reporting, and outreach automation that remove repetitive risk checks.", "/projects/dns-security-scanner"],
];

const thinking = [
  ["I connect systems, not isolated features.", "The most meaningful work often happens between parts: perception into control, data into decisions, AI output into user trust, Linux workflows into reproducible builds, and automation into business value. I like projects where each piece has a reason to be there."],
  ["I care about usefulness after the demo.", "A demo can look polished and still be fragile. I ask what breaks in real use, which assumptions are hidden, which signals can be trusted, and whether the system is clear to the people who depend on it."],
  ["I build with people in mind.", "OBSERV-E, A Little Tech For You, Career Services work, Robotics workshops, and scam-awareness projects all come from the same instinct: technology should help people understand, move, learn, and feel more capable."],
  ["I use AI as leverage, not a replacement for thinking.", "Claude, ChatGPT, Copilot, Hugging Face models, Linux terminals, and other AI tools help me prototype faster, but I still want the architecture, references, constraints, and product story to be clear enough to defend."],
  ["I like work that carries both depth and meaning.", "EcoCAR has real-time vehicle integration. TTP has security automation and reporting. Accessibility robotics has a human reason at the center. Each project has sharpened how I think about responsibility."],
];


const hobbies = [
  {
    id: "H-01",
    title: "Guitar + music",
    body: "Music gives me a different kind of problem solving: rhythm, patience, practice, and expression. It is one of the creative parts of me that balances the technical side.",
    image: {
      id: "H-01",
      title: "Guitar or music photo",
      guidance: "Use a guitar photo, performance photo, award photo, or anything that shows the music side of you.",
      src: "/portfolio_images/hobbies/guitar-music.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    id: "H-02",
    title: "Astronomy + curiosity",
    body: "Astronomy is one of the earliest things that made me curious about engineering, exploration, and big systems. It still connects to why I like robotics and autonomy.",
    image: {
      id: "H-02",
      title: "Astronomy or night-sky photo",
      guidance: "Use a sky photo, planetarium image, telescope image, travel night-sky photo, or anything that shows curiosity and wonder.",
      src: "/portfolio_images/hobbies/astronomy-curiosity.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    id: "H-03",
    title: "Fitness + sports",
    body: "Sports and training shaped my discipline before engineering did. Football, volleyball, track, running, and the gym all remind me that growth is built through consistency.",
    image: {
      id: "H-03",
      title: "Fitness or sports photo",
      guidance: "Use a gym, running, football, volleyball, track, or active lifestyle photo.",
      src: "/portfolio_images/hobbies/fitness-sports.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    id: "H-04",
    title: "Travel + perspective",
    body: "Travel and study abroad helped me see how much of the world I still have to learn from. It made me more reflective, open-minded, and motivated to build useful things.",
    image: {
      id: "H-04",
      title: "Travel or reflection photo",
      guidance: "Use a study abroad photo, city view, Lake Como-style memory, or a travel moment that changed your perspective.",
      src: "/portfolio_images/hobbies/travel-reflection.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    id: "H-05",
    title: "Hands-on building",
    body: "I have always liked taking things apart, understanding how they work, and putting them back together. That builder instinct shows up in robotics, hardware, software, and design.",
    image: {
      id: "H-05",
      title: "Hands-on building photo",
      guidance: "Use a robotics lab, Lego/building memory, electronics bench, tools, 3D printing, or hardware project photo.",
      src: "/portfolio_images/hobbies/hands-on-building.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    id: "H-06",
    title: "Community + mentoring",
    body: "A lot of my life outside projects still comes back to people: mentoring, student leadership, workshops, and creating spaces where others feel capable.",
    image: {
      id: "H-06",
      title: "Community or mentoring photo",
      guidance: "Use a workshop, club, coaching, public speaking, leadership, or community event photo.",
      src: "/portfolio_images/hobbies/community-mentoring.jpg",
      aspect: "aspect-[4/3]",
    },
  },
];


const achievements = [
  {
    id: "A-07",
    title: "Illinois Tech feature: Intelligent Systems for Safer Roads",
    body: "Illinois Tech featured my autonomous-vehicle mission, connecting a serious road-safety experience to my focus on AI, autonomy, EcoCAR, sensor fusion, and safer decision-making systems.",
    links: [
      { label: "Read article", href: "https://www.iit.edu/student-experience/student-and-alumni-stories/intelligent-systems-safer-roads" },
      { label: "LinkedIn post", href: "https://www.linkedin.com/feed/update/urn:li:activity:7442364085289070593/" },
      { label: "Portfolio post", href: "/posts/intelligent-systems-for-safer-roads", internal: true },
    ],
    image: {
      id: "A-07",
      title: "Intelligent Systems for Safer Roads feature image",
      guidance: "Use the Illinois Tech article image, LinkedIn post screenshot, EcoCAR/autonomy photo, or a clean graphic about safer autonomous systems.",
      src: "/portfolio_images/achievements/intelligent-systems-safer-roads.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    id: "A-01",
    title: "Qualcomm Robotics Track Winner — StarkHacks (World's Largest Hardware Hackathon)",
    body: "StarkHacks 2026 is the world's largest hardware hackathon. OBSERV-E — an accessibility robotics concept using computer vision and natural guidance for visually impaired users — earned first place in the Qualcomm Robotics Track against hundreds of hardware engineers.",
    image: {
      id: "A-01",
      title: "StarkHacks robotics recognition certificate",
      guidance: "Use the StarkHacks certificate, award photo, demo table, team photo, or OBSERV-E showcase image.",
      src: "/portfolio_images/gallery/danish-starkhacks-certificate.png",
      aspect: "aspect-[4/3]",
    },
  },
  {
    id: "A-02",
    title: "President — ML@IIT (Machine Learning Club)",
    body: "Led the Illinois Tech Machine Learning Club as President, building a practical AI learning community through applied projects, workshops, and cross-organization collaboration with robotics, game dev, and autonomy groups.",
    image: {
      id: "A-02",
      title: "ML@IIT Machine Learning Club leadership photo",
      guidance: "Use a machine learning club meeting, workshop, GBM, leadership, or team photo.",
      src: "/portfolio_images/achievements/itr-leadership.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    id: "A-03",
    title: "EcoCAR autonomy and sensor-fusion work",
    body: "Worked across autonomy-oriented vehicle software, sensor fusion, driver monitoring, lane-centering, CAN signals, RTMaps, C++, and validation-minded engineering.",
    image: {
      id: "A-03",
      title: "EcoCAR autonomy photo",
      guidance: "Use an EcoCAR team photo, vehicle photo, autonomy dashboard, RTMaps screenshot, CAN/sensor screenshot, or testing photo.",
      src: "/portfolio_images/achievements/ecocar-autonomy.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    id: "A-04",
    title: "Leadership, mentoring, and community spaces",
    body: "Built experience through student leadership, academic coaching, public-safety/community work, workshops, and events that connect technical growth with people.",
    image: {
      id: "A-04",
      title: "Leadership or community achievement photo",
      guidance: "Use a speaking, networking, mentorship, public safety, Career Services, or community event photo.",
      src: "/portfolio_images/achievements/leadership-community.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    id: "A-05",
    title: "Honors Superior Award in guitar",
    body: "Earned the Honors Superior Award in a guitar competition, showing the creative and disciplined side that balances technical engineering work.",
    image: {
      id: "A-05",
      title: "Guitar Honors Superior Award photo",
      guidance: "Use the award, guitar competition photo, performance photo, certificate, or a strong music-related image.",
      src: "/portfolio_images/achievements/guitar-honors.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    id: "A-06",
    title: "Workshops and technical teaching",
    body: "Designed and supported learning experiences around robotics, Java basics, AI/ML, Linux, Python, and computer fundamentals for students and peers.",
    image: {
      id: "A-06",
      title: "Workshop or teaching photo",
      guidance: "Use a classroom, robotics workshop, whiteboard, presentation, mentoring, or hands-on teaching photo.",
      src: "/portfolio_images/achievements/workshop-mentoring.jpg",
      aspect: "aspect-[4/3]",
    },
  },
];

const timeline = [
  ["P-TECH + Montgomery College foundation", "Started with cloud computing, networking, computer science, technical support, event leadership, and program-building experience that shaped how I think about access and opportunity."],
  ["Illinois Tech AI path", "Built a deeper AI/ML foundation through artificial intelligence coursework, data science interests, applied projects, and a long-term goal of working on autonomous systems and useful AI products."],
  ["P33 Chicago Java project", "Worked with peers and industry mentors on a Java text-adventure financial-literacy game, building object-oriented programming, sprint collaboration, and professional communication experience."],
  ["Illinois Tech Robotics", "Treasurer, Instructor, and Developer — managed budgets, led AI/ML/Linux/Python workshops, architected the club's AIRA robotics assistant, and co-built OBSERV-E which won the Qualcomm Robotics Track at StarkHacks, the world's largest hardware hackathon."],
  ["Open-source development", "Linux and terminal-driven workflows are a core part of how I build: Bash, Git, Docker, Python environments, deployment debugging, and repeatable project launches."],
  ["EcoCAR EV Challenge", "Worked across sensor fusion, driver monitoring, and lateral controls with RTMaps, C++, CAN signals, validation, and real-time autonomous-vehicle software constraints."],
  ["OfficePro AI internship", "Built AI instructor prototypes using Azure AI Foundry, Cognitive Services, Speech Services, Azure Functions, Python/PowerShell automation, Supabase, Vercel, Stripe, and production support workflows."],
  ["Technology Transition Paradigm", "Developed DNS authentication and security screening automation around SPF, DKIM, DMARC, EasyDMARC-style validation, structured JSON/CSV reporting, Streamlit, and Microsoft Graph."],
  ["Founders Frequency + ML engineering", "Worked in a consulting-style data and AI software engineering environment across backend systems, data pipelines, automation, AI/ML experimentation, client requirements, and production-minded milestones."],
  ["StarkHacks / OBSERV-E", "Helped earn the Qualcomm Robotics Track recognition at StarkHacks with an accessibility robotics concept for visually impaired users built on computer vision, environmental understanding, and natural guidance."],
  ["A Little Tech For You", "Started building an AI guide for older adults with patient technology explanations, short tutorials, voice narration, consulting paths, and a Hugging Face/FastAPI voice-service direction."],
];

function About() {
  return (
    <MotionPage mood="hero" tone="brand" className="mx-auto max-w-7xl px-6 py-16 readable-page">
      <section className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-rb opacity-35 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] glass ring-orb">
            <img src={portrait} alt="Danish Nadar in a professional portrait" className="w-full min-h-[560px] object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep via-deep/70 to-transparent p-7">
              <div className="text-xs uppercase tracking-widest text-accent">Danish Nadar</div>
              <div className="mt-1 text-2xl font-display font-bold">AI Engineer · Robotics · Autonomy · Linux</div>
              <div className="mt-2 text-base text-muted-foreground">Illinois Tech · Builder · Research-driven product thinker</div>
            </div>
          </div>
        </div>
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent"><Sparkles className="h-4 w-4" /> AI engineer shaped by robotics, autonomy, recovery, and service</div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold">I am learning to turn curiosity into <span className="text-gradient-rb">useful systems</span>.</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">I build at the edge of AI, robotics, and product: autonomous systems, accessibility tools, and security automation. Recovery taught me to value what is real, explainable, and useful.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="bg-gradient-rb text-background px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2">Explore projects <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/stack-map" className="glass px-6 py-3 rounded-lg font-semibold">View stack map</Link>
            <SocialLinks variant="icons" />
          </div>
        </div>
      </section>

      <section className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {focusAreas.map(([title, body, href]) => (
          <Link key={title} to={href} className="glass premium-border rounded-3xl p-7 hover:glow-blue transition hover:-translate-y-1 min-h-[13rem]">
            <div className="text-lg font-display font-semibold text-gradient-rb">{title}</div>
            <p className="mt-3 text-base leading-7 text-muted-foreground">{body}</p>
          </Link>
        ))}
      </section>


      <section className="mt-20 grid xl:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-8 premium-border about-scroll-card">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Inner framework</div>
          <h2 className="mt-3 text-3xl font-display font-bold">How I try to build with care</h2>
          <p className="mt-3 text-base text-muted-foreground">The principles behind how I build and keep learning.</p>
          <div className="about-sub-scroller mt-6 pr-3" aria-label="How Danish thinks">
            {thinking.map(([title, body]) => (
              <article key={title} className="about-scroll-item">
                <div className="text-lg font-display font-semibold text-gradient-rb">{title}</div>
                <p className="mt-2 text-base leading-8 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="glass rounded-3xl p-8 premium-border about-scroll-card">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Built through experience</div>
          <h2 className="mt-3 text-3xl font-display font-bold">A path of learning and rebuilding</h2>
          <p className="mt-3 text-base text-muted-foreground">Education, recovery, leadership, autonomy, AI, and automation in motion.</p>
          <div className="about-sub-scroller mt-6 pr-3" aria-label="Danish Nadar timeline">
            {timeline.map(([title, body]) => (
              <article key={title} className="about-timeline-item">
                <div className="font-display text-lg font-semibold">{title}</div>
                <p className="mt-2 text-base leading-8 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-accent font-tech">
              <Trophy className="h-4 w-4" /> Milestones
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Milestones along the rebuilding path</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
              Wins, leadership, and growth: not finish lines, but proof of momentum.
            </p>
          </div>
          <Link to="/resume" className="brand-button glass inline-flex items-center gap-2">
            View full resume <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {achievements.map((achievement) => (
            <article key={achievement.id} className="glass premium-border ambient-card rounded-3xl overflow-hidden">
              <ImageSlot {...achievement.image} className="rounded-none border-0" />
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">{achievement.id}</div>
                <h3 className="mt-2 font-display text-xl font-semibold">{achievement.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{achievement.body}</p>
                {"links" in achievement && Array.isArray(achievement.links) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {achievement.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target={link.internal ? undefined : "_blank"}
                        rel={link.internal ? undefined : "noreferrer"}
                        className="text-xs px-3 py-1.5 rounded-full glass hover:text-accent inline-flex items-center gap-1"
                      >
                        {link.label} {link.internal ? <ArrowRight className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Outside the code</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">The creative side of the build</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
              The creative, curious, active, and community-minded person behind the projects.
            </p>
          </div>
          <Link to="/gallery" className="brand-button glass inline-flex items-center gap-2">
            Open full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {hobbies.map((hobby) => (
            <article key={hobby.id} className="glass premium-border ambient-card rounded-3xl overflow-hidden">
              <ImageSlot {...hobby.image} className="rounded-none border-0" />
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">{hobby.id}</div>
                <h3 className="mt-2 font-display text-xl font-semibold">{hobby.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{hobby.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 glass rounded-3xl p-8 md:p-10 premium-border">
        <div className="text-xs uppercase tracking-widest text-accent">Current direction</div>
        <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Autonomy, accessibility robotics, AI products, and security automation.</h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-4xl">I want to turn AI, robotics, backend systems, and product thinking into tools that help people move, recover, understand, and work with less friction.</p>
        <div className="mt-6 flex flex-wrap gap-3"><SocialLinks variant="buttons" /><Link to="/contact" className="brand-button bg-gradient-rb text-background inline-flex items-center">Contact me</Link></div>
      </section>
    </MotionPage>
  );
}
