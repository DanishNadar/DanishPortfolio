export type FriendStory = {
  title: string;
  body?: string;
};

export type FriendTestimonial = {
  quote: string;
  context?: string;
};

export type FriendProfile = {
  id: string;
  slug: string;
  name: string;
  overview: string;
  image: string;
  placeholderImage: string;
  /** Tailwind gradient classes used as placeholder until a real photo is added */
  initialsGradient: string;
  gallery: string[];
  /** Unique placeholder path per gallery slot, parallel to gallery[] */
  galleryPlaceholders: string[];
  linkedinUrl?: string;
  sharedProjectSlugs: string[];
  sharedWorkSummary: string;
  stories: FriendStory[];
  gratitude: string;
  testimonials: FriendTestimonial[];
};

type FriendProfileDetails = Partial<
  Pick<
    FriendProfile,
    "sharedProjectSlugs" | "sharedWorkSummary" | "stories" | "gratitude" | "testimonials"
  >
>;

const profile = (
  id: string,
  slug: string,
  name: string,
  overview: string,
  initialsGradient: string,
  details: FriendProfileDetails = {},
): FriendProfile => ({
  id,
  slug,
  name,
  overview,
  initialsGradient,
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
  sharedProjectSlugs: details.sharedProjectSlugs ?? [],
  sharedWorkSummary:
    details.sharedWorkSummary ??
    "Our shared context spans classes, technical communities, collaborative learning, and the conversations that strengthened the work around us.",
  stories: details.stories ?? [
    {
      title: "How our paths connected",
      body: `${name} became part of a community built through shared classes, projects, events, and conversations that continued beyond the original setting.`,
    },
    {
      title: "What we worked through together",
      body: "The strongest moments came from showing up consistently: exchanging ideas, helping each other move through uncertainty, and keeping difficult work human.",
    },
    {
      title: "What the experience taught me",
      body: "Good collaboration depends on patience, honest communication, and the confidence to ask questions before assumptions become friction.",
    },
  ],
  gratitude:
    details.gratitude ??
    `Thank you, ${name}, for the conversations, encouragement, and shared experiences that shaped this journey.`,
  testimonials: details.testimonials ?? [],
});

export const friendProfiles: FriendProfile[] = [
  profile(
    "FR-01",
    "natorion-johnson",
    "Natorion Johnson",
    "Computer engineer, robotics leader, trusted collaborator, and one of the people who most shaped my technical path at Illinois Tech.",
    "from-cyan-800 to-blue-900",
    {
      sharedWorkSummary:
        "Illinois Tech Robotics leadership, AIRA, Roslund, systems programming, troubleshooting, and years of collaboration through demanding engineering courses.",
      stories: [
        {
          title: "The introduction that changed my college path",
          body: "Natorion introduced me to Illinois Tech Robotics and helped me step into student leadership. I began serving as treasurer while he was president, then continued in the role throughout college.",
        },
        {
          title: "Robotics, systems, and difficult classes",
          body: "We learned through demanding courses and collaborated on AIRA, Roslund, and other robotics projects. He taught me systems programming concepts, practical troubleshooting, and how to stay composed when complex systems fail.",
        },
        {
          title: "A pivotal role model",
          body: "Our friendship grew alongside the technical work. We exercised, practiced personal growth, and encouraged each other through opportunities to become stronger and more confident. Those experiences were incredibly meaningful to me and made every stage of our shared growth more enjoyable.",
        },
      ],
      gratitude:
        "Thank you, Natorion, for opening the door to robotics and leadership, teaching me patiently, and being a genuinely great friend. Your example shaped my technical growth, leadership, confidence, and personal development. My Illinois Tech experience would have taken a very different path without your influence.",
    },
  ),
  profile(
    "FR-02",
    "fannie-yu",
    "Fannie Yu",
    "Mechanical engineer, robotics leader, and a friend whose technical strength and encouragement helped me grow into my potential.",
    "from-pink-800 to-rose-900",
    {
      sharedWorkSummary:
        "Robotics lab operations, organization budgeting, mechanical-software integration, and leadership across Fannie's lab manager and president roles and my work as treasurer.",
      stories: [
        {
          title: "Building a stronger robotics lab",
          body: "We met through Illinois Tech Robotics while Fannie was lab manager. Together, we organized the lab, improved its operating structure, and budgeted strategically for equipment and materials.",
        },
        {
          title: "Mechanical and software collaboration",
          body: "As our work expanded into robotics projects, I helped architect software and systems solutions while she led mechanical work with remarkable skill. Her engineering judgment consistently made the entire system stronger.",
        },
        {
          title: "Leadership through changing roles",
          body: "Fannie moved from lab manager to president while I grew as treasurer. Working beside her taught me how technical leadership, careful stewardship, and sincere support can help both a team and an individual reach further.",
        },
      ],
      gratitude:
        "Thank you, Fannie, for believing in me when I felt insignificant, for pushing me toward my potential, and for being such an inspiring engineer and friend. Your support has meant more than I can fully express.",
    },
  ),
  profile(
    "FR-03",
    "elias-frey-reschly",
    "Elias Frey Reschly",
    "A creative problem solver, dedicated robotics leader, and close friend forged through difficult classes and shared responsibility.",
    "from-emerald-800 to-teal-900",
    {
      sharedWorkSummary:
        "Illinois Tech Robotics leadership and a long sequence of difficult technical courses where we learned, solved problems, and supported each other's growth.",
      stories: [
        {
          title: "Learning through difficult classes",
          body: "Eli and I first met in class, then progressed through many demanding courses together. Working through difficult material gave me a close view of his persistence, critical thinking, and ability to find creative paths through a problem.",
        },
        {
          title: "Serving Illinois Tech Robotics together",
          body: "While Eli served as vice president of Illinois Tech Robotics, I served alongside him as treasurer. We balanced academic pressure with the responsibility of supporting a technical student organization.",
        },
        {
          title: "A standard worth respecting",
          body: "His hard-working nature and problem-solving ability have continually inspired me. I am grateful for the opportunity to learn, collaborate, and grow beside someone whose work I respect so much.",
        },
      ],
      gratitude:
        "Thank you, Eli, for the countless classes, challenges, and robotics experiences we worked through together. Your creativity, discipline, and friendship have made me a stronger student and collaborator.",
    },
  ),
  profile(
    "FR-04",
    "pranav-bonagiri",
    "Pranav Bonagiri",
    "Computer engineering student at UMBC and a longtime friend connected through P-TECH, technology, and years of shared growth.",
    "from-amber-800 to-orange-900",
    {
      sharedWorkSummary:
        "P-TECH's Cloud Computing and Network Technology pathway, technical conversations, programming exploration, and hackathon collaboration.",
      stories: [
        {
          title: "A friendship that began in P-TECH",
          body: "Pranav and I met in high school through P-TECH, a dual-enrollment pathway where we both earned an A.A.S. in Cloud Computing and Network Technology alongside our high school education.",
        },
        {
          title: "Technology as a shared language",
          body: "Programming, engineering, and emerging technology have fueled years of passionate conversations. He became both a close friend and someone I could rely on to engage seriously with an ambitious technical idea.",
        },
        {
          title: "Growing through conversations and hackathons",
          body: "From long technical discussions to hackathon collaboration, we have challenged each other's thinking and grown significantly. His path in computer engineering at UMBC continues to inspire my own development.",
        },
      ],
      gratitude:
        "Thank you, Pranav, for years of friendship, energetic technical conversations, and the many experiences that carried our growth from high school into our engineering careers.",
    },
  ),
  profile(
    "FR-05",
    "muhammad-khan",
    "Muhammad Khan",
    "Support, memories, and a meaningful place in this community.",
    "from-violet-800 to-purple-900",
  ),
  profile(
    "FR-06",
    "andy-tran",
    "Andy Tran",
    "Electrical engineering student and one of my first college friends, connected through years of academic, social, and professional growth.",
    "from-sky-800 to-indigo-900",
    {
      sharedWorkSummary:
        "Mathematics practice, coordinated coursework, academic problem solving, and the social and professional growth that followed our first year at Illinois Tech.",
      stories: [
        {
          title: "One of my first college friendships",
          body: "Andy was one of the first people I met at Illinois Tech. That early friendship became part of the network and sense of belonging that helped shape my entire college experience.",
        },
        {
          title: "Learning side by side",
          body: "We coordinated across classes, practiced mathematics, and worked to master difficult academic concepts together. Those repeated study sessions turned individual challenges into shared progress.",
        },
        {
          title: "A friendship that keeps growing",
          body: "Our connection has continued beyond coursework as we develop socially and professionally. I value the consistency, history, and mutual growth behind our friendship.",
        },
      ],
      gratitude:
        "Thank you, Andy, for being there from the beginning of college and for every study session, conversation, and shared milestone since. I am grateful that we continue to grow together.",
    },
  ),
  profile(
    "FR-07",
    "henry-tran",
    "Henry Tran",
    "Applied cybersecurity student, thoughtful classmate, and friend whose growth through CyberHawks continues to inspire me.",
    "from-lime-800 to-green-900",
    {
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
      ],
      gratitude:
        "Thank you, Henry, for the classes, laughter, and shared learning. I am proud to have witnessed your growth in cybersecurity and grateful to call you a friend.",
    },
  ),
  profile(
    "FR-08",
    "leen-alotaibi",
    "Leen Alotaibi",
    "Computer science student and one of my first college friends, connected through the collaborative foundation we built in Calculus I.",
    "from-rose-800 to-red-900",
    {
      sharedWorkSummary:
        "Calculus I collaboration and the early academic network that helped us establish confidence, community, and momentum at the beginning of college.",
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
      ],
      gratitude:
        "Thank you, Leen, for helping make the beginning of college collaborative and memorable. I remain grateful for the foundation we built together and inspired by the growth still ahead of us.",
    },
  ),
  profile(
    "FR-09",
    "haley-brittman",
    "Haley Brittman",
    "Computer science student, trusted source of wisdom, and early college friend whose growth through Illinois Tech's SMART Lab inspires me.",
    "from-fuchsia-800 to-pink-900",
    {
      sharedWorkSummary:
        "Calculus I learning initiatives, academic guidance, and a shared interest in the technical growth Haley later continued through Illinois Tech's SMART Lab.",
      stories: [
        {
          title: "Our unofficial academic advisor",
          body: "Haley brought so much knowledge and practical wisdom that our group jokingly treated her as our academic advisor. Her perspective made difficult decisions and unfamiliar college systems feel more manageable.",
        },
        {
          title: "Learning initiatives in Calculus I",
          body: "As some of the first people in our college circle, we collaborated on Calculus I and took initiative in helping each other learn. That shared effort helped establish the supportive network around us.",
        },
        {
          title: "Professional growth through the SMART Lab",
          body: "Her work in Illinois Tech's SMART Lab has been remarkable to watch. She continues learning in areas that fascinate me while developing into an increasingly capable computer science professional.",
        },
      ],
      gratitude:
        "Thank you, Haley, for the wisdom, academic support, and initiative you brought into our earliest college experiences. Watching your growth has continued to motivate my own.",
    },
  ),
  profile(
    "FR-10",
    "nishant-kabra",
    "Nishant Kabra",
    "Computer science and AI student whose encouragement led me to EcoCAR and one of the most formative engineering experiences of my life.",
    "from-teal-800 to-cyan-900",
    {
      sharedProjectSlugs: ["ecocar-sensor-fusion"],
      sharedWorkSummary:
        "EcoCAR sensor fusion, driver monitoring, lateral controls, AI coursework, and the professional growth that came from tackling difficult systems together.",
      stories: [
        {
          title: "The conversation that led to EcoCAR",
          body: "A discussion in Algorithms became a conversation about our ambitions. After hearing my story and interest in autonomous vehicles, Nishant encouraged me to join Illinois Tech EcoCAR. That suggestion changed my college trajectory.",
        },
        {
          title: "Engineering autonomous systems together",
          body: "We worked on EcoCAR systems including sensor fusion, driver monitoring, and lateral controls. His technical work set an exceptional standard and pushed me to become more disciplined, capable, and ambitious.",
        },
        {
          title: "Growing through pressure and uncertainty",
          body: "We later shared AI classes and continued supporting each other through academic and job-market struggles. EcoCAR became one of my greatest college experiences, and growing alongside Nishant made it even more meaningful.",
        },
      ],
      gratitude:
        "Thank you, Nishant, for recognizing where my story and ambitions could lead, encouraging me to join EcoCAR, and inspiring me through your own remarkable work. That opportunity helped me become a far stronger engineer.",
    },
  ),
  profile(
    "FR-11",
    "lucas-ferguson",
    "Lucas Ferguson",
    "Computer science student and student-organization leader whose warmth, initiative, and example reshaped how I want to lead others.",
    "from-orange-800 to-amber-900",
    {
      sharedWorkSummary:
        "IGDA leadership, student-organization operations, CyberHawks sessions, and lessons in building technical communities where people feel welcome to contribute.",
      stories: [
        {
          title: "Leadership that felt welcoming",
          body: "Lucas's friendliness and remarkable personability immediately stood out to me. He showed that strong leadership could be ambitious, approachable, and substantially encouraging at the same time.",
        },
        {
          title: "Learning from CyberHawks and IGDA",
          body: "I attended CyberHawks sessions and witnessed his leadership firsthand. While he served as president of IGDA, I served as treasurer and continued in that role throughout college.",
        },
        {
          title: "Carrying the example forward",
          body: "His example influenced how I now lead initiatives as president of the Machine Learning Club. I want others to feel the same possibility, momentum, and welcome that his leadership made visible to me.",
        },
      ],
      gratitude:
        "Thank you, Lucas, for demonstrating the kind of leader who makes people want to contribute and grow. Your example helped shape the leader I am still working to become.",
    },
  ),
  profile(
    "FR-12",
    "kaung-myat-nick-naing",
    "Kaung Myat (Nick) Naing",
    "Computer science leader whose belief in my potential helped move me from uncertain participant to president of Illinois Tech's Machine Learning Club.",
    "from-blue-800 to-indigo-900",
    {
      sharedWorkSummary:
        "StarkHacks, Machine Learning Club leadership, IGDA initiatives, Data Spark, and current work toward stronger GPU infrastructure and technical opportunity at Illinois Tech.",
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
          body: "Since then, we participated in StarkHacks, I became ML Club president, and our work has grown closer. We are now advancing initiatives such as acquiring a GPU cluster for Illinois Tech and building a stronger environment for technical innovation.",
        },
      ],
      gratitude:
        "Thank you, Nick, for seeing leadership potential in me before I confidently saw it myself. Your encouragement helped me take a defining step, and I am grateful that we are now working together on initiatives that can transform Illinois Tech.",
    },
  ),
];

export const friendProfileBySlug = Object.fromEntries(
  friendProfiles.map((friend) => [friend.slug, friend]),
) as Record<string, FriendProfile>;
