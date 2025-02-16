import { useState, useEffect } from "react";
import "../style/Register.css";
import { registerUser } from "../API/fetchData";
import { useNavigate } from "react-router-dom";
import LoginComponent from "./LoginComponent";

const RegisterComponent = () => {
  const navigate=useNavigate();
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await registerUser(details); 
    console.log(response)
    setResponse(response);
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        navigate("/login");
        setSubmitted(false);
      }, 1500);
    }
  }, [submitted]);

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={details.name}
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={details.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={details.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          REGISTER
        </button>
      </form>

      {submitted && (
        <div className="response-message">
          <p style={{ color: response.email ? "black" : "red" }}>
            Registered , Please Login!
          </p>
        </div>    
      )}
      
      
    </div>
  );
};

export default RegisterComponent;
