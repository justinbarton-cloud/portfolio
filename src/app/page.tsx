import Link from 'next/link'
import { about, chapters } from '../../content/about'
import { allCases, casesIn, deepCases } from '../../content/site'
import { CaseCard, CaseRow } from '../components/Cards'
import { Pic } from '../components/Pic'

/*
 * The home page reads top down as the argument: who Justin is and what he
 * does, the few cases told in full, then the whole career by chapter, then
 * what people who worked for him say. Until deep cases are chosen, the
 * newest three stand in.
 */
export default function Home() {
  const lead = deepCases.length ? deepCases : allCases.slice(0, 3)
  const quotes = about.testimonials.slice(0, 3)
  return (
    <main>
      <section className="mx-auto grid max-w-[1240px] items-end gap-12 px-6 pt-16 pb-20 sm:px-10 sm:pt-24 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="eyebrow rise">
            Design leader · {about.role}, {about.company}
          </div>
          <h1 className="display rise rise-2 mt-6 max-w-[16ch] text-[52px] leading-[0.98] text-ink sm:text-[76px] lg:text-[92px]">
            {about.headline}
          </h1>
          <p className="rise rise-3 mt-8 max-w-[56ch] text-[19px] leading-relaxed text-ink-soft">{about.intro}</p>
          <div className="rise rise-4 mt-8 flex flex-wrap gap-3 text-[15px]">
            <Link href="/work/" className="rounded-full bg-ink px-5 py-2.5 font-semibold text-paper transition hover:bg-accent hover:text-on-accent">
              See the work
            </Link>
            <Link href="/about/" className="rounded-full px-5 py-2.5 text-ink ring-1 ring-rule transition hover:ring-ink">
              About me
            </Link>
          </div>
        </div>
        <div className="rise rise-3 lg:col-span-4">
          <div className="overflow-hidden rounded-[28px] ring-1 ring-rule">
            <Pic p={about.photo} sizes="(min-width: 1024px) 380px, 80vw" priority />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 sm:px-10">
        <div className="flex items-baseline justify-between border-t border-ink pt-5">
          <h2 className="eyebrow">Selected work</h2>
          <Link href="/work/" className="text-[14px] text-ink-soft underline hover:text-ink">
            All {allCases.length} cases
          </Link>
        </div>
        <div className="mt-10 grid gap-x-10 gap-y-14 lg:grid-cols-12">
          {lead.map((c, i) => (
            <div key={c.id} className={i === 0 ? 'lg:col-span-12' : 'lg:col-span-6'}>
              {i === 0 ? (
                <div className="grid items-end gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <CaseCard c={c} priority wide />
                  </div>
                  <p className="display text-[22px] leading-snug text-ink-soft lg:col-span-4 lg:pb-24">
                    {c.role}, {c.timeframe}.
                  </p>
                </div>
              ) : (
                <CaseCard c={c} />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-[1240px] px-6 sm:px-10">
        <h2 className="eyebrow border-t border-ink pt-5">The career, by chapter</h2>
        {chapters.map((ch, n) => {
          const cases = casesIn(ch.id)
          return (
            <div key={ch.id} className="mt-14 grid gap-x-10 gap-y-6 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="display accent-text text-[15px] text-accent">{String(n + 1).padStart(2, '0')}</div>
                <h3 className="display mt-2 text-[34px] leading-tight text-ink">{ch.name}</h3>
                <p className="mt-2 text-[14px] text-ink-faint">{ch.span}</p>
                <p className="mt-3 max-w-[36ch] text-[16px] leading-relaxed text-ink-soft">{ch.blurb}</p>
              </div>
              <div className="lg:col-span-8">
                {cases.length ? (
                  cases.map((c) => <CaseRow key={c.id} c={c} />)
                ) : (
                  <p className="border-t border-rule py-6 text-[15px] text-ink-faint">Cases from this chapter are on their way.</p>
                )}
              </div>
            </div>
          )
        })}
      </section>

      <section className="mx-auto mt-28 max-w-[1240px] px-6 sm:px-10">
        <div className="flex items-baseline justify-between border-t border-ink pt-5">
          <h2 className="eyebrow">From people I&rsquo;ve led</h2>
          <Link href="/about/#testimonials" className="text-[14px] text-ink-soft underline hover:text-ink">
            All {about.testimonials.length}
          </Link>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.who}>
              <blockquote className="display text-[22px] leading-snug text-ink">&ldquo;{q.text}&rdquo;</blockquote>
              <figcaption className="mt-4 text-[14px] text-ink-faint">
                {q.who}, {q.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  )
}
