'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { FileText, Hash, Search, CornerDownLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'

import { useCommandPalette } from '@/hooks/use-command-palette'
import { useSearch, type SearchHit } from '@/hooks/use-search'
import { cn } from '@/lib/utils'
import { Highlight } from './highlight'
import { SearchTrigger } from './search-trigger'

/**
 * Trigger button that opens the shared command palette. Render this anywhere a
 * search entry point is needed (header, sidebar); the dialog itself is mounted
 * once by {@link CommandPalette}. Extra props/`ref` spread through to the
 * underlying button so it can be used as a Radix `asChild` child.
 */
export function CommandMenuTrigger(props: React.ComponentPropsWithRef<'button'>) {
  const { setOpen } = useCommandPalette()
  return <SearchTrigger onClick={() => setOpen(true)} {...props} />
}

/**
 * Command palette search (Cmd/Ctrl+K). Loads the static index on first open,
 * runs fuzzy search with Fuse.js, and supports full keyboard navigation with
 * highlighted matches. A page hit shows a document icon; a heading hit shows a
 * hash and deep-links to the section.
 *
 * Mount this exactly once (the header does). Open it from anywhere with a
 * {@link CommandMenuTrigger} or the global ⌘K / Ctrl+K shortcut — all share the
 * single open-state in {@link useCommandPalette}.
 */
export function CommandPalette() {
  const router = useRouter()
  const { open, setOpen, toggle } = useCommandPalette()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const listId = useId()

  const { hits, status } = useSearch(query, open)

  // Global Cmd/Ctrl+K shortcut.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        toggle()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [toggle])

  const onQueryChange = useCallback((value: string) => {
    setQuery(value)
    setActive(0) // reset selection whenever the query changes
  }, [])

  const go = useCallback(
    (hit: SearchHit | undefined) => {
      if (!hit) return
      setOpen(false)
      setQuery('')
      router.push(hit.record.href)
    },
    [router],
  )

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (hits.length === 0) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((i) => (i + 1) % hits.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((i) => (i - 1 + hits.length) % hits.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        go(hits[active])
      }
    },
    [hits, active, go],
  )

  // Keep the active item scrolled into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const trimmed = query.trim()

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-150 data-[state=open]:opacity-100" />
        <Dialog.Content
          className="border-border bg-background fixed top-[15vh] left-1/2 z-50 w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border shadow-2xl focus:outline-none"
          aria-label="Search documentation"
        >
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Type to search across all documentation pages and headings.
          </Dialog.Description>

          <div className="border-border flex items-center gap-3 border-b px-4">
            <Search className="text-muted-fg size-4 shrink-0" aria-hidden />
            <input
              autoFocus
              type="text"
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-autocomplete="list"
              placeholder="Search documentation…"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={onInputKeyDown}
              className="text-fg placeholder:text-muted-fg h-14 w-full bg-transparent text-base outline-none"
            />
          </div>

          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label="Search results"
            className="max-h-[55vh] overflow-y-auto p-2"
          >
            <Results
              hits={hits}
              status={status}
              query={trimmed}
              active={active}
              onHover={setActive}
              onSelect={go}
            />
          </ul>

          <div className="border-border text-muted-fg hidden items-center gap-4 border-t px-4 py-2 text-xs sm:flex">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <span>to navigate</span>
            <span className="inline-flex items-center gap-1">
              <Kbd>
                <CornerDownLeft className="size-3" />
              </Kbd>
              to select
            </span>
            <span className="inline-flex items-center gap-1">
              <Kbd>esc</Kbd>to close
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function Results({
  hits,
  status,
  query,
  active,
  onHover,
  onSelect,
}: {
  hits: SearchHit[]
  status: ReturnType<typeof useSearch>['status']
  query: string
  active: number
  onHover: (i: number) => void
  onSelect: (hit: SearchHit) => void
}) {
  const titleMatch = useMemo(() => (h: SearchHit) => h.matches?.find((m) => m.key === 'title'), [])

  if (query.length === 0) {
    return (
      <Empty>
        {status === 'loading' ? 'Loading search…' : 'Type to search the documentation.'}
      </Empty>
    )
  }
  if (status === 'error') {
    return <Empty>Search is unavailable right now.</Empty>
  }
  if (hits.length === 0) {
    return (
      <Empty>
        No results for <span className="text-fg font-medium">“{query}”</span>.
      </Empty>
    )
  }

  return (
    <>
      {hits.map((hit, i) => {
        const isHeading = hit.record.href.includes('#')
        const Icon = isHeading ? Hash : FileText
        return (
          <li key={hit.record.id} role="option" aria-selected={i === active}>
            <button
              type="button"
              data-index={i}
              onMouseMove={() => onHover(i)}
              onClick={() => onSelect(hit)}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                i === active ? 'bg-muted' : 'hover:bg-muted/60',
              )}
            >
              <Icon className="text-muted-fg mt-0.5 size-4 shrink-0" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="text-fg block truncate text-sm font-medium">
                  <Highlight text={hit.record.title} indices={titleMatch(hit)?.indices} />
                </span>
                <span className="text-muted-fg block truncate text-xs">
                  {hit.record.section}
                  {hit.record.description ? ` — ${hit.record.description}` : ''}
                </span>
              </span>
            </button>
          </li>
        )
      })}
    </>
  )
}

function Empty({ children }: { children: React.ReactNode }) {
  return <li className="text-muted-fg px-3 py-10 text-center text-sm">{children}</li>
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="border-border bg-muted inline-flex min-w-5 items-center justify-center rounded border px-1.5 py-0.5 font-mono text-[10px]">
      {children}
    </kbd>
  )
}
