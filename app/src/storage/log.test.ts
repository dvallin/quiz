import { getLastIndex, push, stream, clear } from "./log";

beforeEach(async () => {
  await clear();
});

async function consumeStream<T>(s: AsyncGenerator<T>) {
  const list = [];
  for await (const item of s) {
    list.push(item);
  }
  return list;
}

describe("push", () => {
  it("pushes onto empty topic", async () => {
    const key = await push("topic", {});
    expect(key).toBe("topic-1");
  });
});

describe("getLastIndex", () => {
  it("is zero for empty topic", async () => {
    const index = await getLastIndex("topic");
    expect(index).toBe(0);
  });

  it("increments after push", async () => {
    await push("topic", {});
    await push("topic2", {});
    await push("topic", {});
    const index = await getLastIndex("topic");
    const index2 = await getLastIndex("topic2");
    expect(index).toBe(2);
    expect(index2).toBe(1);
  });
});

describe("stream", () => {
  it("streams empty topic", async () => {
    const result = await consumeStream(stream("topic"));
    expect(result).toEqual([]);
  });

  it("streams topics in full", async () => {
    await push("topic", { message: "1" });
    await push("topic2", { message: "2" });
    await push("topic", { message: "3" });
    const stream1 = await consumeStream(stream("topic"));
    const stream2 = await consumeStream(stream("topic2"));
    expect(stream1).toEqual([{ message: "1" }, { message: "3" }]);
    expect(stream2).toEqual([{ message: "2" }]);
  });

  it("streams topics in from index", async () => {
    await push("topic", { message: "1" });
    await push("topic", { message: "3" });
    const stream1 = await consumeStream(stream("topic", 1));
    const stream2 = await consumeStream(stream("topic", 2));
    expect(stream1).toEqual([{ message: "1" }, { message: "3" }]);
    expect(stream2).toEqual([{ message: "3" }]);
  });
});
