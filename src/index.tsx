import React from "react";
import { RecoilRoot } from "recoil";
import { createRoot } from "react-dom/client";

import Router from "./routes";
import "./styles/normalize.less";

const container = document.getElementById("vincent");
const root = createRoot(container!);

root.render(
  <RecoilRoot>
    <Router />
  </RecoilRoot>
);
