import { Button, Form, Input, Spin } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useFela } from "react-fela";
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";
import { queryCache } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";

import { PayoutPreview } from "../../../components/payout/PayoutPreview";
import { CardsSelector } from "../../../containers/cards/CardSelector";
import { useUser } from "../../../hooks";
import { useCardsList } from "../../../hooks/cards";
import { usePayoutConfirm } from "../../../hooks/payout";

const { Item, useForm } = Form;

const styles = {
  preview: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cards: {
    flexGrow: 1,
  },
};

function CardTokenForm({ onSubmit, visible = true }) {
  const { t } = useTranslation();
  const [token, setToken] = useState(undefined);

  const onGetPayed = () => onSubmit(token);

  if (!visible) {
    return null;
  }

  return (
    <Form layout="vertical">
      <Item
        style={{ margin: 0, marginBottom: "10px" }}
        label={t("fields.use_card")}
        required
        rules={[{ required: true }]}
      >
        <CardsSelector onSelect={setToken} />
      </Item>

      <Button size="large" block type="primary" onClick={onGetPayed}>
        {t("buttons.get_payed")}
      </Button>
    </Form>
  );
}

function CardNumberForm({ onSubmit }) {
  const [form] = useForm();
  const { t } = useTranslation();

  const onCardFormSubmit = ({ card }) => onSubmit(card);

  return (
    <Form form={form} layout="vertical" onFinish={onCardFormSubmit}>
      <Item
        style={{ margin: 0, marginBottom: "10px" }}
        label={t("fields.card_number")}
        name="card"
        required
        rules={[{ required: true }]}
      >
        <InputMask mask="9999 9999 9999 9999">
          {(props) => <Input {...props} size="large" />}
        </InputMask>
      </Item>
      <Button block size="large" type="primary" htmlType="submit">
        {t("buttons.get_payed")}
      </Button>
    </Form>
  );
}

function CardForm({ onSubmit }) {
  const { t } = useTranslation();
  const { authenticated } = useUser();

  const { data, isLoading } = useCardsList({
    enabled: authenticated,
  });

  const [view, setView] = useState(authenticated ? "token" : "card");

  const hasCards = useMemo(() => authenticated && data, [data, authenticated]);

  useEffect(() => {
    if (!hasCards) {
      setView("card");
    } else {
      setView("token");
    }
  }, [hasCards]);

  const onCardSelected = (type) => (data) => {
    onSubmit(type, data);
  };

  return (
    <>
      <div key="token" style={{ display: view === "token" ? "block" : "none" }}>
        <CardTokenForm
          visible={hasCards}
          onSubmit={onCardSelected("card_token")}
        />
      </div>
      <div key="card" style={{ display: view === "card" ? "block" : "none" }}>
        <CardNumberForm onSubmit={onCardSelected("card")} />
      </div>

      {hasCards && [
        <Button
          key="switch-view"
          style={{ marginTop: "10px" }}
          block
          onClick={() => setView(view === "token" ? "card" : "token")}
          type="link"
        >
          {t(view === "token" ? "buttons.use_card_number" : "buttons.use_card")}
        </Button>,
      ]}
    </>
  );
}

export function Preview() {
  const { css } = useFela();
  const history = useHistory();
  const { params } = useRouteMatch();

  const [info, setInfo] = useState();
  const [preview, setPreview] = useState();

  const [confirm, { isLoading }] = usePayoutConfirm({
    onSuccess: () => history.push(`/payout/status/${params.code}`),
  });

  useEffect(() => {
    const cached = {
      info: queryCache.getQueryData(["payout.info", params.code]),
      preview: queryCache.getQueryData(["payout.preview", params.code]),
    };

    if (isEmpty(cached.info) || isEmpty(cached.preview)) {
      history.push("/payout");
    }

    setInfo(cached.info);
    setPreview(cached.preview);
  }, [params.code]);

  const onConfirmPayout = (type, card) =>
    confirm({ [type]: card, token: preview.token, payout: params.code });

  if (isEmpty(preview) || isEmpty(info)) {
    return <Spin />;
  }

  return (
    <div className={css(styles.preview)}>
      <div className={css(styles.cards)}>
        <PayoutPreview
          loading={isLoading}
          list={preview.data}
          total={preview.total}
          currency={preview.currency}
        />
      </div>
      <CardForm onSubmit={onConfirmPayout} />
    </div>
  );
}
