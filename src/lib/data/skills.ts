import { seedSkills, type SeedSkill } from "@/data/seedPortfolio";
import { readRemote } from "@/lib/data/remote";

export async function fetchSkills(): Promise<SeedSkill[]> {
  const data = await readRemote<SeedSkill[]>((sb) =>
    sb.from("skills").select("*").order("sort_order"),
  );
  return data && data.length > 0 ? data : seedSkills;
}
