import type { MetadataRoute } from 'next'

const SITE_URL = 'https://shahnawaz-pabon.github.io/open-docs'

// Emit a static robots.txt for `output: export`.
export const dynamic = 'force-static'

/** Allow all crawlers and point them at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
