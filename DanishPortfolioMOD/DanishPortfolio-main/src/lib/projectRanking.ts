const AI_ENGINEERING_PROJECT_PRIORITY = [
  "observ-e",
  "ecocar-sensor-fusion",
  "lane-detection-salad",
  "rl-autonomous-driving",
  "selvam-valuations",
  "ttp-outreach-automation",
  "dns-security-scanner",
  "a-little-tech-for-you",
  "ai-headshot-platform",
  "aila-avatar",
  "jtr-agent",
  "phishing-detector",
  "fraud-detection",
  "course-recommendation",
  "scammantha",
  "spiron-assistant",
  "shopping-bot",
] as const;

const projectRankBySlug = new Map<string, number>(
  AI_ENGINEERING_PROJECT_PRIORITY.map((slug, index) => [slug, index]),
);

export function compareProjectsForAiEngineering(
  a: { slug: string; title?: string; priority?: number },
  b: { slug: string; title?: string; priority?: number },
) {
  const aRank = projectRankBySlug.get(a.slug);
  const bRank = projectRankBySlug.get(b.slug);

  if (aRank !== undefined || bRank !== undefined) {
    return (
      (aRank ?? AI_ENGINEERING_PROJECT_PRIORITY.length) -
      (bRank ?? AI_ENGINEERING_PROJECT_PRIORITY.length)
    );
  }

  const priorityDifference = (b.priority ?? 0) - (a.priority ?? 0);
  return priorityDifference || (a.title ?? a.slug).localeCompare(b.title ?? b.slug);
}

export function rankProjectsForAiEngineering<
  T extends { slug: string; title?: string; priority?: number },
>(projects: readonly T[]) {
  return [...projects].sort(compareProjectsForAiEngineering);
}
