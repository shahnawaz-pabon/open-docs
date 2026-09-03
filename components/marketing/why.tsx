import { Code2, Eye, GitBranch, Layers } from 'lucide-react'

import { Reveal } from './reveal'

const REASONS = [
  {
    icon: Eye,
    title: 'Source-code ownership',
    body: "There is no opaque engine rendering your docs. Every line lives in your repository — read it, change it, delete what you don't need.",
  },
  {
    icon: Layers,
    title: 'No framework abstractions',
    body: "It's just the Next.js App Router, React, and MDX. Skills you already have transfer directly; there is nothing proprietary to learn.",
  },
  {
    icon: Code2,
    title: 'Understandable by reading',
    body: 'Pure, well-named utilities and small components mean a new contributor — human or AI — can grok the architecture in minutes.',
  },
  {
    icon: GitBranch,
    title: 'Easy to fork & publish',
    body: 'Clone, change the brand color, write your content, and deploy. The CLI scaffolds a fresh project in seconds.',
  },
]

/** "Why Open Docs" — compact, modern card grid with gradient accents. */
export function WhyOpenDocs() {
  return (
    <section className="border-border bg-muted/20 border-b">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <div className="bg-accent/10 text-accent ring-accent/20 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset">
                <Eye className="size-3" />
                Why Open Docs
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Documentation infrastructure without the lock-in
              </h2>
              <p className="text-muted-fg mt-4 text-base leading-relaxed">
                Most documentation tools trade ownership for convenience. Open Docs refuses that
                bargain. You get a polished, production-ready starting point that is entirely yours
                — every component, every style, every line of the pipeline.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {REASONS.map((reason, i) => {
              const Icon = reason.icon
              return (
                <Reveal key={reason.title} delay={(i % 2) * 0.05}>
                  <div className="group border-border from-background to-card hover:shadow-accent/5 relative h-full overflow-hidden rounded-xl border bg-gradient-to-br p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    {/* Gradient overlay */}
                    <div className="from-accent/0 to-accent/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="relative">
                      <div className="bg-accent/10 text-accent ring-accent/20 inline-flex size-9 items-center justify-center rounded-lg ring-1 ring-inset">
                        <Icon className="size-4.5" />
                      </div>
                      <h3 className="text-fg mt-3 font-semibold tracking-tight">{reason.title}</h3>
                      <p className="text-muted-fg mt-2 text-sm leading-relaxed">{reason.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
