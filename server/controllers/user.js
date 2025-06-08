import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";

const controllers = {};

controllers.signUp = async (req, res, next) => {
  try {
    const { name, email, username, password, bio } = req.body || {};

    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const user = await UserModel.create({
      name,
      email,
      username,
      password,
      bio,
    });
    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        accessToken: user.generateAccessToken(),
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
  }
};

controllers.signIn = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    return res.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        accessToken: user.generateAccessToken(),
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export default controllers;
