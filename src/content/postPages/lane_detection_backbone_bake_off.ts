import type { PostPageContent } from "./types";

export const post: PostPageContent = {
  "slug": "lane-detection-backbone-bake-off",
  "title": "Lane Detection Backbone Bake-Off: What Robustness Testing Taught Me",
  "subtitle": "A vision model is only useful when it survives the conditions it will actually face.",
  "postType": "technical_writeup",
  "status": "published",
  "writtenDate": "2026-05-29",
  "summary": "A real article about comparing lane-detection approaches, thinking through robustness, and connecting computer vision results to safer autonomous vehicle systems.",
  "body": "![Lane detection robustness testing visual](/portfolio_images/articles/lane-detection-article.jpg)\n\n## Why this matters\n\nLane detection can look simple in a clean screenshot, but roads are rarely clean. Lighting, shadows, weather, faded markings, and camera angles all make the problem harder.\n\n## The system behind the story\n\nComparing approaches forces better engineering judgment: which model performs consistently, fails gracefully, and supports downstream planning?\n\n![Computer vision stack visual](/portfolio_images/stackmap/computer-vision.jpg)\n\n## What the work shows\n\nThis shows that I care about robustness, metrics, and system fit - not just whether a model looks impressive in an easy case.\n\n![Lane detection result visual](/portfolio_images/autonomy/lane-rl-result.jpg)\n\n## What employers should remember\n\nMy computer vision work is connected to safer autonomy because perception quality shapes every decision that follows.",
  "tags": [
    "Computer Vision",
    "Lane Detection",
    "Autonomous Vehicles",
    "Robustness",
    "Evaluation"
  ],
  "relatedProjectSlugs": [
    "lane-detection-salad",
    "rl-autonomous-driving",
    "ecocar-sensor-fusion"
  ],
  "relatedStack": [
    "Computer Vision",
    "OpenCV",
    "YOLO",
    "Evaluation Metrics",
    "Autonomous Systems"
  ],
  "suggestedImages": [],
  "sourceLinks": [],
  "nextActions": []
};

