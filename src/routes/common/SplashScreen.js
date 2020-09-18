import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../../hooks/useUser";

export function SplashScreen() {
  const history = useHistory();
  const [ready, setReady] = useState(true);
  const { loading, authenticated } = useUser();

  // Use for Cordova 'deviceready' event
  // useEffect(() => {
  //   const onReady = () => setReady(true);

  //   document.addEventListener("deviceready", onReady, false);
  //   return document.addEventListener("deviceready", onReady, false);
  // }, []);

  useEffect(() => {
    if (!ready || loading) {
      return;
    }

    history.push(authenticated ? "/application" : "/u/sign-in");
  }, [authenticated, loading, ready]);

  return <Spin tip="Application loading" />;
}
