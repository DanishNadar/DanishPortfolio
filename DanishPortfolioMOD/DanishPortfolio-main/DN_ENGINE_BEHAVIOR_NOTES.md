# Current DN Engine direction

The DN Engine should now behave like a regular helpful LLM that happens to have Danish Nadar’s portfolio context. It should not act like a forced semantic search matcher. It should answer normally, use Danish’s context when relevant, and only lightly redirect when the user asks something outside the portfolio.

# DN Engine behavior notes

This version changes the DN Response Engine from a project-card matcher into a conversational portfolio guide with stronger intent handling.

## What changed

- Pronouns like “he,” “him,” and “his” resolve to Danish Nadar when the conversation is about Danish.
- The engine now recognizes negation/contrast questions such as “Who is he not?” and does not repeat the normal identity answer.
- Meta questions like “Is this a real LLM?”, “Is this hardcoded?”, and “What model is this using?” answer about the DN Response Engine itself instead of matching the word “LLM” to a skill card.
- Casual follow-ups like “That’s cool,” “nice,” or “got it” no longer trigger random project recommendations.
- The API filters out bad semantic-match replies like “A strong match is…” before they reach the chat bubble.
- Broad questions like “What has Danish worked on?” still produce a short multi-area summary/list instead of a single random project card.
- If Groq is unavailable, the local fallback now mirrors the same intent rules instead of dumping a project card.

## Good test prompts

Try these after deployment:

- Who is Danish?
- Who is he actually, though?
- But who is he not?
- Tell me about him.
- What has he worked on?
- What can he do?
- That’s cool.
- Alright, tell me about him.
- I’m talking about Danish.
- Is this a real LLM?
- Is this hardcoded?
- What model are you using?
- What has Danish worked on?
- What is Danish capable of?
- How are you?
- What is 2 + 2?
- Tell me about his autonomous vehicle work.
- How can I contact Danish?

## Vercel check

After setting the key, redeploy and open:

```txt
/api/dn-engine-health
```

It should show `groqConfigured: true`.
