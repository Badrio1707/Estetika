import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.js";

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  // Validate user input
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate token
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

  res.status(200).json({ message: "Login successful", data: { token, user } });
};

export const signUp = async (req, res) => {
  // Handle registration
  const { username, password } = req.body;

  // Validate user input
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Hash password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Handle user registration logic
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  // Generate token
  const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1d" });

  res.status(201).json({
    message: "User registered successfully",
    data: { token, user: newUser },
  });
};

export const signOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
