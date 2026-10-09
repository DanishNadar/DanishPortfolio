import { useId, type CSSProperties, type ReactNode } from "react";
import type { MotifKind } from "./data";
import { LabViz } from "./LabViz";

/*
  Project motifs: one small, purpose-built drawing per system. Each is 320×180,
  CSS-animated, legible as a still frame, and labelled for assistive tech by the
  caption it is rendered with.
*/

const d = (delay: number) => ({ "--lab-delay": `${delay}s` }) as CSSProperties;
const fine = { fontSize: 8, letterSpacing: 1.2, fill: "var(--lab-dim)" } as const;

function Frame({
  label,
  children,
  grid = true,
}: {
  label: string;
  children: (id: (s: string) => string) => ReactNode;
  grid?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const id = (s: string) => `${uid}-${s}`;
  return (
    <svg viewBox="0 0 320 180" className="lab-motif" role="img" aria-label={label}>
      <defs>
        <pattern id={id("g")} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="var(--lab-blue)" strokeOpacity=".07" />
        </pattern>
      </defs>
      {grid && <rect width="320" height="180" fill={`url(#${id("g")})`} />}
      {children(id)}
    </svg>
  );
}

/* TalonCV: three modalities → time alignment → explainable report, on-device. */
function Multimodal({ label }: { label: string }) {
  const wave = Array.from({ length: 34 }, (_, i) => {
    const x = 20 + i * 2.6;
    const amp = (Math.sin(i * 0.55) * Math.sin(i * 0.13) + 0.25 * Math.sin(i * 1.7)) * 14;
    return `${x.toFixed(1)},${(42 - amp).toFixed(1)}`;
  }).join(" ");
  const flows = [
    { d: "M112 42C150 42 150 80 176 84", c: "var(--lab-blue)", t: 0 },
    { d: "M112 92C140 92 150 90 176 90", c: "var(--lab-ice)", t: 0.7 },
    { d: "M112 140C150 140 150 100 176 96", c: "var(--lab-steel)", t: 1.4 },
  ];
  return (
    <Frame label={label}>
      {() => (
        <>
          <text x="20" y="20" {...fine}>
            AUDIO
          </text>
          <polyline points={wave} fill="none" stroke="var(--lab-blue)" strokeWidth="1.8" />
          <text x="20" y="70" {...fine}>
            VIDEO
          </text>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={20 + i * 8}
              y={78 + i * 4}
              width="56"
              height="34"
              rx="3"
              fill="var(--lab-panel)"
              stroke="var(--lab-line)"
            />
          ))}
          <g transform="translate(64 101)">
            {[
              [0, -9],
              [-7, -5],
              [7, -5],
              [-8, 2],
              [8, 2],
              [-4, 8],
              [4, 8],
              [0, 10],
              [-3, -2],
              [3, -2],
              [0, 3],
            ].map(([x, y]) => (
              <circle key={`${x}${y}`} cx={x} cy={y} r="1.1" fill="var(--lab-ice)" />
            ))}
            <rect
              x="-13"
              y="-15"
              width="26"
              height="30"
              fill="none"
              stroke="var(--lab-red-hi)"
              strokeWidth="1.3"
              className="lab-blink"
            />
          </g>
          <text x="20" y="134" {...fine}>
            TEXT
          </text>
          {[
            [20, 30],
            [54, 18],
            [76, 26],
          ].map(([x, w], i) => (
            <rect
              key={x}
              x={x}
              y="140"
              width={w}
              height="8"
              rx="3"
              fill="var(--lab-steel)"
              opacity={0.75 - i * 0.15}
            />
          ))}
          {flows.map((f) => (
            <g key={f.d}>
              <path d={f.d} fill="none" stroke={f.c} strokeOpacity=".3" />
              <path
                d={f.d}
                fill="none"
                stroke={f.c}
                strokeWidth="3"
                pathLength={100}
                className="lab-packet"
                style={d(f.t)}
              />
            </g>
          ))}
          {/* time-window alignment */}
          <rect
            x="178"
            y="62"
            width="62"
            height="56"
            rx="8"
            fill="var(--lab-panel)"
            stroke="var(--lab-ice)"
            strokeOpacity=".6"
          />
          {[
            [
              "var(--lab-blue)",
              [
                [0, 0.3],
                [0.5, 0.8],
              ],
            ],
            [
              "var(--lab-ice)",
              [
                [0.15, 0.4],
                [0.6, 0.95],
              ],
            ],
            [
              "var(--lab-steel)",
              [
                [0, 0.45],
                [0.55, 0.9],
              ],
            ],
          ].map(([c, segs], row) =>
            (segs as number[][]).map(([a, b]) => (
              <rect
                key={`${row}-${a}`}
                x={186 + a * 46}
                y={74 + (row as number) * 12}
                width={(b - a) * 46}
                height="6"
                rx="2"
                fill={c as string}
                opacity=".8"
              />
            )),
          )}
          <path
            d="M209 68V112"
            stroke="var(--lab-red-hi)"
            strokeWidth="1.4"
            strokeDasharray="3 3"
            className="lab-slide"
            style={{ "--lab-slide": "22px" } as CSSProperties}
          />
          <text x="209" y="132" textAnchor="middle" {...fine}>
            ALIGN
          </text>
          <path d="M240 90H258" stroke="var(--lab-ice)" strokeOpacity=".4" />
          <path
            d="M240 90H258"
            stroke="var(--lab-ice)"
            strokeWidth="3"
            pathLength={100}
            className="lab-packet"
            style={d(0.4)}
          />
          {/* explainable report */}
          <path
            d="M262 58h28l10 10v56h-38z"
            fill="var(--lab-panel)"
            stroke="var(--lab-red-hi)"
            strokeOpacity=".8"
          />
          {[72, 82, 92, 102].map((y, i) => (
            <path
              key={y}
              d={`M269 ${y}h${i % 2 ? 18 : 24}`}
              stroke="var(--lab-steel)"
              strokeOpacity=".7"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
          <path d="M269 113l4 4 8-8" fill="none" stroke="var(--lab-red-hi)" strokeWidth="1.8" />
          {/* on-device badge */}
          <g transform="translate(214 14)">
            <rect
              width="92"
              height="20"
              rx="10"
              fill="var(--lab-blue)"
              fillOpacity=".12"
              stroke="var(--lab-blue)"
              strokeOpacity=".5"
            />
            <rect x="10" y="8.5" width="8" height="6" rx="1" fill="var(--lab-blue)" />
            <path
              d="M11.5 8.5v-2a2.5 2.5 0 0 1 5 0v2"
              fill="none"
              stroke="var(--lab-blue)"
              strokeWidth="1.2"
            />
            <text x="24" y="13.5" fontSize="7.5" fill="var(--lab-blue)" letterSpacing="1">
              ON-DEVICE
            </text>
          </g>
        </>
      )}
    </Frame>
  );
}

/* Morph: uniform layer selection from a 12-block teacher into a 6-block student, then KL. */
function Distill({ label }: { label: string }) {
  const keep = [0, 2, 4, 7, 9, 11];
  return (
    <Frame label={label}>
      {() => (
        <>
          {Array.from({ length: 12 }, (_, i) => {
            const k = keep.includes(i);
            return (
              <rect
                key={i}
                x="26"
                y={40 + i * 10}
                width="78"
                height="8"
                rx="2"
                fill={k ? "var(--lab-ice)" : "var(--lab-line)"}
                className={k ? "lab-pulse" : undefined}
                style={k ? { animationDelay: `${keep.indexOf(i) * 0.25}s` } : undefined}
              />
            );
          })}
          {keep.map((i, j) => {
            const y0 = 44 + i * 10;
            const y1 = 49 + j * 20;
            return (
              <path
                key={i}
                d={`M104 ${y0}C160 ${y0} 160 ${y1} 216 ${y1}`}
                fill="none"
                stroke="var(--lab-blue)"
                strokeOpacity=".7"
                className="lab-flow"
              />
            );
          })}
          {keep.map((_, j) => (
            <rect
              key={j}
              x="216"
              y={40 + j * 20}
              width="78"
              height="18"
              rx="3"
              fill="var(--lab-blue)"
              opacity=".9"
            />
          ))}
          {/* distillation: student matches the teacher's output distribution */}
          <circle cx="65" cy="26" r="4" fill="var(--lab-ice)" />
          <circle cx="255" cy="26" r="4" fill="var(--lab-blue)" />
          <path
            d="M65 26C120 0 200 0 255 26"
            fill="none"
            stroke="var(--lab-red-hi)"
            strokeOpacity=".55"
            strokeDasharray="4 4"
          />
          <path
            d="M65 26C120 0 200 0 255 26"
            fill="none"
            stroke="var(--lab-red-hi)"
            strokeWidth="3"
            pathLength={100}
            className="lab-packet"
          />
          <text
            x="160"
            y="22"
            textAnchor="middle"
            fontSize="8"
            fill="var(--lab-red-hi)"
            letterSpacing="1"
          >
            T²·KL
          </text>
          <text x="26" y="174" {...fine}>
            TEACHER · 12
          </text>
          <text x="294" y="174" textAnchor="end" {...fine} fill="var(--lab-blue)">
            STUDENT · 6
          </text>
        </>
      )}
    </Frame>
  );
}

/* ConfusionClassifier: four class probabilities rebalance toward 25/25/25/25. */
function Equilibrium({ label }: { label: string }) {
  const bars = [
    { name: "HAPPY", from: 0.66, c: "var(--lab-blue)" },
    { name: "ANGRY", from: 0.16, c: "var(--lab-ice)" },
    { name: "SAD", from: 0.11, c: "var(--lab-blue)" },
    { name: "NEUTRAL", from: 0.07, c: "var(--lab-ice)" },
  ];
  const top = 46;
  const h = 104;
  const bw = 46;
  return (
    <Frame label={label}>
      {() => (
        <>
          <rect
            x="24"
            y="12"
            width="272"
            height="20"
            rx="6"
            fill="var(--lab-panel)"
            stroke="var(--lab-line)"
          />
          <rect
            x="34"
            y="19.5"
            width="58"
            height="5"
            rx="2.5"
            fill="var(--lab-steel)"
            opacity=".55"
          />
          <rect
            x="98"
            y="19.5"
            width="36"
            height="5"
            rx="2.5"
            fill="var(--lab-steel)"
            opacity=".35"
          />
          <path d="M140 17v10" stroke="var(--lab-ice)" strokeWidth="1.4" className="lab-blink" />
          <text
            x="288"
            y="25.5"
            textAnchor="end"
            fontSize="7.5"
            fill="var(--lab-dim)"
            letterSpacing="1"
          >
            INPUT
          </text>
          <path d={`M24 ${top + h}H296`} stroke="var(--lab-line)" />
          {bars.map((b, i) => {
            const x = 40 + i * (bw + 22);
            return (
              <g key={b.name}>
                <rect
                  x={x}
                  y={top}
                  width={bw}
                  height={h}
                  rx="3"
                  fill={b.c}
                  opacity=".85"
                  className="lab-rebalance"
                  style={{ "--from": b.from, "--to": 0.25 } as CSSProperties}
                />
                <text
                  x={x + bw / 2}
                  y={top + h + 14}
                  textAnchor="middle"
                  fontSize="7.5"
                  fill="var(--lab-steel)"
                  letterSpacing=".8"
                >
                  {b.name}
                </text>
              </g>
            );
          })}
          <path d={`M24 ${top + h * 0.75}H296`} stroke="var(--lab-red-hi)" strokeDasharray="4 4" />
          <text
            x="296"
            y={top + h * 0.75 - 5}
            textAnchor="end"
            fontSize="8"
            fill="var(--lab-red-hi)"
          >
            25%
          </text>
        </>
      )}
    </Frame>
  );
}

/* CampGrids: roles and content around one row-level-secured core. */
function Platform({ label }: { label: string }) {
  const sats = [
    { x: 46, y: 46, t: "EDUCATORS", c: "var(--lab-ice)" },
    { x: 46, y: 134, t: "STUDENTS", c: "var(--lab-blue)" },
    { x: 274, y: 46, t: "CURRICULUM", c: "var(--lab-steel)" },
    { x: 274, y: 134, t: "PROGRESS", c: "var(--lab-blue)" },
    { x: 160, y: 20, t: "ADMIN", c: "var(--lab-red-hi)" },
  ];
  const belts = ["#F3F8FF", "#FFD24B", "#FF9B3D", "#3DCB7A", "#35A7FF", "#A070FF"];
  return (
    <Frame label={label}>
      {() => (
        <>
          {sats.map((s, i) => {
            const path = `M${s.x} ${s.y}L160 96`;
            return (
              <g key={s.t}>
                <path d={path} stroke={s.c} strokeOpacity=".3" />
                <path
                  d={path}
                  stroke={s.c}
                  strokeWidth="3"
                  pathLength={100}
                  className="lab-packet"
                  style={d(i * 0.45)}
                />
              </g>
            );
          })}
          <rect
            x="118"
            y="78"
            width="84"
            height="38"
            rx="9"
            fill="var(--lab-panel)"
            stroke="var(--lab-red-hi)"
            strokeOpacity=".8"
          />
          <text
            x="160"
            y="94"
            textAnchor="middle"
            fontSize="8.5"
            fill="var(--lab-white)"
            letterSpacing="1"
          >
            POSTGRES
          </text>
          <text
            x="160"
            y="106"
            textAnchor="middle"
            fontSize="7.5"
            fill="var(--lab-red-hi)"
            letterSpacing="1"
          >
            RLS CORE
          </text>
          {sats.map((s) => (
            <g key={s.t}>
              <circle
                cx={s.x}
                cy={s.y}
                r="11"
                fill="var(--lab-navy)"
                stroke={s.c}
                strokeWidth="1.5"
              />
              <circle cx={s.x} cy={s.y} r="3.5" fill={s.c} className="lab-pulse" />
              <text
                x={s.x}
                y={s.y > 100 ? s.y + 24 : s.y < 30 ? s.y + 3 : s.y - 17}
                dx={s.y < 30 ? 18 : 0}
                textAnchor={s.y < 30 ? "start" : "middle"}
                {...fine}
                fill={s.c}
              >
                {s.t}
              </text>
            </g>
          ))}
          {/* belt progress grid beside PROGRESS */}
          <g transform="translate(232 152)">
            {belts.map((c, i) => (
              <rect
                key={c}
                x={i * 9}
                y="0"
                width="7"
                height="7"
                rx="1.5"
                fill={c}
                opacity={i < 4 ? 0.9 : 0.25}
              />
            ))}
          </g>
        </>
      )}
    </Frame>
  );
}

/* Compute Collaborative: a scheduler distributing workloads across a proposed GPU pool. */
function Gpu({ label }: { label: string }) {
  const cards = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    x: 112 + (i % 4) * 50,
    y: i < 4 ? 46 : 106,
  }));
  return (
    <Frame label={label}>
      {() => (
        <>
          <rect
            x="18"
            y="72"
            width="56"
            height="36"
            rx="8"
            fill="var(--lab-panel)"
            stroke="var(--lab-red-hi)"
            strokeOpacity=".8"
          />
          <text
            x="46"
            y="94"
            textAnchor="middle"
            fontSize="8.5"
            fill="var(--lab-white)"
            letterSpacing="1"
          >
            SCHED
          </text>
          {cards.map((c, i) => {
            const p = `M74 90H92V${c.y + 15}H${c.x}`;
            return (
              <g key={i}>
                <path d={p} fill="none" stroke="var(--lab-blue)" strokeOpacity=".22" />
                <path
                  d={p}
                  fill="none"
                  stroke="var(--lab-blue)"
                  strokeWidth="3"
                  pathLength={100}
                  className="lab-packet"
                  style={{ ...d(i * 0.32), "--lab-packet-dur": "2.8s" } as CSSProperties}
                />
              </g>
            );
          })}
          {cards.map((c, i) => (
            <g key={i}>
              <rect
                x={c.x}
                y={c.y}
                width="42"
                height="30"
                rx="4"
                fill="var(--lab-panel-hi)"
                stroke="var(--lab-line)"
              />
              <circle
                cx={c.x + 11}
                cy={c.y + 15}
                r="6"
                fill="none"
                stroke="var(--lab-blue)"
                strokeOpacity=".8"
              />
              <path
                d={`M${c.x + 11} ${c.y + 9}V${c.y + 21}M${c.x + 5} ${c.y + 15}H${c.x + 17}`}
                stroke="var(--lab-blue)"
                strokeOpacity=".6"
                className="lab-spin"
                style={{ animationDuration: "2.4s" }}
              />
              <rect
                x={c.x + 24}
                y={c.y + 6}
                width="11"
                height="18"
                rx="2"
                fill={i % 3 === 0 ? "var(--lab-red-hi)" : "var(--lab-ice)"}
                className="lab-pulse"
                style={{
                  animationDelay: `${i * 0.4}s`,
                  transformBox: "fill-box",
                  transformOrigin: "bottom",
                }}
              />
            </g>
          ))}
          <text x="112" y="32" {...fine}>
            PROPOSED GPU POOL
          </text>
          <text x="306" y="168" textAnchor="end" {...fine}>
            PLANNING MODEL · NOT DEPLOYED
          </text>
        </>
      )}
    </Frame>
  );
}

/* AILA: speech in → STT → LLM → TTS → speech out, interruptible. */
function Voice({ label }: { label: string }) {
  const bars = (x0: number, n: number, c: string, seed: number) =>
    Array.from({ length: n }, (_, i) => {
      const h = 8 + Math.abs(Math.sin((i + seed) * 0.9)) * 30;
      return (
        <rect
          key={i}
          x={x0 + i * 7}
          y={90 - h / 2}
          width="4"
          height={h}
          rx="2"
          fill={c}
          className="lab-eq"
          style={{ animationDelay: `${(i * 0.13 + seed * 0.2) % 1.2}s` }}
        />
      );
    });
  const boxes = [
    { x: 80, t: "STT", c: "var(--lab-blue)" },
    { x: 140, t: "LLM", c: "var(--lab-ice)" },
    { x: 200, t: "TTS", c: "var(--lab-red-hi)" },
  ];
  return (
    <Frame label={label}>
      {() => (
        <>
          <text x="14" y="52" {...fine}>
            VOICE IN
          </text>
          {bars(14, 8, "var(--lab-blue)", 0)}
          {boxes.map((b, i) => (
            <g key={b.t}>
              <path d={`M${b.x - 14} 90H${b.x}`} stroke={b.c} strokeOpacity=".4" />
              <path
                d={`M${b.x - 14} 90H${b.x}`}
                stroke={b.c}
                strokeWidth="3"
                pathLength={100}
                className="lab-packet"
                style={d(i * 0.5)}
              />
              <rect
                x={b.x}
                y="72"
                width="46"
                height="36"
                rx="8"
                fill="var(--lab-panel)"
                stroke={b.c}
                strokeOpacity=".8"
              />
              <text
                x={b.x + 23}
                y="94"
                textAnchor="middle"
                fontSize="9"
                fill="var(--lab-white)"
                letterSpacing="1"
              >
                {b.t}
              </text>
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={155 + i * 8}
              cy="102"
              r="1.6"
              fill="var(--lab-ice)"
              className="lab-pulse"
              style={{ animationDelay: `${i * 0.3}s`, animationDuration: "1.2s" }}
            />
          ))}
          <path d="M246 90H260" stroke="var(--lab-red-hi)" strokeOpacity=".5" />
          <text x="306" y="52" textAnchor="end" {...fine}>
            VOICE OUT
          </text>
          {bars(262, 7, "var(--lab-red-hi)", 3)}
          {/* barge-in: the user can talk over the reply */}
          <path
            d="M286 122C286 160 34 160 34 122"
            fill="none"
            stroke="var(--lab-red-hi)"
            strokeOpacity=".55"
            strokeDasharray="4 4"
            className="lab-flow-slow"
          />
          <text
            x="160"
            y="166"
            textAnchor="middle"
            fontSize="8"
            fill="var(--lab-red-hi)"
            letterSpacing="1.2"
          >
            BARGE-IN
          </text>
        </>
      )}
    </Frame>
  );
}

/* EcoCAR: camera, radar and LiDAR fused into one tracked lead vehicle. */
function Fusion({ label }: { label: string }) {
  const sensors = [
    { y: 40, t: "CAM", c: "var(--lab-blue)" },
    { y: 90, t: "RADAR", c: "var(--lab-ice)" },
    { y: 140, t: "LIDAR", c: "var(--lab-red-hi)" },
  ];
  return (
    <Frame label={label}>
      {() => (
        <>
          {sensors.map((s, i) => {
            const p = `M52 ${s.y}C110 ${s.y} 120 90 170 90`;
            return (
              <g key={s.t}>
                <path d={p} fill="none" stroke={s.c} strokeOpacity=".35" strokeWidth="1.4" />
                <path
                  d={p}
                  fill="none"
                  stroke={s.c}
                  strokeWidth="3"
                  pathLength={100}
                  className="lab-packet"
                  style={d(i * 0.6)}
                />
                <circle
                  cx="38"
                  cy={s.y}
                  r="12"
                  fill="var(--lab-navy)"
                  stroke={s.c}
                  strokeWidth="1.5"
                />
                {i === 0 && (
                  <circle cx="38" cy={s.y} r="4.5" fill="none" stroke={s.c} strokeWidth="1.5" />
                )}
                {i === 1 && (
                  <path
                    d={`M33 ${s.y + 4}a7 7 0 0 1 10 0M30 ${s.y + 1}a11 11 0 0 1 16 0`}
                    fill="none"
                    stroke={s.c}
                    strokeWidth="1.3"
                  />
                )}
                {i === 2 &&
                  [0, 60, 120, 180, 240, 300].map((a) => (
                    <circle
                      key={a}
                      cx={38 + 6 * Math.cos((a * Math.PI) / 180)}
                      cy={s.y + 6 * Math.sin((a * Math.PI) / 180)}
                      r="1.3"
                      fill={s.c}
                    />
                  ))}
                <text x="56" y={s.y - 10} fontSize="8" fill={s.c} letterSpacing="1">
                  {s.t}
                </text>
              </g>
            );
          })}
          <circle
            cx="182"
            cy="90"
            r="15"
            fill="var(--lab-navy)"
            stroke="var(--lab-white)"
            strokeWidth="1.6"
          />
          <circle cx="182" cy="90" r="5" fill="var(--lab-white)" className="lab-pulse" />
          <text x="182" y="122" textAnchor="middle" {...fine}>
            FUSE
          </text>
          <path d="M197 90H226" stroke="var(--lab-white)" strokeOpacity=".4" />
          <path
            d="M197 90H226"
            stroke="var(--lab-white)"
            strokeWidth="3"
            pathLength={100}
            className="lab-packet"
            style={d(0.9)}
          />
          {/* tracked lead vehicle, top-down */}
          <path d="M232 40H300M232 140H300" stroke="var(--lab-line)" />
          <path
            d="M232 90H300"
            stroke="var(--lab-steel)"
            strokeOpacity=".35"
            strokeDasharray="6 6"
            className="lab-lane"
          />
          <rect
            x="250"
            y="70"
            width="40"
            height="20"
            rx="6"
            fill="var(--lab-steel)"
            opacity=".75"
          />
          <rect
            x="244"
            y="64"
            width="52"
            height="32"
            fill="none"
            stroke="var(--lab-red-hi)"
            strokeWidth="1.4"
            className="lab-blink"
          />
          <text x="244" y="58" fontSize="7.5" fill="var(--lab-red-hi)" letterSpacing="1">
            LEAD · TRACK
          </text>
        </>
      )}
    </Frame>
  );
}

/* OBSERV-E: stepwise measurements vs. a smooth Kalman prediction. */
function Tracking({ label }: { label: string }) {
  return (
    <Frame label={label}>
      {() => (
        <>
          <path d="M20 150H300" stroke="var(--lab-line)" strokeWidth="2" />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx={50 + i * 16}
              cy={136 - Math.sin(i * 0.5) * 6}
              r={1.5 + i * 0.4}
              fill="var(--lab-blue)"
              opacity={0.2 + i * 0.13}
            />
          ))}
          <g className="lab-track-smooth">
            <g fill="var(--lab-steel)">
              <circle cx="150" cy="70" r="8" />
              <path d="M140 80h20l4 32h-5l-2 30h-5l-3-25-3 25h-5l-2-30h-5z" />
            </g>
            <rect
              x="130"
              y="54"
              width="44"
              height="96"
              fill="none"
              stroke="var(--lab-blue)"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />
            <text
              x="174"
              y="48"
              textAnchor="end"
              fontSize="8"
              fill="var(--lab-blue)"
              letterSpacing="1"
            >
              PREDICTED
            </text>
          </g>
          <g className="lab-track-steps">
            <rect
              x="126"
              y="52"
              width="44"
              height="98"
              fill="none"
              stroke="var(--lab-red-hi)"
              strokeWidth="1.8"
            />
            <text x="126" y="164" fontSize="8" fill="var(--lab-red-hi)" letterSpacing="1">
              MEASURED
            </text>
          </g>
          {/* gimbal pointing at the predicted state */}
          <g transform="translate(276 64)">
            <circle r="13" fill="var(--lab-navy)" stroke="var(--lab-ice)" strokeWidth="1.4" />
            <g className="lab-gimbal">
              <path d="M0 0L-18 6" stroke="var(--lab-ice)" strokeWidth="3" strokeLinecap="round" />
            </g>
            <text y="30" textAnchor="middle" {...fine}>
              GIMBAL
            </text>
          </g>
        </>
      )}
    </Frame>
  );
}

/* Lane study: predicted lane points in perspective. */
function Lanes({ label }: { label: string }) {
  const vx = 160;
  const vy = 22;
  const pts: [number, number, number][] = [];
  for (const k of [-1, 1]) {
    for (const t of [0.25, 0.42, 0.6, 0.78, 0.95]) {
      const bx = vx + k * 126;
      pts.push([vx + k * 5 + (bx - vx - k * 5) * t, vy + (170 - vy) * t, t]);
    }
  }
  return (
    <Frame label={label}>
      {() => (
        <>
          <path
            d={`M${vx - 5} ${vy}L34 170H286L${vx + 5} ${vy}Z`}
            fill="var(--lab-blue)"
            fillOpacity=".06"
          />
          <path
            d={`M${vx - 5} ${vy}L34 170M${vx + 5} ${vy}L286 170`}
            stroke="var(--lab-blue)"
            strokeWidth="2.2"
          />
          <path
            d={`M${vx} ${vy}L${vx} 170`}
            stroke="var(--lab-steel)"
            strokeWidth="1.5"
            strokeDasharray="8 8"
            className="lab-lane"
          />
          {pts.map(([x, y, t], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={2 + t * 2.6}
              fill="var(--lab-red-hi)"
              className="lab-pulse"
              style={{ animationDelay: `${(i % 5) * 0.25}s` }}
            />
          ))}
          <text x="16" y="20" {...fine}>
            3 BACKBONES × AUG ON/OFF
          </text>
        </>
      )}
    </Frame>
  );
}

/* RL: an agent following the lane; reward climbing over episodes (illustrative). */
function Rl({ label }: { label: string }) {
  const road = "M14 160C120 160 150 92 306 82";
  const spark = Array.from(
    { length: 12 },
    (_, i) => `${18 + i * 7},${54 - Math.min(30, Math.pow(i, 1.25) * 2.2 + 3 * Math.sin(i))}`,
  ).join(" ");
  return (
    <Frame label={label}>
      {() => (
        <>
          <path
            d={road}
            fill="none"
            stroke="var(--lab-line)"
            strokeWidth="22"
            strokeLinecap="round"
          />
          <path
            d={road}
            fill="none"
            stroke="var(--lab-steel)"
            strokeWidth="1.2"
            strokeDasharray="5 6"
          />
          <path d={road} fill="none" stroke="var(--lab-blue)" strokeOpacity=".35" strokeWidth="2" />
          <path
            d={road}
            fill="none"
            stroke="var(--lab-ice)"
            strokeWidth="9"
            pathLength={100}
            className="lab-packet"
            style={{ "--lab-packet-dur": "4.6s" } as CSSProperties}
          />
          <polyline
            points={spark}
            fill="none"
            stroke="var(--lab-red-hi)"
            strokeWidth="1.8"
            pathLength={100}
            className="lab-draw-loop"
          />
          <text x="18" y="70" {...fine}>
            REWARD
          </text>
          <text x="306" y="168" textAnchor="end" {...fine}>
            PPO · SIMULATION
          </text>
        </>
      )}
    </Frame>
  );
}

const registry: Record<MotifKind, (p: { label: string }) => ReactNode> = {
  multimodal: Multimodal,
  distill: Distill,
  equilibrium: Equilibrium,
  platform: Platform,
  gpu: Gpu,
  voice: Voice,
  fusion: Fusion,
  tracking: Tracking,
  lanes: Lanes,
  rl: Rl,
};

export function ProjectMotif({
  kind,
  label,
  className = "",
}: {
  kind: MotifKind;
  label: string;
  className?: string;
}) {
  const Motif = registry[kind];
  return (
    <LabViz className={className}>
      <Motif label={label} />
    </LabViz>
  );
}
