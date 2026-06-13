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
  gallery: string[];
  linkedinUrl?: string;
  sharedProjectSlugs: string[];
  stories: FriendStory[];
  testimonials: FriendTestimonial[];
};

const profile = (id: string, slug: string, name: string, overview: string): FriendProfile => ({
  id,
  slug,
  name,
  overview,
  image: `/portfolio_images/friends/${slug}.jpg`,
  gallery: [
    `/portfolio_images/friends/${slug}-work.jpg`,
    `/portfolio_images/friends/${slug}-moment.jpg`,
  ],
  sharedProjectSlugs: [],
  stories: [
    { title: "How our paths connected" },
    { title: "What we worked through together" },
    { title: "What the experience taught me" },
  ],
  testimonials: [],
});

export const friendProfiles: FriendProfile[] = [
  profile(
    "FR-01",
    "natorion-johnson",
    "Natorion Johnson",
    "Encouragement, honest conversation, and a steady presence through rebuilding.",
  ),
  profile(
    "FR-02",
    "fannie-yu",
    "Fannie Yu",
    "A friendship that made school, projects, and hard seasons feel more human.",
  ),
  profile(
    "FR-03",
    "elias-frey-reschley",
    "Elias Frey Reschley",
    "Shared learning, showing up, and growing stronger through community.",
  ),
  profile(
    "FR-04",
    "pranav-bonagiri",
    "Pranav Bonagiri",
    "Shared moments and conversations worth carrying forward.",
  ),
  profile(
    "FR-05",
    "muhammad-khan",
    "Muhammad Khan",
    "Support, memories, and a meaningful place in this community.",
  ),
  profile(
    "FR-06",
    "andy-tran",
    "Andy Tran",
    "Experiences that made friendship matter beyond the work.",
  ),
  profile(
    "FR-07",
    "henry-tran",
    "Henry Tran",
    "A place in the friendships and moments behind this portfolio.",
  ),
  profile("FR-08", "leen-alotaibi", "Leen Alotaibi", "Memories, encouragement, and community."),
  profile(
    "FR-09",
    "haley-brittman",
    "Haley Brittman",
    "Moments worth celebrating beyond any resume.",
  ),
  profile(
    "FR-10",
    "nishant-kabra",
    "Nishant Kabra",
    "Shared growth and experiences behind the work.",
  ),
  profile("FR-11", "lucas-ferguson", "Lucas Ferguson", "Friendship that helped shape the journey."),
  profile(
    "FR-12",
    "kaung-myat-nick-naing",
    "Kaung Myat (Nick) Naing",
    "Shared experiences and a meaningful place in this community.",
  ),
];

export const friendProfileBySlug = Object.fromEntries(
  friendProfiles.map((friend) => [friend.slug, friend]),
) as Record<string, FriendProfile>;
