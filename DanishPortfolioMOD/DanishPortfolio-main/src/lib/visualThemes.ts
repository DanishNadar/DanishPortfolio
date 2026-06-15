export type VisualTheme =
  | "brand"
  | "ai"
  | "systems"
  | "writing"
  | "community"
  | "leadership"
  | "academic"
  | "product"
  | "security"
  | "cloud";

export function projectVisualTheme(domain?: string): VisualTheme {
  const value = domain?.toLowerCase() ?? "";
  if (value.includes("robot") || value.includes("autonom")) return "systems";
  if (value.includes("cyber") || value.includes("security")) return "security";
  if (value.includes("fintech") || value.includes("product")) return "product";
  return "ai";
}

export function postVisualTheme(type?: string): VisualTheme {
  const value = type?.toLowerCase() ?? "";
  if (value.includes("leadership") || value.includes("internship")) return "leadership";
  if (value.includes("hackathon") || value.includes("event")) return "community";
  if (value.includes("project") || value.includes("technical") || value.includes("research"))
    return "ai";
  return "writing";
}

export function stackVisualTheme(category?: string): VisualTheme {
  const value = category?.toLowerCase() ?? "";
  if (value.includes("cloud")) return "cloud";
  if (value.includes("security")) return "security";
  if (value.includes("backend") || value.includes("language")) return "systems";
  if (value.includes("robot")) return "systems";
  if (value.includes("leadership")) return "leadership";
  if (value.includes("ai") || value.includes("ml")) return "ai";
  return "systems";
}
