import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { getMdxComponents } from './index'

/** rehype-pretty-code (Shiki) options: dual light/dark themes, transparent bg. */
const prettyCodeOptions = {
  theme: { dark: 'github-dark', light: 'github-light' },
  keepBackground: false,
  defaultLang: 'plaintext',
}

/**
 * Render an MDX source string to React on the server (build time for the static
 * export). Plugins run here in Node, so we pass real plugin functions (unlike
 * the Turbopack `@next/mdx` loader, which needs string names).
 */
export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={getMdxComponents()}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  )
}
