import { motion } from "framer-motion";
import type { ReactNode } from "react";

const defaultVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function AnimateIn({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-56px" }}
      transition={{ duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={defaultVariants}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function StaggerIn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-56px" }}
      variants={staggerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChild({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={childVariants}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
