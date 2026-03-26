const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    mobile: { type: String, trim: true, default: '' },
    password: { type: String, minlength: 8, select: false },
    role: { type: String, default: 'user', trim: true },
    isActive: { type: Boolean, default: true },
    profileImage: { type: String, default: '' },
    lastLoginAt: { type: Date, default: null },
    lastLoginIp: { type: String, default: '' },
    lastLoginUserAgent: { type: String, default: '' },
    mfaEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
