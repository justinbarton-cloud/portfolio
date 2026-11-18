// Seals the private work: reads the cases marked share: 'protected' in the
// private drafts repo (on Toast's GitHub Enterprise), encrypts each case and
// each of its pictures with the vault password, and writes only ciphertext
// into public/vault/. The public repo and site never hold a readable word of
// it, not even a title.
//
//   npm run seal                       (asks for the password twice)
//   DRAFTS=../portfolio-drafts npm run seal
//
// Encryption: PBKDF2 with SHA-256 stretches the password into an AES-256-GCM
// key, so every guess costs 600,000 rounds. Each file is a fresh 12 byte IV
// followed by the ciphertext. src/components/vault/crypto.ts reads the same
// format in the browser; change both together.
import { createInterface } from 'node:readline'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const ITER = 600_000
const subtle = globalThis.crypto.subtle
const drafts = resolve(process.env.DRAFTS ?? '../portfolio-drafts')
const out = resolve('public/vault')
const die = (m) => {
  console.error(m)
  process.exit(1)
}

if (!existsSync(join(drafts, 'cases'))) die(`No drafts repo at ${drafts}. Clone justinbarton-toast/portfolio-drafts there, or set DRAFTS.`)

const ask = (q) =>
  new Promise((res) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    rl._writeToOutput = (s) => s.startsWith(q) && process.stdout.write(s)
    rl.question(q, (a) => {
      rl.close()
      process.stdout.write('\n')
      res(a)
    })
  })
let pw = process.env.VAULT_PASSWORD
if (!pw) {
  pw = await ask('Vault password: ')
  if ((await ask('Again: ')) !== pw) die('The two passwords differ. Nothing was sealed.')
}
if (pw.length < 12) die('Use a passphrase of at least 12 characters, like four random words.')

// Load the protected cases. Node strips the TypeScript types itself.
const cases = []
for (const f of readdirSync(join(drafts, 'cases')).filter((f) => f.endsWith('.ts'))) {
  const c = (await import(pathToFileURL(join(drafts, 'cases', f)).href)).default
  if (c?.share === 'protected') cases.push(c)
}

// Refuse to seal a customer's name or a dash, wherever it hides.
const deny = existsSync(join(drafts, 'deny.txt'))
  ? readFileSync(join(drafts, 'deny.txt'), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
  : []
for (const c of cases) {
  const text = JSON.stringify(c)
  for (const d of deny) if (text.toLowerCase().includes(d.toLowerCase())) die(`cases/${c.id}.ts mentions "${d}", which deny.txt keeps out. Nothing was sealed.`)
  if (/[\u2013\u2014]/.test(text)) die(`cases/${c.id}.ts has an em or en dash. Nothing was sealed.`)
}

const salt = globalThis.crypto.getRandomValues(new Uint8Array(16))
const base = await subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey'])
const key = await subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt'])
const name = () => Buffer.from(globalThis.crypto.getRandomValues(new Uint8Array(9))).toString('base64url')
const seal = async (bytes) => {
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12))
  const ct = new Uint8Array(await subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes))
  const file = `${name()}.bin`
  writeFileSync(join(out, file), Buffer.concat([iv, ct]))
  return file
}

rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif' }
const sealPic = async (c, p) => {
  if (!p) return p
  const path = join(drafts, p.src)
  if (!existsSync(path)) die(`cases/${c.id}.ts: ${p.src} isn't in the drafts repo.`)
  const mime = MIME[extname(path).toLowerCase()]
  if (!mime) die(`cases/${c.id}.ts: ${p.src} isn't a picture the vault can show.`)
  return { ...p, src: `vault:${await seal(readFileSync(path))}:${mime}` }
}

const manifest = { sealed: new Date().toISOString().slice(0, 10), cases: [] }
for (const c of cases) {
  const sealed = { ...c, cover: await sealPic(c, c.cover) }
  if (c.body) sealed.body = await Promise.all(c.body.map(async (b) => (b.kind === 'figure' ? { ...b, picture: await sealPic(c, b.picture) } : b)))
  if (c.walkthrough)
    sealed.walkthrough = {
      ...c.walkthrough,
      steps: await Promise.all(c.walkthrough.steps.map(async (s) => ({ ...s, screen: await sealPic(c, s.screen) }))),
    }
  const file = await seal(new TextEncoder().encode(JSON.stringify(sealed)))
  manifest.cases.push({ id: c.id, title: c.title, summary: c.summary, company: c.company, timeframe: c.timeframe, cover: sealed.cover, file })
}
const m = await seal(new TextEncoder().encode(JSON.stringify(manifest)))
writeFileSync(join(out, 'vault.json'), JSON.stringify({ v: 1, iter: ITER, salt: Buffer.from(salt).toString('base64'), manifest: m }))
console.log(`Sealed ${cases.length} case${cases.length === 1 ? '' : 's'} into public/vault/. Commit it and push to publish.`)
