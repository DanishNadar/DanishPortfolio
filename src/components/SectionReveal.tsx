import type { ReactNode } from "react";

export function SectionReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={className}>{children}</section>;
}
