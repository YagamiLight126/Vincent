import React from "react";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import zh_CN from "antd/lib/locale-provider/zh_CN";

import Router from "./routes";
import "./styles/normalize.less";

const container = document.getElementById("vincent");
const root = createRoot(container!);

root.render(
  <RecoilRoot>
    <ConfigProvider locale={zh_CN}>
      <Router />
    </ConfigProvider>
  </RecoilRoot>
);
