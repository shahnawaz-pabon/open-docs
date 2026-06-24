'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import type { NavNode } from '@/lib/types'
import { SidebarNav } from './sidebar-nav'

/** Slide-in navigation drawer for small screens. */
export function MobileNav({ tree }: { tree: NavNode[] }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-fg transition-colors hover:bg-muted lg:hidden"
        >
          <Menu className="size-4" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-200 data-[state=open]:opacity-100" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] -translate-x-full flex-col gap-4 overflow-y-auto border-r border-border bg-background p-6 shadow-xl transition-transform duration-200 ease-out focus:outline-none data-[state=open]:translate-x-0">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-semibold">Documentation</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close navigation menu"
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted-fg transition-colors hover:bg-muted hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Browse the documentation sections.
          </Dialog.Description>
          <SidebarNav tree={tree} onNavigate={() => setOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
