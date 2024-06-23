// Packages
import React, { createContext, useState } from "react";

// Creating Authentication context for validating if the user is logged in
export const AuthenticationContext = createContext();

// Creating the Authentication Provider Component for validating the user Authentication state
export default function AuthenticationContextProvider({ children }) {
  // Creating Hooks for setting Authentication state
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Defining the default state of the user
  const authValue = {
    isAuthorized,
    setIsAuthorized,
    query,
    setQuery,
    name,
    setName,
    email,
    setEmail,
  };

  return (
    <AuthenticationContext.Provider value={authValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}
