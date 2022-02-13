import { IonItem, IonText } from "@ionic/react";
import { difficulties, difficultyNames } from "../../../model/difficulty";
import { useAnswersByDifficultyAggregation } from "../../../storage/log-aggregations/answers-by-difficulty";
import { PercentageStat } from "../../atoms/percentage-stat";

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
            <PercentageStat
              name={difficultyNames[difficulty]}
              correct={correct}
              total={total}
            />
          </IonItem>
        );
      })}
    </>
  );
};

export default AnswersByDifficulty;
