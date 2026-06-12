'use client'

import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

/**
 * Returns `true` only after the component has mounted on the client. Useful for
 * avoiding hydration mismatches with theme- or storage-dependent UI.
 *
 * Implemented with `useSyncExternalStore`: the server snapshot is `false` and
 * the client snapshot is `true`, so React swaps the value during hydration
 * without a state-update-in-effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}
