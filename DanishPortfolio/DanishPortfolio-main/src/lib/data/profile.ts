import { supabase } from "@/integrations/supabase/client";
import { seedProfile, type SeedProfile } from "@/data/seedPortfolio";

export async function fetchProfile(): Promise<SeedProfile> {
  try {
    const { data, error } = await supabase.from("profiles").select("*").limit(1).maybeSingle();
    if (error) throw error;
    if (data) return data as unknown as SeedProfile;
  } catch {
    /* fall through */
  }
  return seedProfile;
}
