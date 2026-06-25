import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const fadeOnly = className.includes("home-spaced-section");

  return (
    <motion.section
      initial={fadeOnly ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={fadeOnly ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: fadeOnly ? 0.55 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={fadeOnly ? { willChange: "opacity" } : undefined}
    >
      {children}
    </motion.section>
  );
}
