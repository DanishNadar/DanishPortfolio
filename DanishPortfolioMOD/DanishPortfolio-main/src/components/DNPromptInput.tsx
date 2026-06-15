import { memo, useEffect, useId, useMemo, useRef } from "react";

const DN_INPUT_SOURCE = "dn-iframe-prompt";

type DNPromptInputProps = {
  onSend: (value: string) => void;
  maxLength?: number;
};

type PromptMessage = {
  source?: string;
  channel?: string;
  action?: "send";
  value?: string;
};

function cleanPrompt(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function createDNInputFrameHtml({ channel, maxLength }: { channel: string; maxLength: number }) {
  const payload = JSON.stringify({ channel, maxLength, source: DN_INPUT_SOURCE });

  return String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 100%; min-height: 78px; overflow: hidden; background: transparent; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    form { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: end; gap: 0.55rem; width: 100%; }
    textarea { width: 100%; height: 58px; resize: none; border-radius: 1rem; border: 1px solid rgba(148, 163, 184, 0.34); background: rgba(2, 6, 23, 0.46); color: #f8fafc; outline: none; padding: 0.78rem 0.9rem; font-size: 14px; line-height: 1.35; box-shadow: inset 0 1px 0 rgba(255,255,255,0.04); }
    textarea::placeholder { color: rgba(226, 232, 240, 0.55); }
    textarea:focus { border-color: rgba(56, 189, 248, 0.78); box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.14); }
    button { height: 58px; border-radius: 1rem; border: 0; background: linear-gradient(135deg, #60a5fa, #c084fc); color: #020617; font-size: 13px; font-weight: 850; padding: 0 1rem; cursor: pointer; box-shadow: 0 12px 28px rgba(96, 165, 250, 0.18); }
    button:hover { filter: brightness(1.08); }
    .hint { margin-top: 0.28rem; color: rgba(226,232,240,0.52); font-size: 10px; letter-spacing: 0.04em; }
    @media (max-width: 360px) {
      form { grid-template-columns: 1fr; }
      button { width: 100%; height: 44px; }
      html, body { min-height: 116px; }
    }
  </style>
</head>
<body>
  <form id="form" autocomplete="off">
    <div>
      <textarea id="prompt" maxlength="240" rows="2" placeholder="Ask anything…" aria-label="Ask the DN Response Engine"></textarea>
      <div class="hint">Enter to send</div>
    </div>
    <button type="submit">Send</button>
  </form>
  <script>
    const cfg = ${payload};
    const form = document.getElementById('form');
    const textarea = document.getElementById('prompt');
    textarea.maxLength = cfg.maxLength;
    function clean(v) { return String(v || '').replace(/\s+/g, ' ').trim().slice(0, cfg.maxLength); }
    function send() {
      const value = clean(textarea.value);
      if (!value) return;
      parent.postMessage({ source: cfg.source, channel: cfg.channel, action: 'send', value }, '*');
      textarea.value = '';
      textarea.focus();
    }
    form.addEventListener('submit', (event) => { event.preventDefault(); send(); });
    textarea.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        send();
      }
    });
  </script>
</body>
</html>`;
}

export const DNPromptInput = memo(function DNPromptInput({ onSend, maxLength = 240 }: DNPromptInputProps) {
  const rawId = useId();
  const channel = useMemo(() => `dn-prompt-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`, [rawId]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const frameHtml = useMemo(() => createDNInputFrameHtml({ channel, maxLength }), [channel, maxLength]);

  useEffect(() => {
    const handler = (event: MessageEvent<PromptMessage>) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data;
      if (!data || data.source !== DN_INPUT_SOURCE || data.channel !== channel || data.action !== "send") return;
      const cleanText = cleanPrompt(data.value ?? "", maxLength);
      if (cleanText) onSend(cleanText);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [channel, maxLength, onSend]);

  return (
    <div className="dn-embedded-input-shell" aria-describedby="dn-response-input-hint">
      <iframe
        ref={iframeRef}
        title="Ask the DN Response Engine"
        srcDoc={frameHtml}
        sandbox="allow-scripts allow-forms"
        className="dn-embedded-input-iframe"
      />
    </div>
  );
});
