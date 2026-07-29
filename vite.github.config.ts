import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/jdic-digital-demo/",
  plugins: [react()],
  build: {
    outDir: "gh-pages",
    emptyOutDir: true,
  },
});
