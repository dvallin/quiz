import { Story } from "@storybook/react";
import { withRouter } from "../../../../.storybook/decorators/router-decorator";
import { withQuery } from "@storybook/addon-queryparams";
import Quiz from "./quiz";

const Default = {
  title: "organisms/quiz/Quiz",
  component: Quiz,
  parameters: {
    query: {
      randomized: "true",
      bundleId: "hp1",
      minDifficulty: "1",
      maxDifficulty: "2",
    },
  },
  decorators: [withQuery, withRouter()],
};

const Template: Story = () => <Quiz />;

export const DefaultQuiz = Template.bind({});

export default Default;
