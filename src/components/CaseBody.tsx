import type { Block } from '../../content/types'
import { Pic } from './Pic'

/*
 * A case's body, set like an article: a reading column of about 68
 * characters, headings in the display face over a hairline, and figures that
 * break out wider than the text so a screen reads as the work.
 */
export function CaseBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'h':
            return (
              <h2 key={i} className="display mx-auto max-w-[42rem] border-t border-rule pt-10 text-[30px] text-ink first:border-0 first:pt-0 sm:text-[34px]">
                {b.text}
              </h2>
            )
          case 'p':
            return (
              <p key={i} className="mx-auto max-w-[42rem] text-[18px] leading-[1.7] text-ink-soft">
                {b.text}
              </p>
            )
          case 'list':
            return (
              <ol key={i} className={`mx-auto max-w-[42rem] space-y-5 ${b.ordered ? '' : 'list-none'}`}>
                {b.items.map((it, j) => (
                  <li key={j} className="grid grid-cols-[2.25rem_1fr] gap-3">
                    <span className="display accent-text pt-0.5 text-[20px] leading-none text-accent">
                      {b.ordered ? String(j + 1).padStart(2, '0') : '·'}
                    </span>
                    <p className="text-[17px] leading-[1.65] text-ink-soft">
                      {it.lead ? <span className="font-semibold text-ink">{it.lead}. </span> : null}
                      {it.text}
                    </p>
                  </li>
                ))}
              </ol>
            )
          case 'figure':
            return (
              <figure key={i} className="mx-auto max-w-[1000px] py-4">
                <div className="overflow-hidden rounded-[var(--radius)] bg-raised ring-1 ring-rule">
                  <Pic p={b.picture} sizes="(min-width: 1080px) 1000px, 100vw" />
                </div>
                {b.picture.caption ? (
                  <figcaption className="mx-auto mt-3 max-w-[42rem] text-[14px] leading-relaxed text-ink-faint">{b.picture.caption}</figcaption>
                ) : null}
              </figure>
            )
          case 'quote':
            return (
              <blockquote key={i} className="mx-auto max-w-[42rem] border-l-2 border-accent pl-6">
                <p className="display text-[24px] text-ink">&ldquo;{b.text}&rdquo;</p>
                <footer className="mt-3 text-[14px] text-ink-faint">{b.attribution}</footer>
              </blockquote>
            )
        }
      })}
    </div>
  )
}
