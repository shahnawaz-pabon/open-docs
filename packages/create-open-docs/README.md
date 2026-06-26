# @opendocs/create

Scaffold a new [Open Docs](https://github.com/shahnawaz-pabon/open-docs)
documentation site in seconds.

## Usage

```bash
npx @opendocs/create@latest
# or
pnpm create @opendocs
# or
yarn create @opendocs
```

You can pass the project name directly:

```bash
npx @opendocs/create@latest my-docs
```

## What it does

The CLI prompts for:

1. **Project name** — used for the directory and `package.json` name.
2. **Brand accent color** — a hex value that becomes your `--color-brand-500`.
3. **Package manager** — `pnpm`, `npm`, or `yarn`.

It then copies the Open Docs starter template, writes a fresh `package.json`,
applies your brand color, and (optionally) installs dependencies.

## After scaffolding

```bash
cd my-docs
pnpm install   # if you skipped install
pnpm dev
```

Open <http://localhost:3000> and start writing in `content/docs/`.

## License

MIT © SHAHNAWAZ HOSSAN
