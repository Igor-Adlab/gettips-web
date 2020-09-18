import React from "react";

const icons = {
  visa: require("payment-icons/min/flat/visa.svg").default,
  amex: require("payment-icons/min/flat/amex.svg").default,
  diners: require("payment-icons/min/flat/diners.svg").default,
  discover: require("payment-icons/min/flat/discover.svg").default,
  elo: require("payment-icons/min/flat/elo.svg").default,
  hipercard: require("payment-icons/min/flat/hipercard.svg").default,
  jcb: require("payment-icons/min/flat/jcb.svg").default,
  paypal: require("payment-icons/min/flat/paypal.svg").default,
  unionpay: require("payment-icons/min/flat/unionpay.svg").default,
  default: require("payment-icons/min/flat/default.svg").default,
  verve: require("payment-icons/min/flat/verve.svg").default,
  alipay: require("payment-icons/min/flat/alipay.svg").default,
  maestro: require("payment-icons/min/flat/maestro.svg").default,
  mastercard: require("payment-icons/min/flat/mastercard.svg").default,
};

export function CardProviderIcon({ type, children, ...props }) {
  const transformed = React.useMemo(() => type.toLowerCase(), [type]);
  return (
    <img
      alt={transformed}
      {...props}
      height="16px"
      src={icons[transformed] || icons.default}
    />
  );
}
