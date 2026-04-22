import { defineConfig } from "oxlint"

import base from "./base"

export default defineConfig({
  extends: [base],
  env: {
    vitest: true,
  },
  plugins: ["vitest"],
  rules: {
    "vitest/no-conditional-tests": "error",
    "vitest/prefer-called-once": "error",
    "vitest/prefer-expect-type-of": "error",
    "vitest/prefer-to-be-falsy": "error",
    "vitest/prefer-to-be-truthy": "error",
    "vitest/no-import-node-test": "error",
  },
})
