import { Select } from "antd";
import { find } from "lodash";
import React, { useEffect, useMemo, useState } from "react";

import { CardProviderIcon } from "../../components/cards/CardProviderIcon";
import { useUser } from "../../hooks";
import { useCardsList } from "../../hooks/cards";

const { Option } = Select;

function CardDropdownSelector({ token, onSelect, loading, list }) {
  const onItemSelected = (token) => {
    const selected = find(list, { token });

    return onSelect(selected);
  };

  return (
    <Select
      defaultActiveFirstOption
      value={token}
      onSelect={onItemSelected}
      style={{ width: "100%" }}
      size="large"
      loading={loading}
    >
      {list.map((card) => (
        <Option key={card.id} value={card.token}>
          <CardProviderIcon style={{ marginRight: "10px" }} type={card.type} />
          {card.masked}
        </Option>
      ))}
    </Select>
  );
}

export function CardsSelector({ onSelect, loader }) {
  const { user } = useUser();
  const [selected, setSelected] = useState(null);

  const { data, isLoading, isFetched } = useCardsList();
  const token = useMemo(() => (selected ? selected.token : null), [selected]);

  useEffect(() => {
    onSelect(token, selected);
  }, [selected]);

  if (!isFetched) {
    return null;
  }

  return (
    <CardDropdownSelector
      loading={isLoading}
      user={user}
      token={token}
      onSelect={setSelected}
      list={data || []}
    />
  );
}
