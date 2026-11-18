import type { Metadata } from 'next'
import Link from 'next/link'
import { allReels } from '../../../content/site'

export const metadata: Metadata = { title: 'Reels', robots: { index: false, follow: false } }

/** Every talk the site can give: saved reels first, then one per case. */
export default function Reels() {
  const saved = allReels.filter((r) => !r.fromCase)
  const cases = allReels.filter((r) => r.fromCase)
  const row = (r: (typeof allReels)[number]) => (
    <li key={r.id} className="flex items-baseline justify-between gap-6 border-t border-rule py-4">
      <Link href={`/reel/${r.id}/`} className="text-[19px] text-ink underline decoration-rule underline-offset-4 hover:decoration-accent">
        {r.title}
      </Link>
      <span className="shrink-0 text-[15px] text-ink-faint">{r.slides.length} slides</span>
    </li>
  )
  return (
    <main className="mx-auto max-w-[1240px] px-6 pt-16 sm:px-10 sm:pt-24">
      <p className="kicker">Reels</p>
      <h1 className="display mt-4 max-w-[18ch] text-[44px] text-ink sm:text-[60px]">Every case is also a talk.</h1>
      <p className="mt-6 max-w-[38em] text-[20px] leading-relaxed text-ink-soft">
        Each one plays full screen, with a presenter view that shows the notes, the next slide and a timer. Press P in a reel to open it.
      </p>
      <Link href="/reel/sort/" className="press mt-8 inline-flex rounded-full bg-action px-6 py-3 text-[16px] font-semibold text-on-action">
        Build a reel
      </Link>
      {saved.length ? (
        <section className="mt-16">
          <h2 className="display text-[28px] text-ink">Saved reels</h2>
          <ul className="mt-6">{saved.map(row)}</ul>
        </section>
      ) : null}
      <section className="mt-16">
        <h2 className="display text-[28px] text-ink">One per case</h2>
        <ul className="mt-6">{cases.map(row)}</ul>
      </section>
    </main>
  )
}
