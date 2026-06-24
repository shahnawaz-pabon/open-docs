import { File, Folder, FolderOpen } from 'lucide-react'
import { Fragment } from 'react'

import { cn } from '@/lib/utils'

export interface FileTreeNode {
  name: string
  /** Presence of `children` marks this as a folder (even if empty). */
  children?: FileTreeNode[]
  /** Render an open-folder icon and show children (folders only). */
  defaultOpen?: boolean
  /** Visually mark this entry as highlighted/active. */
  highlight?: boolean
  /** Optional inline comment shown dimmed after the name. */
  comment?: string
}

export interface FileTreeProps {
  tree: FileTreeNode[]
  className?: string
}

function isFolder(node: FileTreeNode): boolean {
  return Array.isArray(node.children)
}

function TreeItems({ nodes, depth }: { nodes: FileTreeNode[]; depth: number }) {
  return (
    <ul className={cn('m-0 list-none p-0', depth > 0 && 'ml-4 border-l border-border')}>
      {(nodes ?? []).map((node, i) => {
        const folder = isFolder(node)
        const open = node.defaultOpen ?? true
        const Icon = folder ? (open ? FolderOpen : Folder) : File
        return (
          <Fragment key={`${node.name}-${i}`}>
            <li className="my-0.5">
              <span
                className={cn(
                  'flex items-center gap-2 rounded-md px-2 py-1 font-mono text-sm',
                  node.highlight
                    ? 'bg-accent/10 text-accent'
                    : 'text-fg',
                )}
              >
                <Icon
                  className={cn(
                    'size-4 shrink-0',
                    folder ? 'text-accent' : 'text-muted-fg',
                  )}
                  aria-hidden
                />
                <span>{node.name}</span>
                {node.comment && (
                  <span className="text-muted-fg italic">— {node.comment}</span>
                )}
              </span>
              {folder && open && (node.children?.length ?? 0) > 0 && (
                <TreeItems nodes={node.children ?? []} depth={depth + 1} />
              )}
            </li>
          </Fragment>
        )
      })}
    </ul>
  )
}

/**
 * Renders a directory structure from a nested data model. Folders are inferred
 * from the presence of a `children` array.
 */
export function FileTree({ tree, className }: FileTreeProps) {
  return (
    <div
      role="tree"
      aria-label="File tree"
      className={cn(
        'my-6 overflow-x-auto rounded-xl border border-border bg-card p-3',
        className,
      )}
    >
      <TreeItems nodes={tree} depth={0} />
    </div>
  )
}
