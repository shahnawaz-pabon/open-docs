'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { FileText, Hash, Search, CornerDownLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'

import { useSearch, type SearchHit } from '@/hooks/use-search'
import { cn } from '@/lib/utils'
import { Highlight } from './highlight'
import { SearchTrigger } from './search-trigger'

/**
 * Command palette search (Cmd/Ctrl+K). Loads the static index on first open,
 * runs fuzzy search with Fuse.js, and supports full keyboard navigation with
 * highlighted matches. A page hit shows a document icon; a heading hit shows a
 * hash and deep-links to the section.
 */
export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
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
        setOpen((v) => !v)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

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
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${active}"]`,
    )
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const trimmed = query.trim()

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <SearchTrigger />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-150 data-[state=open]:opacity-100" />
        <Dialog.Content
          className="fixed top-[15vh] left-1/2 z-50 w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl focus:outline-none"
          aria-label="Search documentation"
        >
          <Dialog.Title className="sr-only">Search documentation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Type to search across all documentation pages and headings.
          </Dialog.Description>

          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="size-4 shrink-0 text-muted-fg" aria-hidden />
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
              className="h-14 w-full bg-transparent text-base text-fg outline-none placeholder:text-muted-fg"
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

          <div className="hidden items-center gap-4 border-t border-border px-4 py-2 text-xs text-muted-fg sm:flex">
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
  const titleMatch = useMemo(
    () => (h: SearchHit) => h.matches?.find((m) => m.key === 'title'),
    [],
  )

  if (query.length === 0) {
    return (
      <Empty>
        {status === 'loading'
          ? 'Loading search…'
          : 'Type to search the documentation.'}
      </Empty>
    )
  }
  if (status === 'error') {
    return <Empty>Search is unavailable right now.</Empty>
  }
  if (hits.length === 0) {
    return (
      <Empty>
        No results for <span className="font-medium text-fg">“{query}”</span>.
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
              <Icon
                className="mt-0.5 size-4 shrink-0 text-muted-fg"
                aria-hidden
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-fg">
                  <Highlight
                    text={hit.record.title}
                    indices={titleMatch(hit)?.indices}
                  />
                </span>
                <span className="block truncate text-xs text-muted-fg">
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
  return (
    <li className="px-3 py-10 text-center text-sm text-muted-fg">{children}</li>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-5 items-center justify-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
      {children}
    </kbd>
  )
}
