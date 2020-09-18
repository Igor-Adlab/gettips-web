import { EllipsisOutlined } from "@ant-design/icons";
import { List } from "antd";
import React from "react";
import { useFela } from "react-fela";

import { PaymentNotificationCard } from "./PaymentNotificationCard";

const styles = {
  list: {
    padding: "0 15px",

    "& .ant-card-body": {
      padding: "10px",
    },
  },
};

export function PaymentsFeed({ list = [], loading }) {
  const { css } = useFela();

  return (
    <List
      split={false}
      layout="vertical"
      loading={loading}
      dataSource={list}
      itemLayout="horizontal"
      className={css(styles.list)}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <PaymentNotificationCard item={item} />
        </List.Item>
      )}
    />
  );
}
