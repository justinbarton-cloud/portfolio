import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { about } from '../../content/about'
import { validate } from '../../content/validate'
import { SiteNav } from '../components/SiteNav'
import { ThemeScript } from '../components/ThemeScript'
import './globals.css'

// Fails the build, listing every broken reference, before any page renders.
validate()

/*
 * Both faces are self-hosted under the SIL Open Font License, so a build never
 * reaches the network and the portfolio can go public later without a font
 * licence question. Fraunces sets the headlines; Source Sans 3 the reading.
 */
const fraunces = localFont({
  src: './fonts/Fraunces-latin.woff2',
  weight: '300 700',
  display: 'swap',
  variable: '--font-fraunces',
})
const sourceSans = localFont({
  src: './fonts/SourceSans3-latin.woff2',
  weight: '200 900',
  display: 'swap',
  variable: '--font-source-sans',
})

export const metadata: Metadata = {
  title: { default: `${about.name}, design leader`, template: `%s · ${about.name}` },
  description: about.headline,
  robots: { index: false, follow: false },
}

export const viewport: Viewport = { themeColor: '#f3eee5' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSans.variable} antialiased`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-paper text-ink">
        <SiteNav />
        {children}
        <footer className="mx-auto mt-24 max-w-[1240px] border-t border-rule px-6 py-10 text-[14px] text-ink-faint sm:px-10">
          {about.name}, {about.location}.{' '}
          <a href={about.linkedin} className="underline hover:text-ink">
            LinkedIn
          </a>
        </footer>
      </body>
    </html>
  )
}
