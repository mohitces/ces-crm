const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, default: 'user' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

exports.getUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.createUser = async (payload) => {
  const user = new User(payload);
  return await user.save();
};

exports.updateUser = async (id, payload) => {
  return await User.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
