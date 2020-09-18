import { Button, message } from "antd";
import React from "react";
import CreditCard from "react-credit-cards";
import { useTranslation } from "react-i18next";

import { useUser } from "../../hooks";
import { useSaveCard } from "../../hooks/cards/useSaveCard.mutation";

export function SaveNewCard({ order }) {
  const { t } = useTranslation();
  const { authenticated } = useUser();

  const [saveCard, { isLoading, isSuccess }] = useSaveCard({
    onSuccess: () => message.success("Card saved!"),
    onError: () => message.success("Can not save card!"),
  });

  const onCardSave = () => {
    saveCard({
      type: order.card_type,
      token: order.rectoken,
      currency: order.currency,
      masked: order.masked_card,
    });
  };

  if (!order || !authenticated) {
    return null;
  }

  return (
    <>
      <CreditCard
        cvc=""
        name=""
        preview
        expiry=""
        number={order.masked_card.replace(/X/gim, "*")}
      />

      <Button
        size="large"
        style={{ marginTop: "20px" }}
        type="primary"
        block
        disabled={isSuccess}
        loading={isLoading}
        onClick={onCardSave}
      >
        {t("fields.save_card")}
      </Button>
    </>
  );
}
