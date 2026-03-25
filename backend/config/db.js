const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async (retryCount = 0) => {
  try {
    const uri = process.env.DB_URI;
    if (!uri) {
      throw new Error('DB_URI is not set in .env');
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    const maxRetries = 5;
    const delayMs = 3000;
    console.error('MongoDB connection failed:', error.message);

    if (retryCount < maxRetries) {
      console.log(`Retrying MongoDB connection (${retryCount + 1}/${maxRetries}) in ${delayMs}ms...`);
      setTimeout(() => connectDB(retryCount + 1), delayMs);
    } else {
      console.error('MongoDB connection retries exhausted. Server will keep running.');
    }
  }
};

module.exports = connectDB;
