import { describe, expect, it } from 'vitest'
import { docHref, humanizeSegment, joinSlug, slugify, splitSlug } from '@/lib/slug'

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Hello, World!')).toBe('hello-world')
  })

  it('strips diacritics', () => {
    expect(slugify('Café & Crème')).toBe('cafe-creme')
  })

  it('collapses runs of non-alphanumerics', () => {
    expect(slugify('a---b   c')).toBe('a-b-c')
  })

  it('trims leading and trailing separators', () => {
    expect(slugify('  !!Getting Started!!  ')).toBe('getting-started')
  })

  it('returns empty string for symbol-only input', () => {
    expect(slugify('@#$%')).toBe('')
  })
})

describe('splitSlug', () => {
  it('splits a path and drops empty segments', () => {
    expect(splitSlug('/guides/installation/')).toEqual(['guides', 'installation'])
  })

  it('returns an empty array for empty input', () => {
    expect(splitSlug('')).toEqual([])
  })
})

describe('joinSlug', () => {
  it('joins segments without leading slash', () => {
    expect(joinSlug(['guides', 'installation'])).toBe('guides/installation')
  })

  it('ignores empty segments', () => {
    expect(joinSlug(['guides', '', 'x'])).toBe('guides/x')
  })

  it('returns empty string for empty array', () => {
    expect(joinSlug([])).toBe('')
  })
})

describe('docHref', () => {
  it('returns /docs for the index', () => {
    expect(docHref('')).toBe('/docs')
  })

  it('prefixes nested slugs', () => {
    expect(docHref('guides/installation')).toBe('/docs/guides/installation')
  })
})

describe('humanizeSegment', () => {
  it('title-cases hyphenated names', () => {
    expect(humanizeSegment('getting-started')).toBe('Getting Started')
  })

  it('handles underscores', () => {
    expect(humanizeSegment('api_reference')).toBe('Api Reference')
  })

  it('strips mdx extensions', () => {
    expect(humanizeSegment('installation.mdx')).toBe('Installation')
  })
})
