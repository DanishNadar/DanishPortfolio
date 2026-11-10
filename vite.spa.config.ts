import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [tanstackRouter({ target: "react", autoCodeSplitting: true }), react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // three.js is only reached through the lazy /intelligence-stack canvas, so
          // Rollup already isolates it. Forcing it into a named chunk pulled shared
          // helpers into that chunk and made every page download it.
          if (id.includes("node_modules")) {
            if (id.includes("@tanstack")) return "tanstack";
            if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return "react";
          }
          // Everything else is left to Rollup. Forcing catch-all chunks (vendor,
          // admin, post-content, supabase) made every page download all of them,
          // because the route tree references admin routes and shared modules.
          return undefined;
        },
      },
    },
  },
});
