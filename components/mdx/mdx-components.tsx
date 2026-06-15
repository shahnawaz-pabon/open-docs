import Link from 'next/link'
import type { AnchorHTMLAttributes, ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Anchor-linked heading factory. `rehype-slug` injects the `id`; we add a
 * hover-revealed `#` permalink for easy section sharing.
 */
function heading(Tag: 'h1' | 'h2' | 'h3' | 'h4') {
  const sizes: Record<typeof Tag, string> = {
    h1: 'mt-2 mb-6 text-3xl font-bold tracking-tight',
    h2: 'mt-12 mb-4 border-b border-border pb-2 text-2xl font-semibold tracking-tight',
    h3: 'mt-8 mb-3 text-xl font-semibold tracking-tight',
    h4: 'mt-6 mb-2 text-lg font-semibold tracking-tight',
  }
  function Heading({ id, children, className, ...props }: ComponentPropsWithoutRef<typeof Tag>) {
    return (
      <Tag id={id} className={cn('group scroll-mt-24', sizes[Tag], className)} {...props}>
        {id ? (
          <a
            href={`#${id}`}
            className="anchor-link no-underline"
            aria-label={`Link to this section`}
          >
            {children}
            <span
              aria-hidden
              className="ml-2 text-muted-fg opacity-0 transition-opacity group-hover:opacity-100"
            >
              #
            </span>
          </a>
        ) : (
          children
        )}
      </Tag>
    )
  }
  Heading.displayName = `MDX${Tag.toUpperCase()}`
  return Heading
}

/** Internal links use next/link; external links open safely in a new tab. */
function MdxLink({ href = '', children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = /^https?:\/\//.test(href)
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="font-medium text-accent underline underline-offset-4 hover:opacity-80"
        {...props}
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      href={href}
      className="font-medium text-accent underline underline-offset-4 hover:opacity-80"
    >
      {children}
    </Link>
  )
}

/**
 * Base HTML element styling for MDX content. Custom components (Callout, Cards,
 * Tabs, …) are merged into this map by `getMdxComponents` in Phase 3.
 */
export const baseMdxComponents = {
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  a: MdxLink,
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="leading-7 [&:not(:first-child)]:mt-5" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="my-5 ml-6 list-disc space-y-2 marker:text-muted-fg" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="my-5 ml-6 list-decimal space-y-2 marker:text-muted-fg" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="leading-7" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="my-6 border-l-2 border-accent pl-6 text-muted-fg italic"
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="my-10 border-border" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="border border-border bg-muted px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="border border-border px-4 py-2" {...props} />
  ),
  // Inline code. Fenced code blocks are handled by rehype-pretty-code (<pre>).
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    const isBlock = 'data-language' in props || typeof props.children !== 'string'
    if (isBlock) return <code {...props} />
    return (
      <code
        className="rounded-md border border-border bg-code-bg px-1.5 py-0.5 font-mono text-[0.85em]"
        {...props}
      />
    )
  },
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-border bg-code-bg p-4 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
}
