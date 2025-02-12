require("dotenv").config();
const express = require("express");
const videosRouter = require("./src/routes/videos");
const cors = require("cors");
const usersRouter = require("./src/routes/users");
const uploadRouter = require("./src/routes/upload");
const broadcastRouter = require("./src/routes/broadcast");
const mongoose = require("mongoose");
const MONGOOSE_URI = process.env.MONGOOSE_URI;
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(MONGOOSE_URI);
    console.log("Mongoose Connected...");
  } catch (error) {
    throw new Error(`Internal Server Error`, error.message);
  }
};

connectUsingMongoose();
app.use("/broadcast", broadcastRouter);
app.use("/streams", express.static("public/streams"));
io.on("connection", (socket) => {
  console.log("a user connected");

  // Handle WebRTC signaling
  socket.on("offer", (data) => {
    socket.to(data.broadcastId).emit("offer", data);
  });

  socket.on("answer", (data) => {
    socket.to(data.broadcastId).emit("answer", data);
  }); 
  socket.on("ice-candidate", (data) => {
    socket.to(data.broadcastId).emit("ice-candidate", data);
  });

  socket.on("joinBroadcast", (broadcastId) => {
    socket.join(broadcastId);
    socket.to(broadcastId).emit("viewerJoined", socket.id);
  });

  socket.on("leaveBroadcast", (broadcastId) => {
    socket.leave(broadcastId);
    socket.to(broadcastId).emit("viewerLeft", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
 
app.get("/", (req, res) => {
  res.status(200).send(`<h3>Homepage</h3>`);
});

app.use("/videos", videosRouter);
app.use("/user", usersRouter);
app.use("/uploads", uploadRouter);

server.listen(PORT, () => {
  console.log(`Server is UP & Running at PORT ${PORT}`);
});

module.exports = app;
