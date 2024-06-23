// Modules
require("dotenv").config();
const express = require("express");
const videosRouter = require("./src/routes/videos");
const cors = require("cors");
const usersRouter = require("./src/routes/users");
const uploadRouter = require("./src/routes/upload");

// Variables
const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// RESTful API's
app.get("/", (req, res) => {
  res.status(200).send(`<h3>Homepage</h3>`);
});

app.use("/videos", videosRouter);
app.use("/user", usersRouter);
app.use("/uploads", uploadRouter);

// Server
app.listen(PORT, () => {
  console.log(`Server is UP & Running at PORT ${PORT}`);
});

module.exports = app;
