// No Framer Motion  -  pure CSS keyframe animations so animation-play-state:paused
// works reliably when dn-engine-open is on <html>. Framer Motion uses the Web
// Animations API and ignores CSS animation-play-state entirely.

import { useEffect, useState, type CSSProperties } from "react";
import { createPathfindingProblem } from "@/lib/pathfinding";

const particles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: 2 + (index % 4),
  delay: (index % 8) * 0.45,
  duration: 10 + (index % 7),
}));

const nodes = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  left: `${10 + ((index * 11) % 78)}%`,
  top: `${12 + ((index * 17) % 72)}%`,
  delay: index * 0.6,
}));

const GRAPH_CYCLE_MS = 10000;
const TEST_GRAPH_CYCLE_MS = 5200;

const astarShowcaseNodes = [
  { id: 0, left: "7%", top: "70%", delay: "0s" },
  { id: 1, left: "21%", top: "50%", delay: "0.18s" },
  { id: 2, left: "38%", top: "58%", delay: "0.36s" },
  { id: 3, left: "55%", top: "43%", delay: "0.54s" },
  { id: 4, left: "74%", top: "51%", delay: "0.72s" },
  { id: 5, left: "92%", top: "33%", delay: "0.9s" },
];

const astarShowcaseSegments = [
  { id: 0, left: "7%", top: "70%", width: "22%", rotate: "-26deg", delay: "0s" },
  { id: 1, left: "21%", top: "50%", width: "18%", rotate: "9deg", delay: "0.16s" },
  { id: 2, left: "38%", top: "58%", width: "22%", rotate: "-18deg", delay: "0.32s" },
  { id: 3, left: "55%", top: "43%", width: "21%", rotate: "12deg", delay: "0.48s" },
  { id: 4, left: "74%", top: "51%", width: "24%", rotate: "-28deg", delay: "0.64s" },
];

function AstarShowcaseOverlay() {
  return (
    <div className="astar-showcase-overlay" aria-hidden="true">
      {astarShowcaseSegments.map((segment) => (
        <span
          key={segment.id}
          className="astar-showcase-segment"
          style={
            {
              left: segment.left,
              top: segment.top,
              width: segment.width,
              rotate: segment.rotate,
              "--astar-delay": segment.delay,
            } as CSSProperties
          }
        />
      ))}
      {astarShowcaseNodes.map((node) => (
        <span
          key={node.id}
          className={`astar-showcase-node ${
            node.id === 0 ? "astar-showcase-node-start" : node.id === 5 ? "astar-showcase-node-goal" : ""
          }`}
          style={
            {
              left: node.left,
              top: node.top,
              "--astar-delay": node.delay,
            } as CSSProperties
          }
        />
      ))}
      <span className="astar-showcase-runner" />
    </div>
  );
}

function PathfindingGraph({
  showMetrics = true,
  testMode = false,
}: {
  showMetrics?: boolean;
  testMode?: boolean;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [problem, setProblem] = useState(createPathfindingProblem);
  const [telemetryProblem, setTelemetryProblem] = useState(problem);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      if (!document.hidden && !document.documentElement.classList.contains("dn-engine-open")) {
        setProblem(createPathfindingProblem());
      }
    }, testMode ? TEST_GRAPH_CYCLE_MS : GRAPH_CYCLE_MS);

    return () => window.clearInterval(interval);
  }, [reduceMotion, testMode]);

  const solutionDelay = 1.2 + problem.explored.length * 0.1;

  useEffect(() => {
    if (reduceMotion) {
      setTelemetryProblem(problem);
      return;
    }

    const telemetryDelayMs = Math.round((solutionDelay + 0.9) * 1000);
    const timeout = window.setTimeout(() => {
      setTelemetryProblem(problem);
    }, telemetryDelayMs);

    return () => window.clearTimeout(timeout);
  }, [problem, reduceMotion, solutionDelay]);

  const exploredStep = new Map(problem.explored.map((nodeId, index) => [nodeId, index]));
  const solutionPoints = problem.path
    .map((nodeId) => {
      const node = problem.nodes[nodeId];
      return `${node.x},${node.y}`;
    })
    .join(" ");
  const solutionPath = problem.path
    .map((nodeId, index) => {
      const node = problem.nodes[nodeId];
      return `${index === 0 ? "M" : "L"} ${node.x} ${node.y}`;
    })
    .join(" ");
  const routeHops = Math.max(telemetryProblem.path.length - 1, 0);
  const exploredCoverage = Math.round(
    (telemetryProblem.explored.length / telemetryProblem.nodes.length) * 100,
  );
  const detourPercent = Math.max(
    0,
    Math.round(
      (telemetryProblem.distance / Math.max(telemetryProblem.heuristicEstimate, 1) - 1) * 100,
    ),
  );
  const meanRouteEdge = routeHops > 0 ? Math.round(telemetryProblem.distance / routeHops) : 0;
  const meanBranching = (
    (telemetryProblem.edges.length * 2) /
    telemetryProblem.nodes.length
  ).toFixed(1);

  return (
    <div
      key={problem.id}
      className={`pathfinding-simulation absolute inset-0 ${
        testMode ? "pathfinding-simulation-test" : ""
      }`}
      style={{ "--solution-delay": `${solutionDelay}s` } as CSSProperties}
    >
      <svg
        className="pathfinding-canvas"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        role="presentation"
      >
        <defs>
          <linearGradient id={`route-gradient-${problem.id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="58%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#e23d67" />
          </linearGradient>
          <filter id={`route-glow-${problem.id}`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id={`route-reveal-${problem.id}`}>
            <rect
              className="pathfinding-solution-reveal"
              x="0"
              y="0"
              width={reduceMotion ? 1000 : 0}
              height="600"
            >
              {!reduceMotion && (
                <animate
                  attributeName="width"
                  from="0"
                  to="1000"
                  dur="0.9s"
                  begin={`${solutionDelay}s`}
                  fill="freeze"
                />
              )}
            </rect>
          </clipPath>
        </defs>

        <g className="pathfinding-edges">
          {problem.edges.map((edge, index) => {
            const from = problem.nodes[edge.from];
            const to = problem.nodes[edge.to];
            const probeStep = Math.max(
              exploredStep.get(edge.from) ?? 0,
              exploredStep.get(edge.to) ?? 0,
            );

            return (
              <line
                key={edge.id}
                className="pathfinding-edge"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                style={
                  {
                    "--edge-delay": `${index * 0.018}s`,
                    "--probe-delay": `${0.8 + probeStep * 0.1}s`,
                  } as CSSProperties
                }
              />
            );
          })}
        </g>

        <g className="pathfinding-solution">
          <path
            id={`route-motion-${problem.id}`}
            className="pathfinding-solution-track"
            d={solutionPath}
            pathLength="1"
            fill="none"
            stroke={testMode ? "rgba(34, 211, 238, 0.82)" : "transparent"}
            strokeWidth={testMode ? 24 : 0}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            className="pathfinding-solution-edge"
            points={solutionPoints}
            pathLength="1"
            fill="none"
            stroke={`url(#route-gradient-${problem.id})`}
            strokeWidth={testMode ? 13 : undefined}
            strokeDasharray={testMode ? "32 20" : undefined}
            filter={`url(#route-glow-${problem.id})`}
            clipPath={testMode ? undefined : `url(#route-reveal-${problem.id})`}
            data-path-end-node={problem.path.at(-1)}
            data-path-end-x={problem.nodes[problem.path.at(-1) ?? 0].x}
          />
          {testMode && (
            <g className="pathfinding-route-runner">
              <circle className="pathfinding-route-runner-glow" r="18" />
              <circle className="pathfinding-route-runner-core" r="5.5" />
              <animateMotion
                dur="2.4s"
                begin="0s"
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href={`#route-motion-${problem.id}`} />
              </animateMotion>
            </g>
          )}
        </g>

        <g className="pathfinding-nodes">
          {problem.nodes.map((node) => {
            const nodeStep = exploredStep.get(node.id) ?? problem.explored.length;
            const pathStep = problem.path.indexOf(node.id);
            const endpoint = node.id === 0 || node.id === 17;

            return (
              <g
                key={node.id}
                className={`pathfinding-node ${pathStep >= 0 ? "pathfinding-node-route" : ""}`}
                transform={`translate(${node.x} ${node.y})`}
                style={
                  {
                    "--node-delay": `${0.75 + nodeStep * 0.1}s`,
                    "--pulse-delay": `${nodeStep * 0.09}s`,
                    "--route-node-delay": `${solutionDelay + Math.max(pathStep, 0) * 0.15}s`,
                  } as CSSProperties
                }
              >
                <circle className="pathfinding-node-pulse" r={endpoint ? 14 : 10} />
                <circle className="pathfinding-node-core" r={endpoint ? 5.5 : 3.8} />
              </g>
            );
          })}
        </g>

        {testMode && (
          <g className="pathfinding-test-route-overlay">
            {problem.path.slice(1).map((nodeId, index) => {
              const from = problem.nodes[problem.path[index]];
              const to = problem.nodes[nodeId];

              return (
                <line
                  key={`${from.id}-${to.id}`}
                  className="pathfinding-test-route-segment"
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={index === problem.path.length - 2 ? "#e23d67" : "#22d3ee"}
                  strokeWidth={16}
                  strokeLinecap="round"
                  opacity={0.92}
                  style={{ "--route-segment-delay": `${index * 0.14}s` } as CSSProperties}
                />
              );
            })}
          </g>
        )}
      </svg>

      {showMetrics && (
        <div className="pathfinding-status pathfinding-status-metrics">
          <div className="pathfinding-status-title">A* route telemetry</div>
          <div className="pathfinding-status-grid">
            <span>g cost {telemetryProblem.distance}</span>
            <span>h0 direct {telemetryProblem.heuristicEstimate}</span>
            <span>f goal {telemetryProblem.estimatedTotal}</span>
            <span>detour +{detourPercent}%</span>
            <span>{telemetryProblem.explored.length}/{telemetryProblem.nodes.length} scanned</span>
            <span>{exploredCoverage}% coverage</span>
            <span>{routeHops} hops</span>
            <span>{telemetryProblem.edges.length} links</span>
          </div>
          <div className="pathfinding-status-foot">
            avg edge {meanRouteEdge} · branch factor {meanBranching}
          </div>
        </div>
      )}

      {false && testMode && (
        <div className="astar-test-badge">
          <div className="astar-test-badge-header">
            <span>A* simulation</span>
            <span>telemetry</span>
          </div>
          <div className="astar-test-badge-grid">
            <span>
              <b>{problem.distance}</b>
              g cost
            </span>
            <span>
              <b>{problem.heuristicEstimate}</b>
              h0 direct
            </span>
            <span>
              <b>{problem.estimatedTotal}</b>
              f goal
            </span>
            <span>
              <b>+{detourPercent}%</b>
              detour
            </span>
            <span>
              <b>
                {problem.explored.length}/{problem.nodes.length}
              </b>
              scanned
            </span>
            <span>
              <b>{exploredCoverage}%</b>
              coverage
            </span>
            <span>
              <b>{routeHops}</b>
              hops
            </span>
            <span>
              <b>{problem.edges.length}</b>
              links
            </span>
          </div>
          <div className="astar-test-badge-foot">
            avg edge {meanRouteEdge} - branch factor {meanBranching}
          </div>
        </div>
      )}
    </div>
  );
}

type AnimatedBackgroundProps = {
  testMode?: boolean;
};

export function AnimatedBackground({ testMode = false }: AnimatedBackgroundProps) {
  return (
    <div
      className={`background-layer fixed inset-0 ${
        testMode ? "background-test-layer" : "-z-10"
      } overflow-hidden pointer-events-none`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.18),transparent_42%),radial-gradient(ellipse_at_top_right,rgba(146,18,51,0.22),transparent_45%),linear-gradient(180deg,#071026,#050816)]" />
      <div className="absolute inset-0 grid-bg opacity-75" />
      <div className="absolute inset-0 neural-grid opacity-44" />
      <div className="absolute inset-0 sensor-fusion-radar opacity-18" />
      <div className="absolute inset-0 scanline-overlay opacity-12" />

      <div className="bg-orb bg-orb-a absolute -top-40 -left-36 h-[560px] w-[560px] rounded-full blur-3xl" />
      <div className="bg-orb bg-orb-b absolute top-1/4 -right-44 h-[620px] w-[620px] rounded-full blur-3xl" />
      <div className="bg-orb bg-orb-c absolute bottom-[-12rem] left-[36%] h-[540px] w-[540px] rounded-full blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="holographic-lyriq" aria-hidden="true">
          <div className="lyriq-road-layer">
            <span className="lyriq-road lyriq-road-a" />
            <span className="lyriq-road lyriq-road-b" />
          </div>
          <div className="lyriq-car">
            <span className="lyriq-underglow" />
            <span className="lyriq-airflow lyriq-airflow-a" />
            <span className="lyriq-airflow lyriq-airflow-b" />
            <span className="lyriq-airflow lyriq-airflow-c" />
            <span className="lyriq-sensor-halo lyriq-sensor-halo-front" />
            <span className="lyriq-sensor-halo lyriq-sensor-halo-rear" />
            <div className="lyriq-visual-frame">
              <img
                className="lyriq-outline-img lyriq-reference-img"
                src="/portfolio_images/shared/approved_reference_suv_car_overlay.png"
                alt=""
                loading="eager"
                decoding="async"
              />
              <span className="lyriq-hood-line" aria-hidden="true" />
              <span className="lyriq-cabin-divider lyriq-cabin-divider-b" aria-hidden="true" />
              <span className="lyriq-cabin-divider lyriq-cabin-divider-c" aria-hidden="true" />
              <span className="lyriq-cabin-divider lyriq-cabin-divider-d" aria-hidden="true" />
              <span className="lyriq-front-light-glow" aria-hidden="true" />
              <span className="lyriq-rear-light-glow" aria-hidden="true" />
              <div className="lyriq-wheel-overlay lyriq-wheel-overlay-front" aria-hidden="true">
                <span className="lyriq-wheel-overlay-spokes" />
                <span className="lyriq-wheel-overlay-hub" />
              </div>
              <div className="lyriq-wheel-overlay lyriq-wheel-overlay-rear" aria-hidden="true">
                <span className="lyriq-wheel-overlay-spokes" />
                <span className="lyriq-wheel-overlay-hub" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PathfindingGraph showMetrics={!testMode} testMode={testMode} />
      {testMode && <AstarShowcaseOverlay />}

      {particles.map((p) => (
        <span
          key={p.id}
          className={`bg-particle ${p.id % 2 === 0 ? "bg-particle-l" : "bg-particle-r"} absolute rounded-full`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {nodes.map((n) => (
        <span
          key={n.id}
          className="bg-node absolute"
          style={{ left: n.left, top: n.top, animationDelay: `${n.delay}s` }}
        />
      ))}
    </div>
  );
}
