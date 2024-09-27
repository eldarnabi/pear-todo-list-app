import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // Simulates a browser environment
    globals: true, // Use global variables like describe, test, expect
    setupFiles: "./src/setupTests.js", // Setup file for tests
  },
  build: {
    outDir: "dist",
  },
  server: {
    port: 4000,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
