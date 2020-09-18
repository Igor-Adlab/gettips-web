import { Card } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useFela } from "react-fela";

import { CardsSelector } from "../../containers/cards/CardSelector";
import { isUser } from "../../guards";
import { useUser } from "../../hooks";

const styles = {
  header: {
    border: "none",
    borderRadius: 0,
  },
};

export function Cards() {
  const { user } = useUser();
  const { css } = useFela();
  const [selected, setSelected] = useState(null);

  const onCardSelect = (token, card) => setSelected(card);

  return (
    <>
      <Card className={css(styles.header)}>
        <CardsSelector onSelect={onCardSelect} />
      </Card>
    </>
  );
}

export default isUser({ redirect: "/u/sign-in" })(Cards);
