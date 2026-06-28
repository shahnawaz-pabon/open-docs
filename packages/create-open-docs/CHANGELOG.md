# @opendocsjs/create

## 0.1.2

### Patch Changes

- Fix FileTree (and any component using JSX expression props) rendering empty in
  scaffolded projects. next-mdx-remote v6 enables `blockJS` by default, which
  strips JSX expression attributes (`prop={...}`) from MDX; the template now opts
  out via `blockJS: false` since docs MDX is first-party/trusted.

## 0.1.1

### Patch Changes

- 030e185: Initial public release of `@opendocsjs/create` — scaffold a new Open Docs documentation site with `npx @opendocsjs/create@latest`.
