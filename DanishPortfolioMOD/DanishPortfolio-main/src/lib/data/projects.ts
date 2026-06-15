import { supabase } from "@/integrations/supabase/client";
import { seedProjects, type SeedProject } from "@/data/seedPortfolio";

function mergeProject(local: SeedProject | undefined, remote: Partial<SeedProject> | null | undefined): SeedProject {
  if (!local && remote) return remote as SeedProject;
  if (!local) return {} as SeedProject;
  if (!remote) return local;
  return {
    ...local,
    ...remote,
    tech_stack: remote.tech_stack?.length ? remote.tech_stack : local.tech_stack,
    outcomes: remote.outcomes?.length ? remote.outcomes : local.outcomes,
    detailCards: remote.detailCards?.length ? remote.detailCards : local.detailCards,
    proof: remote.proof && Object.keys(remote.proof).length ? remote.proof : local.proof,
    summary: remote.summary || local.summary,
    role: remote.role || local.role,
    domain: remote.domain || local.domain,
    period: remote.period || local.period,
    cover_image: remote.cover_image || local.cover_image,
    showcase: remote.showcase || local.showcase,
  };
}

function mergeProjects(remoteRows: SeedProject[] | null | undefined): SeedProject[] {
  const bySlug = new Map(seedProjects.map((p) => [p.slug, p]));
  for (const remote of remoteRows ?? []) {
    if (!remote?.slug) continue;
    bySlug.set(remote.slug, mergeProject(bySlug.get(remote.slug), remote));
  }
  return Array.from(bySlug.values()).sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

export async function fetchProjects(): Promise<SeedProject[]> {
  try {
    const { data, error } = await supabase.from("projects").select("*").order("priority", { ascending: false });
    if (error) throw error;
    return mergeProjects(data as unknown as SeedProject[]);
  } catch {
    return seedProjects;
  }
}

export async function fetchProjectBySlug(slug: string): Promise<SeedProject | null> {
  const local = seedProjects.find((p) => p.slug === slug);
  try {
    const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
    if (error) throw error;
    if (data || local) return mergeProject(local, data as unknown as Partial<SeedProject>);
  } catch {
    // local seed fallback below
  }
  return local ?? null;
}
