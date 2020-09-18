import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useTranslation } from "react-i18next";

import { InputConfirmationCode } from "../common/InputConfirmationCode";

const { Item } = Form;

export function PhoneConfirmationForm({
  payout = {},
  confirmation = {},
  onSubmit,
  size,
}) {
  const [form] = useForm();
  const { t } = useTranslation();

  const onPhoneConfirmationFormSubmit = ({ code }) => {
    form
      .validateFields()
      .then(() =>
        onSubmit({
          ...confirmation,
          code: code.replace("-", ""),
          payout: payout.id,
        })
      )
      .catch((error) => {
        message.error("errors.check_data");
        console.log(error);
      });
  };

  return (
    <Form
      layout="vertical"
      onFinish={onPhoneConfirmationFormSubmit}
      form={form}
    >
      <Item
        size={size}
        label={t("fields.confirmation_code")}
        name="code"
        required
        rules={[{ required: true }]}
      >
        <InputConfirmationCode size="large" />
      </Item>
      <Button size="large" block type="primary" htmlType="submit">
        {t("buttons.submit")}
      </Button>
    </Form>
  );
}
