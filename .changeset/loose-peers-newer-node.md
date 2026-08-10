---
"@kazukit/oxfmt-config": patch
"@kazukit/oxlint-config": patch
---

Drop the `typescript` peer dependency and widen the remaining peer ranges.

The published artifacts are compiled ESM plus structural `.d.ts` files, so
neither package has any runtime or type-level dependency on the `typescript`
package itself. Requiring it as a peer only forced an install constraint on
consumers for no benefit.

`@kazukit/oxfmt-config` now also accepts `oxfmt@^0.62.0`.

`engines.node` moves to `>=24.19.0`, matching the Node.js version this
repository builds and tests against.
