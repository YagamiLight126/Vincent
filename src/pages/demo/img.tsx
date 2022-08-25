/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";

import Lelouch from "../../../assets/lelouch.jpeg";

export default function ImageDemo() {
  return (
    <div css={{ width: "100%" }}>
      <img width="100%" src={Lelouch} />
    </div>
  );
}
