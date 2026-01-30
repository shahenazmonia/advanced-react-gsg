import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/admin/",
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 4000,
    cors: true,
    origin: "http://localhost:3000",
  },
});
