import { Question } from "../../src/model/question";
import { loremIpsum } from "./lorem-ipsum";

export const standardQuestion: Question = {
  nr: "2313",
  bundleId: "hp1",
  question: `${loremIpsum()}?`,
  answers: [loremIpsum(2), loremIpsum(3), loremIpsum(4), loremIpsum(5)],
  difficulty: 1,
};

export const longQuestion: Question = {
  ...standardQuestion,
  question: `${loremIpsum(30)}?`,
  answers: [loremIpsum(10), loremIpsum(20), loremIpsum(30), loremIpsum(2)],
};
