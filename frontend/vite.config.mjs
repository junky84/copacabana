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
    rollupOptions: { output: { inlineDynamicImports: true } },
    minify: "esbuild",
    sourcemap: false,
  },
});
