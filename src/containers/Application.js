import { Layout, Menu, Typography } from "antd";
import React from "react";
import { useFela } from "react-fela";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

import {
  ResponsiveContent,
  ResponsivePage,
} from "../components/common/ResponsivePage";
import { useUser } from "../hooks";

const { Header, Content } = Layout;

const styles = {
  layout: {
    height: "100vh",
  },
  header: {
    display: "flex",
    padding: "0 20px",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "none",

    "& .ant-typography": {
      flexGrow: 1,
    },
  },
  content: {
    background: "#fff",
  },
};

export function Application({ children }) {
  const { css } = useFela();
  const { t } = useTranslation();
  const history = useHistory();
  const { authenticated, signOut } = useUser();

  const onSignOut = () => signOut();
  const onAuth = (key) => history.push(`/u/${key}`);
  const onNavigate = (key) => history.push(`/${key}`);

  const onMenuItemSelected = ({ key }) => {
    switch (key) {
      case "landing":
        return onNavigate("");
      case "sign-in":
      case "sign-up":
        return onAuth(key);
      case "sign-out":
        return onSignOut();
      case "application":
      case "application/settings":
        return onNavigate(key);
      default:
        return;
    }
  };

  return (
    <ResponsivePage>
      <Layout className={css(styles.layout)}>
        {/* <Header className={css(styles.header)}>
                    <Typography.Title onClick={() => history.push('/')} level={4} style={{ color: '#fff', margin: 0, cursor: 'pointer' }}>
                        GetTips.online
                    </Typography.Title>
                    <Menu style={{ border: 'none', overflowY: 'auto' }} theme="dark" mode="horizontal" onSelect={onMenuItemSelected}>
                        {authenticated ? [
                            <MenuItem key="application">{t('navigation.home')}</MenuItem>,
                            <MenuItem key="application/settings">{t('navigation.settings')}</MenuItem>,
                            <MenuItem key="sign-out">{t('navigation.sign_out')}</MenuItem>,
                        ] : [
                            <MenuItem key="landing">{t('navigation.home')}</MenuItem>,
                            <MenuItem key="sign-in">{t('navigation.sign_in')}</MenuItem>,
                            <MenuItem key="sign-up">{t('navigation.sign_up')}</MenuItem>
                        ]}
                    </Menu>
                </Header> */}
        <ResponsiveContent>
          <Content
            style={{ position: "relative" }}
            id="responsive-page"
            className={css(styles.content)}
          >
            {children}
          </Content>
        </ResponsiveContent>
      </Layout>
    </ResponsivePage>
  );
}
