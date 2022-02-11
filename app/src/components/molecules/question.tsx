import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import { Question } from "../../model/question";
import { useBundles } from "../../storage/use-bundles";
import { shuffle } from "../../shuffle";
import { useMemo, useState } from "react";
import Answer from "../atoms/answer";
import AnswerResult from "../atoms/answer-result";
import NextButton from "../atoms/next-button";
import BackButton from "../atoms/back-button";
import Timer from "../atoms/timer";
import QuestionResult from "../atoms/question-result";
import { useRoute } from "../../query";

export interface ContainerProps {
  question: Question;
  onNext: () => void;
}

const QuestionComponent: React.FC<ContainerProps> = ({ question, onNext }) => {
  const [finalAnswer, setFinalAnswer] = useState<number | undefined>();
  const [done, setDone] = useState<boolean>(false);
  const { data: bundles = [] } = useBundles();
  const bundle = bundles.find((b) => b.id === question.bundleId);
  let permutedAnswers = useMemo(
    () => shuffle(question.answers.map((answer, index) => ({ answer, index }))),
    [question]
  );
  const { changePath } = useRoute();
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>
          {bundle?.name} - question #{question.nr}
        </IonCardSubtitle>
        <IonCardTitle>{question.question}</IonCardTitle>
      </IonCardHeader>

      {!done && (
        <Timer
          onTimeout={() => setDone(true)}
          timeoutMs={15 * 1000}
          resolutionMs={200}
        />
      )}
      {done && <QuestionResult finalAnswer={finalAnswer} />}

      {permutedAnswers.map(({ answer, index }, i) =>
        done ? (
          <AnswerResult
            key={`${question.nr}-${i}`}
            answer={answer}
            index={index}
            finalAnswer={finalAnswer}
          />
        ) : (
          <Answer
            key={`${question.nr}-${i}`}
            answer={answer}
            onClick={() => {
              setFinalAnswer(index);
              setDone(true);
            }}
          />
        )
      )}

      {done && (
        <IonGrid>
          <IonRow>
            <IonCol>
              <BackButton onClick={() => changePath("/quiz")} />
            </IonCol>
            <IonCol>
              <NextButton
                onClick={() => {
                  setFinalAnswer(undefined);
                  setDone(false);
                  onNext();
                }}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
    </IonCard>
  );
};

export default QuestionComponent;
