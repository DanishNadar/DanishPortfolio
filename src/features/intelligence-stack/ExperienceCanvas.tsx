import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import { CameraController } from "./CameraController";
import { CompletionBurst } from "./CompletionBurst";
import { CubeNetwork } from "./CubeNetwork";
import { EnergyPaths } from "./EnergyPaths";
import { PlayerProbe } from "./PlayerProbe";
import { SceneEnvironment } from "./SceneEnvironment";
import type { CompletionStage, JumpState, QualityMode, StackMapLayout } from "./types";

interface ExperienceCanvasProps {
  activatedIds: ReadonlySet<string>;
  cameraResetToken: number;
  connectedNodeIds: ReadonlySet<string>;
  currentNodeId: string;
  hasBegun: boolean;
  isComplete: boolean;
  jump: JumpState | null;
  layout: StackMapLayout;
  onJumpEnd: (nodeId: string) => void;
  onNavigate: (nodeId: string) => void;
  onSceneReady: () => void;
  completionNodeId: string;
  quality: QualityMode;
  reducedMotion: boolean;
  resetToken: number;
  selectedNodeId: string;
  storyBeat: CompletionStage;
}

function getQualitySettings(quality: QualityMode) {
  if (quality === "low") return { dpr: 1, shadows: false };
  if (quality === "high") return { dpr: [1, 1.35] as [number, number], shadows: true };
  return { dpr: 1, shadows: false };
}

const CANVAS_CAMERA = {
  position: [15, 11.8, 18.5] as [number, number, number],
  fov: 36,
  near: 0.1,
  far: 80,
};

const CANVAS_RESIZE_CONFIG = {
  scroll: false,
  debounce: { resize: 120 },
} as const;

export function ExperienceCanvas({
  activatedIds,
  cameraResetToken,
  connectedNodeIds,
  currentNodeId,
  hasBegun,
  isComplete,
  jump,
  layout,
  onJumpEnd,
  onNavigate,
  onSceneReady,
  completionNodeId,
  quality,
  reducedMotion,
  resetToken,
  selectedNodeId,
  storyBeat,
}: ExperienceCanvasProps) {
  const [isPageVisible, setIsPageVisible] = useState(true);
  const { dpr, shadows } = useMemo(() => getQualitySettings(quality), [quality]);
  const glSettings = useMemo(
    () => ({
      antialias: quality === "high",
      alpha: false,
      powerPreference: "high-performance" as const,
    }),
    [quality],
  );

  useEffect(() => {
    const updateVisibility = () => setIsPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return (
    <Canvas
      className="intelligence-stack-canvas"
      aria-label="Interactive three-dimensional intelligence stack with activated skill cubes"
      camera={CANVAS_CAMERA}
      dpr={dpr}
      frameloop={isPageVisible ? "demand" : "never"}
      resize={CANVAS_RESIZE_CONFIG}
      shadows={shadows}
      gl={glSettings}
      onCreated={({ gl }) => {
        gl.setClearColor("#050914");
        requestAnimationFrame(onSceneReady);
      }}
    >
      <Suspense fallback={null}>
        <SceneEnvironment quality={quality} />
        <EnergyPaths activatedIds={activatedIds} completed={isComplete} layout={layout} />
        {isComplete && (
          <CompletionBurst objectiveNodeId={completionNodeId} quality={quality} layout={layout} />
        )}
        <CubeNetwork
          activatedIds={activatedIds}
          connectedNodeIds={connectedNodeIds}
          currentNodeId={currentNodeId}
          layout={layout}
          onNavigate={onNavigate}
          selectedNodeId={selectedNodeId}
        />
        <PlayerProbe
          currentNodeId={currentNodeId}
          jump={jump}
          layout={layout}
          onJumpEnd={onJumpEnd}
          reducedMotion={reducedMotion}
          resetToken={resetToken}
          storyBeat={storyBeat}
        />
        <CameraController
          cameraResetToken={cameraResetToken}
          currentNodeId={currentNodeId}
          hasBegun={hasBegun}
          layout={layout}
          storyBeat={storyBeat}
        />
      </Suspense>
    </Canvas>
  );
}
