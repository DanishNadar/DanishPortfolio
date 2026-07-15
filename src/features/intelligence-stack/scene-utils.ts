import { getMissionPosition, NODE_BY_ID } from "./level";
import type { SkillCubeNode, StackMapLayout } from "./types";

export function getNodePosition(
  node: SkillCubeNode,
  layout: StackMapLayout = "stack",
): [number, number, number] {
  const position = getMissionPosition(node, layout);
  return [position[0], position[1] + 0.48, position[2]];
}

export function getNodePositionById(
  nodeId: string,
  layout: StackMapLayout = "stack",
): [number, number, number] {
  const node = NODE_BY_ID.get(nodeId);
  if (!node) return [0, 0.48, 0];
  return getNodePosition(node, layout);
}

export function categoryColor(category: SkillCubeNode["category"]) {
  switch (category) {
    case "Computer Vision":
    case "Sensor Fusion":
      return "#47d7ff";
    case "Robotics":
    case "Autonomous Systems":
      return "#ff546d";
    case "Machine Learning":
      return "#8ea8ff";
    case "AI Infrastructure":
      return "#be78ff";
    case "Integrated Intelligence":
      return "#f4fbff";
    default:
      return "#647da4";
  }
}
