import { Story } from "@storybook/react";
import { staticQuestions } from "../../storage/use-questions";
import Question, { ContainerProps } from "./question";

const Default = {
  title: "molecules/question",
  component: Question,
  args: {
    question: staticQuestions[0],
  },
};

export const Primary: Story<ContainerProps> = (args) => <Question {...args} />;

export default Default;
