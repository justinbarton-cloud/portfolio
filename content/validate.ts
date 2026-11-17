import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { about } from './about'
import { work } from './registry.generated'
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
    c.body?.forEach((b) => b.kind === 'figure' && pic(where, b.picture))
    c.impact?.forEach((i) => i.kind === 'measured' && !i.source && fail(where, 'a measured impact needs its source'))
  }
  pic('content/about.ts photo', about.photo)
  if (problems.length) throw new Error(`Content check failed:\n  ${problems.join('\n  ')}`)
}
