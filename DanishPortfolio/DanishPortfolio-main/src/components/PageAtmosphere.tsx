import {
  Award,
  Bot,
  BrainCircuit,
  CircuitBoard,
  Code2,
  Cpu,
  GraduationCap,
  Lightbulb,
  Network,
  Orbit,
  Radar,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PageMood =
  | "default"
  | "hero"
  | "projects"
  | "community"
  | "leadership"
  | "academic"
  | "autonomy";

const moodIcons: Record<PageMood, LucideIcon[]> = {
  default: [Sparkles, CircuitBoard, Orbit, Code2, Cpu, Network],
  hero: [BrainCircuit, Orbit, Sparkles, Radar, Cpu, Workflow],
  projects: [CircuitBoard, BrainCircuit, Network, Code2, Cpu, Workflow],
  community: [Users, Bot, Network, Lightbulb, Sparkles, Workflow],
  leadership: [Award, Sparkles, Orbit, Lightbulb, Users, Workflow],
  academic: [GraduationCap, CircuitBoard, BrainCircuit, Code2, Lightbulb, Network],
  autonomy: [Orbit, Network, BrainCircuit, Radar, Cpu, Workflow],
};

export function PageAtmosphere({ mood }: { mood: PageMood }) {
  const icons = moodIcons[mood];

  return (
    <div className={`page-atmosphere page-atmosphere-${mood}`} aria-hidden="true">
      <div className="page-atmosphere-wash" />
      <div className="page-atmosphere-grid" />
      <div className="page-atmosphere-noise" />
      <span className="page-atmosphere-orb page-atmosphere-orb-one" />
      <span className="page-atmosphere-orb page-atmosphere-orb-two" />
      <span className="page-atmosphere-orb page-atmosphere-orb-three" />
      <div className="page-atmosphere-icons">
        {icons.map((Icon, index) => (
          <span key={index} className={`page-atmosphere-icon page-atmosphere-icon-${index + 1}`}>
            <Icon strokeWidth={1.35 + (index % 3) * 0.2} />
          </span>
        ))}
      </div>
    </div>
  );
}
