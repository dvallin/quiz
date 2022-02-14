import { IonItem, IonLabel } from "@ionic/react";

export interface AnswerResultProps {
  answer: string;
  index: number;
  finalAnswer: number | undefined;
}

const AnswerResult: React.FC<AnswerResultProps> = ({
  answer,
  index,
  finalAnswer,
}) => {
  const correct = index === 0;
  const wrongAnswer = !correct && finalAnswer === index;
  return (
    <IonItem>
      <IonLabel
        color={correct ? "success" : wrongAnswer ? "danger" : undefined}
      >
        {answer}
      </IonLabel>
    </IonItem>
  );
};

export default AnswerResult;
