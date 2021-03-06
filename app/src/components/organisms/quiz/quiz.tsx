import { IonLabel } from "@ionic/react";
import { useState } from "react";
import Question from "../../molecules/question/question";
import { difficulty } from "../../../model/difficulty";
import { toBoolean, toInteger, toString, useQuery } from "../../../query";
import {
  QuestionsFilter,
  useFilteredQuestions,
} from "../../../storage/use-filtered-questions";

function useQuizQuery(): { filter: QuestionsFilter } {
  const { randomized, bundleId, minDifficulty, maxDifficulty } = useQuery();
  return {
    filter: {
      randomized: toBoolean(randomized),
      bundleId: toString(bundleId),
      minDifficulty: (toInteger(minDifficulty) as difficulty) || 1,
      maxDifficulty: (toInteger(maxDifficulty) as difficulty) || 5,
    },
  };
}

const Quiz: React.FC = () => {
  console.log("render");
  const { filter } = useQuizQuery();
  console.log(filter);
  const { data: questions = [] } = useFilteredQuestions(filter);

  const [index, setIndex] = useState(0);
  const currentQuestion = questions[index];
  return currentQuestion ? (
    <Question question={currentQuestion} onNext={() => setIndex(index + 1)} />
  ) : (
    <IonLabel>well done! all questions answered!</IonLabel>
  );
};

export default Quiz;
