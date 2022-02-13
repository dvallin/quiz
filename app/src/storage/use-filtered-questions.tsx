import { useMemo } from "react";
import { difficulty } from "../model/difficulty";
import { shuffle } from "../shuffle";
import { useQuestions } from "./use-questions";

export interface QuestionsFilter {
  randomized?: boolean;
  bundleId?: string;
  minDifficulty: difficulty;
  maxDifficulty: difficulty;
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
