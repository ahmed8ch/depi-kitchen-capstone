import nkzw from "@nkzw/oxlint-config";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [nkzw],
  ignorePatterns: [
    "dist/**",
    "node_modules/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    ".wrangler/**",
    "src/routeTree.gen.ts",
    "convex/_generated/**",
  ],
  settings: {
    react: {
      linkComponents: [{ name: "Link", attribute: "to" }],
    },
  },
  rules: {
    "@nkzw/ensure-relay-types": "off",
    "@nkzw/no-instanceof": "off",
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
  },
  overrides: [
    {
      files: ["convex/**/*.ts"],
      rules: {
        "no-console": ["error", { allow: ["warn", "error"] }],
      },
    },
    {
      files: [
        "*.config.{ts,mts,js}",
        "e2e/**/*.ts",
        "scripts/**/*.ts",
        "convex/seed.ts",
      ],
      env: {
        node: true,
      },
      rules: {
        "no-console": "off",
      },
    },
  ],
});
