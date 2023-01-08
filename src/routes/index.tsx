import React from "react";
import { Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import Demo from "../pages/demo";
import Layout from "./layout";
import { rootLoader } from "./loader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="vincent" id="root" element={<Layout />} loader={rootLoader}>
        <Route path="hello" element={<Demo />} />
      </Route>
      <Route path="*" element={<Navigate to="/vincent/hello" replace />} />
    </React.Fragment>
  )
);

export default function ToDoRouter() {
  return <RouterProvider router={router} />;
}
