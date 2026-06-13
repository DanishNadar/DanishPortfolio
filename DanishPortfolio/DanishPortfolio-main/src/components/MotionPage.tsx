import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { PageAtmosphere, type PageMood } from "@/components/PageAtmosphere";

export function MotionPage({
  children,
  className = "",
  mood = "default",
}: {
  children: ReactNode;
  className?: string;
  mood?: PageMood;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      className={`motion-page page-mood-${mood} ${className}`}
    >
      <PageAtmosphere mood={mood} />
      <div className="route-transition-hud" aria-hidden="true">
        <span className="route-transition-car" />
        <span className="route-transition-scan" />
      </div>
      <div className="page-atmosphere-content">{children}</div>
    </motion.div>
  );
}
