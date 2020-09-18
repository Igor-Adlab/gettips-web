import { parse } from "querystring";

import { Divider, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { queryCache } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

import { tokenState } from "../../atoms";
import { SignUpForm } from "../../components/auth/SignUpForm";
import { ButtonLink } from "../../components/ButtonLink";
import { useSignUp } from "../../hooks/auth";

export function SignUp() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const [order, setOrder] = useState();
  const [token, setToken] = useRecoilState(tokenState);

  const [signUp, { isLoading }] = useSignUp({
    onSuccess: ({ data }) => setToken(data.access_token),
  });

  useEffect(() => {
    const { trx } = parse(search);
    if (trx) {
      const order = queryCache.getQueryData(["order", trx]);
      setOrder(order);
    }
  }, [search]);

  const defaults = useMemo(() => {
    if (!order) {
      return undefined;
    }

    return {
      email: order.sender_email,
      card: {
        type: order.card_type,
        token: order.rectoken,
        currency: order.currency,
        masked: order.masked_card,
      },
    };
  }, [order]);

  const onSignUpSubmit = ({ user, card }) => signUp({ user, card });

  return (
    <>
      <Divider>
        <Typography.Title style={{ margin: 0 }} level={3}>
          {t("navigation.sign_up")}
        </Typography.Title>
      </Divider>
      <SignUpForm
        loading={isLoading}
        order={order}
        onSubmit={onSignUpSubmit}
        defaults={defaults}
      />
      <ButtonLink
        style={{ marginTop: "10px" }}
        type="link"
        block
        to="/u/sign-in"
      >
        {t("buttons.have_account")}
      </ButtonLink>
    </>
  );
}
