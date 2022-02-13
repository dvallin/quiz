import { IonItem, IonLabel, IonText } from "@ionic/react";
import { usePointsAggregation } from "../../../storage/log-aggregations/points";

const Points: React.FC = () => {
  const { data: points } = usePointsAggregation();

  if (points === undefined) {
    return <></>;
  }

  return (
    <>
      <IonText>
        <h2>Points overall</h2>
      </IonText>
      <IonItem>
        <IonLabel>{points}</IonLabel>
      </IonItem>
    </>
  );
};

export default Points;
