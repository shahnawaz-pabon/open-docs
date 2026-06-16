'use client'

import Fuse, { type FuseResult } from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'

import { FUSE_OPTIONS } from '@/lib/search'
import type { SearchRecord } from '@/lib/types'
import { withBasePath } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'ready' | 'error'

/** Module-level cache so the index is fetched and indexed at most once. */
let cachedFuse: Fuse<SearchRecord> | null = null
let inflight: Promise<Fuse<SearchRecord>> | null = null

async function loadFuse(): Promise<Fuse<SearchRecord>> {
  if (cachedFuse) return cachedFuse
  if (!inflight) {
    inflight = fetch(withBasePath('/search-index.json'))
      .then((res) => {
        if (!res.ok) throw new Error(`search index ${res.status}`)
        return res.json() as Promise<SearchRecord[]>
      })
      .then((records) => {
        cachedFuse = new Fuse(records, FUSE_OPTIONS)
        return cachedFuse
      })
  }
  return inflight
}

export interface SearchHit {
  record: SearchRecord
  /** Fields with their matched character ranges, for highlighting. */
  matches: FuseResult<SearchRecord>['matches']
}

/**
 * Loads the static search index lazily (only when `enabled` becomes true, e.g.
 * the palette opens) and returns ranked, highlight-ready hits for `query`.
 *
 * The Fuse instance lives in state (not a ref) so the memoized search re-runs
 * cleanly when the index finishes loading.
 */
export function useSearch(query: string, enabled: boolean) {
  const [fuse, setFuse] = useState<Fuse<SearchRecord> | null>(cachedFuse)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!enabled || fuse) return
    let active = true
    loadFuse()
      .then((loaded) => active && setFuse(loaded))
      .catch(() => active && setFailed(true))
    return () => {
      active = false
    }
  }, [enabled, fuse])

  // Derive status so the effect never calls setState synchronously.
  const status: Status = fuse
    ? 'ready'
    : failed
      ? 'error'
      : enabled
        ? 'loading'
        : 'idle'

  const hits = useMemo<SearchHit[]>(() => {
    const q = query.trim()
    if (!fuse || q.length === 0) return []
    return fuse
      .search(q, { limit: 12 })
      .map((r) => ({ record: r.item, matches: r.matches }))
  }, [query, fuse])

  return { hits, status }
}
