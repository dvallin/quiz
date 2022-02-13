import useSWR from "swr";
import {
  AnswerMessage,
  getQuestionId,
  isCorrectAnswer,
} from "../../model/answer-message";
import { difficulty } from "../../model/difficulty";
import { aggregate, registerAggregation } from "../log-aggregation";
import { QuestionsLookup, useQuestionsLookup } from "../use-questions-lookup";

const name = "answers-by-difficulty";
registerAggregation(name);

export type AnswersByDifficulty = {
  [key in difficulty]: { correct: number; total: number };
};
export async function aggregateAnswersByDifficulty(
  questions: QuestionsLookup
): Promise<AnswersByDifficulty> {
  const defaultValue: AnswersByDifficulty = {
    1: { correct: 0, total: 0 },
    2: { correct: 0, total: 0 },
    3: { correct: 0, total: 0 },
    4: { correct: 0, total: 0 },
  };
  return aggregate<AnswersByDifficulty, AnswerMessage>(
    name,
    "answer",
    defaultValue,
    (aggregate, message) => {
      const question = questions[getQuestionId(message)];
      const difficulty = question?.difficulty || 1;
      aggregate[difficulty].total++;
      if (isCorrectAnswer(message)) {
        aggregate[difficulty].correct++;
      }
      return aggregate;
    }
  );
}
export function useAnswersByDifficultyAggregation() {
  const { data: questions } = useQuestionsLookup();
  return useSWR(questions ? ["log-aggregation", name] : null, () =>
    aggregateAnswersByDifficulty(questions || {})
  );
}
