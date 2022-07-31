import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Hello from "../pages/hello";
import Test from "../pages/test";

export default function ToDoRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hello" element={<Hello />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<Navigate to="test" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
