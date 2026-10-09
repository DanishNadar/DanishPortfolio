import { useId, useState, type CSSProperties } from "react";
import { Github } from "lucide-react";
import { architectures, type ArchNode } from "./data";
import { LabViz } from "./LabViz";

const toneColor: Record<NonNullable<ArchNode["tone"]>, string> = {
  blue: "var(--lab-blue)",
  ice: "var(--lab-ice)",
  red: "var(--lab-red-hi)",
  steel: "var(--lab-steel)",
};

/**
 * Explorable system architecture. Columns are pipeline stages (left → right, or
 * top → bottom in narrow containers); each node is a button that explains its
 * role. Everything is readable with animation off.
 */
export function ArchitectureDiagram({ id, compact = false }: { id: string; compact?: boolean }) {
  const arch = architectures[id];
  const base = useId().replace(/:/g, "");
  const firstNode = arch?.columns[0]?.groups[0]?.nodes[0];
  const [selected, setSelected] = useState<string | undefined>(firstNode?.id);
  if (!arch) return null;

  const all = arch.columns.flatMap((c) =>
    c.groups.flatMap((g) => g.nodes.map((n) => ({ ...n, column: c.title }))),
  );
  const current = all.find((n) => n.id === selected) ?? all[0];
  const detailId = `${base}-detail`;

  return (
    <div className="lab-arch lab-surface">
      {!compact && (
        <div className="mb-5">
          <h3 className="lab-heading text-xl md:text-2xl">{arch.title}</h3>
          <p className="lab-body mt-2 max-w-3xl text-sm md:text-base">{arch.summary}</p>
        </div>
      )}
      <LabViz className="lab-arch-flow" style={{ "--cols": arch.columns.length } as CSSProperties}>
        {arch.columns.map((col, ci) => (
          <div key={col.title} className="lab-arch-step">
            {ci > 0 && <span className="lab-arch-link" aria-hidden="true" />}
            <div className="lab-arch-col">
              <div className="lab-arch-coltitle lab-mono">
                <span>{String(ci + 1).padStart(2, "0")}</span> {col.title}
              </div>
              {col.groups.map((g, gi) => (
                <div key={gi} className={g.label ? "lab-arch-group" : "lab-arch-stack"}>
                  {g.label && <div className="lab-arch-grouplabel lab-mono">{g.label}</div>}
                  {g.nodes.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      className="lab-arch-node"
                      data-optional={n.optional || undefined}
                      aria-pressed={current?.id === n.id}
                      aria-controls={detailId}
                      onClick={() => setSelected(n.id)}
                      style={{ "--lab-accent": toneColor[n.tone ?? "blue"] } as CSSProperties}
                    >
                      <span className="lab-arch-nodelabel">{n.label}</span>
                      {n.sub && <span className="lab-arch-nodesub lab-mono">{n.sub}</span>}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </LabViz>

      <div
        id={detailId}
        className="lab-arch-detail"
        aria-live="polite"
        style={{ "--lab-accent": toneColor[current?.tone ?? "blue"] } as CSSProperties}
      >
        {current && (
          <>
            <div className="lab-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--lab-accent)]">
              {current.column}
              {current.optional ? " · optional" : ""}
            </div>
            <div className="mt-1 text-base font-semibold text-[var(--lab-white)]">
              {current.label}
            </div>
            <p className="mt-1 text-sm leading-6 text-[var(--lab-steel)]">{current.detail}</p>
          </>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {arch.footnote && (
          <p className="lab-mono max-w-3xl text-[0.72rem] leading-5 text-[var(--lab-dim)]">
            {arch.footnote}
          </p>
        )}
        <a
          href={arch.source.href}
          target="_blank"
          rel="noreferrer"
          className="lab-link inline-flex items-center gap-2 text-sm"
        >
          <Github className="h-4 w-4" aria-hidden="true" /> {arch.source.label}
        </a>
      </div>
    </div>
  );
}
