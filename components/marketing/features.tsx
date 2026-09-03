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
    title: 'One-click deploy',
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

/** Feature grid — modern uniform cards with unique styling and hover effects. */
export function Features() {
  return (
    <section
      id="features"
      className="border-border from-background via-muted/10 to-background border-b bg-gradient-to-b"
    >
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="bg-accent/10 text-accent ring-accent/20 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset">
              <Sparkles className="size-3" />
              Everything included
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Production-ready from{' '}
              <span className="from-accent to-brand-400 bg-gradient-to-r bg-clip-text text-transparent">
                day one
              </span>
            </h2>
            <p className="text-muted-fg mt-3 text-base">
              No framework tax. No vendor lock-in. Just the features you need.
            </p>
          </div>
        </Reveal>

        {/* Uniform grid with modern styling */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <Reveal key={feature.title} delay={i * 0.05}>
                <div className="group border-border from-background via-card to-background hover:border-accent/30 hover:shadow-accent/10 relative h-full overflow-hidden rounded-xl border bg-gradient-to-br p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {/* Gradient overlay on hover */}
                  <div className="from-accent/0 to-accent/5 absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  {/* Decorative blur element */}
                  <div className="bg-accent/10 absolute -top-6 -right-6 size-20 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-70" />

                  <div className="relative">
                    <div className="bg-accent/10 text-accent ring-accent/20 group-hover:bg-accent group-hover:text-accent-fg group-hover:ring-accent inline-flex size-12 items-center justify-center rounded-xl ring-1 transition-all duration-300 ring-inset group-hover:scale-110">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-fg mt-4 text-base font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-muted-fg mt-2 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
