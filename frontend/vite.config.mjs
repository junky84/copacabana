import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../custom_components/copilot/frontend",
    emptyOutDir: true,
    target: "es2021",
    lib: {
      entry: "src/panel.ts",
      formats: ["es"],
      fileName: () => "copilot-panel.js",
    },
    // the chart library is a separate chunk, loaded only by the efficiency view
    rollupOptions: { output: { chunkFileNames: "chunks/[name]-[hash].js" } },
    minify: "esbuild",
    sourcemap: false,
  },
});
