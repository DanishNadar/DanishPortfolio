import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Minimize2, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { DNPromptInput } from "@/components/DNPromptInput";
import { askDNEngine, type DNConversationTurn } from "@/lib/dnEngineClient";
import {
  getAvatarBridgeStatus,
  requestAvatarSpeech,
  type AvatarBridgeStatus,
} from "@/lib/liveAvatarClient";

interface Msg {
  role: "user" | "avatar";
  text: string;
  suggestedRoute?: string;
  suggestedLabel?: string;
}

const FloatingDNLogo = memo(function FloatingDNLogo({ speaking = false }: { speaking?: boolean }) {
  return (
    <div className={`dn-ai-orb ${speaking ? "dn-ai-orb-speaking" : ""}`} aria-hidden="true">
      <div className="dn-ai-orb-ring dn-ai-orb-ring-a" />
      <div className="dn-ai-orb-ring dn-ai-orb-ring-b" />
      <div className="dn-ai-orb-core">
        <img
          src="/brand/dn-logo.png"
          alt=""
          className="h-full w-full object-contain dn-response-logo-img"
          draggable={false}
          loading="eager"
        />
      </div>
    </div>
  );
});

const QUICK_PROMPTS: string[] = [];
const MAX_INPUT_CHARS = 240;
const MAX_VISIBLE_MESSAGES = 6;
const INITIAL_MESSAGES: Msg[] = [
  {
    role: "avatar",
    text: "Ask me anything  -  I'll be most useful when the question connects to Danish, his work, or this portfolio.",
  },
];

type AvatarMedia = {
  kind: "image" | "video";
  src: string;
  status: "offline" | "preview" | "rendered";
};

function AvatarMediaView({ media, className = "" }: { media: AvatarMedia; className?: string }) {
  if (media.kind === "video") {
    return (
      <video
        key={media.src}
        src={media.src}
        className={className}
        autoPlay
        muted
        playsInline
        loop
      />
    );
  }

  return (
    <img
      src={media.src}
      alt="Danish avatar"
      className={className}
      loading="eager"
      draggable={false}
    />
  );
}

function ScreenAvatarStage({
  media,
  open,
  speaking,
}: {
  media: AvatarMedia;
  open: boolean;
  speaking: boolean;
}) {
  return (
    <div
      className={`dn-screen-avatar ${open ? "dn-screen-avatar-open" : "dn-screen-avatar-closed"} ${speaking ? "dn-screen-avatar-speaking" : ""}`}
      data-status={media.status}
      aria-hidden="true"
    >
      <div className="dn-screen-avatar-shadow" />
      <AvatarMediaView media={media} className="dn-screen-avatar-media" />
      {media.kind === "image" && (
        <div className="dn-screen-avatar-face-rig">
          <span className="dn-screen-avatar-mouth dn-screen-avatar-mouth-a" />
          <span className="dn-screen-avatar-mouth dn-screen-avatar-mouth-b" />
        </div>
      )}
    </div>
  );
}

export function FloatingAvatar() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [hasUnreadResponse, setHasUnreadResponse] = useState(false);
  const [avatarStatus, setAvatarStatus] = useState<AvatarBridgeStatus | null>(null);
  const [avatarMedia, setAvatarMedia] = useState<AvatarMedia>({
    kind: "image",
    src: "/avatar/danish.jpg",
    status: "offline",
  });
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL_MESSAGES);
  const msgsRef = useRef<Msg[]>(INITIAL_MESSAGES);
  const scrollRef = useRef<HTMLDivElement>(null);
  const speakingTimeoutRef = useRef<number | null>(null);
  const requestIdRef = useRef(0);

  // Add/remove dn-engine-open on <html> when the panel opens or closes.
  // No separate dn-input-active toggle  -  that extra DOM mutation on focus
  // was causing Chrome to freeze on the typing bar click.
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (open && !minimized) {
      root.classList.add("dn-engine-open");
      body.classList.add("dn-engine-open");
    } else {
      root.classList.remove("dn-engine-open");
      body.classList.remove("dn-engine-open");
    }
    return () => {
      root.classList.remove("dn-engine-open");
      body.classList.remove("dn-engine-open");
    };
  }, [open, minimized]);

  useEffect(() => {
    msgsRef.current = msgs;
    if (!open || !scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, open]);

  useEffect(() => {
    if (open && !minimized) setHasUnreadResponse(false);
  }, [open, minimized]);

  useEffect(() => {
    return () => {
      if (speakingTimeoutRef.current) window.clearTimeout(speakingTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!open || minimized) return;

    getAvatarBridgeStatus().then((status) => {
      if (cancelled) return;
      setAvatarStatus(status);
      setAvatarMedia((current) => ({
        ...current,
        status: status?.ok ? "preview" : "offline",
      }));
    });

    return () => {
      cancelled = true;
    };
  }, [open, minimized]);

  const stopSpeakingSoon = useCallback((delay = 700) => {
    if (speakingTimeoutRef.current) window.clearTimeout(speakingTimeoutRef.current);
    speakingTimeoutRef.current = window.setTimeout(() => setSpeaking(false), delay);
  }, []);

  const showReplyActivity = useCallback(
    (text: string) => {
      setSpeaking(true);
      stopSpeakingSoon(Math.min(2600, Math.max(1200, text.length * 14)));
    },
    [stopSpeakingSoon],
  );

  const send = useCallback(
    async (text: string) => {
      const cleanText = text.trim().slice(0, MAX_INPUT_CHARS);
      if (!cleanText) return;

      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      const historyForApi: DNConversationTurn[] = msgsRef.current
        .slice(-10)
        .map((message) => ({ role: message.role, text: message.text }));

      setMsgs((current) => {
        const next = [...current, { role: "user", text: cleanText } satisfies Msg].slice(
          -MAX_VISIBLE_MESSAGES,
        );
        msgsRef.current = next;
        return next;
      });
      setSpeaking(true);

      try {
        const answer = await askDNEngine(cleanText, historyForApi);
        if (requestIdRef.current !== requestId) return;
        const reply = answer.reply.trim();
        setMsgs((current) => {
          const next = [
            ...current,
            {
              role: "avatar",
              text: reply,
              suggestedRoute: answer.suggestedRoute,
              suggestedLabel: answer.suggestedLabel,
            } satisfies Msg,
          ].slice(-MAX_VISIBLE_MESSAGES);
          msgsRef.current = next;
          return next;
        });
        if (!document.documentElement.classList.contains("dn-engine-open")) {
          setHasUnreadResponse(true);
        }
        showReplyActivity(reply);

        requestAvatarSpeech(reply).then((result) => {
          if (requestIdRef.current !== requestId) return;
          if (!result?.ok) return;
          if (result.videoUrl) {
            setAvatarMedia({
              kind: "video",
              src: `${result.videoUrl}?t=${Date.now()}`,
              status: "rendered",
            });
          }
          if (result.imageUrl) {
            setAvatarMedia({ kind: "image", src: result.imageUrl, status: "preview" });
          }
        });
      } catch {
        if (requestIdRef.current !== requestId) return;
        const reply =
          "I could not reach the DN engine right now, but the portfolio still has the main paths: Projects, Autonomy, Stack Map, Posts, About, and Contact.";
        setMsgs((current) => {
          const next = [
            ...current,
            {
              role: "avatar",
              text: reply,
              suggestedRoute: "/projects",
              suggestedLabel: "Explore projects",
            } satisfies Msg,
          ].slice(-MAX_VISIBLE_MESSAGES);
          msgsRef.current = next;
          return next;
        });
        stopSpeakingSoon(1200);
      }
    },
    [showReplyActivity, stopSpeakingSoon],
  );

  const closePanel = useCallback(() => {
    setOpen(false);
    setSpeaking(false);
    if (speakingTimeoutRef.current) window.clearTimeout(speakingTimeoutRef.current);
  }, []);

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => {
          setMinimized(false);
          setOpen(true);
          setHasUnreadResponse(false);
        }}
        className="dn-response-trigger"
        aria-label="Open Danish AI guide"
      >
        <FloatingDNLogo speaking={speaking} />
        {hasUnreadResponse && (
          <span
            className="absolute right-2 top-2 h-3.5 w-3.5 rounded-full bg-secondary ring-2 ring-background"
            aria-label="Unread DN Engine response"
          />
        )}
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!open) setHasUnreadResponse(false);
          setOpen(!open);
        }}
        className="dn-response-trigger group"
        aria-label={open ? "Close Danish AI guide" : "Talk to Danish's AI guide"}
        aria-expanded={open}
      >
        <FloatingDNLogo speaking={speaking} />
        {hasUnreadResponse && (
          <span
            className="absolute right-2 top-2 h-3.5 w-3.5 rounded-full bg-secondary ring-2 ring-background"
            aria-label="Unread DN Engine response"
          />
        )}
        <span className="dn-response-hover-label pointer-events-none absolute whitespace-nowrap px-3 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition">
          Ask the DN response engine
        </span>
      </button>

      {open && <ScreenAvatarStage media={avatarMedia} open speaking={speaking} />}

      {open && (
        <aside
          className="dn-response-panel dn-response-panel-open rounded-2xl shadow-elevated overflow-hidden"
          role="dialog"
          aria-label="DN Response Engine"
          aria-modal="false"
        >
          {/* Header */}
          <div className="dn-response-header flex items-center justify-between p-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div
                className={`dn-live-avatar ${speaking ? "dn-live-avatar-speaking" : ""}`}
                data-status={avatarMedia.status}
              >
                <AvatarMediaView media={avatarMedia} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-semibold">DN Response Engine</div>
                <div className="text-[11px] text-muted-foreground">
                  {speaking ? "thinking" : avatarStatus?.ok ? "avatar bridge ready" : "ready"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMinimized(true)}
                className="p-2 text-muted-foreground hover:text-foreground"
                aria-label="Minimize"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={closePanel}
                className="p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="dn-response-messages overflow-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`dn-response-bubble max-w-[86%] px-4 py-3 rounded-2xl text-[0.95rem] leading-relaxed ${m.role === "user" ? "dn-response-bubble-user" : "dn-response-bubble-avatar"}`}
                >
                  {m.text}
                  {m.suggestedRoute && (
                    <Link
                      to={m.suggestedRoute}
                      onClick={closePanel}
                      className="mt-2 block text-xs font-semibold text-accent hover:underline"
                    >
                      → {m.suggestedLabel ?? "Open page"}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer: quick chips + input */}
          <div className="dn-response-footer p-3 border-t border-border">
            {QUICK_PROMPTS.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full border border-border text-accent hover:bg-muted/30"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Embedded, isolated text input. The typed text is sent to the LLM-backed DN Engine only on submit. */}
            <DNPromptInput onSend={send} maxLength={MAX_INPUT_CHARS} />
          </div>

          <div
            id="dn-response-input-hint"
            className="dn-response-caption px-3 pb-3 text-[10px] text-muted-foreground"
          >
            Groq-powered when configured. Best for questions about Danish, but you can ask normally.
          </div>
        </aside>
      )}
    </>
  );
}
