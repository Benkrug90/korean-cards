import { describe, expect, it } from 'vitest'
import { parseVocabulary } from '../src/vocabulary'
const card = { id:'a', korean:'가다', english:'to go', example_ko:'집에 가요.', example_en:'I go home.', tags:['verb'] }
describe('vocabulary parsing', () => { it('accepts valid cards', () => expect(parseVocabulary([card])).toEqual([card])); it('rejects duplicate IDs', () => expect(() => parseVocabulary([card, card])).toThrow('Duplicate')) })
