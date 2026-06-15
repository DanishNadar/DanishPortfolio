# Build fix notes

This package fixes the Vercel error:

```txt
Command "vite build" exited with 127
```

That error means the `vite` executable was not available during the build. The fix does three things:

1. Keeps Vercel's install command explicit: `npm install --include=dev --include=optional ...`.
2. Moves the build-time packages `vite`, `@vitejs/plugin-react`, and `typescript` into `dependencies` so they are installed even if a host omits dev dependencies.
3. Keeps the build script pointed at the SPA config: `vite build -c vite.spa.config.ts`.

Recommended Vercel settings:

- Install Command: `npm install --include=dev --include=optional`
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: blank if this folder is your repo root

Local test:

```bash
rm -rf node_modules dist
npm install --include=dev --include=optional
npm run build
npm run dev
```
