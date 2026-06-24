/**
 * Shared types for the Open Docs content pipeline.
 *
 * Kept in a dedicated module (excluded from coverage) so both the build-time
 * scripts and the runtime React components import a single source of truth.
 */

/** Frontmatter authors write at the top of each `.mdx` file. */
export interface DocFrontmatter {
  title: string
  description?: string
  /** Hide from navigation/search while keeping the page routable. */
  hidden?: boolean
  /** Manual ordering hint; lower numbers sort first. */
  order?: number
}

/** A heading extracted from MDX, used for the table of contents and search. */
export interface Heading {
  /** Heading level: 2 for `##`, 3 for `###`, etc. */
  depth: number
  /** Visible heading text. */
  text: string
  /** URL-safe slug used as the anchor `id`. */
  id: string
}

/** A nested table-of-contents node (headings grouped by depth). */
export interface TocEntry extends Heading {
  children: TocEntry[]
}

/** A fully loaded documentation page. */
export interface DocPage {
  /** Route segments, e.g. `['guides', 'installation']`. Empty array = docs index. */
  slug: string[]
  /** Joined slug used as a stable key/href, e.g. `guides/installation`. */
  slugPath: string
  /** Absolute-from-content file path, for the "edit this page" link. */
  filePath: string
  frontmatter: DocFrontmatter
  /** Raw MDX body with frontmatter stripped. */
  content: string
  headings: Heading[]
  /** ISO date string of the file's last modification. */
  lastModified: string
}

/** `meta.json` shape controlling folder titles and explicit page ordering. */
export interface FolderMeta {
  /** Display title for the folder in the sidebar. */
  title?: string
  /** Explicit ordering of child slugs/folders by their final path segment. */
  pages?: string[]
}

/** A node in the sidebar navigation tree. */
export interface NavNode {
  title: string
  /** Present for pages; absent for pure folder groupings. */
  href?: string
  slugPath?: string
  children: NavNode[]
}

/** Flattened previous/next neighbours for a page. */
export interface PrevNext {
  prev: { title: string; href: string } | null
  next: { title: string; href: string } | null
}

/** A single searchable record in the static search index. */
export interface SearchRecord {
  /** Unique id: the page's slugPath plus optional heading anchor. */
  id: string
  title: string
  description: string
  /** Page-level href, optionally with `#anchor` for a heading hit. */
  href: string
  /** Breadcrumb-style context, e.g. `Guides › Installation`. */
  section: string
  /** Plain-text content used for fuzzy matching. */
  content: string
}
