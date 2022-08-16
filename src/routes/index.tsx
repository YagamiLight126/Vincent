import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Demo from "../views/demo";
import Layout from "../views/layout";

export default function ToDoRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="vincent" element={<Layout />}>
          <Route path="hello" element={<Demo />} />
        </Route>
        <Route path="*" element={<Navigate to="/vincent/hello" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
