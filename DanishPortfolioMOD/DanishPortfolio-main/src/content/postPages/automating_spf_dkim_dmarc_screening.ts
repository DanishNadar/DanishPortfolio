import type { PostPageContent } from "./types";

export const post: PostPageContent = {
  "slug": "automating-spf-dkim-dmarc-screening",
  "title": "Automating SPF, DKIM, and DMARC Screening",
  "subtitle": "How I turned domain-authentication checks into a practical security automation workflow.",
  "postType": "technical_writeup",
  "status": "published",
  "writtenDate": "2026-05-29",
  "summary": "A real engineering reflection on building DNS and email-authentication tooling that translates SPF, DKIM, and DMARC findings into clearer security decisions and outreach-ready context.",
  "body": "![DNS security automation dashboard](/portfolio_images/articles/dns-automation-article.jpg)\n\n## Why this matters\n\nEmail security can feel invisible until something goes wrong. SPF, DKIM, and DMARC are quiet infrastructure, but they directly shape whether a domain can be trusted and whether a business is vulnerable to impersonation.\n\n## The system behind the story\n\nI built toward a scanner and outreach workflow that does more than print raw DNS records. The system checks authentication signals, interprets gaps, and presents findings in language a human can act on.\n\n![SPF DKIM DMARC stack visual](/portfolio_images/stackmap/spf-dkim-dmarc.jpg)\n\n## What the work proves\n\nThis shows security automation, backend scripting, data presentation, and product judgment. A useful tool does not simply surface complexity; it turns complexity into a next step.\n\n![Security automation workflow visual](/portfolio_images/stackmap/security-automation.jpg)\n\n## Engineering takeaway\n\nI can take a messy technical domain, break it into repeatable checks, and design a workflow that helps people act with confidence.",
  "tags": [
    "DNS",
    "Email Security",
    "Security Automation",
    "SPF DKIM DMARC",
    "Production App Workflows"
  ],
  "relatedProjectSlugs": [
    "dns-security-scanner",
    "ttp-outreach-automation"
  ],
  "relatedStack": [
    "DNS",
    "Email Security",
    "Security Automation",
    "SPF DKIM DMARC",
    "Python",
    "Streamlit"
  ],
  "suggestedImages": [],
  "sourceLinks": [],
  "nextActions": []
};
