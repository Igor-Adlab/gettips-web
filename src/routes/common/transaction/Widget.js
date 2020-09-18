import { Button, Spin } from "antd";
import React, { useEffect } from "react";
import { useFela } from "react-fela";
import { useTranslation } from "react-i18next";
import { queryCache } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";

import { useTransactionInfo } from "../../../hooks/transaction";

const options = {
  options: {
    fee: true,
    button: true,
    locales: ["ru"],
    fullScreen: false,
    title: "Оплата чаевых",
    methods: ["wallets", "card"],
    cardIcons: ["mastercard", "visa"],
  },
  params: {
    required_rectoken: "y",
    merchant_id: process.env.FONDY_MERCHANT,
    server_callback_url: `${
      process.env.API_APP || location.origin
    }/api/fondy/callback`,
  },
};

const styles = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  widget: {
    flexGrow: 1,
  },
};

export function Widget() {
  const { css } = useFela();
  const { t } = useTranslation();
  const history = useHistory();
  const { params } = useRouteMatch();

  const { isLoading } = useTransactionInfo(params.code, {
    onSuccess: ({ data }) => {
      options.params.order_id = data.id;
      options.params.currency = data.currency || "uah";
      options.params.amount = parseInt(data.amount) * 100;
      options.params.order_desc = `${
        data.comment || "Оплата чаевых"
      }. Получатель: ${data.receiver}`;

      fondy("#checkout-container", options).$on("success", function (model) {
        const order = model.attr("order.order_data");
        const status = model.attr("order.order_data.order_status");

        queryCache.setQueryData(["order", order.order_id], order);
        history.push(`/transaction/status/${order.order_id}?status=${status}`);
      });
    },
  });

  return (
    <Spin spinning={isLoading} className={css(styles.container)}>
      <div className={css(styles.widget)} id="checkout-container" />
      <Button block type="link" onClick={history.goBack}>
        {t("buttons.back")}
      </Button>
    </Spin>
  );
}
