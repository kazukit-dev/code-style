# @kazukit/oxfmt-config

Shared [oxfmt](https://github.com/oxc-project/oxfmt) configuration.

## Install

```bash
bun add -D @kazukit/oxfmt-config oxfmt
```

## Usage

Create `oxfmt.config.ts` at your project root and re-export the shared config.

```ts
// oxfmt.config.ts
import base from "@kazukit/oxfmt-config";
import { defineConfig } from "oxfmt";

export default defineConfig({ ...base });
```

Override or extend any field as needed:

```ts
import base from "@kazukit/oxfmt-config";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...base,
  printWidth: 100,
});
```

## What's included

- `printWidth: 80`
- `trailingComma: "all"`
- `semi: true`
- `sortImports` — groups imports as: side-effect → `node:` builtins → builtin/external → unknown → parent/sibling/index, with blank lines between groups
