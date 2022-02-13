import { IonButton } from "@ionic/react";
import { clear as clearLog } from "../../storage/log";
import {
  clear as clearLogAggregation,
  mutateLogAggregations,
} from "../../storage/log-aggregation";
import Points from "../molecules/stats/points";
import AnswersByDifficulty from "../molecules/stats/answers-by-difficulty";
import AnswersByBundle from "../molecules/stats/answers-by-bundle";

async function clearAllData(): Promise<void> {
  await Promise.all([clearLog(), clearLogAggregation()]);
  mutateLogAggregations();
}

const Stats: React.FC = () => {
  return (
    <>
      <Points />
      <AnswersByDifficulty />
      <AnswersByBundle />
      <IonButton color="danger" onClick={() => clearAllData()} expand="full">
        Clear all data!!
      </IonButton>
    </>
  );
};

export default Stats;
