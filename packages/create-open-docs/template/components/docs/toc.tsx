'use client'

import { motion } from 'motion/react'
import { useActiveHeading } from '@/hooks/use-toc'
import type { Heading } from '@/lib/types'
import { cn } from '@/lib/utils'

/**
 * Sticky table of contents with scroll-spy highlighting and an animated active
 * indicator (a small accent bar that slides between the current heading).
 */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const ids = headings.map((h) => h.id)
  const activeId = useActiveHeading(ids)

  if (headings.length === 0) return null

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 font-semibold text-fg">On this page</p>
      <ul className="space-y-1 border-l border-border">
        {headings.map((heading) => {
          const isActive = heading.id === activeId
          return (
            <li key={heading.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="toc-indicator"
                  className="absolute top-0 -left-px h-full w-0.5 bg-accent"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
              <a
                href={`#${heading.id}`}
                className={cn(
                  'block py-1 transition-colors hover:text-fg',
                  isActive ? 'font-medium text-accent' : 'text-muted-fg',
                )}
                style={{ paddingLeft: `${(heading.depth - 2) * 0.75 + 0.75}rem` }}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
