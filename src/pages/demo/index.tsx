/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { Card, Row, Col } from "antd";

import Recoil from "./recoil";
import Lelouch from "./img";

export default function Demo() {
  return (
    <React.Fragment>
      <Row gutter={16} css={{ minHeight: "calc(100vh - 64px)" }}>
        <Col span={8}>
          <Card title="recoil">
            <Recoil />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Image" bordered={false}>
            <Lelouch />
          </Card>
        </Col>
        {/* <Col span={8}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
        </Col> */}
      </Row>
    </React.Fragment>
  );
}
