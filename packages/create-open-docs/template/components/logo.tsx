import Link from 'next/link'
import { cn } from '@/lib/utils'

/** The Open Docs brand mark — an open-book/document glyph in the brand accent. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn('size-7', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" className="fill-accent" />
      <path
        d="M9 10.5C9 9.67 9.67 9 10.5 9H15v14h-4.5A1.5 1.5 0 0 1 9 21.5v-11Z"
        className="fill-accent-fg"
        opacity="0.9"
      />
      <path
        d="M17 9h4.5c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5H17V9Z"
        className="fill-accent-fg"
        opacity="0.6"
      />
    </svg>
  )
}

/** Full logo: mark + wordmark, linking home. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2 font-semibold', className)}>
      <LogoMark />
      <span className="text-lg tracking-tight">Open Docs</span>
    </Link>
  )
}
