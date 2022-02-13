import { difficulty } from "./difficulty";

export interface Question {
  nr: string;
  bundleId: string;
  question: string;
  difficulty: difficulty;
  answers: string[];
}

export function createQuestionId(bundleId: string, nr: string): string {
  return `${bundleId}-${nr}`;
}
