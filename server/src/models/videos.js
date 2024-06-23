// Modules
const mongoose = require("mongoose");

// Variables
const today = new Date();
const uploadDate = today.toLocaleDateString();

// Video Schema
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  isLive: { type: Boolean, required: true, default: false },
  duration: { type: String, required: true, default: "11:05" },
  uploadTime: { type: String, required: true, default: uploadDate },
  views: { type: String, required: true, default: "24,969,123" },
  subscriber: { type: String, required: true, default: 25254545 },
  email: { type: String, required: true, format: "email" },
});

// Video Model
const videoModel = mongoose.model("uploads", videoSchema);

module.exports = videoModel;
