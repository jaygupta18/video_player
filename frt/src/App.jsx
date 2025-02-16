// App.js
import React from "react";
import "./App.css";
import AllRoute from "./Components/AllRoute";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="content">
        <AllRoute />
      </div>
      <Footer />
    </>
  );
}