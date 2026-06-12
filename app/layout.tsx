import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/globals.css'

const SITE_URL = 'https://shahnawaz-pabon.github.io/open-docs'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Open Docs — Modern open-source documentation template',
    template: '%s · Open Docs',
  },
  description:
    'The most modern, beautiful, AI-friendly open-source documentation template. Next.js, MDX, Tailwind v4. Zero lock-in, MIT licensed.',
  keywords: ['documentation', 'docs template', 'next.js', 'mdx', 'tailwindcss', 'open source'],
  authors: [{ name: 'SHAHNAWAZ HOSSAN' }],
  openGraph: {
    type: 'website',
    siteName: 'Open Docs',
    title: 'Open Docs',
    description: 'The modern, beautiful, AI-friendly open-source documentation template.',
    url: SITE_URL,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Open Docs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Docs',
    description: 'The modern, beautiful, AI-friendly open-source documentation template.',
    images: ['/og.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
