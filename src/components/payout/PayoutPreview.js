import { Card, Divider, List } from "antd";
import formatter from "currency-formatter";
import { map } from "lodash";
import React, { useMemo } from "react";

import { PaymentDescription } from "../feed/PaymentNotificationCard";

const { Meta } = Card;

export function PayoutCard({ comment, payout, created_at }) {
  const description = useMemo(
    () => (
      <PaymentDescription
        created_at={created_at}
        description={comment}
        type="TRX_PAY_IN"
      />
    ),
    []
  );

  return (
    <Card style={{ width: "100%" }}>
      <Meta
        description={description}
        title={formatter.format(payout, { code: "UAH", format: "%v %s" })}
      />
    </Card>
  );
}

export function PayoutPreview({ total, currency = "uah", list }) {
  return (
    <>
      <List
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <PayoutCard {...item} key={item.id} />
          </List.Item>
        )}
      />
      <Divider>
        <span style={{ fontSize: "24px" }}>
          {formatter.format(total, {
            code: currency.toUpperCase(),
            format: "%v %s",
          })}
        </span>
      </Divider>
    </>
  );
}
