
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthenticationContextProvider from "./Contexts/AuthenticationContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthenticationContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </AuthenticationContextProvider>
);
