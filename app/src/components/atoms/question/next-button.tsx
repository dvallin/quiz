import { IonButton } from "@ionic/react";

export interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => (
  <IonButton expand="full" onClick={onClick}>
    Next Question
  </IonButton>
);

export default NextButton;
