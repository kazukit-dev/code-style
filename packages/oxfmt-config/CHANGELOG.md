# @kazukit/oxfmt-config

## 0.0.3

### Patch Changes

- bf55dba: Drop the `typescript` peer dependency and widen the remaining peer ranges.

  The published artifacts are compiled ESM plus structural `.d.ts` files, so
  neither package has any runtime or type-level dependency on the `typescript`
  package itself. Requiring it as a peer only forced an install constraint on
  consumers for no benefit.

  `@kazukit/oxfmt-config` now also accepts `oxfmt@^0.62.0`.

  `engines.node` moves to `>=24.19.0`, matching the Node.js version this
  repository builds and tests against.

## 0.0.2

### Patch Changes

- 409846c: Publish compiled JavaScript and type declarations instead of raw `.ts`
  sources. Previously `main` / `exports` pointed at `./index.ts`, which made
  the packages unusable from Node.js consumers because Node's type stripping
  is unsupported inside `node_modules` (`ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`).
  Each package now emits to `dist/` via `tsc` on `prepack` and exposes
  `dist/index.js` + `dist/index.d.ts`.

## 0.0.1

### Patch Changes

- 32fb398: initial release
