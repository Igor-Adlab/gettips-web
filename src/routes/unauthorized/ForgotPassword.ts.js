import { Button, Divider, Form, Spin, Typography, message } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { InputPhone } from "../../components/common/InputPhone";
import { useResetPassword } from "../../hooks/auth";

export function ForgotPassword() {
  const [form] = Form.useForm();
  const history = useHistory();
  const { t } = useTranslation();

  const [reset, { isLoading }] = useResetPassword({
    onError: () =>
      message.error("Can not send new password. Contact admin please."),
    onSuccess: () => {
      history.goBack();
      message.success("Password sent!");
    },
  });

  const onFormSubmit = ({ phone: { code, phone } }) => {
    form
      .validateFields()
      .then(() => reset({ phone: InputPhone.format(code, phone) }))
      .catch((err) => message.error("Check form data!"));
  };

  return (
    <Spin spinning={isLoading}>
      <Divider>
        <Typography.Title style={{ margin: 0 }} level={3}>
          {t("buttons.forgot_password")}
        </Typography.Title>
      </Divider>
      <Form form={form} onFinish={onFormSubmit} layout="vertical">
        <Form.Item
          name="phone"
          label={t("fields.phone")}
          required
          validateTrigger={["onBlur", "onSubmit"]}
          rules={[{ required: true }, { validator: InputPhone.validator }]}
        >
          <InputPhone countries={["UA", "IL", "UK", "US"]} size="large" />
        </Form.Item>
        <Button type="primary" block size="large" htmlType="submit">
          {t("buttons.send_new_password")}
        </Button>
      </Form>
    </Spin>
  );
}
