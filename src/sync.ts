import { cachedCards, saveCards, setMeta } from './storage'
import { fetchVocabulary } from './vocabulary'
import type { Card } from './types'

export async function loadCached(): Promise<Card[]> { return (await cachedCards()) ?? [] }
export async function syncCards(fetcher: typeof fetch = fetch): Promise<Card[]> {
  const cards = await fetchVocabulary(fetcher)
  await saveCards(cards)
  await setMeta('lastSync', new Date().toISOString())
  await setMeta('syncError', '')
  return cards
}
