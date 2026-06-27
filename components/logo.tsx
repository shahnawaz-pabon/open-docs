import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * The Open Docs brand mark — an open book whose two pages fan out from a
 * centre spine, drawn in the brand accent. The pages use stepped opacity for a
 * sense of depth. Colours come from the `accent` tokens so the mark follows the
 * active theme automatically.
 */
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
      {/* Left page */}
      <path
        d="M16 11.5C13.6 10 10.4 9.7 7.8 10.7v11.4c2.6-1 5.8-.7 8.2.8V11.5Z"
        className="fill-accent-fg"
        opacity="0.95"
      />
      {/* Right page */}
      <path
        d="M16 11.5c2.4-1.5 5.6-1.8 8.2-.8v11.4c-2.6-1-5.8-.7-8.2.8V11.5Z"
        className="fill-accent-fg"
        opacity="0.65"
      />
      {/* Centre spine */}
      <rect x="15.4" y="10.6" width="1.2" height="12.4" rx="0.6" className="fill-accent-fg" />
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
