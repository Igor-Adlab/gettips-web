import { Button, Typography } from "antd";
import React from "react";
import { useFela } from "react-fela";
import { useTranslation } from "react-i18next";

import { ButtonLink } from "../../components/ButtonLink";

const styles = {
  landing: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export function Landing() {
  const { css } = useFela();
  const { t } = useTranslation();

  return (
    <div className={css(styles.landing)}>
      <Typography.Title level={2}>{t("texts.landing.title")}</Typography.Title>
      <Typography.Text>{t("texts.landing.description")}</Typography.Text>

      <div style={{ marginTop: "20px" }}>
        <ButtonLink
          to="/transaction"
          type="primary"
          block
          size="large"
          style={{ marginBottom: "20px" }}
        >
          {t("buttons.send_tips")}
        </ButtonLink>
        <ButtonLink to="/payout" type="default" block size="large">
          {t("buttons.request_payout")}
        </ButtonLink>
      </div>
    </div>
  );
}
