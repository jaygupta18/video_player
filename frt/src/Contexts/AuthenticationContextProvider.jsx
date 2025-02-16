import React, { createContext, useState, useEffect } from "react";
export const AuthenticationContext = createContext();
import { getUser } from "../API/fetchData";
const base="http://localhost:8080";
export default function AuthenticationContextProvider({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [query, setQuery] = useState(() => {
    const savedQuery = localStorage.getItem('searchQuery') || ''; 
    return savedQuery;
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastId, setBroadcastId] = useState(null);
  const [broadcasts, setBroadcasts] = useState([]);

const fetchBroadcasts = async () => {
  try {
    const response = await fetch(`${base}/broadcast/active-broadcasts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data.broadcasts);
    setBroadcasts(data.broadcasts);
  } catch (error) {
    console.error("Error fetching live broadcasts:", error);
  }
};
  const login = (response) => {
    setName(response.data.name);
    setEmail(response.data.email);
    setIsAuthorized(true);
  }; 
  const logout = () => {
    localStorage.removeItem("authToken"); 
    setEmail("");
    setName("");
    setToken("");
    setIsAuthorized(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        setToken(token);
        try {
          const res = await getUser(token); 
          login(res); 
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchUser();
  }, [token]);

  useEffect(() => {
    localStorage.setItem('searchQuery', query); 
  }, [query]);


  const startBroadcast = async () => {
    try {
      const response = await fetch(`${base}/broadcast/start`, {
        method: "POST",
      });
      const data = await response.json();
      console.log(data)
      setBroadcastId(data.broadcastId);
      setIsBroadcasting(true);
    } catch (error) {
      console.error("Error starting broadcast:", error);
    }
  };

  const endBroadcast = async () => {
    console.log(broadcastId) 
    try {
      
      await fetch(`${base}/broadcast/end`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ broadcastId }),
      });  
      setBroadcastId(null);
      setIsBroadcasting(false);
      
    } catch (error) {
      console.error("Error ending broadcast:", error);
    }
  }; 

  const authValue = {
    isAuthorized,
    setIsAuthorized,
    token,
    login,
    logout,
    query,
    setQuery,
    name,
    setName,
    email,
    setEmail,
    isBroadcasting,
    broadcastId,
    startBroadcast,
    endBroadcast,
    fetchBroadcasts
  };

  return (
    <AuthenticationContext.Provider value={authValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}
