import { defineConfig } from "vitest/config";

// Unit tests for framework-free code in lib/ (TC-STACK-05, TC-PURE-01).
export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
