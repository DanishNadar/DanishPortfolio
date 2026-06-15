import type { PostPageContent } from "./types";

export const post: PostPageContent = {
  "slug": "building-an-rl-lane-keeping-simulator",
  "title": "Building an RL Lane-Keeping Simulator to Ask Better Questions",
  "subtitle": "Reinforcement learning is powerful when it teaches you how to evaluate behavior, not just chase a reward curve.",
  "postType": "technical_writeup",
  "status": "published",
  "writtenDate": "2026-05-29",
  "summary": "A reflection on using reinforcement learning for autonomous driving simulation, reward design, lane keeping, and the discipline of evaluating behavior before trusting it.",
  "body": "![Reinforcement learning lane keeping simulator visual](/portfolio_images/articles/rl-lane-article.jpg)\n\n## Why this matters\n\nAutonomous driving is not only a perception problem. A system also has to choose actions over time, recover from mistakes, and behave safely under changing conditions.\n\n## The system behind the story\n\nThe simulator creates a controlled place to test reward design, failure modes, and repeated behavior before pretending anything is road-ready.\n\n![Reinforcement learning stack visual](/portfolio_images/stackmap/reinforcement-learning.jpg)\n\n## What the work proves\n\nThis work proves that I care about evaluation as much as implementation. I want to know whether an agent learned useful behavior or only exploited a weak reward.\n\n![Lane detection and RL simulation result](/portfolio_images/autonomy/lane-rl-result.jpg)\n\n## Engineering takeaway\n\nThis is the autonomy mindset I want to bring into industry: build, test, question, improve, and validate.",
  "tags": [
    "Reinforcement Learning",
    "Autonomous Vehicles",
    "PPO",
    "Simulation",
    "Evaluation"
  ],
  "relatedProjectSlugs": [
    "rl-autonomous-driving",
    "lane-detection-salad",
    "ecocar-sensor-fusion"
  ],
  "relatedStack": [
    "Reinforcement Learning",
    "PPO",
    "Autonomous Systems",
    "Evaluation Metrics",
    "Python"
  ],
  "suggestedImages": [],
  "sourceLinks": [],
  "nextActions": []
};
