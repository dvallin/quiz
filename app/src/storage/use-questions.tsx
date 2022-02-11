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

export interface QuestionsFilter {
  randomized?: boolean;
  bundleId?: string;
  minDifficulty: difficulty;
  maxDifficulty: difficulty;
}

export function useQuestions() {
  return useImmutableSWR("questions", () => staticQuestions);
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
