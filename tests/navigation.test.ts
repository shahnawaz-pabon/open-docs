import { describe, expect, it } from 'vitest'
import { getAllDocs } from '@/lib/content'
import { buildNavTree, flattenNav, getPrevNext } from '@/lib/navigation'
import type { DocPage, NavNode } from '@/lib/types'

const docs = getAllDocs()
const nav = buildNavTree(docs)

/** Build an in-memory doc without touching the filesystem. */
function doc(slugPath: string, title: string, order?: number): DocPage {
  const slug = slugPath.split('/').filter(Boolean)
  return {
    slug,
    slugPath,
    filePath: `content/docs/${slugPath}.mdx`,
    frontmatter: { title, order },
    content: '',
    headings: [],
    lastModified: '2024-01-01T00:00:00.000Z',
  }
}

describe('buildNavTree', () => {
  it('orders top-level groups per the root meta.json', () => {
    const titles = nav.map((n) => n.title)
    expect(titles.indexOf('Getting Started')).toBeLessThan(titles.indexOf('Guides'))
  })

  it('applies folder meta.json titles', () => {
    expect(nav.some((n) => n.title === 'Getting Started')).toBe(true)
  })

  it('nests child pages under their folder', () => {
    const gs = nav.find((n) => n.title === 'Getting Started')
    expect(gs?.children.some((c) => c.title === 'Installation')).toBe(true)
  })

  it('excludes hidden pages', () => {
    const tree = buildNavTree([doc('visible', 'Visible'), { ...doc('secret', 'Secret'), frontmatter: { title: 'Secret', hidden: true } }])
    const titles = tree.map((n) => n.title)
    expect(titles).toContain('Visible')
    expect(titles).not.toContain('Secret')
  })

  it('falls back to order then title when no meta.json is present', () => {
    const tree = buildNavTree(
      [doc('b', 'Beta', 2), doc('a', 'Alpha', 1)],
      '/tmp/no-such-content-dir',
    )
    expect(tree.map((n) => n.title)).toEqual(['Alpha', 'Beta'])
  })
})

describe('flattenNav', () => {
  it('produces a linear list of linkable pages in reading order', () => {
    const flat = flattenNav(nav)
    expect(flat.every((item: { href: string }) => item.href.startsWith('/docs'))).toBe(true)
    expect(flat.length).toBeGreaterThan(3)
  })
})

describe('getPrevNext', () => {
  it('returns neighbours for a middle page', () => {
    const flat = flattenNav(nav)
    const middle = flat[1]!
    const { prev, next } = getPrevNext(nav, middle.href)
    expect(prev?.href).toBe(flat[0]!.href)
    expect(next?.href).toBe(flat[2]!.href)
  })

  it('returns null prev for the first page', () => {
    const first = flattenNav(nav)[0]!
    expect(getPrevNext(nav, first.href).prev).toBeNull()
  })

  it('returns null next for the last page', () => {
    const flat = flattenNav(nav)
    const last = flat[flat.length - 1]!
    const { prev, next } = getPrevNext(nav, last.href)
    expect(next).toBeNull()
    expect(prev?.href).toBe(flat[flat.length - 2]!.href)
  })

  it('returns nulls for an unknown href', () => {
    expect(getPrevNext(nav, '/docs/unknown')).toEqual({ prev: null, next: null })
  })
})

describe('nav node shape', () => {
  it('every linkable node carries a slugPath', () => {
    const check = (nodes: NavNode[]): boolean =>
      nodes.every((n) => (n.href ? typeof n.slugPath === 'string' : true) && check(n.children))
    expect(check(nav)).toBe(true)
  })
})
