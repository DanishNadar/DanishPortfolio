import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { getNodePositionById } from "./scene-utils";
import type { CompletionStage, StackMapLayout } from "./types";

interface CameraControllerProps {
  cameraResetToken: number;
  currentNodeId: string;
  hasBegun: boolean;
  layout: StackMapLayout;
  storyBeat: CompletionStage;
}

const FINAL_CAMERA = new Vector3(12.8, 9.6, 15.8);
const INTRO_CAMERA = new Vector3(15, 11.8, 18.5);
const DEFAULT_TARGET = new Vector3(0, 1.3, 0.45);
const OVERVIEW_TARGET = new Vector3(0, 1.8, 0);

type CutsceneStage = {
  camera: Vector3;
  target: Vector3;
  duration: number;
};

type CutsceneState = {
  stages: CutsceneStage[];
  prevCamera: Vector3;
  prevTarget: Vector3;
  currentStageIndex: number;
  stageStartedAt: number | null;
};

type ReturnState = {
  fromCamera: Vector3;
  fromTarget: Vector3;
  startedAt: number | null;
};

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function CameraController({
  cameraResetToken,
  currentNodeId,
  hasBegun,
  layout,
  storyBeat,
}: CameraControllerProps) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera, invalidate } = useThree();
  const cutscene = useRef<CutsceneState | null>(null);
  const returnAnim = useRef<ReturnState | null>(null);
  const prevStoryBeat = useRef<CompletionStage>(storyBeat);
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    camera.position.copy(hasBegun ? FINAL_CAMERA : INTRO_CAMERA);
    controls.current?.target.copy(DEFAULT_TARGET);
    controls.current?.update();
    cutscene.current = null;
    returnAnim.current = null;
    setIsReturning(false);
    invalidate();
  }, [camera, cameraResetToken, hasBegun, invalidate]);

  useEffect(() => {
    const wasActive = prevStoryBeat.current !== null;
    prevStoryBeat.current = storyBeat;

    if (!storyBeat) {
      if (wasActive) {
        // storyBeat just cleared — smoothly return camera to default overview
        cutscene.current = null;
        returnAnim.current = {
          fromCamera: camera.position.clone(),
          fromTarget: controls.current?.target.clone() ?? DEFAULT_TARGET.clone(),
          startedAt: null,
        };
        setIsReturning(true);
        invalidate();
      }
      // storyBeat was already null (normal navigation) — leave camera alone
      return;
    }

    // New cutscene starting — cancel any return animation
    returnAnim.current = null;
    setIsReturning(false);

    const [x, y, z] = getNodePositionById(currentNodeId, layout);
    const nodeTarget = new Vector3(x, y + 0.68, z);
    const approachOffset =
      storyBeat === "mastery" ? new Vector3(7.8, 5.8, 9.2) : new Vector3(6.5, 4.6, 7.8);
    const droidshotOffset =
      storyBeat === "mastery" ? new Vector3(2.2, 1.6, 1.8) : new Vector3(1.8, 1.2, 1.6);

    // Multi-stage cinematic: pull back → arc sweep → Spiron close-up → final approach
    const stages: CutsceneStage[] =
      storyBeat === "mastery"
        ? [
            { camera: new Vector3(2, 28, 6), target: OVERVIEW_TARGET.clone(), duration: 1.5 },
            { camera: new Vector3(20, 20, 10), target: OVERVIEW_TARGET.clone(), duration: 1.8 },
            { camera: new Vector3(-16, 18, 10), target: OVERVIEW_TARGET.clone(), duration: 1.8 },
            {
              camera: nodeTarget.clone().add(droidshotOffset),
              target: nodeTarget.clone(),
              duration: 1.6,
            },
            {
              camera: nodeTarget.clone().add(approachOffset),
              target: nodeTarget.clone(),
              duration: 1.8,
            },
          ]
        : [
            { camera: new Vector3(2, 24, 10), target: OVERVIEW_TARGET.clone(), duration: 1.2 },
            { camera: new Vector3(-15, 18, 14), target: OVERVIEW_TARGET.clone(), duration: 1.6 },
            {
              camera: nodeTarget.clone().add(droidshotOffset),
              target: nodeTarget.clone(),
              duration: 1.5,
            },
            {
              camera: nodeTarget.clone().add(approachOffset),
              target: nodeTarget.clone(),
              duration: 2.2,
            },
          ];

    cutscene.current = {
      stages,
      prevCamera: camera.position.clone(),
      prevTarget: controls.current?.target.clone() ?? DEFAULT_TARGET.clone(),
      currentStageIndex: 0,
      stageStartedAt: null,
    };
    invalidate();
  }, [camera, currentNodeId, invalidate, layout, storyBeat]);

  useFrame(({ clock }) => {
    // Return-to-overview animation (runs after cutscene is dismissed)
    const ret = returnAnim.current;
    if (ret && !storyBeat) {
      if (ret.startedAt === null) ret.startedAt = clock.getElapsedTime();
      const elapsed = clock.getElapsedTime() - ret.startedAt;
      const progress = Math.min(1, elapsed / 1.1);
      const eased = easeInOut(progress);
      camera.position.lerpVectors(ret.fromCamera, FINAL_CAMERA, eased);
      controls.current?.target.lerpVectors(ret.fromTarget, DEFAULT_TARGET, eased);
      controls.current?.update();
      if (progress >= 1) {
        returnAnim.current = null;
        setIsReturning(false);
        controls.current?.update();
      } else {
        invalidate();
      }
      return;
    }

    // Multi-stage completion cutscene
    const seq = cutscene.current;
    if (!seq || !storyBeat) return;

    const stage = seq.stages[seq.currentStageIndex];
    if (!stage) return;

    if (seq.stageStartedAt === null) seq.stageStartedAt = clock.getElapsedTime();
    const elapsed = clock.getElapsedTime() - seq.stageStartedAt;
    const progress = Math.min(1, elapsed / stage.duration);
    const eased = easeInOut(progress);

    const prevCam =
      seq.currentStageIndex === 0
        ? seq.prevCamera
        : seq.stages[seq.currentStageIndex - 1].camera;
    const prevTgt =
      seq.currentStageIndex === 0
        ? seq.prevTarget
        : seq.stages[seq.currentStageIndex - 1].target;

    camera.position.lerpVectors(prevCam, stage.camera, eased);
    controls.current?.target.lerpVectors(prevTgt, stage.target, eased);
    controls.current?.update();

    if (progress >= 1) {
      if (seq.currentStageIndex < seq.stages.length - 1) {
        seq.currentStageIndex++;
        seq.stageStartedAt = null;
        invalidate();
      }
    } else {
      invalidate();
    }
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enabled={hasBegun && !storyBeat && !isReturning}
      enableDamping={false}
      onChange={() => invalidate()}
      minDistance={10.5}
      maxDistance={22}
      minPolarAngle={0.72}
      maxPolarAngle={1.25}
    />
  );
}
