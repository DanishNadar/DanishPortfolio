export interface LinkedInPostReference {
  title: string;
  summary: string;
  url: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
}

export const linkedInPosts: LinkedInPostReference[] = [
  {
    title: "Intelligent Systems for Safer Roads",
    summary: "Public LinkedIn post connecting Danish's motivation to EcoCAR, autonomous systems, computer vision, sensor fusion, and real-time decision-making.",
    url: "https://www.linkedin.com/posts/danish-nadar_intelligent-systems-for-safer-roads-activity-7442364085289070593-_x72",
    tags: ["Autonomy", "EcoCAR", "Computer Vision"],
  },
  {
    title: "Leadership and community reflection",
    summary: "Public LinkedIn post about leadership, community, presenting with Reena Das, and conversations with KOCO's Bronzeville NIA program.",
    url: "https://www.linkedin.com/posts/danish-nadar_over-the-past-week-ive-had-the-opportunity-activity-7444389904282800128-L5Zd",
    tags: ["Leadership", "Community", "Mentorship"],
  },
  {
    title: "Leadership, career growth, and lifelong learning",
    summary: "Recent LinkedIn reflection connecting leadership development, career growth, and lifelong learning to the way Danish builds technical communities and professional momentum.",
    url: "https://www.linkedin.com/posts/danish-nadar_leadership-careergrowth-lifelonglearning-activity-7383894948519059456-d7gC",
    tags: ["Leadership", "Career Growth", "Learning"],
  },
  {
    title: "Data Catalyst at Illinois Tech",
    summary: "LinkedIn update around Data Catalyst, Chicago tech, and Illinois Tech, highlighting Danish's continued investment in data-driven technical growth and professional development.",
    url: "https://www.linkedin.com/posts/danish-nadar_datacatalyst-chicagotech-illinoistech-activity-7377354371709800448-v0aT",
    tags: ["Data Catalyst", "Illinois Tech", "Data Science"],
  },
  {
    title: "Built In networking event at The Ink Factory",
    summary: "Professional-development reflection on attending a Built In networking event at The Ink Factory and building stronger connections across Chicago's technology ecosystem.",
    url: "https://www.linkedin.com/in/danish-nadar/recent-activity/all/",
    tags: ["Networking", "Chicago Tech", "Professional Communication"],
    image: "/linkedin_images/networking-event-ink-factory.jpg",
    imageAlt: "Professional networking event visual from The Ink Factory",
  },
  {
    title: "Microsoft Learn AI Skills Fest badge",
    summary: "Portfolio update for the Microsoft Learn AI Skills Fest badge, connecting AI learning, applied skill-building, and continued professional development.",
    url: "https://www.linkedin.com/in/danish-nadar/recent-activity/all/",
    tags: ["Microsoft Learn", "AI Skills", "Certification"],
  },
  {
    title: "EcoCAR Team Member Tuesday",
    summary: "Illinois Tech EcoCAR public post highlighting Danish as an AI student interested in autonomous vehicle technology.",
    url: "https://www.linkedin.com/posts/illinois-tech-ecocar_teammembertuesday-ecocar-illinoistechecocar-activity-7312722135787913216-1kqa",
    tags: ["EcoCAR", "Autonomy", "Vehicle Systems"],
  },
];
