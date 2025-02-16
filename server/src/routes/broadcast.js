const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Auth = require("../config/Auth.js");
// Store active broadcasts
const activeBroadcasts = new Map();

router.post("/start", (req, res) => {
  const broadcastId = uuidv4();
  activeBroadcasts.set(broadcastId, {
    id: broadcastId,
    viewers: new Set(),
  });



  res.status(200).json({broadcastId});
});

router.post("/end", (req, res) => {
  const { broadcastId } = req.body;
 
  if (activeBroadcasts.has(broadcastId)) {
    activeBroadcasts.delete(broadcastId);
    res.status(200).json({ message: "Broadcast ended" });
  } else {
    res.status(404).json({ error: "Broadcast not found" });
  }
});

router.post("/join", Auth, (req, res) => {
  const { broadcastId } = req.body;

  if (activeBroadcasts.has(broadcastId)) {
    const broadcast = activeBroadcasts.get(broadcastId);
    broadcast.viewers.add(req.user.id) 
    io.to(broadcastId).emit("viewerJoined", req.user.id);
    res.status(200).json({ message: "Joined broadcast successfully" });
  } else {
    res.status(404).json({ error: "Broadcast not found" });
  }
});


router.get("/active-broadcasts", (req, res) => {
  const broadcasts = Array.from(activeBroadcasts.values()).map((broadcast) => ({
    id: broadcast.id,
    viewers: broadcast.viewers.size,
  }));
  res.status(200).json({ broadcasts });
});

router.get("/stream/:broadcastId", (req, res) => {
  const { broadcastId } = req.params;
 
  if (activeBroadcasts.has(broadcastId)) {
    console.log({broadcastId});
    const streamUrl = `http://localhost:8080/streams/${broadcastId}.m3u8`; 
    res.status(200).json({ streamUrl });
  } else {
    res.status(404).json({ error: "Broadcast not found" });
  }
}); 
module.exports = router;  
    