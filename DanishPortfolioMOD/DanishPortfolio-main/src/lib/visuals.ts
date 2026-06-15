const markdownImagePattern = /!\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/;

export function firstMarkdownImage(markdown?: string | null) {
  if (!markdown) return "";
  return markdown.match(markdownImagePattern)?.[1] ?? "";
}

export function visualFromPostLike({
  cover,
  suggestedImages,
  body,
  fallback = "/portfolio_images/generated/featured-portfolio-immersive.png",
}: {
  cover?: string | null;
  suggestedImages?: string[] | null;
  body?: string | null;
  fallback?: string;
}) {
  return cover || suggestedImages?.[0] || firstMarkdownImage(body) || fallback;
}

export function projectCoverPath(
  cover?: string | null,
  fallback = "/portfolio_images/generated/featured-portfolio-immersive.png",
) {
  if (!cover) return fallback;
  if (cover.startsWith("/") || cover.startsWith("http")) return cover;
  return `/assets/projects/${cover}`;
}
