import useSWR from "swr";
import {
  AnswerMessage,
  getQuestionId,
  isCorrectAnswer,
} from "../../model/answer-message";
import { aggregate, registerAggregation } from "../log-aggregation";
import { QuestionsLookup, useQuestionsLookup } from "../use-questions-lookup";

const name = "points";
registerAggregation(name);

export type Points = number;
export async function aggregatePoints(
  questions: QuestionsLookup
): Promise<Points> {
  return aggregate<Points, AnswerMessage>(
    name,
    "answer",
    0,
    (aggregate, message) => {
      if (isCorrectAnswer(message)) {
        const question = questions[getQuestionId(message)];
        return aggregate + (question?.difficulty || 1);
      }
      return aggregate;
    }
  );
}

export function usePointsAggregation() {
  const { data: questions } = useQuestionsLookup();
  return useSWR(questions ? ["log-aggregation", name] : null, () =>
    aggregatePoints(questions || {})
  );
}
