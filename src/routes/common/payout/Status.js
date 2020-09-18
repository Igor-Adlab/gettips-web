import { Result } from "antd";
import React from "react";
import { useFela } from "react-fela";
import { useTranslation } from "react-i18next";

const styles = {
  page: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export function Status() {
  const { css } = useFela();
  const { t } = useTranslation();

  return (
    <Result
      status="success"
      className={css(styles.page)}
      title={t("texts.payout.success.title")}
      subTitle={t("texts.payout.success.description")}
    />
  );
}
