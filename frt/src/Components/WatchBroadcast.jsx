import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

const WatchBroadcast = () => {
  const { broadcastId } = useParams();
  const videoRef = useRef();
  const peerConnection = useRef(new RTCPeerConnection());

  useEffect(() => {
    console.log("🔵 Joining broadcast:", broadcastId);
    socket.emit("joinBroadcast", broadcastId);

    socket.on("offer", async ({ offer }) => {
      console.log("📡 Offer received:", offer);
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      console.log("🎥 Sending answer...");
      socket.emit("answer", { broadcastId, answer });
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      console.log("❄️ ICE Candidate received");
      await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    peerConnection.current.ontrack = (event) => {
      console.log("🎬 Track received:", event.streams[0]);
      videoRef.current.srcObject = event.streams[0];
    };

    return () => {
      console.log("🚪 Leaving broadcast:", broadcastId);
      socket.emit("leaveBroadcast", broadcastId);
      peerConnection.current.close();
    };
  }, [broadcastId]);

  return (
    <div>
      <h2>Watching Broadcast</h2>
      <video ref={videoRef} autoPlay controls />
    </div>
  );
};

export default WatchBroadcast;
