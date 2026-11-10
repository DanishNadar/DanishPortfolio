import { seedProfile, type SeedProfile } from "@/data/seedPortfolio";
import { readRemote } from "@/lib/data/remote";

export async function fetchProfile(): Promise<SeedProfile> {
  const data = await readRemote<SeedProfile>((sb) =>
    sb.from("profiles").select("*").limit(1).maybeSingle(),
  );
  return data ?? seedProfile;
}
