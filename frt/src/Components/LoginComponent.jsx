import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";
import { loginUser } from "../API/fetchData";
import "../style/Login.css";

const LoginComponent = () => {
   const { login } = useContext(AuthenticationContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
   const { setEmail, isAuthorized, setIsAuthorized, setName } = useContext(AuthenticationContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await loginUser(credentials);
    if (response.data.accessToken) {
        localStorage.setItem("authToken", response.data.accessToken); 
       setName(response.data.name);
       setEmail(response.data.email);
       setIsAuthorized(true);
    } else {
      console.log("Login failed");
    }
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
      }, 1500);
    }
  }, [submitted]);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-control">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">
          LOGIN
        </button>
      </form>

      {submitted && !isAuthorized && (
        <p className="error-message">User Not Found</p>
      )}
    </div>
  );
};

export default LoginComponent;
