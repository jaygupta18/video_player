// Modules
const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, format: "email" },
  password: { type: String, required: true },
});

// Model
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
