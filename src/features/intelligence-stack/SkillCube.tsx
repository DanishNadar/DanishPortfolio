import { Edges, RoundedBox } from "@react-three/drei";
import { categoryColor, getNodePosition } from "./scene-utils";
import type { SkillCubeNode, StackMapLayout } from "./types";

interface SkillCubeProps {
  activated: boolean;
  connected: boolean;
  current: boolean;
  layout: StackMapLayout;
  onNavigate?: () => void;
  selected: boolean;
  node: SkillCubeNode;
}

export function SkillCube({
  activated,
  connected,
  current,
  layout,
  node,
  onNavigate,
  selected,
}: SkillCubeProps) {
  const position = getNodePosition(node, layout);
  const accent = categoryColor(node.category);
  const highlighted = current || selected || connected;

  return (
    <group
      position={position}
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
        />
        <Edges
          threshold={15}
          color={activated ? accent : "#7d9fc5"}
          linewidth={activated ? 1.8 : 1}
        />
      </RoundedBox>
      <RoundedBox args={[0.98, 0.5, 0.98]} radius={0.075} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={activated ? "#2e568f" : "#274766"}
          emissive={activated ? accent : "#2f6da8"}
          emissiveIntensity={activated ? (highlighted ? 1.62 : 1.36) : highlighted ? 0.5 : 0.32}
          metalness={0.58}
          roughness={0.24}
        />
      </RoundedBox>
      {activated && (
        <>
          <mesh renderOrder={1} position={[-0.675, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.54, 0.5]} />
            <meshBasicMaterial color="#2ebcff" transparent opacity={0.48} depthWrite={false} />
          </mesh>
          <mesh renderOrder={1} position={[0, 0, 0.675]}>
            <planeGeometry args={[0.54, 0.5]} />
            <meshBasicMaterial color="#ff3658" transparent opacity={0.43} depthWrite={false} />
          </mesh>
        </>
      )}
      {highlighted && (
        <mesh renderOrder={2} position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.4, 0.53, 32]} />
          <meshBasicMaterial
            color={current ? "#f5fbff" : connected ? "#9eeeff" : accent}
            transparent
            opacity={connected ? 0.95 : 0.85}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}
