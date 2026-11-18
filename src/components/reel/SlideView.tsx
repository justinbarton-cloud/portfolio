'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import type { Slide } from '../../../content/slides'
import { Pic } from '../Pic'
import { Stage } from '../Stage'

/*
 * A slide, laid out once on a 1600 by 900 canvas and scaled to whatever holds
 * it: the full screen, the presenter's previews, or a thumbnail in the
 * sorter. Everything is drawn from the theme's tokens, so a talk changes look
 * with the site.
 */
export const W = 1600
export const H = 900

/** Scales a fixed canvas to fit its box, centred, keeping 16:9. */
export function Fit({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(Math.min(e.contentRect.width / W, e.contentRect.height / H)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={box} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute top-1/2 left-1/2"
        style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})`, visibility: scale ? 'visible' : 'hidden' }}
      >
        {children}
      </div>
    </div>
  )
}

const Eyebrow = ({ children }: { children?: React.ReactNode }) =>
  children ? (
    <p className="kicker" style={{ fontSize: 'calc(var(--label-size) * 1.9)' }}>
      {children}
    </p>
  ) : null

/** One slide at canvas size. `still` turns off anything interactive, for previews. */
export function SlideView({ s, still }: { s: Slide; still?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-paper text-ink" style={{ padding: 96 }}>
      {render(s, still)}
    </div>
  )
}

function render(s: Slide, still?: boolean) {
  switch (s.kind) {
    case 'title':
      return (
        <div className="flex h-full flex-col justify-center">
          <h1 className="display max-w-[14ch] text-[112px] leading-[1.02]">{s.headline}</h1>
          {s.lede ? <p className="mt-10 max-w-[30ch] text-[40px] leading-snug text-ink-soft">{s.lede}</p> : null}
        </div>
      )
    case 'cover':
      return (
        <div className="grid h-full grid-cols-[1fr_auto] items-center gap-16">
          <div>
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h1 className="display mt-6 max-w-[16ch] text-[80px] leading-[1.04]">{s.headline}</h1>
            {s.lede ? <p className="mt-8 max-w-[34ch] text-[32px] leading-snug text-ink-soft">{s.lede}</p> : null}
            {s.meta ? (
              <dl className="mt-12 flex gap-16">
                {s.meta.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[22px] text-ink-faint">{k}</dt>
                    <dd className="mt-1 max-w-[16ch] text-[26px] font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
          {s.picture ? (
            <div className="relative h-[600px] w-[480px] overflow-hidden rounded-[var(--radius)] bg-raised">
              <Pic p={s.picture} sizes={still ? '160px' : '480px'} className="absolute inset-0 h-full object-cover" />
            </div>
          ) : null}
        </div>
      )
    case 'section':
      return (
        <div className="flex h-full flex-col justify-center">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="display mt-6 max-w-[18ch] text-[96px] leading-[1.04]">{s.headline}</h2>
          {s.lede ? <p className="mt-10 max-w-[36ch] text-[38px] leading-snug text-ink-soft">{s.lede}</p> : null}
        </div>
      )
    case 'figure':
      return (
        <div className="absolute inset-[48px] flex flex-col">
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-[var(--radius)] bg-raised">
            {s.picture ? <Pic p={s.picture} sizes={still ? '400px' : '1500px'} className="absolute inset-0 h-full object-contain" /> : null}
          </div>
          {s.lede ? <p className="mt-6 max-w-[60ch] text-[26px] leading-snug text-ink-soft">{s.lede}</p> : null}
        </div>
      )
    case 'list':
    case 'context':
      return (
        <div className="flex h-full flex-col justify-center">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="display mt-4 max-w-[22ch] text-[64px] leading-[1.06]">{s.headline}</h2>
          <ul className={`mt-12 grid gap-x-14 gap-y-8 ${s.points && s.points.length > 3 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {s.points?.map((p, i) => (
              <li key={i} className="border-t-2 border-rule pt-5">
                {p.lead ? <p className="text-[30px] leading-tight font-semibold">{p.lead}</p> : null}
                <p className={`${p.lead ? 'mt-2 text-[22px] text-ink-soft' : 'text-[30px]'} leading-snug`}>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'quote':
      return (
        <div className="flex h-full flex-col justify-center">
          <blockquote className="display max-w-[24ch] text-[60px] leading-[1.15]">&ldquo;{s.quote?.text}&rdquo;</blockquote>
          <p className="mt-10 text-[28px] text-ink-faint">{s.quote?.attribution}</p>
        </div>
      )
    case 'stage':
      return (
        <div className="absolute inset-[40px] flex flex-col justify-center">
          <div className={`mx-auto w-[980px] ${still ? 'pointer-events-none' : ''}`}>
            {s.walkthrough ? <Stage w={s.walkthrough} label={s.headline ?? 'Walkthrough'} /> : null}
          </div>
        </div>
      )
    case 'team':
      return (
        <div className="flex h-full flex-col justify-center">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="display mt-4 text-[72px] leading-[1.05]">{s.headline}</h2>
          <ul className="mt-12 grid grid-cols-2 gap-x-14 gap-y-8">
            {s.team?.map((m) => (
              <li key={m.name} className="border-t-2 border-rule pt-5">
                <p className="text-[30px] font-semibold">
                  {m.name}
                  <span className="font-normal text-ink-faint">, {m.role}</span>
                </p>
                <p className="mt-2 text-[22px] leading-snug text-ink-soft">{m.did}</p>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'impact':
      return (
        <div className="flex h-full flex-col justify-center">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="display mt-4 text-[72px] leading-[1.05]">{s.headline}</h2>
          <ul className="mt-12 space-y-8">
            {s.impact?.map((i, n) => (
              <li key={n} className="max-w-[56ch] border-t-2 border-rule pt-5">
                <p className="text-[32px] leading-snug">{i.text}</p>
                {i.kind === 'measured' ? <p className="mt-2 text-[20px] text-ink-faint">{i.source}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      )
  }
}
