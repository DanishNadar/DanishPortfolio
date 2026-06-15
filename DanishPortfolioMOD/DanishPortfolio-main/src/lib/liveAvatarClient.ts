const DEFAULT_BRIDGE_URL = "http://127.0.0.1:7869";
const AVATAR_TIMEOUT_MS = 60000;

export type AvatarBridgeStatus = {
  ok: boolean;
  imageReady?: boolean;
  ditto?: {
    codeReady?: boolean;
    checkpointsReady?: boolean;
    trtReady?: boolean;
    cfgReady?: boolean;
  };
};

export type AvatarSpeakResult = {
  ok: boolean;
  status: "preview" | "rendered" | "error";
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  provider?: "live-avatar" | "qwen-tts" | string;
  message?: string;
  error?: string;
};

function bridgeBaseUrl() {
  return (import.meta.env.VITE_DN_AVATAR_BRIDGE_URL || DEFAULT_BRIDGE_URL).replace(/\/$/, "");
}

async function fetchWithTimeout<T>(url: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), AVATAR_TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    if (!response.ok) throw new Error(`Avatar bridge returned ${response.status}`);
    return (await response.json()) as T;
  } finally {
    window.clearTimeout(timer);
  }
}

export async function getAvatarBridgeStatus(): Promise<AvatarBridgeStatus | null> {
  try {
    return await fetchWithTimeout<AvatarBridgeStatus>(`${bridgeBaseUrl()}/health`);
  } catch {
    return null;
  }
}

export async function requestAvatarSpeech(text: string): Promise<AvatarSpeakResult | null> {
  const cleanText = text.replace(/\s+/g, " ").trim().slice(0, 800);
  if (!cleanText) return null;

  try {
    return await fetchWithTimeout<AvatarSpeakResult>(`${bridgeBaseUrl()}/speak`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: cleanText }),
    });
  } catch {
    return null;
  }
}
