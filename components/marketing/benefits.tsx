import { Check } from 'lucide-react'

import { Reveal } from './reveal'

const BENEFITS: Array<{ heading: string; points: string[] }> = [
  {
    heading: 'For your readers',
    points: [
      'Sub-second navigation and instant fuzzy search',
      'Accessible to WCAG AA with full keyboard support',
      'Beautiful typography and readable code blocks',
      'Light and dark themes that respect system settings',
    ],
  },
  {
    heading: 'For your team',
    points: [
      'Author in MDX with reusable, documented components',
      'Type-safe content pipeline with 90%+ test coverage',
      'CI, linting, and conventional commits out of the box',
      'Static export deploys anywhere — GitHub Pages included',
    ],
  },
]

/** Two-column benefits with gradient cards and modern styling. */
export function Benefits() {
  return (
    <section className="border-border border-b">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="bg-accent/10 text-accent ring-accent/20 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset">
              <Check className="size-3" />
              Built for everyone
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for the whole lifecycle
            </h2>
            <p className="text-muted-fg mt-3 text-base">
              Great docs serve two audiences at once. Open Docs is designed for both.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {BENEFITS.map((group, i) => (
            <Reveal key={group.heading} delay={i * 0.06}>
              <div className="group border-border from-background via-card to-background hover:shadow-accent/5 relative h-full overflow-hidden rounded-2xl border bg-gradient-to-br p-7 shadow-sm transition-all hover:shadow-lg">
                {/* Subtle gradient accent */}
                <div className="from-accent/0 to-accent/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2">
                    <div className="bg-accent size-2 rounded-full" />
                    <h3 className="text-lg font-semibold tracking-tight">{group.heading}</h3>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {group.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm">
                        <span className="bg-accent/15 text-accent ring-accent/20 mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full ring-1 ring-inset">
                          <Check className="size-3.5" strokeWidth={2.5} />
                        </span>
                        <span className="text-muted-fg leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
