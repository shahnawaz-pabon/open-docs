# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets).

When you make a change that should be released, run:

```bash
pnpm changeset
```

Pick the affected package(s) and a semver bump (patch / minor / major), then
write a short summary. The generated markdown file is committed alongside your
change. On merge to `main`, the Release workflow opens a "Version Packages" PR;
merging that PR versions the packages, updates the changelog, and publishes to
npm.
