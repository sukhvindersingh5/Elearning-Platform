const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @route  POST /api/auth/register
// @access Public
// Registers a new user. Role defaults to "student".
// Admin accounts should be created manually in the DB or via a seed script,
// not through the public registration form, to prevent anyone signing up as admin.
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "student",
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  POST /api/auth/login
// @access Public
// Same login endpoint for both students and admins - the role comes from the DB.
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/auth/me
// @access Private (any logged-in user)
// Returns the currently logged-in user's profile - used by the frontend
// on page refresh to restore the session from the stored token.
const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { registerUser, loginUser, getMe };
