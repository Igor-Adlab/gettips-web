import { QrcodeOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Statistic } from "antd";
import formatter from "currency-formatter";
import React, { useState } from "react";
import { useFela } from "react-fela";
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";

import { ButtonLink } from "../../components/ButtonLink";
import { useUser } from "../../hooks";
import { useBalance } from "../../hooks/dashboard";

const styles = {
  container: {
    border: "none",
    borderRadius: 0,
    backgroundColor: "#1890ff",
    boxShadow:
      "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)",
  },
  balances: {
    display: "flex",
    marginBottom: "15px",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  statistic: (first) => ({
    flexGrow: first ? 1 : 0,
    marginRight: "15px",
    "& .ant-statistic-content-value": {
      color: "#fff",
      fontSize: first ? null : "16px",
    },
    "& .ant-statistic-title": {
      opacity: 0.7,
      color: "#fff",
    },
  }),
  toolbar: {
    display: "flex",
    flexDirection: "row",
  },
  drawer: {
    "& .ant-drawer-body": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  qr: {
    flexGrow: 1,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    textAlign: "center",
  },
};

export function Balance() {
  const { css } = useFela();
  const { user } = useUser();
  const { t } = useTranslation();
  const { isLoading, data } = useBalance();

  const [qr, setQr] = useState(false);

  const onQrOpen = () => setQr(true);
  const onQrClose = () => setQr(false);

  return (
    <>
      <Card
        hoverable
        loading={isLoading}
        className={css(styles.container) + " BalanceCard"}
      >
        {data && !isLoading ? (
          <>
            <div className={css(styles.balances)}>
              {data.balance.map((pair, index) => (
                <Statistic
                  title={index === 0 ? t("titles.available_balance") : null}
                  className={css(styles.statistic(index === 0))}
                  value={formatter.format(pair.value, {
                    format: "%v %s",
                    code: pair.currency.toUpperCase(),
                  })}
                />
              ))}
            </div>

            <div className={css(styles.toolbar)}>
              <Button.Group style={{ flexGrow: 1 }}>
                {data.balance && data.balance.length ? (
                  <ButtonLink ghost to="/payout">
                    {t("buttons.request_payout")}
                  </ButtonLink>
                ) : null}
                <ButtonLink ghost to="/transaction">
                  {t("buttons.send_tips")}
                </ButtonLink>
              </Button.Group>
              <Button onClick={onQrOpen} ghost icon={<QrcodeOutlined />}>
                {t("buttons.my_qr")}
              </Button>
            </div>
          </>
        ) : null}
      </Card>

      <Drawer
        getContainer={() => document.getElementById("responsive-page")}
        className={css(styles.drawer)}
        title={t("titles.personal_qr")}
        onClose={onQrClose}
        style={{ position: "absolute" }}
        visible={qr}
        placement="bottom"
        height="100%"
      >
        <div className={css(styles.qr)}>
          <QRCode size={300} value={user.id} />
        </div>
        <div className={css(styles.footer)}>
          <Button onClick={onQrClose} block type="link">
            {t("buttons.close")}
          </Button>
        </div>
      </Drawer>
    </>
  );
}
