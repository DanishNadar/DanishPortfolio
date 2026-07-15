import { Link } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Bot,
  Box,
  Check,
  ChevronRight,
  CircleHelp,
  Expand,
  Gamepad2,
  Grid3X3,
  Map,
  Maximize,
  RotateCcw,
  Settings2,
  Sparkles,
  X,
} from "lucide-react";
import { CATEGORY_ORDER, MAJOR_NODE_IDS, MISSION_BY_ID, NODE_BY_ID } from "./level";
import { ExperienceErrorBoundary } from "./ExperienceErrorBoundary";
import { MissionPicker } from "./MissionPicker";
import { SkillStoryWindow } from "./SkillStoryWindow";
import { useIntelligenceStackGame } from "./useIntelligenceStackGame";
import { WebGLFallback } from "./WebGLFallback";
import type { QualityMode, StackMission } from "./types";
import "./intelligence-stack.css";

const ExperienceCanvas = lazy(() =>
  import("./ExperienceCanvas").then((module) => ({ default: module.ExperienceCanvas })),
);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function detectAutoQuality(): QualityMode {
  const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number };
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const memory = navigatorWithMemory.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 6;
  if (coarsePointer || memory <= 4 || cores <= 4 || window.devicePixelRatio > 2.2) return "low";
  return "auto";
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

export function IntelligenceStackPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [webglStatus, setWebglStatus] = useState<"checking" | "available" | "unavailable">(
    "checking",
  );
  const [sceneReady, setSceneReady] = useState(false);
  const [quality, setQuality] = useState<QualityMode>("auto");
  const [autoQuality, setAutoQuality] = useState<QualityMode>("auto");
  const [showHelp, setShowHelp] = useState(false);
  const [showMissions, setShowMissions] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [missionId, setMissionId] = useState<StackMission["id"]>("foundation-run");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraResetToken, setCameraResetToken] = useState(0);
  const reducedMotion = useReducedMotion();
  const lastStoryNodeId = useRef<string | null>(null);
  const mission = MISSION_BY_ID.get(missionId)!;
  const game = useIntelligenceStackGame({ mission, reducedMotion });
  const effectiveQuality = quality === "auto" ? autoQuality : quality;
  const connectedNodeIds = useMemo(() => new Set(game.linkedNodeIds), [game.linkedNodeIds]);

  useEffect(() => {
    setWebglStatus(supportsWebGL() ? "available" : "unavailable");
    setAutoQuality(detectAutoQuality());
  }, []);

  useEffect(() => {
    if (!game.hasBegun) {
      lastStoryNodeId.current = null;
      setStoryOpen(false);
      return;
    }
    if (lastStoryNodeId.current === game.currentNodeId) return;
    lastStoryNodeId.current = game.currentNodeId;
    setStoryOpen(true);
  }, [game.currentNodeId, game.hasBegun]);

  useEffect(() => {
    const updateFullscreen = () => setIsFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", updateFullscreen);
    return () => document.removeEventListener("fullscreenchange", updateFullscreen);
  }, []);

  const activatedMajorIds = useMemo(
    () => MAJOR_NODE_IDS.filter((nodeId) => game.activatedIds.has(nodeId)),
    [game.activatedIds],
  );

  const resetExperience = useCallback(() => {
    game.reset();
    setCameraResetToken((value) => value + 1);
  }, [game]);

  const resetCamera = useCallback(() => setCameraResetToken((value) => value + 1), []);

  const selectMission = (nextMissionId: StackMission["id"]) => {
    game.reset();
    setMissionId(nextMissionId);
    setShowMissions(false);
    setStoryOpen(false);
    setCameraResetToken((value) => value + 1);
  };

  const selectRoute = game.attemptMoveTo;

  const toggleFullscreen = useCallback(async () => {
    if (!rootRef.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen?.();
      return;
    }
    await rootRef.current.requestFullscreen?.();
  }, []);

  if (webglStatus === "unavailable") return <WebGLFallback />;

  return (
    <div ref={rootRef} className={"intelligence-stack-page" + (game.hasBegun ? " is-playing" : "")}>
      <div className="intelligence-stack-radial-glow glow-blue" aria-hidden="true" />
      <div className="intelligence-stack-radial-glow glow-red" aria-hidden="true" />
      <div className="intelligence-stack-scanlines" aria-hidden="true" />

      <ExperienceErrorBoundary fallback={<WebGLFallback />}>
        {webglStatus === "available" ? (
          <Suspense
            fallback={
              <div className="intelligence-stack-loader" role="status" aria-live="polite">
                <span className="intelligence-stack-loader-orbit" />
                Loading 3D systems…
              </div>
            }
          >
            <ExperienceCanvas
              activatedIds={game.activatedIds}
              cameraResetToken={cameraResetToken}
              connectedNodeIds={connectedNodeIds}
              currentNodeId={game.currentNodeId}
              hasBegun={game.hasBegun}
              isComplete={game.isComplete}
              jump={game.jump}
              layout={mission.layout}
              onJumpEnd={game.finishJump}
              onNavigate={selectRoute}
              onSceneReady={() => setSceneReady(true)}
              objectiveNodeId={mission.objectiveNodeId}
              quality={effectiveQuality}
              reducedMotion={reducedMotion}
              resetToken={game.resetToken}
              selectedNodeId={game.selectedNodeId}
            />
          </Suspense>
        ) : (
          <div className="intelligence-stack-loader" role="status" aria-live="polite">
            <span className="intelligence-stack-loader-orbit" />
            Preparing the Intelligence Stack…
          </div>
        )}
      </ExperienceErrorBoundary>

      <header className="intelligence-stack-header">
        <Link to="/" className="intelligence-stack-back-link" aria-label="Back to portfolio">
          <ArrowLeft size={16} /> <span>Portfolio</span>
        </Link>
        <div className="intelligence-stack-title">
          <div className="intelligence-stack-eyebrow">
            <Box size={14} /> Navigating the journey
          </div>
          <h1>THE STORY OF THE STACK</h1>
          <p>Navigate the systems behind my work.</p>
        </div>
        <div className="intelligence-stack-header-actions">
          <button
            type="button"
            className="intelligence-stack-icon-button"
            onClick={() => setShowHelp(true)}
            aria-label="Open controls help"
          >
            <CircleHelp size={17} />
          </button>
          <button
            type="button"
            className="intelligence-stack-icon-button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Expand size={17} /> : <Maximize size={17} />}
          </button>
        </div>
      </header>

      <section className="intelligence-stack-progress" aria-label="Systems activated progress">
        <div className="intelligence-stack-progress-heading">
          <span>Systems Activated</span>
          <strong>
            {activatedMajorIds.length} / {MAJOR_NODE_IDS.length}
          </strong>
        </div>
        <div className="intelligence-stack-mission-status">
          <span>{mission.label}</span>
          <strong>{mission.objectiveLabel}</strong>
          <small>Case file: {mission.caseFile}</small>
          <div className="intelligence-stack-evidence-progress">
            <span>Evidence</span>
            <strong>
              {game.missionEvidenceFound} / {game.missionEvidenceTotal}
            </strong>
          </div>
        </div>
        <div className="intelligence-stack-progress-track">
          {CATEGORY_ORDER.map((category) => {
            const node = Array.from(NODE_BY_ID.values()).find(
              (item) => item.category === category && item.major,
            );
            const active = node ? game.activatedIds.has(node.id) : false;
            return (
              <div
                key={category}
                className={"intelligence-stack-progress-node" + (active ? " is-active" : "")}
              >
                <span aria-hidden="true">{active ? <Check size={12} /> : <span />}</span>
                <small>{category}</small>
              </div>
            );
          })}
        </div>
      </section>

      {storyOpen && (
        <SkillStoryWindow node={game.currentNode} onClose={() => setStoryOpen(false)} />
      )}

      <div key={game.feedback} className="intelligence-stack-feedback" aria-live="polite">
        <span className="intelligence-stack-feedback-dot" />
        {game.feedback}
      </div>

      <div className="intelligence-stack-controls">
        {game.hasBegun && !game.isComplete ? (
          <section className="intelligence-stack-command-deck" aria-label="Available moves">
            <div className="intelligence-stack-command-heading">
              <span>Case routes</span>
              <strong>From {game.currentNode.label}</strong>
            </div>
            <div className="intelligence-stack-key-guide" aria-label="Keyboard destinations">
              {game.keyBindings.map((binding) => {
                const target = binding.targetNodeId
                  ? NODE_BY_ID.get(binding.targetNodeId)
                  : undefined;
                return (
                  <span key={binding.direction} className={target ? "" : "is-unavailable"}>
                    <b>{binding.label}</b>
                    <em>{target ? `→ ${target.label}` : "→ no route"}</em>
                  </span>
                );
              })}
            </div>
            <div className="intelligence-stack-command-list">
              {game.linkedNodeIds.map((nodeId, index) => {
                const node = NODE_BY_ID.get(nodeId)!;
                const missing = node.prerequisiteIds
                  .filter((prerequisiteId) => !game.activatedIds.has(prerequisiteId))
                  .map((prerequisiteId) => NODE_BY_ID.get(prerequisiteId)!.label);
                const locked = missing.length > 0;

                return (
                  <button
                    key={node.id}
                    type="button"
                    className={"intelligence-stack-command" + (locked ? " is-locked" : "")}
                    onClick={() => selectRoute(node.id)}
                  >
                    <span className="intelligence-stack-command-key">{index + 1}</span>
                    <span className="intelligence-stack-command-copy">
                      <strong>
                        {game.activatedIds.has(node.id) ? "Revisit" : "Investigate"} {node.label}
                      </strong>
                      <small>
                        {locked
                          ? `Encrypted · need ${missing.join(", ")}`
                          : game.activatedIds.has(node.id)
                            ? "Evidence already recovered"
                            : "Evidence lead available"}
                      </small>
                    </span>
                    <ChevronRight size={15} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
            <div className="intelligence-stack-investigation-lead">
              <span>Live lead</span>
              <p>{game.investigationLead}</p>
            </div>
            <p>WASD and arrows follow this guide. Click a lit cube or press 1–4 for a route.</p>
          </section>
        ) : (
          <div className="intelligence-stack-command-hint">
            <b>ROUTE GUIDE</b> Named moves appear here when the journey begins.
          </div>
        )}
        <div className="intelligence-stack-control-actions">
          <label className="intelligence-stack-quality">
            <Settings2 size={14} />
            <span className="sr-only">Scene quality</span>
            <select
              value={quality}
              onChange={(event) => setQuality(event.target.value as QualityMode)}
              aria-label="Scene quality"
            >
              <option value="auto">Auto</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </label>
          <button
            type="button"
            className="intelligence-stack-utility-button"
            onClick={() => setShowMissions(true)}
          >
            <Map size={15} /> Missions
          </button>
          <button type="button" className="intelligence-stack-utility-button" onClick={resetCamera}>
            <Grid3X3 size={15} /> Camera
          </button>
          <button
            type="button"
            className="intelligence-stack-utility-button"
            onClick={resetExperience}
          >
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </div>

      {!game.hasBegun && (
        <section
          className="intelligence-stack-intro"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intelligence-stack-intro-title"
        >
          <div className="intelligence-stack-intro-card">
            <div className="intelligence-stack-intro-icon">
              <Bot size={27} />
            </div>
            <div className="intelligence-stack-eyebrow">Choose a case file</div>
            <h2 id="intelligence-stack-intro-title">{mission.title}</h2>
            <p>{mission.description}</p>
            <p className="intelligence-stack-case-prompt">{mission.casePrompt}</p>
            <MissionPicker activeMissionId={mission.id} onSelect={selectMission} />
            <p className="intelligence-stack-objective">
              <span>Objective</span> {mission.objectiveLabel}
            </p>
            {!sceneReady && (
              <div className="intelligence-stack-scene-status">
                <span /> Assembling the simulation…
              </div>
            )}
            <div className="intelligence-stack-intro-actions">
              <button
                type="button"
                className="intelligence-stack-primary-action"
                onClick={game.begin}
                disabled={!sceneReady}
              >
                {sceneReady ? (
                  <>
                    Launch mission <ChevronRight size={17} />
                  </>
                ) : (
                  "Loading scene…"
                )}
              </button>
              <Link to="/projects" className="intelligence-stack-secondary-action">
                View projects instead
              </Link>
            </div>
          </div>
        </section>
      )}

      {game.isComplete && (
        <section
          className="intelligence-stack-completion"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intelligence-stack-complete-title"
        >
          <div className="intelligence-stack-completion-card">
            <Sparkles size={30} />
            <div className="intelligence-stack-eyebrow">{mission.label} complete</div>
            <h2 id="intelligence-stack-complete-title">{mission.title.toUpperCase()} COMPLETE</h2>
            <p>{mission.objectiveLabel} achieved. Pick another route through the stack.</p>
            <div className="intelligence-stack-intro-actions">
              <Link to="/projects" className="intelligence-stack-primary-action">
                Explore Danish’s Projects <ChevronRight size={17} />
              </Link>
              <button
                type="button"
                className="intelligence-stack-secondary-action"
                onClick={() => setShowMissions(true)}
              >
                Choose a mission
              </button>
            </div>
          </div>
        </section>
      )}

      {showHelp && (
        <section
          className="intelligence-stack-help"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intelligence-stack-help-title"
        >
          <div className="intelligence-stack-help-card">
            <button
              type="button"
              className="intelligence-stack-help-close"
              onClick={() => setShowHelp(false)}
              aria-label="Close controls help"
            >
              <X size={18} />
            </button>
            <Gamepad2 size={26} />
            <h2 id="intelligence-stack-help-title">Navigation controls</h2>
            <p>
              Move only along illuminated graph links. A locked cube names the foundations it still
              needs.
            </p>
            <dl>
              <div>
                <dt>WASD / arrow keys</dt>
                <dd>Follow the bottom-left guide to the named destination for each direction</dd>
              </div>
              <div>
                <dt>Route buttons / 1–4</dt>
                <dd>Choose a named connected system directly</dd>
              </div>
              <div>
                <dt>Lit cubes</dt>
                <dd>Click a highlighted connected cube to move there</dd>
              </div>
              <div>
                <dt>Space / Enter</dt>
                <dd>Open the story for the block you are standing on</dd>
              </div>
              <div>
                <dt>R</dt>
                <dd>Reset the active stack</dd>
              </div>
              <div>
                <dt>Drag / scroll</dt>
                <dd>Orbit or zoom within safe limits</dd>
              </div>
            </dl>
            <button
              type="button"
              className="intelligence-stack-primary-action"
              onClick={() => setShowHelp(false)}
            >
              Continue
            </button>
          </div>
        </section>
      )}

      {showMissions && (
        <section
          className="intelligence-stack-help intelligence-stack-mission-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="intelligence-stack-missions-title"
        >
          <div className="intelligence-stack-help-card intelligence-stack-mission-card">
            <button
              type="button"
              className="intelligence-stack-help-close"
              onClick={() => setShowMissions(false)}
              aria-label="Close missions"
            >
              <X size={18} />
            </button>
            <Map size={26} />
            <div className="intelligence-stack-eyebrow">Mission archive</div>
            <h2 id="intelligence-stack-missions-title">Choose a map</h2>
            <p>Each mission reshapes the stack and sets a different milestone.</p>
            <MissionPicker activeMissionId={mission.id} onSelect={selectMission} />
            <button
              type="button"
              className="intelligence-stack-primary-action"
              onClick={() => setShowMissions(false)}
            >
              Continue {mission.title} <ChevronRight size={17} />
            </button>
          </div>
        </section>
      )}

      <p className="sr-only">
        The Intelligence Stack is an interactive graph representing Danish Nadar’s AI engineering,
        computer vision, robotics, autonomous systems, sensor fusion, and AI infrastructure work.
        Complete prerequisites to activate each major discipline and reach Integrated Intelligence.
      </p>
    </div>
  );
}
