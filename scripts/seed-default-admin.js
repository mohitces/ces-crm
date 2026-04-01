require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const bcrypt = require('bcryptjs');
const User = require('../modules/users/user.model');

const run = async () => {
  try {
    await connectDB();
    const email = (process.env.DEFAULT_ADMIN_EMAIL || 'admin@ces-pl@gmail.com')
      .toLowerCase()
      .trim();
    const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Pa$$w0rd';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`Default admin already exists: ${email}`);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: 'CES Admin',
      email,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });
    console.log(`Default admin created: ${email}`);
  } catch (error) {
    console.error('Default admin seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
