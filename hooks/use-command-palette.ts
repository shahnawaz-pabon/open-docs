'use client'

import { useCallback, useSyncExternalStore } from 'react'

/**
 * Shared open-state for the command palette so multiple triggers (the header
 * button and the sidebar search box) drive a single dialog. Without this each
 * {@link import('@/components/search/command-menu').CommandMenu} instance would
 * own its own state and its own global ⌘K listener, stacking two dialogs.
 *
 * The dialog itself is mounted once (in the header); other places render only a
 * trigger that calls {@link setCommandPaletteOpen}.
 */
const listeners = new Set<() => void>()
let open = false

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Set the palette open/closed and notify every subscribed trigger/dialog. */
export function setCommandPaletteOpen(next: boolean): void {
  if (open === next) return
  open = next
  emit()
}

/** Subscribe to and control the shared command-palette open state. */
export function useCommandPalette() {
  const isOpen = useSyncExternalStore(
    subscribe,
    () => open,
    () => false,
  )
  const setOpen = useCallback((next: boolean) => setCommandPaletteOpen(next), [])
  const toggle = useCallback(() => setCommandPaletteOpen(!open), [])
  return { open: isOpen, setOpen, toggle }
}
