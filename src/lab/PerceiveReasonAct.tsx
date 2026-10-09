import { Link } from "@tanstack/react-router";
import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactElement,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { projectById, stages, type StageId } from "./data";
import { LabViz, SectionHeading } from "./LabViz";

const d = (delay: number) => ({ "--lab-delay": `${delay}s` }) as CSSProperties;
const label = { fontSize: 10, letterSpacing: 1.4, fill: "var(--lab-dim)" } as const;

/* Corner-bracket detection box drawn in with a stroke animation. */
function Box({
  x,
  y,
  w,
  h,
  color,
  tag,
  delay,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  tag: string;
  delay: number;
}) {
  const c = Math.min(10, w / 3, h / 3);
  const p =
    `M${x} ${y + c}V${y}H${x + c}M${x + w - c} ${y}H${x + w}V${y + c}` +
    `M${x + w} ${y + h - c}V${y + h}H${x + w - c}M${x + c} ${y + h}H${x}V${y + h - c}`;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={color}
        fillOpacity=".08"
        className="lab-enter-fade"
        style={d(delay)}
      />
      <path
        d={p}
        fill="none"
        stroke={color}
        strokeWidth="2"
        pathLength={100}
        className="lab-draw"
        style={d(delay)}
      />
      <g className="lab-enter" style={d(delay + 0.25)}>
        <rect x={x} y={y - 16} width={tag.length * 6.6 + 10} height="14" rx="3" fill={color} />
        <text
          x={x + 5}
          y={y - 6}
          fontSize="9"
          fill="var(--lab-navy)"
          fontWeight="700"
          letterSpacing=".6"
        >
          {tag}
        </text>
      </g>
    </g>
  );
}

function PerceiveViz() {
  return (
    <>
      {/* camera frame */}
      <rect
        x="20"
        y="28"
        width="400"
        height="250"
        rx="10"
        fill="#071226"
        stroke="var(--lab-line)"
      />
      <text x="32" y="48" {...label}>
        CAM_FRONT
      </text>
      <circle cx="404" cy="44" r="3.5" fill="var(--lab-red-hi)" className="lab-blink" />
      {/* semantic segmentation: road, sidewalks */}
      <path
        d="M200 120L28 270H412L240 120Z"
        fill="var(--lab-blue)"
        fillOpacity=".16"
        className="lab-enter-fade"
        style={d(0.1)}
      />
      <path
        d="M200 120L28 270H20V190Z"
        fill="var(--lab-ice)"
        fillOpacity=".08"
        className="lab-enter-fade"
        style={d(0.2)}
      />
      <path
        d="M240 120L412 270H420V190Z"
        fill="var(--lab-ice)"
        fillOpacity=".08"
        className="lab-enter-fade"
        style={d(0.2)}
      />
      <path
        d="M200 120L60 270M240 120L380 270"
        stroke="var(--lab-blue)"
        strokeWidth="2"
        pathLength={100}
        className="lab-draw"
        style={d(0.15)}
      />
      <path
        d="M220 124V270"
        stroke="var(--lab-steel)"
        strokeOpacity=".6"
        strokeWidth="2"
        strokeDasharray="10 10"
        className="lab-lane"
      />
      <path d="M20 120H420" stroke="var(--lab-line)" />
      {/* skyline silhouettes */}
      <g fill="#10233F">
        <rect x="40" y="70" width="26" height="50" />
        <rect x="70" y="52" width="20" height="68" />
        <rect x="320" y="60" width="30" height="60" />
        <rect x="356" y="80" width="22" height="40" />
      </g>
      {/* scene objects */}
      <rect x="196" y="150" width="50" height="34" rx="6" fill="#5E7595" />
      <rect x="200" y="170" width="10" height="4" rx="2" fill="var(--lab-red-hi)" />
      <rect x="232" y="170" width="10" height="4" rx="2" fill="var(--lab-red-hi)" />
      <g fill="var(--lab-steel)">
        <circle cx="352" cy="170" r="7" />
        <path d="M344 179h16l3 26h-4l-1 26h-4l-2-20-2 20h-4l-1-26h-4z" />
      </g>
      <path d="M96 210V140" stroke="#3C5372" strokeWidth="3" />
      <rect
        x="86"
        y="126"
        width="20"
        height="20"
        rx="3"
        fill="#0E2140"
        stroke="var(--lab-steel)"
        strokeOpacity=".6"
      />
      <Box x={190} y={144} w={62} h={46} color="var(--lab-blue)" tag="CAR" delay={0.35} />
      <Box x={338} y={156} w={30} h={80} color="var(--lab-red-hi)" tag="PERSON" delay={0.55} />
      <Box x={80} y={120} w={32} h={32} color="var(--lab-ice)" tag="SIGN" delay={0.75} />

      {/* bird's-eye view: spatial relationships */}
      <rect
        x="440"
        y="28"
        width="180"
        height="250"
        rx="10"
        fill="#071226"
        stroke="var(--lab-line)"
      />
      <text x="452" y="48" {...label}>
        BIRD'S-EYE
      </text>
      {[40, 80, 120].map((r) => (
        <path
          key={r}
          d={`M${530 - r} 250A${r} ${r} 0 0 1 ${530 + r} 250`}
          fill="none"
          stroke="var(--lab-ice)"
          strokeOpacity=".16"
          strokeDasharray="2 5"
        />
      ))}
      <g style={{ transformOrigin: "530px 250px" }} className="lab-sweep">
        <path
          d="M530 250L478 120A140 140 0 0 1 582 120Z"
          fill="var(--lab-blue)"
          fillOpacity=".12"
        />
      </g>
      {[
        [530, 150, "var(--lab-blue)", 0.5],
        [586, 182, "var(--lab-red-hi)", 0.7],
        [470, 196, "var(--lab-ice)", 0.9],
      ].map(([x, y, c, t]) => (
        <g key={`${x}`}>
          <path
            d={`M530 250L${x} ${y}`}
            stroke={c as string}
            strokeOpacity=".5"
            strokeDasharray="3 4"
            pathLength={100}
            className="lab-draw"
            style={d(t as number)}
          />
          <circle
            cx={x as number}
            cy={y as number}
            r="6"
            fill={c as string}
            className="lab-enter-pop"
            style={d(t as number)}
          />
        </g>
      ))}
      <path d="M522 262h16l-2-18h-12z" fill="var(--lab-white)" />
      <text x="530" y="272" textAnchor="middle" {...label}>
        EGO
      </text>

      {/* sensor observations */}
      <rect
        x="20"
        y="294"
        width="600"
        height="56"
        rx="10"
        fill="#071226"
        stroke="var(--lab-line)"
      />
      <text x="32" y="314" {...label}>
        LIDAR RETURNS
      </text>
      <g>
        {Array.from({ length: 64 }, (_, i) => {
          const h =
            6 +
            Math.abs(Math.sin(i * 0.37) * Math.cos(i * 0.11)) * 22 +
            (i > 38 && i < 46 ? 10 : 0);
          return (
            <rect
              key={i}
              x={140 + i * 7}
              y={340 - h}
              width="4"
              height={h}
              rx="1.5"
              fill={i > 38 && i < 46 ? "var(--lab-red-hi)" : "var(--lab-blue)"}
              opacity=".8"
              className="lab-enter-fade"
              style={d(0.2 + i * 0.008)}
            />
          );
        })}
      </g>
    </>
  );
}

function ReasonViz() {
  const layers: [number, number[]][] = [
    [300, [70, 110, 150, 190, 230]],
    [370, [90, 130, 170, 210]],
    [440, [110, 150, 190]],
  ];
  const edges: string[] = [];
  for (let c = 0; c < layers.length - 1; c++)
    for (const a of layers[c][1])
      for (const b of layers[c + 1][1])
        edges.push(`M${layers[c][0]} ${a}L${layers[c + 1][0]} ${b}`);
  const active = [
    "M300 150L370 130L440 150",
    "M300 70L370 90L440 110",
    "M300 230L370 170L440 190",
    "M300 110L370 210L440 150",
  ];
  const measured: [number, number][] = [
    [488, 236],
    [506, 214],
    [522, 226],
    [540, 194],
    [556, 200],
    [574, 172],
    [590, 178],
    [606, 152],
  ];
  return (
    <>
      {/* feature extraction */}
      <text x="24" y="40" {...label}>
        FEATURE EXTRACTION
      </text>
      <g className="lab-enter" style={d(0.05)}>
        <rect x="24" y="80" width="84" height="84" rx="4" fill="#071226" stroke="var(--lab-line)" />
        {Array.from({ length: 36 }, (_, i) => (
          <rect
            key={i}
            x={28 + (i % 6) * 13}
            y={84 + Math.floor(i / 6) * 13}
            width="11"
            height="11"
            fill="var(--lab-blue)"
            opacity={0.1 + ((i * 7) % 9) / 14}
          />
        ))}
      </g>
      {[
        [126, 92, 60, 0.2],
        [196, 104, 36, 0.35],
      ].map(([x, y, s, t]) => (
        <g key={x} className="lab-enter" style={d(t)}>
          {[0, 1, 2].map((k) => (
            <rect
              key={k}
              x={x + k * 5}
              y={y - k * 5}
              width={s}
              height={s}
              rx="3"
              fill="var(--lab-panel)"
              stroke="var(--lab-blue)"
              strokeOpacity={0.4 + k * 0.2}
            />
          ))}
        </g>
      ))}
      <path d="M108 122H126M188 122H196M242 122H254" stroke="var(--lab-ice)" strokeOpacity=".5" />
      <g className="lab-enter" style={d(0.5)}>
        {Array.from({ length: 10 }, (_, i) => (
          <rect
            key={i}
            x="258"
            y={62 + i * 18}
            width="16"
            height="14"
            rx="2"
            fill="var(--lab-ice)"
            opacity={0.25 + ((i * 5) % 7) / 10}
          />
        ))}
        <text x="266" y="252" textAnchor="middle" {...label}>
          z
        </text>
      </g>
      <path d="M274 150H300" stroke="var(--lab-ice)" strokeOpacity=".5" />

      {/* network inference */}
      <text x="300" y="40" {...label}>
        MODEL INFERENCE
      </text>
      <path d={edges.join("")} stroke="var(--lab-blue)" strokeOpacity=".16" />
      {active.map((p, i) => (
        <g key={p}>
          <path d={p} fill="none" stroke="var(--lab-ice)" strokeOpacity=".35" />
          <path
            d={p}
            fill="none"
            stroke={i === 0 ? "var(--lab-red-hi)" : "var(--lab-ice)"}
            strokeWidth="3.5"
            pathLength={100}
            className="lab-packet"
            style={{ ...d(i * 0.55), "--lab-packet-dur": "2.2s" } as CSSProperties}
          />
        </g>
      ))}
      {layers.map(([x, ys], ci) =>
        ys.map((y, k) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="8"
            fill="var(--lab-navy)"
            stroke={ci === 2 && k === 1 ? "var(--lab-red-hi)" : "var(--lab-blue)"}
            strokeWidth="2"
            className="lab-enter-pop"
            style={d(0.2 + ci * 0.15 + k * 0.04)}
          />
        )),
      )}

      {/* state estimation */}
      <text x="476" y="40" {...label}>
        STATE ESTIMATION
      </text>
      <rect
        x="476"
        y="52"
        width="144"
        height="200"
        rx="10"
        fill="#071226"
        stroke="var(--lab-line)"
      />
      <path
        d="M484 240C520 222 560 186 612 150"
        fill="none"
        stroke="var(--lab-blue)"
        strokeWidth="2.4"
        pathLength={100}
        className="lab-draw"
        style={d(0.4)}
      />
      <ellipse
        cx="612"
        cy="150"
        rx="12"
        ry="20"
        transform="rotate(-38 612 150)"
        fill="var(--lab-blue)"
        fillOpacity=".14"
        stroke="var(--lab-blue)"
        strokeDasharray="3 3"
        className="lab-enter-fade"
        style={d(1)}
      />
      {measured.map(([x, y], i) => (
        <circle
          key={x}
          cx={x}
          cy={y}
          r="3"
          fill="var(--lab-red-hi)"
          className="lab-enter-pop"
          style={d(0.3 + i * 0.08)}
        />
      ))}
      <text x="488" y="72" fontSize="9" fill="var(--lab-red-hi)" letterSpacing="1">
        ● MEASURED
      </text>
      <text x="488" y="86" fontSize="9" fill="var(--lab-blue)" letterSpacing="1">
        — ESTIMATE
      </text>

      {/* decision under uncertainty */}
      <rect
        x="20"
        y="276"
        width="600"
        height="74"
        rx="10"
        fill="#071226"
        stroke="var(--lab-line)"
      />
      <text x="32" y="296" {...label}>
        DECISION · CALIBRATED PROBABILITIES
      </text>
      {[
        ["YIELD", 0.72, "var(--lab-red-hi)"],
        ["SLOW", 0.21, "var(--lab-ice)"],
        ["PROCEED", 0.07, "var(--lab-blue)"],
      ].map(([n, v, c], i) => (
        <g key={n as string}>
          <text x={32 + i * 196} y="328" fontSize="10" fill="var(--lab-steel)" letterSpacing="1">
            {n}
          </text>
          <rect x={102 + i * 196} y="319" width="100" height="10" rx="5" fill="var(--lab-line)" />
          <rect
            x={102 + i * 196}
            y="319"
            width={100 * (v as number)}
            height="10"
            rx="5"
            fill={c as string}
            className="lab-grow"
            style={d(0.6 + i * 0.1)}
          />
        </g>
      ))}
    </>
  );
}

function ActViz() {
  const candidates = [
    "M320 330C320 270 300 220 250 170C220 140 210 110 210 70",
    "M320 330C320 260 320 190 320 70",
    "M320 330C320 270 340 220 390 170C420 140 430 110 430 70",
  ];
  const chosen = "M320 330C320 280 316 240 300 200C290 176 288 160 288 140";
  return (
    <>
      {/* top-down road */}
      <rect
        x="170"
        y="20"
        width="300"
        height="330"
        rx="10"
        fill="#071226"
        stroke="var(--lab-line)"
      />
      <path
        d="M220 20V350M420 20V350"
        stroke="var(--lab-steel)"
        strokeOpacity=".5"
        strokeWidth="2"
      />
      <path
        d="M320 20V350"
        stroke="var(--lab-steel)"
        strokeOpacity=".3"
        strokeWidth="2"
        strokeDasharray="14 12"
        className="lab-lane"
      />
      {/* crossing + pedestrian (obstacle) */}
      <g fill="var(--lab-steel)" opacity=".25">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={226 + i * 33} y="108" width="22" height="30" rx="2" />
        ))}
      </g>
      <circle cx="356" cy="122" r="9" fill="var(--lab-red-hi)" className="lab-pulse" />
      <circle
        cx="356"
        cy="122"
        r="20"
        fill="none"
        stroke="var(--lab-red-hi)"
        strokeOpacity=".5"
        strokeDasharray="3 4"
      />
      {/* candidate trajectories, then the committed one */}
      {candidates.map((c, i) => (
        <path
          key={c}
          d={c}
          fill="none"
          stroke="var(--lab-steel)"
          strokeOpacity=".35"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          pathLength={100}
          className="lab-draw"
          style={d(0.1 + i * 0.12)}
        />
      ))}
      <g className="lab-enter" style={d(0.7)}>
        <path d="M410 150l12 12M422 150l-12 12" stroke="var(--lab-red-hi)" strokeWidth="2" />
        <path d="M315 86l10 10M325 86l-10 10" stroke="var(--lab-red-hi)" strokeWidth="2" />
      </g>
      <path
        d={chosen}
        fill="none"
        stroke="var(--lab-blue)"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={100}
        className="lab-draw"
        style={d(0.9)}
      />
      <path d={chosen} fill="none" stroke="var(--lab-ice)" strokeWidth="1.4" className="lab-flow" />
      <path
        d="M262 146H340"
        stroke="var(--lab-red-hi)"
        strokeWidth="4"
        strokeLinecap="round"
        className="lab-enter-fade"
        style={d(1.3)}
      />
      <text
        x="248"
        y="96"
        fontSize="10"
        fill="var(--lab-red-hi)"
        letterSpacing="1.4"
        className="lab-enter"
        style={d(1.4)}
      >
        STOP LINE · YIELD
      </text>
      <rect x="306" y="320" width="28" height="22" rx="5" fill="var(--lab-white)" />
      <text x="190" y="44" {...label}>
        PLANNING
      </text>

      {/* control */}
      <text x="24" y="44" {...label}>
        CONTROL
      </text>
      <rect
        x="20"
        y="56"
        width="134"
        height="120"
        rx="10"
        fill="#071226"
        stroke="var(--lab-line)"
      />
      <path d="M28 116H146" stroke="var(--lab-line)" />
      <path
        d="M28 116C40 116 46 90 58 90S76 132 88 128 104 106 116 110 134 116 146 116"
        fill="none"
        stroke="var(--lab-red-hi)"
        strokeWidth="2"
        pathLength={100}
        className="lab-draw-loop"
      />
      <text x="32" y="166" fontSize="9" fill="var(--lab-steel)" letterSpacing="1">
        STEERING · BRAKE
      </text>

      {/* intelligent responses */}
      <text x="24" y="206" {...label}>
        RESPONSES
      </text>
      {[
        ["GIMBAL", "var(--lab-ice)"],
        ["SPEECH", "var(--lab-blue)"],
        ["REPORT", "var(--lab-red-hi)"],
      ].map(([t, c], i) => (
        <g key={t} className="lab-enter" style={d(0.4 + i * 0.15)}>
          <rect
            x="20"
            y={218 + i * 42}
            width="134"
            height="32"
            rx="8"
            fill="var(--lab-panel)"
            stroke={c}
            strokeOpacity=".6"
          />
          <circle cx="38" cy={234 + i * 42} r="5" fill={c} className="lab-pulse" />
          <text x="52" y={238 + i * 42} fontSize="10" fill="var(--lab-white)" letterSpacing="1.2">
            {t}
          </text>
        </g>
      ))}

      {/* feedback to perception */}
      <text x="486" y="44" {...label}>
        FEEDBACK
      </text>
      <path
        d="M492 300C560 300 600 250 600 190S560 70 492 70"
        fill="none"
        stroke="var(--lab-red-hi)"
        strokeOpacity=".7"
        strokeWidth="1.6"
        strokeDasharray="4 5"
        className="lab-flow-slow"
      />
      <path d="M496 64l-8 6 8 6" fill="none" stroke="var(--lab-red-hi)" strokeWidth="1.6" />
      <text x="500" y="186" fontSize="10" fill="var(--lab-steel)" letterSpacing="1">
        <tspan x="500" dy="0">
          NEXT
        </tspan>
        <tspan x="500" dy="14">
          OBSERVATION
        </tspan>
      </text>
    </>
  );
}

const vizFor: Record<StageId, () => ReactElement> = {
  perceive: PerceiveViz,
  reason: ReasonViz,
  act: ActViz,
};
const descFor: Record<StageId, string> = {
  perceive:
    "A camera frame with drivable road and sidewalks segmented; boxes are drawn around a car, a person and a sign. A bird's-eye panel shows their range and bearing from the vehicle, and a strip shows LiDAR returns, with the person's returns highlighted.",
  reason:
    "An image patch is reduced through feature maps to an embedding, passed through a small neural network, and a filter turns noisy measurements into a smooth estimate with uncertainty. A final panel shows calibrated probabilities favouring yield.",
  act: "From a top-down view, three candidate trajectories are considered; two are rejected and a committed path slows to a stop line before a pedestrian. Side panels show a steering and brake signal, the responses a system can produce, and a feedback arrow back to perception.",
};

export function PerceiveReasonAct() {
  const [active, setActive] = useState<StageId>("perceive");
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId().replace(/:/g, "");
  const stage = stages.find((s) => s.id === active)!;
  const Viz = vizFor[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = stages.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(stages[next].id);
    tabsRef.current[next]?.focus();
  };

  return (
    <section className="lab-surface lab-pra" aria-labelledby={`${base}-h`}>
      <SectionHeading
        id={`${base}-h`}
        kicker="The operating loop"
        title={
          <>
            Perceive <span className="lab-arrow">→</span> Reason{" "}
            <span className="lab-arrow">→</span> <em>Act</em>
          </>
        }
        lede="Every intelligent system I build closes the same loop. Choose a stage to see what happens inside it, and which of my projects implement it."
      />

      <div className="lab-panel lab-panel-grid mt-10 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[15rem_1fr] lg:gap-8">
          <div role="tablist" aria-label="Stages of the loop" className="lab-pra-tabs">
            {stages.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`${base}-tab-${s.id}`}
                aria-selected={active === s.id}
                aria-controls={`${base}-panel`}
                tabIndex={active === s.id ? 0 : -1}
                onClick={() => setActive(s.id)}
                onKeyDown={(e) => onKey(e, i)}
                className="lab-pra-tab"
                style={{ "--lab-accent": s.color } as CSSProperties}
              >
                <span className="lab-mono lab-pra-index">{s.index}</span>
                <span className="lab-pra-title">{s.title}</span>
                <span className="lab-pra-verb">{s.verb}</span>
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`${base}-panel`}
            aria-labelledby={`${base}-tab-${active}`}
            className="min-w-0"
            style={{ "--lab-accent": stage.color } as CSSProperties}
          >
            <LabViz className="lab-scale lab-pra-viz">
              <svg
                key={active}
                viewBox="0 0 640 360"
                role="img"
                aria-label={descFor[active]}
                className="lab-motif"
              >
                <Viz />
              </svg>
            </LabViz>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="lab-body text-base">{stage.summary}</p>
                <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {stage.concepts.map((c) => (
                    <div key={c.name} className="lab-concept">
                      <dt>{c.name}</dt>
                      <dd>{c.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <div
                  className="lab-mono text-[0.7rem] uppercase tracking-[0.2em]"
                  style={{ color: stage.color }}
                >
                  Where this runs in my work
                </div>
                <ul className="mt-3 grid gap-2">
                  {stage.evidence.map((ev) => {
                    const p = projectById[ev.project];
                    return (
                      <li key={ev.project}>
                        <Link
                          to="/projects/$slug"
                          params={{ slug: p.caseSlug! }}
                          className="lab-evidence"
                        >
                          <span>
                            <strong>{p.name}</strong>
                            <span>{ev.detail}</span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 flex-none" aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="lab-mono mt-3 text-[0.7rem] tracking-[0.08em] text-[var(--lab-dim)]">
        Illustrations explain the concepts; they are not output from a live autonomy stack.
        Probability values are illustrative.
      </p>
    </section>
  );
}
