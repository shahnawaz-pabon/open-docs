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
      <ul
        className={cn(
          'space-y-0.5',
          depth > 0 && 'border-border/70 mt-1 ml-2 space-y-1 border-l pl-3',
        )}
      >
        {nodes.map((node) => {
          const key = node.slugPath ?? node.title
          const hasChildren = node.children.length > 0
          const collapsed = isCollapsed(key)
          const isActive = node.href ? normalize(node.href) === pathname : false

          // Top-level groups (no link, with children) act as section headers.
          const isSectionLabel = !node.href && depth === 0

          return (
            <li key={key} className={cn(isSectionLabel && 'mt-5 first:mt-0')}>
              <div className="flex items-center">
                {node.href ? (
                  <Link
                    href={node.href}
                    onClick={onNavigate}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'relative flex-1 rounded-md px-3 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-accent/10 text-accent before:bg-accent font-medium before:absolute before:top-1/2 before:left-0 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full'
                        : 'text-muted-fg hover:bg-muted hover:text-fg',
                    )}
                  >
                    {node.title}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      'flex-1 px-3 py-1.5',
                      isSectionLabel
                        ? 'text-muted-fg/80 text-xs font-semibold tracking-wider uppercase'
                        : 'text-fg text-sm font-semibold',
                    )}
                  >
                    {node.title}
                  </span>
                )}
                {hasChildren && (
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    aria-label={collapsed ? `Expand ${node.title}` : `Collapse ${node.title}`}
                    aria-expanded={!collapsed}
                    className="text-muted-fg hover:bg-muted hover:text-fg rounded p-1 transition-colors"
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
