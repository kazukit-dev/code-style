import { defineConfig } from "oxlint"

import base from "./base"

export default defineConfig({
  extends: [base],
  env: {
    node: true,
    es2024: true,
  },
  globals: {
    Bun: "readonly",
  },
  rules: {
    "eslint/no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["node:*"],
            message:
              "Prefer Bun native APIs (e.g. Bun.file, Bun.$) over node: built-ins.",
          },
        ],
      },
    ],
  },
})
