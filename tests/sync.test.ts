import 'fake-indexeddb/auto'
import { describe, expect, it } from 'vitest'
import { loadCached, syncCards } from '../src/sync'
describe('offline fallback', () => it('keeps saved cards when a later sync fails', async () => { const body = [{ id:'saved', korean:'저장', english:'saved', example_ko:'저장해요.', example_en:'Save it.', tags:[] }]; await syncCards(async () => new Response(JSON.stringify(body))); await expect(syncCards(async () => { throw new Error('offline') })).rejects.toThrow('offline'); expect((await loadCached())[0].id).toBe('saved') }))
