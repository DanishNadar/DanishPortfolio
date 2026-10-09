import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/** JS-side motion tokens. Keep in sync with the custom properties in lab.css. */
export const motion = {
  stagger: 70,
  heroPhase: 4200,
} as const;

// Mark the document so reveal styles only hide content once JS is running.
if (typeof document !== "undefined") {
  document.documentElement.classList.add("lab-js");
}

const reducedQuery = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReduced() {
  return typeof window !== "undefined" && !!window.matchMedia?.(reducedQuery).matches;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReduced, getReduced, () => false);
}

/**
 * Tracks whether an element is near the viewport. `once` latches true after the
 * first intersection (used for reveals); otherwise it follows visibility (used
 * to pause continuous animation offscreen).
 */
export function useInView<T extends Element>({
  once = false,
  rootMargin = "120px 0px",
  threshold = 0,
}: { once?: boolean; rootMargin?: string; threshold?: number } = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView] as const;
}

/** True while the tab is visible, so timers can stop in background tabs. */
export function usePageVisible() {
  return useSyncExternalStore(
    (cb) => {
      document.addEventListener("visibilitychange", cb);
      return () => document.removeEventListener("visibilitychange", cb);
    },
    () => document.visibilityState === "visible",
    () => true,
  );
}
