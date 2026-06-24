import { slugify } from './slug'
import type { Heading, TocEntry } from './types'

/** Matches fenced code blocks (``` or ~~~) so we can ignore `#` inside them. */
const FENCED_CODE = /^(?:```|~~~)/

/** Matches an ATX markdown heading line, capturing the hashes and the text. */
const ATX_HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/

/**
 * Strip inline markdown/MDX markup from heading text so the TOC shows clean
 * labels: removes emphasis markers, inline code backticks, and link syntax
 * while keeping the link's visible text.
 */
export function cleanHeadingText(raw: string): string {
  return raw
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → text
    .replace(/[*_~]+/g, '') // emphasis / strikethrough
    .replace(/<[^>]+>/g, '') // stray html/jsx tags
    .trim()
}

/**
 * Extract headings (levels 2–maxDepth by default) from an MDX/markdown body.
 *
 * Fenced code blocks are skipped so commented `#` lines in examples are not
 * mistaken for headings. Ids are derived with {@link slugify}; duplicate ids
 * get a numeric suffix (`-1`, `-2`, …) to stay unique, matching `rehype-slug`.
 *
 * The top-level `# h1` is treated as the page title and excluded by default
 * (TOCs conventionally start at `##`).
 */
export function extractHeadings(
  source: string,
  { minDepth = 2, maxDepth = 4 }: { minDepth?: number; maxDepth?: number } = {},
): Heading[] {
  const lines = source.split('\n')
  const headings: Heading[] = []
  const seen = new Map<string, number>()
  let inCode = false

  for (const line of lines) {
    if (FENCED_CODE.test(line.trim())) {
      inCode = !inCode
      continue
    }
    if (inCode) continue

    const match = ATX_HEADING.exec(line)
    if (!match) continue

    const depth = match[1]!.length
    if (depth < minDepth || depth > maxDepth) continue

    const text = cleanHeadingText(match[2]!)
    if (!text) continue

    const base = slugify(text)
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count}`

    headings.push({ depth, text, id })
  }

  return headings
}

/**
 * Remove a single leading `# h1` from an MDX body, if present.
 *
 * The page chrome renders the title from frontmatter, so the duplicate H1 at
 * the top of the body is stripped for display. Any blank lines immediately
 * after it are collapsed. The original source is left untouched elsewhere
 * (e.g. the "copy markdown" button copies the full document).
 */
export function stripLeadingH1(source: string): string {
  return source.replace(/^\s*#\s+.*(?:\r?\n)+/, '')
}

/**
 * Convert a flat heading list into a nested table-of-contents tree.
 *
 * Headings deeper than their predecessor become children; shallower headings
 * pop back up the stack. Handles irregular jumps (e.g. `##` → `####`) without
 * crashing by attaching to the nearest valid ancestor.
 */
export function buildToc(headings: Heading[]): TocEntry[] {
  const root: TocEntry[] = []
  const stack: TocEntry[] = []

  for (const heading of headings) {
    const entry: TocEntry = { ...heading, children: [] }

    while (stack.length > 0 && stack[stack.length - 1]!.depth >= entry.depth) {
      stack.pop()
    }

    if (stack.length === 0) {
      root.push(entry)
    } else {
      stack[stack.length - 1]!.children.push(entry)
    }

    stack.push(entry)
  }

  return root
}
