import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { isGuest } from "../../guards";
import { ForgotPassword } from "./ForgotPassword.ts";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export function UnauthorizedComponent() {
  const { path } = useRouteMatch();

  return (
    <div style={{ padding: "15px", height: "100%" }}>
      <Switch>
        <Route path={`${path}/sign-in`} component={SignIn} />
        <Route path={`${path}/sign-up`} component={SignUp} />
        <Route path={`${path}/forgot-password`} component={ForgotPassword} />
      </Switch>
    </div>
  );
}

export default isGuest({ redirect: "/application" })(UnauthorizedComponent);
