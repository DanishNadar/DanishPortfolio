# DN Engine regular LLM behavior

This version removes the heavy intent-routing / semantic-card behavior from the DN Response Engine.

## New behavior

- The Groq endpoint now behaves like a normal assistant first.
- It answers the user's actual question instead of forcing every message into a project card.
- It still uses Danish Nadar's full portfolio context whenever the question relates to Danish, his work, skills, projects, achievements, autonomy work, resume, or contact info.
- Ambiguous he/him/his questions usually resolve to Danish because the chat is embedded on his portfolio.
- If a question seems unrelated, it gives a brief normal answer when possible and lightly redirects back to Danish only when helpful.
- If a name/topic is not in the portfolio context, it says that instead of inventing a project match.

## Groq variables

Set these in Vercel, then redeploy:

```env
GROQ_API_KEY=your_private_groq_key_here
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_BASE_URL=https://api.groq.com/openai/v1
```

## Good test prompts

```txt
what is he?
Who is Travish?
Tell me about one of this project.
What has Danish worked on?
How are you?
What is 2 + 2?
Is this a real LLM?
Tell me about his autonomy work.
```

Expected behavior: short, normal answers; no "A strong match is" phrasing; no random project-card output for unrelated questions.
