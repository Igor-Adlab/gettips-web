import { Spin } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../hooks";

export function isUser({ fallback, redirect }) {
  if (!fallback && !redirect) {
    throw new Error("One of required params are missing");
  }

  return (Component) =>
    function IUserWrapper() {
      const history = useHistory();
      const { loading, isReady, authenticated } = useUser();

      useEffect(() => {
        console.log("Console.log", { authenticated });
        if (!loading && !authenticated) {
          redirect && history.push(redirect);
        }
      }, [authenticated]);

      if (loading) {
        return <Spin />;
      }

      return authenticated ? <Component /> : fallback || null;
    };
}
