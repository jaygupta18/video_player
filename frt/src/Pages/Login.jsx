import React, { useState, useContext } from "react";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";
import LoginComponent from "../Components/LoginComponent";
import LogoutComponent from "../Components/LogoutComponent";
import RegisterComponent from "../Components/RegisterComponent";
import "../style/LoginPage.css";
export default function Login() {
  const { isAuthorized } = useContext(AuthenticationContext);
  const [activeTab, setActiveTab] = useState("login"); // State to track the active tab
  if (isAuthorized) {
    return <LogoutComponent />;
  }
  return (
    <div className="login">
      <div className="tab-container">
        <button
          className={`tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Login User
        </button>
        <button
          className={`tab ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Register User
        </button>
      </div>
      <div className="tab-content">
        <div className={`login-tab ${activeTab === "login" ? "active" : ""}`}>
          <LoginComponent />
        </div>
        <div className={`register-tab ${activeTab === "register" ? "active" : ""}`}>
          <RegisterComponent />
        </div>
      </div>
    </div>
  );
} 

