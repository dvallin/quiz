import { IonItem, IonLabel, IonText } from "@ionic/react";
import { percentageToString } from "../../../percentage";
import { useAnswersByBundleAggregation } from "../../../storage/log-aggregations/answers-by-bundle";
import { useBundles } from "../../../storage/use-bundles";

const AnswersByBundle: React.FC = () => {
  const { data: answersByBundle } = useAnswersByBundleAggregation();
  const { data: bundles = [] } = useBundles();

  if (answersByBundle === undefined) {
    return <></>;
  }

  return (
    <>
      <IonText>
        <h2>By book</h2>
      </IonText>
      {bundles.map((bundle) => {
        const { correct, total } = answersByBundle[bundle.id] || {
          correct: 0,
          total: 0,
        };
        return (
          <IonItem key={bundle.id}>
            <IonLabel>
              {bundle.name}: {correct} / {total} correct answers (
              {percentageToString(correct, total)})
            </IonLabel>
          </IonItem>
        );
      })}
    </>
  );
};

export default AnswersByBundle;
