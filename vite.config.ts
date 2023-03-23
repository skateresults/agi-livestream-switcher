import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: '', // relative paths
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
  },
  plugins: [react()]
});
