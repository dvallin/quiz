import { IonItem, IonLabel } from "@ionic/react";

export interface ContainerProps {
  answer: string;
  index: number;
  finalAnswer: number | undefined;
}

const AnswerResult: React.FC<ContainerProps> = ({
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
