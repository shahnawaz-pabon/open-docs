import { Fragment } from 'react'

type Range = readonly [number, number]

/**
 * Renders `text` with the character ranges from a Fuse.js match wrapped in
 * `<mark>`. Ranges are inclusive `[start, end]` tuples, as Fuse provides them.
 * Falls back to plain text when there are no matches.
 */
export function Highlight({
  text,
  indices,
}: {
  text: string
  indices?: readonly Range[]
}) {
  if (!indices || indices.length === 0) return <>{text}</>

  // Sort and merge so overlapping/adjacent ranges don't double-wrap.
  const ranges = [...indices].sort((a, b) => a[0] - b[0])
  const parts: Array<{ text: string; mark: boolean }> = []
  let cursor = 0

  for (const [start, end] of ranges) {
    if (start > cursor) {
      parts.push({ text: text.slice(cursor, start), mark: false })
    }
    const from = Math.max(start, cursor)
    parts.push({ text: text.slice(from, end + 1), mark: true })
    cursor = Math.max(cursor, end + 1)
  }
  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor), mark: false })
  }

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part.mark ? (
            <mark className="rounded-sm bg-brand-500/25 text-inherit">
              {part.text}
            </mark>
          ) : (
            part.text
          )}
        </Fragment>
      ))}
    </>
  )
}
