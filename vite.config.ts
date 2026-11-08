import type { Options } from "@swc/core";
import swc from "unplugin-swc";
import vinext from "vinext";
import { defineConfig } from "vite";

const swcOptions = {
  jsc: {
    target: "es2015",
    externalHelpers: true,
    parser: {
      syntax: "typescript",
      tsx: true,
      decorators: true,
    },
    transform: {
      decoratorVersion: "2022-03",
      useDefineForClassFields: true,
      react: { runtime: "automatic" },
    },
  },
} satisfies Options;

export default defineConfig({
  plugins: [swc.vite({ ...swcOptions, tsconfigFile: false }), vinext()],
});
