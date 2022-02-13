import { Story } from "@storybook/react";
import { routerDecorator } from "../../../.storybook/decorators/router-decorator";
import Question, { ContainerProps } from "./question";

const Default = {
  title: "molecules/question",
  component: Question,
  args: {
    question: {
      bundleId: "hp1",
      nr: "1312",
      question:
        "What is the headline of the page Harry tries to recite when aunt Marge talks about his mother having bad blood?",
      answers: [
        "A Charm to Cure Reluctant Reverses",
        "A Charm to Cure Imbalance Curses",
        "A Charm to Cure Gradual Sloping",
        "A Charm to Cure Wood Aging",
      ],
      difficulty: 5,
    },
  },
  decorators: [routerDecorator()],
};

export const Primary: Story<ContainerProps> = (args) => <Question {...args} />;

export default Default;
