import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./assets/css/style.scss";
import "./assets/vendors/ti-icons/css/themify-icons.css";
import "./assets/vendors/base/vendor.bundle.base.css";
import { PermissionProvider } from "./context/PermissionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PermissionProvider>
      <RouterProvider router={router} />
    </PermissionProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
