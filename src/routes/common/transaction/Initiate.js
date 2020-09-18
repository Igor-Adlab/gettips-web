import { QrcodeOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Tooltip, message } from "antd";
import { useForm } from "antd/es/form/Form";
import symbol from "currency-symbol-map";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFela } from "react-fela";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { AmountPills } from "../../../components/common/AmountPills";
import { InputAmount } from "../../../components/common/InputAmount";
import { InputPhone } from "../../../components/common/InputPhone";
import { QrScanner } from "../../../components/common/QrScanner";
import { CardsSelector } from "../../../containers/cards/CardSelector";
import config from "../../../data/config.json";
import { useUser } from "../../../hooks";
import { useInitializeTransaction } from "../../../hooks/transaction";

const styles = {
  form: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  fields: {
    flexGrow: 1,
  },
};
const { Item } = Form;
const { TextArea } = Input;

export function Initiate({ size = "large" }) {
  const form = useRef();
  const { css } = useFela();
  const history = useHistory();
  const { t } = useTranslation();
  const { authenticated } = useUser();

  const [sign, setSign] = useState();
  const [token, setToken] = useState(null);
  const [amount, setAmount] = useState(10);
  const [country, setCountry] = useState({});

  const currency = useMemo(
    () =>
      (country.currency || "").includes(",")
        ? country.currency.split(",")[0]
        : country.currency,
    [country]
  );

  const [initialize, { isLoading }] = useInitializeTransaction({
    onSuccess: ({ data }) => {
      history.push(
        data.status === "payed"
          ? `/transaction/status/${data.id}`
          : `/transaction/widget/${data.id}`
      );
    },
  });

  const onFormSubmit = ({ receiver, amount, ...values }) => {
    const data = Object.assign(
      values,
      { receiver: InputPhone.normalize(receiver) },
      { amount: amount.amount, currency: amount.currency },
      token ? { token } : {}
    );
    // message.error("errors.check_data")

    return initialize(data);
  };

  return (
    <Form
      ref={form}
      layout="vertical"
      onFinish={onFormSubmit}
      className={css(styles.form)}
      onValuesChange={(updates, values) => {
        console.log(values.amount);

        setCountry(values.receiver.country);
        setSign(symbol(values.amount.currency));
      }}
    >
      <div className={css(styles.fields)}>
        <Item
          label={t("fields.phone")}
          name="receiver"
          required
          rules={[{ required: true }, { validator: InputPhone.validator }]}
          validateTrigger={["onBlur", "onSubmit"]}
        >
          <InputPhone countries={config.countries} size="large" />
        </Item>
        <Item
          label={t("fields.amount")}
          name="amount"
          initialValue={{ currency, amount }}
          required
          style={{ marginBottom: "10px" }}
          validateTrigger={["onBlur", "onSubmit"]}
        >
          <InputAmount
            amount={amount}
            currency={currency}
            currencies={config.currencies}
            size="large"
          />
        </Item>
        <Item>
          <AmountPills
            currency={sign}
            values={config.pills}
            onSelect={setAmount}
          />
        </Item>
        <Item
          label={t("fields.comment")}
          name="comment"
          validateTrigger={["onBlur", "onSubmit"]}
        >
          <TextArea size="large" />
        </Item>

        {authenticated && (
          <Item label={t("fields.use_card")}>
            <CardsSelector loader={false} onSelect={setToken} />
          </Item>
        )}
      </div>

      <Button
        loading={isLoading}
        size="large"
        block
        htmlType="submit"
        type="primary"
      >
        {t("buttons.pay")}
      </Button>
    </Form>
  );
}
