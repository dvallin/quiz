import { Storage } from "@ionic/storage";
import { mutateLogAggregations } from "./log-aggregation";

interface Meta {
  [topic: string]: number;
}

const _storage = new Storage({ name: "log" });
_storage.create();

let _meta: Meta | undefined = undefined;

async function incrementTopicCount(topic: string): Promise<number> {
  const meta = (await getMeta()) || {};
  meta[topic] = (meta[topic] || 0) + 1;
  _storage.set("log-meta", meta);
  return meta[topic];
}
async function getMeta(): Promise<Meta> {
  if (_meta !== undefined) {
    return _meta;
  }
  const m = await _storage.get("log-meta");
  _meta = m;
  return m;
}

export async function push<T>(topic: string, message: T): Promise<string> {
  const count = await incrementTopicCount(topic);
  const key = `${topic}-${count}`;
  _storage.set(key, message);
  mutateLogAggregations();
  return key;
}

export async function* stream<T>(topic: string, start = 0): AsyncGenerator<T> {
  const end = await count(topic);
  for (let i = start; i < end; i++) {
    const v = await _storage.get(`${topic}-${i}`);
    if (v) {
      yield v;
    }
  }
}

export async function count(topic: string): Promise<number> {
  const meta = await getMeta();
  return meta[topic] + 1 || 0;
}
