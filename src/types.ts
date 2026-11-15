export type Card = { id: string; korean: string; english: string; example_ko: string; example_en: string; tags: string[] }
export type QuizQuestion = { card: Card; options: string[] }
