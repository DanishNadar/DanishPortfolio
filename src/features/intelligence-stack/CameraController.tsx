import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
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

type CutsceneCamera = {
  fromCamera: Vector3;
  fromTarget: Vector3;
  targetCamera: Vector3;
  targetTarget: Vector3;
  startedAt: number | null;
};

export function CameraController({
  cameraResetToken,
  currentNodeId,
  hasBegun,
  layout,
  storyBeat,
}: CameraControllerProps) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera, invalidate } = useThree();
  const cutscene = useRef<CutsceneCamera | null>(null);

  useEffect(() => {
    camera.position.copy(hasBegun ? FINAL_CAMERA : INTRO_CAMERA);
    controls.current?.target.set(0, 1.3, 0.45);
    controls.current?.update();
  }, [camera, cameraResetToken, hasBegun]);

  useEffect(() => {
    if (!storyBeat) {
      if (cutscene.current) {
        camera.position.copy(cutscene.current.fromCamera);
        controls.current?.target.copy(cutscene.current.fromTarget);
        controls.current?.update();
        invalidate();
      }
      cutscene.current = null;
      return;
    }

    const [x, y, z] = getNodePositionById(currentNodeId, layout);
    const targetTarget = new Vector3(x, y + 0.68, z);
    const offset =
      storyBeat === "mastery" ? new Vector3(7.8, 5.8, 9.2) : new Vector3(6.5, 4.6, 7.8);
    cutscene.current = {
      fromCamera: camera.position.clone(),
      fromTarget: controls.current?.target.clone() ?? new Vector3(0, 1.3, 0.45),
      targetCamera: targetTarget.clone().add(offset),
      targetTarget,
      startedAt: null,
    };
    invalidate();
  }, [camera, currentNodeId, invalidate, layout, storyBeat]);

  useFrame(({ clock }) => {
    const sequence = cutscene.current;
    if (!sequence || !storyBeat) return;
    if (sequence.startedAt === null) sequence.startedAt = clock.getElapsedTime();
    const elapsed = clock.getElapsedTime() - sequence.startedAt;
    const progress = Math.min(1, elapsed / (storyBeat === "mastery" ? 1.35 : 1.05));
    const eased = 1 - Math.pow(1 - progress, 3);

    camera.position.lerpVectors(sequence.fromCamera, sequence.targetCamera, eased);
    controls.current?.target.lerpVectors(sequence.fromTarget, sequence.targetTarget, eased);
    controls.current?.update();
    if (progress < 1) invalidate();
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enabled={hasBegun && !storyBeat}
      enableDamping={false}
      onChange={invalidate}
      minDistance={10.5}
      maxDistance={22}
      minPolarAngle={0.72}
      maxPolarAngle={1.25}
      minAzimuthAngle={-0.68}
      maxAzimuthAngle={0.68}
    />
  );
}
