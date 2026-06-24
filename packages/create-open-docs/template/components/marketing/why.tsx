import { Code2, Eye, GitBranch, Layers } from 'lucide-react'

import { Reveal } from './reveal'

const REASONS = [
  {
    icon: Eye,
    title: 'Source-code ownership',
    body: 'There is no opaque engine rendering your docs. Every line lives in your repository — read it, change it, delete what you don’t need.',
  },
  {
    icon: Layers,
    title: 'No framework abstractions',
    body: 'It’s just the Next.js App Router, React, and MDX. Skills you already have transfer directly; there is nothing proprietary to learn.',
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

/** "Why Open Docs" — the philosophy behind the project. */
export function WhyOpenDocs() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="text-sm font-semibold tracking-wide text-accent uppercase">
              Why Open Docs
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Documentation infrastructure without the lock-in
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-fg">
              Most documentation tools trade ownership for convenience. Open Docs
              refuses that bargain. You get a polished, production-ready starting
              point that is entirely yours — every component, every style, every
              line of the pipeline.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon
            return (
              <Reveal key={reason.title} delay={(i % 2) * 0.08}>
                <div className="h-full rounded-xl border border-border bg-card p-5">
                  <Icon className="size-5 text-accent" />
                  <h3 className="mt-3 font-semibold tracking-tight">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-fg">
                    {reason.body}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
