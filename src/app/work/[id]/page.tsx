import type { Metadata } from 'next'
import Link from 'next/link'
import { allCases, caseById, nextCase, tagLabels } from '../../../../content/site'
import { CaseBody } from '../../../components/CaseBody'
import { Pic } from '../../../components/Pic'

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
        <div className="eyebrow rise">
          {c.company} · {c.tags.map((t) => tagLabels[t]).join(', ')}
        </div>
        <h1 className="display rise rise-2 mt-5 max-w-[20ch] text-[46px] text-ink sm:text-[68px] lg:text-[80px]">
          {c.title}
        </h1>
        <p className="rise rise-3 mt-7 max-w-[60ch] text-[20px] leading-relaxed text-ink-soft">{c.summary}</p>
        <dl className="rise rise-4 mt-10 grid max-w-[760px] grid-cols-2 gap-6 border-t border-rule pt-6 sm:grid-cols-3">
          {[
            ['My role', c.role],
            ['Timeline', c.timeframe],
            ['Company', c.company],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[12px] font-semibold tracking-[0.12em] text-ink-faint uppercase">{k}</dt>
              <dd className="mt-1.5 text-[16px] text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {c.cover ? (
        <div className="mx-auto mt-14 max-w-[1240px] px-6 sm:px-10">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius)] ring-1 ring-rule">
            <Pic p={c.cover} sizes="(min-width: 1240px) 1160px, 100vw" priority className="absolute inset-0 h-full object-cover" />
          </div>
        </div>
      ) : null}

      <article className="mx-auto mt-16 max-w-[1240px] px-6 sm:px-10">
        {c.body ? <CaseBody blocks={c.body} /> : null}
        {c.source ? (
          <p className="mx-auto mt-12 max-w-[42rem] text-[14px] text-ink-faint">
            First published on <a href={c.source} className="underline hover:text-ink">my Webflow site</a>.
          </p>
        ) : null}
      </article>

      <nav className="mx-auto mt-24 max-w-[1240px] px-6 sm:px-10">
        <Link href={`/work/${next.id}/`} className="group block border-t border-ink pt-6">
          <div className="eyebrow">Next case</div>
          <div className="display mt-3 text-[34px] text-ink transition group-hover:text-accent sm:text-[44px]">
            {next.title} →
          </div>
        </Link>
      </nav>
    </main>
  )
}
