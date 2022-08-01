import React from "react";
import { Alert } from "antd";
import styled from "@emotion/styled";

const Button = styled.button`
  background-color: yellow;
`;

export default function Hello() {
  return (
    <>
      <Button>Hello world</Button>
      <Alert type="info" message="welcome" banner />
    </>
  );
}
