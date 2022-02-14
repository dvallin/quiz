import { Story } from "@storybook/react";
import { createBrowserHistory } from "history";
import { Route, Router } from "react-router";

export function withRouter(path?: string) {
  return (Story: Story) => {
    return (
      <Router history={createBrowserHistory()}>
        <Route path={path}>
          <Story />
        </Route>
      </Router>
    );
  };
}
