import { GitFork } from 'lucide-react'
import Link from 'next/link'

import { LogoMark } from './logo'

const REPO_URL = 'https://github.com/shahnawaz-pabon/open-docs'

const LINKS: Array<{ heading: string; items: Array<{ label: string; href: string; external?: boolean }> }> = [
  {
    heading: 'Documentation',
    items: [
      { label: 'Getting Started', href: '/docs/getting-started' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Guides', href: '/docs/guides' },
    ],
  },
  {
    heading: 'Project',
    items: [
      { label: 'GitHub', href: REPO_URL, external: true },
      { label: 'Issues', href: `${REPO_URL}/issues`, external: true },
      { label: 'Discussions', href: `${REPO_URL}/discussions`, external: true },
    ],
  },
  {
    heading: 'Community',
    items: [
      { label: 'Contributing', href: `${REPO_URL}/blob/main/CONTRIBUTING.md`, external: true },
      { label: 'Code of Conduct', href: `${REPO_URL}/blob/main/CODE_OF_CONDUCT.md`, external: true },
      { label: 'License (MIT)', href: `${REPO_URL}/blob/main/LICENSE`, external: true },
    ],
  },
]

/** Site footer with navigation columns and brand line. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <LogoMark className="size-6" />
              <span className="tracking-tight">Open Docs</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-fg">
              The modern, open-source documentation template.
            </p>
          </div>

          {LINKS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold">{column.heading}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-muted-fg transition-colors hover:text-fg"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-muted-fg transition-colors hover:text-fg"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-fg sm:flex-row">
          <p>MIT Licensed · © SHAHNAWAZ HOSSAN</p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub repository"
            className="inline-flex items-center gap-2 transition-colors hover:text-fg"
          >
            <GitFork className="size-4" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
