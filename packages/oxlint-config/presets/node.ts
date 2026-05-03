import { defineConfig } from "oxlint";

export default defineConfig({
  env: {
    node: true,
    es2024: true,
  },
  rules: {
    "unicorn/prefer-node-protocol": "error",
  },
});
