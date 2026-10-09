import { useEffect, useId, useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";
import { motion, useInView, usePageVisible, usePrefersReducedMotion } from "./motion";

/*
  Hero scene: an original fastback EV (geometry shared with the GitHub profile
  hero, no manufacturer styling) moving through an abstract Chicago street.

  Three layered states explain an intelligent system without claiming to be one:
    perceive → LiDAR/camera coverage, detections, drivable-lane segmentation
    reason   → fused sensor network, predicted pedestrian motion
    act      → a committed trajectory that slows and yields at the crossing
  With reduced motion every layer is shown at once as a single static frame.
*/

export type ScenePhase = "perceive" | "reason" | "act";
const PHASES: ScenePhase[] = ["perceive", "reason", "act"];

const PHASE_COPY: Record<ScenePhase, { index: string; title: string; body: string }> = {
  perceive: {
    index: "01",
    title: "Perceive",
    body: "Camera and LiDAR returns become tracked objects: a pedestrian at the curb, a sign, and the drivable lane.",
  },
  reason: {
    index: "02",
    title: "Reason",
    body: "Sensor evidence is fused, the pedestrian's next steps are predicted, and the network weighs the options.",
  },
  act: {
    index: "03",
    title: "Act",
    body: "The planner commits to a trajectory: ease off, then yield before the crossing.",
  },
};

// Ego vehicle placement: the profile hero's 1200×500 geometry mapped into this scene.
const CAR = "translate(40 372) scale(0.86) translate(-650 -420)";
const SENSOR = { x: 227.5, y: 268.8 };
const BODY =
  "M650 392V374C650 362 654 354 664 350C702 340 742 320 792 307C832 297 880 296 914 305" +
  "C952 315 986 335 1012 347C1032 353 1044 361 1048 373V388C1048 394 1042 398 1034 398H1006.9" +
  "A47 47 0 1 0 917.1 398H756.9A47 47 0 1 0 667.1 398H658C653 398 650 396 650 392Z";
const SPOKES: [number, number][] = [
  [22, 0],
  [6.8, 20.92],
  [-17.8, 12.93],
  [-17.8, -12.93],
  [6.8, -20.92],
];

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
}
function arc(r: number, a0: number, a1: number) {
  const [x0, y0] = polar(SENSOR.x, SENSOR.y, r, a0);
  const [x1, y1] = polar(SENSOR.x, SENSOR.y, r, a1);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
}
function cone(r: number, a0: number, a1: number) {
  const [x0, y0] = polar(SENSOR.x, SENSOR.y, r, a0);
  const [x1, y1] = polar(SENSOR.x, SENSOR.y, r, a1);
  return `M${SENSOR.x} ${SENSOR.y}L${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}Z`;
}

function Pedestrian({ x, base, ghost = 0 }: { x: number; base: number; ghost?: number }) {
  return (
    <g fill="var(--lab-steel)" opacity={ghost ? ghost : 0.9}>
      <circle cx={x} cy={base - 54} r={6} />
      <path d={`M${x - 7} ${base - 46}h14l3 24h-4l-1 22h-4l-2-18-2 18h-4l-1-22h-4z`} />
    </g>
  );
}

function Corners({
  x,
  y,
  w,
  h,
  c = 9,
  color,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  c?: number;
  color: string;
}) {
  const d =
    `M${x} ${y + c}V${y}H${x + c} M${x + w - c} ${y}H${x + w}V${y + c} ` +
    `M${x + w} ${y + h - c}V${y + h}H${x + w - c} M${x + c} ${y + h}H${x}V${y + h - c}`;
  return <path d={d} fill="none" stroke={color} strokeWidth={2} />;
}

function Skyline({ fill }: { fill: string }) {
  const base = 358;
  const blocks: [number, number, number][] = [
    [8, 24, 52],
    [34, 18, 74],
    [54, 28, 60],
    [86, 20, 96],
    [108, 30, 66],
    [142, 22, 120],
    [166, 28, 86],
    [198, 18, 64],
    [218, 26, 104],
    [300, 24, 90],
    [326, 18, 62],
    [348, 28, 128],
    [380, 22, 76],
    [520, 26, 98],
    [548, 18, 70],
    [570, 30, 112],
    [604, 22, 64],
    [700, 18, 58],
    [722, 30, 82],
  ];
  const wx = 248;
  const hx = 424;
  const tx = 470;
  return (
    <g fill={`url(#${fill})`}>
      {blocks.map(([x, w, h]) => (
        <rect key={x} x={x} y={base - h} width={w} height={h} />
      ))}
      {/* Willis Tower: bundled tubes and twin antennas */}
      <rect x={wx} y={base - 150} width={44} height={150} />
      <rect x={wx + 6} y={base - 182} width={32} height={40} />
      <rect x={wx + 12} y={base - 206} width={20} height={30} />
      <rect x={wx + 14} y={base - 236} width={2.5} height={32} />
      <rect x={wx + 27} y={base - 230} width={2.5} height={26} />
      {/* John Hancock: tapered with antennas */}
      <path d={`M${hx} ${base}L${hx + 6} ${base - 168}H${hx + 30}L${hx + 36} ${base}Z`} />
      <rect x={hx + 11} y={base - 198} width={2.2} height={32} />
      <rect x={hx + 23} y={base - 198} width={2.2} height={32} />
      {/* Trump Tower: stepped spire */}
      <path
        d={`M${tx} ${base}V${base - 120}H${tx + 4}V${base - 140}H${tx + 8}V${base - 156}H${tx + 14}V${base - 190}H${tx + 15.5}V${base - 156}H${tx + 18}V${base - 140}H${tx + 22}V${base - 120}V${base}Z`}
      />
      {/* Marina City */}
      <rect x={652} y={base - 92} width={16} height={92} rx={8} />
      <rect x={674} y={base - 92} width={16} height={92} rx={8} />
    </g>
  );
}

export function AutonomousScene({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const id = (s: string) => `${uid}-${s}`;
  const reduced = usePrefersReducedMotion();
  const visible = usePageVisible();
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "0px" });
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);

  const autoplay = !reduced && !paused && inView && visible;

  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
      setCycle((c) => c + 1);
    }, motion.heroPhase);
    return () => window.clearTimeout(t);
  }, [autoplay, phaseIndex, cycle]);

  const phase = PHASES[phaseIndex];
  // Reduced motion: one complete, static frame with every layer visible.
  const shown = reduced ? "all" : phase;
  const copy = PHASE_COPY[phase];

  const select = (i: number) => {
    setPhaseIndex(i);
    setCycle((c) => c + 1);
    setPaused(true);
  };

  return (
    <div className={`lab-scene ${className}`}>
      <div
        ref={ref}
        className="lab-viz lab-scale lab-scene-frame"
        data-active={inView && !paused && visible}
      >
        <svg
          viewBox="0 0 760 440"
          className="lab-scene-svg"
          data-phase={shown}
          role="img"
          aria-labelledby={id("t")}
        >
          <title id={id("t")}>
            Illustration: an electric vehicle perceives a pedestrian and a sign with LiDAR and
            camera coverage, fuses the evidence in a small neural network, and plans a trajectory
            that yields at the crossing, in front of an abstract Chicago skyline.
          </title>
          <defs>
            <pattern id={id("grid")} width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="var(--lab-blue)" strokeOpacity=".06" />
            </pattern>
            <radialGradient
              id={id("glow")}
              cx="300"
              cy="300"
              r="380"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="var(--lab-blue)" stopOpacity=".16" />
              <stop offset="1" stopColor="var(--lab-blue)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#16325A" stopOpacity=".85" />
              <stop offset="1" stopColor="#0A1730" stopOpacity=".2" />
            </linearGradient>
            <linearGradient id={id("body")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--lab-white)" />
              <stop offset=".42" stopColor="#C9D8EA" />
              <stop offset=".78" stopColor="#7F96B4" />
              <stop offset="1" stopColor="#3B5070" />
            </linearGradient>
            <linearGradient id={id("glass")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1B3A63" />
              <stop offset=".55" stopColor="#0A1830" />
              <stop offset="1" stopColor="var(--lab-navy)" />
            </linearGradient>
            <linearGradient id={id("rim")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#B9CBE0" />
              <stop offset="1" stopColor="#3A4F6E" />
            </linearGradient>
            <radialGradient id={id("shade")} cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#000" stopOpacity=".7" />
              <stop offset="1" stopColor="#000" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id={id("fov")}
              cx={SENSOR.x}
              cy={SENSOR.y}
              r="420"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="var(--lab-blue)" stopOpacity=".24" />
              <stop offset="1" stopColor="var(--lab-blue)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={id("seg")} x1="0" x2="1">
              <stop offset="0" stopColor="var(--lab-blue)" stopOpacity="0" />
              <stop offset=".35" stopColor="var(--lab-blue)" stopOpacity=".2" />
              <stop offset="1" stopColor="var(--lab-blue)" stopOpacity=".04" />
            </linearGradient>
            <linearGradient id={id("roadfade")} x1="0" x2="1">
              <stop offset="0" stopColor="#fff" stopOpacity=".25" />
              <stop offset=".12" stopColor="#fff" stopOpacity="1" />
            </linearGradient>
            <mask id={id("roadmask")}>
              <rect x="0" y="350" width="760" height="90" fill={`url(#${id("roadfade")})`} />
            </mask>
            <marker
              id={id("arr")}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="var(--lab-ice)" />
            </marker>
          </defs>

          {/* ── Static environment ───────────────────────────────────── */}
          <rect width="760" height="440" fill={`url(#${id("grid")})`} />
          <rect width="760" height="440" fill={`url(#${id("glow")})`} />
          <Skyline fill={id("sky")} />
          <g opacity=".35">
            {[
              [262, 250],
              [276, 284],
              [282, 226],
              [436, 270],
              [446, 310],
              [160, 300],
              [358, 288],
              [578, 300],
            ].map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="3" height="2" fill="var(--lab-ice)" />
            ))}
          </g>
          <g mask={`url(#${id("roadmask")})`}>
            <rect x="0" y="358" width="760" height="82" fill="#071226" />
            <path d="M0 358.5H760" stroke="var(--lab-line)" strokeWidth="1.5" />
            <path
              d="M0 418H760"
              stroke="var(--lab-steel)"
              strokeOpacity=".35"
              strokeWidth="2"
              className="lab-lane"
            />
            <path d="M0 437H760" stroke="var(--lab-steel)" strokeOpacity=".18" strokeWidth="2" />
          </g>
          {/* Crosswalk ahead */}
          <g fill="var(--lab-steel)" opacity=".28">
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={612 + i * 16}
                y={361}
                width={9}
                height={52}
                rx={1}
                transform={`skewX(-18) translate(${118} 0)`}
              />
            ))}
          </g>

          {/* ── 01 PERCEIVE ──────────────────────────────────────────── */}
          <g className="lab-layer lab-layer-perceive">
            <path d={cone(430, -24, 18)} fill={`url(#${id("fov")})`} />
            {/* Camera field of view from the windshield */}
            <path
              d={`M${SENSOR.x + 70} ${SENSOR.y + 34}L760 300M${SENSOR.x + 70} ${SENSOR.y + 34}L760 392`}
              stroke="var(--lab-ice)"
              strokeOpacity=".22"
              strokeDasharray="3 6"
            />
            {[0, 1.2, 2.4].map((delay) => (
              <path
                key={delay}
                className="lab-wave"
                d={arc(170, -18, 14)}
                fill="none"
                stroke="var(--lab-blue)"
                strokeWidth="2"
                style={{
                  transformOrigin: `${SENSOR.x}px ${SENSOR.y}px`,
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
            {[260, 360].map((r, i) => (
              <path
                key={r}
                d={arc(r, -18, 14)}
                fill="none"
                stroke="var(--lab-ice)"
                strokeOpacity={i ? 0.14 : 0.26}
                strokeDasharray="2 6"
              />
            ))}
            {/* Drivable-lane segmentation */}
            <path d="M386 372H760V414H386Z" fill={`url(#${id("seg")})`} />
            {/* Point-cloud returns on the pedestrian, the sign and the road edge */}
            <g fill="var(--lab-ice)" opacity=".85">
              {[
                [664, 308],
                [670, 300],
                [677, 297],
                [683, 304],
                [688, 320],
                [667, 334],
                [685, 340],
                [676, 352],
                [722, 268],
                [728, 262],
                [734, 270],
                [440, 359],
                [470, 360],
                [510, 359],
                [560, 360],
                [604, 359],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={1.6} />
              ))}
            </g>
          </g>

          {/* Scene objects (always present: they exist whether or not we see them) */}
          <g>
            <path d="M728 360V276" stroke="#3C5372" strokeWidth="3" />
            <rect
              x="716"
              y="252"
              width="24"
              height="24"
              rx="4"
              fill="#0E2140"
              stroke="var(--lab-steel)"
              strokeOpacity=".6"
            />
            <path d="M722 268l6-9 6 9z" fill="none" stroke="var(--lab-ice)" strokeWidth="1.6" />
            <Pedestrian x={676} base={360} />
          </g>

          {/* Detections belong to perception */}
          <g className="lab-layer lab-layer-perceive">
            <g className="lab-blink">
              <Corners x={658} y={294} w={36} h={70} color="var(--lab-red-hi)" />
            </g>
            <rect
              x="606"
              y="276"
              width="88"
              height="15"
              rx="3"
              fill="var(--lab-red)"
              fillOpacity=".92"
            />
            <text
              x="612"
              y="287"
              fontSize="9"
              fill="var(--lab-white)"
              letterSpacing=".6"
              className="lab-scene-text"
            >
              PERSON · T07
            </text>
            <Corners x={710} y={246} w={36} h={36} c={7} color="var(--lab-blue)" />
            <text
              x="745"
              y="240"
              fontSize="9"
              fill="var(--lab-blue)"
              letterSpacing=".6"
              textAnchor="end"
              className="lab-scene-text lab-fine"
            >
              SIGN
            </text>
            <text
              x="400"
              y="408"
              fontSize="9"
              fill="var(--lab-blue)"
              letterSpacing="1.4"
              className="lab-scene-text lab-fine"
            >
              DRIVABLE LANE
            </text>
          </g>

          {/* ── 02 REASON ────────────────────────────────────────────── */}
          <g className="lab-layer lab-layer-reason">
            {/* predicted pedestrian motion: stepping toward the lane */}
            <Pedestrian x={662} base={372} ghost={0.32} />
            <Pedestrian x={648} base={384} ghost={0.18} />
            <path
              d="M672 366C664 374 654 382 640 390"
              fill="none"
              stroke="var(--lab-ice)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              markerEnd={`url(#${id("arr")})`}
            />
            <text
              x="612"
              y="432"
              fontSize="9"
              fill="var(--lab-ice)"
              letterSpacing=".6"
              className="lab-scene-text lab-fine"
            >
              PREDICTED PATH
            </text>
            {/* sensor → fusion network link */}
            <path
              d={`M${SENSOR.x} ${SENSOR.y - 4}C${SENSOR.x + 20} 150 430 120 520 104`}
              fill="none"
              stroke="var(--lab-blue)"
              strokeOpacity=".7"
              strokeWidth="1.4"
              className="lab-flow"
            />
            <g transform="translate(520 22)">
              <rect
                width="220"
                height="150"
                rx="12"
                fill="#0A1A31"
                fillOpacity=".94"
                stroke="var(--lab-line)"
              />
              <text
                x="14"
                y="22"
                fontSize="10"
                fill="var(--lab-ice)"
                letterSpacing="1.6"
                className="lab-scene-text"
              >
                SENSOR FUSION
              </text>
              <circle cx="204" cy="18" r="3" fill="var(--lab-red-hi)" className="lab-pulse" />
              {(() => {
                const cols: [number, number[]][] = [
                  [58, [52, 84, 116]],
                  [112, [44, 70, 96, 122]],
                  [164, [56, 84, 112]],
                ];
                const edges: string[] = [];
                for (let c = 0; c < cols.length - 1; c++) {
                  for (const a of cols[c][1])
                    for (const b of cols[c + 1][1])
                      edges.push(`M${cols[c][0]} ${a}L${cols[c + 1][0]} ${b}`);
                }
                return (
                  <>
                    <path d={edges.join("")} stroke="var(--lab-blue)" strokeOpacity=".22" />
                    {/* active signal path: lidar → hidden → yield */}
                    <path
                      d="M58 84L112 96L164 112"
                      fill="none"
                      stroke="var(--lab-ice)"
                      strokeWidth="1.6"
                      className="lab-flow"
                    />
                    <path
                      d="M58 52L112 70L164 56"
                      fill="none"
                      stroke="var(--lab-blue)"
                      strokeWidth="1.2"
                      className="lab-flow-slow"
                    />
                    {cols.map(([x, ys], ci) =>
                      ys.map((y, k) => (
                        <circle
                          key={`${x}-${y}`}
                          cx={x}
                          cy={y}
                          r="4.5"
                          fill="var(--lab-navy)"
                          stroke={ci === 2 && k === 2 ? "var(--lab-red-hi)" : "var(--lab-blue)"}
                          strokeWidth="1.6"
                          className="lab-pulse"
                          style={{ animationDelay: `${((ci * 4 + k) % 4) * 0.4}s` }}
                        />
                      )),
                    )}
                    {["CAM", "LIDAR", "RADAR"].map((s, i) => (
                      <text
                        key={s}
                        x="46"
                        y={cols[0][1][i] + 3.5}
                        fontSize="8.5"
                        fill="var(--lab-steel)"
                        textAnchor="end"
                        className="lab-scene-text"
                      >
                        {s}
                      </text>
                    ))}
                    {["track", "predict", "yield"].map((s, i) => (
                      <text
                        key={s}
                        x="174"
                        y={cols[2][1][i] + 3.5}
                        fontSize="8.5"
                        fill={i === 2 ? "var(--lab-red-hi)" : "var(--lab-steel)"}
                        className="lab-scene-text"
                      >
                        {s}
                      </text>
                    ))}
                  </>
                );
              })()}
            </g>
          </g>

          {/* ── 03 ACT ───────────────────────────────────────────────── */}
          <g className="lab-layer lab-layer-act" key={phase === "act" ? `act-${cycle}` : "act"}>
            <path
              d="M384 392C450 392 520 394 590 395"
              fill="none"
              stroke="var(--lab-blue)"
              strokeWidth="2.6"
              pathLength={100}
              className="lab-draw"
            />
            <path
              d="M384 392C450 392 520 394 590 395"
              fill="none"
              stroke="var(--lab-ice)"
              strokeOpacity=".5"
              className="lab-flow"
            />
            {/* waypoints get closer together: the vehicle is slowing */}
            {[
              [430, 392, 0.75],
              [492, 393, 0.62],
              [538, 394, 0.5],
              [568, 394.6, 0.38],
            ].map(([x, y, o], i) => (
              <rect
                key={x}
                x={x - 9}
                y={y - 5}
                width="18"
                height="10"
                rx="2"
                fill="none"
                stroke="var(--lab-blue)"
                strokeOpacity={o}
                className="lab-enter-pop"
                style={{ "--lab-delay": `${0.5 + i * 0.12}s` } as CSSProperties}
              />
            ))}
            <path
              d="M598 366V414"
              stroke="var(--lab-red-hi)"
              strokeWidth="3"
              strokeLinecap="round"
              className="lab-enter-fade"
              style={{ "--lab-delay": "0.9s" } as CSSProperties}
            />
            <g className="lab-enter" style={{ "--lab-delay": "1s" } as CSSProperties}>
              <rect x="512" y="334" width="78" height="18" rx="4" fill="var(--lab-red)" />
              <text
                x="551"
                y="346.5"
                fontSize="9.5"
                fill="var(--lab-white)"
                textAnchor="middle"
                letterSpacing="1.4"
                className="lab-scene-text"
              >
                YIELD
              </text>
            </g>
          </g>

          {/* ── Ego vehicle (drawn last so it sits on top) ───────────── */}
          <g transform={CAR}>
            <ellipse cx="840" cy="420" rx="230" ry="12" fill={`url(#${id("shade")})`} />
            <path d={BODY} fill={`url(#${id("body")})`} stroke="#E6F0FB" strokeOpacity=".6" />
            <path d="M760 390H913V397H760Z" fill="#22344F" opacity=".75" />
            <path
              d="M668 364C780 360 900 360 1036 366"
              fill="none"
              stroke="#fff"
              strokeOpacity=".55"
              strokeWidth="1.2"
            />
            <path
              d="M706 347C742 331 774 317 804 311C844 303 880 303 906 310C936 319 962 332 986 346Z"
              fill={`url(#${id("glass")})`}
            />
            <path
              d="M736 336C780 318 830 309 880 309"
              fill="none"
              stroke="#7FC4FF"
              strokeOpacity=".35"
              strokeWidth="2"
            />
            <path d="M852 305V347" stroke="var(--lab-steel)" strokeOpacity=".5" strokeWidth="3" />
            <path d="M972 340l14-2 4 6-16 2z" fill="#7F96B4" />
            <path
              d="M806 356h16M902 356h16"
              stroke="#5E7595"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M1016 352C1028 355 1038 359 1045 366"
              fill="none"
              stroke="var(--lab-white)"
              strokeWidth="3"
              strokeLinecap="round"
              className="lab-blink"
            />
            <path
              d="M651 356C655 352 660 350 668 348"
              fill="none"
              stroke="var(--lab-red-hi)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="lab-brake"
            />
            <rect
              x="856"
              y="298"
              width="24"
              height="7"
              rx="3.5"
              fill="#0E2140"
              stroke="var(--lab-blue)"
            />
            <circle cx="868" cy="301.5" r="2" fill="var(--lab-blue)" className="lab-blink" />
            {[962, 712].map((wx) => (
              <g key={wx}>
                <circle cx={wx} cy="384" r="35" fill="#0A111D" stroke="#1C2A40" strokeWidth="2" />
                <circle cx={wx} cy="384" r="25" fill={`url(#${id("rim")})`} />
                <g className="lab-spin">
                  {SPOKES.map(([dx, dy]) => (
                    <path
                      key={`${dx}-${dy}`}
                      d={`M${wx} 384L${wx + dx} ${384 + dy}`}
                      stroke="#0E1A2E"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  ))}
                  <circle
                    cx={wx}
                    cy="384"
                    r="25"
                    fill="none"
                    stroke="#0E1A2E"
                    strokeWidth="2"
                    strokeDasharray="8 7"
                  />
                </g>
                <circle
                  cx={wx}
                  cy="384"
                  r="5"
                  fill="#0E1A2E"
                  stroke="var(--lab-blue)"
                  strokeOpacity=".7"
                />
              </g>
            ))}
          </g>

          {/* HUD (decorative) */}
          <g className="lab-fine">
            <text
              x="22"
              y="34"
              fontSize="10"
              fill="var(--lab-dim)"
              letterSpacing="1"
              className="lab-scene-text"
            >
              LOCALIZED 41.88°N 87.63°W
            </text>
            <path d="M22 44H198" stroke="var(--lab-line)" />
            <text
              x="22"
              y="60"
              fontSize="10"
              fill="var(--lab-dim)"
              letterSpacing="1"
              className="lab-scene-text"
            >
              MODE lane-keep · {shown === "all" ? "yield" : phase === "act" ? "yield" : "monitor"}
            </text>
          </g>
        </svg>
      </div>

      <div className="lab-scene-controls">
        <div
          className="lab-scene-phases"
          role="group"
          aria-label="System stage shown in the illustration"
        >
          {PHASES.map((p, i) => {
            const c = PHASE_COPY[p];
            const active = !reduced && i === phaseIndex;
            return (
              <button
                key={p}
                type="button"
                className="lab-phase-btn"
                data-phase={p}
                aria-pressed={active}
                onClick={() => select(i)}
              >
                <span className="lab-mono">{c.index}</span> {c.title}
                {active && autoplay && (
                  <span className="lab-phase-timer" key={cycle} aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
        {!reduced && (
          <button
            type="button"
            className="lab-icon-btn"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? "Resume the animation" : "Pause the animation"}
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        )}
      </div>
      <p className="lab-scene-caption">
        {reduced ? (
          <>
            <strong>Perceive, reason, act.</strong> The vehicle detects a pedestrian and a sign,
            fuses the evidence, predicts the pedestrian's path and plans to yield at the crossing.
          </>
        ) : (
          <>
            <strong
              style={{
                color:
                  phase === "act"
                    ? "var(--lab-red-hi)"
                    : phase === "reason"
                      ? "var(--lab-ice)"
                      : "var(--lab-blue)",
              }}
            >
              {copy.index} · {copy.title}.
            </strong>{" "}
            {copy.body}
          </>
        )}
      </p>
    </div>
  );
}
