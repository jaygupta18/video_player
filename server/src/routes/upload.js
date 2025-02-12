const { Router } = require("express");
const { validationResult } = require("express-validator");
const uploadRouter = Router();
const validationArray = require("../config/validationArray");
const videoModel = require("../models/videos");

uploadRouter.get("/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const videos = await videoModel.find({ email: email });
    return res.json({ message: `Uploads of ${email}`, videos });
  } catch (error) {
    throw new Error("Something went wrong", error.message);
  } 
});

uploadRouter.get("/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const videos = await videoModel.findById(id);
    return res.json({ message: `Data fetched`, data: videos });
  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong", error.message);            
  }
}); 
   
uploadRouter.post("/video", validationArray, async (req, res) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.json({ message: "Invalid Video Details", uploaded: false });

    const videoDetails = req.body;
    const newVideo = new videoModel({
      ...videoDetails,
    });
    await newVideo.save();
    return res.json({ message: "Data Uploaded", uploaded: true });
  } catch (error) {
    throw new Error("Internal Server Error", error.message);
  } 
});  
module.exports = uploadRouter;


