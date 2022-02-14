import {
  IonCheckbox,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { useState } from "react";
import { useRoute } from "../../../query";
import { useBundles } from "../../../storage/use-bundles";
import { QuestionsFilter } from "../../../storage/use-filtered-questions";
import DifficultySelector from "../../atoms/quiz/difficulty-selector";

function useQuizSelect() {
  const [filter, setFilter] = useState<QuestionsFilter>({
    minDifficulty: 1,
    maxDifficulty: 4,
  });
  const { data: bundles = [] } = useBundles();
  const { changePath } = useRoute();
  const startGame = (bundleId?: string) => {
    changePath("/quiz/play", {
      randomized: filter.randomized ? "true" : undefined,
      minDifficulty: filter.minDifficulty.toString(),
      maxDifficulty: filter.maxDifficulty.toString(),
      bundleId,
    });
  };
  return { filter, setFilter, bundles, startGame };
}

const QuizSelector: React.FC = () => {
  const { filter, setFilter, bundles, startGame } = useQuizSelect();
  return (
    <IonList>
      <IonItemDivider>Settings</IonItemDivider>
      <IonItem>
        <IonLabel>Shuffle questions?</IonLabel>
        <IonCheckbox
          checked={filter.randomized}
          onIonChange={(e) =>
            setFilter({
              ...filter,
              randomized: e.detail.checked,
            })
          }
        />
      </IonItem>
      <IonItem>
        <IonLabel>Difficulty range</IonLabel>
        <DifficultySelector
          value={filter.minDifficulty}
          placeholder="Min"
          max={filter.maxDifficulty}
          onDifficultySelected={(minDifficulty) =>
            setFilter({ ...filter, minDifficulty })
          }
        />
        <DifficultySelector
          value={filter.maxDifficulty}
          min={filter.minDifficulty}
          placeholder="Max"
          onDifficultySelected={(maxDifficulty) =>
            setFilter({ ...filter, maxDifficulty })
          }
        />
      </IonItem>
      <IonItemDivider>Play</IonItemDivider>
      <IonItemGroup>
        <IonItem onClick={() => startGame()}>Play all questions</IonItem>
      </IonItemGroup>
      <IonListHeader>Only questions from...</IonListHeader>
      <IonItemGroup>
        {bundles.map((bundle) => (
          <IonItem key={bundle.id} onClick={() => startGame(bundle.id)}>
            {bundle.name}
          </IonItem>
        ))}
      </IonItemGroup>
    </IonList>
  );
};

export default QuizSelector;
