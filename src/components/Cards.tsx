import Link from 'next/link'
import type { Case } from '../../content/types'
import { Pic } from './Pic'

const href = (c: Case) => `/work/${c.id}/`

/** A case on the home page: its picture, where it happened, and the claim. */
export function CaseCard({ c, priority }: { c: Case; priority?: boolean }) {
  return (
    <Link href={href(c)} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-raised">
        {c.cover ? (
          <Pic
            p={c.cover}
            sizes="(min-width: 768px) 400px, 100vw"
            priority={priority}
            className="absolute inset-0 h-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <p className="mt-5 text-[15px] text-ink-faint">{c.company}</p>
      <h3 className="display mt-1 text-[24px] text-ink transition group-hover:text-accent">{c.title}</h3>
      <p className="mt-3 line-clamp-3 text-[17px] leading-relaxed text-ink-soft">{c.summary}</p>
    </Link>
  )
}

/** A case in the index: one row, readable in a glance. */
export function CaseRow({ c }: { c: Case }) {
  return (
    <Link href={href(c)} className="group grid grid-cols-[88px_1fr] items-start gap-5 border-t border-rule py-7 sm:grid-cols-[200px_1fr_auto] sm:gap-10">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius)*0.6)] bg-raised">
        {c.cover ? <Pic p={c.cover} sizes="200px" className="absolute inset-0 h-full object-cover" /> : null}
      </div>
      <div className="min-w-0">
        <h3 className="display text-[22px] text-ink transition group-hover:text-accent sm:text-[26px]">{c.title}</h3>
        <p className="mt-2 line-clamp-2 max-w-[60ch] text-[17px] leading-relaxed text-ink-soft">{c.summary}</p>
      </div>
      <div className="hidden pt-1.5 text-[15px] whitespace-nowrap text-ink-faint sm:block">{c.timeframe}</div>
    </Link>
  )
}
