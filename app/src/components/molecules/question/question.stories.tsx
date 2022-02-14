import { Story } from "@storybook/react";
import {
  longQuestion,
  standardQuestion,
} from "../../../../.storybook/data/question";
import { withRouter } from "../../../../.storybook/decorators/router-decorator";
import Question, { QuestionProps } from "./question";

const Default = {
  title: "molecules/question/Question",
  component: Question,
  args: {
    question: standardQuestion,
  },
  decorators: [withRouter()],
};

const Template: Story<QuestionProps> = (args) => <Question {...args} />;

export const StandardQuestion = Template.bind({});

export const LongQuestion = Template.bind({});
LongQuestion.args = {
  ...Template.args,
  question: longQuestion,
};

export default Default;
