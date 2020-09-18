import { Button, Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const { Item, useForm } = Form;

export function SignInForm({ onSubmit, onError }) {
  const [form] = useForm();
  const { t } = useTranslation();

  const onFormSubmit = (user) => {
    form
      .validateFields()
      .then(() => onSubmit(user))
      .then(onError);
  };

  return (
    <Form onFinish={onFormSubmit} layout="vertical" form={form}>
      <Item
        label={t("fields.email")}
        name="email"
        required
        rules={[{ type: "email", required: true }]}
      >
        <Input size="large" />
      </Item>

      <Item
        label={t("fields.password")}
        name="password"
        required
        rules={[{ required: true }]}
      >
        <Input size="large" type="password" />
      </Item>

      <div>
        <Button size="large" block type="primary" htmlType="submit">
          {t("buttons.sign_in")}
        </Button>
      </div>
    </Form>
  );
}
