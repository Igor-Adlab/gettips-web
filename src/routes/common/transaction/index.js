import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { NotFound } from "../../../components/common/NotFound";
import { Initiate } from "./Initiate";
import { Status } from "./Status";
import { Widget } from "./Widget";

export function Transaction() {
  const { path } = useRouteMatch();

  return (
    <div style={{ padding: "15px", height: "100%" }}>
      <Switch>
        <Route exact path={path} component={Initiate} />
        <Route path={`${path}/widget/:code`} component={Widget} />
        <Route path={`${path}/status/:code`} component={Status} />

        <Route path="(.+)" component={NotFound} />
      </Switch>
    </div>
  );
}
