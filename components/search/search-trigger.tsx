'use client'

import { Search } from 'lucide-react'
import type { ComponentPropsWithRef } from 'react'

import { useMounted } from '@/hooks/use-mounted'
import { cn } from '@/lib/utils'

/**
 * Search launcher button. Displays the platform-appropriate keyboard hint and
 * opens the command palette.
 *
 * Spreads through any extra props (and `ref`) so it can be used as a Radix
 * `Dialog.Trigger asChild` child — the dialog's click/keyboard handlers are
 * merged onto the underlying `<button>`.
 *
 * The platform check reads `navigator` only after mount (guarded by
 * {@link useMounted}) so server and first client render agree, then the hint
 * resolves to ⌘ on Apple platforms.
 */
export function SearchTrigger({
  className,
  ...props
}: ComponentPropsWithRef<'button'>) {
  const mounted = useMounted()
  const isMac =
    mounted && /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent)

  return (
    <button
      type="button"
      aria-label="Search documentation"
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 text-sm text-muted-fg transition-colors hover:bg-muted',
        className,
      )}
      {...props}
    >
      <Search className="size-4" />
      <span className="hidden sm:inline">Search…</span>
      <kbd className="ml-2 hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] sm:inline-flex">
        {isMac ? '⌘' : 'Ctrl'} K
      </kbd>
    </button>
  )
}
