'use client'

import { ArrowRight, BookOpen, Code2, Copy, Check, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { HeroGlow } from './hero-glow'
import { Reveal } from './reveal'

const REPO_URL = 'https://github.com/shahnawaz-pabon/open-docs'

/** Landing hero: bold, modern design with gradient accents and working copy button. */
export function Hero() {
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
    <section className="border-border relative overflow-hidden border-b">
      {/* Animated brand glow backdrop */}
      <HeroGlow />

      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          {/* Left column: Content */}
          <div className="max-w-2xl">
            <Reveal>
              <div className="bg-accent/10 text-accent ring-accent/20 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset">
                <Sparkles className="size-3" />
                Production-ready • Zero lock-in
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                Docs you&apos;ll
                <br />
                <span className="from-accent via-accent to-brand-400 bg-gradient-to-r bg-clip-text text-transparent">
                  actually maintain
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-muted-fg mt-5 text-lg leading-relaxed text-pretty">
                Beautiful, type-safe Next.js components you own. Write in MDX, ship as static files,
                deploy anywhere. No framework, no vendor lock-in.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/docs/getting-started"
                  className={buttonVariants({
                    size: 'lg',
                    className: 'group shadow-accent/20 shadow-lg',
                  })}
                >
                  Get started
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
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
            </Reveal>
          </div>

          {/* Right column: Interactive preview */}
          <Reveal delay={0.2} className="relative">
            <div className="relative">
              {/* Main card */}
              <div className="border-border from-card via-background to-muted/30 shadow-accent/5 relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 shadow-2xl backdrop-blur-sm">
                {/* Terminal header */}
                <div className="border-border flex items-center justify-between border-b pb-3">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-500/80" />
                    <div className="size-3 rounded-full bg-yellow-500/80" />
                    <div className="size-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-muted-fg flex items-center gap-2 text-xs font-medium">
                    <div className="relative flex size-2">
                      <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"></span>
                      <span className="bg-accent relative inline-flex size-2 rounded-full"></span>
                    </div>
                    Ready to use
                  </div>
                </div>

                {/* Command */}
                <div className="mt-4 space-y-4">
                  <div className="group relative">
                    <div className="border-accent/20 bg-accent/5 flex items-center justify-between rounded-lg border p-3.5 font-mono text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-fg select-none">$</span>
                        <code className="text-accent font-semibold">
                          npx @opendocsjs/create@latest
                        </code>
                      </div>
                      <button
                        onClick={copyCommand}
                        className="text-muted-fg hover:bg-accent/10 hover:text-accent inline-flex items-center justify-center rounded p-1.5 opacity-0 transition-all group-hover:opacity-100"
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

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Bundle', value: '<100KB', icon: Zap },
                      { label: 'Coverage', value: '90%+', icon: BookOpen },
                      { label: 'License', value: 'MIT', icon: Code2 },
                    ].map(({ label, value, icon: Icon }) => (
                      <div
                        key={label}
                        className="border-border bg-background/60 flex flex-col items-center rounded-lg border p-3 text-center"
                      >
                        <Icon className="text-accent mb-1.5 size-4" />
                        <div className="text-fg text-sm font-bold">{value}</div>
                        <div className="text-muted-fg text-xs">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['MDX', 'Type-safe', 'Dark mode', 'Search'].map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted text-muted-fg ring-border inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="bg-accent/20 pointer-events-none absolute -top-4 -right-4 size-20 rounded-full blur-3xl" />
              <div className="bg-brand-500/10 pointer-events-none absolute -bottom-4 -left-4 size-24 rounded-full blur-3xl" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
