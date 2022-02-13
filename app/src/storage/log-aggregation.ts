import { Storage } from "@ionic/storage";
import useSWR, { mutate } from "swr";
import { difficulty } from "../model/difficulty";
import { stream, getLastIndex } from "./log";
import {
  AnswerMessage,
  getQuestionId,
  isCorrectAnswer,
} from "../model/answer-message";
import { QuestionsLookup, useQuestionsLookup } from "./use-questions-lookup";

const _storage = new Storage({ name: "log-aggregation" });
_storage.create();

export function getLogAggregationState<T>(
  key: string
): Promise<{ aggregate: T; lastIndex: number } | null> {
  return _storage.get(key);
}
export function setLogAggregationState<T>(
  key: string,
  value: { aggregate: T; lastIndex: number }
): Promise<void> {
  return _storage.set(key, value);
}

async function aggregate<Aggregate, Message>(
  name: string,
  topic: string,
  defaultValue: Aggregate,
  aggregator: (aggregate: Aggregate, message: Message) => Aggregate
): Promise<Aggregate> {
  // get last aggregation state
  const state = await getLogAggregationState<Aggregate>(name);
  let aggregate: Aggregate = state?.aggregate || defaultValue;

  // stream over messages starting at last index and aggregate new value
  const messages = stream<Message>(topic, state?.lastIndex);
  for await (const message of messages) {
    aggregate = aggregator(aggregate, message);
  }

  // write new aggregation state
  const lastIndex = await getLastIndex(topic);
  await setLogAggregationState(name, { aggregate, lastIndex: lastIndex + 1 });
  return aggregate;
}

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
    "answers-by-difficulty",
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

export type Points = number;
export async function aggregatePoints(
  questions: QuestionsLookup
): Promise<Points> {
  return aggregate<Points, AnswerMessage>(
    "points",
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

export function mutateLogAggregations(): void {
  mutate(["log-aggregation", "points"]);
  mutate(["log-aggregation", "answers-by-difficulty"]);
}

export function usePointsAggregation() {
  const { data: questions } = useQuestionsLookup();
  return useSWR(questions ? ["log-aggregation", "points"] : null, () =>
    aggregatePoints(questions || {})
  );
}

export function useAnswersByDifficultyAggregation() {
  const { data: questions } = useQuestionsLookup();
  return useSWR(
    questions ? ["log-aggregation", "answers-by-difficulty"] : null,
    () => aggregateAnswersByDifficulty(questions || {})
  );
}

export function clear(): Promise<void> {
  return _storage.clear();
}
