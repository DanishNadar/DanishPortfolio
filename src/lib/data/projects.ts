import { seedProjects, type SeedProject } from "@/data/seedPortfolio";
import { readRemote } from "@/lib/data/remote";

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

/** Bundled projects, available synchronously so pages can render immediately. */
export function localProjects(): SeedProject[] {
  return mergeProjects(null);
}

export async function fetchProjects(): Promise<SeedProject[]> {
  const data = await readRemote<SeedProject[]>((sb) =>
    sb.from("projects").select("*").order("priority", { ascending: false }),
  );
  return mergeProjects(data);
}

export async function fetchProjectBySlug(slug: string): Promise<SeedProject | null> {
  const local = seedProjects.find((p) => p.slug === slug);
  const data = await readRemote<Partial<SeedProject>>((sb) =>
    sb.from("projects").select("*").eq("slug", slug).maybeSingle(),
  );
  if (data || local) return mergeProject(local, data);
  return null;
}
