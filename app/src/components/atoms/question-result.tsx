import { IonCardContent } from "@ionic/react";

export interface QuestionResultProps {
  finalAnswer: number | undefined;
}

const QuestionResult: React.FC<QuestionResultProps> = ({ finalAnswer }) => (
  <IonCardContent>
    {finalAnswer === 0
      ? "Correct!"
      : finalAnswer === undefined
      ? "Time's up!"
      : "Wrong!"}
  </IonCardContent>
);

export default QuestionResult;
