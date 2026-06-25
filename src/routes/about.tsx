import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, Sparkles, Trophy } from "lucide-react";
import portrait from "@/assets/danish-portrait.jpg";
import { SocialLinks } from "@/components/SocialLinks";
import { MotionPage } from "@/components/MotionPage";
import { ImageSlot } from "@/components/ImageSlot";
import { ImageZoomButton } from "@/components/ImageLightbox";
import { TechnicalHighlight } from "@/components/TechnicalHighlight";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About  -  Danish Nadar" },
      { name: "description", content: "AI engineer, robotics builder, and Illinois Tech student working across autonomy, ML, security automation, and product." },
    ],
  }),
  component: About,
});

const focusAreas = [
  ["Open-source engineering", "Daily development through Linux/terminal workflows, Bash, Git, Docker, Python environments, local services, and deployment debugging.", "/posts/linux-first-ai-engineering-workflow"],
  ["Accessibility robotics", "OBSERV-E, GRVI/DRVI/HRVI, computer vision, haptic guidance, and human-centered assistive robotics.", "/projects/observ-e"],
  ["Autonomy systems", "EcoCAR, RTMaps, lane-centering, CAN signals, driver monitoring, sensor fusion, and validation.", "/projects/ecocar-sensor-fusion"],
  ["Applied ML + AI tools", "Lane detection, RL simulation, fraud detection, Hugging Face models, and AI-assisted engineering workflows.", "/stack-map"],
];

const thinking = [
  ["I connect systems, not isolated features.", "The most interesting work usually happens between parts: perception into control, data into decisions, AI output into user trust, Linux workflows into reproducible builds, and automation into business value. I like projects where the pieces have to work together."],
  ["I care about usefulness beyond the demo.", "A demo can be impressive and still not be reliable. I try to ask what breaks in real use, what assumptions are hidden, which signal can be trusted, and how the system would be explained to a teammate, collaborator, or user."],
  ["I build with people in mind.", "OBSERV-E, A Little Tech For You, Career Services work, Robotics workshops, and scam-awareness projects all come from the same instinct: technology should help people understand, move, learn, and feel more capable."],
  ["I use AI as leverage, not a replacement for thinking.", "Claude, ChatGPT, Copilot, Hugging Face models, Linux terminals, and other AI tools help me prototype faster, but I still want the architecture, references, constraints, and product story to be clear enough to defend."],
  ["I like work that has both technical depth and a public story.", "EcoCAR has real-time vehicle integration. TTP has security automation and reporting. The portfolio links projects, posts, skills, and resume history so an employer can see not just what I used, but how I used it."],
];


const hobbies = [
  {
    title: "Chess",
    body: "Chess helps me develop strategic thinking and patience. It is one of the creative parts of me that balances the technical side.",
    image: {
      title: "Chess & AI",
      src: "/portfolio_images/hobbies/chess.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    title: "Tinkering with Tech",
    body: "I love exeperimenting with open-source technology, leveraging LLMs, building prototypes, and developing innovative solutions through my curiosity and creativity.",
    image: {
      title: "Tinkering with Technology",
      src: "/portfolio_images/hobbies/tinkering-with-tech.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    title: "Exercise and Health",
    body: "I prioritize physical fitness and well-being, engaging in activities like weight lifting, sprinting with family, and bodyweight exercises to maintain a healthy lifestyle.",
    image: {
      title: "Exercise and Health",
      src: "/portfolio_images/hobbies/fitness-sports.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    title: "Haging out with Friends",
    body: "Spending time with friends and family is essential for my well-being. Whether it's a casual hangout or a planned activity, these moments of connection feel absolutely priceless!",
    image: {
      title: "Haging out with Friends",
      src: "/portfolio_images/hobbies/hanging-out.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    title: "Math and Computing",
    body: "I absolutely love exploring the intersection of mathematics and computing, where abstract concepts come to life through code. Math is so intriguing and fascinating, and I find satisfaction in solving problems.",
    image: {
      title: "Math and Computing",
      guidance: "Use a mathematics classroom, computer lab, or any image that shows the intersection of math and computing.",
      src: "/portfolio_images/hobbies/math-computing.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    title: "Helping and mentoring",
    body: "I find fulfillment in helping others and mentoring, whether it's through tutoring, coaching, or providing guidance. I enjoy sharing knowledge and supporting others in their learning journey!",
    image: {
      title: "Community or mentoring photo",
      guidance: "Use a workshop, club, coaching, public speaking, leadership, or community event photo.",
      src: "/portfolio_images/hobbies/community-mentoring.jpg",
      aspect: "aspect-[4/3]",
    },
  },
];


const achievements = [
  {
    title: "Student Story Featured on Illinois Tech Website",
    body: "Illinois Tech featured my autonomous-vehicle mission, connecting a serious road-safety experience to my focus on AI, autonomy, EcoCAR, sensor fusion, and safer decision-making systems.",
    links: [
      { label: "Read article", href: "https://www.iit.edu/student-experience/student-and-alumni-stories/intelligent-systems-safer-roads" },
      { label: "LinkedIn post", href: "https://www.linkedin.com/feed/update/urn:li:activity:7442364085289070593/" },
      { label: "Portfolio post", href: "/posts/intelligent-systems-for-safer-roads", internal: true },
    ],
    image: {
      title: "Intelligent Systems for Safer Roads feature image",
      guidance: "Use the Illinois Tech article image, LinkedIn post screenshot, EcoCAR/autonomy photo, or a clean graphic about safer autonomous systems.",
      src: "/portfolio_images/achievements/intelligent-systems-safer-roads.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    title: "Won the world's largest hardware hackathon",
    body: "StarkHacks 2026  -  Qualcomm Robotics Track Winner. OBSERV-E, an accessibility robotics concept using computer vision, environmental understanding, and natural guidance for visually impaired users, took first in the robotics category at the world's largest hardware hackathon.",
    image: {
      title: "StarkHacks winner certificate  -  world's largest hardware hackathon",
      guidance: "Use the StarkHacks winner certificate, award photo, demo table, team photo, or OBSERV-E showcase image.",
      src: "/portfolio_images/achievements/starkhacks-observ-e-win.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    title: "Leadership, mentoring, and community spaces",
    body: "Built experience through student leadership, academic coaching, public-safety/community work, workshops, and events that connect technical growth with people.",
    image: {
      title: "Leadership or community achievement photo",
      guidance: "Use a speaking, networking, mentorship, public safety, Career Services, or community event photo.",
      src: "/portfolio_images/achievements/leadership-community.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    title: "Illinois Tech Robotics Treasurer",
    body: "Led Illinois Tech Robotics through strategic planning, budgeting, and efforts to build a more inclusive engineering community by facilitating collaboration and resource allocation.",
    image: {
      title: "Illinois Tech Robotics leadership photo",
      guidance: "Use a robotics meeting, lab, GBM, leadership, team, or project showcase photo.",
      src: "/portfolio_images/achievements/itr-leadership.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    title: "Illinois Tech EcoCAR Feature",
    body: "Worked across autonomy-oriented vehicle software, sensor fusion, driver monitoring, lane-centering, CAN signals, RTMaps, C++, and validation-minded engineering.",
    image: {
      title: "EcoCAR autonomy photo",
      guidance: "Use an EcoCAR team photo, vehicle photo, autonomy dashboard, RTMaps screenshot, CAN/sensor screenshot, or testing photo.",
      src: "/portfolio_images/achievements/ecocar-autonomy.jpg",
      aspect: "aspect-[4/3]",
    },
  },
  {
    title: "OfficePro Internship",
    body: "Worked as an intern at OfficePro, gaining experience in customer service, sales, and technical support.",
    image: {
      title: "OfficePro Internship photo",
      guidance: "Use an OfficePro work environment photo, team meeting photo, or a professional development image.",
      src: "/portfolio_images/achievements/officepro-internship.jpg",
      aspect: "aspect-[4/3]",
    },
  }
];

const timeline = [
  ["P-TECH + Montgomery College foundation", "Started with cloud computing, networking, computer science, technical support, event leadership, and program-building experience that shaped how I think about access and opportunity."],
  ["Illinois Tech AI path", "Built a deeper AI/ML foundation through artificial intelligence coursework, data science interests, applied projects, and a long-term goal of working on autonomous systems and useful AI products."],
  ["P33 Chicago Java project", "Worked with peers and industry mentors on a Java text-adventure financial-literacy game, building object-oriented programming, sprint collaboration, and professional communication experience."],
  ["Illinois Tech Robotics", "Grew into leadership through budgeting, documentation, Microsoft Teams organization, AI/ML/Linux/Python workshops, and project direction for accessibility robotics and student skill development."],
  ["Open-source development", "Linux and terminal-driven workflows are a core part of how I build: Bash, Git, Docker, Python environments, deployment debugging, and repeatable project launches."],
  ["EcoCAR EV Challenge", "Worked across sensor fusion, driver monitoring, and lateral controls with RTMaps, C++, CAN signals, validation, and real-time autonomous-vehicle software constraints."],
  ["OfficePro AI internship", "Built AI instructor prototypes using Azure AI Foundry, Cognitive Services, Speech Services, Azure Functions, Python/PowerShell automation, Supabase, Vercel, Stripe, and production support workflows."],
  ["Technology Transition Paradigm", "Developed DNS authentication and security screening automation around SPF, DKIM, DMARC, EasyDMARC-style validation, structured JSON/CSV reporting, Streamlit, and Microsoft Graph."],
  ["Founders Frequency + ML engineering", "Worked in a consulting-style data and AI software engineering environment across backend systems, data pipelines, automation, AI/ML experimentation, client requirements, and production-minded milestones."],
  ["StarkHacks / OBSERV-E", "Won the Qualcomm Robotics track at StarkHacks, the world's largest hardware hackathon, with an accessibility robotics concept for visually impaired users built on computer vision, environmental understanding, and natural guidance."],
  ["A Little Tech For You", "Started building an AI guide for older adults with patient technology explanations, short tutorials, voice narration, consulting paths, and a Hugging Face/FastAPI voice-service direction."],
];

function About() {
  return (
    <MotionPage className="mx-auto max-w-7xl px-6 py-16 readable-page">
      <section className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-rb opacity-35 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] glass ring-orb">
            <div className="zoomable-image-wrap">
              <img src={portrait} alt="Danish Nadar in a professional portrait" className="w-full min-h-[560px] object-cover object-center" />
              <ImageZoomButton src={portrait} alt="Danish Nadar in a professional portrait" />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep via-deep/70 to-transparent p-7">
              <div className="text-xs uppercase tracking-widest text-accent">Danish Nadar</div>
              <div className="mt-1 text-2xl font-display font-bold">AI Engineer · Autonomous Systems · Software Development</div>
              <div className="mt-2 text-base text-muted-foreground">Illinois Tech · Builder · Research-driven product thinker</div>
            </div>
          </div>
        </div>
        <div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-accent"><Sparkles className="h-4 w-4" /> AI engineer at the intersection of software, autonomy, and robotics</div>
          <h1 className="mt-5 text-4xl md:text-6xl font-display font-bold">I turn technical curiosity into <span className="text-gradient-rb">working systems</span>.</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground"><TechnicalHighlight text="My work sits between research, engineering, and product, built through open-source tooling and terminal-driven workflows: autonomous-vehicle pipelines, accessibility robotics, applied machine learning, security automation, and portfolio-grade AI interfaces. I care about building things that are technically real, explainable to people, and useful beyond a demo." /></p>
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


      <section className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-accent font-tech">
              <Trophy className="h-4 w-4" /> Achievements
            </div>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Milestones that show the range of my work</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
              These milestones show the range of outcomes across engineering, leadership, competition, community work, and personal growth.
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

      <section className="mt-20 grid xl:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-8 premium-border about-scroll-card">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Personal operating system</div>
          <h2 className="mt-3 text-3xl font-display font-bold">How I think</h2>
          <p className="mt-3 text-base text-muted-foreground">A scrollable view into the principles behind the projects.</p>
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
          <h2 className="mt-3 text-3xl font-display font-bold">Timeline</h2>
          <p className="mt-3 text-base text-muted-foreground">A more detailed path through education, leadership, autonomy, AI, and automation work.</p>
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
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">Outside the code</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Hobbies that shape how I build</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
              I wanted this section to show more of the person behind the projects: the creative, curious, active, reflective, and community-minded parts of me.
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
        <div className="text-xs uppercase tracking-widest text-accent">Current focus</div>
        <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold"><span className="text-gradient-rb">Autonomy, accessibility robotics, AI products, and security automation.</span></h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-4xl"><TechnicalHighlight text="I am especially interested in roles and collaborations where I can combine AI/ML engineering, robotics and autonomy, backend systems, AI tooling, and product thinking to build real tools, not just isolated demos." /></p>
        <div className="mt-6 flex flex-wrap gap-3"><SocialLinks variant="buttons" /><Link to="/contact" className="brand-button bg-gradient-rb text-background inline-flex items-center">Contact me</Link></div>
      </section>
    </MotionPage>
  );
}
