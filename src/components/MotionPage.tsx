import type { ReactNode } from "react";

export function MotionPage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`motion-page ${className}`}>{children}</div>;
}
