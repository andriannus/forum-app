/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "@@",
        replacement: path.resolve(__dirname, "."),
      },
    ],
  },
  test: {
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
    environment: "jsdom",
    globals: true,
  },
});
