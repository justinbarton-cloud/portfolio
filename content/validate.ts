import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { about } from './about'
import { work } from './registry.generated'
import { contrastProblems } from './themes'
import type { Picture } from './types'

/**
 * The build's content check. Every failure is collected, then thrown at once,
 * each naming the file and what's wrong.
 */
export function validate() {
  const problems: string[] = []
  const fail = (where: string, what: string) => problems.push(`${where}: ${what}`)
  const pic = (where: string, p?: Picture) => {
    if (!p) return
    if (!existsSync(join(process.cwd(), 'public', p.src))) fail(where, `${p.src} is not in public/`)
    if (!p.w || !p.h) fail(where, `${p.src} needs its width and height`)
  }
  const ids = new Set<string>()
  for (const { file, work: c } of work) {
    const where = `content/work/${file}.ts`
    if (c.id !== file) fail(where, `id "${c.id}" must match its file name`)
    if (ids.has(c.id)) fail(where, `id "${c.id}" is used twice`)
    ids.add(c.id)
    if (!/^\d{4}-\d{2}$/.test(c.date)) fail(where, 'date must be YYYY-MM')
    if (c.summary.split(/\s+/).length > 45) fail(where, 'summary is over 45 words. Keep it to one line')
    pic(where, c.cover)
    c.walkthrough?.steps.forEach((st, i) => {
      pic(`${where} walkthrough step ${i + 1}`, st.screen)
      const h = st.hotspot
      if (h && (h.x < 0 || h.y < 0 || h.x + h.w > 100 || h.y + h.h > 100))
        fail(where, `walkthrough step ${i + 1}'s hotspot runs off the screen`)
      if (!h && i < c.walkthrough!.steps.length - 1) fail(where, `walkthrough step ${i + 1} needs a hotspot to reach the next step`)
    })
    c.body?.forEach((b) => b.kind === 'figure' && pic(where, b.picture))
    c.impact?.forEach((i) => i.kind === 'measured' && !i.source && fail(where, 'a measured impact needs its source'))
  }
  pic('content/about.ts photo', about.photo)
  contrastProblems().forEach((p) => fail('content/themes.ts', p))
  if (problems.length) throw new Error(`Content check failed:\n  ${problems.join('\n  ')}`)
}
