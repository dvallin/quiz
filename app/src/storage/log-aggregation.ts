import { Storage } from "@ionic/storage";
import useSWR, { mutate } from "swr";
import { difficulty, Question } from "../model/question";
import { stream, count } from "./log";
import { AnswerMessage } from "./messages";
import { useQuestions } from "./use-questions";

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
  const lastIndex = await count(topic);
  await setLogAggregationState(name, { aggregate, lastIndex });
  return aggregate;
}

export type AnswersByDifficulty = {
  [key in difficulty]: { correct: number; total: number };
};
async function aggregateAnswersByDifficulty(
  questions: Question[]
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
    (aggregate, answer) => {
      const difficulty = questions.find(
        (q) => q.bundleId === answer.bundleId && q.nr === answer.questionNr
      )?.difficulty;
      if (difficulty) {
        aggregate[difficulty].total++;
        if (answer.answer === 0) {
          aggregate[difficulty].correct++;
        }
      }
      return aggregate;
    }
  );
}

export type Points = number;
async function aggregatePoints(questions: Question[]): Promise<Points> {
  return aggregate<Points, AnswerMessage>(
    "points",
    "answer",
    0,
    (aggregate, answer) => {
      if (answer.answer === 0) {
        const difficulty = questions.find(
          (q) => q.bundleId === answer.bundleId && q.nr === answer.questionNr
        )?.difficulty;
        if (difficulty) {
          return aggregate + difficulty;
        }
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
