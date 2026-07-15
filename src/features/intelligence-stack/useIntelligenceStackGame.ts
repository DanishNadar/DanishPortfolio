import { useCallback, useEffect, useMemo, useState } from "react";
import { getMissingPrerequisites, getObjectiveEvidenceNodes, NODE_BY_ID } from "./level";
import type { GameEvent, JumpState, MoveDirection, StackMission } from "./types";

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
  const [isComplete, setIsComplete] = useState(false);
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
  const investigationLead = useMemo(() => {
    if (isComplete) return "Case closed. The objective system is now online.";

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
    isComplete,
    linkedNodeIds,
    mission.objectiveLabel,
    missionEvidenceIds,
    missionEvidenceNodes,
  ]);

  const begin = useCallback(() => {
    setHasBegun(true);
    setFeedback(mission.title + " is online. " + mission.objectiveLabel + ".");
  }, [mission.objectiveLabel, mission.title]);

  const reset = useCallback(() => {
    setActivatedIds(new Set([mission.startNodeId]));
    setCurrentNodeId(mission.startNodeId);
    setSelectedNodeId(mission.startNodeId);
    setJump(null);
    setHasBegun(false);
    setIsComplete(false);
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
      if (isComplete) {
        setFeedback(
          "This case is already closed. Choose another mission to continue investigating.",
        );
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
      isComplete,
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

      if (alreadyActivated) {
        setFeedback(targetNode.label + " is already active.");
      } else {
        setActivatedIds((previous) => {
          const next = new Set(previous);
          next.add(targetNodeId);
          return next;
        });
        setFeedback(
          targetNode.finalNode
            ? "Integrated Intelligence activated."
            : targetNode.label + " activated.",
        );
      }

      const missionComplete = targetNodeId === mission.objectiveNodeId;
      if (missionComplete) {
        setIsComplete(true);
        setFeedback(mission.title + " complete. " + mission.objectiveLabel + " achieved.");
        onEvent?.("complete");
      } else if (!alreadyActivated) {
        onEvent?.("activate");
      }
    },
    [activatedIds, mission.objectiveLabel, mission.objectiveNodeId, mission.title, onEvent],
  );

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
    feedback,
    finishJump,
    hasBegun,
    inspectCurrentNode,
    isComplete,
    jump,
    keyBindings,
    linkedNodeIds,
    investigationLead,
    missionEvidenceFound,
    missionEvidenceTotal: missionEvidenceNodes.length,
    mission,
    reset,
    resetToken,
    selectedMissingPrerequisites,
    selectedNode,
    selectedNodeId,
  };
}
