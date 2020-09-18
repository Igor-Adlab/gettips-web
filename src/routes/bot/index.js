import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { Pay } from "./Pay";
import { Status } from "./Status";

export default function Bot() {
  const { path } = useRouteMatch();

  return (
    <div style={{ padding: "15px", height: "100%" }}>
      <Switch>
        <Route exact path={`${path}/pay/:code`} component={Pay} />
        <Route exact path={`${path}/status/:code`} component={Status} />
      </Switch>
    </div>
  );
}
