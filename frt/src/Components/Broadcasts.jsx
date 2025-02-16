import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider";
import "../style/LiveStream.css";

const socket = io("https://video-player-server-w49h.onrender.com");

const Broadcast = () => {
  const { broadcastId, endBroadcast } = useContext(AuthenticationContext);
  const [stream, setStream] = useState(null);
  const userVideoRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Request camera and microphone access
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
          userVideoRef.current.currentTime = 0; 
        }

        socket.emit("joinBroadcast", broadcastId);
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    
    return () => {
    
      socket.emit("leaveBroadcast", broadcastId);

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [broadcastId]);

  const handleEndLive = () => {
   
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());}
    endBroadcast();
    navigate("/");
  };

  return (
    <div className="live-stream-container">
      <h1>Live Streaming</h1>
      <video ref={userVideoRef} autoPlay muted controls className="live-video" />
      <button className="end-live-button" onClick={handleEndLive}>
        End Live
      </button>
    </div>
  );
};

export default Broadcast;