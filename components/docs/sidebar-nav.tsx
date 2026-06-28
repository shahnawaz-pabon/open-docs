'use client'

import {
  BadgeCheck,
  BookOpen,
  ChevronRight,
  Code2,
  Component,
  Download,
  FileText,
  FolderTree,
  LayoutGrid,
  ListOrdered,
  type LucideIcon,
  Megaphone,
  PenLine,
  Rocket,
  UploadCloud,
} from 'lucide-react'
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
 * Keyword → icon map for the per-item leading glyphs. This is purely
 * presentational — it derives an icon from a node's slug/title without touching
 * the nav data model ({@link NavNode} carries no icon field). The first matching
 * keyword wins; unmatched leaves fall back to a generic page icon.
 */
const ICON_RULES: Array<[RegExp, LucideIcon]> = [
  [/getting-started|quick-?start|rocket/, Rocket],
  [/install|download|setup/, Download],
  [/project-structure|file-tree|structure/, FolderTree],
  [/deploy|publish/, UploadCloud],
  [/writing|markdown|content/, PenLine],
  [/guide|overview|introduction|^index$/, BookOpen],
  [/component/, Component],
  [/callout|alert|note/, Megaphone],
  [/card/, LayoutGrid],
  [/step/, ListOrdered],
  [/code/, Code2],
  [/badge/, BadgeCheck],
]

function iconFor(node: NavNode): LucideIcon {
  const haystack = `${node.slugPath ?? ''} ${node.title}`.toLowerCase()
  for (const [pattern, Icon] of ICON_RULES) {
    if (pattern.test(haystack)) return Icon
  }
  return FileText
}

/**
 * Recursive sidebar navigation tree. Folder groups collapse/expand and the
 * state persists via {@link useSidebarState}; the active link is derived from
 * the current pathname. Used by both the desktop sidebar and mobile drawer.
 *
 * Top-level docs folders carry both an `href` (their `index` page) and
 * `children`, so they render as a clickable row whose right-hand chevron is a
 * separate toggle button — clicking the label navigates, clicking the chevron
 * expands/collapses without leaving the page.
 */
export function SidebarNav({ tree, onNavigate }: { tree: NavNode[]; onNavigate?: () => void }) {
  const pathname = normalize(usePathname())
  const { isCollapsed, toggle } = useSidebarState()

  function renderNodes(nodes: NavNode[], depth: number) {
    return (
      <ul
        className={cn(
          'space-y-0.5',
          depth > 0 && 'border-border/60 mt-0.5 ml-3.5 space-y-0.5 border-l pl-2',
        )}
      >
        {nodes.map((node) => {
          const key = node.slugPath ?? node.title
          const hasChildren = node.children.length > 0
          const collapsed = isCollapsed(key)
          const isActive = node.href ? normalize(node.href) === pathname : false
          const Icon = iconFor(node)

          // Top-level rows read as section anchors (stronger text); nested rows
          // are quieter. Active always wins with the brand accent.
          const rowText = isActive
            ? 'text-accent font-medium'
            : depth === 0
              ? 'text-fg font-medium hover:bg-muted'
              : 'text-muted-fg hover:bg-muted hover:text-fg'

          const chevron = hasChildren ? (
            <ChevronRight
              className={cn('size-3.5 shrink-0 transition-transform', !collapsed && 'rotate-90')}
            />
          ) : null

          return (
            <li key={key}>
              <div className={cn('flex items-center rounded-lg', isActive && 'bg-accent/10')}>
                {node.href ? (
                  <Link
                    href={node.href}
                    onClick={onNavigate}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'group flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors',
                      rowText,
                    )}
                  >
                    <Icon
                      className={cn(
                        'size-4 shrink-0 transition-colors',
                        isActive ? 'text-accent' : 'text-muted-fg/70 group-hover:text-fg',
                      )}
                    />
                    <span className="truncate">{node.title}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    aria-label={collapsed ? `Expand ${node.title}` : `Collapse ${node.title}`}
                    aria-expanded={!collapsed}
                    className={cn(
                      'group flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors',
                      rowText,
                    )}
                  >
                    <Icon className="text-muted-fg/70 group-hover:text-fg size-4 shrink-0 transition-colors" />
                    <span className="truncate text-left">{node.title}</span>
                  </button>
                )}

                {/* For link rows, the chevron is its own toggle so the label can
                    still navigate. For non-link rows the whole button toggles,
                    so the chevron is a passive indicator. */}
                {hasChildren &&
                  (node.href ? (
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      aria-label={collapsed ? `Expand ${node.title}` : `Collapse ${node.title}`}
                      aria-expanded={!collapsed}
                      className="text-muted-fg hover:text-fg inline-flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors"
                    >
                      {chevron}
                    </button>
                  ) : (
                    <span className="text-muted-fg inline-flex size-8 shrink-0 items-center justify-center">
                      {chevron}
                    </span>
                  ))}
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
