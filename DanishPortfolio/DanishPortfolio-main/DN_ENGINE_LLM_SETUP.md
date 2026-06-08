# DN Response Engine · Groq LLM Setup

This version uses Groq as the primary LLM provider for the floating DN Response Engine.

## What changed

- The DN Engine now calls `POST /api/dn-engine`.
- The API endpoint sends the visitor question plus Danish's portfolio knowledge to Groq's OpenAI-compatible chat-completions endpoint.
- Answers are constrained to a few short sentences so the guide feels fast and conversational.
- The engine uses the full profile knowledge base instead of repeating canned project-routing text.
- If Groq is not configured or temporarily fails, the site still returns a short local fallback answer.

## Knowledge files

The structured source of truth is:

```txt
src/data/dn_profile_knowledge.json
```

The long-form human-readable source document is:

```txt
src/data/dn_full_profile_context.md
```

Together, these cover Danish's identity, mission, resume details, projects, achievements, autonomous vehicle work, Stack Map, skills, tools, hobbies, experience, education, contact paths, and routing hints.

## Environment variables

Add these in Vercel under **Project Settings → Environment Variables**:

```bash
GROQ_API_KEY=your_private_groq_key_here
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_BASE_URL=https://api.groq.com/openai/v1
```

Only `GROQ_API_KEY` is required. The model and base URL have safe defaults in `api/dn-engine.ts`.

Do **not** prefix the key with `VITE_`. A `VITE_` key would be exposed to the browser, while this setup keeps the key server-side inside the Vercel function.

## Local development

The regular Vite dev server does not run Vercel serverless functions by itself. For full local Groq testing, use:

```bash
npm install --include=optional
npx vercel dev
```

For normal UI testing without the serverless API, use:

```bash
npm run dev
```

If `/api/dn-engine` is unavailable in normal Vite mode, the DN Engine uses the local fallback brain.

## Answer behavior

The DN Engine prompt now tells Groq to:

- answer the user's exact question first,
- stay within 2–3 short sentences,
- avoid repeating the same response structure,
- avoid forcing every answer into a project recommendation,
- use Danish's portfolio knowledge only,
- return a small JSON object with a reply and optional suggested route.

## Files changed

```txt
api/dn-engine.ts
src/lib/dnLocalBrain.ts
src/lib/dnEngineClient.ts
src/data/dn_profile_knowledge.json
src/data/dn_full_profile_context.md
src/components/FloatingAvatar.tsx
src/components/DNPromptInput.tsx
.env.example
```

## Quick production health check

After deploying to Vercel, open this URL in your browser:

```txt
/api/dn-engine-health
```

If it returns `"groqConfigured": false`, the deployment cannot see your Groq key. Check that the variable is named exactly `GROQ_API_KEY`, that it is added to the correct Vercel project/environment, and that you redeployed after adding it.

This project also keeps `/api/:path*` in front of the SPA fallback inside `vercel.json` so Vercel serverless API routes do not get swallowed by the frontend rewrite.

## 2026-05-30 DN answer-quality patch

The DN Engine now sends recent conversation history to `/api/dn-engine`, so follow-up questions like "just that one thing?" can be answered in context instead of jumping to an unrelated project.

The endpoint prompt and local fallback were also changed so broad questions such as "What is Danish capable of?" return a concise capability summary or a short list instead of a random project card. If the question is unclear, the engine should say that directly and offer professional lanes to choose from.

Good test prompts after deploying:

```txt
Who is Danish?
What is Danish capable of?
Just that one thing? Give me a list.
What autonomy work has Danish done?
How can I contact Danish?
```

If the answers still look like project-card dumps, redeploy Vercel and then test `/api/dn-engine-health`. The value `groqConfigured` should be `true`.
