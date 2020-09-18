import {
  CreditCardOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  MessageOutlined,
  PhoneFilled,
  QuestionCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import formatter from "currency-formatter";
import moment from "moment";
import React, { useMemo } from "react";
import { useFela } from "react-fela";

const tips = {
  TRX_PAYOUT: "Вывод на карту",
  TRX_PAYMENT: "Отправкка чаевых",
  TRX_PAY_IN: "Зачисление чаевых",
};

function view(type) {
  switch (type) {
    case "TRX_PAYMENT":
      return <UploadOutlined style={{ color: "#ffc104", fontSize: 24 }} />;
    case "TRX_PAY_IN":
      return <DownloadOutlined style={{ color: "#1890ff", fontSize: 24 }} />;
    case "TRX_PAYOUT":
      return <CreditCardOutlined style={{ color: "#52c41a", fontSize: 24 }} />;
    default:
      return <QuestionCircleOutlined style={{ fontSize: 24 }} />;
  }
}

const styles = {
  description: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

export function PaymentDescription({ description, type, created_at }) {
  const { css } = useFela();
  const text = useMemo(
    () =>
      type === "TRX_PAY_IN" ? (
        description ? (
          description
        ) : (
          <small>No comment...</small>
        )
      ) : (
        description
      ),
    [description]
  );

  const Icon = useMemo(
    () => (type === "TRX_PAY_IN" ? MessageOutlined : PhoneFilled),
    [type]
  );

  return (
    <div className={css(styles.description)}>
      <div>
        <Icon style={{ marginRight: "5px" }} />
        {text}
      </div>
      <div>
        <small>{moment(created_at).format("L LT")}</small>
      </div>
    </div>
  );
}

export function PaymentNotificationCard({ item }) {
  const data = useMemo(() => item.data, [item]);

  const type = useMemo(() => data.type, [data.type]);
  const amount = useMemo(() => data.amount, [data.amount]);
  const icon = useMemo(
    () => (
      <Tooltip placement="right" title={tips[type]}>
        {view(data.type)}
      </Tooltip>
    ),
    [data.type]
  );

  const description = useMemo(
    () => (
      <PaymentDescription
        created_at={data.created_at}
        description={data.phone}
        type={type}
      />
    ),
    [data.phone]
  );

  return (
    <Card hoverable style={{ width: "100%" }}>
      <Card.Meta
        avatar={icon}
        description={description}
        title={formatter.format(amount, { code: "UAH", format: "%v %s" })}
      />
    </Card>
  );
}
