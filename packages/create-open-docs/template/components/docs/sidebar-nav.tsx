'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebarState } from '@/hooks/use-sidebar-state'
import type { NavNode } from '@/lib/types'
import { cn } from '@/lib/utils'

/** Normalise a pathname for comparison (Next adds trailing slashes on export). */
function normalize(path: string): string {
  return path.replace(/\/+$/, '') || '/'
}

/**
 * Recursive sidebar navigation tree. Folder groups collapse/expand and the
 * state persists via {@link useSidebarState}; the active link is derived from
 * the current pathname. Used by both the desktop sidebar and mobile drawer.
 */
export function SidebarNav({ tree, onNavigate }: { tree: NavNode[]; onNavigate?: () => void }) {
  const pathname = normalize(usePathname())
  const { isCollapsed, toggle } = useSidebarState()

  function renderNodes(nodes: NavNode[], depth: number) {
    return (
      <ul className={cn('space-y-0.5', depth > 0 && 'mt-0.5 ml-3 border-l border-border pl-3')}>
        {nodes.map((node) => {
          const key = node.slugPath ?? node.title
          const hasChildren = node.children.length > 0
          const collapsed = isCollapsed(key)
          const isActive = node.href ? normalize(node.href) === pathname : false

          return (
            <li key={key}>
              <div className="flex items-center">
                {node.href ? (
                  <Link
                    href={node.href}
                    onClick={onNavigate}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'flex-1 rounded-md px-2 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-muted font-medium text-accent'
                        : 'text-muted-fg hover:bg-muted hover:text-fg',
                    )}
                  >
                    {node.title}
                  </Link>
                ) : (
                  <span className="flex-1 px-2 py-1.5 text-sm font-semibold text-fg">
                    {node.title}
                  </span>
                )}
                {hasChildren && (
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    aria-label={collapsed ? `Expand ${node.title}` : `Collapse ${node.title}`}
                    aria-expanded={!collapsed}
                    className="rounded p-1 text-muted-fg transition-colors hover:bg-muted hover:text-fg"
                  >
                    <ChevronDown
                      className={cn('size-4 transition-transform', collapsed && '-rotate-90')}
                    />
                  </button>
                )}
              </div>
              {hasChildren && !collapsed && renderNodes(node.children, depth + 1)}
            </li>
          )
        })}
      </ul>
    )
  }

  return <nav aria-label="Documentation">{renderNodes(tree, 0)}</nav>
}
