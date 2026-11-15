import type { Card, QuizQuestion } from './types'

export const shuffle = <T,>(items: T[], random = Math.random) => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]] }
  return copy
}
export function makeQuiz(cards: Card[], random = Math.random): QuizQuestion[] {
  if (cards.length < 4) throw new Error('At least four cards are required for a quiz.')
  return shuffle(cards, random).map(card => {
    const distractors = shuffle(cards.filter(other => other.id !== card.id && other.english !== card.english), random).slice(0, 3)
    return { card, options: shuffle([card.english, ...distractors.map(item => item.english)], random) }
  })
}
