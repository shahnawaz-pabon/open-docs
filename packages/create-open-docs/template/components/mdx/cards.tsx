import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Responsive grid wrapper for {@link Card}s. */
export function Cards({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('my-6 grid gap-4 sm:grid-cols-2', className)}
      {...props}
    />
  )
}

export interface CardProps {
  title: string
  children?: ReactNode
  /** When set, the whole card becomes a link. External URLs open in a new tab. */
  href?: string
  /** Optional leading icon (e.g. a lucide icon element). */
  icon?: ReactNode
  className?: string
}

/**
 * Linkable content card. Used on the homepage and across docs to surface
 * navigation targets. Hover lifts the border to the brand accent.
 */
export function Card({ title, children, href, icon, className }: CardProps) {
  const isExternal = href ? /^https?:\/\//.test(href) : false
  const isLink = Boolean(href)

  const content = (
    <>
      <div className="mb-2 flex items-center gap-2">
        {icon && (
          <span className="text-accent" aria-hidden>
            {icon}
          </span>
        )}
        <h3 className="font-semibold tracking-tight">{title}</h3>
        {isLink && (
          <ArrowUpRight
            className="ml-auto size-4 text-muted-fg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            aria-hidden
          />
        )}
      </div>
      {children && (
        <div className="text-sm leading-relaxed text-muted-fg">{children}</div>
      )}
    </>
  )

  const cardClass = cn(
    'group block rounded-xl border border-border bg-card p-5 transition-colors',
    isLink && 'hover:border-accent',
    className,
  )

  if (!href) {
    return <div className={cardClass}>{content}</div>
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cardClass}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={cardClass}>
      {content}
    </Link>
  )
}
