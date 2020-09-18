import {
  CheckCircleOutlined,
  SyncOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Result, Typography } from "antd";
import React, { useMemo, useState } from "react";
import { useFela } from "react-fela";
import { useTranslation } from "react-i18next";

import { useTransactionStatus } from "../../hooks/transaction";

const colors = {
  red: "#ff4d4f",
  blue: "#1890ff",
  green: "#52c41a",
  yellow: "#faad14",
};

const styles = {
  icon: {
    fontSize: "120px",
  },
  status: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
};

export function StatusCheck({
  transaction,
  onSuccess,
  onError,
  interval = 3000,
}) {
  const { css } = useFela();
  const { t } = useTranslation();
  const [fetched, setFetched] = useState();

  const status = useTransactionStatus(
    { transaction },
    {
      enabled: !fetched,
      refetchInterval: interval,
      onSuccess: ({ data }) => {
        if (data !== "initialized") {
          setFetched(true);
        }

        switch (data) {
          case "payed":
            return onSuccess && onSuccess(transaction);
          case "warning":
            return onError && onError(transaction);
          default:
            return;
        }
      },
    }
  );

  const icon = useMemo(() => {
    if (!status.data) {
      return (
        <SyncOutlined
          className={css(styles.icon)}
          spin
          style={{ color: colors.blue }}
        />
      );
    }

    switch (status.data.data) {
      case "payed":
        return (
          <CheckCircleOutlined
            className={css(styles.icon)}
            style={{ color: colors.green }}
          />
        );
      case "warning":
        return (
          <WarningOutlined
            className={css(styles.icon)}
            style={{ color: colors.yellow }}
          />
        );
      default:
        return (
          <SyncOutlined
            className={css(styles.icon)}
            spin
            style={{ color: colors.blue }}
          />
        );
    }
  }, [status.data]);

  const text = useMemo(() => {
    if (!status.data) {
      return t("texts.status_check.pending.title");
    }

    switch (status.data.data) {
      case "payed":
        return t("texts.status_check.payed.title");
      case "warning":
        return t("texts.status_check.warning.title");
      default:
        return t("texts.status_check.pending.title");
    }
  }, [status.data]);

  const secondary = useMemo(() => {
    if (!status.data) {
      return null;
    }

    switch (status.data.data) {
      case "payed":
        return t("texts.status_check.payed.description");
      case "warning":
        return t("texts.status_check.warning.description");
      default:
        return null;
    }
  }, [status.data]);

  if (status.isError) {
    return (
      <div className={css(styles.status)}>
        <Result
          status="404"
          subTitle={t("texts.status_check.not_found.title")}
        />
      </div>
    );
  }

  return (
    <div>
      <div className={css(styles.status)}>
        {icon}
        <br />
        <Typography.Title level={4}>{text}</Typography.Title>
        {secondary && (
          <Typography.Paragraph secondary>{secondary}</Typography.Paragraph>
        )}
      </div>
    </div>
  );
}
