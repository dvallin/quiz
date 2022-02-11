import { IonButton } from "@ionic/react";

export interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => (
  <IonButton expand="full" color="secondary" onClick={onClick}>
    Back
  </IonButton>
);

export default NextButton;
