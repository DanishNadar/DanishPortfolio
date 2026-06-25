# Vercel deployment notes

This package is configured to deploy as a static Vite SPA on Vercel.

Why: the previous TanStack Start/Cloudflare SSR output produced `dist/client` and `dist/server` but no `index.html`, which caused Vercel platform 404s. The default `npm run build` now uses `vite.spa.config.ts`, outputs `dist/index.html`, and `vercel.json` rewrites all routes to that file so deep links such as `/projects/observ-e` work.

## Local test

```bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 22.16.0

rm -rf node_modules package-lock.json dist
npm install --include=optional
npm run build
find dist -maxdepth 2 -name index.html -print
npm run dev
```

## Deploy

```bash
git add .
git commit -m "configure Vercel static SPA deployment"
git push origin main --force
```

In Vercel project settings:

- Framework Preset: Vite
- Install Command: `npm install --include=optional`
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: leave blank if the repo root is this folder; set to `LovablePortfolio` only if this folder is nested inside a parent repo.

## Test after deploy

- `/`
- `/projects`
- `/projects/observ-e`
- `/posts/starkhacks-2026-observ-e-win`
- `/resume`
- `/stack-map`
