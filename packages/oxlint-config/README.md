# @kazukit/oxlint-config

Shared [oxlint](https://github.com/oxc-project/oxc) configuration.

## Install

```bash
pnpm add -D @kazukit/oxlint-config oxlint
```

## Usage

Create `oxlint.config.ts` at your project root and compose the presets you need.

```ts
// oxlint.config.ts
import { base, node, vitest } from "@kazukit/oxlint-config";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [base, node, vitest],
});
```

## Presets

- `base` — Common rules across `import`, `typescript`, `eslint`, `unicorn`, `oxc` plugins
- `node` — Node.js environment with `unicorn/prefer-node-protocol`
- `bun` — Bun environment that bans `node:*` imports in favor of Bun native APIs
- `vitest` — Test-file overrides for `*.{spec,test}.{js,jsx,ts,tsx}` enabling `promise` and `vitest` plugin rules

Pick one runtime preset (`node` or `bun`) and add `vitest` if your project uses Vitest.
