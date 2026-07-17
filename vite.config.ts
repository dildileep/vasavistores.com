import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// Static SPA build for GitHub Pages.
// Production build is served at https://dildileep.github.io/vasavistores.com/,
// so the base must match — but only in production. In dev/preview the app
// is served at "/" so we keep the base as "/" there.
export default defineConfig(({ command }) => {
  const isProductionBuild = command === "build";

  return {
    base: isProductionBuild ? "/vasavistores.com/" : "/",
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
  };
});
