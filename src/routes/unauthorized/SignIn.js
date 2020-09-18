import { Col, Divider, Row, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { tokenState } from "../../atoms";
import { SignInForm } from "../../components/auth/SignInForm";
import { useSingIn } from "../../hooks/auth";

export function SignIn() {
  const { t } = useTranslation();
  const [token, setToken] = useRecoilState(tokenState);

  const [signIn, { isLoading }] = useSingIn({
    onSuccess: ({ data }) => setToken(data.access_token),
  });

  const onSignInSubmit = (credentials) => signIn(credentials);

  return (
    <>
      <Divider>
        <Typography.Title style={{ margin: 0 }} level={3}>
          {t("navigation.sign_in")}
        </Typography.Title>
      </Divider>

      <SignInForm loading={isLoading} onSubmit={onSignInSubmit} />

      <Row style={{ padding: "15px 0" }}>
        <Col span={12} className="text-left">
          <Link to="/u/sign-up">{t("buttons.have_not_account")}</Link>
        </Col>
        <Col span={12} className="text-right">
          <Link to="/u/forgot-password">{t("buttons.forgot_password")}</Link>
        </Col>
      </Row>
    </>
  );
}
