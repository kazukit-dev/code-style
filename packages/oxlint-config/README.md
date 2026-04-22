# @kazukit/oxlint-config

Shared [oxlint](https://oxc.rs/docs/guide/usage/linter) configuration, split by runtime and use case.

## Requirements

- **oxlint** `>=1.61.0`
- **Node.js** `>=22.18.0` or **Bun** (required to execute `oxlint.config.ts`)

## Installation

```sh
bun add -D @kazukit-dev/oxlint-config oxlint
# or
npm install -D @kazukit-dev/oxlint-config oxlint
```

## Usage

Create `oxlint.config.ts` at your project root and compose the configs you need:

```ts
// oxlint.config.ts
import { defineConfig } from "oxlint"
import { base, bun, vitest } from "@kazukit-dev/oxlint-config"

export default defineConfig({
  extends: [base, bun, vitest],
})
```

## Available configs

All configs are exposed as named exports from the package root.

### `base`

Environment-agnostic rules applied everywhere.

- `import/*` — no duplicates, first-order imports, no cycles
- `typescript/*` — `no-explicit-any`, `no-deprecated`, `return-await`, `array-type`
- `unicorn/*` — `no-array-sort`, `no-array-reverse`
- General — `eqeqeq`, `no-var`, `default-case`, `no-else-return`, `unused-vars` (allows `_` prefix)

### `bun`

For Bun projects. Extends `base`.

- Declares `node` / `es2024` env and `Bun` global
- **Disallows `node:*` imports** — prefers Bun native APIs (`Bun.file`, `Bun.$`, etc.)

### `node`

For Node.js projects. Extends `base`.

- Declares `node` / `es2024` env
- Enables the `node` plugin

### `vitest`

For test files. Extends `base`.

- Declares `vitest` env
- Enables the `vitest` plugin with curated rules (`no-conditional-tests`, `prefer-called-once`, etc.)

## Recipes

### Bun project with vitest-compatible tests

```ts
import { defineConfig } from "oxlint"
import { bun, vitest } from "@kazukit-dev/oxlint-config"

export default defineConfig({
  extends: [bun, vitest],
})
```

### Node.js project

```ts
import { defineConfig } from "oxlint"
import { node } from "@kazukit-dev/oxlint-config"

export default defineConfig({
  extends: [node],
})
```

### Base only (customize yourself)

```ts
import { defineConfig } from "oxlint"
import { base } from "@kazukit-dev/oxlint-config"

export default defineConfig({
  extends: [base],
  rules: {
    // your overrides
  },
})
```

## License

MIT
