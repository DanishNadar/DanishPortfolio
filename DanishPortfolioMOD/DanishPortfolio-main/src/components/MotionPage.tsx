import { motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { PageAtmosphere, type PageMood } from "@/components/PageAtmosphere";
import type { VisualTheme } from "@/lib/visualThemes";

export function MotionPage({
  children,
  className = "",
  mood = "default",
  tone,
}: {
  children: ReactNode;
  className?: string;
  mood?: PageMood;
  tone?: VisualTheme;
}) {
  const visualTone = tone ?? mood;
  const reduceMotion = useReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const candidates = Array.from(root.querySelectorAll<HTMLElement>("section, article")).filter(
      (element) => {
        if (element.closest(".image-lightbox")) return false;
        if (element.dataset.motionReveal === "off") return false;

        const parentSection = element.parentElement?.closest("section");
        const isTopLevelSection = element.tagName === "SECTION" && !parentSection;
        const isCard =
          element.tagName === "ARTICLE" &&
          (element.classList.contains("glass") ||
            element.classList.contains("premium-border") ||
            element.classList.contains("ambient-card"));

        return isTopLevelSection || isCard;
      },
    );

    candidates.forEach((element, index) => {
      if (element.style.transform || element.style.opacity) return;
      element.classList.add("site-reveal");
      element.style.setProperty("--site-reveal-delay", `${Math.min(index % 4, 3) * 55}ms`);
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      candidates.forEach((element) => element.classList.add("site-reveal-visible"));
      return;
    }

    root.classList.add("motion-orchestrated");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("site-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    candidates.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [children, reduceMotion]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.996, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 6, filter: "blur(3px)" }}
      transition={{ duration: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
      className={`motion-page page-mood-${mood} page-tone-${visualTone} ${className}`}
    >
      <PageAtmosphere mood={mood} />
      <div className="route-transition-hud" aria-hidden="true">
        <span className="route-transition-car" />
        <span className="route-transition-scan" />
      </div>
      <div ref={contentRef} className="page-atmosphere-content">
        {children}
      </div>
    </motion.div>
  );
}
