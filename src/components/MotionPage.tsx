import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function MotionPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      className={`motion-page ${className}`}
    >
      <div className="route-transition-hud" aria-hidden="true">
        <span className="route-transition-car" />
        <span className="route-transition-scan" />
      </div>
      {children}
    </motion.div>
  );
}
