# code-style

Shared code-style configurations for kazukit-dev projects.

## Packages

| Package                                              | Description                                                       |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| [`@kazukit/oxlint-config`](./packages/oxlint-config) | Shared [oxlint](https://oxc.rs/docs/guide/usage/linter) config.   |
| [`@kazukit/oxfmt-config`](./packages/oxfmt-config)   | Shared [oxfmt](https://oxc.rs/docs/guide/usage/formatter) config. |

## Requirements

- [Bun](https://bun.com) `>=1.3.11`

## Development

Install dependencies:

```sh
bun install
```

Format and type-check:

```sh
bun run check:fmt
bun run fix:fmt
bun run typecheck
```

## Release

Each package is published independently from the workspace root:

```sh
bun run release:oxlint-config
bun run release:oxfmt-config
```

## License

MIT
