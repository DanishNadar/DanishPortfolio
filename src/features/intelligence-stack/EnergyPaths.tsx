import { useMemo } from "react";
import { LEVEL_EDGES, NODE_BY_ID } from "./level";
import { getNodePosition } from "./scene-utils";
import type { StackMapLayout } from "./types";

interface EnergyPathsProps {
  activatedIds: ReadonlySet<string>;
  completed: boolean;
  layout: StackMapLayout;
}

export function EnergyPaths({ activatedIds, completed, layout }: EnergyPathsProps) {
  const { positions, colors } = useMemo(() => {
    const positionValues: number[] = [];
    const colorValues: number[] = [];
    for (const [fromId, toId] of LEVEL_EDGES) {
      const from = getNodePosition(NODE_BY_ID.get(fromId)!, layout);
      const to = getNodePosition(NODE_BY_ID.get(toId)!, layout);
      const energized = activatedIds.has(fromId) && activatedIds.has(toId);
      const color = energized || completed ? [0.22, 0.82, 1] : [0.08, 0.15, 0.25];
      positionValues.push(from[0], from[1] + 0.03, from[2], to[0], to[1] + 0.03, to[2]);
      colorValues.push(...color, ...color);
    }
    return {
      positions: new Float32Array(positionValues),
      colors: new Float32Array(colorValues),
    };
  }, [activatedIds, completed, layout]);
  const opacity = completed ? 0.72 : 0.34 + Math.min(0.16, activatedIds.size * 0.012);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={opacity} depthWrite={false} />
    </lineSegments>
  );
}
