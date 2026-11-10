import { useEffect } from "react";

// Adds `is-scrolling` to <html> while the user scrolls. CSS uses it to pause
// decorative looping animations so every frame during a scroll goes to the
// scroll itself. Animations resume ~180ms after scrolling stops.
// No React state: the class is toggled directly, so nothing re-renders.
export function ScrollMotionGate() {
  useEffect(() => {
    const root = document.documentElement;
    let timer = 0;
    let active = false;

    const onScroll = () => {
      if (!active) {
        active = true;
        root.classList.add("is-scrolling");
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        active = false;
        root.classList.remove("is-scrolling");
      }, 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
      root.classList.remove("is-scrolling");
    };
  }, []);

  return null;
}
