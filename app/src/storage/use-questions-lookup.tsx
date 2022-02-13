import { useMemo } from "react";
import { createQuestionId, Question } from "../model/question";
import { useQuestions } from "./use-questions";

export type QuestionsLookup = { [key: string]: Question };

export function useQuestionsLookup() {
  const { data, ...rest } = useQuestions();
  return useMemo(() => {
    let lookup: QuestionsLookup | undefined = undefined;
    if (data) {
      const l: QuestionsLookup = {};
      data.forEach((question) => {
        const id = createQuestionId(question.bundleId, question.nr);
        l[id] = question;
      });
      lookup = l;
    }
    return { data: lookup, ...rest };
  }, [data, rest]);
}
