import { openDB } from 'idb'
import type { Card } from './types'

const db = () => openDB('korean-cards', 1, { upgrade(database) { database.createObjectStore('state') } })
export async function cachedCards() { return ((await db()).get('state', 'cards') as Promise<Card[] | undefined>) }
export async function saveCards(cards: Card[]) { await (await db()).put('state', cards, 'cards') }
export async function getMeta<T>(key: string) { return (await db()).get('state', key) as Promise<T | undefined> }
export async function setMeta(key: string, value: unknown) { await (await db()).put('state', value, key) }
