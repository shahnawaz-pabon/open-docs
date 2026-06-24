import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { CONTENT_DIR, readFolderMeta } from './content'
import { docHref, humanizeSegment } from './slug'
import type { DocPage, NavNode, PrevNext } from './types'

/**
 * Build the sidebar navigation tree from loaded docs.
 *
 * Folder titles and child ordering come from each folder's `meta.json`
 * (`title`, `pages`). When `meta.json` is absent we fall back to humanised
 * segment names and `order`/title alphabetical sorting. The result is a nested
 * tree of {@link NavNode}s suitable for rendering a collapsible sidebar.
 *
 * `contentDir` is injectable for tests; in production it defaults to the real
 * content root so `meta.json` files resolve correctly.
 */
export function buildNavTree(docs: DocPage[], contentDir = CONTENT_DIR): NavNode[] {
  const visible = docs.filter((doc) => !doc.frontmatter.hidden)
  const root: NavNode = { title: 'root', children: [] }

  for (const doc of visible) {
    let node = root
    // Walk/extend the tree one segment at a time.
    for (let i = 0; i < doc.slug.length; i++) {
      const segment = doc.slug[i]!
      const isLeaf = i === doc.slug.length - 1
      let child = node.children.find((c) => segmentOf(c) === segment)

      if (!child) {
        child = { title: humanizeSegment(segment), children: [] }
        ;(child as NavNode & { _segment: string })._segment = segment
        node.children.push(child)
      }

      if (isLeaf) {
        child.title = doc.frontmatter.title
        child.href = docHref(doc.slugPath)
        child.slugPath = doc.slugPath
      }
      node = child
    }

    // A bare index page (empty slug) becomes the docs landing node.
    if (doc.slug.length === 0) {
      root.children.unshift({
        title: doc.frontmatter.title,
        href: docHref(doc.slugPath),
        slugPath: doc.slugPath,
        children: [],
      })
    }
  }

  applyMeta(root, [], contentDir, docs)
  return root.children
}

/** Internal segment accessor (segment is stashed during tree construction). */
function segmentOf(node: NavNode): string | undefined {
  return (node as NavNode & { _segment?: string })._segment
}

/**
 * Apply folder `meta.json` titles and explicit page ordering, recursively.
 * Nodes not listed in `pages` keep their relative order after the listed ones.
 */
function applyMeta(node: NavNode, segments: string[], contentDir: string, docs: DocPage[]): void {
  const dir = join(contentDir, ...segments)
  const meta = existsSync(dir) ? readFolderMeta(dir) : {}

  if (meta.title && segments.length > 0) node.title = meta.title

  if (meta.pages && meta.pages.length > 0) {
    const order = new Map(meta.pages.map((name, idx) => [name, idx]))
    node.children.sort((a, b) => {
      const ai = order.get(segmentOf(a) ?? '') ?? Number.MAX_SAFE_INTEGER
      const bi = order.get(segmentOf(b) ?? '') ?? Number.MAX_SAFE_INTEGER
      return ai - bi
    })
  } else {
    node.children.sort(byOrderThenTitle(docs))
  }

  for (const child of node.children) {
    const seg = segmentOf(child)
    if (seg && child.children.length > 0) applyMeta(child, [...segments, seg], contentDir, docs)
  }
}

/** Sort comparator: explicit frontmatter `order`, then title alphabetically. */
function byOrderThenTitle(docs: DocPage[]) {
  const orderOf = (node: NavNode): number => {
    const doc = docs.find((d) => d.slugPath === node.slugPath)
    return doc?.frontmatter.order ?? Number.MAX_SAFE_INTEGER
  }
  return (a: NavNode, b: NavNode): number => {
    const diff = orderOf(a) - orderOf(b)
    return diff !== 0 ? diff : a.title.localeCompare(b.title)
  }
}

/**
 * Flatten the nav tree into the linear reading order used for prev/next links —
 * a depth-first walk that only yields nodes with an `href`.
 */
export function flattenNav(nodes: NavNode[]): Array<{ title: string; href: string }> {
  const flat: Array<{ title: string; href: string }> = []
  const walk = (list: NavNode[]) => {
    for (const node of list) {
      if (node.href) flat.push({ title: node.title, href: node.href })
      if (node.children.length > 0) walk(node.children)
    }
  }
  walk(nodes)
  return flat
}

/** Resolve the previous/next page for a given href within the nav tree. */
export function getPrevNext(nodes: NavNode[], currentHref: string): PrevNext {
  const flat = flattenNav(nodes)
  const idx = flat.findIndex((item) => item.href === currentHref)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? flat[idx - 1]! : null,
    next: idx < flat.length - 1 ? flat[idx + 1]! : null,
  }
}
