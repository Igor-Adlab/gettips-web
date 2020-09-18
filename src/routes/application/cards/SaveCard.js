import { message } from "antd";
import React, { useEffect } from "react";

import { TokenizationWidget } from "../../../components/cards/TokenizationWidget";
import { isUser } from "../../../guards";

export function SaveCard() {
  const cards = {};

  const onToken = (data) => {
    const request = {
      type: data.card_type,
      token: data.rectoken,
      currency: data.currency,
      masked: data.masked_card,
    };
  };

  useEffect(() => {
    if (!cards.isReady) {
      return;
    }

    if (cards.isError) {
      return message.error("Can not save card!");
    } else {
      return message.success("Card saved!");
    }
  }, [cards.isReady]);

  return <TokenizationWidget onCardTokenized={onToken} />;
}

export default isUser({ redirect: "/u/sign-in" })(SaveCard);
