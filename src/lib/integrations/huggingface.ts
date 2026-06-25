import { makeAdapter } from "./types";

export const huggingfaceAdapter = makeAdapter({
  provider: "huggingface",
  displayName: "Hugging Face (XTTS-v2)",
  purpose: "Voice-cloned TTS for the AI avatar. Browser speech is the fallback.",
  requiredEnv: ["HUGGINGFACE_TOKEN"],
});
