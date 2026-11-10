// Adaptive effects budget.
// If the browser cannot keep up (software rendering, battery saver, weak GPU,
// very large display), the site switches to `html.perf-lite`: the same layout
// and imagery, with the continuous background and diagram loops turned off.
// An automatic downgrade lasts for the browser session. Override with
// `?fx=full` or `?fx=lite` (remembered across visits), or `?fx=auto` to reset.

const STORAGE_KEY = "dn-fx";
const LITE_CLASS = "perf-lite";

type FxMode = "full" | "lite" | "auto";
type StoredMode = FxMode | "auto-lite";

// Explicit choices (?fx=...) persist in localStorage. Automatic downgrades are
// kept for the session only, so a one-off slow moment is not permanent.
function readStored(): StoredMode | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);
    return value === "full" || value === "lite" || value === "auto" || value === "auto-lite"
      ? value
      : null;
  } catch {
    return null;
  }
}

function store(value: StoredMode) {
  try {
    if (value === "auto-lite") {
      sessionStorage.setItem(STORAGE_KEY, value);
    } else {
      localStorage.setItem(STORAGE_KEY, value);
      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    /* private mode: keep the in-memory decision only */
  }
}

function usesSoftwareRendering(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return true;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}

/** Median frame interval over `frames` frames, in ms. */
function sampleFrames(frames: number): Promise<number> {
  return new Promise((resolve) => {
    const times: number[] = [];
    const tick = (now: number) => {
      times.push(now);
      if (times.length <= frames) {
        requestAnimationFrame(tick);
        return;
      }
      const deltas = times.slice(1).map((t, i) => t - times[i]);
      deltas.sort((a, b) => a - b);
      resolve(deltas[Math.floor(deltas.length / 2)]);
    };
    requestAnimationFrame(tick);
  });
}

export function initPerfMode() {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  const param = new URLSearchParams(window.location.search).get("fx");
  if (param === "full" || param === "lite" || param === "auto") store(param);

  const stored = readStored();
  const setLite = (lite: boolean) => root.classList.toggle(LITE_CLASS, lite);

  if (param === "full" || (!param && stored === "full")) return setLite(false);
  if (param === "lite" || (!param && stored === "lite")) return setLite(true);
  // A previous automatic downgrade is kept; the index.html script already applied it.
  if (!param && stored === "auto-lite") return setLite(true);

  if (usesSoftwareRendering()) {
    store("auto-lite");
    return setLite(true);
  }

  // Check real frame pacing once the page has settled and the tab is visible.
  const check = async () => {
    if (document.visibilityState !== "visible") return;
    const median = await sampleFrames(90);
    // 60 Hz is ~16.7 ms per frame. A median above ~24 ms means we are
    // consistently missing frames (below ~42 fps).
    if (median > 24) {
      store("auto-lite");
      setLite(true);
    }
  };
  window.setTimeout(() => void check(), 2500);
}
