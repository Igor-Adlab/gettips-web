import { Input } from "antd";
import React from "react";
import InputMask from "react-input-mask";

export function InputConfirmationCode(props) {
  return (
    <InputMask {...props} mask="999-999">
      {(props) => <Input {...props} type="tel" />}
    </InputMask>
  );
}
