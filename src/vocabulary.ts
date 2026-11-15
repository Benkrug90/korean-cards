import type { Card } from './types'

export function parseVocabulary(value: unknown): Card[] {
  if (!Array.isArray(value) || value.length === 0) throw new Error('Vocabulary must be a non-empty array.')
  const ids = new Set<string>()
  return value.map((item, index) => {
    if (!item || typeof item !== 'object') throw new Error(`Card ${index + 1} is invalid.`)
    const card = item as Record<string, unknown>
    for (const key of ['id', 'korean', 'english', 'example_ko', 'example_en']) if (typeof card[key] !== 'string' || !card[key]) throw new Error(`Card ${index + 1} is missing ${key}.`)
    if (!Array.isArray(card.tags) || card.tags.some(tag => typeof tag !== 'string')) throw new Error(`Card ${index + 1} has invalid tags.`)
    if (ids.has(card.id as string)) throw new Error(`Duplicate vocabulary ID: ${card.id}`)
    ids.add(card.id as string)
    return card as unknown as Card
  })
}

export async function fetchVocabulary(fetcher: typeof fetch = fetch): Promise<Card[]> {
  const response = await fetcher(`${import.meta.env.BASE_URL}vocabulary.json`, { cache: 'no-store' })
  if (!response.ok) throw new Error(`Sync failed (${response.status}).`)
  return parseVocabulary(await response.json())
}
