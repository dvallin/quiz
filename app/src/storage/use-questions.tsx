import useImmutableSWR from "swr/immutable";
import { Bundle } from "../model/bundle";
import { Question } from "../model/question";
import { fetchJson } from "./fetch-json";
import { useBundles } from "./use-bundles";

export async function fetchQuestions(bundles: Bundle[]): Promise<Question[]> {
  const questions = await Promise.all(
    bundles.map(async (bundle) => {
      const questionsOfBundle = await fetchJson<Omit<Question, "bundleId">[]>(
        `/assets/data/${bundle.id}.json`
      );
      return questionsOfBundle.map((q) => ({ bundleId: bundle.id, ...q }));
    })
  );
  return questions.flatMap((i) => i);
}

export function useQuestions() {
  const { data: bundles } = useBundles();
  return useImmutableSWR(bundles ? "questions" : null, () =>
    fetchQuestions(bundles || [])
  );
}
