import { makeAdapter } from "./types";

export const llmAdapter = makeAdapter({
  provider: "lovable-ai",
  displayName: "Lovable AI Gateway",
  purpose: "Powers avatar reasoning (Gemini / GPT models). Falls back to local rule-based brain.",
  requiredEnv: ["LOVABLE_API_KEY"],
});
