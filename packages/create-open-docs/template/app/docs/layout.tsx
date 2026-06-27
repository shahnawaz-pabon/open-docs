import type { ReactNode } from 'react'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { SiteHeader } from '@/components/site-header'
import { getAllDocs } from '@/lib/content'
import { buildNavTree } from '@/lib/navigation'

/**
 * Docs shell: a three-column layout (sidebar · content · table of contents).
 * The navigation tree is built once at render and shared with the mobile drawer
 * in the header. The content column and TOC are provided by the page.
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  const tree = buildNavTree(getAllDocs())

  return (
    <div className="min-h-screen">
      <SiteHeader tree={tree} />
      <div className="mx-auto flex max-w-[90rem] gap-8 px-4 sm:px-6">
        <DocsSidebar tree={tree} />
        {children}
      </div>
    </div>
  )
}
