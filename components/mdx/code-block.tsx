'use client'

import { Check, Copy } from 'lucide-react'
import { useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

export interface CodeBlockProps {
  children?: ReactNode
  /** Optional filename / label shown in the header bar. */
  title?: string
  /** Language tag shown on the right of the header (e.g. "tsx"). */
  language?: string
  /** Raw text to copy. If omitted, the rendered text content is copied. */
  code?: string
  className?: string
}

/**
 * Presentational code block with a header bar and copy-to-clipboard button.
 *
 * Fenced code in MDX is syntax-highlighted by `rehype-pretty-code`; use this
 * component when you want an explicit filename/title and a copy affordance.
 */
export function CodeBlock({
  children,
  title,
  language,
  code,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  async function copy() {
    const text = code ?? preRef.current?.textContent ?? ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — fail silently
    }
  }

  return (
    <figure
      className={cn(
        'my-6 overflow-hidden rounded-xl border border-border bg-code-bg',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-2 text-xs">
        <figcaption className="font-mono text-muted-fg">
          {title ?? language ?? 'code'}
        </figcaption>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-muted-fg transition-colors hover:bg-muted hover:text-fg"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check className="size-3.5 text-green-500" />
          ) : (
            <Copy className="size-3.5" />
          )}
          <span className="sr-only sm:not-sr-only">
            {copied ? 'Copied' : 'Copy'}
          </span>
        </button>
      </div>
      <pre
        ref={preRef}
        className="overflow-x-auto p-4 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0"
      >
        {children}
      </pre>
    </figure>
  )
}
