import { IonButton } from "@ionic/react";

export interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <IonButton expand="full" color="secondary" onClick={onClick}>
    Back
  </IonButton>
);

export default BackButton;
