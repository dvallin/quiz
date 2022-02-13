import { Storage } from "@ionic/storage";
import { mutate } from "swr";
import { stream, getLastIndex } from "./log";

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

export async function aggregate<Aggregate, Message>(
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

const _aggregations: string[] = [];

export function registerAggregation(name: string): void {
  _aggregations.push(name);
}
export function mutateLogAggregations(): void {
  _aggregations.forEach((aggregation) => {
    mutate(["log-aggregation", aggregation]);
  });
}

export function clear(): Promise<void> {
  return _storage.clear();
}
