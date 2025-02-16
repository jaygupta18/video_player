import React, { useState, useContext, useEffect } from "react";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoMicOutline } from "react-icons/io5";
import { MdCloudUpload, MdLiveTv } from "react-icons/md";
import { LuCircleUserRound } from "react-icons/lu";
import DrawerComponent from "./DrawerComponent";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { query, setQuery, isBroadcasting, broadcastId, startBroadcast, endBroadcast } = useContext(AuthenticationContext);
  const [isListening, setIsListening] = useState(false); // State to track if mic is active
  const navigate = useNavigate();
  const [recognition, setRecognition] = useState(null);
  useEffect(() => {
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false; // Stop after one sentence
      recognitionInstance.interimResults = false; // Only final results
      recognitionInstance.lang = "en-US"; // Set language

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Get the transcribed text
        setQuery(transcript); // Update the search query
        setIsListening(false); // Stop listening
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event);
        setIsListening(false); // Stop listening on error
      };

      recognitionInstance.onend = () => {
        setIsListening(false); // Stop listening when the session ends
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn("Speech recognition not supported in this browser.");
    }
  }, []);

  const handleMicClick = () => {
    if (recognition) {
      if (!isListening) {
        recognition.start(); // Start listening
        setIsListening(true);
      } else {
        recognition.stop(); // Stop listening
        setIsListening(false);
      }
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleGolive = () => {
    startBroadcast();
    navigate("/live");
  };

  return (
    <div className="navbar">
      <div className="sidenav">
        <DrawerComponent />
        <Link to="/">
          <img className="logo" src="/assets/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="search-bar">
        <div className="input-group">
          <input
            className="search-input"
            onChange={handleChange}
            type="text"
            placeholder="Search"
            value={query}
          />
          <Link className="search-icon" to={`search/${query}`}>
            <BsSearch />
          </Link>
        </div>
        <button className={`mic-button ${isListening ? "active" : ""}`} onClick={handleMicClick}>
          <IoMicOutline />
        </button>
      </div>
      <div className="actions">
        <div className="menu-column">
          <button className="menu-button">
            <Link to="/upload">
              <MdCloudUpload />
            </Link>
          </button>
          <button className="menu-button" onClick={handleGolive}>
            <MdLiveTv />
          </button>
          <button className="menu-button">
            <Link to="/login">
              <LuCircleUserRound />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}