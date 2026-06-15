export interface PostPageContent {
  slug: string;
  title: string;
  subtitle: string;
  postType: string;
  status: "draft" | "published" | "sample";
  writtenDate?: string;
  summary: string;
  body: string;
  tags: string[];
  relatedProjectSlugs: string[];
  relatedStack: string[];
  suggestedImages: string[];
  sourceLinks?: { label: string; url: string }[];
  nextActions: string[];
}
