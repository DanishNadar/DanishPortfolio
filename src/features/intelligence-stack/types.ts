export type MoveDirection = "forward" | "back" | "left" | "right";

export type StackMapLayout = "stack" | "constellation" | "circuit";

export interface StackMission {
  id: "foundation-run" | "perception-run" | "autonomy-circuit";
  title: string;
  label: string;
  description: string;
  caseFile: string;
  casePrompt: string;
  objectiveNodeId: string;
  objectiveLabel: string;
  objectiveChapter: string;
  objectiveStory: string;
  transitionStory: string;
  startNodeId: string;
  layout: StackMapLayout;
}

export type CubeCategory =
  | "Foundation"
  | "Machine Learning"
  | "Computer Vision"
  | "Robotics"
  | "Autonomous Systems"
  | "Sensor Fusion"
  | "AI Infrastructure"
  | "Integrated Intelligence";

export interface SkillCubeNode {
  id: string;
  label: string;
  category: CubeCategory;
  description: string;
  position: readonly [number, number, number];
  prerequisiteIds: readonly string[];
  neighbors: Partial<Record<MoveDirection, string>>;
  projectSlug?: string;
  major?: boolean;
  finalNode?: boolean;
}

export interface SkillReference {
  label: string;
  href: string;
  kind: "Case study" | "Article";
}

export interface SkillStory {
  image: string;
  imageAlt: string;
  story: string;
  references: readonly SkillReference[];
}

export interface JumpState {
  fromId: string;
  toId: string;
  startedAt: number;
  duration: number;
}

export type CompletionStage = "objective" | "mastery" | null;

export type QualityMode = "auto" | "high" | "low";

export type GameEvent = "activate" | "invalid" | "move" | "complete";
