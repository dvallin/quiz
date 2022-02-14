import { Story } from "@storybook/react";
import Answer, { AnswerProps } from "./answer";
import { loremIpsum } from "../../../../.storybook/data/lorem-ipsum";

const Default = {
  title: "atoms/answer/Answer",
  component: Answer,
  args: {
    answer: loremIpsum(),
  },
};

export const ShortAnswer: Story<AnswerProps> = (args) => <Answer {...args} />;
export const LongAnswer: Story<AnswerProps> = (args) => <Answer {...args} />;
LongAnswer.args = {
  ...ShortAnswer.args,
  answer: loremIpsum(60),
};

export default Default;
