import { Spin } from "antd";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useUser } from "../hooks/useUser";

export function isGuest({ fallback, redirect }) {
  if (!fallback && !redirect) {
    throw new Error("One of required params are missing");
  }

  return (Component) =>
    function IsGuestWrapper() {
      const history = useHistory();
      const { loading, isReady, authenticated } = useUser();

      useEffect(() => {
        if (authenticated) {
          redirect && history.push(redirect);
        }
      }, [authenticated]);

      if (loading) {
        return <Spin />;
      }

      return !authenticated ? <Component /> : fallback || null;
    };
}
