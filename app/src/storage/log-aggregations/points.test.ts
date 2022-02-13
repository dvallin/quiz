import { clear as clearAggregations } from "../log-aggregation";
import { clear as clearLogs, push } from "../log";
import { QuestionsLookup } from "../use-questions-lookup";
import { AnswerMessage } from "../../model/answer-message";
import { aggregatePoints } from "./points";

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

it("runs on empty state", async () => {
  const answersByDifficulty = await aggregatePoints(questionsLookup);
  expect(answersByDifficulty).toEqual(0);
});

it("aggregates answers", async () => {
  await pushAnswer("1", 0);
  await pushAnswer("2", 0);
  await pushAnswer("2", 1);
  await pushAnswer("2");
  const answersByDifficulty = await aggregatePoints(questionsLookup);
  expect(answersByDifficulty).toEqual(3);
});

it("updates streams", async () => {
  await pushAnswer("1", 0);
  await aggregatePoints(questionsLookup);
  await pushAnswer("1", 0);
  const answersByDifficulty = await aggregatePoints(questionsLookup);
  expect(answersByDifficulty).toEqual(2);
});
