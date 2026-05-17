# @kazukit/oxfmt-config

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
