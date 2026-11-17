import Link from 'next/link'
import { about } from '../../content/about'
import { allCases, deepCases } from '../../content/site'
import { CaseCard } from '../components/Cards'
import { Pic } from '../components/Pic'
import { ThemeStrip } from '../components/ThemeStrip'
import { customizeThemes } from '../components/customizeData'

/*
 * The home page answers a reader's questions in the order they ask them:
 * who is this, what has he done, how does he work, where has he been, and
 * what do the people he led say. One idea per section, and space between
 * them rather than rules. Until deep cases are chosen, the newest three
 * stand in.
 */
export default function Home() {
  const lead = deepCases.length ? deepCases.slice(0, 3) : allCases.slice(0, 3)
  const quotes = about.testimonials.slice(0, 2)
  return (
    <main>
      <section className="mx-auto grid max-w-[1240px] items-center gap-12 px-6 pt-16 sm:px-10 sm:pt-24 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="kicker rise">
            {about.role} at {about.company}
          </p>
          <h1 className="display hero-display rise rise-2 mt-5 text-ink">{about.headline}</h1>
          <p className="rise rise-3 mt-8 max-w-[34em] text-[20px] leading-relaxed text-ink-soft">{about.intro}</p>
          <Link
            href="/work/"
            className="rise rise-4 mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[16px] font-semibold text-paper transition hover:bg-accent hover:text-on-accent"
          >
            See the work <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="rise rise-3 max-w-[360px] lg:col-span-4 lg:col-start-9 lg:justify-self-end">
          <div className="overflow-hidden rounded-[var(--radius)]">
            <Pic p={about.photo} sizes="(min-width: 1024px) 360px, 70vw" priority />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1240px] px-6 sm:px-10">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="display text-[32px] text-ink sm:text-[40px]">Selected work</h2>
          <Link href="/work/" className="text-[16px] whitespace-nowrap text-ink-soft underline hover:text-ink">
            All {allCases.length} cases
          </Link>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {lead.map((c, i) => (
            <CaseCard key={c.id} c={c} priority={i === 0} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1240px] px-6 sm:px-10">
        <div className="rounded-[var(--radius)] bg-raised px-6 py-12 sm:px-12 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h2 className="display text-[32px] text-ink sm:text-[40px]">This site runs on design tokens.</h2>
              <p className="mt-5 text-[18px] leading-relaxed text-ink-soft">
                I built it the way I&rsquo;d build a product. Every page asks for its color, weight, corners and motion
                by name, and each theme answers differently, in light and in dark. Pick one. The whole site follows.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ThemeStrip themes={customizeThemes()} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1240px] px-6 sm:px-10">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="display text-[32px] text-ink sm:text-[40px]">Experience</h2>
          <Link href="/about/" className="text-[16px] whitespace-nowrap text-ink-soft underline hover:text-ink">
            About me
          </Link>
        </div>
        <ol className="mt-8">
          {about.experience.map((e) => (
            <li
              key={e.company + e.title}
              className="grid gap-1 border-t border-rule py-5 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_8rem] sm:gap-8"
            >
              <span className="text-[18px] font-semibold text-ink">{e.company}</span>
              <span className="text-[17px] text-ink-soft">{e.title}</span>
              <span className="text-[16px] text-ink-faint sm:text-right">{e.years}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-32 max-w-[1240px] px-6 sm:px-10">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="display text-[32px] text-ink sm:text-[40px]">From people I&rsquo;ve led</h2>
          <Link href="/about/#testimonials" className="text-[16px] whitespace-nowrap text-ink-soft underline hover:text-ink">
            All {about.testimonials.length}
          </Link>
        </div>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          {quotes.map((q) => (
            <figure key={q.who}>
              <blockquote className="text-[22px] leading-[1.5] text-ink sm:text-[24px]">&ldquo;{q.text}&rdquo;</blockquote>
              <figcaption className="mt-5 text-[16px] text-ink-faint">
                {q.who}, {q.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  )
}
