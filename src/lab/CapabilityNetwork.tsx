import { Link } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { capabilities, labProjects, projectById } from "./data";
import { LabViz } from "./LabViz";

const C = 210;
const short: Record<string, string> = {
  taloncv: "TalonCV",
  morph: "Morph",
  observe: "OBSERV-E",
  ecocar: "EcoCAR",
  lanes: "Lanes",
  rl: "RL sim",
  confusion: "Confusion",
  aila: "AILA",
  campgrids: "CampGrids",
  compute: "Compute",
};

function at(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
}

/**
 * Capability network: disciplines around a core, projects on the outer ring.
 * Selecting a discipline lights the paths from it to the projects that prove it.
 * No proficiency ratings: the evidence is the rating.
 */
export function CapabilityNetwork() {
  const [active, setActive] = useState(capabilities[0].id);
  const cap = capabilities.find((c) => c.id === active)!;
  const evidence = new Set(cap.items.flatMap((i) => i.evidence));

  const discAngle = (i: number) => -90 + i * (360 / capabilities.length);
  const projAngle = (i: number) => -90 + 18 + i * (360 / labProjects.length);
  const di = capabilities.findIndex((c) => c.id === active);
  const [dx, dy] = at(92, discAngle(di));

  return (
    <div className="lab-surface lab-panel lab-panel-grid p-4 sm:p-6 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a discipline">
            {capabilities.map((c) => (
              <button
                key={c.id}
                type="button"
                className="lab-filter"
                aria-pressed={active === c.id}
                onClick={() => setActive(c.id)}
                style={{ "--lab-blue": c.color } as CSSProperties}
              >
                {c.title}
              </button>
            ))}
          </div>
          <LabViz className="lab-scale mx-auto mt-6 max-w-[28rem]">
            <svg viewBox="-72 -8 564 436" className="lab-motif" aria-hidden="true">
              {[92, 172].map((r) => (
                <circle
                  key={r}
                  cx={C}
                  cy={C}
                  r={r}
                  fill="none"
                  stroke="var(--lab-line)"
                  strokeDasharray="2 6"
                />
              ))}
              {/* core → disciplines */}
              {capabilities.map((c, i) => {
                const [x, y] = at(92, discAngle(i));
                const on = c.id === active;
                return (
                  <g key={c.id}>
                    <path
                      d={`M${C} ${C}L${x} ${y}`}
                      stroke={on ? c.color : "var(--lab-line)"}
                      strokeWidth={on ? 2 : 1}
                    />
                    {on && (
                      <path
                        d={`M${C} ${C}L${x} ${y}`}
                        stroke={c.color}
                        strokeWidth="4"
                        pathLength={100}
                        className="lab-packet"
                      />
                    )}
                  </g>
                );
              })}
              {/* discipline → evidence projects */}
              {labProjects.map((p, i) => {
                if (!evidence.has(p.id)) return null;
                const [px, py] = at(172, projAngle(i));
                const d = `M${dx} ${dy}Q${C} ${C} ${px} ${py}`;
                return (
                  <g key={`${active}-${p.id}`}>
                    <path
                      d={d}
                      fill="none"
                      stroke={cap.color}
                      strokeOpacity=".5"
                      strokeWidth="1.5"
                      pathLength={100}
                      className="lab-draw"
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke={cap.color}
                      strokeWidth="3.5"
                      pathLength={100}
                      className="lab-packet"
                      style={{ "--lab-delay": `${(i % 4) * 0.5}s` } as CSSProperties}
                    />
                  </g>
                );
              })}
              <circle
                cx={C}
                cy={C}
                r="26"
                fill="var(--lab-navy)"
                stroke="var(--lab-ice)"
                strokeWidth="1.6"
              />
              <text
                x={C}
                y={C + 5}
                textAnchor="middle"
                fontSize="15"
                fontWeight="800"
                fill="var(--lab-white)"
                style={{ fontFamily: "var(--lab-font-display)" }}
              >
                DN
              </text>
              {capabilities.map((c, i) => {
                const [x, y] = at(92, discAngle(i));
                const on = c.id === active;
                return (
                  <g key={c.id} onClick={() => setActive(c.id)} style={{ cursor: "pointer" }}>
                    <circle
                      cx={x}
                      cy={y}
                      r={on ? 14 : 10}
                      fill="var(--lab-navy)"
                      stroke={c.color}
                      strokeWidth={on ? 2.4 : 1.4}
                      opacity={on ? 1 : 0.7}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={on ? 5 : 3}
                      fill={c.color}
                      className={on ? "lab-pulse" : undefined}
                    />
                  </g>
                );
              })}
              {labProjects.map((p, i) => {
                const a = projAngle(i);
                const [x, y] = at(172, a);
                const on = evidence.has(p.id);
                const [lx, ly] = at(196, a);
                const anchor =
                  Math.abs(Math.cos((a * Math.PI) / 180)) < 0.3
                    ? "middle"
                    : Math.cos((a * Math.PI) / 180) > 0
                      ? "start"
                      : "end";
                return (
                  <g key={p.id} opacity={on ? 1 : 0.38}>
                    <circle
                      cx={x}
                      cy={y}
                      r={on ? 7 : 5}
                      fill={on ? cap.color : "var(--lab-navy)"}
                      stroke={on ? cap.color : "var(--lab-steel)"}
                      strokeWidth="1.4"
                    />
                    <text
                      x={lx}
                      y={ly + 4}
                      textAnchor={anchor}
                      fontSize="12"
                      fill={on ? "var(--lab-white)" : "var(--lab-steel)"}
                      fontWeight={on ? 700 : 500}
                    >
                      {short[p.id]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </LabViz>
        </div>

        <div aria-live="polite" style={{ "--lab-accent": cap.color } as CSSProperties}>
          <div className="lab-kicker">{cap.title}</div>
          <p className="lab-body mt-3 text-base">{cap.blurb}</p>
          <ul className="mt-5 grid gap-2.5">
            {cap.items.map((item) => (
              <li key={item.skill} className="lab-skill-row">
                <span className="lab-skill-name">{item.skill}</span>
                <span className="lab-skill-proof">
                  <span className="lab-sr-only">Proven in</span>
                  {item.evidence.map((id) => {
                    const p = projectById[id];
                    return p.caseSlug ? (
                      <Link
                        key={id}
                        to="/projects/$slug"
                        params={{ slug: p.caseSlug }}
                        className="lab-proof-chip"
                      >
                        {p.name}
                      </Link>
                    ) : (
                      <span key={id} className="lab-proof-chip">
                        {p.name}
                      </span>
                    );
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
