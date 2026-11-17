import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { about } from '../../content/about'
import { validate } from '../../content/validate'
import { SiteNav } from '../components/SiteNav'
import { ThemeScript } from '../components/ThemeScript'
import { customizeThemes } from '../components/customizeData'
import './globals.css'

// Fails the build, listing every broken reference, before any page renders.
validate()

/*
 * Body text is always Atkinson Hyperlegible Next, picked for how easily it
 * reads, with its mono for the token names in Customize. Jost, Literata and
 * Martian Mono set headlines in the looks that borrow from a product. All
 * self-hosted under the SIL Open Font License, so a build never reaches the
 * network.
 */
const atkinson = localFont({
  src: [
    { path: './fonts/AtkinsonHyperlegibleNext-latin.woff2', style: 'normal', weight: '200 800' },
    { path: './fonts/AtkinsonHyperlegibleNext-italic-latin.woff2', style: 'italic', weight: '200 800' },
  ],
  display: 'swap',
  variable: '--ff-sans',
})
const atkinsonMono = localFont({ src: './fonts/AtkinsonHyperlegibleMono-latin.woff2', weight: '400 600', display: 'swap', variable: '--ff-mono' })
/* Headline faces for the looks that borrow from a product. Body text never uses them. */
const jost = localFont({ src: './fonts/Jost-latin.woff2', weight: '300 700', display: 'swap', variable: '--ff-jost' })
const literata = localFont({ src: './fonts/Literata-latin.woff2', weight: '300 800', display: 'swap', variable: '--ff-literata' })
const martian = localFont({ src: './fonts/MartianMono-latin.woff2', weight: '300 700', display: 'swap', variable: '--ff-martian' })
const fonts = [atkinson, atkinsonMono, jost, literata, martian].map((f) => f.variable).join(' ')

export const metadata: Metadata = {
  title: { default: `${about.name}, design leader`, template: `%s · ${about.name}` },
  description: about.headline,
  robots: { index: false, follow: false },
}

export const viewport: Viewport = { themeColor: '#f1f0eb' }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${fonts} antialiased`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen text-ink">
        <div aria-hidden className="motif">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <SiteNav themes={customizeThemes()} />
        {children}
        <footer className="mx-auto mt-32 max-w-[1240px] px-6 text-[16px] text-ink-faint sm:px-10">
          <div className="border-t border-rule py-10">
          {about.name}, {about.location}.{' '}
          <a href={about.linkedin} className="underline hover:text-ink">
            LinkedIn
          </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
