// Modules
const { Router } = require("express");
const videosRouter = Router();
const videoModel=require("../models/videos"); 
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
videosRouter.get("/", async (req, res) => {
  try {
    const videos = await videoModel.find();
    return res.json({ data: videos });
  } catch (error) {
    throw new Error(`Could not find the target`, error);
  }
});


videosRouter.get("/search", async (req, res) => {
  
  const {query} = req.query;
 
  if (!query) {
    return res.status(400).json({ message: 'Search query is required.' });
  } 
  try {
    const videos = await videoModel.find({
      $or: [
        { author: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
        { channel_name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ],
    });
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error searching videos:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}); 

videosRouter.get("/:id", async (req, res) => {
  try {
    
    const video = await videoModel
      .findById(req.params.id);
      
    return res.json({ data: video });
  } catch (error) {
    return res.json({"msg":error.message})
  } 
});  
module.exports = videosRouter;