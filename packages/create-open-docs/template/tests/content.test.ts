import { describe, expect, it } from 'vitest'
import {
  filePathToSlug,
  getAllDocs,
  getDocBySlug,
  loadDoc,
  readFolderMeta,
} from '@/lib/content'
import { join } from 'node:path'

const CONTENT = join(process.cwd(), 'content', 'docs')

describe('filePathToSlug', () => {
  it('maps a nested file to slug segments', () => {
    expect(filePathToSlug(join(CONTENT, 'getting-started', 'installation.mdx'), CONTENT)).toEqual([
      'getting-started',
      'installation',
    ])
  })

  it('maps a folder index to the folder slug', () => {
    expect(filePathToSlug(join(CONTENT, 'guides', 'index.mdx'), CONTENT)).toEqual(['guides'])
  })

  it('maps the root index to an empty slug', () => {
    expect(filePathToSlug(join(CONTENT, 'index.mdx'), CONTENT)).toEqual([])
  })
})

describe('readFolderMeta', () => {
  it('reads a folder meta.json', () => {
    const meta = readFolderMeta(join(CONTENT, 'getting-started'))
    expect(meta.title).toBe('Getting Started')
    expect(meta.pages?.[0]).toBe('index')
  })

  it('returns an empty object when no meta.json exists', () => {
    expect(readFolderMeta(join(CONTENT, 'does-not-exist'))).toEqual({})
  })
})

describe('loadDoc', () => {
  it('parses frontmatter, body, and headings', () => {
    const doc = loadDoc(join(CONTENT, 'getting-started', 'installation.mdx'), CONTENT)
    expect(doc.frontmatter.title).toBe('Installation')
    expect(doc.slugPath).toBe('getting-started/installation')
    expect(doc.headings.length).toBeGreaterThan(0)
    // frontmatter is stripped: the body begins at the H1, not the YAML block
    expect(doc.content.trimStart().startsWith('# Installation')).toBe(true)
    expect(doc.content).not.toContain('description:')
  })
})

describe('getAllDocs', () => {
  it('loads the full seed tree sorted by slug', () => {
    const docs = getAllDocs()
    const paths = docs.map((d) => d.slugPath)
    expect(paths).toContain('')
    expect(paths).toContain('getting-started/installation')
    // sorted ascending
    expect([...paths]).toEqual([...paths].sort((a, b) => a.localeCompare(b)))
  })
})

describe('getDocBySlug', () => {
  it('finds a page by slug segments', () => {
    expect(getDocBySlug(['guides', 'deploying'])?.frontmatter.title).toBe('Deploying')
  })

  it('returns null for an unknown slug', () => {
    expect(getDocBySlug(['nope'])).toBeNull()
  })
})
