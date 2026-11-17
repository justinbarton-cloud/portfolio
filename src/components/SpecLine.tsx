'use client'

import { useSyncExternalStore } from 'react'
import type { Mode } from '../../content/themes'
import type { CustomizeTheme } from './customizeData'

const subscribe = (cb: () => void) => {
  const o = new MutationObserver(cb)
  o.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-mode'] })
  return () => o.disconnect()
}

/**
 * The page labelling its own tokens, the way a spec annotates a frame: the
 * face, weight and tracking the headline above is set in, and the accent it
 * wears, read live, so changing the look changes the label too.
 */
export function SpecLine({ themes }: { themes: CustomizeTheme[] }) {
  const [id, mode] = useSyncExternalStore(
    subscribe,
    () => `${document.documentElement.dataset.theme}|${document.documentElement.dataset.mode}`,
    () => 'studio|light',
  ).split('|') as [string, Mode]
  const t = themes.find((x) => x.id === id) ?? themes[0]
  const c = t.color[mode] ?? t.color.light
  const cells: [string, React.ReactNode][] = [
    ['type.display', `${t.type.display.family} ${t.type.displayWeight}`],
    ['tracking', t.type.displayTracking],
    [
      'color.accent',
      <span key="a" className="inline-flex items-center gap-1.5">
        <span className="size-2.5 rounded-full" style={{ background: c.accent }} />
        {c.accent}
      </span>,
    ],
    ['theme', `${t.name} / ${mode}`],
  ]
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-rule py-3 font-mono text-[12px]">
      {cells.map(([k, v]) => (
        <span key={k} className="flex items-baseline gap-2">
          <span className="text-ink-faint">{k}</span>
          <span key={String(id + mode)} className="token-flash rounded px-1 text-ink">
            {v}
          </span>
        </span>
      ))}
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event('open-customize'))}
        className="ml-auto rounded-full px-3 py-1 text-accent ring-1 ring-rule transition hover:ring-accent"
      >
        Change the look →
      </button>
    </div>
  )
}
