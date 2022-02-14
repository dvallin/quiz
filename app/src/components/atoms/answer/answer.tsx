import styles from "./answer.module.css";
import { IonItem } from "@ionic/react";

export interface AnswerProps {
  answer: string;
  onClick: () => void;
}

const Answer: React.FC<AnswerProps> = ({ answer, onClick }) => (
  <IonItem onClick={onClick} className={styles.answer}>
    {answer}
  </IonItem>
);

export default Answer;
