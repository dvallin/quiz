import { clear as clearAggregations } from "../log-aggregation";
import { clear as clearLogs, push } from "../log";
import { QuestionsLookup } from "../use-questions-lookup";
import { AnswerMessage } from "../../model/answer-message";
import {
  aggregateAnswersByDifficulty,
  AnswersByDifficulty,
} from "./answers-by-difficulty";

const questionsLookup: QuestionsLookup = {
  "b1-1": {
    difficulty: 1,
    nr: "1",
    bundleId: "b1",
    question: "?",
    answers: [],
  },
  "b1-2": {
    difficulty: 2,
    nr: "2",
    bundleId: "b1",
    question: "?",
    answers: [],
  },
};

beforeEach(async () => {
  await clearLogs();
  await clearAggregations();
});

function pushAnswer(questionNr: string, answer?: number): Promise<string> {
  return push<AnswerMessage>("answer", {
    timestamp: Date.now(),
    questionNr,
    bundleId: "b1",
    answer,
  });
}

const empty: AnswersByDifficulty = {
  1: { correct: 0, total: 0 },
  2: { correct: 0, total: 0 },
  3: { correct: 0, total: 0 },
  4: { correct: 0, total: 0 },
};

it("runs on empty state", async () => {
  const answersByDifficulty = await aggregateAnswersByDifficulty(
    questionsLookup
  );
  expect(answersByDifficulty).toEqual(empty);
});

it("aggregates answers", async () => {
  await pushAnswer("1", 0);
  await pushAnswer("2", 0);
  await pushAnswer("2", 1);
  await pushAnswer("2");
  const answersByDifficulty = await aggregateAnswersByDifficulty(
    questionsLookup
  );
  expect(answersByDifficulty).toEqual({
    ...empty,
    "1": { correct: 1, total: 1 },
    "2": { correct: 1, total: 3 },
  });
});

it("updates streams", async () => {
  await pushAnswer("1", 0);
  await aggregateAnswersByDifficulty(questionsLookup);
  await pushAnswer("1", 1);
  const answersByDifficulty = await aggregateAnswersByDifficulty(
    questionsLookup
  );
  expect(answersByDifficulty).toEqual({
    ...empty,
    "1": { correct: 1, total: 2 },
  });
});
