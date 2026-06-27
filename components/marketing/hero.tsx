import { ArrowRight, GitFork, Star } from 'lucide-react'
import Link from 'next/link'

import { LogoMark } from '@/components/logo'
import { buttonVariants } from '@/components/ui/button'
import { HeroGlow } from './hero-glow'
import { Reveal } from './reveal'

const REPO_URL = 'https://github.com/shahnawaz-pabon/open-docs'

/** Landing hero: headline, subhead, primary CTAs, and an install one-liner. */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated brand glow backdrop (static under reduced-motion) */}
      <HeroGlow />
      <div className="mx-auto max-w-3xl px-6 pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
        <Reveal>
          <Link
            href="/docs"
            className="border-border bg-muted/50 text-muted-fg hover:text-fg mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors"
          >
            <span className="inline-flex size-4 items-center justify-center">
              <LogoMark className="size-4" />
            </span>
            MIT licensed · zero lock-in
            <ArrowRight className="size-3" />
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            Documentation your team is <span className="text-accent">proud to ship</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-muted-fg mx-auto mt-6 max-w-2xl text-lg text-balance">
            Open Docs is a production-grade documentation template built on Next.js, MDX, and
            Tailwind CSS. No framework to learn — just source code you own and can read top to
            bottom.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/docs/getting-started" className={buttonVariants({ size: 'lg' })}>
              Get started
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              <GitFork className="size-4" />
              Star on GitHub
              <Star className="size-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="border-border bg-card mx-auto mt-10 flex max-w-md items-center justify-center gap-3 rounded-xl border px-4 py-3 font-mono text-sm">
            <span className="text-muted-fg select-none">$</span>
            <code className="text-fg">npx @opendocsjs/create@latest</code>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
