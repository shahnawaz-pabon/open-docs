'use client'

import { Check, Copy } from 'lucide-react'
import { useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'

/**
 * Enhanced <pre> component for MDX with copy-to-clipboard functionality.
 * Used for all fenced code blocks rendered by rehype-pretty-code.
 */
export function Pre({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    // Extract text content from the pre element
    const text = extractTextContent(children)

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available, fail silently
    }
  }

  return (
    <div className="group relative my-6">
      <pre
        className="border-border bg-code-bg overflow-x-auto rounded-xl border p-4 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0"
        {...props}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={copyCode}
        className="border-border bg-background/80 text-muted-fg hover:bg-muted hover:text-accent absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-lg border opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100"
        aria-label="Copy code to clipboard"
      >
        {copied ? (
          <Check className="size-4 text-green-500" strokeWidth={2.5} />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    </div>
  )
}

/**
 * Recursively extract text content from React children
 */
function extractTextContent(node: unknown): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join('')
  }

  if (typeof node === 'object' && 'props' in node) {
    const reactNode = node as { props?: { children?: ReactNode } }
    if (reactNode.props?.children) {
      return extractTextContent(reactNode.props.children)
    }
  }

  return ''
}
