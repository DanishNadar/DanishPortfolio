import { createFileRoute } from "@tanstack/react-router";
import { IntelligenceStackPage } from "@/features/intelligence-stack/IntelligenceStackPage";

export const Route = createFileRoute("/intelligence-stack")({
  head: () => ({
    meta: [
      { title: "The Intelligence Stack — Danish Nadar" },
      {
        name: "description",
        content:
          "An interactive 3D map of the systems behind Danish Nadar's AI, robotics, autonomy, and intelligent software work.",
      },
    ],
  }),
  component: IntelligenceStackPage,
});
