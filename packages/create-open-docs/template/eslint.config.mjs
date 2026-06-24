import next from 'eslint-config-next/core-web-vitals'
import tseslint from 'eslint-config-next/typescript'

/**
 * Flat ESLint config. `next lint` was removed in Next.js 16, so we invoke the
 * ESLint CLI directly (`eslint .`). `eslint-config-next` ships native flat
 * config arrays, which we spread in here.
 */
const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'coverage/**',
      'next-env.d.ts',
      'packages/create-open-docs/template/**',
    ],
  },
  ...next,
  ...tseslint,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
]

export default eslintConfig
