import React from "react";
import { Route, Switch } from "react-router-dom";

import { Help } from "./Help";
import { Landing } from "./Landing";
import { Payout } from "./payout";
import { SplashScreen } from "./SplashScreen";
import { Transaction } from "./transaction";

export default function Common() {
  return (
    <Switch>
      <Route path="/help" component={Help} />
      <Route path="/" exact={true} component={SplashScreen} />

      <Route path="/payout" component={Payout} />
      <Route path="/transaction" component={Transaction} />
    </Switch>
  );
}
