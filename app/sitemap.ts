import type { MetadataRoute } from 'next'

import { getAllDocs } from '@/lib/content'
import { docHref } from '@/lib/slug'

const SITE_URL = 'https://shahnawaz-pabon.github.io/open-docs'

// Emit a static sitemap.xml for `output: export`.
export const dynamic = 'force-static'

/**
 * Static sitemap covering the homepage and every doc page. Generated at build
 * time, so it's emitted as `sitemap.xml` in the static export.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const docs = getAllDocs()
    .filter((doc) => !doc.frontmatter.hidden)
    .map((doc) => ({
      url: `${SITE_URL}${docHref(doc.slugPath)}`,
      lastModified: doc.lastModified,
      changeFrequency: 'weekly' as const,
      priority: doc.slug.length === 0 ? 0.9 : 0.7,
    }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...docs,
  ]
}
