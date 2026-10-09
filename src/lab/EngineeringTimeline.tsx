import { useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { timeline, type TimelineKind } from "./data";
import { Reveal } from "./LabViz";
import { SmartLink } from "./InternalLink";

const kinds: { id: TimelineKind | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "work", label: "Engineering roles" },
  { id: "leadership", label: "Leadership" },
  { id: "education", label: "Education" },
  { id: "award", label: "Recognition" },
];

const kindColor: Record<TimelineKind, string> = {
  work: "var(--lab-blue)",
  leadership: "var(--lab-red-hi)",
  education: "var(--lab-ice)",
  award: "var(--lab-red-hi)",
};

const stateColor: Record<string, string> = {
  Current: "var(--lab-blue)",
  Completed: "var(--lab-steel)",
  "In progress": "var(--lab-red-soft)",
  Expected: "var(--lab-ice)",
  Awarded: "var(--lab-red-hi)",
};

export function EngineeringTimeline() {
  const [kind, setKind] = useState<TimelineKind | "all">("all");
  const items = kind === "all" ? timeline : timeline.filter((t) => t.kind === kind);
  let lastYear = "";

  return (
    <div className="lab-surface">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter the timeline">
        {kinds.map((k) => (
          <button
            key={k.id}
            type="button"
            className="lab-filter"
            aria-pressed={kind === k.id}
            onClick={() => setKind(k.id)}
          >
            {k.label}
          </button>
        ))}
      </div>

      <div className="lab-tl mt-10">
        <span className="lab-tl-rail" aria-hidden="true">
          <span className="lab-tl-progress" />
        </span>
        <ol className="grid gap-5">
          {items.map((t, i) => {
            const showYear = t.year !== lastYear;
            lastYear = t.year;
            return (
              <li
                key={t.id}
                className="lab-tl-item"
                style={{ "--lab-accent": kindColor[t.kind] } as CSSProperties}
              >
                {showYear && (
                  <div className="lab-tl-year lab-mono" aria-hidden="true">
                    {t.year}
                  </div>
                )}
                <Reveal delay={Math.min(i, 3) * 60} className="lab-tl-card lab-card">
                  <span className="lab-tl-dot" aria-hidden="true" />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="lab-mono text-[0.72rem] tracking-[0.06em] text-[var(--lab-steel)]">
                      {t.when}
                    </span>
                    <span
                      className="lab-chip"
                      style={{ "--lab-chip": stateColor[t.state] } as CSSProperties}
                    >
                      {t.state}
                    </span>
                  </div>
                  <h3
                    className="mt-2 text-lg font-bold leading-snug text-[var(--lab-white)]"
                    style={{ fontFamily: "var(--lab-font-display)" }}
                  >
                    {t.role}
                  </h3>
                  <div className="text-sm font-semibold text-[var(--lab-accent)]">{t.org}</div>
                  <p className="mt-2 text-sm leading-6 text-[var(--lab-steel)]">{t.body}</p>
                  {t.contributions && (
                    <ul className="lab-tl-list mt-3">
                      {t.contributions.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  )}
                  {t.links && (
                    <div className="lab-project-links mt-3">
                      {t.links.map((l) => (
                        <SmartLink key={l.href} href={l.href} className="lab-plink">
                          {l.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </SmartLink>
                      ))}
                    </div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
