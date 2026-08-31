// No Framer Motion  -  pure CSS keyframe animations so animation-play-state:paused
// works reliably when dn-engine-open is on <html>. Framer Motion uses the Web
// Animations API and ignores CSS animation-play-state entirely.

import { useEffect, useReducer, useRef, useState, type CSSProperties } from "react";
import { createPathfindingProblem } from "@/lib/pathfinding";

const particles = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: 2 + (index % 4),
  delay: (index % 8) * 0.45,
  duration: 10 + (index % 7),
}));

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

function AmbientNeuralNetwork() {
  return (
    <svg
      className="ambient-neural-network"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden="true"
    >
      <g className="ambient-network-links">
        <path
          className="ambient-network-link"
          d="M 28 478 L 168 348 L 314 426 L 456 258 L 604 344 L 758 186 L 946 292"
        />
        <path
          className="ambient-network-link"
          d="M 92 102 L 224 212 L 392 132 L 538 224 L 698 98 L 846 168"
        />
        <path
          className="ambient-network-link"
          d="M 168 348 L 224 212 M 314 426 L 392 132 M 456 258 L 538 224 M 604 344 L 698 98 M 758 186 L 846 168"
        />
        <path
          className="ambient-network-signal"
          d="M 28 478 L 168 348 L 314 426 L 456 258 L 604 344 L 758 186 L 946 292"
        />
      </g>
      <g className="ambient-network-nodes">
        <circle className="ambient-network-node" cx="28" cy="478" r="5" />
        <circle className="ambient-network-node" cx="92" cy="102" r="4" />
        <circle className="ambient-network-node" cx="168" cy="348" r="6" />
        <circle className="ambient-network-node" cx="224" cy="212" r="4" />
        <circle className="ambient-network-node" cx="314" cy="426" r="5" />
        <circle className="ambient-network-node" cx="392" cy="132" r="4" />
        <circle
          className="ambient-network-node ambient-network-node-accent"
          cx="456"
          cy="258"
          r="6"
        />
        <circle className="ambient-network-node" cx="538" cy="224" r="4" />
        <circle className="ambient-network-node" cx="604" cy="344" r="5" />
        <circle className="ambient-network-node" cx="698" cy="98" r="4" />
        <circle
          className="ambient-network-node ambient-network-node-accent"
          cx="758"
          cy="186"
          r="6"
        />
        <circle className="ambient-network-node" cx="846" cy="168" r="4" />
        <circle
          className="ambient-network-node ambient-network-node-goal"
          cx="946"
          cy="292"
          r="6"
        />
      </g>
    </svg>
  );
}

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
            node.id === 0
              ? "astar-showcase-node-start"
              : node.id === 5
                ? "astar-showcase-node-goal"
                : ""
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
  isActive = true,
  testMode = false,
}: {
  isActive?: boolean;
  testMode?: boolean;
}) {
  const [activeProblem, setActiveProblem] = useState(createPathfindingProblem);
  // useReducer tick forces animation-restart on metric elements without remounting the SVG
  const [revealKey, bumpReveal] = useReducer((n: number) => n + 1, 0);
  const telemetryProblem = activeProblem;
  const solutionDelay = 1.55;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!isActive || mediaQuery.matches) return;

    const cycleTimer = window.setTimeout(() => {
      setActiveProblem(createPathfindingProblem());
      bumpReveal();
    }, (solutionDelay + 1.7) * 1_000);

    return () => window.clearTimeout(cycleTimer);
  }, [activeProblem.id, isActive, solutionDelay]);

  const exploredStep = new Map(activeProblem.explored.map((nodeId, index) => [nodeId, index]));
  const solutionPoints = activeProblem.path
    .map((nodeId) => {
      const node = activeProblem.nodes[nodeId];
      return `${node.x},${node.y}`;
    })
    .join(" ");
  const solutionPath = activeProblem.path
    .map((nodeId, index) => {
      const node = activeProblem.nodes[nodeId];
      return `${index === 0 ? "M" : "L"} ${node.x} ${node.y}`;
    })
    .join(" ");
  const routeHops = Math.max(activeProblem.path.length - 1, 0);
  const exploredCoverage = Math.round(
    (activeProblem.explored.length / activeProblem.nodes.length) * 100,
  );
  const detourPercent = Math.max(
    0,
    Math.round((activeProblem.distance / Math.max(activeProblem.heuristicEstimate, 1) - 1) * 100),
  );
  const meanRouteEdge = routeHops > 0 ? Math.round(telemetryProblem.distance / routeHops) : 0;
  const meanBranching = ((activeProblem.edges.length * 2) / activeProblem.nodes.length).toFixed(1);

  return (
    <div
      className={`pathfinding-simulation absolute inset-0 ${isActive ? "is-active" : ""} ${
        testMode ? "pathfinding-simulation-test" : ""
      }`}
      style={{ "--solution-delay": `${solutionDelay}s` } as CSSProperties}
    >
      {/* SVG stays mounted across problem cycles — only inner groups are re-keyed so
          CSS animations restart without a full SVG teardown + rebuild. */}
      <svg
        className="pathfinding-canvas"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        role="presentation"
      >
        <defs>
          <linearGradient id="route-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="58%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#e23d67" />
          </linearGradient>
          <filter id="route-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="route-reveal">
            {/* keyed so the animation-driven reveal rect restarts on each new problem */}
            <rect
              key={revealKey}
              className="pathfinding-solution-reveal"
              x="0"
              y="0"
              width="1000"
              height="600"
            />
          </clipPath>
        </defs>

        <g key={`edges-${activeProblem.id}`} className="pathfinding-edges">
          {activeProblem.edges.map((edge, index) => {
            const from = activeProblem.nodes[edge.from];
            const to = activeProblem.nodes[edge.to];

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
                    "--edge-delay": `${index * 0.012}s`,
                    "--probe-delay": `${0.08 + (index % 4) * 0.045}s`,
                  } as CSSProperties
                }
              />
            );
          })}
        </g>

        <g key={`solution-${activeProblem.id}`} className="pathfinding-solution">
          <path
            id="route-motion"
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
            stroke="url(#route-gradient)"
            strokeWidth={testMode ? 13 : undefined}
            strokeDasharray={testMode ? "32 20" : undefined}
            filter={testMode ? "url(#route-glow)" : undefined}
            clipPath={testMode ? undefined : "url(#route-reveal)"}
            data-path-end-node={activeProblem.path.at(-1)}
            data-path-end-x={activeProblem.nodes[activeProblem.path.at(-1) ?? 0].x}
          />
          {testMode && (
            <g className="pathfinding-route-runner">
              <circle className="pathfinding-route-runner-glow" r="18" />
              <circle className="pathfinding-route-runner-core" r="5.5" />
              <animateMotion dur="2.4s" begin="0s" repeatCount="indefinite" rotate="auto">
                <mpath href="#route-motion" />
              </animateMotion>
            </g>
          )}
        </g>

        <g key={`nodes-${activeProblem.id}`} className="pathfinding-nodes">
          {activeProblem.nodes.map((node) => {
            const nodeStep = exploredStep.get(node.id) ?? activeProblem.explored.length;
            const pathStep = activeProblem.path.indexOf(node.id);
            const endpoint = node.id === 0 || node.id === 17;

            return (
              <g
                key={node.id}
                className={`pathfinding-node ${pathStep >= 0 ? "pathfinding-node-route" : ""}`}
                transform={`translate(${node.x} ${node.y})`}
                style={
                  {
                    "--node-delay": `${0.12 + nodeStep * 0.045}s`,
                    "--pulse-delay": `${0.08 + nodeStep * 0.055}s`,
                    "--route-node-delay": `${solutionDelay + Math.max(pathStep, 0) * 0.09}s`,
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
          <g key={`test-${activeProblem.id}`} className="pathfinding-test-route-overlay">
            {activeProblem.path.slice(1).map((nodeId, index) => {
              const from = activeProblem.nodes[activeProblem.path[index]];
              const to = activeProblem.nodes[nodeId];

              return (
                <line
                  key={`${from.id}-${to.id}`}
                  className="pathfinding-test-route-segment"
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={index === activeProblem.path.length - 2 ? "#e23d67" : "#22d3ee"}
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

      {!testMode && (
        <div className="pathfinding-status pathfinding-status-metrics">
          <div className="pathfinding-status-title">A* route telemetry</div>
          <div className="pathfinding-status-grid">
            <span>g cost {telemetryProblem.distance}</span>
            <span>h0 direct {telemetryProblem.heuristicEstimate}</span>
            <span>f goal {telemetryProblem.estimatedTotal}</span>
            <span>detour +{detourPercent}%</span>
            <span>
              {telemetryProblem.explored.length}/{telemetryProblem.nodes.length} scanned
            </span>
            <span>{exploredCoverage}% coverage</span>
            <span>{routeHops} hops</span>
            <span>{telemetryProblem.edges.length} links</span>
          </div>
          <div className="pathfinding-status-foot">
            avg edge {meanRouteEdge} · branch factor {meanBranching}
          </div>
        </div>
      )}
    </div>
  );
}

type AnimatedBackgroundProps = {
  testMode?: boolean;
};

type SymbolismCarPhase = "idle" | "entering" | "active" | "exiting";

export function AnimatedBackground({ testMode = false }: AnimatedBackgroundProps) {
  const [symbolismActive, setSymbolismActive] = useState(false);
  const [carPhase, setCarPhase] = useState<SymbolismCarPhase>("idle");
  const carPhaseTimerRef = useRef<number | null>(null);
  const hasVisitedSymbolismRef = useRef(false);
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState !== "hidden",
  );

  useEffect(() => {
    const root = document.documentElement;
    const syncSymbolismState = () => {
      setSymbolismActive(root.classList.contains("symbolism-active"));
    };
    const syncVisibility = () => {
      setDocumentVisible(document.visibilityState !== "hidden");
    };

    const classObserver = new MutationObserver(syncSymbolismState);
    classObserver.observe(root, { attributes: true, attributeFilter: ["class"] });
    document.addEventListener("visibilitychange", syncVisibility);
    syncSymbolismState();
    syncVisibility();

    return () => {
      classObserver.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (carPhaseTimerRef.current !== null) {
      window.clearTimeout(carPhaseTimerRef.current);
      carPhaseTimerRef.current = null;
    }

    if (symbolismActive) {
      hasVisitedSymbolismRef.current = true;
      setCarPhase("entering");
      carPhaseTimerRef.current = window.setTimeout(() => {
        setCarPhase("active");
        carPhaseTimerRef.current = null;
      }, 4_800);
    } else if (hasVisitedSymbolismRef.current) {
      setCarPhase("exiting");
      carPhaseTimerRef.current = window.setTimeout(() => {
        setCarPhase("idle");
        carPhaseTimerRef.current = null;
      }, 3_600);
    }

    return () => {
      if (carPhaseTimerRef.current !== null) {
        window.clearTimeout(carPhaseTimerRef.current);
        carPhaseTimerRef.current = null;
      }
    };
  }, [symbolismActive]);

  const showcaseActive = symbolismActive && documentVisible;

  return (
    <div
      className={`background-layer symbolism-car-${carPhase} fixed inset-0 ${
        testMode ? "background-test-layer" : "-z-10"
      } overflow-hidden pointer-events-none`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.18),transparent_42%),radial-gradient(ellipse_at_top_right,rgba(146,18,51,0.22),transparent_45%),linear-gradient(180deg,#071026,#050816)]" />
      <div className="absolute inset-0 grid-bg opacity-75" />
      <div className="absolute inset-0 neural-grid opacity-44" />
      <div className="absolute inset-0 sensor-fusion-radar opacity-18" />
      <div className="absolute inset-0 scanline-overlay opacity-12" />
      <AmbientNeuralNetwork />

      <div className="bg-orb bg-orb-a absolute -top-40 -left-36 h-[560px] w-[560px] rounded-full" />
      <div className="bg-orb bg-orb-b absolute top-1/4 -right-44 h-[620px] w-[620px] rounded-full" />
      <div className="bg-orb bg-orb-c absolute bottom-[-12rem] left-[36%] h-[540px] w-[540px] rounded-full" />

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

      {testMode ? (
        <PathfindingGraph isActive testMode />
      ) : (
        <PathfindingGraph isActive={showcaseActive} />
      )}
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
    </div>
  );
}
