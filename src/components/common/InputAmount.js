import { Input, InputNumber, Select } from "antd";
import symbol from "currency-symbol-map";
import React, { useEffect, useState } from "react";

export function InputAmount({
  currencies = [],
  value = {},
  onChange,
  size,
  ...props
}) {
  const [amount, setAmount] = useState(value.amount || props.amount);
  const [currency, setCurrency] = useState(
    value.currency || props.currency || currencies[0]
  );

  useEffect(() => {
    console.log(
      "Currency change: ",
      value.currency || props.currency || currencies[0]
    );
    setCurrency(props.currency || currencies[0]);
  }, [props.currency, currencies]);

  useEffect(() => {
    console.log("Amount change: ", value.amount || props.amount);
    setAmount(props.amount);
  }, [props.amount]);

  useEffect(() => {
    onChange({ amount, currency });
  }, [amount, currency]);

  return (
    <Input.Group compact>
      <InputNumber
        value={amount}
        onChange={setAmount}
        style={{ width: "70%" }}
        min={10}
        step={5}
        size={size}
      />
      <Select
        value={currency}
        size={size}
        onChange={setCurrency}
        style={{ width: "30%" }}
      >
        {_.map(currencies, (currency) => (
          <Select.Option key={currency} value={currency}>
            {symbol(currency)}
          </Select.Option>
        ))}
      </Select>
    </Input.Group>
  );
}
