const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const Auth = require("../config/Auth.js"); 

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.json({
        message: "User is already registered. Please login to continue",
        registered: false,
      });
    }

    const regex = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,}$/;
    if (!email.match(regex) || !password || !name) {
      return res.json({ message: "Invalid Details", registered: false });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.json({ user: newUser });
  } catch (error) {
    console.error(error.message);
    return res.json({ err: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    
    if (!user) {
      return res.json({ message: "Please Register First", auth: false });
    }

    const token = jwt.sign({ id: user._id.toString(), name: user.name }, JWT_SECRET);
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      return res.json({
        message: "Signed in successfully",
        accessToken: token,
        auth: true,
        name: user.name,
        email,
      });
    }
    return res.json({ message: "Invalid Credentials", auth: false });
  } catch (error) {
    console.error(error.message);
    return res.json({ err: error.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) return res.json({ msg: "Can't find user" });

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.json({ msg: "Error at get user info" });
  }
}; 

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
};
