import { Button, Drawer, Typography } from "antd";
import React from "react";
import { useFela } from "react-fela";
import { useTranslation } from "react-i18next";
import QrReader from "react-qr-scanner";

const styles = {
  drawer: {
    "& .ant-drawer-body": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  reader: {
    flexGrow: 1,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& section": {
      height: "100%",
    },
    "& video": {
      height: "100%",
    },
  },
  footer: {
    textAlign: "center",
  },
};

export function QrScanner({ title, visible, onScanned, onClose }) {
  const { css } = useFela();
  const { t } = useTranslation();

  return (
    <Drawer
      getContainer={() => document.getElementById("responsive-page")}
      destroyOnClose
      onClose={onClose}
      height="100%"
      placement="bottom"
      style={{ position: "absolute" }}
      className={css(styles.drawer)}
      title={title || t("titles.scan_qr")}
      visible={visible}
    >
      <div className={css(styles.reader)}>
        <QrReader
          facingMode="rear"
          onError={(err) => console.log(err)}
          onScan={onScanned}
          style={{ width: "100%" }}
        />
      </div>
      <div className={css(styles.footer)}>
        <Button type="link" block onClick={onClose}>
          {t("buttons.close")}
        </Button>
      </div>
    </Drawer>
  );
}
