import type { PostPageContent } from "./types";

export const post: PostPageContent = {
  "slug": "debugging-vercel-supabase-deploys",
  "title": "What Deployment Bugs Taught Me About Full-Stack AI Products",
  "subtitle": "A broken deployment is not just an error; it is a lesson in systems thinking.",
  "postType": "technical_writeup",
  "status": "published",
  "writtenDate": "2026-05-29",
  "summary": "A practical reflection on debugging Production App Workflows across Vercel, Supabase, environment variables, build commands, and deployment reliability.",
  "body": "![Production deployment debugging visual](/portfolio_images/articles/vercel-debugging-article.jpg)\n\n## Why this matters\n\nLocal success can be misleading. A project can work on one machine and still fail when the environment, build command, dependency graph, or runtime boundary changes.\n\n## The system behind the story\n\nDeployment debugging forces me to read logs, isolate assumptions, verify environment variables, and make fixes repeatable instead of lucky.\n\n![Vercel deployment stack visual](/portfolio_images/stackmap/vercel.jpg)\n\n## What the work shows\n\nThis shows a production mindset. AI products depend on APIs, databases, auth, model services, and front-end flows working together.\n\n![Supabase backend stack visual](/portfolio_images/stackmap/supabase.jpg)\n\n## What employers should remember\n\nI want to build software that can be deployed, tested, fixed, and trusted - not just demos that work once.",
  "tags": [
    "Vercel",
    "Supabase",
    "Production App Workflows",
    "Debugging",
    "Full-Stack AI"
  ],
  "relatedProjectSlugs": [
    "ai-headshot-platform",
    "aila-avatar",
    "selvam-valuations"
  ],
  "relatedStack": [
    "Vercel",
    "Supabase",
    "Production App Workflows",
    "Testing",
    "CI/CD"
  ],
  "suggestedImages": [],
  "sourceLinks": [],
  "nextActions": []
};

