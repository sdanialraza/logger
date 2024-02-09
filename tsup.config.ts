import { esbuildPluginVersionInjector } from "esbuild-plugin-version-injector"
import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  esbuildPlugins: [esbuildPluginVersionInjector()],
  format: ["cjs", "esm"],
  minify: "terser",
  outDir: "dist",
  platform: "node",
})
