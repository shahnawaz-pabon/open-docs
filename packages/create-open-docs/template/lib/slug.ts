/**
 * Slug helpers — pure string utilities with no I/O, shared by heading
 * extraction, navigation, and routing.
 */

/**
 * Convert arbitrary text into a URL-safe slug.
 *
 * - lower-cased
 * - accents/diacritics stripped
 * - non-alphanumeric runs collapsed to a single hyphen
 * - leading/trailing hyphens trimmed
 *
 * @example
 * slugify('Hello, World!')        // 'hello-world'
 * slugify('  Café  & Crème  ')    // 'cafe-creme'
 */
export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip combining diacritical marks
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Split a slug path string into route segments, dropping empty parts.
 *
 * @example
 * splitSlug('/guides/installation/') // ['guides', 'installation']
 * splitSlug('')                       // []
 */
export function splitSlug(slugPath: string): string[] {
  return slugPath.split('/').filter(Boolean)
}

/**
 * Join route segments into a normalised slug path (no leading/trailing slash).
 *
 * @example
 * joinSlug(['guides', 'installation']) // 'guides/installation'
 * joinSlug([])                          // ''
 */
export function joinSlug(segments: string[]): string {
  return segments.filter(Boolean).join('/')
}

/**
 * Build the public href for a docs slug path.
 *
 * @example
 * docHref('')                    // '/docs'
 * docHref('guides/installation') // '/docs/guides/installation'
 */
export function docHref(slugPath: string): string {
  return slugPath ? `/docs/${slugPath}` : '/docs'
}

/**
 * Turn a file or folder name into a human-readable title as a fallback when no
 * explicit `title` is provided.
 *
 * @example
 * humanizeSegment('getting-started') // 'Getting Started'
 * humanizeSegment('api_reference')   // 'Api Reference'
 */
export function humanizeSegment(segment: string): string {
  return segment
    .replace(/\.mdx?$/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
