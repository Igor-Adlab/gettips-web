import { Layout } from "antd";
import React from "react";

const style = {};
const { Content, Header, Footer } = Layout;

export function MobileView({ title, children }) {
  return (
    <Layout>
      <Header>{title}</Header>
      <Content>{children}</Content>
      <Footer>...</Footer>
    </Layout>
  );
}
