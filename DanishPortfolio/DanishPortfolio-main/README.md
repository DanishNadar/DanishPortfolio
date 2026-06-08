# Danish Nadar — AI Engineer Portfolio

Full-stack portfolio website built with **TanStack Start (React 19 + Vite)** and **Supabase / Lovable Cloud**. Features a manual post publishing pipeline, admin dashboard, project case studies, and an AI avatar system.

---

## Requirements

- **Node.js** `>= 22.13` (pinned to `22.16.0` via `.nvmrc`)
- **npm** `>= 10` (ships with Node 22)

This project uses **npm**. Bun is not required.

```bash
nvm use            # picks up .nvmrc
npm install
npm run dev
```

Then open <http://localhost:5173>.

### Scripts

| Script           | Purpose                          |
| ---------------- | -------------------------------- |
| `npm run dev`    | Local dev server (Vite)          |
| `npm run build`  | Production build                 |
| `npm run preview`| Preview the production build     |
| `npm run lint`   | ESLint                           |
| `npm run format` | Prettier write                   |

---

## Environment variables

The project ships with a `.env` auto-populated by Lovable Cloud. Required for full functionality:

| Variable                          | Required | Purpose                                              |
| --------------------------------- | -------- | ---------------------------------------------------- |
| `VITE_SUPABASE_URL`               | yes      | Supabase project URL (client-side)                   |
| `VITE_SUPABASE_PUBLISHABLE_KEY`   | yes      | Supabase publishable key (client-side)               |
| `SUPABASE_URL`                    | yes      | Same URL, server-side                                |
| `SUPABASE_PUBLISHABLE_KEY`        | yes      | Same key, server-side                                |
| `SUPABASE_SERVICE_ROLE_KEY`       | server   | Admin operations (server functions only — never expose) |
| `LOVABLE_API_KEY`                 | optional | Powers AI avatar via the Lovable AI Gateway          |
| `GITHUB_TOKEN`                    | optional | Future GitHub repo sync                              |
| `HUGGINGFACE_TOKEN`               | optional | Future XTTS-v2 voice cloning                         |
| `RESEND_API_KEY`                  | optional | Future contact-form email notifications              |

**Fallback mode**: If Supabase is unreachable or any optional integration is missing, the site continues to work — it serves seeded local portfolio data, the avatar uses browser TTS, and integration panels render as "not configured".

---

## Supabase setup

The Supabase project is already provisioned via Lovable Cloud. The schema lives in `supabase/migrations/`. Key tables:

- `profiles`, `projects`, `posts`, `skills`, `github_repos`
- `project_media`, `post_media`
- `avatar_knowledge_sources`, `avatar_personality_rules`, `avatar_voice_profiles`
- `avatar_sessions`, `avatar_messages`
- `external_integrations`, `integration_logs`
- `contact_messages`, `analytics_events`
- `user_roles` (with `has_role()` security-definer function)

Storage buckets:

- Public: `public-media`, `project-media`, `post-media`, `avatar-models`, `avatar-reference-photos`
- Private (admin / signed-URL): `private-voice-samples`, `generated-avatar-audio`

### First-time admin login

1. Visit `/admin/login`, create an account.
2. The first user is automatically granted the `admin` role (`handle_new_user` trigger).
3. Subsequent users get the `user` role.

---

## Architecture

```
src/
├── routes/               TanStack Router file-based routes
│   ├── _authenticated/   Admin-only routes (guarded)
│   ├── admin/            -> /admin/* dashboard
│   ├── posts.tsx         Public post listing
│   └── posts.$slug.tsx   Public post detail
├── components/
│   ├── avatar/           3D avatar system (Phase 2)
│   └── ui/               shadcn primitives
├── lib/
│   ├── data/             Supabase-first data accessors with seed fallback
│   ├── integrations/     Adapter layer (GitHub, HuggingFace, LLM, contact)
│   └── queries.ts        TanStack Query options
├── data/
│   ├── portfolio.json    Source-of-truth seed content
│   └── seedPortfolio.ts  Typed seed accessors
└── integrations/supabase Auto-generated Supabase clients (do not edit)
```

### Server-side logic

App-internal server logic uses **TanStack `createServerFn`** (not Supabase Edge Functions). External webhooks live under `src/routes/api/public/`.

---

## Manual post publishing

The admin posts editor (`/admin/posts`) is the only way to add LinkedIn-style updates, event reflections, technical writeups, and project updates. There is **no LinkedIn scraping or LinkedIn API sync** — by design. Paste the source text, upload images, tag related projects, preview, publish.

---

## Roadmap

- ✅ Phase 1 — Foundation, posts pipeline, admin dashboard, fallback layer
- 🚧 Phase 2 — 3D avatar (Three.js / R3F), avatar studio, knowledge base CRUD, AI chat
- 🚧 Phase 3 — XTTS-v2 voice cloning, GitHub sync, integrations hub, command palette


## Important: run from the actual app folder

If you unzip this package inside another folder, make sure you run commands from the nested `LovablePortfolio` app folder that contains this `package.json`.

Correct example:

```bash
cd ~/Documents/Development/DanishPortfolio/LovablePortfolio
nvm use 22.16.0
npm install --include=optional
npm run build
npm run dev
```

If `npm run` only shows a `test` script, you are in the wrong parent folder. Run `pwd`, then `cd LovablePortfolio`.

## Fonts

The site uses a mixed techno/professional type system:

- Orbitron for major headings and hero typography
- Goldman for navigation, buttons, labels, and technical UI accents
- Zen Dots for logo-like marks, numbers, and special futuristic accents
- Inter for readable body text
- JetBrains Mono for code/terminal-style text
