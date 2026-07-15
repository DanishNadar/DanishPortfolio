import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { MathUtils } from "three";
import type { Group } from "three";
import { getNodePositionById } from "./scene-utils";
import type { JumpState, StackMapLayout } from "./types";

interface PlayerProbeProps {
  currentNodeId: string;
  jump: JumpState | null;
  layout: StackMapLayout;
  onJumpEnd: (nodeId: string) => void;
  reducedMotion: boolean;
  resetToken: number;
}

export function PlayerProbe({
  currentNodeId,
  jump,
  layout,
  onJumpEnd,
  reducedMotion,
  resetToken,
}: PlayerProbeProps) {
  const group = useRef<Group>(null);
  const completedJumpToken = useRef<number | null>(null);
  const rotationTarget = useRef(0);

  useEffect(() => {
    completedJumpToken.current = null;
    const [x, y, z] = getNodePositionById(currentNodeId, layout);
    group.current?.position.set(x, y + 0.72, z);
  }, [currentNodeId, layout, resetToken]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const idleBob = Math.sin(clock.getElapsedTime() * 3.2) * 0.035;
    if (!jump) {
      const [x, y, z] = getNodePositionById(currentNodeId, layout);
      group.current.position.lerp({ x, y: y + 0.72 + idleBob, z }, 0.15);
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        rotationTarget.current,
        0.12,
      );
      return;
    }

    const [fromX, fromY, fromZ] = getNodePositionById(jump.fromId, layout);
    const [toX, toY, toZ] = getNodePositionById(jump.toId, layout);
    const progress = Math.min(1, Math.max(0, (performance.now() - jump.startedAt) / jump.duration));
    const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const arc = reducedMotion ? 0 : Math.sin(progress * Math.PI) * 0.78;
    const directionX = toX - fromX;
    const directionZ = toZ - fromZ;

    group.current.position.set(
      MathUtils.lerp(fromX, toX, eased),
      MathUtils.lerp(fromY + 0.72, toY + 0.72, eased) + arc,
      MathUtils.lerp(fromZ, toZ, eased),
    );
    rotationTarget.current = Math.atan2(directionX, directionZ);
    group.current.rotation.y = rotationTarget.current;
    const squash = 1 - Math.sin(progress * Math.PI) * 0.13;
    group.current.scale.set(1 / Math.sqrt(squash), squash, 1 / Math.sqrt(squash));

    if (progress >= 1 && completedJumpToken.current !== jump.startedAt) {
      completedJumpToken.current = jump.startedAt;
      onJumpEnd(jump.toId);
    }
  });

  return (
    <group ref={group}>
      <RoundedBox args={[0.5, 0.38, 0.54]} radius={0.16} smoothness={5} castShadow>
        <meshPhysicalMaterial color="#9fc7e8" metalness={0.8} roughness={0.18} clearcoat={1} />
      </RoundedBox>
      <mesh position={[0, 0.02, 0.285]}>
        <circleGeometry args={[0.13, 24]} />
        <meshBasicMaterial color="#72d9ff" />
      </mesh>
      <mesh position={[0, 0.02, 0.295]}>
        <circleGeometry args={[0.06, 24]} />
        <meshBasicMaterial color="#eafaff" />
      </mesh>
      <mesh position={[-0.28, -0.23, 0.02]} rotation={[0, 0, -0.38]}>
        <boxGeometry args={[0.13, 0.16, 0.16]} />
        <meshStandardMaterial color="#ef3e5d" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0.28, -0.23, 0.02]} rotation={[0, 0, 0.38]}>
        <boxGeometry args={[0.13, 0.16, 0.16]} />
        <meshStandardMaterial color="#4eb8ff" metalness={0.8} roughness={0.25} />
      </mesh>
      <pointLight color="#57d6ff" intensity={2.8} distance={2.7} />
    </group>
  );
}
