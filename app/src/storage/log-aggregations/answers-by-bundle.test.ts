import { clear as clearAggregations } from "../log-aggregation";
import { clear as clearLogs, push } from "../log";
import { AnswerMessage } from "../../model/answer-message";
import { aggregateAnswersByBundle, AnswersByBundle } from "./answers-by-bundle";

beforeEach(async () => {
  await clearLogs();
  await clearAggregations();
});

function pushAnswer(bundleId: string, answer?: number): Promise<string> {
  return push<AnswerMessage>("answer", {
    timestamp: Date.now(),
    questionNr: "1",
    bundleId,
    answer,
  });
}

const empty: AnswersByBundle = {};

it("runs on empty state", async () => {
  const answersByBundle = await aggregateAnswersByBundle();
  expect(answersByBundle).toEqual(empty);
});

it("aggregates answers", async () => {
  await pushAnswer("1", 0);
  await pushAnswer("2", 0);
  await pushAnswer("2", 1);
  await pushAnswer("2");
  const answersByBundle = await aggregateAnswersByBundle();
  expect(answersByBundle).toEqual({
    ...empty,
    "1": { correct: 1, total: 1 },
    "2": { correct: 1, total: 3 },
  });
});

it("updates streams", async () => {
  await pushAnswer("1", 0);
  await aggregateAnswersByBundle();
  await pushAnswer("1", 1);
  const answersByBundle = await aggregateAnswersByBundle();
  expect(answersByBundle).toEqual({
    ...empty,
    "1": { correct: 1, total: 2 },
  });
});
