import { defineConfig } from "vite";

export default defineConfig({
  // libraries such as ECharts check process.env.NODE_ENV; lib builds do not replace it
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
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
