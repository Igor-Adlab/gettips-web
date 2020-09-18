import React, { useEffect, useState } from "react";
import { queryCache } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";

import { PhoneConfirmationForm } from "../../../components/auth/PhoneConfirmationForm";
import { usePayoutPreview } from "../../../hooks/payout";

export function Confirm() {
  const history = useHistory();
  const { params } = useRouteMatch();
  const [info, setInfo] = useState();

  const [preview, { isLoading }] = usePayoutPreview({
    onSuccess: (data) => {
      queryCache.setQueryData(["payout.preview", params.code], data);

      return history.push(`/payout/preview/${params.code}`);
    },
  });

  useEffect(() => {
    const cached = queryCache.getQueryData(["payout.info", params.code]);
    if (!cached) {
      return history.push("/payout");
    }

    setInfo(cached);
  }, [params.code]);

  const onConfirmPhone = (data) => preview(data);

  if (!info) {
    return null;
  }

  return (
    <PhoneConfirmationForm
      size="large"
      payout={info.payout}
      loading={isLoading}
      onSubmit={onConfirmPhone}
      confirmation={info.confirmation}
    />
  );
}
