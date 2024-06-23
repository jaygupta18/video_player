// Modules
require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

// Variables
const URI = process.env.URI;
const MONGOOSE_URI = process.env.MONGOOSE_URI;

const connectUsingMongoClient = async () => {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    console.log(`MongoClient Active...`);
    client.on("error", () => {
      console.log(`Database Unavailable...`);
    });

    return client;
  } catch (error) {
    throw new Error(`Internal Server Error`, error.message);
  }
};

const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(MONGOOSE_URI);
    console.log("Mongoose Connected...");
  } catch (error) {
    throw new Error(`Internal Server Error`, error.message);
  }
};

module.exports = { connectUsingMongoClient, connectUsingMongoose };
