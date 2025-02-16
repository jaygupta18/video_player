import React, { useContext, useEffect, useReducer, useState } from "react";
import { homeReducer, homeInitState, getHomePageData } from "../API/fetchData";
import Cards from "../Components/Cards";
import "../style/Home.css";
import SideLinks from "../Components/SideLinks";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";
import { BsMenuUp } from "react-icons/bs"; 
import axios from "axios"; 
import { io } from "socket.io-client";  

export default function Home() {
  const { setQuery } = useContext(AuthenticationContext);
  const [state, dispatch] = useReducer(homeReducer, homeInitState);
  const [socket, setSocket] = useState(null);

  const API_KEY = 'AIzaSyABeSbWgFpBVfSEe3N74cm2AVk8X_VcyWg';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3';

  const func = async function () {
    try {
      const response = await axios.get(`${BASE_URL}/search`, {
        params: {
          key: API_KEY,
          part: 'snippet',
          maxResults: 10,
          q: 'trending',
          type: 'video',
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHomePageData(dispatch);
    setQuery("");
    func(); 
    const newSocket = io("http://localhost:8080"); 
    setSocket(newSocket);
    newSocket.on("userJoined", (message) => {
      console.log(message);
    });
    newSocket.emit("joinChannel", "general");
    return () => newSocket.disconnect();
  }, []); 
  if (state.loading) {
    return (
      <div className="loading-data">
        <img src="/assets/loading.gif" alt="Loading data..." />
      </div>
    );
  }

  return (
    <div className="home">
      <div className="side">
        <SideLinks />
      </div>
      <div className="videos">
        {state.data.map((video) => (
          <Cards {...video} key={video._id} target="videos" />
        ))}
      </div>
    </div>
  );
}


