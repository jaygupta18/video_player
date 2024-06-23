// Modules
const { Router } = require("express");

// Variables
const videosRouter = Router();
const {
  connectUsingMongoClient: connectClient,
} = require("../config/database");

// RESTful API's
videosRouter.get("/", async (req, res) => {
  let client;
  try {
    client = await connectClient();
    const videos = await client
      .db("youtube")
      .collection("videos")
      .find({})
      .toArray();

    return res.json({ data: videos });
  } catch (error) {
    throw new Error(`Could not find the target`, error.message);
  } finally {
    await client.close();
    console.log(`Database Connection Closed...`);
  }
});

videosRouter.get("/:id", async (req, res) => {
  let client;
  try {
    client = await connectClient();
    const video = await client
      .db("youtube")
      .collection("videos")
      .find({ id: req.params.id })
      .toArray();

    return res.json({ data: video });
  } catch (error) {
    throw new Error("Internal Server Error", error.message);
  } finally {
    await client.close();
    console.log("Database Connection Closed...");
  }
});

module.exports = videosRouter;
