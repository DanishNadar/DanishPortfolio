import { queryOptions } from "@tanstack/react-query";
import { fetchProjects, fetchProjectBySlug } from "@/lib/data/projects";
import { fetchPosts, fetchPostBySlug } from "@/lib/data/posts";
import { fetchProfile } from "@/lib/data/profile";
import { fetchSkills } from "@/lib/data/skills";

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: fetchProjects,
});

export const projectBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["project", slug],
    queryFn: () => fetchProjectBySlug(slug),
  });

export const postsQuery = queryOptions({
  queryKey: ["posts"],
  queryFn: fetchPosts,
});

export const postBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug),
  });

export const skillsQuery = queryOptions({
  queryKey: ["skills"],
  queryFn: fetchSkills,
});

export const profileQuery = queryOptions({
  queryKey: ["profile"],
  queryFn: fetchProfile,
});
