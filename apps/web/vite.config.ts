import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: false,
  },
  css: {
    postcss: "../postcss.config.cjs",
  },
  server: {
    port: 3000,
  },
});
