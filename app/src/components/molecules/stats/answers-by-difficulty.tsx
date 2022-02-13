import { IonItem, IonLabel, IonText } from "@ionic/react";
import { difficulties, difficultyNames } from "../../../model/difficulty";
import { percentageToString } from "../../../percentage";
import { useAnswersByDifficultyAggregation } from "../../../storage/log-aggregations/answers-by-difficulty";

const AnswersByDifficulty: React.FC = () => {
  const { data: answersByDifficulty } = useAnswersByDifficultyAggregation();

  if (answersByDifficulty === undefined) {
    return <></>;
  }

  return (
    <>
      <IonText>
        <h2>By difficulty</h2>
      </IonText>
      {difficulties.map((difficulty) => {
        const { correct, total } = answersByDifficulty[difficulty];
        return (
          <IonItem key={difficulty}>
            <IonLabel>
              {difficultyNames[difficulty]}: {correct} / {total} correct answers
              ({percentageToString(correct, total)})
            </IonLabel>
          </IonItem>
        );
      })}
    </>
  );
};

export default AnswersByDifficulty;
