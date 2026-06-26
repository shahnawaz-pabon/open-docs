# Open Docs site

This project was scaffolded with
[`@opendocs/create`](https://github.com/shahnawaz-pabon/open-docs).

## Getting started

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Writing content

Add `.mdx` files under `content/docs/`. Each folder may contain a `meta.json`
to set its title and order pages. Frontmatter (`title`, `description`) drives
the page head, search, and navigation.

## Scripts

| Script           | Description                      |
| ---------------- | -------------------------------- |
| `pnpm dev`       | Start the dev server             |
| `pnpm build`     | Build the static export (`out/`) |
| `pnpm lint`      | Lint with ESLint                 |
| `pnpm typecheck` | Type-check with TypeScript       |
| `pnpm test`      | Run the test suite               |

## Customizing

- **Brand color:** edit `--color-brand-*` in `styles/globals.css`.
- **Navigation:** add `meta.json` files in `content/docs/`.
- **Components:** the MDX component library lives in `components/mdx/`.

Built on [Open Docs](https://github.com/shahnawaz-pabon/open-docs) — MIT licensed.
