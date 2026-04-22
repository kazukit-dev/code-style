import { defineConfig } from "oxlint"

export default defineConfig({
  plugins: ["import", "typescript", "eslint", "unicorn"],
  rules: {
    "import/no-duplicates": "error",
    "import/first": "error",
    "import/no-cycle": "error",
    "no-var": "error",
    "unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    "default-case": "error",
    "default-case-last": "error",
    eqeqeq: "error",
    "no-else-return": "error",
    "no-eq-null": "error",
    "typescript/array-type": "error",
    "typescript/no-deprecated": "error",
    "typescript/no-explicit-any": "error",
    "typescript/return-await": "error",
    "unicorn/no-array-sort": "error",
    "unicorn/no-array-reverse": "error",
  },
})
