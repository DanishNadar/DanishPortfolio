// Lightweight helpers for the manual post publishing pipeline.
// All "auto-generation" is heuristic  -  admin can edit everything.

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function generateTitle(text: string): string {
  if (!text) return "Untitled post";
  const firstLine = text.split("\n").find((l) => l.trim().length > 0) ?? "";
  const clean = firstLine.replace(/[#*_>`-]+/g, "").trim();
  return clean.length > 80 ? clean.slice(0, 77).trimEnd() + "…" : clean || "Untitled post";
}

export function generateSummary(text: string, max = 220): string {
  if (!text) return "";
  const condensed = text
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (condensed.length <= max) return condensed;
  return condensed.slice(0, max - 1).trimEnd() + "…";
}

export function generateWhyThisMatters(text: string): string {
  if (!text) return "";
  // Heuristic  -  surface the second meaningful sentence as a starting point.
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 10);
  return sentences[1] ?? sentences[0] ?? "";
}

export function generateSkillsShown(text: string): string[] {
  if (!text) return [];
  const dictionary = [
    "Python", "PyTorch", "TensorFlow", "C++", "Claude", "ChatGPT", "Hugging Face", "GitHub Copilot",
    "RTMaps", "ROS", "Supabase", "Azure", "AWS", "OpenCV", "YOLO",
    "Reinforcement Learning", "Computer Vision", "NLP", "LLM", "Sensor Fusion",
    "Robotics", "Autonomy", "Cybersecurity", "DNS", "DMARC", "Phishing",
    "Leadership", "Hackathon", "Product",
  ];
  const lower = text.toLowerCase();
  return dictionary.filter((k) => lower.includes(k.toLowerCase()));
}

export const POST_TYPES = [
  { value: "linkedin_post", label: "LinkedIn Post" },
  { value: "event_reflection", label: "Event Reflection" },
  { value: "project_update", label: "Project Update" },
  { value: "technical_writeup", label: "Technical Writeup" },
  { value: "hackathon_recap", label: "Hackathon Recap" },
  { value: "leadership_reflection", label: "Leadership Reflection" },
  { value: "internship_update", label: "Internship Update" },
  { value: "research_note", label: "Research Note" },
  { value: "general_article", label: "General Article" },
] as const;

export type PostType = (typeof POST_TYPES)[number]["value"];
