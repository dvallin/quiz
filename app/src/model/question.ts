export type difficulty = 1 | 2 | 3 | 4 | 5

export interface Question {
    nr: string,
    bundleId: string
    question: string
    difficulty: difficulty
    answers: string[]
}