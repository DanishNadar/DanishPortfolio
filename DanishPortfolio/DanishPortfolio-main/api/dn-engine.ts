import { compactDNContextForLLM, createLocalDNAnswer, type DNEngineAnswer } from "../src/lib/dnLocalBrain";

declare const process: { env: Record<string, string | undefined> } | undefined;

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

type ConversationTurn = {
  role: "user" | "avatar";
  text: string;
};

function parseBody(body: unknown) {
  if (typeof body !== "string") return body;
  try {
    return JSON.parse(body) as unknown;
  } catch {
    return { message: body };
  }
}

function readMessage(body: unknown) {
  const parsed = parseBody(body);
  if (!parsed || typeof parsed !== "object") return "";
  const value = (parsed as Record<string, unknown>).message;
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, 700) : "";
}

function readHistory(body: unknown): ConversationTurn[] {
  const parsed = parseBody(body);
  if (!parsed || typeof parsed !== "object") return [];
  const raw = (parsed as Record<string, unknown>).history;
  if (!Array.isArray(raw)) return [];

  return raw
    .map((turn) => {
      if (!turn || typeof turn !== "object") return null;
      const role = (turn as Record<string, unknown>).role;
      const text = (turn as Record<string, unknown>).text;
      if ((role !== "user" && role !== "avatar") || typeof text !== "string") return null;
      const clean = text.replace(/\s+/g, " ").trim().slice(0, 520);
      return clean ? { role, text: clean } : null;
    })
    .filter((turn): turn is ConversationTurn => Boolean(turn))
    .slice(-10);
}

function getEnv(name: string) {
  return typeof process !== "undefined" ? process.env[name] : undefined;
}

function getLlmConfig() {
  return {
    apiKey: getEnv("GROQ_API_KEY") || getEnv("DN_LLM_API_KEY"),
    baseUrl: (getEnv("GROQ_BASE_URL") || getEnv("DN_LLM_BASE_URL") || "https://api.groq.com/openai/v1").replace(/\/$/, ""),
    model: getEnv("GROQ_MODEL") || getEnv("DN_LLM_MODEL") || "llama-3.3-70b-versatile",
  };
}

function compactText(text: string, maxChars = 620) {
  return text.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, maxChars).trim();
}

function limitReply(text: string, maxChars = 620) {
  const cleaned = compactText(text, maxChars + 120);
  if (!cleaned) return "";
  if (/\n\s*[•\-]/.test(cleaned) || /^\s*[•\-]/.test(cleaned)) return compactText(cleaned, maxChars);
  const sentences = cleaned.replace(/\s+/g, " ").match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [cleaned];
  return compactText(sentences.slice(0, 3).join(" "), maxChars);
}

function safeJsonParse(value: string): Partial<DNEngineAnswer> | null {
  try {
    const parsed = JSON.parse(value) as Partial<DNEngineAnswer>;
    return typeof parsed.reply === "string" ? parsed : null;
  } catch {
    const match = value.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      const parsed = JSON.parse(match[0]) as Partial<DNEngineAnswer>;
      return typeof parsed.reply === "string" ? parsed : null;
    } catch {
      return null;
    }
  }
}

function normalizeRoute(value: unknown) {
  return typeof value === "string" && value.startsWith("/") ? value : undefined;
}

function normalizeLabel(value: unknown) {
  if (typeof value !== "string") return undefined;
  const clean = value.replace(/^open\s+/i, "").trim();
  return clean ? clean.slice(0, 80) : undefined;
}

function conversationSummary(history: ConversationTurn[]) {
  if (!history.length) return "No previous turns.";
  return history
    .slice(-8)
    .map((turn) => `${turn.role === "user" ? "Visitor" : "DN Engine"}: ${turn.text}`)
    .join("\n");
}

function cleanModelReply(text: string) {
  return text
    .replace(/^\s*(a strong match is|strong match:|best match:|matched project:)\s*/i, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function askGroq(message: string, history: ConversationTurn[] = []): Promise<DNEngineAnswer | null> {
  const { apiKey, baseUrl, model } = getLlmConfig();
  if (!apiKey) return null;

  const context = compactDNContextForLLM(message, history);
  const recentMessages = history
    .slice(-8)
    .map((turn) => ({
      role: turn.role === "user" ? "user" : "assistant",
      content: turn.text,
    }));

  const systemPrompt = [
    "You are the DN Response Engine, a normal helpful LLM embedded inside Danish Nadar's portfolio website.",
    "Behave like a regular assistant first: answer the user's actual question, handle typos and follow-ups, and do not force every message into a portfolio card.",
    "You have detailed context about Danish Nadar. Use it whenever the user asks about Danish, 'him', 'he', 'his', this portfolio, projects, skills, resume, achievements, robotics, autonomy, AI, security automation, contact info, or anything that reasonably relates to the site.",
    "Because this chat lives on Danish's portfolio, ambiguous pronouns like he/him/his usually refer to Danish unless the conversation clearly names someone else or the user is asking about you.",
    "If the user asks a general or casual question, answer briefly and naturally. When it is helpful, add one light sentence connecting back to Danish or saying you can also answer questions about Danish.",
    "If the user asks about a person or topic that is not in the Danish context, do not invent facts. Say you are not sure from this portfolio context, then ask if they meant Danish or give a useful general answer if the question is simple.",
    "Never answer like a semantic search result. Avoid phrases such as 'A strong match is', 'best match', or raw project-card summaries.",
    "Do not automatically recommend a route or project unless it directly helps the answer. Do not add a link label inside the text; the UI handles links separately.",
    "Keep responses concise: usually 1-4 short sentences. Use a short bullet list only when the user asks for a list or asks a broad question like what Danish has worked on.",
  ].join(" ");

  const routeInstruction = [
    "Return JSON only with this shape:",
    "{\"reply\": string, \"suggestedRoute\": string | undefined, \"suggestedLabel\": string | undefined, \"confidence\": \"high\" | \"medium\" | \"low\"}",
    "Only set suggestedRoute for direct portfolio-navigation answers, such as contact, resume, projects, autonomy, stack map, posts, gallery, or about. Otherwise leave route fields empty.",
  ].join(" ");

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: 430,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "system",
          content: [
            "DANISH PORTFOLIO CONTEXT:",
            JSON.stringify(context),
            "",
            routeInstruction,
          ].join("\n"),
        },
        ...recentMessages,
        { role: "user", content: message },
      ],
    }),
  });

  if (!response.ok) return null;
  const data = (await response.json()) as Record<string, unknown>;
  const choices = Array.isArray(data.choices) ? data.choices : [];
  const first = choices[0] as Record<string, unknown> | undefined;
  const msg = first?.message as Record<string, unknown> | undefined;
  const content = typeof msg?.content === "string" ? msg.content : "";
  const parsed = safeJsonParse(content);

  if (parsed?.reply) {
    const reply = limitReply(cleanModelReply(parsed.reply), 760);
    if (!reply) return null;
    return {
      reply,
      suggestedRoute: normalizeRoute(parsed.suggestedRoute),
      suggestedLabel: normalizeLabel(parsed.suggestedLabel),
      confidence: parsed.confidence ?? "high",
      source: "llm",
    };
  }

  const fallbackText = limitReply(cleanModelReply(content.replace(/```json|```/g, "")), 720);
  if (!fallbackText) return null;
  return { reply: fallbackText, confidence: "medium", source: "llm" };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.status(204).json({ ok: true });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Use POST." });
    return;
  }

  const message = readMessage(req.body);
  const history = readHistory(req.body);
  if (!message) {
    res.status(400).json({ error: "Missing message." });
    return;
  }

  try {
    const llmAnswer = await askGroq(message, history);
    if (llmAnswer) {
      res.status(200).json(llmAnswer);
      return;
    }
  } catch (error) {
    // The public portfolio should keep answering even if Groq is unavailable.
    // The local fallback is intentionally conversational, not a project-card search.
  }

  res.status(200).json(createLocalDNAnswer(message, history));
}
