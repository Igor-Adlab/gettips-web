import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { InputPhone } from "../common/InputPhone";

const { Item, useForm } = Form;

export function SignUpForm({ onSubmit, onError, defaults = {} }) {
  const [form] = useForm();
  const { t } = useTranslation();
  const [saveCard, setSaveCard] = useState(true);

  const onFormSubmit = ({ phone: { code, phone }, ...user }) => {
    form
      .validateFields()
      .then(() =>
        onSubmit(
          Object.assign(
            { user: { ...user, phone: InputPhone.format(code, phone) } },
            saveCard ? { card: defaults.card } : {}
          )
        )
      )
      .then(onError);
  };

  const onSaveCardToggle = (e) => {
    setSaveCard(e.target.checked);
  };

  return (
    <Form onFinish={onFormSubmit} layout="vertical" form={form}>
      <Item
        label={t("fields.name")}
        name="name"
        required
        rules={[{ required: true }]}
      >
        <Input size="large" />
      </Item>

      <Item
        initialValue={defaults.email}
        label={t("fields.email")}
        name="email"
        required
        rules={[{ type: "email", required: true }]}
      >
        <Input size="large" />
      </Item>

      <Item
        label={t("fields.phone")}
        name="phone"
        required
        validateTrigger={["onBlur", "onSubmit"]}
        rules={[{ required: true }, { validator: InputPhone.validator }]}
      >
        <InputPhone countries={["UA", "IL", "UK", "US"]} size="large" />
      </Item>

      <Item
        label={t("fields.password")}
        name="password"
        required
        rules={[{ required: true }]}
      >
        <Input size="large" type="password" />
      </Item>

      <div style={{ marginBottom: "15px" }}>
        {defaults && defaults.card ? (
          <Checkbox defaultChecked={saveCard} onChange={onSaveCardToggle}>
            {t("fields.save_card")}
          </Checkbox>
        ) : null}
      </div>

      <Button size="large" block type="primary" htmlType="submit">
        {t("buttons.sign_up")}
      </Button>
    </Form>
  );
}
