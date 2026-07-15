import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import { getNodePositionById } from "./scene-utils";
import type { QualityMode, StackMapLayout } from "./types";

interface CompletionBurstProps {
  objectiveNodeId: string;
  quality: QualityMode;
  layout: StackMapLayout;
}

export function CompletionBurst({ objectiveNodeId, quality, layout }: CompletionBurstProps) {
  const group = useRef<Group>(null);
  const startedAt = useRef<number | null>(null);
  const positions = useMemo(() => {
    const amount = quality === "low" ? 52 : 118;
    const values = new Float32Array(amount * 3);
    let seed = 421;
    const random = () => {
      seed = (seed * 48271) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let index = 0; index < amount; index += 1) {
      const radius = 0.12 + random() * 1.55;
      const theta = random() * Math.PI * 2;
      values[index * 3] = Math.cos(theta) * radius;
      values[index * 3 + 1] = (random() - 0.26) * radius * 0.82;
      values[index * 3 + 2] = Math.sin(theta) * radius;
    }
    return values;
  }, [quality]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    if (startedAt.current === null) startedAt.current = clock.getElapsedTime();
    const age = clock.getElapsedTime() - startedAt.current;
    const scale = Math.min(1, 0.42 + age * 1.25);
    group.current.scale.setScalar(scale);
    const [, targetY] = getNodePositionById(objectiveNodeId, layout);
    group.current.position.y = targetY + 1.04 + Math.min(0.42, age * 0.16);
    group.current.rotation.y = age * 0.32;
  });

  const [targetX, targetY, targetZ] = getNodePositionById(objectiveNodeId, layout);

  return (
    <group ref={group} position={[targetX, targetY + 1.04, targetZ]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#c8f5ff"
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.88}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
