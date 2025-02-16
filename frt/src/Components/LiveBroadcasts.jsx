import React, { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../Contexts/AuthenticationContextProvider.jsx";
import { Link } from "react-router-dom";

const LiveBroadcasts = () => {
  const [broadcasts, setBroadcasts] = useState([]);
  const { token } = useContext(AuthenticationContext);

  useEffect(() => {
    const fetchBroadcasts = async () => {
      try {
        const response = await fetch("http://localhost:8080/broadcast/active-broadcasts", {
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

    fetchBroadcasts();
  }, [token]);

  return (
    <div className="live-broadcasts">
      <h2>Live Broadcasts</h2>
      {broadcasts.length > 0 ? (
        <ul>
          {broadcasts.map((broadcast) => (
            <li key={broadcast.id}>
              <Link to={`/broadcast/${broadcast.id}`}>
                Broadcast ID: {broadcast.id} (Viewers: {broadcast.viewers})
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No live broadcasts available.</p>
      )}
    </div>
  );
};

export default LiveBroadcasts;
