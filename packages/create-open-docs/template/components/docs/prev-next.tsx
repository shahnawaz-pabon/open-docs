import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { PrevNext } from '@/lib/types'

/** Previous / next page navigation shown at the foot of each doc page. */
export function PrevNextNav({ prev, next }: PrevNext) {
  if (!prev && !next) return null
  return (
    <nav className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-1 rounded-xl border border-border p-4 transition-colors hover:border-accent hover:bg-muted"
        >
          <span className="flex items-center gap-1 text-xs text-muted-fg">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="font-medium text-fg">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 rounded-xl border border-border p-4 text-right transition-colors hover:border-accent hover:bg-muted sm:col-start-2"
        >
          <span className="flex items-center gap-1 text-xs text-muted-fg">
            Next
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="font-medium text-fg">{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
