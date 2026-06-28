import { GitFork } from 'lucide-react'
import Link from 'next/link'
import type { NavNode } from '@/lib/types'
import { Logo } from './logo'
import { MobileNav } from './docs/mobile-nav'
import { CommandMenuTrigger, CommandPalette } from './search/command-menu'
import { ThemeToggle } from './theme-toggle'

const REPO_URL = 'https://github.com/shahnawaz-pabon/open-docs'

/**
 * Sticky top navigation bar. When a `tree` is supplied (docs pages) it also
 * renders the mobile navigation drawer trigger.
 */
export function SiteHeader({ tree }: { tree?: NavNode[] }) {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {tree && <MobileNav tree={tree} />}
          <Logo />
        </div>

        <nav className="text-muted-fg ml-4 hidden items-center gap-5 text-sm md:flex">
          <Link href="/docs" className="hover:text-fg transition-colors">
            Docs
          </Link>
          <Link href="/docs/components" className="hover:text-fg transition-colors">
            Components
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <CommandMenuTrigger />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub repository"
            className="border-border text-fg hover:bg-muted inline-flex size-9 items-center justify-center rounded-lg border transition-colors"
          >
            <GitFork className="size-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
      <CommandPalette />
    </header>
  )
}
