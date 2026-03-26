const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.DB_URI;
  if (!uri) {
    throw new Error('DB_URI is not set in .env');
  }

  const maxRetries = 5;
  const delayMs = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('MongoDB connected successfully');
      return;
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      if (attempt === maxRetries) {
        throw new Error('MongoDB connection retries exhausted');
      }
      console.log(`Retrying MongoDB connection (${attempt}/${maxRetries}) in ${delayMs}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};

module.exports = connectDB;
