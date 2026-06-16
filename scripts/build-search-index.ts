/**
 * Build-time search index generator.
 *
 * Loads the docs content tree, builds a flat list of searchable records
 * (page-level + per-heading) and writes them to `public/search-index.json`.
 * The browser fetches this file once and queries it client-side with Fuse.js —
 * no server required, so search works on static hosts like GitHub Pages.
 *
 * Run automatically via the `prebuild` script; also runnable directly with
 * `pnpm build:index`.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { getAllDocs } from '../lib/content'
import { buildSearchIndex } from '../lib/search'

async function main() {
  const docs = getAllDocs()
  const index = buildSearchIndex(docs)

  const outPath = join(process.cwd(), 'public', 'search-index.json')
  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, JSON.stringify(index))

  console.log(
    `[search] indexed ${docs.length} pages → ${index.length} records → ${outPath}`,
  )
}

main().catch((error) => {
  console.error('[search] failed to build index', error)
  process.exit(1)
})
