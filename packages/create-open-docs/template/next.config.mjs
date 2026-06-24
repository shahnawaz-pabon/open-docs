import createMDX from '@next/mdx'

/**
 * Open Docs Next.js configuration.
 *
 * The site is built as a fully static export (`output: 'export'`) so it can be
 * hosted anywhere — GitHub Pages, S3, a CDN — with zero server runtime. All
 * dynamic behaviour (search, theme, table of contents) is implemented in the
 * browser.
 *
 * `BASE_PATH` lets the same build deploy under a sub-path (e.g. GitHub Pages
 * project sites served from `/<repo>`). It is read by the GitHub Pages workflow.
 */
const basePath = process.env.BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    // Static export cannot use the Next.js Image Optimization server.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  reactStrictMode: true,
}

// Turbopack (default in Next.js 16) runs the MDX loader in a worker, so plugins
// must be referenced by name (string) rather than by imported function so the
// options object stays serializable.
const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-gfm']],
    rehypePlugins: [['rehype-slug']],
  },
})

export default withMDX(nextConfig)
