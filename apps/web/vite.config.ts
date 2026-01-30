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
    proxy: {
      "/admin": {
        target: "http://localhost:4000", // this is temporary, should replace it with api on production
        changeOrigin: true,
      },
    },
  },
});
