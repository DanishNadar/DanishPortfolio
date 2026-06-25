import { githubAdapter } from "./github";
import { huggingfaceAdapter } from "./huggingface";
import { llmAdapter } from "./llm";
import { contactAdapter } from "./contact";
import type { IntegrationAdapter } from "./types";

export const allIntegrations: IntegrationAdapter[] = [
  llmAdapter,
  huggingfaceAdapter,
  githubAdapter,
  contactAdapter,
];

export * from "./types";
