import React from "react";
import { Layout } from "antd";
import styled from "@emotion/styled";
import { Outlet } from "react-router";

const { Header, Content } = Layout;
const BrandName = styled.div`
  color: white;
`;

export default function VincentLayout() {
  return (
    <Layout>
      <Header>
        <BrandName>Vincent</BrandName>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
