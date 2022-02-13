import { createQuestionId } from "./question";

export interface AnswerMessage {
  timestamp: number;
  questionNr: string;
  bundleId: string;
  answer?: number;
}

export function isCorrectAnswer(message: AnswerMessage): boolean {
  return message.answer === 0;
}

export function getQuestionId(message: AnswerMessage): string {
  return createQuestionId(message.bundleId, message.questionNr);
}
