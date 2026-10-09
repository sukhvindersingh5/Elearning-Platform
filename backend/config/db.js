const mongoose = require("mongoose");

// Connects to MongoDB Atlas using the URI stored in .env
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // stop the server if the DB connection fails
  }
};

module.exports = connectDB;
