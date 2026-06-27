'use client'

import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'open-docs:sidebar:collapsed'
const PANEL_STORAGE_KEY = 'open-docs:sidebar:panel-collapsed'

/**
 * Tiny localStorage-backed store for the set of collapsed sidebar folders.
 * Subscribed to via `useSyncExternalStore` so the persisted value is read on
 * the client without a state-update-in-effect, and updates fan out to every
 * mounted sidebar instance (including across tabs through the `storage` event).
 */
const listeners = new Set<() => void>()
let cache: Set<string> | null = null
let cacheRaw = ''

function read(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  let raw = ''
  try {
    raw = localStorage.getItem(STORAGE_KEY) ?? ''
  } catch {
    return cache ?? new Set()
  }
  // Return a stable reference while the underlying string is unchanged so
  // useSyncExternalStore does not see a new snapshot on every render.
  if (cache && raw === cacheRaw) return cache
  cacheRaw = raw
  try {
    cache = new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    cache = new Set()
  }
  return cache
}

function write(next: Set<string>) {
  cache = next
  cacheRaw = JSON.stringify([...next])
  try {
    localStorage.setItem(STORAGE_KEY, cacheRaw)
  } catch {
    // ignore storage write failures (private mode, quota)
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null // force re-parse on next read
      listener()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

const SERVER_SNAPSHOT = new Set<string>()

/**
 * Persist the set of collapsed sidebar folders so the user's expand/collapse
 * choices survive navigation, reloads, and tab switches.
 */
export function useSidebarState() {
  const collapsed = useSyncExternalStore(subscribe, read, () => SERVER_SNAPSHOT)

  const setCollapsed = useCallback((next: Set<string>) => write(next), [])

  const toggle = useCallback((key: string) => {
    const next = new Set(read())
    if (next.has(key)) next.delete(key)
    else next.add(key)
    write(next)
  }, [])

  const isCollapsed = useCallback((key: string) => collapsed.has(key), [collapsed])

  return { collapsed, isCollapsed, toggle, setCollapsed }
}

/*
 * Separate boolean store for collapsing the whole sidebar panel (distinct from
 * the per-folder collapse set above). Mirrors the same localStorage +
 * useSyncExternalStore pattern so the preference persists and syncs across
 * mounted instances and tabs.
 */
const panelListeners = new Set<() => void>()
let panelCache: boolean | null = null

function readPanel(): boolean {
  if (typeof window === 'undefined') return false
  if (panelCache !== null) return panelCache
  try {
    panelCache = localStorage.getItem(PANEL_STORAGE_KEY) === '1'
  } catch {
    panelCache = false
  }
  return panelCache
}

function writePanel(next: boolean) {
  panelCache = next
  try {
    localStorage.setItem(PANEL_STORAGE_KEY, next ? '1' : '0')
  } catch {
    // ignore storage write failures (private mode, quota)
  }
  panelListeners.forEach((l) => l())
}

function subscribePanel(listener: () => void): () => void {
  panelListeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === PANEL_STORAGE_KEY) {
      panelCache = null // force re-read on next snapshot
      listener()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    panelListeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

/**
 * Persist whether the desktop sidebar panel is collapsed to a slim rail, so the
 * choice survives navigation, reloads, and tab switches.
 */
export function useSidebarCollapsed() {
  const collapsed = useSyncExternalStore(subscribePanel, readPanel, () => false)
  const toggle = useCallback(() => writePanel(!readPanel()), [])
  return { collapsed, toggle }
}
