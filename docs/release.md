# Releasing

Releases are driven by [changesets](https://github.com/changesets/changesets) and run
entirely in CI through [`.github/workflows/release.yml`](../.github/workflows/release.yml).
Nothing is published from a local machine.

## Overview

Every push to `main` runs the Release workflow, which behaves differently depending on
whether unreleased changesets exist:

| State on `main`                                    | What the workflow does                                     |
| -------------------------------------------------- | ---------------------------------------------------------- |
| Unreleased changesets exist                        | Opens or updates the **Version Packages** PR               |
| No changesets, but a package version is not on npm | Publishes to npm, pushes git tags, creates GitHub Releases |
| No changesets, everything published                | Does nothing                                               |

So a release always takes two merges: the PR carrying your change plus its changeset, then
the Version Packages PR.

## 1. Add a changeset

Any change to `packages/**` that consumers can observe needs a changeset. That includes
metadata-only changes such as `peerDependencies` ranges and `engines.node` — without a
changeset the new `package.json` sits on `main` but never reaches npm.

```sh
pnpm changeset
```

Pick the affected packages and the bump type, then commit the generated file in
`.changeset/` alongside your change.

Changes that only touch the workspace root (CI config, dev tooling, the root
`package.json`) do not need one.

## 2. Merge the Version Packages PR

Once your PR lands on `main`, the workflow opens a **Version Packages** PR. It runs
`pnpm run ci:version` (`changeset version && pnpm install --lockfile-only`), which applies
the pending changesets: package versions are bumped, `CHANGELOG.md` files are written, and
the consumed changeset files are deleted.

Review the resulting versions and changelog entries, then merge it. That merge triggers the
publish run.

> [!NOTE]
> The Version Packages PR has **no CI checks**. GitHub does not trigger workflows for events
> created with `GITHUB_TOKEN`, so the checks that ran on your original PR are the ones that
> matter. Read the diff instead of waiting for a green tick.

## 3. Verify the publish

The publish run executes `pnpm changeset publish`, which for each newly versioned package
runs `prepack` (`tsc -p tsconfig.build.json`) to build `dist/`, publishes the tarball,
pushes a `<package>@<version>` git tag, and creates a GitHub Release.

```sh
npm view @kazukit/oxlint-config dist-tags
gh release list --limit 3
```

## npm authentication

Publishing uses [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) over
OIDC. There is no npm token anywhere in this repository, and there should not be one.

The workflow grants `id-token: write`, and each package is registered on npmjs.com under
Settings → Trusted Publisher with:

| Field                | Value         |
| -------------------- | ------------- |
| Organization or user | `kazukit-dev` |
| Repository           | `code-style`  |
| Workflow filename    | `release.yml` |
| Environment name     | _(empty)_     |
| Allowed actions      | `npm publish` |

Because the repository and the packages are public, npm attaches SLSA provenance
automatically — no `--provenance` flag needed.

> [!IMPORTANT]
> Do not reintroduce an `NPM_TOKEN` environment variable. `changesets/action` checks
> `NPM_TOKEN` first and writes a token-based `.npmrc`; it only falls back to OIDC when the
> variable is absent. Setting it silently disables trusted publishing and provenance.
>
> Renaming `release.yml` also breaks publishing, because the trusted publisher is bound to
> that exact filename. Update both packages on npmjs.com in the same change.

## Adding a new package

Before its first release, the package needs `publishConfig.access: "public"` (the shared
`.changeset/config.json` defaults to `restricted`) and its own trusted publisher entry on
npmjs.com, using the same values as the table above.

Trusted publishers are configured from a package's settings page, so a package that has
never been published has nowhere to configure one yet. Check the current npm docs for how
to bootstrap the first version before adding a package here.

## Troubleshooting

**`E404 undefined` while publishing.** The registry returns 404 rather than 403 when a
publish is unauthenticated, so this is almost always an authentication problem: an
`NPM_TOKEN` shadowing OIDC, a missing trusted publisher entry, or a workflow filename that
no longer matches the one registered on npmjs.com.

**The publish run failed after Version Packages was merged.** A package that failed to
publish gets no git tag and no GitHub Release, so the repository stays consistent with the
registry. The version bumps are already on `main`, so once the cause is fixed just re-run
the Release workflow; no new commit or changeset is required.

```sh
gh run rerun <run-id> --failed
```

**A published package is missing a change that is on `main`.** Its PR landed without a
changeset. Add one in a follow-up PR describing the change, and it ships with the next
release.
