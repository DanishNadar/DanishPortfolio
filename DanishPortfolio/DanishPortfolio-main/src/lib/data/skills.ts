import { supabase } from "@/integrations/supabase/client";
import { seedSkills, type SeedSkill } from "@/data/seedPortfolio";

export async function fetchSkills(): Promise<SeedSkill[]> {
  try {
    const { data, error } = await supabase.from("skills").select("*").order("sort_order");
    if (error) throw error;
    if (!data || data.length === 0) return seedSkills;
    return data as unknown as SeedSkill[];
  } catch {
    return seedSkills;
  }
}
