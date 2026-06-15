export interface ProjectStackMapItem {
  name: string;
  category: string;
  usedFor: string;
  context?: string;
  linksTo?: string[];
}
export interface ProjectPageCard {
  title: string;
  body: string;
  accent?: string;
}
export interface ProjectPageLink {
  label: string;
  href: string;
  type?: "github" | "demo" | "article" | "external" | "internal";
}
export interface ProjectPageImage {
  src: string;
  alt: string;
  caption?: string;
}
export interface PeerReview {
  name: string;
  role: string;
  quote: string;
  context?: string;
}

export interface ProjectPageContent {
  slug: string;
  title: string;
  subtitle: string;
  heroStatement: string;
  pageTheme: { eyebrow: string; gradient: string; icon: string; };
  quickFacts: { label: string; value: string; }[];
  problem: string;
  motivation: string;
  myRole: string[];
  whatIBuilt: string[];
  architecture: ProjectPageCard[];
  stackMap: ProjectStackMapItem[];
  implementationDetails: ProjectPageCard[];
  challengeSolutions: ProjectPageCard[];
  outcomes: ProjectPageCard[];
  metrics: { label: string; value: string; note?: string; }[];
  gallery: ProjectPageImage[];
  relatedProjectSlugs: string[];
  relatedPostSlugs: string[];
  recruiterTakeaway: string;
  interviewTalkingPoints: string[];
  resumeBullets: string[];
  futureWork: string[];
  links: ProjectPageLink[];
  peerReviews?: PeerReview[];
}
