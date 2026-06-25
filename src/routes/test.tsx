import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Background Test  -  Danish Nadar" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: BackgroundTestPage,
});

function BackgroundTestPage() {
  return <main className="min-h-screen bg-transparent" aria-label="Background animation test" />;
}
