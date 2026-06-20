import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getAllDocs, getDocBySlug, loadDoc, readFolderMeta } from '@/lib/content'
import { buildNavTree, flattenNav } from '@/lib/navigation'

const FIXTURES = join(process.cwd(), 'tests', 'fixtures', 'content')

describe('content loader — edge cases (fixtures)', () => {
  it('skips dotfiles and non-mdx files when walking the tree', () => {
    const paths = getAllDocs(FIXTURES).map((d) => d.slugPath)
    expect(paths).not.toContain('.dotfile')
    expect(paths).not.toContain('notes')
    expect(paths).toContain('alpha')
  })

  it('returns an empty list when the content directory does not exist', () => {
    expect(getAllDocs(join(FIXTURES, 'does-not-exist'))).toEqual([])
    expect(buildNavTree([], join(FIXTURES, 'does-not-exist'))).toEqual([])
  })

  it('falls back to "Documentation" for a root index without a title', () => {
    const root = getDocBySlug([], FIXTURES)
    expect(root?.frontmatter.title).toBe('Documentation')
  })

  it('humanizes the file name when a nested page has no title', () => {
    const doc = loadDoc(join(FIXTURES, 'folder', 'nested-page.mdx'), FIXTURES)
    expect(doc.frontmatter.title).toBe('Nested Page')
  })

  it('returns {} for malformed meta.json', () => {
    expect(readFolderMeta(join(FIXTURES, 'badmeta'))).toEqual({})
  })
})

describe('navigation — edge cases (fixtures)', () => {
  const docs = getAllDocs(FIXTURES)
  const nav = buildNavTree(docs, FIXTURES)

  it('excludes hidden pages from the tree', () => {
    expect(flattenNav(nav).some((n) => n.title === 'Secret')).toBe(false)
  })

  it('breaks equal-order ties alphabetically by title', () => {
    const titles = nav.map((n) => n.title)
    // Alpha and Beta share order:2 → alphabetical
    expect(titles.indexOf('Alpha')).toBeLessThan(titles.indexOf('Beta'))
  })

  it('recurses into folders without a meta.json', () => {
    const folder = nav.find((n) => n.title === 'Folder')
    expect(folder?.children.some((c) => c.title === 'Nested Page')).toBe(true)
  })
})
