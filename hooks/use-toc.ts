'use client'

import { useEffect, useState } from 'react'

/**
 * Scroll-spy hook: observes the given heading ids and returns the id of the
 * heading currently nearest the top of the viewport. Drives the active state
 * and animated indicator in the table of contents.
 */
export function useActiveHeading(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    if (ids.length === 0) return

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        // Trigger when a heading enters the top quarter of the viewport.
        rootMargin: '0px 0px -75% 0px',
        threshold: [0, 1],
      },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
