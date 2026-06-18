import { ArrowRight, GitFork } from 'lucide-react'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Reveal } from './reveal'

const REPO_URL = 'https://github.com/shahnawaz-pabon/open-docs'

/** Closing call-to-action band. */
export function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,var(--color-brand-500)/14%,transparent_75%)]"
          />
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Ship documentation you&apos;re proud of
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-muted-fg">
            Scaffold a new project in seconds, or read the docs to see what Open
            Docs can do.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/docs/getting-started"
              className={buttonVariants({ size: 'lg' })}
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
              <GitFork className="size-4" />
              View on GitHub
            </a>
          </div>
          <p className="mt-6 font-mono text-sm text-muted-fg">
            npx create-open-docs@latest
          </p>
        </div>
      </Reveal>
    </section>
  )
}
