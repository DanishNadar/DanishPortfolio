import { Edges, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group, MeshStandardMaterial } from "three";
import { categoryColor, getNodePosition } from "./scene-utils";
import type { QualityMode, SkillCubeNode, StackMapLayout } from "./types";

interface SkillCubeProps {
  activated: boolean;
  connected: boolean;
  current: boolean;
  index: number;
  layout: StackMapLayout;
  onNavigate?: () => void;
  quality: QualityMode;
  reducedMotion: boolean;
  selected: boolean;
  node: SkillCubeNode;
}

export function SkillCube({
  activated,
  connected,
  current,
  index,
  layout,
  node,
  onNavigate,
  quality,
  reducedMotion,
  selected,
}: SkillCubeProps) {
  const group = useRef<Group>(null);
  const coreMaterial = useRef<MeshStandardMaterial>(null);
  const wasActivated = useRef(activated);
  const activatedAt = useRef(0);
  const [x, y, z] = getNodePosition(node, layout);
  const accent = categoryColor(node.category);

  useEffect(() => {
    if (activated && !wasActivated.current) activatedAt.current = performance.now() / 1000;
    wasActivated.current = activated;
  }, [activated]);

  useFrame(({ clock }) => {
    if (!group.current || !coreMaterial.current) return;
    const elapsed = clock.getElapsedTime();
    const now = performance.now() / 1000;
    const assembly = reducedMotion ? 1 : Math.min(1, Math.max(0, (elapsed - index * 0.045) / 0.5));
    const easedAssembly = 1 - (1 - assembly) * (1 - assembly);
    const activationAge = activatedAt.current ? Math.max(0, now - activatedAt.current) : Infinity;
    const activationPulse = activationAge < 1.25 ? 1 - activationAge / 1.25 : 0;
    const activePulse = activated ? 0.1 + Math.sin(elapsed * 3.1 + index) * 0.04 : 0;
    const emphasis = current || selected ? 0.035 + Math.sin(elapsed * 3.4) * 0.012 : 0;
    const routePulse = connected ? 0.026 + Math.sin(elapsed * 4.6 + index) * 0.014 : 0;
    const scale = Math.min(1.1, 0.92 + easedAssembly * 0.08 + activationPulse * 0.08 + emphasis);
    const hover =
      current || selected
        ? 0.07 + Math.sin(elapsed * 2.8 + index) * 0.025
        : connected
          ? Math.sin(elapsed * 3.5 + index) * 0.028
          : activated
            ? Math.sin(elapsed * 1.7 + index) * 0.012
            : 0;

    group.current.position.set(x, y - (1 - easedAssembly) * 2.4 + hover, z);
    group.current.scale.setScalar(scale);
    group.current.rotation.y = Math.sin(elapsed * 0.72 + index * 0.8) * (current ? 0.045 : 0.018);
    group.current.rotation.z = connected ? Math.sin(elapsed * 2.2 + index) * 0.012 : 0;
    coreMaterial.current.emissiveIntensity = activated
      ? 1.3 + activePulse + activationPulse * 3.2 + emphasis * 4 + routePulse * 2.8
      : 0.32 + emphasis * 2 + routePulse * 3;
  });

  const highlighted = current || selected || connected;

  return (
    <group
      ref={group}
      onClick={(event) => {
        event.stopPropagation();
        onNavigate?.();
      }}
      onPointerEnter={(event) => {
        event.stopPropagation();
        document.body.style.cursor = connected ? "pointer" : "help";
      }}
      onPointerLeave={() => {
        document.body.style.cursor = "";
      }}
    >
      <RoundedBox args={[1.34, 0.76, 1.34]} radius={0.1} smoothness={5} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={activated ? "#20365d" : "#263a58"}
          metalness={0.42}
          roughness={0.27}
          clearcoat={0.9}
          clearcoatRoughness={0.12}
          transparent
          opacity={activated ? 0.8 : 0.86}
          transmission={quality === "high" ? 0.14 : 0}
          thickness={0.35}
          ior={1.35}
        />
        <Edges
          threshold={15}
          color={activated ? accent : "#7d9fc5"}
          linewidth={activated ? 1.8 : 1}
        />
      </RoundedBox>
      <RoundedBox args={[0.98, 0.5, 0.98]} radius={0.075} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial
          ref={coreMaterial}
          color={activated ? "#2e568f" : "#274766"}
          emissive={activated ? accent : "#2f6da8"}
          emissiveIntensity={0.32}
          metalness={0.58}
          roughness={0.24}
        />
      </RoundedBox>
      {activated && (
        <>
          <mesh position={[-0.675, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.54, 0.5]} />
            <meshBasicMaterial color="#2ebcff" transparent opacity={0.48} />
          </mesh>
          <mesh position={[0, 0, 0.675]}>
            <planeGeometry args={[0.54, 0.5]} />
            <meshBasicMaterial color="#ff3658" transparent opacity={0.43} />
          </mesh>
        </>
      )}
      {highlighted && (
        <mesh position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.4, 0.53, 32]} />
          <meshBasicMaterial
            color={current ? "#f5fbff" : connected ? "#9eeeff" : accent}
            transparent
            opacity={connected ? 0.95 : 0.85}
          />
        </mesh>
      )}
    </group>
  );
}
