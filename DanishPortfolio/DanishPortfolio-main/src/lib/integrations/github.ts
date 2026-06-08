import { makeAdapter } from "./types";

export const githubAdapter = makeAdapter({
  provider: "github",
  displayName: "GitHub",
  purpose: "Sync public repos, stars, and READMEs for the code library page.",
  requiredEnv: ["GITHUB_TOKEN"],
});
