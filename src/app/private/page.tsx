import type { Metadata } from 'next'
import { Vault } from '../../components/vault/Vault'

export const metadata: Metadata = { title: 'Private work', robots: { index: false, follow: false } }

/** Toast work sealed with a password. Everything readable happens in the browser. */
export default function Private() {
  return <Vault />
}
