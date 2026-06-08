import { createLocalDNAnswer, type DNEngineAnswer } from "@/lib/dnLocalBrain";

const API_TIMEOUT_MS = 12000;

export type DNConversationTurn = {
  role: "user" | "avatar";
  text: string;
};

type DNApiPayload = {
  message: string;
  pageUrl?: string;
  history?: DNConversationTurn[];
};

function isDNAnswer(value: unknown): value is DNEngineAnswer {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return typeof record.reply === "string";
}

function cleanHistory(history: DNConversationTurn[] = []) {
  return history
    .filter((turn) => turn.role === "user" || turn.role === "avatar")
    .map((turn) => ({ role: turn.role, text: turn.text.replace(/\s+/g, " ").trim().slice(0, 420) }))
    .filter((turn) => turn.text)
    .slice(-8);
}

export async function askDNEngine(message: string, history: DNConversationTurn[] = []): Promise<DNEngineAnswer> {
  const cleanMessage = message.replace(/\s+/g, " ").trim();
  const cleanTurns = cleanHistory(history);
  if (!cleanMessage) return createLocalDNAnswer("What should I look at first?", cleanTurns);

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const payload: DNApiPayload = {
      message: cleanMessage,
      history: cleanTurns,
      pageUrl: `${window.location.pathname}${window.location.search}`,
    };

    const response = await fetch("/api/dn-engine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`DN engine API failed: ${response.status}`);
    const data = await response.json();
    if (isDNAnswer(data)) return { ...data, source: data.source ?? "llm" };
    if (isDNAnswer(data.answer)) return { ...data.answer, source: data.answer.source ?? "llm" };
    throw new Error("DN engine API returned an unexpected shape.");
  } catch {
    return createLocalDNAnswer(cleanMessage, cleanTurns);
  } finally {
    window.clearTimeout(timer);
  }
}
