import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Hello from "../pages/hello";

export default function ToDoRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/hello" component={Hello} />
        <Redirect to="/hello" />
      </Switch>
    </BrowserRouter>
  );
}
