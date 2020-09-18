import { Input, Select, Spin } from "antd";
import { countries as data } from "countries-list";
import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";
import React, { useEffect, useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";

const { Group } = Input;
const util = PhoneNumberUtil.getInstance();

export function InputPhone({
  loading = false,
  size,
  value = {},
  onChange,
  countries = [],
  ...props
}) {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(countries[0]);

  const list = useMemo(
    () =>
      _.chain(data)
        .pick(countries)
        .map((value, code) => ({ code, ...value }))
        .value(),
    [countries]
  );

  useEffect(() => {
    const info = country ? data[country] : {};

    const value = {
      phone,
      country: info,
      code: info.phone,
    };

    onChange(value);
  }, [phone, country]);

  return (
    <Spin spinning={loading}>
      <Group compact>
        <Select
          value={country}
          onChange={(value) => setCountry(value)}
          size={size}
          style={{ width: "30%" }}
        >
          {list.map((country) => (
            <Select.Option value={country.code}>
              <ReactCountryFlag
                svg
                countryCode={country.code}
                style={{ marginRight: "5px" }}
              />
              +{country.phone}{" "}
            </Select.Option>
          ))}
        </Select>
        <Input
          {...props}
          onChange={(e) => setPhone(e.target.value)}
          size={size}
          style={{ width: "70%" }}
          type="tel"
          value={value.phone}
        />
      </Group>
    </Spin>
  );
}

InputPhone.normalize = ({ phone, code }) => InputPhone.format(code, phone);

InputPhone.validator = (rule, { code, phone }) => {
  const valid = InputPhone.validate(code, phone);
  if (!valid) {
    return Promise.reject("Invalid phone");
  }

  return Promise.resolve();
};

InputPhone.prepare = (code, phone) =>
  phone.includes("+") ? phone : `+${code} ${phone}`;

InputPhone.format = (code, phone) => {
  const value = InputPhone.prepare(code, phone);

  try {
    const parsed = util.parse(value);
    return util.format(parsed, PhoneNumberFormat.INTERNATIONAL);
  } catch (e) {
    console.log(e);
    return "";
  }
};

InputPhone.validate = (code, phone) => {
  const value = InputPhone.prepare(code, phone);

  try {
    const parsed = util.parse(value);
    return util.isValidNumber(parsed) ? value : false;
  } catch (e) {
    return false;
  }
};
