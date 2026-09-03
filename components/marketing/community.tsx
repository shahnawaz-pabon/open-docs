import { GitPullRequest, Heart, MessageCircle, Users } from 'lucide-react'

import { Reveal } from './reveal'

const REPO_URL = 'https://github.com/shahnawaz-pabon/open-docs'

const STATS = [
  { icon: Heart, label: 'MIT licensed', value: 'Free forever' },
  { icon: GitPullRequest, label: 'Contributions', value: 'Welcome' },
  { icon: Users, label: 'Community', value: 'Driven' },
  { icon: MessageCircle, label: 'Discussions', value: 'Open' },
]

/** Community section with gradient cards and modern styling. */
export function Community() {
  return (
    <section className="border-border border-b">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-accent text-sm font-semibold tracking-wide uppercase">Community</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Built in the open, with you
            </h2>
            <p className="text-muted-fg mt-3 text-base">
              Open Docs is community driven. Issues, discussions, and pull requests are all welcome
              — first-time contributors especially.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <Reveal key={stat.label} delay={(i % 4) * 0.04}>
                <div className="group border-border from-background to-card hover:shadow-accent/5 relative flex h-full flex-col items-center overflow-hidden rounded-xl border bg-gradient-to-br p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  {/* Gradient accent */}
                  <div className="from-accent/0 to-accent/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="relative">
                    <div className="bg-accent/10 text-accent ring-accent/20 group-hover:bg-accent group-hover:text-accent-fg inline-flex size-11 items-center justify-center rounded-full ring-1 transition-all ring-inset">
                      <Icon className="size-5" />
                    </div>
                    <p className="mt-4 text-lg font-semibold tracking-tight">{stat.value}</p>
                    <p className="text-muted-fg text-sm">{stat.label}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 text-center">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent inline-flex items-center gap-2 text-sm font-medium underline-offset-4 transition-colors hover:underline"
            >
              Explore the repository on GitHub
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
