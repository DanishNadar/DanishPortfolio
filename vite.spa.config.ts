import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [tanstackRouter({ target: "react" }), react(), tailwindcss(), tsconfigPaths()],
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
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "motion";
            if (id.includes("@radix-ui")) return "radix-ui";
            if (id.includes("@tanstack")) return "tanstack";
            if (id.includes("@supabase")) return "supabase";
            return "vendor";
          }
          if (id.includes("/src/content/postPages/")) return "post-content";
          if (id.includes("/src/routes/admin/")) return "admin";
        },
      },
    },
  },
});
