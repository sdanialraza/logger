import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    exclude: [".cache", ".git", "**/dist", "**/node_modules"],
    passWithNoTests: true,
  },
})
