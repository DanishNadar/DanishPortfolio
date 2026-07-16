import type { ReactNode } from "react";

export type FriendStory = {
  title: string;
  body: string;
};

type FriendImageCrop = {
  position?: string;
  scale?: number;
  origin?: string;
};

export type FriendProfile = {
  slug: string;
  name: string;
  overview: string;
  image: string;
  placeholderImage: string;
  portraitCrop?: FriendImageCrop;
  gallery: string[];
  galleryPlaceholders: string[];
  galleryCrops?: FriendImageCrop[];
  galleryLabels?: string[];
  sharedProjectSlugs: string[];
  sharedWorkSummary: string;
  stories: FriendStory[];
  gratitude: string;
  gratitudeName?: string;
  legacy: string;
  linkedin?: string;
  website?: string;
  portfolio?: string;
  testimonial?: ReactNode;
};

function friend(
  slug: string,
  name: string,
  overview: string,
  details: Omit<
    FriendProfile,
    | "slug"
    | "name"
    | "overview"
    | "image"
    | "placeholderImage"
    | "gallery"
    | "galleryPlaceholders"
  >,
): FriendProfile {
  return {
    slug,
    name,
    overview,
    image: `/portfolio_images/friends/${slug}.jpg`,
    placeholderImage: `/portfolio_images/friends/placeholders/${slug}.jpg`,
    gallery: [
      `/portfolio_images/friends/${slug}-work.jpg`,
      `/portfolio_images/friends/${slug}-moment.jpg`,
    ],
    galleryPlaceholders: [
      `/portfolio_images/friends/placeholders/${slug}-work.jpg`,
      `/portfolio_images/friends/placeholders/${slug}-moment.jpg`,
    ],
    ...details,
  };
}

export const friendProfiles: FriendProfile[] = [
  friend(
    "natorion-johnson",
    "Natorion Johnson",
    "A Computer Engineer, robotics leader, trusted collaborator, and one of the people who most shaped my technical path at Illinois Tech.",
    {
      portraitCrop: { position: "50% 30%" },
      sharedProjectSlugs: [],
      sharedWorkSummary:
        "We led Illinois Tech Robotics together with Natorion as president and me as treasurer. We collaborated on AIRA, Roslund, and other projects. He taught me systems programming and practical troubleshooting, and we exceled in many challenging courses at Illinois Tech along the way.",
      stories: [
        {
          title: "The introduction that changed my college path",
          body: "Natorion introduced me to Illinois Tech Robotics (ITR) and helped me step into student leadership. I began serving as treasurer while he was president, then continued in the role throughout college.",
        },
        {
          title: "Robotics, systems, and difficult classes",
          body: "We learned through demanding courses and collaborated on AIRA, Roslund, and other robotics projects. He taught me systems programming concepts, practical troubleshooting, and how to stay achieve success even among daunting challenges, like Physics II or leadership straits.",
        },
        {
          title: "Growing beyond the projects",
          body: "Our friendship grew beyond classes and robotics. We exercised, worked on ourselves, and encouraged each other to become stronger and more confident. I genuinely enjoyed those moments so much, and they made our friendship especially meaningful to me.",
        },
        {
          title: "Always making room for me",
          body: "Natorion continued thinking about me and including me, even when I was nervous, hesitant, or still contemplating whether I belonged in an opportunity. That consistent invitation helped me move beyond uncertainty and become more involved.",
        },
      ],
      gratitude:
        "Thank you, Natorion, for always thinking of me and including me, especially when I was nervous or unsure whether to step forward. You opened the door to robotics and leadership, patiently taught me so much, and became an incredible friend along the way. My time at Illinois Tech would not have been the same without you.",
      legacy:
        "I'm excited to see where your journey takes you, and I hope you continue to inspire others the way you have inspired me! You are extremely skilled and resourceful, so I'm confident you'll be very successful in your future endeavors!",
      linkedin: "https://www.linkedin.com/in/natorionj/",
      website: "https://www.linkedin.com/in/natorionj/",
      portfolio: "https://www.linkedin.com/in/natorionj/",
    },
  ),
  friend(
    "fannie-yu",
    "Fannie Yu",
    "A Mechanical Engineer, robotics leader, phenomenal artist and a friend whose technical strength and encouragement helped me grow into my potential.",
    {
      sharedProjectSlugs: [],
      sharedWorkSummary:
        "We led Illinois Tech Robotics together with Fannie as lab manager and later president, and me as treasurer. We organized the lab (Fannie led impressively, while I tried to help outside my expertise), managed budgets, and blended mechanical fabrication and software architecting across everything we built. We also collaborated as executive members of the Illinois Tech Railroad Club (ITRC) when she was model coordinator, and naturally, I became treasurer there too. Then, Fannie became the President of the International Game Developers Association (IGDA) while I was serving as its treasurer. Throughout those initiatives, we organized 30+ general body meetings for robotics, 15+ game nights for IGDA, and 5+ models for ITRC.",
      stories: [
        {
          title: "Building a stronger robotics lab",
          body: "We met through Illinois Tech Robotics while Fannie was lab manager. Together, we organized the lab (Fannie led impressively, while I tried to help outside my expertise), improved its operating structure, and budgeted strategically for equipment and materials.",
        },
        {
          title: "Mechanical and software collaboration",
          body: "As we took on more robotics projects, I focused on software and systems while Fannie led the mechanical work. Our unique strengths complemented each other, and I could always count on her engineering judgment to make the project substantially extroardinary, like with her arm design for the AIRA project.",
        },
        {
          title: "Leadership through changing roles",
          body: "Fannie moved from lab manager to president while I grew as treasurer. Working beside her taught me how technical leadership, ethical decision-making, considerate administration, and sincere support can help both a team and an individual reach much further!",
        },
        {
          title: "Trains and sensor fusion",
          body: "I also joined Illinois Tech Railroad Club while Fannie was model coordinator, naturally becoming treasurer. I was fascinated by ITRC's work and excited by the possibility of connecting my ambitions involving autonomous systems and sensor fusion with trains!",
        },
        {
          title: "Artist Alley Leadership",
          body: "As a remarkable artist, Fannie leveraged her phenomenal creativity to design exceptional and practical 3D models inspired by ITR's robots. We collaborated to host the ITR stand at Cosplay Club's Artist Alley, where her designs attracted attention and made robotics feel accessible and exciting to a broader audience.",
        },

        {
          title: "IGDA collaboration",
          body: "Fannie became the President of the International Game Developers Association (IGDA) while I was serving as its treasurer. We organized 15+ game nights together. Her leadership made IGDA functional, as we hosted gamebIITes 2026, the largest collegiate game showcase event of Illinois Tech history!",
        }
      ],
      gratitude:
        "Thank you, Fannie, for believing in me when I was struggling to believe in myself. You have always been genuinely kind, a nice person, and so much fun to work with. I also must thank you for every motivating cat picture you sent when I needed one. Your cat is unbelievably cute, and those little moments meant a lot to me!",
      legacy:
        "I'm excited to see what you build as a mechanical engineer. If NOVA is anything to go off of, I have no doubt you'll create spectacular things! If you ever want to collaborate on setting up a small business for your 3D models or creating artistic trinkets, I'm always happy to support the technical architecting, software, and systems side of things!",
      linkedin: "https://www.linkedin.com/in/fannieyu/",
      portfolio: "https://sites.google.com/view/fanniemeche/",
      testimonial: (
        <>
          I met Danish during the Fall 2024 school year. We had a mutual friend
          who introduced him to the Robotics club. Danish was very enthusiastic
          about everything that interested him. He was always eager to learn more
          about robotics, the lab, and everything there was to know. He is{" "}
          <span className="text-gradient-rb">
            always willing to help and never hesitates to extend a helping hand
          </span>{" "}
          even if its new to him.
          <br />
          <br />
          Danish is genuinely{" "}
          <span className="text-gradient-rb">
            <strong>one of the most incredible people</strong> I've met
          </span>{" "}
          and a great partner when it come to getting things done and{" "}
          <span className="text-gradient-rb">
            <strong>improving an existing system or creating a new one</strong>
          </span>
          . Ive said quite a bit about Danish's character, but no words can
          describe{" "}
          <span className="text-gradient-rb">
            <strong>how great his spirit and work ethic</strong> is
          </span>
          . If an employer is reading this, you are missing out on an opportunity to {" "}
          <span className="text-gradient-rb">
            <strong>hire a top employee</strong>
          </span>{" "}
          if you dont hire him.
        </>
      ),
    },
  ),
  friend(
    "elias-frey-reschly",
    "Elias Frey Reschly",
    "A Mechanical Engineer, creative problem solver, dedicated robotics leader, and close friend forged through difficult classes and shared responsibility.",
    {
      portraitCrop: { position: "50% 18%", scale: 1.38, origin: "50% 22%" },
      gratitudeName: "Eli",
      sharedProjectSlugs: [],
      sharedWorkSummary:
        "We pushed through some of the hardest technical courses at Illinois Tech together and served Illinois Tech Robotics side by side with Eli as vice president and me as treasurer. Eli also encouraged me to get more involved in ITRC, which introduced me to unique experiences.",
      stories: [
        {
          title: "Learning through difficult classes",
          body: "We progressed through many demanding courses together, including Calculus 3 at Illinois Tech. Working through difficult material gave me a close view of his persistence, critical thinking, and ability to find creative paths through a problem.",
        },
        {
          title: "Serving Illinois Tech Robotics together",
          body: "While Eli served as vice president of Illinois Tech Robotics, I served alongside him as treasurer. We balanced academic pressure with the responsibility of supporting a technical student organization.",
        },
        {
          title: "A standard worth respecting",
          body: "Eli works hard and approaches problems with a creativity I have always admired. I am grateful that so many difficult classes gave us the chance to learn together, and I have a lot of respect for the person and engineer he has become.",
        },
        {
          title: "Bringing me back when things get difficult",
          body: "When I struggle with a class or go through a difficult period, Eli checks in, encourages me, and helps me find my footing again. He was also ITRC vice president when I became treasurer, and I am thankful that he pushed me to become more involved in ITRC.",
        },
      ],
      gratitude:
        "Thank you, Eli, for all the classes, challenges, robotics projects, and railroad experiences we have made it through together. I especially appreciate how you check on me and help pull me back when I am having a hard time. You have pushed me to work harder, try new things, and stay involved in ITRC, and I am really glad we became friends!",
      legacy:
        "I have so much respect for the curiosity and effort you bring everywhere you go. I hope we keep challenging each other as executive members of prominent student orgs, perservering through difficult classes, and establish a future of innovation in robotics. I am excited to see where your curiosity and creativity takes you!",
      linkedin: "https://www.linkedin.com/in/elias-reschly-749327276/",
      website: "https://www.linkedin.com/in/elias-reschly-749327276/",
      portfolio: "https://www.linkedin.com/in/elias-reschly-749327276/",
    },
  ),
  friend(
    "pranav-bonagiri",
    "Pranav Bonagiri",
    "A Computer Engineering student at UMBC and a friend connected through P-TECH, technology, and years of shared growth.",
    {
      portraitCrop: { position: "50% 8%" },
      sharedProjectSlugs: [],
      sharedWorkSummary:
        "We met through P-TECH's Cloud Computing and Network Technology pathway in high school and have collaborated since through technical conversations, programming conversations, and hackathons.",
      stories: [
        {
          title: "A connection that began in P-TECH",
          body: "Pranav and I met in high school through P-TECH, a dual-enrollment pathway where we both earned an A.A.S. in Cloud Computing and Network Technology alongside our high school education.",
        },
        {
          title: "Technology as a shared language",
          body: "Programming, engineering, and emerging technology have fueled years of passionate conversations. Pranav became both a close friend and someone I could rely on to engage seriously with an ambitious technical idea.",
        },
        {
          title: "Growing through conversations and hackathons",
          body: "From long technical discussions to hackathon collaboration, we have challenged each other's thinking and grown significantly.",
        },
        {
          title: "Friendship across the distance",
          body: "Even though we live and study far apart, Pranav has always made an effort to keep up with me, which I appreciate. We can pick up a conversation about programming, careers, or life without the distance making the friendship feel any less natural.",
        },
      ],
      gratitude:
        "Thank you, Pranav, for keeping up with me across all these years and all this distance. I always enjoy our passionate conversations about programming and technology, and I love that our friendship has grown from P-TECH into the engineering careers we once talked about.",
      legacy:
        "I hope our paths keep crossing through engineering, hackathons, and the technologies we used to talk about as students. I am proud of how far we have both come, and I am excited to keep comparing ideas, sharing progress, and cheering each other on!",
      linkedin: "https://www.linkedin.com/in/pranav-bonagiri",
      website: "https://www.linkedin.com/in/pranav-bonagiri",
      portfolio: "https://www.linkedin.com/in/pranav-bonagiri",
    },
  ),
  friend(
    "muhammad-khan",
    "Muhammad (Moe) Khan",
    "An Electrical Engineering student and one of my closest friends since Physics II. A constant source of academic ambition, personal discipline, fitness motivation, and thoughtful professional guidance, while also keeping me grounded and balanced through genuine friendship!",
    {
      portraitCrop: { position: "50% 22%", scale: 1.08, origin: "50% 24%" },
      gratitudeName: "Moe",
      sharedProjectSlugs: [],
      sharedWorkSummary:
        "We met studying for Physics II and both came out of it with remarkable grades and a formidable bond. Since then we have held each other academically accountable, maintained motivation to work out, and shared professional guidance through every career prep season Illinois Tech.",
      stories: [
        {
          title: "The study invitation that started it",
          body: "We met in Physics II when Moe asked whether I wanted to study with him. The course was difficult, and I am grateful we decided to collaborate throughout the semester. We both performed exceptionally well and built a strong friendship through the work.",
        },
        {
          title: "Raising the academic standard",
          body: "Moe inspires me to expect more from my academic performance and to keep striving toward my best. His discipline, and 4.0 GPA, reminds me that ambitious goals become possible through perserverence, preparation, and a commitment to success!",
        },
        {
          title: "Growth beyond the classroom",
          body: "He motivates me to exercise, strengthen my habits, and develop personally as well as professionally. That accountability has made our friendship about becoming healthier, more capable, and more confident people.",
        },
        {
          title: "A friend and professional guide",
          body: "Moe is one of the people I can be honest with about school, work, fitness, and life. He gives thoughtful advice and expects the best from me, motivating me. I am glad that a Physics II study session led to this strong connection.",
        },
      ],
      gratitude:
        "Thank you, Moe, for working with me, arduously, during Physics II and being an incredible friend. You have pushed me to raise my academic standards, work out, and keep becoming better! I always appreciate your honesty and the fact that I know you genuinely want me to succeed!",
      legacy:
        "I hope I can be as dependable and motivating for you as you have been for me. I am excited for all the goals we still have ahead of us, and I know we will keep pushing each other while staying close friends through it all.",
      linkedin: "https://www.linkedin.com/in/mkhan1557/",
      website: "https://www.linkedin.com/in/mkhan1557/",
      portfolio: "https://www.linkedin.com/in/mkhan1557/",
    },
  ),
  friend(
    "andy-tran",
    "Andy Tran",
    "An Electrical Engineering student and one of my first college friends, connected through years of academic, social, and professional growth.",
    {
      portraitCrop: { position: "50% 43%" },
      galleryCrops: [
        { position: "50% 86%", scale: 1.48, origin: "50% 86%" },
        {},
      ],
      sharedProjectSlugs: [],
      sharedWorkSummary:
        "We have progressed from math studying to coordinated coursework, academic problem solving, and the social and professional growth that followed our first year at Illinois Tech.",
      stories: [
        {
          title: "One of my first college friendships",
          body: "Andy was one of the first people I met at Illinois Tech. That early friendship became part of the network and sense of belonging that helped shape my entire college experience.",
        },
        {
          title: "Learning side by side",
          body: "We practiced Calculus together, coordinated across classes, worked through difficult academic challenges, and built a friendship that kept growing socially and professionally long after our first year at Illinois Tech.",
        },
        {
          title: "A friendship that keeps growing",
          body: "Our connection has continued beyond coursework as we develop socially and professionally. I value the consistency, history, and mutual growth behind our friendship.",
        },
        {
          title: "Present through four years",
          body: "Across the last four years, Andy has been there whenever I needed him. His steady presence turned an early college friendship into one of the dependable relationships that made Illinois Tech feel like a community rather than just a campus.",
        },
      ],
      gratitude:
        "Thank you, Andy, for being my friend through all four years of college and for being there whenever I needed you. I appreciate the academic collaboration, the classes, the conversations, and all the extraordinary moments in between. Having someone so considerate beside me made college much nicer!",
      legacy:
        "I'm excited to see you apply your expertise in electrical engineering to design and troubleshoot advanced electrical systems. Your mastery and skills are bound to help you excel. I'm looking forward to seeing what you accomplish!",
      linkedin: "https://www.linkedin.com/in/andyquangtran2056/",
      website: "https://www.linkedin.com/in/andyquangtran2056/",
      portfolio: "https://www.linkedin.com/in/andyquangtran2056/",
    },
  ),
  friend(
    "henry-tran",
    "Henry Tran",
    "An Applied Cybersecurity student, thoughtful classmate, and friend whose growth through CyberHawks continues to inspire me.",
    {
      portraitCrop: { position: "50% 2%" },
      sharedProjectSlugs: [],
      sharedWorkSummary:
        "Shared coursework, Calculus II study, and years of conversations around engineering, cybersecurity, and our evolving professional directions.",
      stories: [
        {
          title: "Classes, friendship, and Calculus II",
          body: "I met Henry through the same early college circle as his twin brother, Andy. We took several classes together and made difficult courses, especially Calculus II, more enjoyable through shared learning and humor.",
        },
        {
          title: "A growing cybersecurity path",
          body: "Henry's progress in applied cybersecurity and his work with CyberHawks have been impressive to witness. He has developed expertise in a field that continues to fascinate me.",
        },
        {
          title: "Inspired by focused growth",
          body: "Watching him build a clear technical direction has encouraged me to keep deepening my own. I value both the friendship and the example his professional development provides.",
        },
        {
          title: "Conversations and CybrrCon",
          body: "Our many conversations and the incredible time we shared at CybrrCon made the friendship even richer. Those experiences let me see cybersecurity through his enthusiasm while also giving us memories that reached far beyond coursework.",
        },
      ],
      gratitude:
        "Thank you, Henry, for all our great conversations, the classes and laughter, and especially our time at CybrrCon. You and Andy have both been wonderful friends over these four years, and I am grateful that I have my own friendship and memories with each of you.",
      legacy:
        "I am excited to see how far you go in cybersecurity. Your growth through CyberHawks has already been inspiring, and I hope I can keep supporting you as you build a career that is completely your own. I am also looking forward to many more conversations and conferences together.",
      linkedin: "#",
      website: "#",
      portfolio: "#",
    },
  ),
  friend(
    "leen-alotaibi",
    "Leen Alotaibi",
    "A Computer Science student and one of my first college friends, connected through the collaborative foundation we built in Calculus I.",
    {
      portraitCrop: { position: "50% 34%" },
      sharedProjectSlugs: [],
      sharedWorkSummary:
        "Our collaboration during Calculus I and the early academic network that we created helped us establish confidence, community, and momentum at the beginning of our college journey.",
      stories: [
        {
          title: "The beginning of college",
          body: "Leen was one of the first people I met at Illinois Tech. We collaborated closely in Calculus I and helped establish the academic and social network that grew around our first year.",
        },
        {
          title: "Mastering an early challenge together",
          body: "Calculus I demanded patience and consistent practice. Working together helped us strengthen both our understanding and our confidence at a formative point in college.",
        },
        {
          title: "Growth across different paths",
          body: "Although Leen transferred after her first year, I still value what we accomplished together. Her computer science journey reminds me that meaningful friendships and inspiration can continue even as paths diverge.",
        },
        {
          title: "Helping me get started",
          body: "The beginning of college can define how capable and connected someone feels. Leen helped me get started by making those first academic challenges collaborative and by contributing to the network that carried me into the rest of my Illinois Tech journey.",
        },
      ],
      gratitude:
        "Thank you, Leen, for helping me get started in college. Working through Calculus I together made those first months feel less intimidating and much more memorable. Even though our paths diverged, I still appreciate the friendship and confidence we built at the beginning.",
      legacy:
        "I hope you're doing well and finding your rhythm in computer science in a way that feels right for you. I'm really excited for your future and to see where you take things in CS and AI. I'm excited to collaborate with you on projects in the future!",
      linkedin: "https://www.linkedin.com/in/leen-alotaibi-8026762a1/",
      website: "https://www.linkedin.com/in/leen-alotaibi-8026762a1/",
      portfolio: "https://www.linkedin.com/in/leen-alotaibi-8026762a1/",
    },
  ),
  friend(
    "haley-brittman",
    "Haley Brittman",
    "Computer Information Systems (CIS) student, trusted source of wisdom, and early college friend whose growth through Illinois Tech's SMART Lab inspires me.",
    {
      portraitCrop: { position: "50% 38%", scale: 1.04, origin: "50% 38%" },
      sharedProjectSlugs: [],
      sharedWorkSummary:
        "We focused on Calculus I as a space for both academic exploration and personal growth, connecting mathematical learning with social integration. Building on that foundation, Haley later continued her work at the SMART Lab at Illinois Tech, and her growth there has been inspiring to watch!",
      stories: [
        {
          title: "Our unofficial academic advisor",
          body: "Haley brought so much knowledge and practical wisdom that our group jokingly treated her as our academic advisor. Her experiences made difficult registration decisions and unfamiliar college systems feel less mystical.",
        },
        {
          title: "Learning initiatives in Calculus I",
          body: "As some of the first people in our college circle, we collaborated on Calculus I and took initiative in helping each other learn. That shared effort helped establish a supportive network around us.",
        },
        {
          title: "Professional growth through the SMART Lab",
          body: "Her work in Illinois Tech's SMART Lab has been remarkable to watch. She continues learning in areas that fascinate me while developing into an increasingly capable Computer Information Systems professional.",
        },
        {
          title: "Belief that helped me flourish",
          body: "Haley consistently believed in me and pushed me to become my best. That encouragement helped me flourish academically and personally!",
        },
      ],
      gratitude:
        "Thank you, Haley, for believing in me and pushing me to be my best from the beginning. You brought so much knowledge and confidence into our group that calling you our academic advisor felt so natural. Your encouragement helped me flourish, and I am grateful that you saw so much in me early on.",
      legacy:
        "I'm so excited to see where you go! From humble beginnings in Calculus I, you have grown so much, and continue to develop. I'm excited to work with you on the Computing Collaborative to future-proof Illinois Tech's computing infrastructure!",
      linkedin: "https://www.linkedin.com/in/haley-brittman/",
      website: "https://www.linkedin.com/in/haley-brittman/",
      portfolio: "https://www.linkedin.com/in/haley-brittman/",
      testimonial:
        "Danish was there to help me in my early college years with Calculus and my other courses related to CS and I am truly grateful for that. I find his ambition to be inspiring!",
    },
  ),
  friend(
    "nishant-kabra",
    "Nishant Kabra",
    "A Computer science and AI student whose encouragement led me to EcoCAR and one of the most formative engineering experiences of my life.",
    {
      portraitCrop: { position: "50% 38%", scale: 1.04, origin: "50% 38%" },
      galleryLabels: [
        "Nishant Kabra Team Member Tuesday EcoCAR Feature",
        "CAV Subteam Group Photo",
      ],
      sharedProjectSlugs: ["ecocar-sensor-fusion"],
      sharedWorkSummary:
        "We collaborated on EcoCAR sensor fusion, driver monitoring, and lateral controls, building real autonomous vehicle software together. We also shared AI coursework and supported each other through the academic and job-market challenges that came with it.",
      stories: [
        {
          title: "The conversation that led to EcoCAR",
          body: "A discussion from our Intro to Algorithms class became a conversation about our ambitions. After hearing my story and interest in autonomous vehicles, Nishant encouraged me to join Illinois Tech EcoCAR. That suggestion changed my college trajectory.",
        },
        {
          title: "Developing technical strength through EcoCAR",
          body: "We worked on EcoCAR systems including sensor fusion, driver monitoring, and lateral controls. His technical work set an exceptional standard and pushed me to become more disciplined, capable, and ambitious.",
        },
        {
          title: "Growing through pressure and uncertainty",
          body: "We later shared AI classes and continued supporting each other through academic and job-market struggles. EcoCAR became one of my greatest college experiences, and growing alongside Nishant made it even more meaningful.",
        },
        {
          title: "A person I am always glad to see",
          body: "Every interaction with Nishant has been friendly, encouraging, and genuinely enjoyable. His warmth is as inspiring as his technical ability.",
        },
      ],
      gratitude:
        "Thank you, Nishant, for hearing my story and immediately recognizing that EcoCAR could be the right place for me. That one suggestion gave me one of the best experiences of college. I have always enjoyed talking and working with you because you are thoughtful, friendly, and an incredible person. Your engineering work and discipline make me want to raise my own standard!",
      legacy:
        "I wish you the absolute best in everything ahead, and I hope you're able to be successful in an exciting career engineering autonomous vehicles and autonomous systems! Your technical strength, work ethic, and kindness will take you far, and I am excited to see where you go next!",
      linkedin: "https://www.linkedin.com/in/nkabra56/",
      website: "https://nkabra56.up.railway.app/",
      testimonial: (
        <>
          Danish is not just a brilliant peer; he is{" "}
          <span className="text-gradient-rb">
            <strong>one of the most reliable and supportive people</strong> I know
          </span>
          . We first crossed paths when I was a new transfer student at Illinois Tech. I reached out
          for help on an assignment, and his{" "}
          <span className="text-gradient-rb">immediate, selfless response</span> was the start of a
          great friendship.
          <br />
          <br />
          We eventually teamed up on the EcoCar project, diving deep into autonomous systems like{" "}
          <span className="text-gradient-rb">sensor fusion and lateral controls</span>. Even though I
          was the one who introduced him to the project, his{" "}
          <span className="text-gradient-rb">
            <strong>drive and eagerness to learn</strong>
          </span>{" "}
          quickly became an inspiration to me. Danish genuinely wants everyone around him to succeed.
          He constantly pushes me to try my hardest and is{" "}
          <span className="text-gradient-rb">always my first call when I need advice</span>, whether
          it’s about a complex engineering problem, navigating the job hunt, or just life in general.
          He brings incredible technical skills to the table, but it’s his{" "}
          <span className="text-gradient-rb">
            <strong>empathy, dedication, and genuine friendship</strong>
          </span>{" "}
          that truly set him apart.
        </>
      ),
    },
  ),
  friend(
    "lucas-ferguson",
    "Lucas Ferguson",
    "A Computer Science student, Illinois Tech Robotics leader, and one of the people who most directly shaped how I lead, take initiative, and serve others.",
    {
      portraitCrop: { position: "50% 22%", scale: 1.05, origin: "50% 22%" },
      sharedProjectSlugs: [],
      sharedWorkSummary:
        "Illinois Tech Robotics, IGDA leadership, CyberHawks sessions, and student-organization operations. Lucas personally guided me through becoming treasurer of Illinois Tech Robotics, walking me through the financial responsibilities, the budget cycles, and the mindset it takes to actually own a leadership role. His mentorship gave me the foundation I needed to serve effectively and grow into the position across multiple organizations.",
      stories: [
        {
          title: "Leadership that felt welcoming",
          body: "Lucas's warmth and initiative immediately stood out to me. He showed me that a strong leader could be ambitious and driven while still being genuinely approachable, encouraging, and attentive to the people around them.",
        },
        {
          title: "Teaching me how to become treasurer",
          body: "Lucas sat with me and walked me through what it meant to serve as treasurer of Illinois Tech Robotics. He explained the financial systems, the budget cycles, the responsibilities, and the ownership that came with the role. His guidance gave me the practical foundation and the confidence to step in, manage the organization's resources effectively, and eventually carry that responsibility into IGDA and ITRC.",
        },
        {
          title: "Inspiring me to take more initiative",
          body: "Watching Lucas lead with such consistency, purpose, and care made me realize I was holding myself back. He pushed me to stop waiting for permission and start taking more initiative. That shift changed how I showed up in every student organization I was part of, and it set me on the path toward becoming the kind of leader I had only admired from a distance before.",
        },
        {
          title: "From ITR to CyberHawks and IGDA",
          body: "I first encountered Lucas through Illinois Tech Robotics, where he demonstrated confident, welcoming leadership in a way that made the club feel alive. I later attended CyberHawks sessions and saw that same energy carry into every room he entered. When he became IGDA president, I served alongside him as treasurer and continued in that role throughout college.",
        },
        {
          title: "Carrying the example forward",
          body: "His example shaped how I now lead as president of the Machine Learning Club. I want the people I work with to feel the same sense of possibility, momentum, and genuine welcome that Lucas's leadership made visible to me when I needed it most.",
        },
        {
          title: "Positivity that changes the room",
          body: "Lucas is consistently kind, positive, and attentive to the people around him. His presence can make me, and seemingly anyone nearby, feel immediately better. That ability to elevate a room is one of the leadership qualities I admire most and aspire to replicate.",
        },
      ],
      gratitude:
        "Thank you, Lucas, for taking the time to teach me how to be a treasurer and for consistently pushing me to take more initiative. You did not have to do any of that, but you did, and it changed how I lead. You have a way of making everyone around you feel more capable and more welcome, and I carry that lesson into every leadership role I take on. I am genuinely grateful for your mentorship, your example, and your friendship.",
      legacy:
        "I hope I can make others feel as capable and welcome as you made me feel when I was still figuring out how to show up. Your example is already part of how I lead, and I am excited to see all the communities, projects, and opportunities you continue to build and inspire.",
      linkedin: "https://www.linkedin.com/in/lucasferguson5275/",
      website: "https://www.lucasferguson.net/",
    },
  ),
  friend(
    "kaung-myat-nick-naing",
    "Kaung Myat (Nick) Naing",
    "A computer science leader whose belief in my potential helped move me from being an uncertain participant to the president of Illinois Tech's Machine Learning Club.",
    {
      portraitCrop: { position: "50% 9%" },
      gratitudeName: "Nick",
      sharedProjectSlugs: [],
      sharedWorkSummary:
        "From StarkHacks to Machine Learning Club leadership, IGDA initiatives, Data Spark, and current work towards establishing a GPU cluster and technical opportunity at Illinois Tech, we have collaborated extensively!",
      stories: [
        {
          title: "A leader I watched from a distance",
          body: "I repeatedly saw Nick launching initiatives, developing projects, leading Codify and the Machine Learning Club, and running hackathons such as Data Spark. His consistency made proactive leadership feel tangible.",
        },
        {
          title: "The encouragement to step forward",
          body: "While I was spearheading an IGDA event, Nick suggested that I apply to become president of the Machine Learning Club. I was nervous and unsure of my capabilities, but he recognized skill and passion that I had not fully trusted yet.",
        },
        {
          title: "From StarkHacks to ambitious campus infrastructure",
          body: "Since then, we participated in StarkHacks (the world's largest hardware hackathon of all time), I became the ML Club president, and our work has grown closer. We are now advancing initiatives such as acquiring a GPU cluster for Illinois Tech and building a stronger environment for sustainabletechnical innovation.",
        },
        {
          title: "Support for ideas that sound impossible!",
          body: "Nick continues working with me no matter how ambitious or unconventional my ideas become. He stays beside me, offers practical support, and treats large goals as challenges worth structuring rather than reasons to stop imagining. Sharing ambitions and working together facilitate success that is far from unattainable, and I am grateful for that approach to collaboration!",
        },
      ],
      gratitude:
        "Thank you, Nick, for believing in me before I was fully ready to believe in myself. You encouraged me to become ML Club president, and you continue to work with me no matter how ambitious or unusual my ideas become. I really appreciate that you listen, help me shape those ideas, and stay beside me while we try to make them real.",
      legacy:
        "I'm encouraged by how well we've worked together, and I'm excited for what we can still build for ML Club, Illinois Tech's computing resources, and the students who come after us. As you move forward, I wish you the very best in what's next. I know you have the capabilities, skills, and fortitude to excel wherever you choose to apply them, and I look forward to seeing what you accomplish!",
      linkedin: "https://www.linkedin.com/in/kaungmyatnaing9/",
      website: "https://www.linkedin.com/in/kaungmyatnaing9/",
      portfolio: "https://www.linkedin.com/in/kaungmyatnaing9/",
    },
  ),
];

export const friendBySlug = Object.fromEntries(
  friendProfiles.map((profile) => [profile.slug, profile]),
);

const employerPriority = [
  "natorion-johnson",
  "nishant-kabra",
  "fannie-yu",
  "kaung-myat-nick-naing",
  "elias-frey-reschly",
  "pranav-bonagiri",
  "andy-tran",
  "henry-tran",
  "muhammad-khan",
  "leen-alotaibi",
  "haley-brittman",
  "lucas-ferguson",
];

export const employerRelevantFriendProfiles = employerPriority.map((slug) => friendBySlug[slug]);
