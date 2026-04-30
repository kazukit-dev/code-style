import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 80,
  trailingComma: "all",
  semi: true,
  sortImports: {
    newlinesBetween: true,
    customGroups: [
      {
        groupName: "node-builtin",
        selector: "builtin",
        elementNamePattern: ["node:**"],
      },
    ],
    groups: [
      "side_effect",
      "node-builtin",
      ["builtin", "external"],
      "unknown",
      ["parent", "sibling", "index"],
    ],
  },
  overrides: [
    {
      files: ["*.jsonc"],
      options: {
        trailingComma: "none",
      },
    },
  ],
});
