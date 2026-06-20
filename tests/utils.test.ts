import { afterEach, describe, expect, it } from 'vitest'
import { cn, withBasePath } from '@/lib/utils'

describe('cn', () => {
  it('joins class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('handles conditional and falsy values', () => {
    expect(cn('a', false && 'b', null, undefined, 'c')).toBe('a c')
  })
})

describe('withBasePath', () => {
  const original = process.env.NEXT_PUBLIC_BASE_PATH

  afterEach(() => {
    process.env.NEXT_PUBLIC_BASE_PATH = original
  })

  it('prefixes root-relative paths', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/docs-site'
    expect(withBasePath('/assets/x.png')).toBe('/docs-site/assets/x.png')
  })

  it('leaves non-root paths untouched', () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/docs-site'
    expect(withBasePath('https://x.com/y')).toBe('https://x.com/y')
  })

  it('returns the path unchanged when no base path is set', () => {
    delete process.env.NEXT_PUBLIC_BASE_PATH
    expect(withBasePath('/a')).toBe('/a')
  })
})
