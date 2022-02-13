import useSWR from "swr";
import { AnswerMessage, isCorrectAnswer } from "../../model/answer-message";
import { aggregate, registerAggregation } from "../log-aggregation";

const name = "answers-by-bundle";
registerAggregation(name);

export type AnswersByBundle = {
  [key: string]: { correct: number; total: number };
};
export async function aggregateAnswersByBundle(): Promise<AnswersByBundle> {
  const defaultValue: AnswersByBundle = {};
  return aggregate<AnswersByBundle, AnswerMessage>(
    name,
    "answer",
    defaultValue,
    (aggregate, message) => {
      if (!aggregate[message.bundleId]) {
        aggregate[message.bundleId] = { correct: 0, total: 0 };
      }
      aggregate[message.bundleId].total++;
      if (isCorrectAnswer(message)) {
        aggregate[message.bundleId].correct++;
      }
      return aggregate;
    }
  );
}
export function useAnswersByBundleAggregation() {
  return useSWR(["log-aggregation", name], () => aggregateAnswersByBundle());
}
