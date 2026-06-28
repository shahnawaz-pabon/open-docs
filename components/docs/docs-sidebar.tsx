'use client'

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useSidebarCollapsed } from '@/hooks/use-sidebar-state'
import type { NavNode } from '@/lib/types'
import { cn } from '@/lib/utils'
import { CommandMenuTrigger } from '../search/command-menu'
import { ThemeToggle } from '../theme-toggle'
import { SidebarNav } from './sidebar-nav'

const REPO_URL = 'https://github.com/shahnawaz-pabon/open-docs'

/**
 * Desktop sidebar shell. Wraps {@link SidebarNav} with a persisted
 * collapse/expand toggle, a search box at the top, and a GitHub + theme-toggle
 * footer. Expanded shows the full navigation tree; collapsed shrinks to a slim
 * rail with a single button to bring it back. The mobile drawer
 * ({@link import('./mobile-nav').MobileNav}) is a separate component.
 */
export function DocsSidebar({ tree }: { tree: NavNode[] }) {
  const { collapsed, toggle } = useSidebarCollapsed()

  return (
    <aside
      className={cn(
        'border-border sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 flex-col border-r py-4 lg:flex',
        collapsed ? 'w-12' : 'w-64',
      )}
    >
      {collapsed ? (
        <div className="flex justify-center px-2">
          <button
            type="button"
            onClick={toggle}
            aria-label="Expand sidebar"
            className="border-border text-muted-fg hover:bg-muted hover:text-fg inline-flex size-9 items-center justify-center rounded-lg border transition-colors"
          >
            <PanelLeftOpen className="size-4" />
          </button>
        </div>
      ) : (
        <>
          {/* Top: search + collapse */}
          <div className="flex flex-col gap-3 px-3 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-fg/60 text-xs font-semibold tracking-wider uppercase">
                Docs
              </span>
              <button
                type="button"
                onClick={toggle}
                aria-label="Collapse sidebar"
                className="text-muted-fg hover:bg-muted hover:text-fg inline-flex size-7 items-center justify-center rounded-md transition-colors"
              >
                <PanelLeftClose className="size-4" />
              </button>
            </div>
            <CommandMenuTrigger className="w-full justify-start" />
          </div>

          {/* Middle: scrollable nav */}
          <div className="min-h-0 flex-1 overflow-y-auto px-3">
            <SidebarNav tree={tree} />
          </div>

          {/* Bottom: GitHub + theme toggle */}
          <div className="border-border flex items-center gap-2 border-t px-3 pt-3">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub repository"
              className="border-border text-fg hover:bg-muted inline-flex size-9 items-center justify-center rounded-lg border transition-colors"
            >
              <GithubIcon className="size-4" />
            </a>
            <ThemeToggle />
          </div>
        </>
      )}
    </aside>
  )
}

/** GitHub logo (inline SVG; lucide's brand icons were removed in v1.x). */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}
