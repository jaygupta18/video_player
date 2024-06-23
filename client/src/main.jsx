// Packages
import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AuthenticationContextProvider from "./Contexts/AuthenticationContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthenticationContextProvider>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </AuthenticationContextProvider>
);
