import { parse } from "querystring";

import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useFela } from "react-fela";
import { useTranslation } from "react-i18next";
import { queryCache } from "react-query";
import { useHistory, useParams } from "react-router-dom";

import { ButtonLink } from "../../../components/ButtonLink";
import { SaveNewCard } from "../../../containers/cards/SaveNewCard";
import { StatusCheck } from "../../../containers/transaction/StatusCheck";
import { useUser } from "../../../hooks";

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
  const { authenticated } = useUser();

  const [order, setOrder] = useState();

  useEffect(() => {
    if (code) {
      const order = queryCache.getQueryData(["order", code]);
      setOrder(order);
    }
  }, [code]);

  const onSignUp = () => history.push(`/u/sign-up?trx=${code}`);

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.status)}>
        <StatusCheck transaction={code} />
      </div>
      <div className={css(styles.text)}>
        {authenticated ? (
          [
            <SaveNewCard order={order} key="save-card" />,
            <ButtonLink
              style={{ marginTop: "10px" }}
              key="to-application"
              block
              type="link"
              to="/application"
            >
              {t("links.to_home")}
            </ButtonLink>,
          ]
        ) : (
          <Button block type="link" onClick={onSignUp}>
            Sign Up
          </Button>
        )}
      </div>
    </div>
  );
}
