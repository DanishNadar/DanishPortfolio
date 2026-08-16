import { RoundedBox } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { MathUtils } from "three";
import type { Group, Mesh } from "three";
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
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
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
      if (!storyBeat) {
        // Animate rings invisible when not celebrating
        if (ring1Ref.current) ring1Ref.current.visible = false;
        if (ring2Ref.current) ring2Ref.current.visible = false;
        return;
      }
      invalidate();
      const [x, y, z] = getNodePositionById(currentNodeId, layout);
      if (storyBeatStartedAt.current === null) storyBeatStartedAt.current = elapsed;
      const beatAge =
        storyBeatStartedAt.current === null ? 0 : elapsed - storyBeatStartedAt.current;

      // Orbiting energy rings
      if (ring1Ref.current) {
        ring1Ref.current.visible = !reducedMotion;
        ring1Ref.current.rotation.y = elapsed * 2.6;
        ring1Ref.current.rotation.x = Math.PI / 2 + Math.sin(elapsed * 0.85) * 0.55;
        ring1Ref.current.rotation.z = Math.sin(elapsed * 0.42) * 0.32;
      }
      if (ring2Ref.current) {
        ring2Ref.current.visible = !reducedMotion;
        ring2Ref.current.rotation.y = elapsed * -1.8;
        ring2Ref.current.rotation.z = elapsed * 1.3;
        ring2Ref.current.rotation.x = Math.sin(elapsed * 0.72) * 0.48;
      }

      const celebrationHeight = reducedMotion
        ? 0
        : storyBeat === "mastery"
          ? Math.abs(Math.sin(beatAge * 3.2)) * 0.58
          : Math.abs(Math.sin(beatAge * 4.8)) * 0.36;
      const celebrationTilt = reducedMotion
        ? 0
        : storyBeat === "mastery"
          ? Math.sin(beatAge * 4.2) * 0.18
          : Math.sin(beatAge * 6.2) * 0.09;
      const celebrationTurn = reducedMotion
        ? 0
        : storyBeat === "mastery"
          ? beatAge * 2.8
          : Math.sin(beatAge * 3.4) * 0.38;

      group.current.position.lerp({ x, y: y + 0.72 + idleBob + celebrationHeight, z }, 0.15);
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        rotationTarget.current + celebrationTurn,
        0.12,
      );
      group.current.rotation.z = celebrationTilt;
      group.current.scale.setScalar(storyBeat && !reducedMotion ? 1.14 : 1);
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
      {/* === SPIRON: Iron Man × Spider-Man armored droid === */}

      {/* Dark angular armored torso */}
      <RoundedBox args={[0.44, 0.50, 0.40]} radius={0.03} smoothness={4} castShadow>
        <meshPhysicalMaterial color="#111520" metalness={0.94} roughness={0.10} clearcoat={1.0} clearcoatRoughness={0.04} />
      </RoundedBox>

      {/* Iron Man chest plate — upper red panel */}
      <mesh position={[0, 0.08, 0.208]}>
        <boxGeometry args={[0.34, 0.24, 0.018]} />
        <meshPhysicalMaterial color="#aa1010" metalness={0.90} roughness={0.12} clearcoat={0.85} />
      </mesh>

      {/* V-shaped chest accent lines */}
      <mesh position={[-0.12, 0.08, 0.216]} rotation={[0, 0, 0.22]}>
        <boxGeometry args={[0.030, 0.20, 0.012]} />
        <meshStandardMaterial color="#cc2a10" metalness={0.88} roughness={0.16} />
      </mesh>
      <mesh position={[0.12, 0.08, 0.216]} rotation={[0, 0, -0.22]}>
        <boxGeometry args={[0.030, 0.20, 0.012]} />
        <meshStandardMaterial color="#cc2a10" metalness={0.88} roughness={0.16} />
      </mesh>

      {/* Arc reactor — hexagonal glowing blue core */}
      <mesh position={[0, 0.07, 0.222]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.072, 0.072, 0.014, 6]} />
        <meshStandardMaterial
          color="#0055ff"
          emissive="#0080ff"
          emissiveIntensity={storyBeat ? 5.0 : 2.8}
          metalness={0.1}
          roughness={0.06}
        />
      </mesh>
      <mesh position={[0, 0.07, 0.230]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.010, 6]} />
        <meshStandardMaterial
          color="#b0e8ff"
          emissive="#90d8ff"
          emissiveIntensity={storyBeat ? 8.0 : 4.5}
        />
      </mesh>

      {/* Shoulder pauldrons — red, angular */}
      <mesh position={[-0.278, 0.16, 0.01]} rotation={[0, 0, 0.22]}>
        <boxGeometry args={[0.13, 0.19, 0.30]} />
        <meshPhysicalMaterial color="#aa1010" metalness={0.90} roughness={0.12} clearcoat={0.8} />
      </mesh>
      <mesh position={[0.278, 0.16, 0.01]} rotation={[0, 0, -0.22]}>
        <boxGeometry args={[0.13, 0.19, 0.30]} />
        <meshPhysicalMaterial color="#aa1010" metalness={0.90} roughness={0.12} clearcoat={0.8} />
      </mesh>

      {/* Helmet — Iron Man angular faceplate */}
      <mesh position={[0, 0.385, 0]}>
        <boxGeometry args={[0.30, 0.22, 0.26]} />
        <meshPhysicalMaterial color="#111520" metalness={0.96} roughness={0.07} clearcoat={1.0} />
      </mesh>
      {/* Helmet crest */}
      <mesh position={[0, 0.510, -0.010]}>
        <boxGeometry args={[0.09, 0.056, 0.26]} />
        <meshPhysicalMaterial color="#aa1010" metalness={0.90} roughness={0.12} />
      </mesh>
      {/* Cheek guards */}
      <mesh position={[-0.165, 0.385, 0.015]}>
        <boxGeometry args={[0.036, 0.17, 0.21]} />
        <meshPhysicalMaterial color="#aa1010" metalness={0.88} roughness={0.14} />
      </mesh>
      <mesh position={[0.165, 0.385, 0.015]}>
        <boxGeometry args={[0.036, 0.17, 0.21]} />
        <meshPhysicalMaterial color="#aa1010" metalness={0.88} roughness={0.14} />
      </mesh>
      {/* Spider-Man visor — red glowing eye slit */}
      <mesh position={[0, 0.395, 0.140]}>
        <boxGeometry args={[0.22, 0.045, 0.008]} />
        <meshStandardMaterial
          color="#ff1818"
          emissive="#ff0000"
          emissiveIntensity={storyBeat ? 7.0 : 4.0}
        />
      </mesh>

      {/* Spider limbs — 4 articulated arms (red front, blue back) */}
      <mesh position={[-0.24, -0.04, 0.12]} rotation={[0.38, 0.48, 0.58]}>
        <boxGeometry args={[0.050, 0.28, 0.050]} />
        <meshPhysicalMaterial color="#880808" metalness={0.92} roughness={0.18} />
      </mesh>
      <mesh position={[0.24, -0.04, 0.12]} rotation={[0.38, -0.48, -0.58]}>
        <boxGeometry args={[0.050, 0.28, 0.050]} />
        <meshPhysicalMaterial color="#880808" metalness={0.92} roughness={0.18} />
      </mesh>
      <mesh position={[-0.24, -0.04, -0.11]} rotation={[-0.38, 0.48, 0.58]}>
        <boxGeometry args={[0.050, 0.28, 0.050]} />
        <meshPhysicalMaterial color="#083880" metalness={0.92} roughness={0.18} />
      </mesh>
      <mesh position={[0.24, -0.04, -0.11]} rotation={[-0.38, -0.48, -0.58]}>
        <boxGeometry args={[0.050, 0.28, 0.050]} />
        <meshPhysicalMaterial color="#083880" metalness={0.92} roughness={0.18} />
      </mesh>

      {/* Orbiting energy rings — animate in useFrame, hidden when not celebrating */}
      <mesh ref={ring1Ref} visible={false}>
        <torusGeometry args={[0.88, 0.015, 8, 64]} />
        <meshStandardMaterial
          color="#00aaff"
          emissive="#00aaff"
          emissiveIntensity={4.5}
          transparent
          opacity={0.88}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ring2Ref} visible={false}>
        <torusGeometry args={[0.70, 0.012, 8, 64]} />
        <meshStandardMaterial
          color="#ff1a08"
          emissive="#ff1500"
          emissiveIntensity={3.5}
          transparent
          opacity={0.80}
          depthWrite={false}
        />
      </mesh>

      {/* Red (Spider-Man) + blue (arc reactor) dual point lights */}
      <pointLight
        color="#ff1a08"
        intensity={storyBeat === "mastery" ? 7.5 : storyBeat ? 5.5 : 3.4}
        distance={storyBeat ? 5.8 : 3.4}
      />
      <pointLight
        color="#00aaff"
        intensity={storyBeat === "mastery" ? 5.5 : storyBeat ? 3.8 : 2.2}
        distance={storyBeat ? 4.8 : 2.8}
        position={[0, 0.07, 0.5]}
      />
    </group>
  );
}
