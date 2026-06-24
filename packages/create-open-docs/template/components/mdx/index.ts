import type { MDXComponents } from 'mdx/types'

import { Badge } from './badge'
import { Callout } from './callout'
import { Card, Cards } from './cards'
import { CodeBlock } from './code-block'
import { FileTree } from './file-tree'
import { baseMdxComponents } from './mdx-components'
import { Step, Steps } from './steps'
import { Tab, Tabs } from './tabs'

/** Custom documentation components usable directly in MDX (no import needed). */
export const customMdxComponents = {
  Badge,
  Callout,
  Cards,
  Card,
  CodeBlock,
  FileTree,
  Steps,
  Step,
  Tabs,
  Tab,
} satisfies MDXComponents

/**
 * The full MDX component map: base HTML element styling plus the custom
 * documentation components (Callout, Cards, Tabs, Steps, FileTree, Badge, …).
 */
export function getMdxComponents(overrides: MDXComponents = {}): MDXComponents {
  return {
    ...(baseMdxComponents as MDXComponents),
    ...customMdxComponents,
    ...overrides,
  }
}

export {
  Badge,
  Callout,
  Cards,
  Card,
  CodeBlock,
  FileTree,
  Steps,
  Step,
  Tabs,
  Tab,
}
