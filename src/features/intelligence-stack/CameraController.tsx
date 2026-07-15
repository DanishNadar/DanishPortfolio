import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { getNodePositionById } from "./scene-utils";
import type { StackMapLayout } from "./types";

interface CameraControllerProps {
  cameraResetToken: number;
  completed: boolean;
  currentNodeId: string;
  hasBegun: boolean;
  layout: StackMapLayout;
  reducedMotion: boolean;
}

const FINAL_CAMERA = new Vector3(12.8, 9.6, 15.8);
const INTRO_CAMERA = new Vector3(15, 11.8, 18.5);
const COMPLETION_CAMERA = new Vector3(14.5, 11, 18);

export function CameraController({
  cameraResetToken,
  completed,
  currentNodeId,
  hasBegun,
  layout,
  reducedMotion,
}: CameraControllerProps) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const target = useRef(new Vector3(0, 1.3, 0.45));
  const desiredTarget = useRef(new Vector3());

  useEffect(() => {
    camera.position.copy(hasBegun ? FINAL_CAMERA : INTRO_CAMERA);
    target.current.set(0, 1.3, 0.45);
    controls.current?.target.copy(target.current);
    controls.current?.update();
  }, [camera, cameraResetToken, hasBegun]);

  useFrame((_, delta) => {
    const [x, y, z] = getNodePositionById(currentNodeId, layout);
    desiredTarget.current.set(x * 0.08, 1.25 + y * 0.05, 0.38 + z * 0.04);
    const smoothness = reducedMotion ? 1 : 1 - Math.exp(-delta * 2.4);
    target.current.lerp(desiredTarget.current, smoothness);
    if (!hasBegun)
      camera.position.lerp(FINAL_CAMERA, reducedMotion ? 1 : 1 - Math.exp(-delta * 0.7));
    if (completed)
      camera.position.lerp(COMPLETION_CAMERA, reducedMotion ? 1 : 1 - Math.exp(-delta * 0.75));
    controls.current?.target.lerp(target.current, smoothness);
    controls.current?.update();
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enabled={hasBegun}
      enableDamping
      dampingFactor={0.08}
      minDistance={10.5}
      maxDistance={22}
      minPolarAngle={0.72}
      maxPolarAngle={1.25}
      minAzimuthAngle={-0.68}
      maxAzimuthAngle={0.68}
    />
  );
}
