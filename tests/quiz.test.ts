import { describe, expect, it } from 'vitest'
import { makeQuiz } from '../src/quiz'
const cards = ['a','b','c','d'].map((id,i) => ({ id, korean:id, english:`meaning ${i}`, example_ko:'x', example_en:'x', tags:[] }))
describe('quiz generation', () => it('has four unique options including the answer', () => makeQuiz(cards).forEach(question => { expect(new Set(question.options).size).toBe(4); expect(question.options).toContain(question.card.english) })))
