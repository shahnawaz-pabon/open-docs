# Contributing to Open Docs

Thank you for your interest in contributing! Open Docs is community driven, and we
welcome contributions of all kinds — from fixing typos to building new features.
First-time contributors are especially welcome.

## Code of Conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). By
participating, you agree to uphold it.

## Getting started

1. **Fork** the repository and clone your fork.
2. Install dependencies with [pnpm](https://pnpm.io):
   ```bash
   pnpm install
   ```
3. Start the dev server:
   ```bash
   pnpm dev
   ```

## Development workflow

Create a branch, make your changes, and make sure everything passes locally:

```bash
pnpm lint        # ESLint
pnpm typecheck   # TypeScript
pnpm test        # Vitest (90% coverage threshold)
pnpm build       # Static export build
```

A Husky pre-commit hook runs `lint-staged` (Prettier + ESLint) automatically, and a
pre-push hook runs typecheck and tests. CI runs the full matrix on every pull request.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/). The type prefix
drives the changelog and release tooling:

| Type        | Use for                                       |
| ----------- | --------------------------------------------- |
| `feat:`     | A new feature                                 |
| `fix:`      | A bug fix                                      |
| `docs:`     | Documentation-only changes                    |
| `refactor:` | A change that neither fixes a bug nor adds a feature |
| `test:`     | Adding or correcting tests                    |
| `build:`    | Build system or dependency changes            |
| `ci:`       | CI configuration changes                       |
| `chore:`    | Other changes that don't modify src or tests  |

Example: `feat: add copy button to code blocks`

## Changesets

If your change should appear in the changelog (most `feat`/`fix` changes), add a
changeset:

```bash
pnpm changeset
```

Pick the appropriate semver bump and write a short, user-facing summary. Commit the
generated file in `.changeset/` with your PR.

## Pull requests

1. Ensure `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass.
2. Add or update tests for any logic in `lib/`.
3. Update documentation when behavior changes.
4. Fill out the PR template and link any related issues.
5. Keep PRs focused — one logical change per PR is easiest to review.

## Adding a new MDX component

1. Create the component in `components/mdx/`.
2. Register it in `components/mdx/index.ts` (`customMdxComponents`).
3. Add a documentation page under `content/docs/components/` and list it in that
   folder's `meta.json`.

## Project structure

See the [Architecture section of the README](./README.md#️-architecture) for a full tour.

## Questions?

Open a [discussion](https://github.com/shahnawaz-pabon/open-docs/discussions) — we're happy
to help.
