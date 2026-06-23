import { cp, mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

import { normalizeHex, toPackageName } from './utils.mjs'

/** Files in the template that should be renamed on copy (npm strips .gitignore). */
const RENAME_ON_COPY = {
  'gitignore': '.gitignore',
  '_npmrc': '.npmrc',
}

/**
 * Copy the template directory into `targetDir`, skipping artifacts that should
 * never ship in a generated project.
 */
export async function copyTemplate(templateDir, targetDir) {
  await mkdir(targetDir, { recursive: true })
  const skip = new Set([
    'node_modules',
    '.next',
    'out',
    'coverage',
    '.git',
    '.turbo',
    'pnpm-lock.yaml',
    'package-lock.json',
    'yarn.lock',
  ])

  await cp(templateDir, targetDir, {
    recursive: true,
    filter: (src) => {
      const base = path.basename(src)
      return !skip.has(base)
    },
  })

  // Restore dotfiles that were stored under safe names in the template.
  for (const [from, to] of Object.entries(RENAME_ON_COPY)) {
    const fromPath = path.join(targetDir, from)
    if (existsSync(fromPath)) {
      await rename(fromPath, path.join(targetDir, to))
    }
  }
}

/**
 * Write a fresh package.json into the generated project: the template's
 * manifest with a new name/version and the workspace/private fields removed.
 */
export async function writePackageJson(targetDir, { projectName }) {
  const pkgPath = path.join(targetDir, 'package.json')
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'))

  pkg.name = toPackageName(projectName)
  pkg.version = '0.1.0'
  pkg.private = true
  delete pkg.homepage
  delete pkg.repository
  delete pkg.bugs
  delete pkg.author
  delete pkg.keywords

  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8')
  return pkg
}

/**
 * Rewrite the brand accent color in the generated global stylesheet. Replaces
 * the `--brand-500` custom property value; harmless if the token is absent.
 */
export async function applyBrandColor(targetDir, brandHex) {
  const cssPath = path.join(targetDir, 'styles', 'globals.css')
  if (!existsSync(cssPath)) return false

  const hex = normalizeHex(brandHex)
  const css = await readFile(cssPath, 'utf8')
  const next = css.replace(
    /(--color-brand-500:\s*)([^;]+)(;)/,
    (_m, p1, _old, p3) => `${p1}${hex}${p3}`,
  )
  await writeFile(cssPath, next, 'utf8')
  return next !== css
}
