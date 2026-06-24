import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/utils'

const badge = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-accent text-accent-fg',
        secondary: 'border-transparent bg-muted text-fg',
        outline: 'border-border text-fg',
        success:
          'border-transparent bg-green-500/15 text-green-700 dark:text-green-400',
        warning:
          'border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400',
        danger: 'border-transparent bg-red-500/15 text-red-700 dark:text-red-400',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps
  extends ComponentPropsWithoutRef<'span'>,
    VariantProps<typeof badge> {}

/** Small status/label pill. Used inline in prose and in component docs. */
export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badge({ variant }), className)} {...props} />
}
