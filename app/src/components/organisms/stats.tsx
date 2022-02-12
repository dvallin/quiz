import { IonItem, IonLabel, IonText } from "@ionic/react";
import { difficulties } from "../../model/question";
import {
  useAnswersByDifficultyAggregation,
  usePointsAggregation,
} from "../../storage/log-aggregation";

const percentageToString = (
  partial: number,
  total: number,
  fractionDigits = 1
): string => {
  const percentage = 100 * ((total - partial) / total);
  return Number.isNaN(percentage)
    ? "0%"
    : `${percentage.toFixed(fractionDigits)}%`;
};

const Stats: React.FC = () => {
  const { data: points } = usePointsAggregation();
  const { data: answersByDifficulty } = useAnswersByDifficultyAggregation();

  let pointsOverall;
  if (points !== undefined) {
    pointsOverall = (
      <>
        <IonText>
          <h2>Points overall</h2>
        </IonText>
        <IonItem>
          <IonLabel>{points}</IonLabel>
        </IonItem>
      </>
    );
  }

  let byDifficulty;
  if (answersByDifficulty) {
    byDifficulty = (
      <>
        <IonText>
          <h2>By difficulty</h2>
        </IonText>
        {difficulties.map((difficulty) => {
          const { correct, total } = answersByDifficulty[difficulty];
          return (
            <IonItem key={difficulty}>
              <IonLabel>
                {correct} / {total} correct answers (
                {percentageToString(correct, total)})
              </IonLabel>
            </IonItem>
          );
        })}
      </>
    );
  }

  return (
    <>
      {pointsOverall}
      {byDifficulty}
    </>
  );
};

export default Stats;
