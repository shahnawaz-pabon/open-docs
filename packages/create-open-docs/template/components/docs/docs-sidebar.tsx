'use client'

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useSidebarCollapsed } from '@/hooks/use-sidebar-state'
import type { NavNode } from '@/lib/types'
import { cn } from '@/lib/utils'
import { SidebarNav } from './sidebar-nav'

/**
 * Desktop sidebar shell. Wraps {@link SidebarNav} with a persisted
 * collapse/expand toggle: expanded shows the full navigation tree, collapsed
 * shrinks to a slim rail with a single button to bring it back. The mobile
 * drawer ({@link import('./mobile-nav').MobileNav}) is a separate component.
 */
export function DocsSidebar({ tree }: { tree: NavNode[] }) {
  const { collapsed, toggle } = useSidebarCollapsed()

  return (
    <aside
      className={cn(
        'sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 overflow-y-auto py-8 lg:block',
        collapsed ? 'w-12 pr-0' : 'w-64 pr-2',
      )}
    >
      {collapsed ? (
        <div className="flex justify-center">
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
          <div className="mb-3 flex items-center justify-between pr-1 pl-3">
            <span className="text-muted-fg/60 text-xs font-semibold tracking-wider uppercase">
              Menu
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
          <SidebarNav tree={tree} />
        </>
      )}
    </aside>
  )
}
