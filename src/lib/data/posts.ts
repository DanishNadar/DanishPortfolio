import { supabase } from "@/integrations/supabase/client";
import { seedPosts, type SeedPost } from "@/data/seedPortfolio";
import { postPages } from "@/content/postPages";

function mergePost(local: SeedPost | undefined, remote: Partial<SeedPost> | null | undefined): SeedPost {
  if (!local && remote) return remote as SeedPost;
  if (!local) return {} as SeedPost;
  if (!remote) return local;
  return {
    ...local,
    ...remote,
    tags: remote.tags?.length ? remote.tags : local.tags,
    skills_shown: remote.skills_shown?.length ? remote.skills_shown : local.skills_shown,
    related_project_slugs: remote.related_project_slugs?.length ? remote.related_project_slugs : local.related_project_slugs,
    related_stack: remote.related_stack?.length ? remote.related_stack : local.related_stack,
    body_markdown: remote.body_markdown || local.body_markdown,
    generated_summary: remote.generated_summary || local.generated_summary,
    why_this_matters: remote.why_this_matters || local.why_this_matters,
  };
}

function richPostToSeed(post: (typeof postPages)[number]): SeedPost {
  return {
    id: `rich-${post.slug}`,
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    post_type: post.postType,
    status: post.status,
    isSample: post.status !== "published",
    generated_summary: post.summary,
    body_markdown: post.body,
    tags: post.tags,
    related_project_slugs: post.relatedProjectSlugs,
    related_stack: post.relatedStack,
    published_at: post.writtenDate ?? "2026-05-29",
  };
}

function mergePosts(remoteRows: SeedPost[] | null | undefined): SeedPost[] {
  const bySlug = new Map(seedPosts.map((p) => [p.slug, p]));
  for (const rich of postPages) {
    bySlug.set(rich.slug, mergePost(bySlug.get(rich.slug), richPostToSeed(rich)));
  }
  for (const remote of remoteRows ?? []) {
    if (!remote?.slug) continue;
    bySlug.set(remote.slug, mergePost(bySlug.get(remote.slug), remote));
  }
  return Array.from(bySlug.values()).sort((a, b) => {
    const ad = a.published_at ? new Date(a.published_at).getTime() : 0;
    const bd = b.published_at ? new Date(b.published_at).getTime() : 0;
    return bd - ad;
  });
}

export async function fetchPosts(): Promise<SeedPost[]> {
  try {
    const { data, error } = await supabase.from("posts").select("*").order("published_at", { ascending: false, nullsFirst: false });
    if (error) throw error;
    return mergePosts(data as unknown as SeedPost[]);
  } catch {
    return mergePosts(null);
  }
}

export async function fetchPostBySlug(slug: string): Promise<SeedPost | null> {
  const rich = postPages.find((p) => p.slug === slug);
  const seed = seedPosts.find((p) => p.slug === slug);
  const local = rich ? mergePost(seed, richPostToSeed(rich)) : seed;
  try {
    const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).maybeSingle();
    if (error) throw error;
    if (data || local) return mergePost(local, data as unknown as Partial<SeedPost>);
  } catch {
    // local seed fallback below
  }
  return local ?? null;
}
