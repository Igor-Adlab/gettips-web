import { Button, Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export function PasswordForm({ onSubmit, onError }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFormSubmit = (values) =>
    form
      .validateFields()
      .then(() => onSubmit(values))
      .catch(onError);

  return (
    <Form layout="vertical" form={form} onFinish={onFormSubmit}>
      <Form.Item
        label={t("fields.current_password")}
        name="current"
        required
        rules={[{ required: true }]}
      >
        <Input size="large" type="password" />
      </Form.Item>
      <Form.Item
        label={t("fields.new_password")}
        name="password"
        required
        rules={[{ required: true, min: 6, max: 32 }]}
      >
        <Input size="large" type="password" />
      </Form.Item>
      <Button size="large" block type="primary" htmlType="submit">
        {t("buttons.change_password")}
      </Button>
    </Form>
  );
}
