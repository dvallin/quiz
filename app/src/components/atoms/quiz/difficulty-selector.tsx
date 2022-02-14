import { IonSelect, IonSelectOption } from "@ionic/react";
import {
  difficulties,
  difficulty,
  difficultyNames,
} from "../../../model/difficulty";

export type DifficultySelectorProps = React.ComponentProps<typeof IonSelect> & {
  onDifficultySelected: (d: difficulty) => void;
  min?: difficulty;
  max?: difficulty;
};

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  onDifficultySelected,
  min,
  max,
  ...ionSelectProps
}) => (
  <IonSelect
    {...ionSelectProps}
    onIonChange={(e) => {
      onDifficultySelected(parseInt(e.detail.value) as difficulty);
      ionSelectProps.onIonChange && ionSelectProps.onIonChange(e);
    }}
  >
    {difficulties
      .filter(
        (difficulty) =>
          (!min || difficulty >= min) && (!max || difficulty <= max)
      )
      .map((difficulty) => (
        <IonSelectOption key={difficulty} value={difficulty}>
          {difficultyNames[difficulty]}
        </IonSelectOption>
      ))}
  </IonSelect>
);

export default DifficultySelector;
