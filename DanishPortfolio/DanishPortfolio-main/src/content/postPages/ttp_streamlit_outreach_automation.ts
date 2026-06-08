import type { PostPageContent } from "./types";

export const post: PostPageContent = {
  "slug": "ttp-streamlit-outreach-automation",
  "title": "Turning DNS Findings Into a Batch-Safe Streamlit Outreach Tool",
  "subtitle": "A useful internal tool must be stable enough for someone else to trust.",
  "postType": "technical_writeup",
  "status": "published",
  "writtenDate": "2026-05-29",
  "summary": "A real engineering article on making a Streamlit outreach automation tool more reliable for larger batches, test sends, live sends, and non-technical users.",
  "body": "![Batch-safe Streamlit outreach automation visual](/portfolio_images/articles/ttp-streamlit-article.jpg)\n\n## Why this matters\n\nA tool that works for one test case is not ready for a real user. The outreach workflow needed to handle larger batches, test sends, and live sends without crashing.\n\n## The system behind the story\n\nReliability meant controlling state, limiting failure points, making progress visible, and creating safe boundaries between test and live actions.\n\n![Streamlit stack visual](/portfolio_images/stackmap/streamlit.jpg)\n\n## What the work proves\n\nThis proves I can move a fragile prototype toward a tool someone else can actually use.\n\n![Microsoft Graph API stack visual](/portfolio_images/stackmap/microsoft-graph-api.jpg)\n\n## What employers should remember\n\nThe difference between code that runs and software that supports a workflow is engineering judgment.",
  "tags": [
    "Streamlit",
    "Microsoft Graph API",
    "Automation",
    "Email Security",
    "Production App Workflows"
  ],
  "relatedProjectSlugs": [
    "ttp-outreach-automation",
    "dns-security-scanner"
  ],
  "relatedStack": [
    "Streamlit",
    "Microsoft Graph API",
    "Process Automation",
    "Security Automation",
    "Python"
  ],
  "suggestedImages": [],
  "sourceLinks": [],
  "nextActions": []
};
