#!/usr/bin/env node
/*
 * House rule: no em or en dashes anywhere in the repo. Restructure the
 * sentence instead of swapping in another dash. validate.ts catches them in
 * page content; this catches them in code, comments and docs too.
 *
 * Two files are exempt. docs/brief.md quotes the rule's own examples, and
 * AGENTS.md is the block `next dev` writes and rewrites, so editing it
 * would only come back.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const skip = new Set(['node_modules', '.next', '.git', '.vercel', 'out', 'public'])
const exempt = new Set(['docs/brief.md', 'AGENTS.md'])
const exts = /\.(ts|tsx|mjs|js|md|css|json|yml)$/
const dash = /[\u2013\u2014]/

const hits = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path)
    else if (exts.test(name) && !exempt.has(relative(root, path))) {
      readFileSync(path, 'utf8')
        .split('\n')
        .forEach((line, i) => dash.test(line) && hits.push(`${relative(root, path)}:${i + 1}: ${line.trim().slice(0, 80)}`))
    }
  }
}
walk(root)

if (hits.length) {
  console.error(`Found ${hits.length} em or en dash${hits.length === 1 ? '' : 'es'}. Restructure the sentence instead:\n  ${hits.join('\n  ')}`)
  process.exit(1)
}
console.log('no dashes')
