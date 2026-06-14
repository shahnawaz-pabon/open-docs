import { Pencil } from 'lucide-react'

/** Repo path used to build "edit this page" links. Adjust per fork. */
const EDIT_BASE = 'https://github.com/shahnawaz-pabon/open-docs/edit/main'

/** "Edit this page on GitHub" link. */
export function EditPage({ filePath }: { filePath: string }) {
  return (
    <a
      href={`${EDIT_BASE}/${filePath}`}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-1.5 text-sm text-muted-fg transition-colors hover:text-fg"
    >
      <Pencil className="size-3.5" />
      Edit this page
    </a>
  )
}

/** Human-readable "last updated" line derived from the file mtime. */
export function LastUpdated({ iso }: { iso: string }) {
  const date = new Date(iso)
  const formatted = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return (
    <p className="text-sm text-muted-fg">
      Last updated on <time dateTime={iso}>{formatted}</time>
    </p>
  )
}
