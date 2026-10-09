import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Router link for internal paths that come from data (e.g. "/projects/morph").
 * Project and post paths go through their typed routes; other paths are plain
 * static routes, so the cast only widens the type for data-driven strings.
 */
export function InternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const project = href.match(/^\/projects\/([^/#?]+)$/);
  if (project) {
    return (
      <Link to="/projects/$slug" params={{ slug: project[1] }} className={className}>
        {children}
      </Link>
    );
  }
  const post = href.match(/^\/posts\/([^/#?]+)$/);
  if (post) {
    return (
      <Link to="/posts/$slug" params={{ slug: post[1] }} search={{ page: 1 }} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to={href as "/"} className={className}>
      {children}
    </Link>
  );
}

export function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <InternalLink href={href} className={className}>
        {children}
      </InternalLink>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}
