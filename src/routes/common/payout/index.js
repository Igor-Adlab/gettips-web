import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { Confirm } from "./Confirm";
import { Initiate } from "./Initiate";
import { Preview } from "./Preview";
import { Status } from "./Status";

export function Payout() {
  const { path } = useRouteMatch();

  return (
    <div style={{ padding: "15px", height: "100%" }}>
      <Switch>
        <Route exact path={`${path}`} component={Initiate} />
        <Route path={`${path}/id-:code`} component={Confirm} />

        <Route path={`${path}/status/:code`} component={Status} />
        <Route path={`${path}/preview/:code`} component={Preview} />
      </Switch>
    </div>
  );
}
