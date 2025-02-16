import React, { useContext } from "react";
import "../style/Logout.css"; 
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";

const LogoutComponent = () => {
  const { logout } = useContext(AuthenticationContext);
  const { email, name } = useContext(AuthenticationContext);
  const fullName = name.split(" ");
  return (
    <div className="logout-div">
      <div className="user-info">
        <div className="avatar" title="User Initials">
          {fullName.length > 1 ? fullName[0][0] + fullName[1][0] : "?"}
        </div>
        <div className="user-name">{name}</div>
      </div>

      <hr className="divider" />

      <div className="signed-in">
        Signed In as: <strong>{email}</strong>
      </div>
      <button
        className="logout-button"
        onClick={logout}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default LogoutComponent;
