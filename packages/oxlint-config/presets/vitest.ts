import { defineConfig } from "oxlint";

export default defineConfig({
  overrides: [
    {
      files: ["**/*.{spec,test}.{js,jsx,ts,tsx}"],
      plugins: ["promise", "vitest"],
      env: {
        vitest: true,
      },
      rules: {
        "promise/prefer-await-to-then": "error",
        "vitest/no-conditional-tests": "error",
        "vitest/prefer-called-once": "error",
        "vitest/prefer-expect-type-of": "error",
        "vitest/prefer-to-be-falsy": "error",
        "vitest/prefer-to-be-truthy": "error",
        "vitest/prefer-expect-assertions": [
          "error",
          {
            onlyFunctionsWithAsyncKeyword: true,
          },
        ],
        "vitest/no-import-node-test": "error",
      },
    },
  ],
});
