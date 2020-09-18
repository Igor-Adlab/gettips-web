import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

export function ButtonLink({ onClick, to, ...props }) {
  const history = useHistory();
  const onButtonClick = (e) => {
    if (onClick) {
      onClick(e);
    }

    history.push(to);
  };

  return <Button {...props} onClick={onButtonClick} />;
}
