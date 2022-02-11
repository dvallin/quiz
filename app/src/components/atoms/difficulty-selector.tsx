import { IonSelect, IonSelectOption } from "@ionic/react";
import { difficulty } from "../../model/question";

export type DifficultySelectorProps = React.ComponentProps<typeof IonSelect> & {
  onDifficultySelected: (d: difficulty) => void;
  min?: difficulty;
  max?: difficulty;
};

const options: { value: difficulty; label: string }[] = [
  { value: 1, label: "Muggle" },
  { value: 2, label: "Adept" },
  { value: 3, label: "Wizard" },
  { value: 4, label: "Expert" },
  { value: 5, label: "Master" },
];

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
    {options
      .filter(({ value }) => (!min || value >= min) && (!max || value <= max))
      .map(({ value, label }) => (
        <IonSelectOption key={value} value={value}>
          {label}
        </IonSelectOption>
      ))}
  </IonSelect>
);

export default DifficultySelector;
