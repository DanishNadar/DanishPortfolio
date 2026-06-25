# LovablePortfolio Full Package

This package is the no-20MB-limit version of the Danish Nadar portfolio project. It includes the full working project plus the supporting source assets needed for future development.

## What is included

### Main project
- React / TanStack Start portfolio source code
- Project and post detail routing/data
- Stack map data/components
- Supabase migrations and generated client files
- Public model folder with the current rigged avatar model path:
  - `public/models/danish-avatar-rigged.glb`
- Manual LinkedIn image pipeline:
  - `public/linkedin_images/`
  - `src/data/linkedinImages.ts`
- Safe environment example:
  - `.env.example`

### Source assets
Stored under `source_assets/` so they are available but not necessarily loaded directly by the app.

- `source_assets/real_photos/` — original/reference professional photos
- `source_assets/voice_samples/` — Danish voice samples for future TTS/voice cloning work
- `source_assets/avatar_models/` — candidate avatar GLB files
- `source_assets/original_archives/` — original legacy portfolio archive for reference

### Public convenience copies
Some assets are also copied into `public/` so the app can use them directly later:

- `public/danish_images/`
- `public/avatar_models_candidates/`
- `public/voice_samples/`

## What is intentionally NOT included

- `node_modules/`
- build output such as `dist/`
- private `.env` files
- secret keys or API tokens

## Run locally

```bash
cd LovablePortfolio
nvm use  # optional, uses .nvmrc if you have nvm
npm install
npm run build
npm run dev
```

Open the URL printed by the dev server.

## Important avatar note

The best current avatar file is:

```text
public/models/danish-avatar-rigged.glb
```

This file can be animated using embedded body animation / bones, but true mouth movement depends on the model having mouth morph targets, visemes, or a jaw bone. If the current model does not expose those controls, the site should gracefully fall back to body/head/speaking-state animation and diagnostics.

For the final avatar, export a model with:
- humanoid rig
- ARKit blendshapes or Oculus visemes
- blink targets
- mouth/jaw targets
- included textures/materials

Then replace:

```text
public/models/danish-avatar-rigged.glb
```

## Beehiiv / external integrations

Do not put secrets in frontend variables. Use server-side secrets only.

Expected future env vars may include:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=
GITHUB_TOKEN=
HUGGINGFACE_TOKEN=
```

Keep real values in `.env` locally or your deployment secret manager. Do not commit `.env`.

## Recommended next checks

```bash
npm install
npm run build
npm run dev
```

Then verify:
- `/projects`
- each `/projects/<slug>` page
- `/posts`
- each `/posts/<slug>` page
- `/about`
- `/stack-map`
- `/avatar`
