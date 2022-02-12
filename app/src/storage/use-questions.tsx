import { useMemo } from "react";
import useImmutableSWR from "swr/immutable";
import { difficulty, Question } from "../model/question";
import { shuffle } from "../shuffle";

export const staticQuestions: Question[] = [
  {
    nr: "1",
    bundleId: "HP1",
    difficulty: 1,
    question: "What is Hermione's last name?",
    answers: ["Granger", "Stranger", "Ranger", "Manger"],
  },
  {
    nr: "2",
    bundleId: "HP1",
    difficulty: 1,
    question: "What color of hair does Hannah Abbott have?",
    answers: ["Blonde", "White", "Red", "Black"],
  },
];

export function createQuestionId(bundleId: string, nr: string): string {
  return `${bundleId}-${nr}`;
}

export interface QuestionsFilter {
  randomized?: boolean;
  bundleId?: string;
  minDifficulty: difficulty;
  maxDifficulty: difficulty;
}

export function useQuestions() {
  return useImmutableSWR("questions", () => staticQuestions);
}

export type QuestionLookup = { [key: string]: Question };

export function useQuestionsLookup() {
  const { data, ...rest } = useQuestions();
  return useMemo(() => {
    let lookup: QuestionLookup | undefined = undefined;
    if (data) {
      const l: QuestionLookup = {};
      data.forEach((question) => {
        const id = createQuestionId(question.bundleId, question.nr);
        l[id] = question;
      });
      lookup = l;
    }
    return { data: lookup, ...rest };
  }, [data, rest]);
}

export function useFilteredQuestions(filter: QuestionsFilter) {
  const { data, ...rest } = useQuestions();
  return useMemo(() => {
    let filtered = data?.filter(
      (q) =>
        (!filter.bundleId || q.bundleId === filter.bundleId) &&
        q.difficulty >= filter.minDifficulty &&
        q.difficulty <= filter.maxDifficulty
    );
    if (filtered && filter.randomized) {
      filtered = shuffle(filtered);
    }
    return {
      data: filtered,
      ...rest,
    };
  }, [data, rest, filter]);
}
