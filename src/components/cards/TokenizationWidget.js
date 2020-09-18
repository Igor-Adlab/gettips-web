import React, { useEffect } from "react";
import uuid from "uuid/v4";

const options = {
  options: {
    fee: true,
    button: true,
    locales: ["ru"],
    fullScreen: true,
    methods: ["card"],
    title: "Оплата чаевых",
  },
  params: {
    amount: 100,
    currency: "uah",
    required_rectoken: "y",
    merchant_id: process.env.FONDY_MERCHANT,
    server_callback_url: `${
      process.env.API_APP || location.origin
    }/api/fondy/tokenization`,
    order_desc: "Сохранение карты. Средства будут возвращены в течении 5 дней",
  },
};

export function TokenizationWidget({ onCardTokenized }) {
  useEffect(() => {
    options.params.order_id = uuid();

    fondy("#checkout-container", options).$on("success", (model) => {
      onCardTokenized(model.attr("order.order_data"));
    });
  }, []);

  return <div id="checkout-container" />;
}
