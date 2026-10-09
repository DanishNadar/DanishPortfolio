import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type CSSProperties } from "react";
import { ChevronRight } from "lucide-react";

/** Thin progress bar for long case studies. Writes a CSS variable; never re-renders. */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty(
        "--lab-progress",
        String(max > 0 ? Math.min(1, window.scrollY / max) : 0),
      );
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="lab-progress" aria-hidden="true" />;
}

export function Breadcrumbs({ discipline, title }: { discipline?: string; title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="lab-surface">
      <ol className="lab-crumbs">
        <li>
          <Link to="/" className="lab-link">
            Lab
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li>
          <Link to="/projects" className="lab-link">
            Projects
          </Link>
        </li>
        {discipline && (
          <>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li className="text-[var(--lab-steel)]">{discipline}</li>
          </>
        )}
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5" />
        </li>
        <li aria-current="page" className="text-[var(--lab-white)]">
          {title}
        </li>
      </ol>
    </nav>
  );
}

export function JumpLinks({ items }: { items: { href: string; label: string }[] }) {
  return (
    <div
      className="lab-project-links"
      style={{ "--lab-accent": "var(--lab-blue)" } as CSSProperties}
    >
      {items.map((i) => (
        <a key={i.href} href={i.href} className="lab-plink">
          {i.label}
        </a>
      ))}
    </div>
  );
}
