import { existsSync, readFileSync, statSync } from 'node:fs'
import { readdirSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import matter from 'gray-matter'
import { extractHeadings } from './headings'
import { humanizeSegment, joinSlug } from './slug'
import type { DocFrontmatter, DocPage, FolderMeta } from './types'

/** Root directory holding the documentation MDX tree. */
export const CONTENT_DIR = join(process.cwd(), 'content', 'docs')

const MDX_EXT = /\.mdx?$/

/**
 * Recursively collect every `.md`/`.mdx` file path under `dir`.
 * Returned paths are absolute. Hidden files (dot-prefixed) are skipped.
 */
function walk(dir: string): string[] {
  if (!existsSync(dir)) return []
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...walk(full))
    } else if (MDX_EXT.test(entry.name)) {
      out.push(full)
    }
  }
  return out
}

/**
 * Map an absolute content file path to its route slug segments.
 *
 * - `index.mdx` resolves to its containing folder (so `guides/index.mdx`
 *   → `['guides']` and the root `index.mdx` → `[]`).
 * - Other files use their path minus the extension.
 */
export function filePathToSlug(filePath: string, contentDir = CONTENT_DIR): string[] {
  const rel = relative(contentDir, filePath).replace(MDX_EXT, '')
  const segments = rel.split(sep).filter(Boolean)
  if (segments[segments.length - 1] === 'index') segments.pop()
  return segments
}

/** Read and parse a folder's `meta.json`, or return an empty object. */
export function readFolderMeta(dir: string): FolderMeta {
  const metaPath = join(dir, 'meta.json')
  if (!existsSync(metaPath)) return {}
  try {
    return JSON.parse(readFileSync(metaPath, 'utf8')) as FolderMeta
  } catch {
    return {}
  }
}

/** Load and parse a single doc file into a {@link DocPage}. */
export function loadDoc(filePath: string, contentDir = CONTENT_DIR): DocPage {
  const raw = readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const frontmatter = data as DocFrontmatter
  const slug = filePathToSlug(filePath, contentDir)
  const slugPath = joinSlug(slug)

  if (!frontmatter.title) {
    const last = slug[slug.length - 1]
    frontmatter.title = last ? humanizeSegment(last) : 'Documentation'
  }

  return {
    slug,
    slugPath,
    filePath: relative(process.cwd(), filePath),
    frontmatter,
    content,
    headings: extractHeadings(content),
    lastModified: statSync(filePath).mtime.toISOString(),
  }
}

/**
 * Load every doc page under the content directory, sorted by slug for stable
 * ordering. Pages flagged `hidden` are still loaded (so they remain routable)
 * — callers decide whether to surface them in nav/search.
 */
export function getAllDocs(contentDir = CONTENT_DIR): DocPage[] {
  return walk(contentDir)
    .map((file) => loadDoc(file, contentDir))
    .sort((a, b) => a.slugPath.localeCompare(b.slugPath))
}

/** Find a single doc by its slug segments, or `null` if none matches. */
export function getDocBySlug(slug: string[], contentDir = CONTENT_DIR): DocPage | null {
  const target = joinSlug(slug)
  return getAllDocs(contentDir).find((doc) => doc.slugPath === target) ?? null
}
