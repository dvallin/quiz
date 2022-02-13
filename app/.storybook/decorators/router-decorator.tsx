import { Story } from "@storybook/react";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router";

export function routerDecorator(path?: string) {
  return (Story: Story) => {
    return (
      <Router history={createMemoryHistory()}>
        <Route path={path}>
          <Story />
        </Route>
      </Router>
    );
  };
}
