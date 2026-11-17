import type { Metadata } from 'next'
import { chapters } from '../../../content/about'
import { allCases, casesIn } from '../../../content/site'
import { CaseRow } from '../../components/Cards'

export const metadata: Metadata = { title: 'Work' }

/** Every case, by chapter, newest first. */
export default function Work() {
  return (
    <main className="mx-auto max-w-[1240px] px-6 pt-16 sm:px-10 sm:pt-24">
      <div className="eyebrow">Work</div>
      <h1 className="display mt-5 max-w-[18ch] text-[48px] text-ink sm:text-[68px]">
        {allCases.length} cases across twenty years of design.
      </h1>
      {chapters.map((ch) => {
        const cases = casesIn(ch.id)
        if (!cases.length) return null
        return (
          <section key={ch.id} className="mt-16">
            <h2 className="display flex items-baseline justify-between border-b border-ink pb-3 text-[28px] text-ink">
              {ch.name}
              <span className="text-[14px] text-ink-faint">{ch.span}</span>
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
