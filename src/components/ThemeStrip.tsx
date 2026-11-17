'use client'

import { apply, originOf, useHtml, type Pref } from './Customize'
import type { CustomizeTheme } from './customizeData'

/*
 * The token system, shown by using it. Each tile is drawn in its own
 * theme's tokens, so it previews the look before you pick it, and picking it
 * spreads the look across the page from the tile.
 */
export function ThemeStrip({ themes }: { themes: CustomizeTheme[] }) {
  const [themeId, mode, pref] = useHtml()
  return (
    <div>
      <div role="radiogroup" aria-label="Theme" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {themes.map((t) => {
          const m = pref === 'auto' ? (t.defaultMode === 'dark' ? 'dark' : mode) : pref
          const c = t.color[m]
          const on = t.id === themeId
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={(e) => apply(themes, t.id, pref, originOf(e.currentTarget))}
              className={`group flex aspect-[4/5] flex-col justify-between p-4 text-left transition ${on ? 'ring-2 ring-accent ring-offset-2 ring-offset-raised' : 'ring-1 ring-rule hover:-translate-y-0.5'}`}
              style={{ background: c.surface, borderRadius: t.shape.radius }}
            >
              <span
                className="text-[40px] leading-none"
                style={{ color: c.ink, fontWeight: t.type.displayWeight, letterSpacing: t.type.displayTracking }}
              >
                Aa
              </span>
              <span>
                <span className="block h-1.5 w-10 rounded-full" style={{ background: `linear-gradient(90deg, ${c.accent}, ${c.accentAlt})` }} />
                <span className="mt-3 block text-[15px] font-semibold" style={{ color: c.ink }}>
                  {t.name}
                </span>
              </span>
            </button>
          )
        })}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div role="radiogroup" aria-label="Mode" className="inline-flex rounded-full bg-paper p-1 ring-1 ring-rule">
          {(['auto', 'light', 'dark'] as Pref[]).map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={pref === p}
              onClick={(e) => apply(themes, themeId, p, originOf(e.currentTarget))}
              className={`rounded-full px-4 py-1.5 text-[15px] capitalize transition ${pref === p ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'}`}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event('open-customize'))}
          className="text-[16px] text-ink-soft underline underline-offset-4 hover:text-ink"
        >
          See every token
        </button>
      </div>
    </div>
  )
}
