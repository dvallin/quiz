export type difficulty = 1 | 2 | 3 | 4;
export const difficultyNames: { [key in difficulty]: string } = {
  1: "Muggle",
  2: "Adept",
  3: "Wizard",
  4: "Archmage",
};
export const difficulties: difficulty[] = [1, 2, 3, 4];

export interface Question {
  nr: string;
  bundleId: string;
  question: string;
  difficulty: difficulty;
  answers: string[];
}
