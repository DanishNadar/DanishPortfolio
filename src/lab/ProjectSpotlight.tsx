import { Link } from "@tanstack/react-router";
import { useId, useState, type CSSProperties } from "react";
import { ArrowRight, ChevronDown, ExternalLink, Github, Network, PlayCircle } from "lucide-react";
import {
  autonomyStages,
  autonomyWork,
  labProjects,
  moreBuilds,
  statuses,
  tracks,
  type LabProject,
  type Track,
} from "./data";
import { ProjectMotif } from "./motifs";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { LabViz, Reveal } from "./LabViz";

export function StatusChips({
  project,
  className = "",
}: {
  project: LabProject;
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Status">
      {project.status.map((s) => (
        <li
          key={s}
          className="lab-chip"
          style={{ "--lab-chip": statuses[s].color } as CSSProperties}
        >
          {statuses[s].label}
        </li>
      ))}
    </ul>
  );
}

export function ProjectLinks({
  project,
  showArchitecture = true,
}: {
  project: LabProject;
  showArchitecture?: boolean;
}) {
  return (
    <div className="lab-project-links">
      {project.caseSlug && (
        <Link
          to="/projects/$slug"
          params={{ slug: project.caseSlug }}
          className="lab-plink lab-plink-primary"
        >
          Case study <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}
      {showArchitecture && project.architecture && project.caseSlug && (
        <Link
          to="/projects/$slug"
          params={{ slug: project.caseSlug }}
          hash="architecture"
          className="lab-plink"
        >
          <Network className="h-3.5 w-3.5" aria-hidden="true" /> Architecture
        </Link>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noreferrer" className="lab-plink">
          <Github className="h-3.5 w-3.5" aria-hidden="true" /> Source
        </a>
      )}
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noreferrer" className="lab-plink">
          <PlayCircle className="h-3.5 w-3.5" aria-hidden="true" /> Live demo
        </a>
      )}
    </div>
  );
}

/** Large card for the three flagship systems, with an expandable architecture panel. */
export function FlagshipSystem({
  project,
  defaultOpen = false,
  index,
}: {
  project: LabProject;
  defaultOpen?: boolean;
  index: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const regionId = useId().replace(/:/g, "");
  return (
    <Reveal
      as="article"
      className="lab-flagship lab-panel lab-panel-grid"
      id={`system-${project.id}`}
    >
      <span
        className="lab-accent-bar"
        style={{ "--lab-accent": project.accent } as CSSProperties}
        aria-hidden="true"
      />
      <div
        className={`grid gap-6 p-5 sm:p-7 lg:grid-cols-2 lg:gap-10 lg:p-9 ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
      >
        <div className="lab-flagship-visual">
          <ProjectMotif kind={project.motif} label={project.motifCaption} />
          <p className="lab-mono mt-3 text-[0.7rem] leading-5 text-[var(--lab-dim)]">
            {project.motifCaption}
          </p>
        </div>
        <div className="min-w-0">
          <div className="lab-kicker" style={{ "--lab-accent": project.accent } as CSSProperties}>
            {project.kicker}
          </div>
          <h3 className="lab-heading mt-3 text-3xl md:text-4xl">{project.name}</h3>
          <p className="mt-3 text-lg leading-7 text-[var(--lab-ice)]">{project.tagline}</p>
          <StatusChips project={project} className="mt-4" />
          {project.story && (
            <dl className="lab-story mt-5">
              <div>
                <dt>Problem</dt>
                <dd>{project.story.problem}</dd>
              </div>
              <div>
                <dt>What I built</dt>
                <dd>{project.story.built}</dd>
              </div>
              <div>
                <dt>Engineering depth</dt>
                <dd>{project.story.depth}</dd>
              </div>
            </dl>
          )}
          <p className="lab-maturity mt-4">{project.maturity}</p>
          <ProjectLinks project={project} showArchitecture={false} />
        </div>
      </div>
      {project.architecture && (
        <div className="border-t border-[var(--lab-line)]">
          <button
            type="button"
            className="lab-expander"
            aria-expanded={open}
            aria-controls={regionId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="inline-flex items-center gap-2">
              <Network className="h-4 w-4 text-[var(--lab-blue)]" aria-hidden="true" />
              {open ? "Hide" : "Explore"} the {project.name} architecture
            </span>
            <ChevronDown className="lab-expander-icon h-4 w-4" aria-hidden="true" />
          </button>
          <div id={regionId} className="lab-collapse" data-open={open}>
            <div className="lab-collapse-inner">
              <div className="px-5 pb-6 sm:px-7 lg:px-9 lg:pb-9" inert={!open ? true : undefined}>
                <ArchitectureDiagram id={project.architecture} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Reveal>
  );
}

export function LabProjectCard({ project, delay = 0 }: { project: LabProject; delay?: number }) {
  return (
    <Reveal as="article" delay={delay} className="lab-card lab-project-card">
      <div
        style={{ "--lab-accent": project.accent } as CSSProperties}
        className="flex h-full flex-col"
      >
        <div className="lab-project-visual">
          <ProjectMotif kind={project.motif} label={project.motifCaption} />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="lab-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--lab-accent)]">
            {project.kicker}
          </div>
          <h3
            className="mt-2 text-xl font-bold tracking-tight text-[var(--lab-white)]"
            style={{ fontFamily: "var(--lab-font-display)" }}
          >
            {project.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--lab-steel)]">{project.tagline}</p>
          <StatusChips project={project} className="mt-3" />
          <p className="lab-maturity mt-3">{project.maturity}</p>
          <div className="mt-auto pt-4">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** Honest overview of the autonomy work: which loop stages each effort covers, and how mature it is. */
export function AutonomyStack() {
  return (
    <Reveal className="lab-panel lab-panel-grid p-5 sm:p-7">
      <div className="lab-kicker" style={{ "--lab-accent": "var(--lab-red-hi)" } as CSSProperties}>
        Autonomy stack coverage
      </div>
      <h3 className="lab-heading mt-3 text-2xl md:text-3xl">
        Where each autonomy effort sits in the loop
      </h3>
      <p className="lab-body mt-2 max-w-3xl text-sm md:text-base">
        No single project covers the whole stack. Together they do, and each one is labelled for
        what it is: team engineering, a hackathon prototype, a simulation, course research or
        competition preparation.
      </p>
      <LabViz className="lab-scale mt-6 hidden sm:block">
        <svg
          viewBox="0 0 1000 70"
          className="lab-motif"
          role="img"
          aria-label="Autonomy pipeline: observe, fuse, localize, plan, control."
        >
          <path d="M60 30H940" stroke="var(--lab-line)" strokeWidth="2" />
          <path
            d="M60 30H940"
            stroke="var(--lab-ice)"
            strokeWidth="4"
            pathLength={100}
            className="lab-packet"
            style={{ "--lab-packet-dur": "4s" } as CSSProperties}
          />
          {autonomyStages.map((s, i) => {
            const x = 60 + i * 220;
            return (
              <g key={s.id}>
                <circle
                  cx={x}
                  cy="30"
                  r="11"
                  fill="var(--lab-navy)"
                  stroke={i > 2 ? "var(--lab-red-hi)" : "var(--lab-blue)"}
                  strokeWidth="2"
                />
                <circle
                  cx={x}
                  cy="30"
                  r="4"
                  fill={i > 2 ? "var(--lab-red-hi)" : "var(--lab-blue)"}
                  className="lab-pulse"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
                <text
                  x={x}
                  y="62"
                  textAnchor="middle"
                  fontSize="15"
                  fill="var(--lab-white)"
                  fontWeight="600"
                  style={{ fontFamily: "var(--lab-font-display)" }}
                >
                  {s.label}
                </text>
              </g>
            );
          })}
        </svg>
      </LabViz>
      <div className="lab-matrix mt-4" role="table" aria-label="Autonomy work by stage">
        <div role="row" className="lab-matrix-row lab-matrix-head">
          <span role="columnheader">Work</span>
          {autonomyStages.map((s) => (
            <span key={s.id} role="columnheader" className="lab-matrix-stage">
              {s.label}
            </span>
          ))}
          <span role="columnheader">Maturity</span>
        </div>
        {autonomyWork.map((w) => (
          <div role="row" key={w.name} className="lab-matrix-row">
            <span role="rowheader" className="lab-matrix-name">
              {w.caseSlug ? (
                <Link
                  to="/projects/$slug"
                  params={{ slug: w.caseSlug }}
                  className="lab-link font-semibold"
                >
                  {w.name}
                </Link>
              ) : (
                <span className="font-semibold text-[var(--lab-white)]">{w.name}</span>
              )}
              <span className="block text-xs leading-5 text-[var(--lab-steel)]">{w.body}</span>
            </span>
            {autonomyStages.map((s) => {
              const on = w.stages.includes(s.id);
              return (
                <span key={s.id} role="cell" className="lab-matrix-cell" data-on={on}>
                  <span className="lab-sr-only">
                    {s.label}: {on ? "covered" : "not covered"}
                  </span>
                  <span className="lab-matrix-dot" aria-hidden="true" />
                  <span className="lab-matrix-mobile" aria-hidden="true">
                    {on ? s.label : ""}
                  </span>
                </span>
              );
            })}
            <span role="cell">
              <span
                className="lab-chip"
                style={
                  {
                    "--lab-chip":
                      w.maturity === "Competition prep" || w.maturity === "Simulation"
                        ? "var(--lab-red-soft)"
                        : "var(--lab-ice)",
                  } as CSSProperties
                }
              >
                {w.maturity}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export function ProjectGallery({
  includeFlagships = false,
  track: controlledTrack,
  onTrackChange,
}: {
  includeFlagships?: boolean;
  /** Pass with onTrackChange to drive the filter from the URL. */
  track?: Track | "all";
  onTrackChange?: (track: Track | "all") => void;
}) {
  const [localTrack, setLocalTrack] = useState<Track | "all">("all");
  const track = controlledTrack ?? localTrack;
  const setTrack = onTrackChange ?? setLocalTrack;
  const gallery = includeFlagships ? labProjects : labProjects.filter((p) => !p.flagship);
  const visible = track === "all" ? gallery : gallery.filter((p) => p.tracks.includes(track));
  return (
    <div className="lab-surface">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by discipline">
        {tracks.map((t) => (
          <button
            key={t.id}
            type="button"
            className="lab-filter"
            aria-pressed={track === t.id}
            onClick={() => setTrack(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="lab-sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((p, i) => (
          <LabProjectCard key={p.id} project={p} delay={Math.min(i, 5) * 70} />
        ))}
      </div>
      {(track === "all" || track === "autonomy") && (
        <div className="mt-10">
          <AutonomyStack />
        </div>
      )}
    </div>
  );
}

export function MoreBuilds() {
  return (
    <Reveal className="lab-surface">
      <div className="lab-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--lab-steel)]">
        More builds
      </div>
      <ul className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {moreBuilds.map((b) => (
          <li key={b.name} className="lab-card p-4">
            <div className="font-semibold text-[var(--lab-white)]">{b.name}</div>
            <p className="mt-1 text-sm leading-6 text-[var(--lab-steel)]">{b.body}</p>
            <div className="lab-project-links mt-3">
              {b.caseSlug && (
                <Link to="/projects/$slug" params={{ slug: b.caseSlug }} className="lab-plink">
                  Case study <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              )}
              {b.repo && (
                <a href={b.repo} target="_blank" rel="noreferrer" className="lab-plink">
                  <Github className="h-3.5 w-3.5" aria-hidden="true" /> Source
                </a>
              )}
              {b.demo && (
                <a href={b.demo} target="_blank" rel="noreferrer" className="lab-plink">
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> Live
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
