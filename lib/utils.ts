import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names with Tailwind-aware conflict resolution.
 *
 * `clsx` handles conditional/array/object inputs; `tailwind-merge` ensures that
 * later utility classes win over earlier conflicting ones
 * (e.g. `cn('p-2', 'p-4')` → `'p-4'`).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** Prefix a root-relative path with the configured base path (for sub-path hosting). */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  if (!path.startsWith('/')) return path
  return `${base}${path}`
}
