import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// Static SPA build for GitHub Pages.
// Repo is served at https://dildileep.github.io/vasavistores.com/, so base must match.
export default defineConfig({
  base: "/vasavistores.com/",
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
});
