import { useEffect, useRef } from "react";

// The glow is a small fixed-size element with a static gradient that is moved
// with a compositor-only transform. Updating a gradient position via CSS
// variables on a full-viewport layer would repaint the whole screen per move.
export function PointerGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let visible = false;

    const apply = () => {
      raf = 0;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!visible) {
        visible = true;
        glow.classList.add("pointer-glow-active");
      }
    };

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = window.requestAnimationFrame(apply);
    };

    const hide = () => {
      visible = false;
      glow.classList.remove("pointer-glow-active");
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={glowRef} className="pointer-glow" aria-hidden="true" />;
}
