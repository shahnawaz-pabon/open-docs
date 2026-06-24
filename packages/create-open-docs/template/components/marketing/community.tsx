import { GitPullRequest, Heart, MessageCircle, Users } from 'lucide-react'

import { Reveal } from './reveal'

const REPO_URL = 'https://github.com/shahnawaz-pabon/open-docs'

const STATS = [
  { icon: Heart, label: 'MIT licensed', value: 'Free forever' },
  { icon: GitPullRequest, label: 'Contributions', value: 'Welcome' },
  { icon: Users, label: 'Community', value: 'Driven' },
  { icon: MessageCircle, label: 'Discussions', value: 'Open' },
]

/** Community section — invitation to contribute and engage. */
export function Community() {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built in the open, with you
            </h2>
            <p className="mt-4 text-lg text-muted-fg">
              Open Docs is community driven. Issues, discussions, and pull
              requests are all welcome — first-time contributors especially.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <Reveal key={stat.label} delay={(i % 4) * 0.05}>
                <div className="flex h-full flex-col items-center rounded-xl border border-border bg-background p-6 text-center">
                  <Icon className="size-6 text-accent" />
                  <p className="mt-3 text-lg font-semibold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-fg">{stat.label}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 text-center">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              Explore the repository on GitHub →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
