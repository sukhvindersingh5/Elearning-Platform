// One-time script to create an admin account, since the public
// registration form only ever creates "student" accounts.
//
// Usage:
//   cd backend
//   node utils/seedAdmin.js "Admin Name" admin@example.com yourPassword123

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const [, , name, email, password] = process.argv;

if (!name || !email || !password) {
  console.log("Usage: node utils/seedAdmin.js <name> <email> <password>");
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("A user with this email already exists.");
      process.exit(1);
    }

    const admin = await User.create({ name, email, password, role: "admin" });
    console.log(`Admin created: ${admin.email}`);
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
})();
