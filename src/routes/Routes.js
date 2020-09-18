import { Spin } from "antd";
import React, { lazy } from "react";
import Offline from "react-offline";
import { Route, HashRouter as Router, Switch } from "react-router-dom";

import { Application as ApplicationLayout } from "../containers/Application";
import { UserContext, useProvideUser } from "../hooks";

const Bot = lazy(() => import("./bot"));
const Common = lazy(() => import("./common"));
const Application = lazy(() => import("./application"));
const Unauthorized = lazy(() => import("./unauthorized"));

function Routes() {
  const auth = useProvideUser();

  return (
    <UserContext.Provider value={auth}>
      <Offline
        render={({ isOffline }) => (
          <Spin spinning={isOffline} tip="Waiting for connection...">
            <Router>
              <Switch>
                <Route path="/bot" component={Bot} />

                <ApplicationLayout>
                  <Common />
                  <Route path="/u" component={Unauthorized} />
                  <Route path="/application" component={Application} />
                </ApplicationLayout>
              </Switch>
            </Router>
          </Spin>
        )}
      />
    </UserContext.Provider>
  );
}

export default Routes;
