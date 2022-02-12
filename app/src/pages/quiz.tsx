import { Route } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Quiz from "../components/organisms/quiz";
import QuizSelector from "../components/organisms/quiz-selector";

const QuizPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quiz</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Quiz</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Route exact path="/quiz/play">
          <Quiz />
        </Route>
        <Route exact path="/quiz">
          <QuizSelector />
        </Route>
      </IonContent>
    </IonPage>
  );
};

export default QuizPage;
