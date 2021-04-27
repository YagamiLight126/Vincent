import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

import Router from "./routes";
import "./styles/normalize.less";

ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <Router />
  </ConfigProvider>,
  document.getElementById("vincent")
);
