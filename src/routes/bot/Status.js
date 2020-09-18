import React from "react";
import { useFela } from "react-fela";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

import { StatusCheck } from "../../containers/transaction/StatusCheck";

const styles = {
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  status: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    width: "100%",
    textAlign: "center",
  },
};

export function Status() {
  const { css } = useFela();
  const { t } = useTranslation();
  const history = useHistory();
  const { code } = useParams();

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.status)}>
        <StatusCheck transaction={code} />
      </div>
    </div>
  );
}
