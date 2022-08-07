import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Hello from "../pages/hello";

export default function ToDoRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="vincent">
          <Route path="hello" element={<Hello />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
