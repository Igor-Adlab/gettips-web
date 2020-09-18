import { List } from "antd";
import React from "react";
import CreditCard from "react-credit-cards";
import { useFela } from "react-fela";

const styles = {
  item: {
    margin: "0 auto",
  },
};

export function CardsList({ list = [], user = {} }) {
  const { css } = useFela();
  return (
    <List
      split={false}
      layout="vertical"
      dataSource={list}
      renderItem={(card) => (
        <List.Item bordered={false} className={css(styles.item)}>
          <CreditCard
            cvc=""
            preview
            expiry=""
            key={card.id}
            name={user.name || ""}
            number={card.masked.replace(/X/gim, "*")}
          />
        </List.Item>
      )}
    />
  );
}
