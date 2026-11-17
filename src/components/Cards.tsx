import Link from 'next/link'
import { tagLabels } from '../../content/site'
import type { Case } from '../../content/types'
import { Pic } from './Pic'

const href = (c: Case) => `/work/${c.id}/`

/** A case told big: its picture, then what it was and why it mattered. */
export function CaseCard({ c, priority, wide }: { c: Case; priority?: boolean; wide?: boolean }) {
  return (
    <Link href={href(c)} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] bg-raised ring-1 ring-rule">
        {c.cover ? (
          <Pic
            p={c.cover}
            sizes={wide ? '(min-width: 1024px) 760px, 100vw' : '(min-width: 1024px) 460px, 100vw'}
            priority={priority}
            className="absolute inset-0 h-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="mt-5 text-[12.5px] font-semibold tracking-[0.12em] text-ink-faint uppercase">
        {c.company} · {tagLabels[c.tags[0]]}
      </div>
      <h3 className={`display mt-2 text-ink transition group-hover:text-accent ${wide ? 'text-[34px] sm:text-[40px]' : 'text-[26px]'}`}>
        {c.title}
      </h3>
      <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-ink-soft">{c.summary}</p>
    </Link>
  )
}

/** A case in the index: one row, readable in a glance. */
export function CaseRow({ c }: { c: Case }) {
  return (
    <Link href={href(c)} className="group grid grid-cols-[96px_1fr] gap-5 border-t border-rule py-6 sm:grid-cols-[180px_1fr_auto] sm:gap-8">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(var(--radius)*0.6)] bg-raised ring-1 ring-rule">
        {c.cover ? <Pic p={c.cover} sizes="180px" className="absolute inset-0 h-full object-cover" /> : null}
      </div>
      <div className="min-w-0">
        <h3 className="display text-[22px] text-ink transition group-hover:text-accent sm:text-[24px]">{c.title}</h3>
        <p className="mt-1.5 line-clamp-2 max-w-[70ch] text-[15px] leading-relaxed text-ink-soft">{c.summary}</p>
        <div className="mt-2 flex flex-wrap gap-x-3 text-[12.5px] text-ink-faint">
          {c.tags.map((t) => (
            <span key={t}>{tagLabels[t]}</span>
          ))}
          {c.share === 'internal' ? <span className="text-accent">Inside Toast only</span> : null}
        </div>
      </div>
      <div className="hidden text-[13px] whitespace-nowrap text-ink-faint sm:block">{c.timeframe}</div>
    </Link>
  )
}
