import { LEVEL_NODES } from "./level";
import { SkillCube } from "./SkillCube";
import type { StackMapLayout } from "./types";

interface CubeNetworkProps {
  activatedIds: ReadonlySet<string>;
  connectedNodeIds: ReadonlySet<string>;
  currentNodeId: string;
  layout: StackMapLayout;
  onNavigate: (nodeId: string) => void;
  reducedMotion: boolean;
  selectedNodeId: string;
}

export function CubeNetwork({
  activatedIds,
  connectedNodeIds,
  currentNodeId,
  layout,
  onNavigate,
  reducedMotion,
  selectedNodeId,
}: CubeNetworkProps) {
  return (
    <group>
      {LEVEL_NODES.map((node, index) => (
        <SkillCube
          key={node.id}
          activated={activatedIds.has(node.id)}
          connected={connectedNodeIds.has(node.id)}
          current={currentNodeId === node.id}
          index={index}
          layout={layout}
          node={node}
          onNavigate={() => onNavigate(node.id)}
          reducedMotion={reducedMotion}
          selected={selectedNodeId === node.id}
        />
      ))}
    </group>
  );
}
