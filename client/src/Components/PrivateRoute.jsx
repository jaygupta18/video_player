// Packages

import React, { useContext } from "react";

import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";

import { Navigate } from "react-router-dom";

export default function PrivateRoute({ component: Component, target }) {
  const { isAuthorized } = useContext(AuthenticationContext);

  if (!isAuthorized) return <Navigate to={"/login"} />;
  return <Component target={target} />;
}
