'use client'

import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Lightweight "Was this page helpful?" widget. State is local — wire the
 * `onVote` callback to your analytics provider to record responses.
 */
export function Feedback({ onVote }: { onVote?: (helpful: boolean) => void }) {
  const [vote, setVote] = useState<boolean | null>(null)

  function handle(helpful: boolean) {
    setVote(helpful)
    onVote?.(helpful)
  }

  return (
    <div className="mt-10 flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium">Was this page helpful?</span>
      {vote === null ? (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handle(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
          >
            <ThumbsUp className="size-3.5" /> Yes
          </button>
          <button
            type="button"
            onClick={() => handle(false)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
          >
            <ThumbsDown className="size-3.5" /> No
          </button>
        </div>
      ) : (
        <span className={cn('text-sm', vote ? 'text-green-500' : 'text-muted-fg')}>
          {vote ? 'Thanks for your feedback!' : 'Thanks — we’ll work on improving it.'}
        </span>
      )}
    </div>
  )
}
