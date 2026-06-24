import { Benefits } from '@/components/marketing/benefits'
import { Community } from '@/components/marketing/community'
import { CTA } from '@/components/marketing/cta'
import { Features } from '@/components/marketing/features'
import { Hero } from '@/components/marketing/hero'
import { WhyOpenDocs } from '@/components/marketing/why'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Open Docs',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  description:
    'The most modern, beautiful, AI-friendly open-source documentation template. Next.js, MDX, Tailwind CSS. Zero lock-in, MIT licensed.',
  license: 'https://opensource.org/licenses/MIT',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        // Static, trusted content — safe to inline.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <Features />
        <Benefits />
        <WhyOpenDocs />
        <Community />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  )
}
