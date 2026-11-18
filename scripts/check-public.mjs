// Fails if the public build in out/ mentions anything that belongs inside
// Toast: internal hosts, Slack, Google Docs, Loom, Figma files. Run after a
// Pages build (npm run build:public does both).
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const banned = [
  /toasttab\.com/i,
  /toast\.slack\.com|slack\.com\/archives/i,
  /docs\.google\.com/i,
  /loom\.com\/share/i,
  /figma\.com\/(file|design|proto|board)/i,
  /share:\s*["']internal["']/,
  /Inside Toast only/,
]
const hits = []
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(html|js|txt|json|css)$/.test(f)) {
      const text = readFileSync(p, 'utf8')
      for (const re of banned) {
        const m = text.match(re)
        if (m) hits.push(`${p}: ${m[0]}`)
      }
    }
  }
}
walk('out')
// Draft pictures copied in by npm run preview must never ship.
for (const d of ['out/media', 'out/drafts']) if (existsSync(d)) hits.push(`${d}: draft preview files. Run npm run preview:clean, then rebuild.`)
if (hits.length) {
  console.error(`The public build would leak ${hits.length} internal reference(s):\n` + hits.join('\n'))
  process.exit(1)
}
console.log('public build clean')
