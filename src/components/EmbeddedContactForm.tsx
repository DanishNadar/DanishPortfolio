import { memo, useEffect, useId, useMemo, useRef } from "react";

const CONTACT_SOURCE = "dn-iframe-contact";

export type ContactFormPayload = {
  name: string;
  email: string;
  message: string;
};

type ContactMessage = {
  source?: string;
  channel?: string;
  action?: "submit";
  payload?: Partial<ContactFormPayload>;
};

function clean(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function createContactFrameHtml(channel: string) {
  const payload = JSON.stringify({ channel, source: CONTACT_SOURCE });

  return String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 100%; min-height: 310px; overflow: hidden; background: transparent; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    form { display: grid; gap: 0.8rem; width: 100%; }
    label { display: grid; gap: 0.35rem; color: rgba(226,232,240,0.72); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.14em; }
    input, textarea { width: 100%; border-radius: 1rem; border: 1px solid rgba(148, 163, 184, 0.34); background: rgba(2, 6, 23, 0.46); color: #f8fafc; outline: none; padding: 0.82rem 0.95rem; font-size: 14px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.04); }
    textarea { min-height: 130px; resize: vertical; line-height: 1.45; }
    input::placeholder, textarea::placeholder { color: rgba(226, 232, 240, 0.48); }
    input:focus, textarea:focus { border-color: rgba(56, 189, 248, 0.78); box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.14); }
    button { min-height: 48px; border-radius: 1rem; border: 0; background: linear-gradient(135deg, #60a5fa, #c084fc); color: #020617; font-size: 14px; font-weight: 850; padding: 0 1rem; cursor: pointer; box-shadow: 0 12px 28px rgba(96, 165, 250, 0.18); }
    button:hover { filter: brightness(1.08); }
    .row { display: grid; gap: 0.8rem; grid-template-columns: 1fr 1fr; }
    @media (max-width: 520px) { .row { grid-template-columns: 1fr; } html, body { min-height: 430px; } }
  </style>
</head>
<body>
  <form id="form" autocomplete="on">
    <div class="row">
      <label>Name<input id="name" name="name" maxlength="90" autocomplete="name" placeholder="Your name" /></label>
      <label>Email<input id="email" name="email" type="email" maxlength="140" autocomplete="email" placeholder="you@example.com" /></label>
    </div>
    <label>Message<textarea id="message" name="message" maxlength="1500" placeholder="Tell Danish what you want to build, ask, or collaborate on."></textarea></label>
    <button type="submit">Send message</button>
  </form>
  <script>
    const cfg = ${payload};
    const form = document.getElementById('form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    function clean(v, max) { return String(v || '').replace(/\s+/g, ' ').trim().slice(0, max); }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      parent.postMessage({
        source: cfg.source,
        channel: cfg.channel,
        action: 'submit',
        payload: {
          name: clean(name.value, 90),
          email: clean(email.value, 140),
          message: clean(message.value, 1500),
        }
      }, '*');
    });
  </script>
</body>
</html>`;
}

type EmbeddedContactFormProps = {
  onSubmit: (payload: ContactFormPayload) => void;
};

export const EmbeddedContactForm = memo(function EmbeddedContactForm({ onSubmit }: EmbeddedContactFormProps) {
  const rawId = useId();
  const channel = useMemo(() => `contact-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`, [rawId]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const frameHtml = useMemo(() => createContactFrameHtml(channel), [channel]);

  useEffect(() => {
    const handler = (event: MessageEvent<ContactMessage>) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data;
      if (!data || data.source !== CONTACT_SOURCE || data.channel !== channel || data.action !== "submit") return;
      const payload = data.payload ?? {};
      onSubmit({
        name: clean(payload.name ?? "", 90),
        email: clean(payload.email ?? "", 140),
        message: clean(payload.message ?? "", 1500),
      });
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [channel, onSubmit]);

  return (
    <iframe
      ref={iframeRef}
      title="Contact Danish"
      srcDoc={frameHtml}
      sandbox="allow-scripts allow-forms"
      className="embedded-contact-iframe"
    />
  );
});
