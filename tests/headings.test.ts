import { describe, expect, it } from 'vitest'
import { buildToc, cleanHeadingText, extractHeadings, stripLeadingH1 } from '@/lib/headings'

describe('cleanHeadingText', () => {
  it('removes inline code, links, and emphasis', () => {
    expect(cleanHeadingText('Using `cn()` and [docs](/x) **fast**')).toBe('Using cn() and docs fast')
  })
})

describe('extractHeadings', () => {
  it('extracts h2–h4 by default and skips h1', () => {
    const md = ['# Title', '## One', '### Two', '#### Three', '##### Five'].join('\n')
    const headings = extractHeadings(md)
    expect(headings.map((h) => h.text)).toEqual(['One', 'Two', 'Three'])
    expect(headings[0]).toEqual({ depth: 2, text: 'One', id: 'one' })
  })

  it('ignores hash characters inside fenced code blocks', () => {
    const md = ['## Real', '```bash', '# not a heading', '```', '## After'].join('\n')
    expect(extractHeadings(md).map((h) => h.text)).toEqual(['Real', 'After'])
  })

  it('deduplicates ids with numeric suffixes', () => {
    const md = ['## Setup', '## Setup', '## Setup'].join('\n')
    expect(extractHeadings(md).map((h) => h.id)).toEqual(['setup', 'setup-1', 'setup-2'])
  })

  it('respects custom min/max depth', () => {
    const md = ['# H1', '## H2', '### H3'].join('\n')
    const headings = extractHeadings(md, { minDepth: 1, maxDepth: 2 })
    expect(headings.map((h) => h.text)).toEqual(['H1', 'H2'])
  })

  it('strips trailing closing hashes', () => {
    expect(extractHeadings('## Title ##')[0]?.text).toBe('Title')
  })

  it('skips headings that clean to empty text', () => {
    // `## ***` is only emphasis markers → empty after cleaning, so it's dropped.
    const headings = extractHeadings('## ***\n\n## Real Heading')
    expect(headings).toHaveLength(1)
    expect(headings[0]?.text).toBe('Real Heading')
  })
})

describe('stripLeadingH1', () => {
  it('removes a leading h1 and following blank lines', () => {
    expect(stripLeadingH1('# Title\n\nBody text')).toBe('Body text')
  })

  it('leaves the body unchanged when it does not start with an h1', () => {
    expect(stripLeadingH1('Intro paragraph\n\n## Section')).toBe('Intro paragraph\n\n## Section')
  })

  it('only strips the first h1', () => {
    expect(stripLeadingH1('# One\n\ntext\n\n# Two')).toBe('text\n\n# Two')
  })
})

describe('buildToc', () => {
  it('nests deeper headings under shallower ones', () => {
    const toc = buildToc([
      { depth: 2, text: 'A', id: 'a' },
      { depth: 3, text: 'A.1', id: 'a-1' },
      { depth: 2, text: 'B', id: 'b' },
    ])
    expect(toc).toHaveLength(2)
    expect(toc[0]?.children[0]?.text).toBe('A.1')
    expect(toc[1]?.children).toHaveLength(0)
  })

  it('handles irregular depth jumps without crashing', () => {
    const toc = buildToc([
      { depth: 2, text: 'A', id: 'a' },
      { depth: 4, text: 'deep', id: 'deep' },
    ])
    expect(toc[0]?.children[0]?.text).toBe('deep')
  })

  it('returns an empty array for no headings', () => {
    expect(buildToc([])).toEqual([])
  })
})
