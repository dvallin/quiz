import { IonLabel } from "@ionic/react";
import { percentageToString } from "../../percentage";

export interface PercentageStatProps {
  correct: number;
  total: number;
  name: string;
}

export const PercentageStat: React.FC<PercentageStatProps> = ({
  name,
  correct,
  total,
}: PercentageStatProps) => (
  <IonLabel>
    {name}: {correct} / {total} correct answers (
    {percentageToString(correct, total)})
  </IonLabel>
);
