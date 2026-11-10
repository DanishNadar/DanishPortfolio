import { queryOptions } from "@tanstack/react-query";
import { fetchProjects, fetchProjectBySlug, localProjects } from "@/lib/data/projects";

// Post data pulls in the generated post bodies (~300 KB of source), so it is
// loaded on demand instead of being part of the bundle every page downloads.
const postsData = () => import("@/lib/data/posts");
const skillsData = () => import("@/lib/data/skills");
const profileData = () => import("@/lib/data/profile");

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: fetchProjects,
  // Render instantly from bundled data; Supabase updates merge in afterwards.
  initialData: localProjects,
  initialDataUpdatedAt: 0,
});

export const projectBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["project", slug],
    queryFn: () => fetchProjectBySlug(slug),
  });

export const postsQuery = queryOptions({
  queryKey: ["posts"],
  queryFn: async () => (await postsData()).fetchPosts(),
});

export const postBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["post", slug],
    queryFn: async () => (await postsData()).fetchPostBySlug(slug),
  });

export const skillsQuery = queryOptions({
  queryKey: ["skills"],
  queryFn: async () => (await skillsData()).fetchSkills(),
});

export const profileQuery = queryOptions({
  queryKey: ["profile"],
  queryFn: async () => (await profileData()).fetchProfile(),
});
