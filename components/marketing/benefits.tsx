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

/** Two-column benefits: value for readers vs. value for the team. */
export function Benefits() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for the whole lifecycle
            </h2>
            <p className="mt-4 text-lg text-muted-fg">
              Great docs serve two audiences at once. Open Docs is designed for
              both.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {BENEFITS.map((group, i) => (
            <Reveal key={group.heading} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-background p-8">
                <h3 className="text-lg font-semibold tracking-tight">
                  {group.heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Check className="size-3.5" />
                      </span>
                      <span className="leading-relaxed text-muted-fg">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
