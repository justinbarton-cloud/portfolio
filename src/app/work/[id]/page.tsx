import type { Metadata } from 'next'
import Link from 'next/link'
import { allCases, caseById, nextCase, tagLabels } from '../../../../content/site'
import { CaseBody } from '../../../components/CaseBody'
import { Pic } from '../../../components/Pic'
import { Stage } from '../../../components/Stage'

export const dynamicParams = false
export const generateStaticParams = () => allCases.map((c) => ({ id: c.id }))

export async function generateMetadata({ params }: PageProps<'/work/[id]'>): Promise<Metadata> {
  const { id } = await params
  return { title: caseById[id].title, description: caseById[id].summary }
}

/** One case, told in full: the claim and the facts first, then the story. */
export default async function CasePage({ params }: PageProps<'/work/[id]'>) {
  const { id } = await params
  const c = caseById[id]
  const next = nextCase(id)
  return (
    <main className="pt-16 sm:pt-24">
      <header className="mx-auto max-w-[1240px] px-6 sm:px-10">
        <p className="kicker rise">
          {c.share !== 'public' ? 'Draft, not public · ' : ''}
          {c.tags.map((t) => tagLabels[t]).join(', ')}
        </p>
        <h1 className="display rise rise-2 mt-4 max-w-[20ch] text-[40px] text-ink sm:text-[56px] lg:text-[68px]">
          {c.title}
        </h1>
        <p className="rise rise-3 mt-6 max-w-[38em] text-[21px] leading-relaxed text-ink-soft">{c.summary}</p>
        <dl className="rise rise-4 mt-10 grid max-w-[760px] grid-cols-2 gap-6 sm:grid-cols-3">
          {[
            ['My role', c.role],
            ['Timeline', c.timeframe],
            ['Company', c.company],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[15px] text-ink-faint">{k}</dt>
              <dd className="mt-1 text-[17px] font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {c.walkthrough ? (
        <div className="mx-auto mt-14 max-w-[1240px] px-6 sm:px-10">
          <Stage w={c.walkthrough} label={c.title} />
        </div>
      ) : c.cover ? (
        <div className="mx-auto mt-14 max-w-[1240px] px-6 sm:px-10">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius)]">
            <Pic p={c.cover} sizes="(min-width: 1240px) 1160px, 100vw" priority className="absolute inset-0 h-full object-cover" />
          </div>
        </div>
      ) : null}

      <article className="mx-auto mt-16 max-w-[1240px] px-6 sm:px-10">
        {c.body ? <CaseBody blocks={c.body} /> : null}
        {c.team?.length ? (
          <section className="mx-auto mt-16 max-w-[40rem]">
            <h2 className="display text-[28px] text-ink sm:text-[32px]">The team</h2>
            <ul className="mt-6">
              {c.team.map((m) => (
                <li key={m.name} className="border-t border-rule py-4">
                  <p className="text-[18px] text-ink">
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-ink-faint">, {m.role}</span>
                  </p>
                  <p className="mt-1 text-[17px] leading-relaxed text-ink-soft">{m.did}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {c.source ? (
          <p className="mx-auto mt-12 max-w-[40rem] text-[15px] text-ink-faint">
            First published on <a href={c.source} className="underline hover:text-ink">my Webflow site</a>.
          </p>
        ) : null}
      </article>

      <nav className="mx-auto mt-24 max-w-[1240px] px-6 sm:px-10">
        <Link href={`/work/${next.id}/`} className="group block border-t border-rule pt-8">
          <p className="kicker">Next case</p>
          <div className="display mt-3 text-[32px] text-ink transition group-hover:text-accent sm:text-[40px]">
            {next.title} →
          </div>
        </Link>
      </nav>
    </main>
  )
}
