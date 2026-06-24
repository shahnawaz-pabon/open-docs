'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * "Copy markdown" button — copies the raw MDX source of the current page to the
 * clipboard, handy for pasting into an AI assistant.
 */
export function CopyMarkdown({ source }: { source: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(source)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — fail silently
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-fg transition-colors hover:bg-muted hover:text-fg',
      )}
      aria-label="Copy page as markdown"
    >
      {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
      {copied ? 'Copied' : 'Copy markdown'}
    </button>
  )
}
