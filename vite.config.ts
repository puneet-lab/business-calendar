import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

export const testConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
});
