// Modules
const { Router } = require("express");
const {
  connectUsingMongoClient,
  connectUsingMongoose,
} = require("../config/database");
const { validationResult } = require("express-validator");

// Variables
const uploadRouter = Router();
const validationArray = require("../config/validationArray");
const mongoose = require("mongoose");
const videoModel = require("../models/videos");

uploadRouter.get("/email/:email", async (req, res) => {
  let client;
  try {
    client = await connectUsingMongoClient();
    const { email } = req.params;
    const videos = await client
      .db("youtube")
      .collection("uploads")
      .find({ email: email })
      .toArray();

    return res.json({ message: `Uploads of ${email}`, videos });
  } catch (error) {
    throw new Error("Something went wrong", error.message);
  } finally {
    await client.close();
  }
});

uploadRouter.get("/id/:id", async (req, res) => {
  let client;
  try {
    client = await connectUsingMongoClient();
    const { id } = req.params;
    const videos = await client
      .db("youtube")
      .collection("uploads")
      .find({ id: id })
      .toArray();

    return res.json({ message: `Data fetched`, data: videos });
  } catch (error) {
    throw new Error("Something went wrong", error.message);
  } finally {
    await client.close();
  }
});

uploadRouter.post("/video", validationArray, async (req, res) => {
  try {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty())
      return res.json({ message: "Invalid Video Details", uploaded: false });

    // Connect to the database using mongoose
    await connectUsingMongoose();

    // Getting the details of the video
    const videoDetails = req.body;
    const id = await mongoose.connection.collection("uploads").countDocuments();
    const newVideo = new videoModel({
      ...videoDetails,
      id: (parseInt(id) + 1).toString(),
    });
    await newVideo.save();

    return res.json({ message: "Data Uploaded", uploaded: true });
  } catch (error) {
    throw new Error("Internal Server Error", error.message);
  } finally {
    await mongoose.disconnect();
  }
});

module.exports = uploadRouter;
