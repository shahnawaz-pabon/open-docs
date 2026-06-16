import type { IFuseOptions } from 'fuse.js'
import { docHref } from './slug'
import type { DocPage, SearchRecord } from './types'

/**
 * Reduce an MDX/markdown body to plain, searchable text.
 *
 * Removes code fences, JSX/HTML tags, import/export statements, image and link
 * syntax (keeping link labels), headings markers, list bullets, and emphasis —
 * leaving prose that fuzzy search can match against. Pure and dependency-free.
 */
export function mdToPlainText(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/^(?:import|export)\s.*$/gm, ' ') // esm statements
    .replace(/<[^>]+>/g, ' ') // jsx / html tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → label
    .replace(/^#{1,6}\s+/gm, '') // heading markers
    .replace(/^\s*[-*+]\s+/gm, '') // list bullets
    .replace(/[*_~>]+/g, ' ') // emphasis / blockquote
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim()
}

/** Build a breadcrumb-style section label from slug segments. */
export function sectionLabel(slug: string[]): string {
  if (slug.length === 0) return 'Documentation'
  return slug
    .slice(0, -1)
    .map((segment) =>
      segment.replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
    )
    .join(' › ')
}

/**
 * Build the flat search index from loaded docs.
 *
 * Emits one record per page plus one record per heading (so deep links jump
 * straight to the relevant section). Hidden pages are excluded.
 */
export function buildSearchIndex(docs: DocPage[]): SearchRecord[] {
  const records: SearchRecord[] = []

  for (const doc of docs) {
    if (doc.frontmatter.hidden) continue

    const href = docHref(doc.slugPath)
    const section = sectionLabel(doc.slug)
    const plain = mdToPlainText(doc.content)

    records.push({
      id: doc.slugPath || 'index',
      title: doc.frontmatter.title,
      description: doc.frontmatter.description ?? '',
      href,
      section,
      content: plain,
    })

    for (const heading of doc.headings) {
      records.push({
        id: `${doc.slugPath || 'index'}#${heading.id}`,
        title: heading.text,
        description: '',
        href: `${href}#${heading.id}`,
        section: doc.frontmatter.title,
        content: '',
      })
    }
  }

  return records
}

/**
 * Fuse.js configuration shared by the build (validation) and the client search
 * hook, so ranking behaviour stays consistent. Title is weighted highest.
 */
export const FUSE_OPTIONS: IFuseOptions<SearchRecord> = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'description', weight: 0.25 },
    { name: 'content', weight: 0.15 },
    { name: 'section', weight: 0.1 },
  ],
}
