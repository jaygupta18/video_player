// Modules
const mongoose = require("mongoose");

// Variables
const today = new Date();
const uploadDate = today.toLocaleDateString();
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  isLive: { type: Boolean,  default: false},
  duration: { type: String, default: "11:05" },
  uploadTime: { type: String,  default: uploadDate},
  views: { type: Number, default: 0 },
  subscriber: { type: Number, default: 0},
  email: { type: String, required: true, format: "email" },
});

const videoModel = mongoose.model("uplo", videoSchema);
module.exports = videoModel; 
