import { base, node, vitest } from "@kazukit/oxlint-config";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [base, node, vitest],
});
