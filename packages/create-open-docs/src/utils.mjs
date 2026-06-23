// Pure, dependency-free helpers for the create-open-docs CLI.
// Kept separate from I/O so they can be unit-tested with `node --test`.

/** Package managers the CLI can scaffold for. */
export const PACKAGE_MANAGERS = ['pnpm', 'npm', 'yarn']

/**
 * Normalize a raw project name into a valid npm package name:
 * lowercased, spaces → dashes, illegal chars stripped, collapsed dashes.
 */
export function toPackageName(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-~._]+/g, '-')
    .replace(/^[-_.]+|[-_.]+$/g, '')
    .replace(/-{2,}/g, '-')
}

/**
 * Validate a project name. Returns `{ valid, problem }`. Empty names, names
 * that normalize to nothing, and absolute/parent paths are rejected.
 */
export function validateProjectName(input) {
  const raw = String(input ?? '').trim()
  if (!raw) return { valid: false, problem: 'Project name cannot be empty.' }
  if (raw.includes('/') || raw.includes('\\')) {
    return { valid: false, problem: 'Project name cannot contain path separators.' }
  }
  if (raw === '.' || raw === '..') {
    return { valid: false, problem: 'Project name cannot be "." or "..".' }
  }
  if (!toPackageName(raw)) {
    return { valid: false, problem: 'Project name has no usable characters.' }
  }
  return { valid: true, problem: null }
}

/** True for `#rgb` or `#rrggbb` hex colors (with or without the leading #). */
export function isValidHexColor(input) {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(String(input).trim())
}

/** Normalize a hex color to a lowercase 6-digit form with a leading #. */
export function normalizeHex(input) {
  let hex = String(input).trim().replace(/^#/, '').toLowerCase()
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('')
  }
  return `#${hex}`
}

/** Resolve the install command for a given package manager. */
export function installCommand(pm) {
  return pm === 'npm' ? 'npm install' : `${pm} install`
}

/** Resolve the dev command hint shown after scaffolding. */
export function devCommand(pm) {
  return pm === 'npm' ? 'npm run dev' : `${pm} dev`
}
