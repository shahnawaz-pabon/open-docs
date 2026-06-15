'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import {
  Children,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/utils'
import { slugify } from '@/lib/slug'

export interface TabProps {
  /** Label shown in the tab trigger. */
  value: string
  children?: ReactNode
}

/**
 * A single tab panel. Must be a direct child of {@link Tabs}. The `value` prop
 * is used both as the trigger label and (slugified) as the panel key.
 */
export function Tab({ children }: TabProps) {
  // Rendering is handled by <Tabs>, which reads `value`/`children` from props.
  // This wrapper exists so authors write semantic <Tab value="…"> in MDX.
  return <>{children}</>
}

export interface TabsProps {
  children: ReactNode
  /** Optional default selected tab value; defaults to the first tab. */
  defaultValue?: string
  className?: string
}

function isTabElement(node: ReactNode): node is ReactElement<TabProps> {
  return isValidElement(node) && (node.props as TabProps).value !== undefined
}

/**
 * Accessible tabbed content built on Radix Tabs. Children must be {@link Tab}
 * elements; arrow-key navigation, roving focus, and ARIA wiring come for free.
 */
export function Tabs({ children, defaultValue, className }: TabsProps) {
  const uid = useId()
  const tabs = Children.toArray(children).filter(isTabElement)

  if (tabs.length === 0) return null

  const valueOf = (t: ReactElement<TabProps>) => slugify(t.props.value)
  const initial = defaultValue ? slugify(defaultValue) : valueOf(tabs[0]!)

  return (
    <TabsPrimitive.Root
      defaultValue={initial}
      className={cn('my-6 overflow-hidden rounded-xl border border-border', className)}
    >
      <TabsPrimitive.List
        className="flex gap-1 overflow-x-auto border-b border-border bg-muted/40 px-1"
        aria-label="Tabbed content"
      >
        {tabs.map((tab) => {
          const v = valueOf(tab)
          return (
            <TabsPrimitive.Trigger
              key={`${uid}-${v}`}
              value={v}
              className={cn(
                'relative px-4 py-2.5 text-sm font-medium whitespace-nowrap text-muted-fg transition-colors',
                'hover:text-fg',
                'data-[state=active]:text-fg',
                'after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-transparent data-[state=active]:after:bg-accent',
              )}
            >
              {tab.props.value}
            </TabsPrimitive.Trigger>
          )
        })}
      </TabsPrimitive.List>
      {tabs.map((tab) => {
        const v = valueOf(tab)
        return (
          <TabsPrimitive.Content
            key={`${uid}-panel-${v}`}
            value={v}
            className="px-4 py-3 text-sm leading-relaxed focus-visible:outline-none [&>:first-child]:mt-0 [&>:last-child]:mb-0"
          >
            {tab.props.children}
          </TabsPrimitive.Content>
        )
      })}
    </TabsPrimitive.Root>
  )
}
