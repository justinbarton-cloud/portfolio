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
 * Five faces, all self-hosted under the SIL Open Font License, so a build
 * never reaches the network and the site can be public. Each theme picks its
 * display and body face from these through the --font-display and
 * --font-body tokens; JetBrains Mono sets the token names in Customize.
 */
const bricolage = localFont({ src: './fonts/BricolageGrotesque-latin.woff2', weight: '200 800', display: 'swap', variable: '--ff-bricolage' })
const instrumentSans = localFont({ src: './fonts/InstrumentSans-latin.woff2', weight: '400 700', display: 'swap', variable: '--ff-instrument-sans' })
const instrumentSerif = localFont({
  src: [
    { path: './fonts/InstrumentSerif-latin.woff2', style: 'normal', weight: '400' },
    { path: './fonts/InstrumentSerif-italic-latin.woff2', style: 'italic', weight: '400' },
  ],
  display: 'swap',
  variable: '--ff-instrument-serif',
})
const youngSerif = localFont({ src: './fonts/YoungSerif-latin.woff2', weight: '400', display: 'swap', variable: '--ff-young-serif' })
const jetbrains = localFont({ src: './fonts/JetBrainsMono-latin.woff2', weight: '400 700', display: 'swap', variable: '--ff-mono' })
const fonts = [bricolage, instrumentSans, instrumentSerif, youngSerif, jetbrains].map((f) => f.variable).join(' ')

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
      <body className="min-h-screen bg-paper text-ink">
        <div aria-hidden className="motif">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <SiteNav themes={customizeThemes()} />
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
