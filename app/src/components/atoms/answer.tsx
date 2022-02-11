import styles from "./answer.module.css";
import { IonItem, IonLabel } from "@ionic/react";

export interface ContainerProps {
  answer: string;
  onClick: () => void;
}

const Answer: React.FC<ContainerProps> = ({ answer, onClick }) => (
  <IonItem onClick={onClick} className={styles.answer}>
    <IonLabel>{answer}</IonLabel>
  </IonItem>
);

export default Answer;
