import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getMissingPrerequisites,
  getObjectiveEvidenceNodes,
  LEVEL_NODES,
  NODE_BY_ID,
} from "./level";
import type { CompletionStage, GameEvent, JumpState, MoveDirection, StackMission } from "./types";

interface UseIntelligenceStackGameOptions {
  mission: StackMission;
  onEvent?: (event: GameEvent) => void;
  reducedMotion: boolean;
}

type KeyboardDirection = "up" | "left" | "down" | "right";

interface KeyBinding {
  direction: KeyboardDirection;
  graphDirection: MoveDirection;
  eventKeys: readonly string[];
  label: string;
  targetNodeId?: string;
}

const KEYBOARD_DIRECTIONS: ReadonlyArray<{
  direction: KeyboardDirection;
  graphDirection: MoveDirection;
  eventKeys: readonly string[];
  label: string;
}> = [
  {
    direction: "up",
    graphDirection: "back",
    eventKeys: ["w", "ArrowUp"],
    label: "W / ↑",
  },
  {
    direction: "left",
    graphDirection: "left",
    eventKeys: ["a", "ArrowLeft"],
    label: "A / ←",
  },
  {
    direction: "down",
    graphDirection: "forward",
    eventKeys: ["s", "ArrowDown"],
    label: "S / ↓",
  },
  {
    direction: "right",
    graphDirection: "right",
    eventKeys: ["d", "ArrowRight"],
    label: "D / →",
  },
];

function getKeyBindings(currentNodeId: string): KeyBinding[] {
  const currentNode = NODE_BY_ID.get(currentNodeId)!;
  const preferredDirectionByNodeId = new Map<string, MoveDirection>();
  const directionPriority: readonly MoveDirection[] = ["left", "right", "back", "forward"];

  for (const direction of directionPriority) {
    const nodeId = currentNode.neighbors[direction];
    if (nodeId && !preferredDirectionByNodeId.has(nodeId)) {
      preferredDirectionByNodeId.set(nodeId, direction);
    }
  }

  return KEYBOARD_DIRECTIONS.map((binding) => ({
    ...binding,
    targetNodeId: (() => {
      const nodeId = currentNode.neighbors[binding.graphDirection];
      return nodeId && preferredDirectionByNodeId.get(nodeId) === binding.graphDirection
        ? nodeId
        : undefined;
    })(),
  }));
}

export function useIntelligenceStackGame({
  mission,
  onEvent,
  reducedMotion,
}: UseIntelligenceStackGameOptions) {
  const [activatedIds, setActivatedIds] = useState<Set<string>>(
    () => new Set([mission.startNodeId]),
  );
  const [currentNodeId, setCurrentNodeId] = useState(mission.startNodeId);
  const [selectedNodeId, setSelectedNodeId] = useState(mission.startNodeId);
  const [jump, setJump] = useState<JumpState | null>(null);
  const [hasBegun, setHasBegun] = useState(false);
  const [objectiveComplete, setObjectiveComplete] = useState(false);
  const [masteryComplete, setMasteryComplete] = useState(false);
  const [masteryNodeId, setMasteryNodeId] = useState(mission.startNodeId);
  const [completionDialog, setCompletionDialog] = useState<CompletionStage>(null);
  const [queuedMasteryDialog, setQueuedMasteryDialog] = useState(false);
  const [feedback, setFeedback] = useState("Activate the foundations. Connect the disciplines.");
  const [resetToken, setResetToken] = useState(0);

  const currentNode = NODE_BY_ID.get(currentNodeId)!;
  const selectedNode = NODE_BY_ID.get(selectedNodeId)!;

  const selectedMissingPrerequisites = useMemo(
    () => getMissingPrerequisites(selectedNode, activatedIds),
    [activatedIds, selectedNode],
  );

  const linkedNodeIds = useMemo(
    () => [
      ...new Set(
        Object.values(currentNode.neighbors).filter((nodeId): nodeId is string => Boolean(nodeId)),
      ),
    ],
    [currentNode.neighbors],
  );

  const keyBindings = useMemo(() => getKeyBindings(currentNodeId), [currentNodeId]);

  const missionEvidenceNodes = useMemo(
    () => getObjectiveEvidenceNodes(mission.objectiveNodeId),
    [mission.objectiveNodeId],
  );
  const missionEvidenceIds = useMemo(
    () => new Set(missionEvidenceNodes.map((node) => node.id)),
    [missionEvidenceNodes],
  );
  const missionEvidenceFound = useMemo(
    () => missionEvidenceNodes.filter((node) => activatedIds.has(node.id)).length,
    [activatedIds, missionEvidenceNodes],
  );
  const mapExplorationFound = activatedIds.size;
  const mapExplorationTotal = LEVEL_NODES.length;
  const mapExplorationPercent = Math.round((mapExplorationFound / mapExplorationTotal) * 100);
  const investigationLead = useMemo(() => {
    if (masteryComplete) {
      return "Map mastery achieved. Every system is active and the full engineering path is visible.";
    }
    if (objectiveComplete) {
      const remaining = mapExplorationTotal - mapExplorationFound;
      return `${mission.objectiveLabel} is secured. Trace the remaining ${remaining} system${remaining === 1 ? "" : "s"} to complete the map.`;
    }

    const connectedEvidence = linkedNodeIds
      .map((nodeId) => NODE_BY_ID.get(nodeId)!)
      .find((node) => missionEvidenceIds.has(node.id) && !activatedIds.has(node.id));

    if (connectedEvidence) {
      const missing = getMissingPrerequisites(connectedEvidence, activatedIds);
      return missing.length
        ? `${connectedEvidence.label} is connected, but its evidence is encrypted by ${missing.map((node) => node.label).join(", ")}.`
        : `Investigate ${connectedEvidence.label}; it is the next available piece of evidence.`;
    }

    const missingEvidence = missionEvidenceNodes.find((node) => !activatedIds.has(node.id));
    return missingEvidence
      ? `Trace a route to ${missingEvidence.label}; it is still missing from the case file.`
      : `Return to ${mission.objectiveLabel} to close the case.`;
  }, [
    activatedIds,
    mapExplorationFound,
    mapExplorationTotal,
    linkedNodeIds,
    masteryComplete,
    mission.objectiveLabel,
    missionEvidenceIds,
    missionEvidenceNodes,
    objectiveComplete,
  ]);

  const begin = useCallback(() => {
    setHasBegun(true);
    setFeedback(
      mission.title +
        " is online. Secure the objective, then explore every system for map mastery.",
    );
  }, [mission.title]);

  const reset = useCallback(() => {
    setActivatedIds(new Set([mission.startNodeId]));
    setCurrentNodeId(mission.startNodeId);
    setSelectedNodeId(mission.startNodeId);
    setJump(null);
    setHasBegun(false);
    setObjectiveComplete(false);
    setMasteryComplete(false);
    setMasteryNodeId(mission.startNodeId);
    setCompletionDialog(null);
    setQueuedMasteryDialog(false);
    setFeedback(mission.title + " selected. " + mission.objectiveLabel + ".");
    setResetToken((value) => value + 1);
  }, [mission.objectiveLabel, mission.startNodeId, mission.title]);

  useEffect(() => {
    reset();
  }, [mission.id, reset]);

  const inspectCurrentNode = useCallback(() => {
    setSelectedNodeId(currentNodeId);
    setFeedback("Inspecting " + currentNode.label + ".");
  }, [currentNode.label, currentNodeId]);

  const attemptMoveTo = useCallback(
    (targetNodeId: string) => {
      const targetNode = NODE_BY_ID.get(targetNodeId);
      if (!targetNode) return;

      setSelectedNodeId(targetNodeId);

      if (!hasBegun) {
        setFeedback("Launch the case file before investigating a system.");
        onEvent?.("invalid");
        return;
      }
      if (jump) {
        setFeedback("Route transfer in progress. Wait until the current jump is complete.");
        onEvent?.("invalid");
        return;
      }
      if (targetNodeId === currentNodeId) {
        setFeedback(`You are already investigating ${targetNode.label}. Choose a connected lead.`);
        onEvent?.("invalid");
        return;
      }

      if (!linkedNodeIds.includes(targetNodeId)) {
        setFeedback(
          `${targetNode.label} is visible, but there is no direct route from ${currentNode.label}. Follow one of the named case routes first.`,
        );
        onEvent?.("invalid");
        return;
      }

      const missing = getMissingPrerequisites(targetNode, activatedIds);

      if (missing.length) {
        setFeedback(
          `${targetNode.label} is encrypted. Recover ${missing.map((node) => node.label).join(", ")} before entering.`,
        );
        onEvent?.("invalid");
        return;
      }

      setFeedback("Routing to " + targetNode.label + "…");
      setJump({
        fromId: currentNodeId,
        toId: targetNodeId,
        startedAt: performance.now(),
        duration: reducedMotion ? 180 : 440,
      });
      onEvent?.("move");
    },
    [
      activatedIds,
      currentNode.label,
      currentNodeId,
      hasBegun,
      jump,
      linkedNodeIds,
      onEvent,
      reducedMotion,
    ],
  );

  const finishJump = useCallback(
    (targetNodeId: string) => {
      const targetNode = NODE_BY_ID.get(targetNodeId)!;
      const alreadyActivated = activatedIds.has(targetNodeId);
      setJump(null);
      setCurrentNodeId(targetNodeId);
      setSelectedNodeId(targetNodeId);

      const nextActivatedIds = new Set(activatedIds);
      nextActivatedIds.add(targetNodeId);
      const objectiveJustCompleted = targetNodeId === mission.objectiveNodeId && !objectiveComplete;
      const masteryJustCompleted = nextActivatedIds.size === LEVEL_NODES.length && !masteryComplete;

      if (alreadyActivated) {
        setFeedback(targetNode.label + " is already active.");
      } else {
        setActivatedIds(nextActivatedIds);
      }

      if (objectiveJustCompleted) {
        setObjectiveComplete(true);
        setCompletionDialog("objective");
      }
      if (masteryJustCompleted) {
        setMasteryComplete(true);
        setMasteryNodeId(targetNodeId);
        setQueuedMasteryDialog(objectiveJustCompleted);
        setCompletionDialog(objectiveJustCompleted ? "objective" : "mastery");
      }

      if (masteryJustCompleted) {
        setFeedback(
          `${mission.title} mastered. Every system has been explored and the full path is now visible.`,
        );
        onEvent?.("complete");
      } else if (objectiveJustCompleted) {
        setFeedback(
          `${mission.objectiveLabel} secured. Continue exploring the remaining systems for map mastery.`,
        );
      } else if (!alreadyActivated) {
        setFeedback(
          targetNode.finalNode
            ? "Integrated Intelligence activated."
            : targetNode.label + " activated.",
        );
        onEvent?.("activate");
      }
    },
    [
      activatedIds,
      masteryComplete,
      mission.objectiveLabel,
      mission.objectiveNodeId,
      mission.title,
      objectiveComplete,
      onEvent,
    ],
  );

  const dismissCompletion = useCallback(() => {
    if (completionDialog === "objective" && queuedMasteryDialog) {
      setQueuedMasteryDialog(false);
      setCompletionDialog("mastery");
      return;
    }
    setCompletionDialog(null);
  }, [completionDialog, queuedMasteryDialog]);

  useEffect(() => {
    if (!hasBegun) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.closest(
          "input, textarea, select, button, a, [role='button'], [contenteditable='true']",
        )
      )
        return;

      const keyboardBinding = keyBindings.find((binding) =>
        binding.eventKeys.some(
          (key) => key === event.key || key.toLowerCase() === event.key.toLowerCase(),
        ),
      );
      if (keyboardBinding) {
        event.preventDefault();
        if (keyboardBinding.targetNodeId) attemptMoveTo(keyboardBinding.targetNodeId);
        else {
          setFeedback(
            `No case route is available for ${keyboardBinding.label} from ${currentNode.label}. Use one of the destinations shown in the route guide.`,
          );
          onEvent?.("invalid");
        }
        return;
      }
      const routeIndex = Number(event.key) - 1;
      if (Number.isInteger(routeIndex) && routeIndex >= 0 && routeIndex < 4) {
        event.preventDefault();
        const targetNodeId = linkedNodeIds[routeIndex];
        if (targetNodeId) attemptMoveTo(targetNodeId);
        else {
          setFeedback(
            `Route ${event.key} is not available from ${currentNode.label}. Choose one of the visible case routes.`,
          );
          onEvent?.("invalid");
        }
        return;
      }
      if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        reset();
        return;
      }
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        inspectCurrentNode();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    attemptMoveTo,
    currentNode.label,
    hasBegun,
    inspectCurrentNode,
    keyBindings,
    linkedNodeIds,
    onEvent,
    reset,
  ]);

  return {
    activatedIds,
    attemptMoveTo,
    begin,
    currentNode,
    currentNodeId,
    completionDialog,
    dismissCompletion,
    feedback,
    finishJump,
    hasBegun,
    inspectCurrentNode,
    isComplete: masteryComplete,
    jump,
    keyBindings,
    linkedNodeIds,
    investigationLead,
    missionEvidenceFound,
    missionEvidenceTotal: missionEvidenceNodes.length,
    mapExplorationFound,
    mapExplorationPercent,
    mapExplorationTotal,
    masteryComplete,
    masteryNodeId,
    mission,
    objectiveComplete,
    reset,
    resetToken,
    selectedMissingPrerequisites,
    selectedNode,
    selectedNodeId,
  };
}
