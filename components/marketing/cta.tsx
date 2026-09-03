'use client'

import { ArrowRight, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { Reveal } from './reveal'

const REPO_URL = 'https://github.com/shahnawaz-pabon/open-docs'

/** Closing call-to-action with gradient background and working copy button. */
export function CTA() {
  const [copied, setCopied] = useState(false)

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText('npx @opendocsjs/create@latest')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <Reveal>
        <div className="border-border from-accent/5 via-background to-accent/5 shadow-accent/5 relative overflow-hidden rounded-3xl border bg-gradient-to-br px-6 py-14 text-center shadow-xl sm:px-12">
          {/* Radial gradient overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--color-accent)/12%,transparent_60%)]"
          />

          {/* Decorative elements */}
          <div className="bg-accent/10 pointer-events-none absolute -top-10 -left-10 size-40 rounded-full blur-3xl" />
          <div className="bg-brand-500/10 pointer-events-none absolute -right-10 -bottom-10 size-40 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Ship documentation you&apos;re proud of
            </h2>
            <p className="text-muted-fg mx-auto mt-4 max-w-xl text-base text-balance">
              Scaffold a new project in seconds, or read the docs to see what Open Docs can do.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/docs/getting-started"
                className={buttonVariants({ size: 'lg', className: 'shadow-accent/20 shadow-lg' })}
              >
                Read the docs
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer noopener"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                View on GitHub
              </a>
            </div>

            {/* Command with working copy button - fixed height */}
            <div className="border-border bg-background/80 hover:border-accent/30 mt-8 inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 font-mono text-sm shadow-sm backdrop-blur-sm transition-all">
              <code className="text-accent">npx @opendocsjs/create@latest</code>
              <button
                onClick={copyCommand}
                className="text-muted-fg hover:bg-muted hover:text-accent inline-flex items-center justify-center rounded p-1.5 transition-colors"
                aria-label="Copy command"
              >
                {copied ? (
                  <Check className="size-3.5 text-green-500" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
