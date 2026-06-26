<div align="center">
  <img src="./public/logo.svg" alt="Open Docs" width="180" />
  <h1>Open Docs</h1>
  <p><strong>The most modern, beautiful, user-friendly open-source documentation template.</strong></p>
  <p>Built on Next.js, MDX, and Tailwind CSS. Zero lock-in. MIT licensed.</p>
</div>

---

Open Docs is a production-grade documentation template designed to be the definitive
starting point for modern TypeScript projects. There is no documentation framework to
learn and no vendor lock-in — every component is plain Next.js, React, and TypeScript
that you own and can read top to bottom.

## ✨ Features

- **Runtime MDX** — author docs in MDX with full React component support
- **Instant search** — fuzzy command-palette search (`⌘K` / `Ctrl K`) powered by Fuse.js
- **Dark mode** — near-black, warm-accented theme with no flash on load
- **Mobile friendly** — responsive layout with an accessible navigation drawer
- **Accessible** — WCAG AA, full keyboard navigation, reduced-motion support
- **Fast** — static export, server components, Lighthouse-optimized
- **SEO ready** — metadata, Open Graph, sitemap, robots, JSON-LD
- **Type safe** — strict TypeScript, 90%+ test coverage
- **Zero lock-in** — just Next.js App Router + MDX; MIT licensed

## 🚀 Quick start

```bash
# Scaffold a new project
npx @opendocs/create@latest

# …or clone this repository
git clone https://github.com/shahnawaz-pabon/open-docs.git
cd open-docs
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your docs.

## 📦 Scripts

| Script               | Description                             |
| -------------------- | --------------------------------------- |
| `pnpm dev`           | Start the dev server                    |
| `pnpm build`         | Build the static export (`out/`)        |
| `pnpm lint`          | Run ESLint                              |
| `pnpm typecheck`     | Run the TypeScript compiler (no emit)   |
| `pnpm test`          | Run the Vitest unit suite               |
| `pnpm test:coverage` | Run tests with coverage (90% threshold) |
| `pnpm format`        | Format with Prettier                    |

## 📝 Writing content

Documentation lives in [`content/docs/`](./content/docs). Each `.mdx` file has
frontmatter (`title`, `description`), and each folder has a `meta.json` that controls
its title and page order:

```mdx
---
title: My Page
description: A short summary used for SEO and search.
---

# My Page

Use any built-in component without importing it:

<Callout type="tip">It just works.</Callout>
```

See the [Components docs](./content/docs/components) for the full library
(`Callout`, `Cards`, `Tabs`, `Steps`, `CodeBlock`, `FileTree`, `Badge`).

## 🏗️ Architecture

```
app/         Next.js App Router (homepage, docs routes, sitemap, robots)
components/   UI — mdx/, docs/, search/, marketing/, ui/ primitives
content/      Your documentation (.mdx + meta.json)
lib/          Pure, tested utilities (content loader, slug, headings, search)
hooks/        Client hooks (theme, toc, sidebar, search)
styles/       Tailwind v4 globals + brand design tokens
tests/        Vitest unit tests
```

## 🚢 Deployment

Open Docs is a **static export** — deploy the `out/` directory anywhere.

- **GitHub Pages** — push to `main`; the included workflow builds and deploys
  automatically. For project sites served from a sub-path, the workflow sets
  `BASE_PATH=/<repo>`.
- **Vercel / Netlify / Cloudflare Pages / S3 / any CDN** — point the host at `pnpm build`
  and serve `out/`.

## 🤝 Contributing

Contributions are very welcome — first-timers especially. Please read
[CONTRIBUTING.md](./CONTRIBUTING.md) and our [Code of Conduct](./CODE_OF_CONDUCT.md).

## 📄 License

[MIT](./LICENSE) © SHAHNAWAZ HOSSAN
