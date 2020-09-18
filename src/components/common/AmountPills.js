import { Tag } from "antd";
import React from "react";

export function AmountPills({ values = [], onSelect, currency }) {
  return (
    <div>
      {values.map((num) => (
        <Tag
          style={{ padding: "2px 24px" }}
          color="blue"
          onClick={() => onSelect(num)}
        >
          {`${num} ${currency}`}
        </Tag>
      ))}
    </div>
  );
}
