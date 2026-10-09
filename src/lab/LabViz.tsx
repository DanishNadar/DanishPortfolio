import type { CSSProperties, ReactNode } from "react";
import { useInView } from "./motion";

type Tag = "div" | "section" | "article" | "li";

/**
 * Container for any continuously animated visualization. CSS animations inside
 * run only while it is near the viewport (see `.lab-viz` in lab.css), so a page
 * full of diagrams costs nothing while you read something else.
 */
export function LabViz({
  children,
  className = "",
  style,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: Tag;
}) {
  const [ref, active] = useInView<HTMLDivElement>({ rootMargin: "80px 0px" });
  // All allowed tags are block elements that accept the same props as a div.
  const Comp = as as "div";
  return (
    <Comp ref={ref} className={`lab-viz ${className}`} data-active={active} style={style}>
      {children}
    </Comp>
  );
}

/** Fades and lifts its content in once, the first time it scrolls into view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
  id?: string;
}) {
  const [ref, seen] = useInView<HTMLDivElement>({ once: true, rootMargin: "0px 0px -8% 0px" });
  const Comp = as as "div";
  return (
    <Comp
      ref={ref}
      id={id}
      className={`lab-reveal ${className}`}
      data-revealed={seen}
      style={delay ? ({ "--lab-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({
  kicker,
  title,
  lede,
  accent = "var(--lab-red-hi)",
  id,
  align = "left",
  children,
}: {
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  accent?: string;
  id?: string;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="lab-kicker" style={{ "--lab-accent": accent } as CSSProperties}>
        {kicker}
      </div>
      <h2 id={id} className="lab-heading mt-4 text-3xl sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <span className={`lab-rule mt-5 ${centered ? "mx-auto" : ""}`} aria-hidden="true" />
      {lede && <p className="lab-body mt-5 text-base md:text-lg">{lede}</p>}
      {children}
    </Reveal>
  );
}
