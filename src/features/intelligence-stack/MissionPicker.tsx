import { Check, Crosshair, Map } from "lucide-react";
import { STACK_MISSIONS } from "./level";
import type { StackMission } from "./types";

interface MissionPickerProps {
  activeMissionId: StackMission["id"];
  onSelect: (missionId: StackMission["id"]) => void;
}

export function MissionPicker({ activeMissionId, onSelect }: MissionPickerProps) {
  return (
    <div className="intelligence-stack-mission-picker" aria-label="Choose a mission">
      {STACK_MISSIONS.map((mission) => {
        const selected = mission.id === activeMissionId;
        return (
          <button
            key={mission.id}
            type="button"
            className={"intelligence-stack-mission-option" + (selected ? " is-selected" : "")}
            onClick={() => onSelect(mission.id)}
            aria-pressed={selected}
          >
            <span className="intelligence-stack-mission-icon" aria-hidden="true">
              {selected ? <Check size={15} /> : <Map size={15} />}
            </span>
            <span className="intelligence-stack-mission-copy">
              <small>{mission.label}</small>
              <strong>{mission.title}</strong>
              <em>{mission.objectiveLabel}</em>
            </span>
            <Crosshair size={14} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
