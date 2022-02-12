import { Storage } from "@ionic/storage";
import useSWR, { mutate } from "swr";
import { difficulty, Question } from "../model/question";
import { stream } from "./log";
import { AnswerMessage } from "./messages";
import { useQuestions } from "./use-questions";

const _storage = new Storage({ name: "log" });
_storage.create();

export type AnswersByDifficulty = {
  [key in difficulty]: { correct: number; total: number };
};
async function aggregateAnswersByDifficulty(
  questions: Question[]
): Promise<AnswersByDifficulty> {
  const answers = stream<AnswerMessage>("answer");
  const result: AnswersByDifficulty = {
    1: { correct: 0, total: 0 },
    2: { correct: 0, total: 0 },
    3: { correct: 0, total: 0 },
    4: { correct: 0, total: 0 },
  };
  for await (const answer of answers) {
    const difficulty = questions.find(
      (q) => q.bundleId === answer.bundleId && q.nr === answer.questionNr
    )?.difficulty;
    if (difficulty) {
      result[difficulty].total++;
      if (answer.answer === 0) {
        result[difficulty].correct++;
      }
    }
  }
  return result;
}

export type Points = number;
async function aggregatePoints(questions: Question[]): Promise<Points> {
  const answers = stream<AnswerMessage>("answer");
  let result: Points = 0;
  for await (const answer of answers) {
    if (answer.answer !== 0) {
      continue;
    }
    const difficulty = questions.find(
      (q) => q.bundleId === answer.bundleId && q.nr === answer.questionNr
    )?.difficulty;
    if (difficulty) {
      result += difficulty;
    }
  }
  return result;
}

export function mutateLogAggregations(): void {
  mutate(["log-aggregation", "points"]);
  mutate(["log-aggregation", "answers-by-difficulty"]);
}

export function usePointsAggregation() {
  const { data: questions } = useQuestions();
  return useSWR(questions ? ["log-aggregation", "points"] : null, () =>
    aggregatePoints(questions || [])
  );
}

export function useAnswersByDifficultyAggregation() {
  const { data: questions } = useQuestions();
  return useSWR(
    questions ? ["log-aggregation", "answers-by-difficulty"] : null,
    () => aggregateAnswersByDifficulty(questions || [])
  );
}
