import {
  FileText,
  Moon,
  Rocket,
  Scale,
  Search,
  Smartphone,
  Sparkles,
  Unlock,
  type LucideIcon,
} from 'lucide-react'

import { Reveal } from './reveal'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: FileText,
    title: 'Runtime MDX',
    description:
      'Write docs in MDX with full React component support. Frontmatter, nested folders, and meta.json drive navigation automatically.',
  },
  {
    icon: Search,
    title: 'Instant search',
    description:
      'Fuzzy command-palette search (Cmd/Ctrl+K) powered by Fuse.js over a static index — fast, offline-capable, no server required.',
  },
  {
    icon: Moon,
    title: 'Dark mode',
    description:
      'A near-black, warm-accented dark theme with no flash on load, built on next-themes and CSS variables you can retheme in minutes.',
  },
  {
    icon: Smartphone,
    title: 'Mobile friendly',
    description:
      'Responsive three-column layout with an accessible slide-in navigation drawer and a sticky table of contents on every page.',
  },
  {
    icon: Scale,
    title: 'MIT licensed',
    description:
      'Permissively licensed and community driven. Fork it, ship it, sell it — there are no strings attached.',
  },
  {
    icon: Unlock,
    title: 'Zero lock-in',
    description:
      'No documentation framework, no hidden magic. Every component is plain Next.js, React, and TypeScript that you own outright.',
  },
  {
    icon: Rocket,
    title: 'One-click deployment',
    description:
      'Ship documentation instantly with built-in GitHub Actions workflows for testing, building, and publishing to GitHub Pages.',
  },
  {
    icon: Sparkles,
    title: 'Open source',
    description:
      'Built in the open with conventional commits, CI, changesets, and a welcoming contributor workflow from day one.',
  },
]

/** Feature grid — the eight headline capabilities of Open Docs. */
export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="mt-4 text-lg text-muted-fg">
            A complete, batteries-included documentation stack — without the
            framework tax.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, i) => {
          const Icon = feature.icon
          return (
            <Reveal key={feature.title} delay={(i % 4) * 0.05} className="bg-background">
              <div className="group h-full p-6 transition-colors hover:bg-muted/40">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-fg">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
