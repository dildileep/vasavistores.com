// Re-export the Landing page as the SPA root component.
// The full landing implementation lives in ./routes/index.tsx (kept there
// so existing edits/history continue to work). For the static GitHub Pages
// build we don't use TanStack Router — we mount <Landing /> directly.
export { default } from "./routes/index";
