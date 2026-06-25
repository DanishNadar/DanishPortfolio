declare const process: { env: Record<string, string | undefined> } | undefined;

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

function getEnv(name: string) {
  return typeof process !== "undefined" ? process.env[name] : undefined;
}

export default function handler(_req: unknown, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  const hasGroqKey = Boolean(getEnv("GROQ_API_KEY") || getEnv("DN_LLM_API_KEY"));
  res.status(200).json({
    ok: true,
    groqConfigured: hasGroqKey,
    model: getEnv("GROQ_MODEL") || getEnv("DN_LLM_MODEL") || "llama-3.3-70b-versatile",
    baseUrl: getEnv("GROQ_BASE_URL") || getEnv("DN_LLM_BASE_URL") || "https://api.groq.com/openai/v1",
    note: hasGroqKey ? "Groq key is visible to the serverless function." : "Groq key is missing from this deployment environment.",
  });
}
