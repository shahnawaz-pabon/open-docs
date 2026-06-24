import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs, type Crumb } from '@/components/docs/breadcrumbs'
import { CopyMarkdown } from '@/components/docs/copy-markdown'
import { Feedback } from '@/components/docs/feedback'
import { EditPage, LastUpdated } from '@/components/docs/page-meta'
import { PrevNextNav } from '@/components/docs/prev-next'
import { TableOfContents } from '@/components/docs/toc'
import { MdxContent } from '@/components/mdx/mdx-content'
import { getAllDocs, getDocBySlug } from '@/lib/content'
import { stripLeadingH1 } from '@/lib/headings'
import { buildNavTree, getPrevNext } from '@/lib/navigation'
import { docHref, humanizeSegment } from '@/lib/slug'

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

/** Pre-render every doc page (including the docs index) for static export. */
export function generateStaticParams(): Array<{ slug: string[] }> {
  return getAllDocs().map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params
  const doc = getDocBySlug(slug)
  if (!doc) return {}
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    openGraph: {
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
    },
  }
}

/** Build a breadcrumb trail from the slug, using real page titles where known. */
function buildCrumbs(slug: string[]): Crumb[] {
  const crumbs: Crumb[] = [{ title: 'Docs', href: '/docs' }]
  for (let i = 0; i < slug.length; i++) {
    const prefix = slug.slice(0, i + 1)
    const doc = getDocBySlug(prefix)
    crumbs.push({
      title: doc?.frontmatter.title ?? humanizeSegment(slug[i]!),
      href: docHref(prefix.join('/')),
    })
  }
  return crumbs
}

export default async function DocPage({ params }: PageProps) {
  const { slug = [] } = await params
  const doc = getDocBySlug(slug)
  if (!doc) notFound()

  const tree = buildNavTree(getAllDocs())
  const { prev, next } = getPrevNext(tree, docHref(doc.slugPath))
  const crumbs = slug.length > 0 ? buildCrumbs(slug) : []

  return (
    <>
      <article id="main-content" className="min-w-0 flex-1 py-8 lg:py-10">
        <Breadcrumbs items={crumbs} />

        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {doc.frontmatter.title}
          </h1>
          {doc.frontmatter.description && (
            <p className="text-lg text-muted-fg">{doc.frontmatter.description}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <CopyMarkdown source={doc.content} />
            <EditPage filePath={doc.filePath} />
          </div>
        </header>

        <div className="max-w-none">
          <MdxContent source={stripLeadingH1(doc.content)} />
        </div>

        <Feedback />

        <div className="mt-8">
          <LastUpdated iso={doc.lastModified} />
        </div>

        <PrevNextNav prev={prev} next={next} />
      </article>

      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto py-10 xl:block">
        <TableOfContents headings={doc.headings} />
      </aside>
    </>
  )
}
