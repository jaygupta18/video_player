
const express = require("express");
const usersRouter = express.Router();
const { registerUser, loginUser, getUserInfo } = require("../Controller/Usercontroller");
const Auth = require("../config/Auth.js");
usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/info", Auth, getUserInfo);

module.exports = usersRouter;
