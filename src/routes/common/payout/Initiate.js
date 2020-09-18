import { Button, Form, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useTranslation } from "react-i18next";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";

import { InputPhone } from "../../../components/common/InputPhone";
import { useUser } from "../../../hooks";
import { useInitiatePayout } from "../../../hooks/payout";

const { Item } = Form;

function InitiateForm({ onSubmit, phone }) {
  const [form] = useForm();
  const { t } = useTranslation();

  const onInitializationFormSubmit = ({ phone: { code, phone } }) => {
    form
      .validateFields()
      .then(onSubmit({ phone: InputPhone.format(code, phone) }))
      .catch((error) => message.error("errors.check_data"));
  };

  return (
    <Form layout="vertical" onFinish={onInitializationFormSubmit} form={form}>
      <Item
        initialValue={phone}
        label={t("fields.phone")}
        name="phone"
        required
        validateTrigger={["onBlur", "onSubmit"]}
        rules={[{ required: true }, { validator: InputPhone.validator }]}
      >
        <InputPhone countries={["UA", "IL", "UK", "US"]} size="large" />
      </Item>

      <Button block type="primary" size="large" htmlType="submit">
        {t("buttons.submit")}
      </Button>
    </Form>
  );
}

export function Initiate() {
  const history = useHistory();
  const { phone, authenticated, loading } = useUser();

  const [initiate, { isLoading }] = useInitiatePayout({
    onSuccess: ({ data }) => {
      const payout = data.payout.id;
      queryCache.setQueryData(["payout.info", payout], data);

      history.push(`/payout/id-${payout}`);
    },
  });

  const onInitiate = (request) => initiate(request);

  if (authenticated && loading) {
    return <Spin />;
  }

  return (
    <InitiateForm phone={phone} loading={isLoading} onSubmit={onInitiate} />
  );
}
