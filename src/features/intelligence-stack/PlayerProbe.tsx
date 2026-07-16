import { RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { MathUtils } from "three";
import type { Group } from "three";
import { getNodePositionById } from "./scene-utils";
import type { CompletionStage, JumpState, StackMapLayout } from "./types";

interface PlayerProbeProps {
  currentNodeId: string;
  jump: JumpState | null;
  layout: StackMapLayout;
  onJumpEnd: (nodeId: string) => void;
  reducedMotion: boolean;
  resetToken: number;
  storyBeat: CompletionStage;
}

export function PlayerProbe({
  currentNodeId,
  jump,
  layout,
  onJumpEnd,
  reducedMotion,
  resetToken,
  storyBeat,
}: PlayerProbeProps) {
  const group = useRef<Group>(null);
  const completedJumpToken = useRef<number | null>(null);
  const rotationTarget = useRef(0);
  const storyBeatStartedAt = useRef<number | null>(null);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    completedJumpToken.current = null;
    storyBeatStartedAt.current = null;
    const [x, y, z] = getNodePositionById(currentNodeId, layout);
    group.current?.position.set(x, y + 0.72, z);
    if (!storyBeat) {
      group.current?.rotation.set(0, rotationTarget.current, 0);
      group.current?.scale.setScalar(1);
    }
  }, [currentNodeId, layout, resetToken, storyBeat]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const elapsed = clock.getElapsedTime();
    const idleBob = Math.sin(elapsed * 3.2) * 0.035;
    if (!jump) {
      if (!storyBeat) return;
      invalidate();
      const [x, y, z] = getNodePositionById(currentNodeId, layout);
      if (storyBeat && storyBeatStartedAt.current === null) storyBeatStartedAt.current = elapsed;
      const beatAge =
        storyBeatStartedAt.current === null ? 0 : elapsed - storyBeatStartedAt.current;
      const celebrationHeight = reducedMotion
        ? 0
        : storyBeat === "mastery"
          ? Math.abs(Math.sin(beatAge * 3.2)) * 0.42
          : Math.abs(Math.sin(beatAge * 4.8)) * 0.24;
      const celebrationTilt = reducedMotion
        ? 0
        : storyBeat === "mastery"
          ? Math.sin(beatAge * 4.2) * 0.14
          : Math.sin(beatAge * 6.2) * 0.075;
      const celebrationTurn = reducedMotion
        ? 0
        : storyBeat === "mastery"
          ? beatAge * 1.9
          : Math.sin(beatAge * 3.4) * 0.28;

      group.current.position.lerp({ x, y: y + 0.72 + idleBob + celebrationHeight, z }, 0.15);
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        rotationTarget.current + celebrationTurn,
        0.12,
      );
      group.current.rotation.z = celebrationTilt;
      group.current.scale.setScalar(storyBeat && !reducedMotion ? 1.06 : 1);
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
    invalidate();

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
      <pointLight
        color={storyBeat === "mastery" ? "#ffd58f" : "#57d6ff"}
        intensity={storyBeat ? 5.2 : 2.8}
        distance={storyBeat ? 4.2 : 2.7}
      />
    </group>
  );
}
