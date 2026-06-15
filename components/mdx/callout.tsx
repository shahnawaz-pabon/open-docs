import { AlertTriangle, Info, Lightbulb, XCircle } from 'lucide-react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type CalloutType = 'note' | 'tip' | 'info' | 'warning' | 'danger'

const STYLES: Record<
  CalloutType,
  { icon: typeof Info; className: string; label: string }
> = {
  note: {
    icon: Info,
    label: 'Note',
    className: 'border-border bg-muted/50 text-fg [&_a]:text-accent',
  },
  info: {
    icon: Info,
    label: 'Info',
    className:
      'border-blue-500/30 bg-blue-500/10 text-blue-900 dark:text-blue-100 [&_svg]:text-blue-500',
  },
  tip: {
    icon: Lightbulb,
    label: 'Tip',
    className:
      'border-green-500/30 bg-green-500/10 text-green-900 dark:text-green-100 [&_svg]:text-green-500',
  },
  warning: {
    icon: AlertTriangle,
    label: 'Warning',
    className:
      'border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-100 [&_svg]:text-amber-500',
  },
  danger: {
    icon: XCircle,
    label: 'Danger',
    className:
      'border-red-500/30 bg-red-500/10 text-red-900 dark:text-red-100 [&_svg]:text-red-500',
  },
}

export interface CalloutProps extends ComponentPropsWithoutRef<'div'> {
  type?: CalloutType
  title?: string
  /** Override the default icon; pass `null` to hide it. */
  icon?: ReactNode
}

/**
 * Highlighted aside for notes, tips, warnings, and errors. Renders a colored
 * panel with a leading icon and optional title.
 */
export function Callout({
  type = 'note',
  title,
  icon,
  className,
  children,
  ...props
}: CalloutProps) {
  const style = STYLES[type] ?? STYLES.note
  const Icon = style.icon
  const showIcon = icon !== null

  return (
    <div
      role="note"
      aria-label={title ?? style.label}
      className={cn(
        'my-6 flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed',
        style.className,
        className,
      )}
      {...props}
    >
      {showIcon && (
        <span className="mt-0.5 shrink-0" aria-hidden>
          {icon ?? <Icon className="size-5" />}
        </span>
      )}
      <div className="min-w-0 [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        {children}
      </div>
    </div>
  )
}
