import { useEffect, useRef } from "react";

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

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        glow.style.setProperty("--pointer-x", `${x}px`);
        glow.style.setProperty("--pointer-y", `${y}px`);
        raf = 0;
      });
    };

    const show = () => glow.classList.add("pointer-glow-active");
    const hide = () => glow.classList.remove("pointer-glow-active");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerenter", show);
    window.addEventListener("pointerleave", hide);
    show();

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerenter", show);
      window.removeEventListener("pointerleave", hide);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={glowRef} className="pointer-glow" aria-hidden="true" />;
}
