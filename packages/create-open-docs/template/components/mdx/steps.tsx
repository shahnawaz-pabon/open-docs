import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Ordered, numbered walkthrough. Wraps a sequence of {@link Step}s with a
 * connecting vertical line; each step's number is rendered from its position.
 */
export function Steps({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'my-6 flex flex-col gap-2 border-l border-border pl-8',
        '[counter-reset:step]',
        className,
      )}
      {...props}
    />
  )
}

export interface StepProps {
  /** Optional explicit heading for the step. */
  title?: string
  children?: ReactNode
  className?: string
}

/** A single step within {@link Steps}. The number badge auto-increments. */
export function Step({ title, children, className }: StepProps) {
  return (
    <div
      className={cn(
        'relative pb-2 [counter-increment:step]',
        // Numbered badge sitting on the connecting line
        'before:absolute before:top-0 before:-left-[2.6rem] before:flex before:size-7 before:items-center before:justify-center before:rounded-full before:border before:border-border before:bg-muted before:text-xs before:font-semibold before:text-fg before:content-[counter(step)]',
        className,
      )}
    >
      {title && (
        <h3 className="mt-0.5 mb-1 text-base font-semibold tracking-tight">
          {title}
        </h3>
      )}
      <div className="text-sm leading-relaxed text-muted-fg [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
