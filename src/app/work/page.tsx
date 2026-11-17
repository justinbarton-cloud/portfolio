import type { Metadata } from 'next'
import { chapters } from '../../../content/about'
import { allCases, casesIn } from '../../../content/site'
import { CaseRow } from '../../components/Cards'

export const metadata: Metadata = { title: 'Work' }

/** Every case, by chapter, newest first. */
export default function Work() {
  return (
    <main className="mx-auto max-w-[1240px] px-6 pt-16 sm:px-10 sm:pt-24">
      <p className="kicker">Work</p>
      <h1 className="display mt-4 max-w-[18ch] text-[44px] text-ink sm:text-[64px]">
        {allCases.length} cases across twenty years of design.
      </h1>
      {chapters.map((ch) => {
        const cases = casesIn(ch.id)
        if (!cases.length) return null
        return (
          <section key={ch.id} className="mt-20">
            <h2 className="display flex items-baseline justify-between gap-6 pb-4 text-[28px] text-ink sm:text-[32px]">
              {ch.name}
              <span className="text-[16px] font-normal tracking-normal text-ink-faint">{ch.span}</span>
            </h2>
            {cases.map((c) => (
              <CaseRow key={c.id} c={c} />
            ))}
          </section>
        )
      })}
    </main>
  )
}
