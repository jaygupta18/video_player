// Modules
require("dotenv").config();
const { Router } = require("express");
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Variables
const { connectUsingMongoose } = require("../config/database");
const JWT_SECRET = process.env.JWT_SECRET;

// Routers
const usersRouter = Router();

// RESTful API's
usersRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Connecting mongoose to the MongoDB database
    await connectUsingMongoose();

    // Check if the user is registered already
    const user = await mongoose.connection
      .collection("users")
      .findOne({ email: email });

    if (user) {
      return res.json({
        message: "User is already registered. Please login to continue",
        registered: false,
      });
    }

    // Hashing the password for encryption if the user is not registered
    const regex = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,}$/;
    if (!email.match(regex) || !password || !name) {
      return res.json({ message: "Invalid Details", registered: false });
    }

    // Now registering the new user
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.json({ message: "User Registered", registered: true });
  } catch (error) {
    throw new Error("Internal Server Error", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Mongoose Disconnected...");
  }
});

usersRouter.post("/login", async (req, res) => {
  try {
    // Getting user's email and password from the body of the request
    const { email, password } = req.body;

    // Checking if the user is registered already
    // Connect to mongoose first
    await connectUsingMongoose();
    const user = await mongoose.connection
      .collection("users")
      .findOne({ email: email });

    if (!user)
      return res.json({ message: "Please Register First", auth: false });

    // Getting token for signing in
    const token = jwt.sign({ name: user.name }, JWT_SECRET);
    // Decrypting hashed password
    const result = await bcrypt.compare(password, user.password);

    if (result)
      return res.json({
        message: "Signed in successfully",
        accessToken: token,
        auth: result,
        name: user.name,
        email,
      });

    return res.json({ message: "Invalid Credentials", auth: result });
  } catch (error) {
    throw new Error("Internal Server Error", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Mongoose Disconnected...");
  }
});

module.exports = usersRouter;
