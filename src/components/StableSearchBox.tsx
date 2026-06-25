import { memo, useEffect, useId, useMemo, useRef } from "react";

const SEARCH_SOURCE = "dn-iframe-search";

type StableSearchBoxProps = {
  value: string;
  onSearch: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  label: string;
  maxLength?: number;
  className?: string;
  focusSignal?: string | number;
};

type SearchMessage = {
  source?: string;
  channel?: string;
  action?: "search" | "clear" | "focus";
  value?: string;
};

function cleanSearchValue(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function createSearchFrameHtml({
  channel,
  value,
  placeholder,
  label,
  maxLength,
}: {
  channel: string;
  value: string;
  placeholder: string;
  label: string;
  maxLength: number;
}) {
  const payload = JSON.stringify({ channel, value, placeholder, label, maxLength, source: SEARCH_SOURCE });

  return String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 100%; min-height: 56px; overflow: hidden; background: transparent; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { padding: 0; }
    form { display: flex; align-items: center; gap: 0.5rem; width: 100%; }
    .input-wrap { position: relative; flex: 1 1 auto; min-width: 150px; }
    .icon { position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%); width: 1rem; height: 1rem; opacity: 0.7; pointer-events: none; }
    input { width: 100%; min-height: 46px; border-radius: 0.9rem; border: 1px solid rgba(148, 163, 184, 0.32); background: rgba(2, 6, 23, 0.38); color: #f8fafc; outline: none; padding: 0 0.9rem 0 2.45rem; font-size: 14px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.04); }
    input::placeholder { color: rgba(226, 232, 240, 0.55); }
    input:focus { border-color: rgba(56, 189, 248, 0.78); box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.14); }
    button { min-height: 46px; border-radius: 0.9rem; border: 1px solid rgba(148, 163, 184, 0.34); background: rgba(15, 23, 42, 0.76); color: #e2e8f0; padding: 0 0.9rem; font-size: 13px; font-weight: 750; cursor: pointer; white-space: nowrap; }
    button:hover { border-color: rgba(56, 189, 248, 0.82); color: #67e8f9; }
    .primary { border: 0; color: #020617; background: linear-gradient(135deg, #60a5fa, #c084fc); box-shadow: 0 10px 26px rgba(96, 165, 250, 0.18); }
    .primary:hover { color: #020617; filter: brightness(1.08); }
    .clear { display: none; }
    body.has-value .clear { display: inline-flex; align-items: center; }
    @media (max-width: 520px) {
      form { flex-wrap: wrap; }
      .input-wrap { flex-basis: 100%; }
      button { flex: 1 1 auto; }
    }
  </style>
</head>
<body>
  <form id="form" autocomplete="off">
    <div class="input-wrap">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
      <input id="q" type="search" inputmode="search" maxlength="120" aria-label="Search" />
    </div>
    <button class="primary" type="submit">Search</button>
    <button class="clear" id="clear" type="button">Clear</button>
  </form>
  <script>
    const cfg = ${payload};
    const form = document.getElementById('form');
    const input = document.getElementById('q');
    const clear = document.getElementById('clear');
    input.maxLength = cfg.maxLength;
    input.placeholder = cfg.placeholder;
    input.setAttribute('aria-label', cfg.label);
    input.value = cfg.value || '';
    if (input.value) document.body.classList.add('has-value');
    function clean(v) { return String(v || '').replace(/\s+/g, ' ').trim().slice(0, cfg.maxLength); }
    function post(action, value) {
      parent.postMessage({ source: cfg.source, channel: cfg.channel, action, value: clean(value) }, '*');
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      post('search', input.value);
      if (input.value.trim()) document.body.classList.add('has-value');
    });
    clear.addEventListener('click', () => {
      input.value = '';
      document.body.classList.remove('has-value');
      post('clear', '');
      input.focus();
    });
    window.addEventListener('message', (event) => {
      const data = event.data || {};
      if (data.source !== cfg.source || data.channel !== cfg.channel || data.action !== 'focus') return;
      input.focus();
      if (input.value) input.select();
    });
  </script>
</body>
</html>`;
}

export const StableSearchBox = memo(function StableSearchBox({
  value,
  onSearch,
  onClear,
  placeholder,
  label,
  maxLength = 120,
  className = "",
  focusSignal,
}: StableSearchBoxProps) {
  const rawId = useId();
  const channel = useMemo(() => `stable-search-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`, [rawId]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const frameHtml = useMemo(
    () => createSearchFrameHtml({ channel, value, placeholder, label, maxLength }),
    [channel, label, maxLength, placeholder, value],
  );


  useEffect(() => {
    if (focusSignal === undefined || focusSignal === null) return;
    const focusTimer = window.setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage({ source: SEARCH_SOURCE, channel, action: "focus" }, "*");
    }, 120);
    return () => window.clearTimeout(focusTimer);
  }, [channel, focusSignal]);

  useEffect(() => {
    const handler = (event: MessageEvent<SearchMessage>) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data;
      if (!data || data.source !== SEARCH_SOURCE || data.channel !== channel) return;
      if (data.action === "clear") {
        onClear();
        return;
      }
      if (data.action === "search") {
        const cleaned = cleanSearchValue(data.value ?? "", maxLength).toLowerCase();
        onSearch(cleaned);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [channel, maxLength, onClear, onSearch]);

  return (
    <div className={`stable-search-shell embedded-input-shell min-w-[240px] flex-1 ${className}`} role="search" aria-label={label}>
      <iframe
        ref={iframeRef}
        title={label}
        srcDoc={frameHtml}
        sandbox="allow-scripts allow-forms"
        className="stable-search-iframe"
      />
      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Search runs only when you press Enter or Search.
      </div>
    </div>
  );
});
