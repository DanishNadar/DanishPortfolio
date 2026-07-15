import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { CameraController } from "./CameraController";
import { CompletionBurst } from "./CompletionBurst";
import { CubeNetwork } from "./CubeNetwork";
import { EnergyPaths } from "./EnergyPaths";
import { PlayerProbe } from "./PlayerProbe";
import { SceneEnvironment } from "./SceneEnvironment";
import type { JumpState, QualityMode, StackMapLayout } from "./types";

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
  objectiveNodeId: string;
  quality: QualityMode;
  reducedMotion: boolean;
  resetToken: number;
  selectedNodeId: string;
}

function getQualitySettings(quality: QualityMode) {
  if (quality === "low") return { dpr: 1, shadows: false };
  if (quality === "high") return { dpr: [1, 1.75] as [number, number], shadows: true };
  return { dpr: [1, 1.35] as [number, number], shadows: true };
}

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
  objectiveNodeId,
  quality,
  reducedMotion,
  resetToken,
  selectedNodeId,
}: ExperienceCanvasProps) {
  const [isPageVisible, setIsPageVisible] = useState(true);
  const { dpr, shadows } = getQualitySettings(quality);

  useEffect(() => {
    const updateVisibility = () => setIsPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return (
    <Canvas
      className="intelligence-stack-canvas"
      aria-label="Interactive three-dimensional intelligence stack with activated skill cubes"
      camera={{ position: [15, 11.8, 18.5], fov: 36, near: 0.1, far: 80 }}
      dpr={dpr}
      frameloop={isPageVisible ? "always" : "never"}
      shadows={shadows}
      gl={{ antialias: quality !== "low", alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#050914");
        requestAnimationFrame(onSceneReady);
      }}
    >
      <Suspense fallback={null}>
        <SceneEnvironment quality={quality} />
        <EnergyPaths activatedIds={activatedIds} completed={isComplete} layout={layout} />
        {isComplete && (
          <CompletionBurst objectiveNodeId={objectiveNodeId} quality={quality} layout={layout} />
        )}
        <CubeNetwork
          activatedIds={activatedIds}
          connectedNodeIds={connectedNodeIds}
          currentNodeId={currentNodeId}
          layout={layout}
          onNavigate={onNavigate}
          quality={quality}
          reducedMotion={reducedMotion}
          selectedNodeId={selectedNodeId}
        />
        <PlayerProbe
          currentNodeId={currentNodeId}
          jump={jump}
          layout={layout}
          onJumpEnd={onJumpEnd}
          reducedMotion={reducedMotion}
          resetToken={resetToken}
        />
        <CameraController
          cameraResetToken={cameraResetToken}
          completed={isComplete}
          currentNodeId={currentNodeId}
          hasBegun={hasBegun}
          layout={layout}
          reducedMotion={reducedMotion}
        />
      </Suspense>
    </Canvas>
  );
}
