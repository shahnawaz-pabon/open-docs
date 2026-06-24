import { describe, expect, it } from 'vitest'
import { buildSearchIndex, mdToPlainText, sectionLabel } from '@/lib/search'
import type { DocPage } from '@/lib/types'

function makeDoc(overrides: Partial<DocPage> = {}): DocPage {
  return {
    slug: ['guides', 'writing'],
    slugPath: 'guides/writing',
    filePath: 'content/docs/guides/writing.mdx',
    frontmatter: { title: 'Writing', description: 'How to write' },
    content: '## Frontmatter\n\nSome **prose** here.',
    headings: [{ depth: 2, text: 'Frontmatter', id: 'frontmatter' }],
    lastModified: '2024-01-01T00:00:00.000Z',
    ...overrides,
  }
}

describe('mdToPlainText', () => {
  it('strips fenced code blocks', () => {
    expect(mdToPlainText('text\n```js\nconst x = 1\n```\nmore')).toBe('text more')
  })

  it('keeps link labels but drops urls', () => {
    expect(mdToPlainText('see [the docs](/docs) now')).toBe('see the docs now')
  })

  it('removes import/export statements and jsx', () => {
    expect(mdToPlainText('import X from "y"\n<Callout>hi</Callout>')).toBe('hi')
  })

  it('removes heading markers and bullets', () => {
    expect(mdToPlainText('# Title\n- one\n- two')).toBe('Title one two')
  })
})

describe('sectionLabel', () => {
  it('returns Documentation for the index', () => {
    expect(sectionLabel([])).toBe('Documentation')
  })

  it('builds a breadcrumb from parent segments', () => {
    expect(sectionLabel(['getting-started', 'installation'])).toBe('Getting Started')
  })
})

describe('buildSearchIndex', () => {
  it('emits a page record plus one record per heading', () => {
    const index = buildSearchIndex([makeDoc()])
    expect(index).toHaveLength(2)
    expect(index[0]?.href).toBe('/docs/guides/writing')
    expect(index[1]?.href).toBe('/docs/guides/writing#frontmatter')
  })

  it('excludes hidden pages', () => {
    const hidden = makeDoc({ frontmatter: { title: 'Secret', hidden: true } })
    expect(buildSearchIndex([hidden])).toHaveLength(0)
  })

  it('uses "index" as the id for the root page', () => {
    const root = makeDoc({ slug: [], slugPath: '', headings: [] })
    expect(buildSearchIndex([root])[0]?.id).toBe('index')
  })

  it('prefixes heading records with "index" on the root page and tolerates missing descriptions', () => {
    const root = makeDoc({
      slug: [],
      slugPath: '',
      frontmatter: { title: 'Home' }, // no description
      headings: [{ depth: 2, text: 'Overview', id: 'overview' }],
    })
    const index = buildSearchIndex([root])
    expect(index[0]?.description).toBe('') // falls back to empty string
    expect(index[1]?.id).toBe('index#overview')
    expect(index[1]?.href).toBe('/docs#overview')
  })
})
