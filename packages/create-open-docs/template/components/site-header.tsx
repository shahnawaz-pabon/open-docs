import { GitFork } from 'lucide-react'
import Link from 'next/link'
import type { NavNode } from '@/lib/types'
import { Logo } from './logo'
import { MobileNav } from './docs/mobile-nav'
import { CommandMenu } from './search/command-menu'
import { ThemeToggle } from './theme-toggle'

const REPO_URL = 'https://github.com/shahnawaz-pabon/open-docs'

/**
 * Sticky top navigation bar. When a `tree` is supplied (docs pages) it also
 * renders the mobile navigation drawer trigger.
 */
export function SiteHeader({ tree }: { tree?: NavNode[] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {tree && <MobileNav tree={tree} />}
          <Logo />
        </div>

        <nav className="ml-4 hidden items-center gap-5 text-sm text-muted-fg md:flex">
          <Link href="/docs" className="transition-colors hover:text-fg">
            Docs
          </Link>
          <Link href="/docs/components" className="transition-colors hover:text-fg">
            Components
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <CommandMenu />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub repository"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-fg transition-colors hover:bg-muted"
          >
            <GitFork className="size-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
