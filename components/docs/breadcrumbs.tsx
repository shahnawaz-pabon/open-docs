import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

export interface Crumb {
  title: string
  href?: string
}

/** Accessible breadcrumb trail for the current doc page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-fg">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <Fragment key={`${item.title}-${i}`}>
              <li>
                {item.href && !isLast ? (
                  <Link href={item.href} className="transition-colors hover:text-fg">
                    {item.title}
                  </Link>
                ) : (
                  <span className={isLast ? 'font-medium text-fg' : undefined} aria-current={isLast ? 'page' : undefined}>
                    {item.title}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden className="flex items-center">
                  <ChevronRight className="size-3.5" />
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
