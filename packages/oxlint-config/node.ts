import { defineConfig } from "oxlint"

import base from "./base"

export default defineConfig({
  env: {
    node: true,
    es2024: true,
  },
  extends: [base],
})
